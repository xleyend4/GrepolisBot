// Local-only Grepolis snapshot receiver. No external service or account credentials.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const PORT = 17841;
const HOST = '127.0.0.1';
const TOKEN = process.env.GREPOLIS_BRIDGE_TOKEN;
if (!TOKEN || TOKEN.length < 24) {
  console.error('Set GREPOLIS_BRIDGE_TOKEN to a random secret of at least 24 characters.');
  process.exit(1);
}
const out = path.join(__dirname, 'latest-snapshot.json');
function send(res, code, data) {
  res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'null','Vary':'Origin'});
  res.end(JSON.stringify(data));
}
http.createServer((req,res)=>{
  const origin = req.headers.origin;
  // Tampermonkey userscript can send requests without an Origin; reject web pages from other origins.
  if (origin && !/^https?:\/\/([a-z0-9-]+\.)*grepolis\.com$/i.test(origin)) return send(res,403,{error:'origin denied'});
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {'Access-Control-Allow-Origin':origin || 'null','Access-Control-Allow-Headers':'Content-Type,X-Bridge-Token','Access-Control-Allow-Methods':'POST,GET','Access-Control-Max-Age':'600'}); return res.end();
  }
  if (req.headers['x-bridge-token'] !== TOKEN) return send(res,401,{error:'unauthorized'});
  if (req.method === 'GET' && req.url === '/snapshot') {
    if (!fs.existsSync(out)) return send(res,404,{error:'no snapshot yet'});
    return send(res,200,JSON.parse(fs.readFileSync(out,'utf8')));
  }
  if (req.method !== 'POST' || req.url !== '/snapshot') return send(res,404,{error:'not found'});
  let body = '';
  req.on('data',chunk=>{body += chunk; if(body.length>2000000) req.destroy();});
  req.on('end',()=>{
    try {
      const value=JSON.parse(body);
      if(value.schema !== 'grepolis-snapshot-v1' || !Array.isArray(value.towns) || value.towns.length>100) throw new Error('invalid snapshot');
      fs.writeFileSync(out,JSON.stringify(value,null,2),{mode:0o600});
      send(res,200,{ok:true,towns:value.towns.length,receivedAt:new Date().toISOString()});
    } catch(e){send(res,400,{error:'invalid JSON snapshot'});}
  });
}).listen(PORT,HOST,()=>console.log('Grepolis bridge listening only on http://'+HOST+':'+PORT));

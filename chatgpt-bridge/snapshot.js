// Grepolis read-only snapshot for ChatGPT. No game actions or network uploads.
// Paste in the browser console on your own Grepolis game page, then copy the JSON.
(() => {
  const g = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  if (!g.ITowns || !g.MM) throw new Error('Open Grepolis and wait for the game to load.');
  const snapshot = {
    schema: 'grepolis-snapshot-v1',
    capturedAt: new Date().toISOString(),
    towns: Object.values(g.ITowns.towns || {}).map(t => {
      const r = t.resources?.() || {};
      const b = t.getBuildings?.()?.attributes || {};
      const u = t.units?.() || {};
      const orders = t.buildingOrders?.() || [];
      return {
        id: t.id,
        name: t.getName?.() || t.name || String(t.id),
        resources: { wood: r.wood ?? null, stone: r.stone ?? null, iron: r.iron ?? null, storage: r.storage ?? null },
        availablePopulation: t.getAvailablePopulation?.() ?? null,
        buildings: Object.fromEntries(Object.entries(b).filter(([k,v]) => typeof v === 'number' && !k.startsWith('_'))),
        units: Object.fromEntries(Object.entries(u).filter(([k,v]) => typeof v === 'number')),
        buildingQueueCount: Array.isArray(orders) ? orders.length : null
      };
    })
  };
  const json = JSON.stringify(snapshot, null, 2);
  console.log(json);
  if (typeof copy === 'function') copy(json);
  return snapshot;
})();

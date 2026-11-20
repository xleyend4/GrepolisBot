// ==UserScript==
// @name         Grepolis ChatGPT Snapshot (read-only)
// @namespace    https://github.com/xleyend4/GrepolisBot
// @version      0.1.0
// @description  Export a local snapshot of your Grepolis cities for ChatGPT; no uploads or game actions.
// @match        https://*.grepolis.com/game/*
// @match        http://*.grepolis.com/game/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  const ID = 'grepolis-chatgpt-export';
  function snapshot() {
    const game = window;
    if (!game.ITowns?.towns) throw new Error('Grepolis is not ready yet. Try again after loading.');
    const towns = Object.values(game.ITowns.towns).map(t => {
      const resources = t.resources?.() || {};
      const buildings = t.getBuildings?.()?.attributes || {};
      const units = t.units?.() || {};
      const orders = t.buildingOrders?.();
      return {
        id: t.id,
        name: t.getName?.() || t.name || String(t.id),
        resources: Object.fromEntries(['wood','stone','iron','storage'].map(k => [k, resources[k] ?? null])),
        availablePopulation: t.getAvailablePopulation?.() ?? null,
        buildings: Object.fromEntries(Object.entries(buildings).filter(([key, value]) => !key.startsWith('_') && typeof value === 'number')),
        units: Object.fromEntries(Object.entries(units).filter(([, value]) => typeof value === 'number')),
        buildingQueueCount: Array.isArray(orders) ? orders.length : null
      };
    });
    return {schema:'grepolis-snapshot-v1',capturedAt:new Date().toISOString(),towns};
  }
  function saveFile(json) {
    const blob = new Blob([json], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grepolis-snapshot-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function addButton() {
    if (document.getElementById(ID) || !document.body) return;
    const button = document.createElement('button');
    button.id = ID;
    button.type = 'button';
    button.textContent = 'Exportar para ChatGPT';
    button.title = 'Solo lectura: descarga un JSON local, no envía datos';
    button.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:999999;background:#193b50;color:white;border:1px solid #9dc6d6;border-radius:8px;padding:10px 14px;font:600 13px Arial;cursor:pointer;box-shadow:0 2px 10px #0007';
    button.addEventListener('click', () => {
      try {
        const data = snapshot();
        if (!data.towns.length) throw new Error('No towns were found.');
        saveFile(JSON.stringify(data,null,2));
        button.textContent = 'JSON descargado ✓';
        setTimeout(() => {button.textContent='Exportar para ChatGPT';}, 2500);
      } catch (err) {
        alert('No se pudo exportar: ' + err.message);
      }
    });
    document.body.appendChild(button);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButton);
  else addButton();
})();

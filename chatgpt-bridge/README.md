# Grepolis → ChatGPT (read-only prototype)

This is **not an installed ChatGPT plugin**. It is a first step to export a snapshot of your own cities for analysis. No server, API key, account credentials, or paid services are needed.

## Use

1. Open Grepolis in Brave and wait for the game to finish loading.
2. Open Developer Tools → Console (F12 or Ctrl+Shift+J).
3. Paste the contents of `snapshot.js` and run it.
4. Copy the JSON output (Chrome/Brave may copy automatically) and paste it into ChatGPT.
5. Ask for a building/recruitment priority plan across your cities.

## What is included
Town names and IDs, resources, storage, free population, building levels, units, and number of queued building orders, where exposed by the game's client.

## Limitations and safety
- **No live ChatGPT connection yet**. This is a manual export, not continuous monitoring.
- The game client API is unofficial; fields may change or be unavailable.
- No build, train, trade, or other game actions are performed.
- Do not paste passwords, session tokens, or cookies. Inspect the exported JSON before sharing.
- Use of automation or scripts may be restricted by Grepolis rules.

# Grepolis local bridge (experimental)

This is a **local-only receiver**, not a live ChatGPT plugin. It never asks for Grepolis credentials.

## Requirements
Windows 11, Node.js 20+ and Brave. No paid services.

## Start
1. Set a random secret in PowerShell: `$env:GREPOLIS_BRIDGE_TOKEN = "REPLACE-WITH-A-LONG-RANDOM-SECRET-AT-LEAST-24-CHARS"`
2. Run `node server.js` in this folder.
3. The receiver listens on **127.0.0.1:17841 only**, never on the public internet.

## API
- `POST /snapshot`: submit `grepolis-snapshot-v1` JSON, with `X-Bridge-Token` header.
- `GET /snapshot`: retrieve latest snapshot with the same header.
- Writes `latest-snapshot.json` locally. This file is ignored by Git.

The existing userscript currently exports JSON manually. **Automatic posting is not yet wired up**. We should validate game-client fields and establish a secure, consented connection before enabling automatic sync or remote access.

## Security
Never commit or share your token, Grepolis cookies or login. The server does not provide public network access. The token is required even on localhost. Avoid forwarding this port to the internet.

This does not bypass game authentication or CAPTCHA, and does not perform game actions.

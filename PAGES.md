# Portfolio publishing

This repository includes both portfolio designs.

- Grok design: site root.
- ChatGPT redesign: `chatgpt/`.

The separate `vite.pages.config.ts` builds the existing portfolio as a static React site without changing the original Grok/Vercel server configuration. It adjusts `/work/` image paths for the repository URL. The ChatGPT site and its local assets are copied from `public/chatgpt/`.

In repository Settings → Pages, select GitHub Actions as the source, then run the Publish both portfolios workflow. Private repository Pages eligibility depends on the GitHub account plan. No repository visibility changes are made by this workflow.

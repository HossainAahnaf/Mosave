# MoSave Chrome Extension Scaffold

Capture online receipts or order summaries and push structured data back to the MoSave dashboard.

## Quick start

1. Open `chrome://extensions` and enable Developer Mode.
2. Click “Load unpacked” and select this folder.
3. Navigate to a checkout confirmation page; the content script will auto-detect totals and queue them in the background log.

Replace the `chrome.runtime.sendMessage` callback with a call to your Supabase Edge Function or FastAPI webhook (`/api/expenses/ingest`).

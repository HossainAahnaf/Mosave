chrome.runtime.onInstalled.addListener(() => {
  console.log("MoSave Receipt Scanner ready.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "MOSAVE_RECEIPT") {
    console.log("Receipt captured", message.payload);
    // TODO: Send payload to Supabase function or FastAPI endpoint
    sendResponse({ status: "queued" });
  }
});

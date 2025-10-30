(() => {
  const extractReceipt = () => {
    const text = document.body.innerText;
    const totalMatch = text.match(/total\s*\$?(\d+[\.,]\d{2})/i);
    if (!totalMatch) return null;

    return {
      url: window.location.href,
      total: totalMatch[1],
      capturedAt: new Date().toISOString()
    };
  };

  const payload = extractReceipt();
  if (payload) {
    chrome.runtime.sendMessage({ type: "MOSAVE_RECEIPT", payload });
  }
})();

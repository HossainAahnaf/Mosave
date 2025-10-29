document.addEventListener('DOMContentLoaded', function() {
  // Existing demo button logic
  var btn = document.getElementById('clickCounterBtn');
  if (btn) {
    var count = 0;
    btn.addEventListener('click', function() {
      count++;
      btn.textContent = 'Clicked ' + count + ' times';
    });
  }

  // Base44 integration elements
  var apiKeyInput = document.getElementById('apiKeyInput');
  var appIdInput = document.getElementById('appIdInput');
  var saveApiConfigBtn = document.getElementById('saveApiConfigBtn');
  var loadTransactionsBtn = document.getElementById('loadTransactionsBtn');
  var transactionsOutput = document.getElementById('transactionsOutput');

  var entityIdInput = document.getElementById('entityIdInput');
  var descriptionInput = document.getElementById('descriptionInput');
  var amountInput = document.getElementById('amountInput');
  var categoryInput = document.getElementById('categoryInput');
  var dateInput = document.getElementById('dateInput');
  var isSharedInput = document.getElementById('isSharedInput');
  var sharedWithInput = document.getElementById('sharedWithInput');
  var semesterInput = document.getElementById('semesterInput');
  var updateTransactionBtn = document.getElementById('updateTransactionBtn');
  var updateOutput = document.getElementById('updateOutput');

  // Prefill saved API key if present
  try {
    var savedKey = localStorage.getItem('base44_api_key') || '';
    if (apiKeyInput && savedKey) {
      apiKeyInput.value = savedKey;
    }
  } catch (e) {
    // Ignore localStorage errors
  }

  // Save API config locally
  if (saveApiConfigBtn) {
    saveApiConfigBtn.addEventListener('click', function() {
      if (!apiKeyInput) return;
      var key = apiKeyInput.value.trim();
      try {
        localStorage.setItem('base44_api_key', key);
      } catch (e) {
        // Ignore localStorage errors
      }
      alert('API config saved locally');
    });
  }

  // Fetch transactions
  if (loadTransactionsBtn) {
    loadTransactionsBtn.addEventListener('click', async function() {
      if (!apiKeyInput || !appIdInput || !transactionsOutput) return;
      var apiKey = (apiKeyInput.value || '').trim();
      var appId = (appIdInput.value || '').trim();
      if (!apiKey || !appId) {
        transactionsOutput.textContent = 'Missing API Key or App ID.';
        return;
      }
      transactionsOutput.textContent = 'Loading transactions...';
      try {
        var data = await fetchTransactionEntities(apiKey, appId);
        transactionsOutput.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        transactionsOutput.textContent = formatError(err);
      }
    });
  }

  // Update transaction
  if (updateTransactionBtn) {
    updateTransactionBtn.addEventListener('click', async function() {
      if (!apiKeyInput || !appIdInput || !entityIdInput || !updateOutput) return;
      var apiKey = (apiKeyInput.value || '').trim();
      var appId = (appIdInput.value || '').trim();
      var entityId = (entityIdInput.value || '').trim();
      if (!apiKey || !appId || !entityId) {
        updateOutput.textContent = 'Missing API Key, App ID, or Entity ID.';
        return;
      }

      var updateData = {};
      if (descriptionInput && descriptionInput.value.trim()) {
        updateData.description = descriptionInput.value.trim();
      }
      if (amountInput && amountInput.value !== '') {
        updateData.amount = Number(amountInput.value);
      }
      if (categoryInput && categoryInput.value.trim()) {
        updateData.category = categoryInput.value.trim();
      }
      if (dateInput && dateInput.value) {
        updateData.date = dateInput.value;
      }
      if (isSharedInput) {
        updateData.is_shared = !!isSharedInput.checked;
      }
      if (sharedWithInput && sharedWithInput.value.trim()) {
        updateData.shared_with = sharedWithInput.value
          .split(',')
          .map(function(s) { return s.trim(); })
          .filter(function(s) { return s.length > 0; });
      }
      if (semesterInput && semesterInput.value.trim()) {
        updateData.semester = semesterInput.value.trim();
      }

      updateOutput.textContent = 'Updating transaction...';
      try {
        var result = await updateTransactionEntity(entityId, updateData, apiKey, appId);
        updateOutput.textContent = JSON.stringify(result, null, 2);
      } catch (err) {
        updateOutput.textContent = formatError(err);
      }
    });
  }
});

async function fetchTransactionEntities(apiKey, appId) {
  var url = 'https://app.base44.com/api/apps/' + encodeURIComponent(appId) + '/entities/Transaction';
  var response = await fetch(url, {
    headers: {
      'api_key': apiKey,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    var text = '';
    try { text = await response.text(); } catch (_) {}
    throw new Error(text || ('Request failed: ' + response.status + ' ' + response.statusText));
  }
  return await response.json();
}

async function updateTransactionEntity(entityId, updateData, apiKey, appId) {
  var url = 'https://app.base44.com/api/apps/' + encodeURIComponent(appId) + '/entities/Transaction/' + encodeURIComponent(entityId);
  var response = await fetch(url, {
    method: 'PUT',
    headers: {
      'api_key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData || {})
  });
  if (!response.ok) {
    var text = '';
    try { text = await response.text(); } catch (_) {}
    throw new Error(text || ('Request failed: ' + response.status + ' ' + response.statusText));
  }
  return await response.json();
}

function formatError(err) {
  try {
    if (err && typeof err === 'object') {
      if (err.json) {
        return JSON.stringify(err, null, 2);
      }
      if (err.message) {
        return 'Error: ' + err.message;
      }
      return JSON.stringify(err, null, 2);
    }
    return String(err);
  } catch (_) {
    return 'Unknown error occurred';
  }
}
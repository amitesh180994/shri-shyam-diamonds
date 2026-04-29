// Updated script for Shri Shyam Diamonds verification page
// This version uses fetch() to call the Google Apps Script API and displays
// the result inside the page instead of opening a new tab.

// API endpoint for verification. Replace with your deployed Google Apps Script
// URL. Do not include query parameters here.
const API_URL = "https://script.google.com/macros/s/AKfycbxeU9ZZHprmFFdMuvFZGBKlfnKgAHWV8oG-2aXkTwpM0Oryv7ZI8tX47oH9yyZLwq2-dw/exec;

/**
 * Handles click event for "Verify Now" button.  Fetches data from the
 * verification API and displays it in a table inside the page.
 */
function verifyProduct() {
  const inputEl = document.getElementById('codeInput');
  const resultEl = document.getElementById('result');
  // Clear any previous result
  resultEl.innerHTML = '';

  if (!inputEl) {
    alert('Verification input box not found on the page.');
    return;
  }
  const code = inputEl.value.trim().toUpperCase();
  if (!code) {
    alert('Enter code');
    return;
  }

  // Build request URL
  const requestUrl = API_URL + '?code=' + encodeURIComponent(code);
  // Fetch data
  fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('API request failed with status ' + response.status);
      }
      // If the API returns JSON, parse it.  If it returns HTML, you may need to
      // use response.text() instead.  Adjust accordingly.
      return response.json();
    })
    .then(data => {
      // Build table from data.  Here we assume `data` is an object
      // with key-value pairs.  Adjust this code based on actual API
      // response structure.
      const table = document.createElement('table');
      table.className = 'result-table';
      // Create table rows for each key/value pair
      Object.entries(data).forEach(([key, value]) => {
        const row = document.createElement('tr');
        const keyCell = document.createElement('th');
        keyCell.textContent = key;
        const valueCell = document.createElement('td');
        valueCell.textContent = value;
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
      });
      resultEl.appendChild(table);
    })
    .catch(err => {
      console.error(err);
      resultEl.textContent = 'Something went wrong: ' + err.message;
    });
}

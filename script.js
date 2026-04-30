// Updated script for Shri Shyam Diamonds verification page
// This version uses fetch() to call the Google Apps Script API and displays
// the result inside the page instead of opening a new tab.

// API endpoint for verification. Replace with your deployed Google Apps Script
// URL. Do not include query parameters here.
const SHEET_URL = "https://opensheet.elk.sh/1jrTes410gkvf0dMwW7TQZd2W9U7e60dcZyMyHbSmaBc/Sheet1";

function verifyProduct() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if (!code) {
    alert("Enter code");
    return;
  }

  result.innerHTML = "<p style='font-weight:bold;padding:15px;'>Checking...</p>";

  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      const found = data.find(item => String(item.Code).trim().toUpperCase() === code);

      if (!found) {
        result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Invalid Code ❌</p>";
        return;
      }

      let html = `<table style="width:100%;margin-top:20px;border-collapse:collapse;background:white;">`;

      Object.keys(found).forEach(key => {
        html += `
          <tr>
            <th style="border:1px solid #ddd;padding:12px;background:#061737;color:white;text-align:left;">${key}</th>
            <td style="border:1px solid #ddd;padding:12px;text-align:left;">${found[key]}</td>
          </tr>
        `;
      });

      html += `</table>`;
      result.innerHTML = html;
    })
    .catch(() => {
      result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Sheet loading error. Sheet public karo.</p>";
    });
}

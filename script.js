// Updated script for Shri Shyam Diamonds verification page
// This version uses fetch() to call the Google Apps Script API and displays
// the result inside the page instead of opening a new tab.

// API endpoint for verification. Replace with your deployed Google Apps Script
// URL. Do not include query parameters here.
const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  const codeInput = document.getElementById("codeInput");
  const result = document.getElementById("result");

  const code = codeInput.value.trim().toUpperCase();

  if (!code) {
    alert("Please enter verification code");
    return;
  }

  result.innerHTML = "<p style='padding:15px;font-weight:bold;'>Checking...</p>";

  const url = API_URL + "?code=" + encodeURIComponent(code);

  fetch(url)
    .then(res => res.text())
    .then(html => {
      result.innerHTML = html;
    })
    .catch(error => {
      result.innerHTML = `
        <p style="color:red;font-weight:bold;padding:15px;">
          Connection error. Please try again.
        </p>
      `;
      console.log(error);
    });
}

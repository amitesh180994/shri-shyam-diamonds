// Updated script for Shri Shyam Diamonds verification page
// This version uses fetch() to call the Google Apps Script API and displays
// the result inside the page instead of opening a new tab.

// API endpoint for verification. Replace with your deployed Google Apps Script
// URL. Do not include query parameters here.
const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if (!code) {
    alert("Enter code");
    return;
  }

  result.innerHTML = `
    <iframe 
      src="${API_URL}?code=${encodeURIComponent(code)}"
      style="width:100%; min-height:650px; border:0; margin-top:20px; border-radius:12px; background:white;"
      loading="lazy">
    </iframe>
  `;
}

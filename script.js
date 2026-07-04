const SHEET_URL = "https://opensheet.elk.sh/1jrTes410gkvf0dMwW7TQZd2W9U7e60dcZyMyHbSmaBc/Sheet1";

let currentData = null;

function verifyProduct() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if (!code) {
    alert("Enter code");
    return;
  }

  result.innerHTML = "<p style='padding:15px;font-weight:bold;'>Checking...</p>";

  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {

      const found = data.find(item => String(item.Code).toUpperCase() === code);

      if (!found) {
        result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Invalid Code ❌</p>";
        return;
      }

      currentData = found;

      let imageUrl = `https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${found.Code}.png`;

      let html = `
      <div style="margin-top:20px;border-radius:12px;background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);padding:20px;">
<div style="display:flex;gap:24px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;">
        <table style="width:45%;min-width:290px;border-collapse:collapse;">
      `;

      Object.keys(found).forEach(key => {
        if (key.toLowerCase() !== "image") {
          html += `
          <tr>
            <th style="background:#061737;color:white;padding:12px;text-align:left;">${key}</th>
            <td style="border:1px solid #ddd;padding:12px;font-weight:bold;">${found[key]}</td>
          </tr>`;
        }
      });

      html += `</table>`;

      html += `<div style="width:50%;min-width:320px;display:flex;justify-content:center;">
      <img src="${imageUrl}"
      style="width:100%;max-width:420px;border-radius:12px;"
      onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${found.Code}.jpg';if(this.naturalWidth==0){this.src='https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${found.Code.toLowerCase()}.jpg';}">
      </div></div>

      <button onclick="downloadCertificate()" style="margin-top:20px;padding:12px 25px;background:#061737;color:white;border:none;border-radius:8px;cursor:pointer;">
      Download Certificate
      </button>
      </div>
      `;

      result.innerHTML = html;

    })
    .catch(() => {
      result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Error loading data ❌</p>";
    });
}

function downloadCertificate() {
  if (!currentData) return;

  let imageUrl = `https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${currentData.Code}.png`;

  let cert = `
  <html><body style="font-family:Arial;padding:40px;">
  <h1 style="text-align:center;">COH Gemological Centre</h1>
  <h3 style="text-align:center;">Diamond Certificate</h3><hr>
  `;

  Object.keys(currentData).forEach(key => {
    if (key.toLowerCase() !== "image") {
      cert += `<p><b>${key}:</b> ${currentData[key]}</p>`;
    }
  });

  if (imageUrl) {
    cert += `<img src="${imageUrl}" style="max-width:200px;">`;
  }

  cert += `<script>window.print()<\/script></body></html>`;

  const win = window.open("");
  win.document.write(cert);
  win.document.close();
}

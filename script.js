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

      const found = data.find(item => String(item.Code).trim().toUpperCase() === code);

      if (!found) {
        result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Invalid Code ❌</p>";
        return;
      }

      currentData = found;

      // Image URL GitHub se automatically banega
      const imageUrl = `https://github.com/amitesh180994/shri-shyam-diamonds/raw/main/images/${found.Code.trim()}.png`;

      let html = `
      <div style="margin-top:20px;border-radius:12px;background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);padding:20px;">

      <table style="width:100%;border-collapse:collapse;">
      `;

      Object.keys(found).forEach(key => {
        if (key.toLowerCase() !== "image") {
          html += `
          <tr>
            <th style="background:#061737;color:white;padding:12px;text-align:left;">
              ${key}
            </th>
            <td style="border:1px solid #ddd;padding:12px;font-weight:bold;">
              ${found[key]}
            </td>
          </tr>`;
        }
      });

      html += `</table>`;

      html += `
      <div style="text-align:center;margin-top:20px;">
        <img
          src="${imageUrl}"
          alt="Product Image"
          style="max-width:250px;border-radius:12px;border:1px solid #ddd;"
          onerror="this.style.display='none';"
        >
      </div>
      `;

      html += `
      <div style="text-align:center;">
      <button onclick="downloadCertificate()"
      style="margin-top:20px;padding:12px 25px;background:#061737;color:white;border:none;border-radius:8px;cursor:pointer;">
      Download Certificate
      </button>
      </div>

      </div>
      `;

      result.innerHTML = html;

    })
    .catch(error => {
      console.error(error);
      result.innerHTML = "<p style='color:red;font-weight:bold;padding:15px;'>Error loading data ❌</p>";
    });
}

function downloadCertificate() {

  if (!currentData) return;

  const imageUrl = `https://github.com/amitesh180994/shri-shyam-diamonds/raw/main/images/${currentData.Code.trim()}.png`;

  let cert = `
  <html>
  <head>
    <title>Certificate</title>
  </head>
  <body style="font-family:Arial;padding:40px;">

  <h1 style="text-align:center;">COH Gemological Centre</h1>

  <h3 style="text-align:center;">Diamond Certificate</h3>

  <hr>
  `;

  Object.keys(currentData).forEach(key => {

    if (key.toLowerCase() !== "image") {

      cert += `
      <p>
      <b>${key}:</b> ${currentData[key]}
      </p>
      `;
    }

  });

  cert += `
  <div style="text-align:center;margin-top:20px;">
    <img src="${imageUrl}"
         style="max-width:250px;border:1px solid #ccc;border-radius:10px;"
         onerror="this.style.display='none';">
  </div>
  `;

  cert += `
  <script>
    window.print();
  <\/script>

  </body>
  </html>
  `;

  const win = window.open("");

  win.document.write(cert);

  win.document.close();
}

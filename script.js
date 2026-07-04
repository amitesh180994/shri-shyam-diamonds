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

      // PNG + JPG support
      let imageUrl = `https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${found.Code}.png`;

      let html = `
      <div style="
          margin-top:20px;
          border-radius:12px;
          background:white;
          box-shadow:0 0 20px rgba(0,0,0,.12);
          padding:25px;
      ">

      <div style="
          display:flex;
          gap:30px;
          align-items:flex-start;
          justify-content:space-between;
          flex-wrap:wrap;
      ">

      <table style="
          width:60%;
          min-width:350px;
          border-collapse:collapse;
      ">
      `;

      Object.keys(found).forEach(key => {
        if (key.toLowerCase() !== "image") {
          html += `
          <tr>
            <th style="
                background:#061737;
                color:white;
                padding:12px;
                text-align:left;
                border:1px solid #ddd;
            ">
              ${key}
            </th>

            <td style="
                border:1px solid #ddd;
                padding:12px;
                font-weight:bold;
            ">
              ${found[key]}
            </td>
          </tr>`;
        }
      });

      html += `</table>`;

      html += `
      <div style="
          width:35%;
          min-width:260px;
          display:flex;
          justify-content:center;
          align-items:flex-start;
      ">

      <img
          src="${imageUrl}"
          onerror="
            this.onerror=null;
            this.src='https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${found.Code}.jpg';
          "
          style="
              width:100%;
              max-width:320px;
              border-radius:12px;
              border:1px solid #ddd;
              box-shadow:0 0 15px rgba(0,0,0,.15);
          ">
      </div>

      </div>

      <div style="text-align:center;margin-top:25px;">
      <button onclick="downloadCertificate()"
          style="
              padding:14px 35px;
              background:#061737;
              color:#fff;
              border:none;
              border-radius:10px;
              cursor:pointer;
              font-size:16px;
              font-weight:bold;
          ">
          Download Certificate
      </button>
      </div>

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
  <html>
  <body style="font-family:Arial;padding:40px;">
  <h1 style="text-align:center;">COH Gemological Centre</h1>
  <h3 style="text-align:center;">Diamond Certificate</h3>
  <hr>
  `;

  Object.keys(currentData).forEach(key => {
    if (key.toLowerCase() !== "image") {
      cert += `<p><b>${key}:</b> ${currentData[key]}</p>`;
    }
  });

  cert += `
  <img src="${imageUrl}"
       onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/amitesh180994/shri-shyam-diamonds/main/images/${currentData.Code}.jpg';"
       style="max-width:220px;">
  `;

  cert += `<script>window.print()<\/script></body></html>`;

  const win = window.open("");
  win.document.write(cert);
  win.document.close();
}

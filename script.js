const SHEET_URL = "https://opensheet.elk.sh/1jrTes410gkvf0dMwW7TQZd2W9U7e60dcZyMyHbSmaBc/Sheet1";

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

      result.innerHTML = `
        <table style="width:100%;margin-top:20px;border-collapse:collapse;">
          <tr><th>Product</th><td>${found.Product}</td></tr>
          <tr><th>Diamond</th><td>${found.Diamond}</td></tr>
          <tr><th>Gold</th><td>${found.Gold}</td></tr>
          <tr><th>Status</th><td>${found.Status}</td></tr>
        </table>
      `;
    })
    .catch(() => {
      result.innerHTML = "<p style='color:red;font-weight:bold;'>Sheet access error ❌</p>";
    });
}

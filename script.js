const API_URL = "YAHAN_APNA_GOOGLE_SCRIPT_URL";

function verifyProduct() {
  let code = document.getElementById("codeInput").value.trim().toUpperCase();
  let result = document.getElementById("result");

  result.innerHTML = "Checking...";

  fetch(API_URL + "?code=" + code)
    .then(res => res.json())
    .then(data => {
      if (data.status === "found") {
        result.innerHTML = `
          <h3>✅ Authentic</h3>
          <p><b>${data.productName}</b></p>
          <p>${data.diamondWeight} | ${data.goldPurity}</p>
        `;
      } else {
        result.innerHTML = "❌ Invalid Code";
      }
    })
    .catch(() => {
      result.innerHTML = "⚠️ Error connecting";
    });
}

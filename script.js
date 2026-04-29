const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  let code = document.getElementById("codeInput").value.trim().toUpperCase();
  let result = document.getElementById("result");

  result.innerHTML = "Checking...";

  fetch(API_URL + "?code=" + encodeURIComponent(code))
    .then(res => res.json())
    .then(data => {
      if (data.status === "found") {
        result.innerHTML = `
          <h3 style="color:green;">✅ Authentic</h3>
          <p><b>Product:</b> ${data.product}</p>
          <p><b>Diamond:</b> ${data.diamond}</p>
          <p><b>Gold:</b> ${data.gold}</p>
          <p><b>Colour:</b> ${data.colour}</p>
          <p><b>Clarity:</b> ${data.clarity}</p>
          <p><b>Date:</b> ${data.date}</p>
          <img src="${data.image}" width="200">
        `;
      } else {
        result.innerHTML = "<h3 style='color:red;'>❌ Invalid Product</h3>";
      }
    })
    .catch(() => {
      result.innerHTML = "⚠️ Error connecting";
    });
}

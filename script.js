const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();
  var result = document.getElementById("result");

  if (!code) {
    result.innerHTML = "<h3 style='color:red;'>Please enter verification code</h3>";
    return;
  }

  result.innerHTML = "Checking...";

  fetch(API_URL + "?code=" + encodeURIComponent(code))
    .then(res => res.json())
    .then(data => {

      if (data.status === "found") {

        var imgHtml = data.image ? '<img src="' + data.image + '" class="result-img">' : "";

        result.innerHTML =
          '<div class="result-card">' +

            '<h2 class="auth-title">✅ Authentic Diamond</h2>' +

            '<div class="result-layout">' +

              '<div class="result-table">' +

                '<div><span>Product</span><b>' + data.product + '</b></div>' +
                '<div><span>Diamond</span><b>' + data.diamond + '</b></div>' +

                '<div><span>Gold</span><b>' + data.gold + '</b></div>' +
                '<div><span>Colour</span><b>' + data.colour + '</b></div>' +

                '<div><span>Clarity</span><b>' + data.clarity + '</b></div>' +
                '<div><span>Date</span><b>' + data.date + '</b></div>' +

              '</div>' +

              imgHtml +

            '</div>' +

            '<button class="download-btn" onclick="downloadCertificate()">📄 Download Certificate</button>' +

          '</div>';

      } else {
        result.innerHTML = "<h2 style='color:red;'>❌ Invalid Product</h2>";
      }

    })
    .catch(() => {
      result.innerHTML = "⚠️ Connection error. Try again.";
    });
}

/* QR AUTO VERIFY */
window.onload = function () {
  var params = new URLSearchParams(window.location.search);
  var code = params.get("code");

  if (code) {
    document.getElementById("codeInput").value = code.toUpperCase();
    setTimeout(() => verifyProduct(), 500);
  }
};

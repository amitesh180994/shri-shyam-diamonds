const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();
  var result = document.getElementById("result");

  if (!code) {
    result.innerHTML = "<h3 style='color:red;'>Please enter verification code</h3>";
    return;
  }

  result.innerHTML = "Checking...";

  // fallback
  setTimeout(function () {
    if (result.innerHTML === "Checking...") {
      result.innerHTML = "⚠️ Connection slow... try again";
    }
  }, 5000);

  window.showResult = function (data) {

    if (data.status === "found") {

      var imgHtml = "";

      if (data.image) {
        imgHtml = '<img src="' + data.image + '" class="result-img">';
      }

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

        '</div>';

    } else {
      result.innerHTML = "<h2 style='color:red;'>❌ Invalid Product</h2>";
    }
  };

  // remove old script
  var old = document.getElementById("jsonp-script");
  if (old) old.remove();

  // JSONP call
  var script = document.createElement("script");
  script.id = "jsonp-script";
  script.src =
    API_URL +
    "?code=" +
    encodeURIComponent(code) +
    "&callback=showResult&_=" +
    new Date().getTime();

  document.body.appendChild(script);
}

/* QR AUTO VERIFY */
window.onload = function () {
  var params = new URLSearchParams(window.location.search);
  var code = params.get("code");

  if (code) {
    document.getElementById("codeInput").value = code.toUpperCase();

    setTimeout(function () {
      verifyProduct();
    }, 400);

    var verifySection = document.getElementById("verify");
    if (verifySection) {
      verifySection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

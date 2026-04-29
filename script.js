const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();
  var result = document.getElementById("result");

  result.innerHTML = "Checking...";

  window.showResult = function(data) {
    if (data.status === "found") {
      var imgHtml = "";

      if (data.image) {
        imgHtml = '<img src="' + data.image + '" class="result-img">';
      }

      result.innerHTML =
        '<h2 style="color:green;">✅ Authentic</h2>' +
        '<p><b>Product:</b> ' + data.product + '</p>' +
        '<p><b>Diamond:</b> ' + data.diamond + '</p>' +
        '<p><b>Gold:</b> ' + data.gold + '</p>' +
        '<p><b>Colour:</b> ' + data.colour + '</p>' +
        '<p><b>Clarity:</b> ' + data.clarity + '</p>' +
        '<p><b>Date:</b> ' + data.date + '</p>' +
        imgHtml;
    } else {
      result.innerHTML = "<h2 style='color:red;'>❌ Invalid Product</h2>";
    }
  };

  var old = document.getElementById("jsonp-script");
  if (old) old.remove();

  var script = document.createElement("script");
  script.id = "jsonp-script";
  script.src = API_URL + "?code=" + encodeURIComponent(code) + "&callback=showResult";

  document.body.appendChild(script);
}

/* QR scan / direct link auto verify */
window.onload = function () {
  var params = new URLSearchParams(window.location.search);
  var code = params.get("code");

  if (code) {
    document.getElementById("codeInput").value = code.toUpperCase();
    verifyProduct();

    var verifySection = document.getElementById("verify");
    if (verifySection) {
      verifySection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();
  var result = document.getElementById("result");

  if (!code) {
    result.innerHTML = "<h3 style='color:red;'>Please enter verification code</h3>";
    return;
  }

  result.innerHTML = "Checking...";

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

          '<button class="download-btn" onclick="downloadCertificate()">📄 Download Certificate</button>' +

        '</div>';

    } else {
      result.innerHTML = "<h2 style='color:red;'>❌ Invalid Product</h2>";
    }
  };

  var old = document.getElementById("jsonp-script");
  if (old) old.remove();

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

/* PREMIUM CERTIFICATE WITH LOGO */
function downloadCertificate() {
  var card = document.querySelector(".result-card");

  if (!card) {
    alert("Please verify product first");
    return;
  }

  const table = card.querySelector(".result-table").outerHTML;
  const img = card.querySelector("img") ? card.querySelector("img").outerHTML : "";

  var win = window.open("", "", "width=900,height=750");

  win.document.write(`
    <html>
    <head>
      <title>Shri Shyam Diamonds Certificate</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 30px;
          text-align: center;
          background: #f5f5f5;
        }

        .certificate {
          max-width: 750px;
          margin: auto;
          padding: 30px;
          border: 4px solid #c9a24d;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .logo {
          width: 160px;
          margin-bottom: 10px;
        }

        h1 {
          color: #061737;
          margin: 5px 0;
        }

        h2 {
          color: green;
          margin-bottom: 20px;
        }

        .result-table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid #ddd;
          margin-top: 20px;
        }

        .result-table div {
          padding: 14px;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }

        .result-table span {
          display: block;
          font-size: 12px;
          color: #777;
          margin-bottom: 5px;
        }

        .result-table b {
          font-size: 16px;
        }

        .result-img {
          width: 180px;
          margin-top: 20px;
          border-radius: 12px;
        }

        .footer {
          margin-top: 25px;
          font-size: 13px;
          color: #555;
        }

        @media print {
          button { display: none; }
        }
      </style>
    </head>

    <body>

      <div class="certificate">

        <!-- LOGO -->
        <img src="IMG_4996.jpeg" class="logo">

        <h1>Shri Shyam Diamonds</h1>
        <p>Certified • Tested • Trusted</p>

        ${table}
        ${img}

        <div class="footer">
          <p>This certificate is generated from online diamond verification system.</p>
          <p>Final grading is subject to COH Gemological policies.</p>
        </div>

        <br>
        <button onclick="window.print()">Print / Save as PDF</button>

      </div>

    </body>
    </html>
  `);

  win.document.close();
}

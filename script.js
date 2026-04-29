const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();

  if (!code) {
    document.getElementById("result").innerHTML = "<h3 style='color:red;'>Please enter verification code</h3>";
    return;
  }

  // mobile-safe direct open
  window.location.href = API_URL + "?code=" + encodeURIComponent(code);
}

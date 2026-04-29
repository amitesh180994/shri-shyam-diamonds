const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/exec";

function verifyProduct() {
  var code = document.getElementById("codeInput").value.trim().toUpperCase();

  if (!code) {
    alert("Enter code");
    return;
  }

  window.open(API_URL + "?code=" + encodeURIComponent(code), "_blank");
}

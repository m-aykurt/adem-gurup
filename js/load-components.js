document.addEventListener("DOMContentLoaded", function () {
  // Header'ı yükle
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
    })
    .catch((error) => {
      console.error("Header yüklenirken hata oluştu:", error);
    });

  // Footer'ı yükle
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => {
      console.error("Footer yüklenirken hata oluştu:", error);
    });
});

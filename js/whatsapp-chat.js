document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("whatsappButton");
  const whatsappChat = document.getElementById("whatsappChat");
  const closeChat = document.getElementById("closeChat");
  const whatsappForm = document.getElementById("whatsappForm");
  const whatsappInput = document.getElementById("whatsappInput");

  // WhatsApp numarası
  const phoneNumber = "905538262600"; // Doktorun WhatsApp numarası

  // Chat penceresini aç/kapat
  whatsappButton.addEventListener("click", function (e) {
    e.preventDefault();
    whatsappChat.classList.toggle("show");
  });

  closeChat.addEventListener("click", function () {
    whatsappChat.classList.remove("show");
  });

  // Form gönderildiğinde
  whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = whatsappInput.value;
    if (message.trim()) {
      // WhatsApp API URL'ini oluştur
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      // Yeni pencerede WhatsApp'ı aç
      window.open(whatsappUrl, "_blank");
      // Input'u temizle
      whatsappInput.value = "";
      // Chat penceresini kapat
      whatsappChat.classList.remove("show");
    }
  });
});

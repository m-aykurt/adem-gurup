document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("whatsappButton");
  const whatsappChat = document.getElementById("whatsappChat");
  const closeChat = document.getElementById("closeChat");
  const whatsappForm = document.getElementById("whatsappForm");
  const whatsappInput = document.getElementById("whatsappInput");

  // WhatsApp numarası - uluslararası formatta (+90 olmadan)
  const phoneNumber = "905538262600"; // Doktorun WhatsApp numarası

  // Otomatik mesaj şablonları
  const messageTemplates = {
    randevu: "Merhaba, randevu almak istiyorum.",
    bilgi: "Merhaba, klinik hizmetleriniz hakkında bilgi almak istiyorum.",
    fiyat: "Merhaba, tedavi fiyatları hakkında bilgi alabilir miyim?",
    acil: "Merhaba, acil bir diş sorunum var. Yardımcı olabilir misiniz?",
  };

  // Klinik çalışma saatleri (Saat bazında - 24 saat formatında)
  const workingHours = {
    start: 9, // 09:00
    end: 18, // 18:00
  };

  // Varsayılan mesaj
  const defaultMessage = messageTemplates.randevu;

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
    const message = whatsappInput.value.trim();
    if (message) {
      openWhatsApp(message);
    }
  });

  // Mesaj şablonları ve direkt iletişim butonu oluşturma
  function createMessageTemplateButtons() {
    const directContactDiv = document.createElement("div");
    directContactDiv.className = "direct-contact-btn";

    // Öneri mesaj butonları
    const suggestionButtons = `
      <p>Hızlı iletişim için:</p>
      <div class="template-buttons">
        <button class="template-btn" data-template="randevu">Randevu Al</button>
        <button class="template-btn" data-template="bilgi">Bilgi Al</button>
        <button class="template-btn" data-template="fiyat">Fiyat Sor</button>
        <button class="template-btn" data-template="acil">Acil Durum</button>
      </div>
      <p class="small-text">veya <a href="#" id="directContactLink">direkt mesaj yazabilirsiniz</a></p>
    `;

    directContactDiv.innerHTML = suggestionButtons;

    const chatBody = document.querySelector(".chat-body");
    chatBody.appendChild(directContactDiv);

    // Şablon butonlarına tıklama olayı ekleme
    const templateButtons = document.querySelectorAll(".template-btn");
    templateButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const templateKey = this.getAttribute("data-template");
        const template = messageTemplates[templateKey] || defaultMessage;
        openWhatsApp(template);
      });
    });

    // Direkt iletişim linkine tıklanınca
    document
      .getElementById("directContactLink")
      .addEventListener("click", function (e) {
        e.preventDefault();
        // Sadece input kutusuna odaklan
        whatsappInput.focus();
      });
  }

  // Şablonları oluştur
  createMessageTemplateButtons();

  // Mesaj gönderme zamanını kontrol etme
  function isWorkingHours() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Pazar, 6 = Cumartesi

    // Hafta sonu kontrolü (Pazar=0, Cumartesi=6)
    const isWeekend = currentDay === 0 || currentDay === 6;

    // Çalışma saatleri içinde mi kontrolü
    const isDuringWorkHours =
      currentHour >= workingHours.start && currentHour < workingHours.end;

    return !isWeekend && isDuringWorkHours;
  }

  // WhatsApp'ı açma fonksiyonu
  function openWhatsApp(message) {
    try {
      let finalMessage = message;

      // Çalışma saatleri dışındaysa mesaja not ekle
      if (!isWorkingHours()) {
        finalMessage = `${message}\n\n(Not: Mesai saatleri dışında gönderilmiştir. İlk fırsatta dönüş yapılacaktır.)`;
      }

      // WhatsApp API URL'ini oluştur
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        finalMessage
      )}`;

      // Mobil cihaz kontrolü
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // Mobil cihazda ise direkt WhatsApp uygulamasına yönlendir
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        // Desktop ise yeni pencerede aç
        window.open(whatsappUrl, "_blank");
      }

      // Input'u temizle
      whatsappInput.value = "";

      // Chat penceresini kapat
      setTimeout(() => {
        whatsappChat.classList.remove("show");
      }, 500);
    } catch (error) {
      console.error("WhatsApp bağlantısı açılırken bir hata oluştu:", error);
      alert(
        "WhatsApp bağlantısı açılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  }
});

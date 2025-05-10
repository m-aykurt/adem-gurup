document.addEventListener("DOMContentLoaded", function () {
  // URL'den tedavi parametresini al
  const urlParams = new URLSearchParams(window.location.search);
  const tedavi = urlParams.get("tedavi");

  // Tedavi içeriğini yükle
  const content = getTreatmentContent(tedavi);

  // Sayfa içeriğini güncelle
  updatePageContent(content);
});

function updatePageContent(content) {
  // Başlık güncelleme
  document.querySelector(".breadcrumbs h2").textContent = content.title;
  document.querySelector(".bread-list .active").textContent = content.title;

  // Detay bilgileri güncelleme
  const details = document.querySelector(".date ul");
  details.innerHTML = `
        <li><span>Tedavi :</span> ${content.details.tedavi}</li>
        <li><span>Süre :</span> ${content.details.sure}</li>
        <li><span>Anestezi :</span> ${content.details.anestezi}</li>
        <li><span>Kalıcılık :</span> ${content.details.kalicilik}</li>
    `;

  // İçerik güncelleme
  const bodyText = document.querySelector(".body-text");
  bodyText.innerHTML = `
        <h3>${content.title}</h3>
        <p>${content.description}</p>
        
        ${content.sections
          .map(
            (section) => `
            <h4>${section.title}</h4>
            <p>${section.content}</p>
        `
          )
          .join("")}
        
        <h4>Avantajlar</h4>
        <ul>
            ${content.advantages.map((adv) => `<li>${adv}</li>`).join("")}
        </ul>
        
       
    `;
}

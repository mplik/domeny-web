// Skrypt do dynamicznego ładowania opinii klientów
fetch('opinie-klientow.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('opinie-klientow');
    container.innerHTML = '<h2>Opinie naszych klientów</h2>' +
      '<div class="opinie-klientow-list">' +
      data.map(opinia => `
        <div class="opinia-box">
          <p>"${opinia.tekst}"</p>
          <strong>${opinia.autor}</strong>
        </div>
      `).join('') +
      '</div>';
  });

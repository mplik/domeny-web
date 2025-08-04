document.addEventListener('DOMContentLoaded', function() {
  const listContainer = document.querySelector('.recently-sold-list');
  if (!listContainer) return;

  fetch('sold-domains.json')
    .then(response => response.json())
    .then(domains => {
      listContainer.innerHTML = '';
      domains.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="domain-name">${item.domain}</span>
          <span class="sold-date">${formatDate(item.date)}</span>
          <span class="sold-price">${item.price}</span>
        `;
        listContainer.appendChild(li);
      });
    })
    .catch(() => {
      listContainer.innerHTML = '<li>Błąd ładowania danych domen.</li>';
    });

  function formatDate(dateStr) {
    // Format: YYYY-MM-DD -> DD-MM-YYYY
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }
});

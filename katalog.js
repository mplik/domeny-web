document.addEventListener('DOMContentLoaded', () => {
  const domainsList = document.getElementById('domains-list');
  const searchInput = document.getElementById('search');
  const extensionFilter = document.getElementById('extension-filter');
  const categoryFilter = document.getElementById('category-filter');
  const minPrice = document.getElementById('min-price');
  const maxPrice = document.getElementById('max-price');

  let domains = [];

  fetch('katalog-domen.json')
    .then(res => res.json())
    .then(data => {
      domains = data;
      renderDomains(domains);
    });

  function renderDomains(domainsToShow) {
    if (domainsToShow.length === 0) {
      domainsList.innerHTML = '<p>Brak domen spełniających kryteria.</p>';
      return;
    }
    domainsList.innerHTML = domainsToShow.map(domain => `
      <div class="domain-card">
        <h2>${domain.name}</h2>
        <p>Kategoria: ${domain.category}</p>
        <p>Końcówka: ${domain.extension}</p>
        <p>Cena: ${domain.price} PLN</p>
        <p>${domain.description}</p>
      </div>
    `).join('');
  }

  function filterDomains() {
    let filtered = domains.filter(domain => {
      const search = searchInput.value.toLowerCase();
      const ext = extensionFilter.value;
      const cat = categoryFilter.value;
      const min = minPrice.value ? parseInt(minPrice.value) : 0;
      const max = maxPrice.value ? parseInt(maxPrice.value) : Infinity;
      return (
        domain.name.toLowerCase().includes(search) &&
        (ext === '' || domain.extension === ext) &&
        (cat === '' || domain.category === cat) &&
        domain.price >= min &&
        domain.price <= max
      );
    });
    renderDomains(filtered);
  }

  searchInput.addEventListener('input', filterDomains);
  extensionFilter.addEventListener('change', filterDomains);
  categoryFilter.addEventListener('change', filterDomains);
  minPrice.addEventListener('input', filterDomains);
  maxPrice.addEventListener('input', filterDomains);
});

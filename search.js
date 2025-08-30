document.addEventListener('DOMContentLoaded', function() {
  let domains = [];

  // Wczytaj katalog domen z pliku JSON
  fetch('katalog-domen.json')
    .then(response => response.json())
    .then(data => {
      domains = data;
    });

  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  const resultsDiv = document.getElementById('search-results');

  function showResults(query) {
    if (!query.trim()) {
      resultsDiv.innerHTML = '';
      return;
    }
    const filtered = domains.filter(d =>
      d.name && d.name.toLowerCase().includes(query.toLowerCase())
    );
    resultsDiv.innerHTML = filtered.length
      ? filtered.map(d => `
          <div class="result-item">
            <span class="domain-name">${d.name}</span>
            <a href="https://buy.stripe.com/cN26rJ9ZJ1DffU48wx" class="buy-now-btn" target="_blank">Kup teraz</a>
          </div>
        `).join('')
      : '<div>Brak wyników.</div>';
  }

  btn.addEventListener('click', () => {
    showResults(input.value);
  });

  input.addEventListener('input', () => {
    showResults(input.value);
  });

  // Obsługa Enter w polu input
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      showResults(input.value);
    }
  });
});

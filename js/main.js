// Fetch & render products grid
if (document.getElementById('product-grid')) {
  fetch('data/products.json')
    .then(r => r.json())
    .then(products => {
      const grid = document.getElementById('product-grid');
      products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
	card.innerHTML = `
  <div class="product-image">
    <img
      src="images/products/${p.id}.jpg"
      alt="${p.name}"
      onerror="this.parentElement.parentElement.remove()"
    >
  </div>
  <h4>${p.name}</h4>
  <a href="products/${p.id}.html">Details</a>
`;

        grid.appendChild(card);
      });
    });
}

// Render single product detail
if (document.getElementById('product-detail')) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  fetch('data/products.json')
    .then(r => r.json())
    .then(products => {
      const p = products.find(x=>x.id===id);
      if (!p) {
        document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
        return;
      }
      document.getElementById('product-detail').innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.image}" alt="${p.name}" style="max-width:100%;margin:1rem 0;">
        <p>${p.description}</p>
        <ul>${p.specs.map(s=>`<li>${s}</li>`).join('')}</ul>
        <a class="btn" href="contact.html?product=${encodeURIComponent(p.name)}">Contact for Quote</a>
      `;
    });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });
}

// Close mobile nav on link click (optional)
siteNav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => siteNav.classList.remove('active'))
);


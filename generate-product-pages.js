// generate-product-pages.js
const fs   = require('fs');
const path = require('path');

// Paths
const productsPath = path.join(__dirname, 'data', 'products.json');
const outDir       = path.join(__dirname, 'products');

// Load products.json
if (!fs.existsSync(productsPath)) {
  console.error('❌ data/products.json not found');
  process.exit(1);
}
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Ensure output folder
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Generate one page per product
products.forEach(p => {
  const specsList = Array.isArray(p.specs) ? p.specs : [];
  const desc = p.description && p.description.trim()
    ? p.description
    : `The ${p.name} combines robust construction with intuitive controls—ideal for craftsmen and production shops alike. Engineered for precision, it delivers clean, consistent results on every job.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${p.name} — Quick Response Inc.</title>
  <link rel="stylesheet" href="../css/styles.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  <!-- Lightbox CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css"
  />
</head>
<body>
  <header class="site-header">
    <div class="container header-container">
      <h1 class="logo">Quick Response Inc.</h1>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav">
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../about.html">About Us</a></li>
          <li><a href="../products.html">Products</a></li>
          <li><a href="../contact.html">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Product Detail Section -->
  <section class="container section product-detail">
    <!-- Left: Lightbox Image -->
    <div class="lightbox-container fade-in">
      <a href="../images/products/${p.id}.jpg"
         data-lightbox="product"
         data-title="${p.name}">
        <img src="../images/products/${p.id}.jpg" alt="${p.name}">
      </a>
    </div>

    <!-- Right: Info & CTA -->
    <div class="product-info fade-in">
      <h2 class="section-title">${p.name}</h2>
      <p>${desc}</p>
      ${specsList.length
        ? `<ul>
            ${specsList.map(s => `<li>${s}</li>`).join('\n            ')}
          </ul>`
        : ''}
      <a class="btn cta-btn"
         href="../contact.html?product=${encodeURIComponent(p.name)}">
        Request a Quote
      </a>
    </div>
  </section>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Quick Response Inc.</p>
    </div>
  </footer>

  <!-- Lightbox JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;

  // Write out the HTML file
  const outFile = path.join(outDir, `${p.id}.html`);
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`✔️ Generated ${outFile}`);
});

// Final log
console.log(`✅ Generated ${products.length} product pages.`);

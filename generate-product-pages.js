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

// Ensure output folder exists
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Common header and footer
const header = `<header class="site-header">
  <div class="container header-flex">
    <a href="index.html" class="logo" aria-label="Quick Response Inc. Home">Quick Response Inc.</a>
    <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    <nav class="site-nav">
      <ul class="nav-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="contact.html" class="btn nav-cta">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</header>`;

const footer = `<footer class="site-footer">
  <div class="container footer-flex">
    <nav class="footer-nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <div class="footer-legal">
      <a href="terms.html">Terms of Service</a> <span>|</span>
      <a href="privacy.html">Privacy Policy</a>
    </div>
    <p>&copy; 2025 Quick Response Inc. All rights reserved.</p>
  </div>
</footer>`;

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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css"/>
</head>
<body>
  ${header}

  <section class="container section product-detail">
    <!-- 1) Left: Lightbox Image -->
    <div class="lightbox-container fade-in">
      <a
        href="../images/products/${p.id}.jpg"
        data-lightbox="product"
        data-title="${p.name}"
      >
        <img src="../images/products/${p.id}.jpg" alt="${p.name}">
      </a>
    </div>

    <!-- 2) Middle: Product Info -->
    <div class="product-info fade-in">
      <h2 class="section-title">${p.name}</h2>
      <p>${desc}</p>
      ${specsList.length
        ? `<ul>
            ${specsList.map(s => `<li>${s}</li>`).join('\n            ')}
          </ul>`
        : ''}
    </div>

    <!-- 3) Right: CTA Button -->
    <div class="product-cta fade-in">
      <a
        class="btn cta-btn"
        href="../contact.html?product=${encodeURIComponent(p.name)}"
      >
        Request a Quote
      </a>
    </div>
  </section>


  ${footer}

  <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>`;

  const outFile = path.join(outDir, `${p.id}.html`);
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`✔️ Generated ${outFile}`);
});

console.log(`✅ Generated ${products.length} product pages.`);

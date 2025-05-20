// generate-product-pages.js
const fs   = require('fs');
const path = require('path');

// Load your products.json
const productsPath = path.join(__dirname, 'data', 'products.json');
if (!fs.existsSync(productsPath)) {
  console.error('❌ data/products.json not found');
  process.exit(1);
}
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Prepare output folder
const outDir = path.join(__dirname, 'products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

products.forEach(p => {
  // Safely pull specs (even if missing)
  const specsList = Array.isArray(p.specs) ? p.specs : [];

  // Use existing description or generate a placeholder
  const desc = p.description && p.description.trim()
    ? p.description
    : `The ${p.name} is engineered for reliability and precision—perfect for professional woodworking and custom projects.`;

  // Build HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${p.name} — Quick Response Inc.</title>
  <link rel="stylesheet" href="../css/styles.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
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

  <section class="container section" id="product-detail">
    <h2 class="section-title fade-in">${p.name}</h2>
    <img class="fade-in" src="../images/products/${p.id}.jpg" alt="${p.name}">
    <p class="fade-in">${desc}</p>
    ${specsList.length
      ? `<ul class="fade-in">
          ${specsList.map(s => `<li>${s}</li>`).join('\n          ')}
        </ul>`
      : ''}
    <a class="btn fade-in" href="../contact.html?product=${encodeURIComponent(p.name)}">
      Contact for Quote
    </a>
  </section>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Quick Response Inc.</p>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;

  // Write out the file
  const filename = path.join(outDir, `${p.id}.html`);
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✔️  Generated ${filename}`);
});

console.log(`✅ All ${products.length} product pages generated.`);

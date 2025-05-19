// generate-product-pages.js
const fs = require('fs');
const path = require('path');

// load products.json
const productsPath = path.join(__dirname, 'data', 'products.json');
if (!fs.existsSync(productsPath)) {
  console.error('❌ data/products.json not found');
  process.exit(1);
}
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// ensure output folder exists
const outDir = path.join(__dirname, 'products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

products.forEach(p => {
  // fallback to empty array if specs missing or not an array
  const specsList = Array.isArray(p.specs) ? p.specs : [];

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
    <div class="container">
      <h1 class="logo">Quick Response Inc.</h1>
      <nav>
        <a href="../index.html">Home</a>
        <a href="../about.html">About Us</a>
        <a href="../products.html">Products</a>
        <a href="../contact.html">Contact Us</a>
      </nav>
    </div>
  </header>

  <main class="container" id="product-detail">
    <h2>${p.name}</h2>
    <img src="../images/products/${p.id}.jpg" alt="${p.name}">
    <p>${p.description || ''}</p>
    ${specsList.length
      ? `<ul>
        ${specsList.map(s => `<li>${s}</li>`).join('\n        ')}
      </ul>`
      : ''}
    <a class="btn" href="../contact.html?product=${encodeURIComponent(p.name)}">
      Contact for Quote
    </a>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Quick Response Inc.</p>
    </div>
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${p.id}.html`), html, 'utf8');
  console.log(`✔️  Generated products/${p.id}.html`);
});

console.log(`✅ Generated ${products.length} product pages.`);

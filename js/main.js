// FETCH & INSERT HEADER/FOOTER
['header','footer'].forEach(part => {
  fetch(`partials/${part}.html`)
    .then(res => res.text())
    .then(html => document.getElementById(`include-${part}`).innerHTML = html);
});

// MOBILE NAV
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  document.querySelector('.site-nav').classList.toggle('open');
});

// SCROLLREVEAL ANIMATIONS
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal().reveal('.feature-card', { distance: '50px', duration: 600, easing: 'ease-out' });
  ScrollReveal().reveal('.hero-content h1', { delay: 200, origin: 'bottom' });
}

// PRODUCT FETCH EXAMPLE (for featured carousel)
if (typeof Swiper !== 'undefined') {
  const featuredSwiper = new Swiper('#featuredSwiper', {
    slidesPerView: 3, spaceBetween: 20,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 640:{slidesPerView:1},1024:{slidesPerView:2},1280:{slidesPerView:3} }
  });
  fetch('data/products.json')
    .then(r=>r.json())
    .then(data=>{
      data.slice(0,6).forEach(p=>{
        const slide = document.createElement('div'); slide.className='swiper-slide';
        slide.innerHTML = `
          <div class="card">
            <img src="images/products/${p.id}.jpg" alt="${p.name}">
            <h3>${p.name}</h3>
            <a href="contact.html?pid=${p.id}" class="btn btn-secondary">Request Quote</a>
          </div>`;
        featuredSwiper.appendSlide(slide);
      });
    });
}
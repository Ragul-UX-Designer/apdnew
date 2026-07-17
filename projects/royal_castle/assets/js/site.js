/* ============================================================
   The Royal Castle — shared shell (header, footer, interactions)
   Injects nav + footer + lightbox into every page, then wires up.
============================================================ */
(function(){
  "use strict";

  /* ---------- page map ---------- */
  var PAGES = [
    { href:'index.html',        label:'Home' },
    { href:'advantages.html',   label:'Advantages' },
    { href:'club-aurum.html',   label:'Club Aurum' },
    { href:'amenities.html',    label:'Amenities' },
    { href:'floor-plans.html',  label:'Floor Plans' },
    { href:'gallery.html',      label:'Gallery' },
    { href:'testimonials.html', label:'Testimonials' }
  ];
  var file = (location.pathname.split('/').pop() || 'index.html');
  if(file === '') file = 'index.html';

  var navLinks = PAGES.map(function(p){
    var active = p.href === file ? 'text-gold' : '';
    return '<li><a class="navlink hover:text-gold transition '+active+'" href="'+p.href+'">'+p.label+'</a></li>';
  }).join('');

  var mobLinks = PAGES.map(function(p){
    var active = p.href === file ? 'text-gold' : '';
    return '<li><a class="mob block py-2.5 border-b border-gold/10 '+active+'" href="'+p.href+'">'+p.label+'</a></li>';
  }).join('');

  /* ---------- HEADER ---------- */
  var header =
  '<div class="block w-full bg-maroon-deep text-cream/90 text-xs">'+
    '<div class="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">'+
      '<div>'+
        '<a href="mailto:contact@amarprakash.in" class="hover:text-gold-light transition flex items-center">'+
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'+
          'contact@amarprakash.in'+
        '</a>'+
      '</div>'+
      '<div>'+
        '<a href="tel:04440005000" class="hover:text-gold-light transition flex items-center">'+
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>'+
          '044 4000 5000'+
        '</a>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<header id="nav" class="glass sticky top-0 z-50 transition-all">'+
    '<nav class="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between h-[74px]">'+
      '<a href="index.html" class="flex items-center gap-3 shrink-0">'+
        '<img src="assets/img/the-royal-castle.png" alt="The Royal Castle" class="h-11 w-auto drop-shadow" onerror="this.style.display=\'none\'"/>'+
      '</a>'+
      '<ul class="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">'+navLinks+'</ul>'+
      '<div class="flex items-center gap-3">'+
        '<a href="enquire.html" class="hidden sm:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm">Book a Visit</a>'+
        '<button id="burger" aria-label="Menu" class="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-gold/40">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="h-5 w-5 text-gold"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'+
        '</button>'+
      '</div>'+
    '</nav>'+
    '<div id="mobileMenu" class="lg:hidden hidden border-t border-gold/15 bg-maroon-deep/95 backdrop-blur-md">'+
      '<ul class="px-6 py-4 space-y-1 text-sm font-medium">'+mobLinks+
        '<li class="pt-4"><a class="mob btn-gold text-center block w-full py-3 rounded-full text-sm font-semibold shadow-lg" href="enquire.html">Book a Visit</a></li>'+
      '</ul>'+
    '</div>'+
  '</header>';

  /* ---------- FOOTER + floating CTA + lightbox ---------- */
  var footer =
  '<footer class="panel-bg pt-16 pb-12">'+
    '<div class="max-w-7xl mx-auto px-6">'+
      '<div class="grid md:grid-cols-4 gap-10">'+
        '<div class="bg-ink p-6 rounded-xl border border-gold/10 shadow-lg">'+
          '<img src="assets/img/amarprakash-logo.png" alt="Amarprakash" class="h-10 mb-6" onerror="this.src=\'assets/img/the-royal-castle.png\'"/>'+
          '<p class="text-cream/70 text-sm leading-relaxed mb-6">Tamilnadu\'s most trusted developer, building quality homes across Chennai since 2004.<br><br>Happiness lives here.</p>'+
          '<div class="flex gap-2">'+
            '<div class="bg-white rounded p-1.5 w-10 h-10 flex items-center justify-center"><img src="assets/img/credai_logo.jpg" alt="CREDAI" class="max-w-full max-h-full" onerror="this.style.display=\'none\'"/></div>'+
            '<div class="bg-white rounded p-1.5 w-10 h-10 flex items-center justify-center"><img src="assets/img/igbc_logo.jpg" alt="IGBC" class="max-w-full max-h-full" onerror="this.style.display=\'none\'"/></div>'+
            '<div class="bg-white rounded p-1.5 w-10 h-10 flex items-center justify-center"><img src="assets/img/bai_logo.jpg" alt="BAI" class="max-w-full max-h-full" onerror="this.style.display=\'none\'"/></div>'+
            '<div class="bg-white rounded p-1.5 w-10 h-10 flex items-center justify-center"><img src="assets/img/tuv_logo.jpg" alt="TUV" class="max-w-full max-h-full" onerror="this.style.display=\'none\'"/></div>'+
          '</div>'+
        '</div>'+
        '<div>'+
          '<h4 class="text-white font-semibold mb-6 tracking-wide text-base">Explore</h4>'+
          '<ul class="space-y-4 text-sm text-cream/70">'+
            '<li><a href="index.html" class="hover:text-gold transition">Home</a></li>'+
            '<li><a href="advantages.html" class="hover:text-gold transition">Advantages</a></li>'+
            '<li><a href="club-aurum.html" class="hover:text-gold transition">Club Aurum</a></li>'+
            '<li><a href="amenities.html" class="hover:text-gold transition">Amenities</a></li>'+
            '<li><a href="floor-plans.html" class="hover:text-gold transition">Floor &amp; Site Plans</a></li>'+
            '<li><a href="gallery.html" class="hover:text-gold transition">Gallery</a></li>'+
            '<li><a href="testimonials.html" class="hover:text-gold transition">Testimonials</a></li>'+
          '</ul>'+
        '</div>'+
        '<div>'+
          '<h4 class="text-white font-semibold mb-6 tracking-wide text-base">Quick Links</h4>'+
          '<ul class="space-y-4 text-sm text-cream/70">'+
            '<li><a href="index.html" class="hover:text-gold transition">Chennai Apartments</a></li>'+
            '<li><a href="amarprakash-the-royal-castle-review-of-entire-project.html" class="hover:text-gold transition">Amarprakash Royal Castle Review</a></li>'+
            '<li><a href="https://www.amarprakash.in/amarprakash-builders-chennai-review.html" target="_blank" class="hover:text-gold transition">Amarprakash builders chennai review</a></li>'+
            '<li><a href="properties-for-sale-in-orr-chennai.html" class="hover:text-gold transition">ORR Chennai</a></li>'+
            '<li><a href="https://www.amarprakash.in/customer-reviews/navin-amar-prakash-review.html" target="_blank" class="hover:text-gold transition">Amar prakash review</a></li>'+
            '<li><a href="https://www.amarprakash.in/customer-reviews/mavn-amar-prakash-chennai-reviews.html" target="_blank" class="hover:text-gold transition">Amar prakash chennai reviews</a></li>'+
            '<li><a href="https://www.amarprakash.in/reviews-on-amarprakash-chennai-reviews.html" target="_blank" class="hover:text-gold transition">Amarprakash reviews</a></li>'+
            '<li><a href="https://www.templewaves.in/amarprakash-positive-reviews-are-validated.html" target="_blank" class="hover:text-gold transition">Amarprakash positive reviews</a></li>'+
          '</ul>'+
        '</div>'+
        '<div>'+
          '<h4 class="text-white font-semibold mb-6 tracking-wide text-base">Get in Touch</h4>'+
          '<ul class="space-y-4 text-sm text-cream/70 mb-8">'+
            '<li class="flex gap-3 items-start"><svg class="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>The Royal Castle, Thirumudivakkam, Chennai</span></li>'+
            '<li class="flex gap-3"><svg class="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg><a href="tel:04440005000" class="hover:text-gold transition">(044) 4000 5000</a></li>'+
            '<li class="flex gap-3"><svg class="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><a href="mailto:contact@amarprakash.in" class="hover:text-gold transition">contact@amarprakash.in</a></li>'+
          '</ul>'+
          '<div class="flex gap-3">'+
            '<a href="https://www.instagram.com/amarprakash_developers/" target="_blank" rel="noopener" class="grid place-items-center w-9 h-9 rounded bg-[#2a201c] hover:bg-gold hover:text-maroon-deep transition text-cream/70"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>'+
            '<a href="https://www.facebook.com/AmarprakashDevelopers/" target="_blank" rel="noopener" class="grid place-items-center w-9 h-9 rounded bg-[#2a201c] hover:bg-gold hover:text-maroon-deep transition text-cream/70"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>'+
            '<a href="https://x.com/Amarprakash4633" target="_blank" rel="noopener" class="grid place-items-center w-9 h-9 rounded bg-[#2a201c] hover:bg-gold hover:text-maroon-deep transition text-cream/70"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>'+
            '<a href="https://www.youtube.com/@amarprakashdeveloperspvtltd" target="_blank" rel="noopener" class="grid place-items-center w-9 h-9 rounded bg-[#2a201c] hover:bg-gold hover:text-maroon-deep transition text-cream/70"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="border-t border-white/10 my-10"></div>'+
      '<div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50">'+
        '<p>© <span id="yr"></span> <a href="chennai-cmda-approved-builders.html" class="hover:text-gold transition">Amarprakash — CMDA Approved Builders in Chennai</a>. All Rights Reserved.</p>'+
        '<div class="flex gap-5"><a href="privacy.html" class="hover:text-gold transition">Privacy Policy</a><a href="disclaimer.html" class="hover:text-gold transition">Disclaimer</a><a href="feedback.html" class="hover:text-gold transition">Feedback</a></div>'+
      '</div>'+
    '</div>'+
  '</footer>'+
  '<div id="lightbox" class="fixed inset-0 z-[60] hidden items-center justify-center p-4">'+
    '<button id="lbClose" class="absolute top-5 right-6 text-gold text-4xl leading-none hover:scale-110 transition">×</button>'+
    '<div id="lbInner" class="max-w-6xl w-full aspect-video"></div>'+
  '</div>'+
  '<button id="backToTop" class="fixed bottom-6 right-5 md:right-6 z-50 p-3 rounded-full bg-gold text-maroon-deep shadow-[0_4px_14px_rgba(201,162,75,0.4)] opacity-0 translate-y-10 transition-all duration-300 pointer-events-none hover:scale-110 flex items-center justify-center" aria-label="Back to Top"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg></button>'+
  '<a href="https://wa.me/918925847360" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" class="fixed bottom-20 right-5 md:right-6 z-50 p-3 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>';

  var hEl = document.getElementById('site-header'); if(hEl) hEl.outerHTML = header;
  var fEl = document.getElementById('site-footer'); if(fEl) fEl.innerHTML = footer;

  /* ================= INTERACTIONS ================= */
  var root = document.documentElement;


  /* ---- mobile menu ---- */
  var mm = document.getElementById('mobileMenu');
  var burger = document.getElementById('burger');
  if(burger && mm) burger.addEventListener('click', function(){ mm.classList.toggle('hidden'); });
  document.querySelectorAll('.mob').forEach(function(a){ a.addEventListener('click', function(){ if(mm) mm.classList.add('hidden'); }); });

  /* ---- nav & back to top on scroll ---- */
  var nav = document.getElementById('nav');
  var btt = document.getElementById('backToTop');
  window.addEventListener('scroll', function(){ 
    if(nav) nav.classList.toggle('shadow-2xl', window.scrollY > 40);
    if(btt) {
      if(window.scrollY > 400) btt.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      else btt.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }
  });
  if(btt) btt.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---- reveal ---- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ---- counters ---- */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return; cio.unobserve(e.target);
      var el = e.target, end = +el.dataset.count, cur = 0, step = Math.max(1, Math.round(end/60));
      var t = setInterval(function(){ cur += step; if(cur >= end){ cur = end; clearInterval(t); } el.textContent = cur; }, 20);
    });
  }, { threshold:0.5 });
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* ---- floor plan tabs (floor-plans page only) ---- */
  var planImg = document.getElementById('planImg');
  if(planImg){
    document.querySelectorAll('.plantab').forEach(function(btn){
      btn.addEventListener('click', function(){
        document.querySelectorAll('.plantab').forEach(function(b){ b.classList.remove('active','bg-gold','text-maroon-deep'); });
        btn.classList.add('active','bg-gold','text-maroon-deep');
        planImg.src = btn.dataset.src;
      });
    });
  }

  /* ---- lightbox (images + youtube) ---- */
  var lb = document.getElementById('lightbox'), lbInner = document.getElementById('lbInner');
  function openLB(html){ lbInner.innerHTML = html; lb.classList.remove('hidden'); lb.classList.add('flex'); document.body.classList.add('no-scroll'); }
  function closeLB(){ lb.classList.add('hidden'); lb.classList.remove('flex'); lbInner.innerHTML=''; document.body.classList.remove('no-scroll'); }
  var lbClose = document.getElementById('lbClose');
  if(lbClose) lbClose.addEventListener('click', closeLB);
  if(lb) lb.addEventListener('click', function(e){ if(e.target === lb) closeLB(); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLB(); });

  document.querySelectorAll('.ytbtn').forEach(function(b){
    b.addEventListener('click', function(){
      var id = b.dataset.yt;
      openLB('<iframe class="w-full h-full rounded-xl" src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0" title="The Royal Castle" frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>');
    });
  });
  document.querySelectorAll('.gitem').forEach(function(img){
    img.addEventListener('click', function(){
      var src = img.dataset.full || img.src;
      openLB('<div class="w-full h-full flex items-center justify-center"><img src="'+src+'" alt="" class="max-w-full max-h-[88vh] object-contain rounded-lg"/></div>');
    });
  });

  /* ---- form validation ---- */
  document.querySelectorAll('form').forEach(function(f){
    // if form has novalidate or not, we can validate it here
    f.addEventListener('submit', function(e){
      var isValid = true;
      f.querySelectorAll('.field-error').forEach(function(err){ err.remove(); });
      
      f.querySelectorAll('[required]').forEach(function(inp){
        inp.classList.remove('!border-red-400');
        if(!inp.value.trim()){
          isValid = false;
          inp.classList.add('!border-red-400');
          var err = document.createElement('div');
          err.className = 'field-error text-red-400 text-xs !mt-1 px-2 text-left w-full';
          err.textContent = inp.placeholder ? inp.placeholder.replace(' *','') + ' is required' : 'This field is required';
          inp.parentNode.insertBefore(err, inp.nextSibling);
        }
      });
      
      f.querySelectorAll('input[type="email"]').forEach(function(inp){
        if(inp.value.trim()){
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!emailRegex.test(inp.value.trim())){
            isValid = false;
            inp.classList.add('!border-red-400');
            var err = document.createElement('div');
            err.className = 'field-error text-red-400 text-xs !mt-1 px-2 text-left w-full';
            err.textContent = 'Please enter a valid email address';
            inp.parentNode.insertBefore(err, inp.nextSibling);
          }
        }
      });
      
      if(!isValid){
        e.preventDefault();
        var msg = f.querySelector('#formMsg');
        if(msg) msg.classList.add('hidden');
        return;
      }
      
      if(f.id === 'enquiryForm') {
        e.preventDefault();
        var msg = f.querySelector('#formMsg');
        var btn = f.querySelector('button[type="submit"]');
        if(btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
        
        fetch('https://formsubmit.co/ajax/contact@amarprakash.in', {
          method: 'POST',
          body: new FormData(f)
        })
        .then(function(response) {
          if(!response.ok) throw new Error('Network error');
          if(msg){
            msg.textContent = 'Thank you! Our team will get back to you shortly.';
            msg.classList.remove('hidden', 'text-red-400');
            msg.classList.add('text-gold-light');
          }
          f.reset();
        })
        .catch(function(error) {
          if(msg){
            msg.textContent = 'Oops! Something went wrong. Please try again.';
            msg.classList.remove('hidden', 'text-gold-light');
            msg.classList.add('text-red-400');
          }
        })
        .finally(function() {
          if(btn) { btn.disabled = false; btn.textContent = 'Book a Site Visit'; }
        });
      }
    });
  });

  /* ---- year ---- */
  var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();
})();

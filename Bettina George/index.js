function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}
setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
}, 1500);

document.addEventListener('click', (e) => {
    const card = e.target.closest('.flip');
    if (!card) return;
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', String(!expanded));
  });

  // Keyboard support (Enter/Space)
  document.addEventListener('keydown', (e) => {
    const card = e.target.closest('.flip');
    if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!expanded));
    }
  });
  document.querySelectorAll('.project-thumb').forEach(img=>{
    img.onerror = () => { img.style.background = '#f1f1f1'; img.alt += ' (image unavailable)'; };
  });
  document.querySelectorAll('.project-card').forEach(card => {
    const openPrimary = () => {
      const a = card.querySelector('.project-cta a');
      if (a && a.href) window.open(a.href, a.target === '_blank' ? '_blank' : '_self', 'noopener');
    };
    card.addEventListener('click', e => { if (!e.target.closest('a,.pill')) openPrimary(); });
    card.tabIndex = 0;
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPrimary(); }});
  });
  
  (() => {
    const balls = document.querySelectorAll('.tech-ball');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !balls.length) return;
  
    const MAX_TILT = 16;   // degrees
    const LIFT_HOVER = -10; // px (matches your hover lift)
    const LERP = (a,b,t)=>a+(b-a)*t;
  
    balls.forEach(ball => {
      let rx = 0, ry = 0;           // current
      let targetRx = 0, targetRy = 0; // target
      let raf = null;
  
      const animate = () => {
        rx = LERP(rx, targetRx, 0.18);
        ry = LERP(ry, targetRy, 0.18);
        ball.style.setProperty('--rx', `${rx}deg`);
        ball.style.setProperty('--ry', `${ry}deg`);
        raf = (Math.abs(rx - targetRx) > 0.1 || Math.abs(ry - targetRy) > 0.1)
          ? requestAnimationFrame(animate) : null;
      };
  
      ball.addEventListener('mousemove', (e) => {
        const rect = ball.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0..1
        const y = (e.clientY - rect.top)  / rect.height;  // 0..1
        // map so top/left tilts up/left; center ~ 0deg
        targetRy = (x - 0.5) * (MAX_TILT * 2); // rotateY
        targetRx = (0.5 - y) * (MAX_TILT * 2); // rotateX
        if (!raf) raf = requestAnimationFrame(animate);
      });
  
      ball.addEventListener('mouseenter', () => {
        ball.style.setProperty('--lift', `${LIFT_HOVER}px`);
        ball.style.setProperty('--scale', 1.08);
      });
  
      ball.addEventListener('mouseleave', () => {
        targetRx = 0; targetRy = 0;
        ball.style.setProperty('--lift', `0px`);
        ball.style.setProperty('--scale', 1);
        if (!raf) raf = requestAnimationFrame(animate);
      });
    });
})();
  // Map each icon's alt text to its parent <li> as data-name (tooltip text)
(function mapAltToDataName(){
    document.querySelectorAll('.tech-ball').forEach(li => {
      const img = li.querySelector('img');
      if (img) li.setAttribute('data-name', img.alt || 'Tech');
    });
  })();

  // Reveal timeline items on scroll
(() => {
    const items = document.querySelectorAll('.vtl .reveal');
    if (!('IntersectionObserver' in window) || !items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(el => io.observe(el));
})();

document.getElementById('resume-link').href =
encodeURI('Resumé - Bettina 2026 (2).pdf');

  
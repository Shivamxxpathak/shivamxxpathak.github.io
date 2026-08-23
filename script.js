document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.mobile-menu-toggle');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
      nav?.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded','false');
    });
  });

  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('active');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  const name = document.querySelector('.name');
  if (name) {
    const text = name.textContent;
    name.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        name.textContent += text[i++];
        setTimeout(type, 50);
      }
    };
    setTimeout(type, 300);
  }

  const progress = document.createElement('div');
  progress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#6366f1,#10b981);width:0%;z-index:101;transition:width .2s ease;';
  document.body.appendChild(progress);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? (scrollY / max * 100) + '%' : '0%';
  });
});

const style = document.createElement('style');
style.textContent = '.nav-links a.active{color:#6366f1}.nav-links a.active::after{width:100%}';
document.head.appendChild(style);

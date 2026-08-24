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
  progress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#7c3aed,#38bdf8,#34d399);width:0%;z-index:101;transition:width .2s ease;';
  document.body.appendChild(progress);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? (scrollY / max * 100) + '%' : '0%';
  });

  // Add live demo links to the deployed Customer Churn project.
  const churnRepo = 'https://github.com/Shivamxxpathak/Customer-Churn-Prediction';
  const churnDemo = 'https://customer-churn-prediction-1nnj.onrender.com';
  document.querySelectorAll(`a[href="${churnRepo}"]`).forEach(link => {
    const container = link.parentElement;
    if (!container || container.querySelector('.live-demo-link')) return;
    const demo = link.cloneNode(true);
    demo.href = churnDemo;
    demo.classList.add('live-demo-link');
    demo.innerHTML = '<i class="ph ph-rocket-launch"></i> Live Demo';
    container.appendChild(demo);
  });

  // Highlight the navigation item for the section currently in view.
  const navTargets = [...document.querySelectorAll('.nav-links a')]
    .map(link => ({link, section: document.querySelector(link.getAttribute('href'))}))
    .filter(item => item.section);
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navTargets.forEach(({link}) => link.classList.remove('active'));
      navTargets.find(({section}) => section === entry.target)?.link.classList.add('active');
    });
  }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
  navTargets.forEach(({section}) => navObserver.observe(section));
});

const style = document.createElement('style');
style.textContent = '.nav-links a.active{color:#67e8f9}.nav-links a.active::after{width:100%}.live-demo-link{background:linear-gradient(135deg,rgba(124,58,237,.16),rgba(56,189,248,.10));border-color:rgba(103,232,249,.22)}';
document.head.appendChild(style);

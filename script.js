document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Select all sections to animate
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const navContainer = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (navContainer && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
            }
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    if (mobileToggle && navContainer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navContainer.classList.toggle('active');
            mobileToggle.classList.toggle('active', isOpen);
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Resume download handler
    const downloadBtn = document.querySelector('.download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const resumeUrl = './resume.pdf';
            window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Parallax effect on mouse move (subtle)
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach(blob => {
            const speed = blob.dataset.speed || 5;
            blob.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });

    // Add staggered animation delay to cards
    const cards = document.querySelectorAll('.card, .project-card, .cert-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Typewriter effect for the hero name (optional enhancement)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                nameElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typewriter after a delay
        setTimeout(typeWriter, 300);
    }

    // Add hover effects to project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Counter animation for stats (if you want to add numbers)
    const animateCounters = () => {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    setTimeout(updateCount, 30);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCount();
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('#github-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Mobile menu (if you add a hamburger menu later)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Add scroll progress bar (optional)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #10b981);
        width: 0%;
        z-index: 101;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Print performance metrics (for debugging)
    if (window.performance) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time: ' + pageLoadTime + 'ms');
        });
    }
});

// Add active class styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #6366f1;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

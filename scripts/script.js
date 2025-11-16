// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Add fade-in animation to sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Set hero section to visible immediately
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

// Language Switcher
const languageSwitcher = {
    currentLang: 'en',
    
    init() {
        // Check if language is saved in localStorage
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        this.switchLanguage(savedLang);
        
        // Add event listeners to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    },
    
    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update all elements with language data attributes
        document.querySelectorAll('[data-lang-' + lang + ']').forEach(element => {
            const text = element.getAttribute('data-lang-' + lang);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
};

// Initialize language switcher when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => languageSwitcher.init());
} else {
    languageSwitcher.init();
}

// Typing animation for terminal logo
function typeTerminalText() {
    const line1 = document.querySelector('.logo-line1');
    const line2 = document.querySelector('.logo-line2');
    if (!line1 || !line2) return;
    
    const currentLang = languageSwitcher.currentLang;
    const texts1 = {
        'en': 'Building the Future',
        'de': 'Die Zukunft wird gebaut',
        'tr': 'Gelecek İnşa Ediliyor'
    };
    const texts2 = {
        'en': '> Execute? (Y/N)',
        'de': '> Ausführen? (J/N)',
        'tr': '> Çalıştır? (E/H)'
    };
    
    const fullText1 = texts1[currentLang];
    const fullText2 = texts2[currentLang];
    let charIndex = 0;
    
    line1.textContent = '';
    line2.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (charIndex < fullText1.length) {
            line1.textContent = fullText1.substring(0, charIndex + 1);
            charIndex++;
        } else if (charIndex < fullText1.length + fullText2.length) {
            const line2Index = charIndex - fullText1.length;
            line2.textContent = fullText2.substring(0, line2Index + 1);
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Run typing animation on load
window.addEventListener('load', () => {
    setTimeout(typeTerminalText, 200);
});

// 3D card hover effects
document.querySelectorAll('.experience-item, .education-item, .publication-card, .article-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

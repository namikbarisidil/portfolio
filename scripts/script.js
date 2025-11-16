// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if it's just "#" (dropdown toggle) or if parent is a dropdown
        if (href === '#' || this.parentElement.classList.contains('dropdown')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
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
                element.innerHTML = text;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Dispatch custom event for language change
        window.dispatchEvent(new Event('languageChanged'));
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
    const cursor = document.querySelector('.cursor');
    if (!line1 || !line2 || !cursor) return;
    
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
    cursor.style.display = 'inline';
    
    const typeInterval = setInterval(() => {
        if (charIndex < fullText1.length) {
            line1.textContent = fullText1.substring(0, charIndex + 1);
            // Move cursor to end of line1
            line1.appendChild(cursor);
            charIndex++;
        } else if (charIndex < fullText1.length + fullText2.length) {
            const line2Index = charIndex - fullText1.length;
            line2.textContent = fullText2.substring(0, line2Index + 1);
            // Move cursor to end of line2
            line2.appendChild(cursor);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            // Keep cursor at the end after typing is complete
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link (but not dropdown toggles or dropdown items on desktop)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown toggle
            if (link.parentElement.classList.contains('dropdown')) {
                return;
            }
            // Only close mobile menu if it's actually open
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Dropdown menu functionality - simplified
(function() {
    function initDropdowns() {
        // Close dropdown when clicking on dropdown menu items
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.add('force-hide');
                    
                    // Remove force-hide after a delay
                    setTimeout(() => {
                        dropdown.classList.remove('force-hide');
                    }, 1000);
                }
            });
        });
        
        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 968) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }
})();

// Calculate and update years of experience dynamically
function updateYearsOfExperience() {
    const careerStartYear = 2006; // Started as Research Assistant in September 2006
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - careerStartYear;
    
    // Update all elements with years of experience
    document.querySelectorAll('.years-of-experience').forEach(element => {
        element.textContent = yearsOfExperience;
    });
    
    // Update meta description with dynamic years
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', 
            `Baris Idil - Software Engineering Leader with ${yearsOfExperience}+ years of experience in building scalable, event-driven platforms. Expert in microservices architecture, cloud solutions, and technical leadership.`
        );
    }
    
    // Update copyright year
    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = currentYear;
    });
}

// Run on page load
updateYearsOfExperience();

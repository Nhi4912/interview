// Modern Frontend Interview Hub JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initProgressAnimations();
    initKnowledgeCardInteractions();
    initNavigationEffects();
    initStatCounters();
    
    console.log('Frontend Interview Hub initialized');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Animate progress bars on scroll
function initProgressAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Animate progress bars if this is a progress section
                if (entry.target.classList.contains('progress-section')) {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    // Observe all cards and progress items
    document.querySelectorAll('.knowledge-card, .progress-item, .stat-card, .progress-section').forEach(el => {
        observer.observe(el);
    });
}

// Update progress bars with animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Enhanced knowledge card interactions
function initKnowledgeCardInteractions() {
    document.querySelectorAll('.knowledge-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });

        // Add click functionality and ripple effect
        card.addEventListener('click', function(e) {
            createRipple(e, this);
            
            // Navigate to href if data-href is present
            const href = this.getAttribute('data-href');
            if (href) {
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // Small delay for ripple effect
            }
        });
        
        // Add cursor pointer for clickable cards
        if (card.getAttribute('data-href')) {
            card.style.cursor = 'pointer';
        }
    });
}

// Create ripple effect for buttons and cards
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(99, 102, 241, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navigation effects
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update navigation background opacity
        const opacity = Math.min(currentScrollY / 100, 0.95);
        nav.style.background = `rgba(15, 23, 42, ${opacity})`;
    });
}

// Animate stat counters
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasWeek = text.includes('Week');
    
    let finalNumber;
    if (hasWeek) {
        finalNumber = parseInt(text);
    } else {
        finalNumber = parseInt(text.replace(/[+%]/g, ''));
    }
    
    let current = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        let displayText = Math.floor(current).toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        if (hasWeek) displayText += ' Week';
        
        element.textContent = displayText;
    }, 40);
}

// Add button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        createRipple(e, this);
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation for cards
    const cards = document.querySelectorAll('.knowledge-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initialize cards as hidden for loading animation
document.querySelectorAll('.knowledge-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Enhanced scroll effects for progress bars
function createAdvancedProgressAnimation() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                    const progressBar = entry.target.querySelector('.progress-fill');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    }
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    progressItems.forEach(item => {
        progressObserver.observe(item);
    });
}

// Initialize advanced animations
createAdvancedProgressAnimation();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// Legacy support for existing functionality
// Theme toggle functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }
  
  init() {
    // Load saved theme or default to dark for new design
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    
    // Add event listener for theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Initialize theme manager
new ThemeManager();
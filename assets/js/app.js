/**
 * Interview Preparation Hub - Interactive Features
 * Modern UI components for better learning experience
 */

class InterviewHub {
    constructor() {
        this.storageKey = 'interview-hub-progress';
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.initProgressTracking();
        this.initInteractiveCards();
        this.initTooltips();
        this.initKeyboardNavigation();
        this.initAccessibility();
        this.initVisualizations();
        this.initMobileNavigation();
        this.updateProgressDisplay();
    }

    // Progress Tracking System
    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : {
                leetcode: {},
                frontend: {},
                checklist: {},
                totalProblems: 0,
                completedProblems: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastActivity: null
            };
        } catch (error) {
            console.warn('Failed to load progress:', error);
            return {
                leetcode: {},
                frontend: {},
                checklist: {},
                totalProblems: 0,
                completedProblems: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastActivity: null
            };
        }
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.warn('Failed to save progress:', error);
        }
    }

    markProblemCompleted(category, problemId) {
        if (!this.progress[category]) {
            this.progress[category] = {};
        }
        
        const wasCompleted = this.progress[category][problemId] === 'completed';
        this.progress[category][problemId] = 'completed';
        
        if (!wasCompleted) {
            this.progress.completedProblems++;
            this.updateStreak();
            this.showAchievement(`Problem completed!`);
        }
        
        this.saveProgress();
        this.updateProgressDisplay();
    }

    markProblemInProgress(category, problemId) {
        if (!this.progress[category]) {
            this.progress[category] = {};
        }
        this.progress[category][problemId] = 'in-progress';
        this.saveProgress();
        this.updateProgressDisplay();
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.progress.lastActivity;
        
        if (lastActivity === today) {
            return; // Already counted today
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActivity === yesterday.toDateString()) {
            this.progress.currentStreak++;
        } else {
            this.progress.currentStreak = 1;
        }
        
        this.progress.longestStreak = Math.max(
            this.progress.longestStreak,
            this.progress.currentStreak
        );
        this.progress.lastActivity = today;
    }

    // Interactive Cards
    initInteractiveCards() {
        const cards = document.querySelectorAll('.knowledge-card, .quick-start-card');
        console.log('Found cards:', cards.length); // Debug log
        
        cards.forEach((card, index) => {
            const href = card.getAttribute('data-href');
            console.log(`Card ${index}:`, card.className, 'href:', href); // Debug log
            
            // Add click interaction
            card.addEventListener('click', (e) => {
                console.log('Card clicked:', e.target, 'card:', card); // Debug log
                
                // Don't interfere with actual links that have href attributes
                if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
                    console.log('Link clicked, not handling'); // Debug log
                    return;
                }
                
                // Prevent default to avoid any conflicting behavior
                e.preventDefault();
                e.stopPropagation();
                
                const href = card.getAttribute('data-href') || card.querySelector('a')?.href;
                if (href) {
                    console.log('Navigating to:', href); // Debug log
                    // Add a small delay to show the click effect
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                } else {
                    console.log('No href found for card'); // Debug log
                }
            });

            // Add mousedown/mouseup for better visual feedback
            card.addEventListener('mousedown', (e) => {
                if (e.target.tagName !== 'A') {
                    card.style.transform = 'translateY(-2px) scale(0.98)';
                }
            });

            card.addEventListener('mouseup', (e) => {
                if (e.target.tagName !== 'A') {
                    card.style.transform = '';
                }
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.transform = '';
            });

            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Add cursor pointer style for clickable cards
            if (card.getAttribute('data-href')) {
                card.style.cursor = 'pointer';
            }

            // Add progress indicator
            this.addProgressIndicator(card);
        });
    }

    addProgressIndicator(card) {
        const href = card.getAttribute('data-href');
        if (!href) return;

        const category = this.getCategoryFromHref(href);
        const status = this.getCardStatus(category);
        
        const indicator = document.createElement('div');
        indicator.className = `problem-status ${status}`;
        indicator.innerHTML = `
            <span class="problem-status-icon"></span>
            <span>${status.replace('-', ' ')}</span>
        `;
        
        const footer = card.querySelector('.card-footer');
        if (footer) {
            footer.appendChild(indicator);
        }
    }

    getCategoryFromHref(href) {
        if (href.includes('/leetcode/')) return 'leetcode';
        if (href.includes('/frontend/')) return 'frontend';
        if (href.includes('/interview-checklist/')) return 'checklist';
        return 'general';
    }

    getCardStatus(category) {
        const completed = Object.values(this.progress[category] || {}).filter(s => s === 'completed').length;
        const inProgress = Object.values(this.progress[category] || {}).filter(s => s === 'in-progress').length;
        
        if (completed > 0) return 'completed';
        if (inProgress > 0) return 'in-progress';
        return 'not-started';
    }

    // Tooltips
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.showTooltip(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip(element);
            });
            
            element.addEventListener('focus', () => {
                this.showTooltip(element);
            });
            
            element.addEventListener('blur', () => {
                this.hideTooltip(element);
            });
        });
    }

    showTooltip(element) {
        element.classList.add('tooltip-visible');
    }

    hideTooltip(element) {
        element.classList.remove('tooltip-visible');
    }

    // Keyboard Navigation
    initKeyboardNavigation() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID if not exists
        const main = document.querySelector('main') || document.querySelector('#home');
        if (main && !main.id) {
            main.id = 'main-content';
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key) {
                    case 'h':
                        e.preventDefault();
                        window.location.href = '/';
                        break;
                    case 'p':
                        e.preventDefault();
                        window.location.href = '/progress-tracker/';
                        break;
                    case 'c':
                        e.preventDefault();
                        window.location.href = '/interview-checklist/';
                        break;
                }
            }
        });
    }

    // Mobile Navigation
    initMobileNavigation() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.contains('open');
                
                navLinks.classList.toggle('open');
                toggle.setAttribute('aria-expanded', !isOpen);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isOpen ? '' : 'hidden';
                
                // Focus management
                if (!isOpen) {
                    const firstLink = navLinks.querySelector('a');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    toggle.focus();
                }
            });
            
            // Close menu when navigating to a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Accessibility Enhancements
    initAccessibility() {
        // Add ARIA labels to interactive elements
        const cards = document.querySelectorAll('.knowledge-card, .quick-start-card');
        cards.forEach((card, index) => {
            const title = card.querySelector('.card-title')?.textContent || `Card ${index + 1}`;
            const description = card.querySelector('.card-description')?.textContent || '';
            
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${title}. ${description}`);
        });

        // Progress bars with ARIA
        const progressBars = document.querySelectorAll('.progress-bar, .progress-fill');
        progressBars.forEach(bar => {
            const percentage = bar.style.width || '0%';
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-valuenow', percentage.replace('%', ''));
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
            bar.setAttribute('aria-label', `Progress: ${percentage}`);
        });

        // Live regions for dynamic updates
        this.createLiveRegion();
    }

    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Data Visualizations
    initVisualizations() {
        this.createProgressRings();
        this.createProgressCharts();
        this.updateStatCards();
    }

    createProgressRings() {
        const progressContainers = document.querySelectorAll('.progress-section');
        
        progressContainers.forEach(container => {
            const items = container.querySelectorAll('.progress-item');
            
            items.forEach(item => {
                const percentage = item.querySelector('.progress-percentage')?.textContent || '0%';
                const ring = this.createProgressRing(parseInt(percentage));
                
                const header = item.querySelector('.progress-header');
                if (header) {
                    header.appendChild(ring);
                }
            });
        });
    }

    createProgressRing(percentage) {
        const ring = document.createElement('div');
        ring.className = 'progress-ring';
        
        const circumference = 2 * Math.PI * 50; // radius = 50
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        
        ring.innerHTML = `
            <svg>
                <circle class="progress-ring-background" cx="60" cy="60" r="50"></circle>
                <circle class="progress-ring-progress" cx="60" cy="60" r="50" 
                        style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"></circle>
            </svg>
            <div class="progress-ring-text">${percentage}%</div>
        `;
        
        return ring;
    }

    createProgressCharts() {
        const categories = ['leetcode', 'frontend', 'checklist'];
        
        categories.forEach(category => {
            const completed = Object.values(this.progress[category] || {}).filter(s => s === 'completed').length;
            const inProgress = Object.values(this.progress[category] || {}).filter(s => s === 'in-progress').length;
            const total = completed + inProgress + 10; // Assuming 10 more items
            
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.innerHTML = `
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Progress</h3>
                <div class="progress-bar-modern" data-progress="${Math.round((completed / total) * 100)}"></div>
                <div class="progress-stats">
                    <span>Completed: ${completed}</span>
                    <span>In Progress: ${inProgress}</span>
                    <span>Total: ${total}</span>
                </div>
            `;
        });
    }

    updateStatCards() {
        const completionRate = this.progress.totalProblems > 0 
            ? Math.round((this.progress.completedProblems / this.progress.totalProblems) * 100)
            : 0;

        // Update existing stat cards or create new ones
        const statsContainer = document.querySelector('.stats');
        if (statsContainer) {
            // Add new stat cards for user progress
            const progressCard = document.createElement('div');
            progressCard.className = 'stat-card';
            progressCard.innerHTML = `
                <div class="stat-number">${completionRate}%</div>
                <div class="stat-label">Completion Rate</div>
            `;
            
            const streakCard = document.createElement('div');
            streakCard.className = 'stat-card';
            streakCard.innerHTML = `
                <div class="stat-number">${this.progress.currentStreak}</div>
                <div class="stat-label">Current Streak</div>
            `;
            
            statsContainer.appendChild(progressCard);
            statsContainer.appendChild(streakCard);
        }
    }

    updateProgressDisplay() {
        // Update all progress indicators on the page
        const progressBars = document.querySelectorAll('.progress-bar-modern');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') || '0';
            bar.style.setProperty('--progress', `${progress}%`);
        });

        // Update progress rings
        const rings = document.querySelectorAll('.progress-ring-progress');
        rings.forEach(ring => {
            const percentage = parseInt(ring.parentElement.nextElementSibling?.textContent || '0');
            const circumference = 2 * Math.PI * 50;
            const strokeDashoffset = circumference - (percentage / 100) * circumference;
            ring.style.strokeDashoffset = strokeDashoffset;
        });
    }

    // Achievement System
    showAchievement(message) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-notification';
        achievement.innerHTML = `
            <div class="achievement-badge">
                <span>🎉</span>
                <span>${message}</span>
            </div>
        `;
        
        achievement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            animation: slideInFromRight 0.5s ease;
        `;
        
        document.body.appendChild(achievement);
        
        // Announce to screen readers
        this.announceToScreenReader(message);
        
        setTimeout(() => {
            achievement.style.animation = 'slideInFromRight 0.5s ease reverse';
            setTimeout(() => {
                document.body.removeChild(achievement);
            }, 500);
        }, 3000);
    }

    // Public API
    getProgress() {
        return this.progress;
    }

    resetProgress() {
        this.progress = {
            leetcode: {},
            frontend: {},
            checklist: {},
            totalProblems: 0,
            completedProblems: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastActivity: null
        };
        this.saveProgress();
        this.updateProgressDisplay();
    }

    exportProgress() {
        const dataStr = JSON.stringify(this.progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'interview-hub-progress.json';
        link.click();
    }

    importProgress(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.progress = { ...this.progress, ...imported };
            this.saveProgress();
            this.updateProgressDisplay();
            this.showAchievement('Progress imported successfully!');
        } catch (error) {
            console.error('Failed to import progress:', error);
            this.showAchievement('Failed to import progress. Please check the file format.');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.interviewHub = new InterviewHub();
    
    // Add keyboard shortcut help
    const helpText = document.createElement('div');
    helpText.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--bg-card);
        padding: 10px;
        border-radius: var(--radius-md);
        font-size: 12px;
        color: var(--text-secondary);
        border: 1px solid var(--border);
        z-index: 100;
        opacity: 0.7;
    `;
    helpText.innerHTML = `
        Keyboard shortcuts:<br>
        Alt+H: Home | Alt+P: Progress | Alt+C: Checklist
    `;
    document.body.appendChild(helpText);
    
    // Hide help text after 5 seconds
    setTimeout(() => {
        helpText.style.opacity = '0';
        setTimeout(() => {
            if (helpText.parentElement) {
                document.body.removeChild(helpText);
            }
        }, 500);
    }, 5000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InterviewHub;
}
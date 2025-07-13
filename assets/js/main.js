// Theme toggle functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }
  
  init() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
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

// Navigation functionality
class NavigationManager {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.init();
  }
  
  init() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleNav());
    }
    
    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeNav();
      }
    });
    
    // Close nav when window is resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeNav();
      }
    });
  }
  
  toggleNav() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }
  
  closeNav() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
  }
}

// Table of Contents generator
class TableOfContents {
  constructor() {
    this.tocContainer = document.getElementById('toc');
    this.init();
  }
  
  init() {
    if (!this.tocContainer) return;
    
    const headings = document.querySelectorAll('.content-body h2, .content-body h3, .content-body h4');
    if (headings.length === 0) return;
    
    const tocList = this.generateTOC(headings);
    this.tocContainer.appendChild(tocList);
    
    // Add active state tracking
    this.addActiveStateTracking(headings);
  }
  
  generateTOC(headings) {
    const ul = document.createElement('ul');
    
    headings.forEach((heading, index) => {
      // Generate ID if not present
      if (!heading.id) {
        heading.id = this.generateId(heading.textContent);
      }
      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.className = heading.tagName.toLowerCase();
      
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    return ul;
  }
  
  generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  
  addActiveStateTracking(headings) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const tocLink = this.tocContainer.querySelector(`a[href="#${id}"]`);
          
          if (entry.isIntersecting) {
            // Remove active class from all links
            this.tocContainer.querySelectorAll('a').forEach(link => {
              link.classList.remove('active');
            });
            
            // Add active class to current link
            if (tocLink) {
              tocLink.classList.add('active');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );
    
    headings.forEach(heading => observer.observe(heading));
  }
}

// Code syntax highlighting and copy functionality
class CodeManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.addCopyButtons();
    this.addLanguageLabels();
  }
  
  addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
      const pre = codeBlock.parentElement;
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn';
      copyButton.innerHTML = '<i data-feather="copy"></i>';
      copyButton.title = 'Copy to clipboard';
      
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          copyButton.innerHTML = '<i data-feather="check"></i>';
          copyButton.classList.add('copied');
          
          setTimeout(() => {
            copyButton.innerHTML = '<i data-feather="copy"></i>';
            copyButton.classList.remove('copied');
          }, 2000);
        });
      });
      
      // Wrap the pre element
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(copyButton);
    });
  }
  
  addLanguageLabels() {
    const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');
    
    codeBlocks.forEach(codeBlock => {
      const language = codeBlock.className.match(/language-(\w+)/)?.[1];
      if (language) {
        const pre = codeBlock.parentElement;
        const wrapper = pre.parentElement;
        
        if (wrapper && wrapper.classList.contains('code-block-wrapper')) {
          const label = document.createElement('span');
          label.className = 'code-language-label';
          label.textContent = language;
          wrapper.appendChild(label);
        }
      }
    });
  }
}

// Search functionality
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchResults = document.getElementById('searchResults');
    this.init();
  }
  
  init() {
    if (!this.searchInput) return;
    
    this.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
        this.hideResults();
      }
    });
  }
  
  performSearch(query) {
    if (query.length < 2) {
      this.hideResults();
      return;
    }
    
    // Simple client-side search (in a real implementation, you might use a search index)
    const results = this.searchContent(query);
    this.displayResults(results);
  }
  
  searchContent(query) {
    // This is a simplified search - in practice, you'd want a more sophisticated search index
    const pages = document.querySelectorAll('a[href]');
    const results = [];
    
    pages.forEach(link => {
      const text = link.textContent.toLowerCase();
      const href = link.getAttribute('href');
      
      if (text.includes(query.toLowerCase()) && href.startsWith('/')) {
        results.push({
          title: link.textContent,
          url: href
        });
      }
    });
    
    return results.slice(0, 10); // Limit to 10 results
  }
  
  displayResults(results) {
    if (!this.searchResults) return;
    
    this.searchResults.innerHTML = '';
    
    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'search-no-results';
      noResults.textContent = 'No results found';
      this.searchResults.appendChild(noResults);
    } else {
      results.forEach(result => {
        const resultItem = document.createElement('a');
        resultItem.className = 'search-result-item';
        resultItem.href = result.url;
        resultItem.textContent = result.title;
        this.searchResults.appendChild(resultItem);
      });
    }
    
    this.searchResults.style.display = 'block';
  }
  
  hideResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }
}

// Progress tracking
class ProgressTracker {
  constructor() {
    this.init();
  }
  
  init() {
    this.loadProgress();
    this.addProgressButtons();
  }
  
  loadProgress() {
    const progress = JSON.parse(localStorage.getItem('interviewProgress') || '{}');
    
    // Mark completed items
    Object.keys(progress).forEach(key => {
      if (progress[key]) {
        const element = document.querySelector(`[data-progress-key="${key}"]`);
        if (element) {
          element.classList.add('completed');
        }
      }
    });
  }
  
  addProgressButtons() {
    // Add "Mark as Complete" buttons to problem pages
    if (window.location.pathname.includes('/frontend/coding-problems/') || 
        window.location.pathname.includes('/leetcode/')) {
      this.addCompletionButton();
    }
  }
  
  addCompletionButton() {
    const contentHeader = document.querySelector('.content-header');
    if (!contentHeader) return;
    
    const progressKey = window.location.pathname;
    const isCompleted = this.isCompleted(progressKey);
    
    const button = document.createElement('button');
    button.className = `progress-btn ${isCompleted ? 'completed' : ''}`;
    button.innerHTML = isCompleted ? 
      '<i data-feather="check"></i> Completed' : 
      '<i data-feather="circle"></i> Mark Complete';
    
    button.addEventListener('click', () => {
      this.toggleProgress(progressKey, button);
    });
    
    contentHeader.appendChild(button);
  }
  
  isCompleted(key) {
    const progress = JSON.parse(localStorage.getItem('interviewProgress') || '{}');
    return progress[key] || false;
  }
  
  toggleProgress(key, button) {
    const progress = JSON.parse(localStorage.getItem('interviewProgress') || '{}');
    progress[key] = !progress[key];
    localStorage.setItem('interviewProgress', JSON.stringify(progress));
    
    if (progress[key]) {
      button.classList.add('completed');
      button.innerHTML = '<i data-feather="check"></i> Completed';
    } else {
      button.classList.remove('completed');
      button.innerHTML = '<i data-feather="circle"></i> Mark Complete';
    }
    
    // Re-initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
  }
}

// Smooth scrolling for anchor links
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather icons
  if (window.feather) {
    window.feather.replace();
  }
  
  // Initialize managers
  new ThemeManager();
  new NavigationManager();
  new TableOfContents();
  new CodeManager();
  new SearchManager();
  new ProgressTracker();
  new SmoothScroll();
  
  // Re-initialize Feather icons after dynamic content
  if (window.feather) {
    window.feather.replace();
  }
});

// Add CSS for code functionality
const additionalCSS = `
.code-block-wrapper {
  position: relative;
}

.code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: 4px 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast);
  color: var(--color-text-secondary);
}

.code-copy-btn:hover {
  background: var(--color-primary);
  color: white;
}

.code-copy-btn.copied {
  background: var(--color-success);
  color: white;
}

.code-block-wrapper:hover .code-copy-btn {
  opacity: 1;
}

.code-language-label {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--color-primary);
  color: white;
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.progress-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-md);
}

.progress-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.progress-btn.completed {
  background: var(--color-success);
  color: white;
  border-color: var(--color-success);
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
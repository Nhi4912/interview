import os
import re

# Parse HomePage.js to extract knowledge cards
HOMEPAGE_PATH = 'src/pages/HomePage.js'
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Map hrefs to markdown file paths

def href_to_md_path(href):
    # Remove leading slash
    if href.startswith('/'):
        href = href[1:]
    # For leetcode, always use index.md
    if href.startswith('leetcode/'):
        return os.path.join(href, 'index.md')
    # For frontend/coding-problems, use .md file
    if href.startswith('frontend/coding-problems/'):
        return href + '.md'
    # For frontend/react/core, use core.md
    if href == 'frontend/react/core':
        return 'frontend/react/core.md'
    # For frontend/react/advanced-patterns, use advanced-patterns.md
    if href == 'frontend/react/advanced-patterns':
        return 'frontend/react/advanced-patterns.md'
    # For frontend/typescript, use README.md
    if href == 'frontend/typescript':
        return 'frontend/typescript/README.md'
    # For frontend/html-css, use README.md
    if href == 'frontend/html-css':
        return 'frontend/html-css/README.md'
    # For frontend/advanced/javascript-memory-performance-optimization
    if href == 'frontend/advanced/javascript-memory-performance-optimization':
        return 'frontend/advanced/javascript-memory-performance-optimization.md'
    # For frontend/advanced, use README.md
    if href == 'frontend/advanced':
        return 'frontend/advanced/README.md'
    # For frontend/system-design/..., use .md file
    if href.startswith('frontend/system-design/'):
        return href + '.md'
    # For frontend/testing/..., use .md file
    if href.startswith('frontend/testing/'):
        return href + '.md'
    # For frontend/security/..., use .md file
    if href.startswith('frontend/security/'):
        return href + '.md'
    # For frontend/performance/..., use .md file
    if href.startswith('frontend/performance/'):
        return href + '.md'
    # For frontend/networking/..., use .md file
    if href.startswith('frontend/networking/'):
        return href + '.md'
    # For frontend/fundamentals/..., use .md file
    if href.startswith('frontend/fundamentals/'):
        return href + '.md'
    # fallback: README.md in the directory
    return os.path.join(href, 'README.md')

def placeholder_md(title, description):
    return f"""# {title}

🚧 **Coming soon!**

This topic is being updated. Please check back later.

_Description: {description}_
"""

def ensure_placeholder(path, title, description):
    abs_path = os.path.join(PROJECT_ROOT, path)
    if os.path.exists(abs_path):
        with open(abs_path, 'r', encoding='utf-8') as f:
            content = f.read().strip()
        if content:
            print(f"SKIP (exists): {path}")
            return
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(placeholder_md(title, description))
    print(f"CREATED: {path}")

def parse_knowledge_cards():
    cards = []
    with open(HOMEPAGE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    # Regex to extract { title: ..., description: ..., href: ... }
    pattern = re.compile(r'{\s*title: "([^"]+)",\s*description: "([^"]+)",[^}]*?href: "([^"]+)"', re.MULTILINE)
    for match in pattern.finditer(content):
        title, description, href = match.groups()
        md_path = href_to_md_path(href)
        cards.append((md_path, title, description))
    return cards

def main():
    cards = parse_knowledge_cards()
    for path, title, description in cards:
        ensure_placeholder(path, title, description)

if __name__ == "__main__":
    main() 
#!/bin/bash

# Script to fix Jekyll Liquid syntax conflicts with JavaScript template literals
# This wraps problematic code blocks with {% raw %} tags

echo "Fixing Liquid syntax conflicts in markdown files..."

# Find all markdown files with template literals
find . -name "*.md" -not -path "./_site/*" -not -path "./vendor/*" | while read file; do
    echo "Processing: $file"
    
    # Create a backup
    cp "$file" "$file.bak"
    
    # Use sed to wrap code blocks containing ${ with raw tags
    # This is a simple fix that wraps the entire file content in raw tags if it contains ${
    if grep -q '\${' "$file"; then
        echo "Found template literals in $file, applying raw tags..."
        
        # More sophisticated approach: wrap only code blocks
        python3 << 'EOF'
import re
import sys

file_path = sys.argv[1] if len(sys.argv) > 1 else input()

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to match code blocks with template literals
pattern = r'(```(?:typescript|javascript|jsx|tsx|js|ts)\n)(.*?)(\n```)'

def wrap_code_block(match):
    language = match.group(1)
    code = match.group(2)
    closing = match.group(3)
    
    # Check if the code block contains template literals
    if '${' in code:
        return f'{% raw %}\n{language}{code}{closing}\n{% endraw %}'
    else:
        return match.group(0)

# Apply the replacement
new_content = re.sub(pattern, wrap_code_block, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(new_content)
EOF
        python3 - "$file"
    fi
done

echo "Liquid syntax fixes complete!"
echo "Remember to commit the changes: git add . && git commit -m 'Fix Jekyll Liquid syntax conflicts'"
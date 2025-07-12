#!/bin/bash

# Fix Liquid syntax errors in markdown files by wrapping code blocks containing '{{' or '${' with {% raw %} ... {% endraw %}
# This script properly handles the raw tags to prevent malformed output

echo "Scanning all markdown files in frontend/ for Liquid conflicts..."

find frontend/ -name "*.md" | while read file; do
  echo "Processing $file..."
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Use awk to properly process code blocks
  awk '
  BEGIN { 
    in_code_block = 0; 
    code_block_content = ""; 
    code_block_start = ""; 
  }
  
  # Start of code block
  /^```(js|jsx|tsx|ts|javascript|typescript|js|ts)$/ {
    in_code_block = 1;
    code_block_start = $0;
    code_block_content = $0 "\n";
    next;
  }
  
  # End of code block
  in_code_block && /^```$/ {
    code_block_content = code_block_content $0 "\n";
    
    # Check if this code block contains {{ or ${
    if (code_block_content ~ /\{\{/ || code_block_content ~ /\$\{/) {
      print "{% raw %}";
      printf "%s", code_block_content;
      print "{% endraw %}";
    } else {
      printf "%s", code_block_content;
    }
    
    in_code_block = 0;
    code_block_content = "";
    code_block_start = "";
    next;
  }
  
  # Inside code block
  in_code_block {
    code_block_content = code_block_content $0 "\n";
    next;
  }
  
  # Outside code block - just print
  {
    print $0;
  }
  ' "$file" > "$temp_file"
  
  # Replace original file with fixed content
  mv "$temp_file" "$file"
done

echo "All code blocks with Liquid conflicts are now properly wrapped in raw tags!"
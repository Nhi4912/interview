#!/bin/bash

# Comprehensive script to fix all Liquid syntax issues in markdown files
echo "Fixing all Liquid syntax issues..."

# Step 1: Wrap code blocks containing {{ or ${ with raw tags
echo "Step 1: Wrapping problematic code blocks..."
find frontend/ -name "*.md" | while read file; do
  echo "Processing $file..."
  
  temp_file=$(mktemp)
  
  awk '
  BEGIN { 
    in_code_block = 0; 
    code_block_content = ""; 
    needs_raw = 0;
  }
  
  # Start of code block
  /^```(js|jsx|tsx|ts|javascript|typescript|js|ts)$/ {
    in_code_block = 1;
    code_block_content = $0 "\n";
    needs_raw = 0;
    next;
  }
  
  # End of code block
  in_code_block && /^```$/ {
    code_block_content = code_block_content $0 "\n";
    
    # Check if this code block contains {{ or ${
    if (code_block_content ~ /\{\{/ || code_block_content ~ /\$\{/) {
      needs_raw = 1;
    }
    
    if (needs_raw) {
      print "{% raw %}";
      printf "%s", code_block_content;
      print "{% endraw %}";
    } else {
      printf "%s", code_block_content;
    }
    
    in_code_block = 0;
    code_block_content = "";
    needs_raw = 0;
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
  
  mv "$temp_file" "$file"
done

# Step 2: Clean up any malformed raw tags
echo "Step 2: Cleaning up malformed raw tags..."
find frontend/ -name "*.md" | while read file; do
  echo "Cleaning $file..."
  
  temp_file=$(mktemp)
  
  awk '
  BEGIN { 
    raw_count = 0; 
    endraw_count = 0; 
  }
  
  /^{% raw %}$/ {
    raw_count++;
    if (raw_count == 1) {
      print $0;
    }
    next;
  }
  
  /^{% endraw %}$/ {
    endraw_count++;
    if (endraw_count == raw_count) {
      print $0;
    }
    next;
  }
  
  {
    print $0;
  }
  ' "$file" > "$temp_file"
  
  mv "$temp_file" "$file"
done

echo "All Liquid syntax issues have been fixed!"
echo "You can now commit and push these changes to resolve the GitHub Actions build errors." 
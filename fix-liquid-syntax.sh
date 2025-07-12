#!/bin/bash

# Fix Liquid syntax errors in markdown files by wrapping code blocks containing '{{' or '${' with {% raw %} ... {% endraw %}
# Applies to all markdown files in frontend/

echo "Scanning all markdown files in frontend/ for Liquid conflicts..."

find frontend/ -name "*.md" | while read file; do
  echo "Processing $file..."
  # Use awk to process code blocks
  awk '
  BEGIN { inblock=0; blocktype=""; blocklines=""; }
  /^```(js|jsx|tsx|ts|javascript|typescript)/ {
    inblock=1;
    blocktype=$0;
    blocklines=$0"\n";
    next;
  }
  inblock && /^```/ {
    blocklines=blocklines $0"\n";
    # Check if block contains {{ or ${
    if (blocklines ~ /\{\{/ || blocklines ~ /\$\{/) {
      print "{% raw %}";
      printf "%s", blocklines;
      print "{% endraw %}";
    } else {
      printf "%s", blocklines;
    }
    inblock=0;
    blocktype="";
    blocklines="";
    next;
  }
  inblock {
    blocklines=blocklines $0"\n";
    next;
  }
  {
    print $0;
  }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "All code blocks with Liquid conflicts are now wrapped in raw tags!"
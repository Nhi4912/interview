#!/bin/bash

# Clean up malformed raw tags in markdown files
echo "Cleaning up malformed raw tags..."

find frontend/ -name "*.md" | while read file; do
  echo "Cleaning $file..."
  
  # Create temporary file
  temp_file=$(mktemp)
  
  # Remove duplicate raw tags and fix nested ones
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
  
  # Replace original file
  mv "$temp_file" "$file"
done

echo "Raw tags cleanup completed!" 
#!/bin/bash

# Script to fix orphaned {% endraw %} tags in markdown files
declare -A results
files_fixed=0
orphaned_tags_removed=0

echo "Scanning for files with orphaned {% endraw %} tags..."

# Find all markdown files with raw/endraw tags
for file in $(rg -l "\{\%\s*(raw|endraw)\s*\%\}" /Users/nee/Documents/RnD/interview --type md); do 
  raw_count=$(rg -c "\{\%\s*raw\s*\%\}" "$file" 2>/dev/null || echo "0")
  endraw_count=$(rg -c "\{\%\s*endraw\s*\%\}" "$file" 2>/dev/null || echo "0")
  
  if [ "$raw_count" != "$endraw_count" ]; then
    orphaned_count=$((endraw_count - raw_count))
    if [ "$orphaned_count" -gt 0 ]; then
      echo "Found mismatch: $file (raw: $raw_count, endraw: $endraw_count, orphaned: $orphaned_count)"
      
      # Find the last endraw tag and remove it
      last_endraw_line=$(rg -n "\{\%\s*endraw\s*\%\}" "$file" | tail -1 | cut -d: -f1)
      
      if [ ! -z "$last_endraw_line" ]; then
        # Create a temporary file without the orphaned tag
        head -n $((last_endraw_line - 1)) "$file" > "$file.tmp"
        tail -n +$((last_endraw_line + 1)) "$file" >> "$file.tmp"
        
        # Replace original file
        mv "$file.tmp" "$file"
        
        results["$file"]=$orphaned_count
        ((files_fixed++))
        ((orphaned_tags_removed += orphaned_count))
        echo "  Fixed: Removed orphaned tag at line $last_endraw_line"
      fi
    fi
  fi
done

echo ""
echo "=== FIX SUMMARY ==="
echo "Files fixed: $files_fixed"
echo "Orphaned tags removed: $orphaned_tags_removed"
echo ""

if [ $files_fixed -gt 0 ]; then
  echo "Fixed files:"
  for file in "${!results[@]}"; do
    echo "  - $(basename "$file"): ${results[$file]} orphaned tag(s) removed"
  done
fi
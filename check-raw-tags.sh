#!/bin/bash

# Check for unclosed raw tags in markdown files
echo "Checking for unclosed raw tags..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✓${NC} $message"
            ;;
        "error")
            echo -e "${RED}✗${NC} $message"
            ;;
        "warning")
            echo -e "${YELLOW}⚠${NC} $message"
            ;;
    esac
}

# Find all markdown files and check for raw tag balance
find . -name "*.md" -not -path "./_site/*" -not -path "./vendor/*" | while read file; do
    # Count actual raw and endraw tags (not text that mentions them)
    raw_count=$(grep -c "^[[:space:]]*{% raw %}[[:space:]]*$" "$file" 2>/dev/null || echo "0")
    endraw_count=$(grep -c "^[[:space:]]*{% endraw %}[[:space:]]*$" "$file" 2>/dev/null || echo "0")
    
    if [ "$raw_count" -ne "$endraw_count" ]; then
        print_status "error" "Unbalanced raw tags in $file (raw: $raw_count, endraw: $endraw_count)"
        
        # Show the problematic lines
        echo "  Raw tags at lines:"
        grep -n "^[[:space:]]*{% raw %}[[:space:]]*$" "$file" 2>/dev/null | sed 's/^/    /'
        echo "  Endraw tags at lines:"
        grep -n "^[[:space:]]*{% endraw %}[[:space:]]*$" "$file" 2>/dev/null | sed 's/^/    /'
        echo ""
    else
        if [ "$raw_count" -gt 0 ]; then
            print_status "success" "Balanced raw tags in $file ($raw_count pairs)"
        fi
    fi
done

echo ""
echo "Raw tag check completed!" 
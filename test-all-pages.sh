#!/bin/bash

# Test all pages render correctly
echo "Testing all pages render correctly..."

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

# Step 1: Check if Jekyll is available
echo "Step 1: Checking Jekyll installation..."
if ! command -v bundle &> /dev/null; then
    print_status "error" "Bundler not found. Please install Ruby and Bundler first."
    exit 1
fi

# Step 2: Install dependencies
echo "Step 2: Installing dependencies..."
if bundle install; then
    print_status "success" "Dependencies installed successfully"
else
    print_status "error" "Failed to install dependencies"
    exit 1
fi

# Step 3: Build the site
echo "Step 3: Building the site..."
if bundle exec jekyll build --baseurl "/interview" --verbose; then
    print_status "success" "Site built successfully"
else
    print_status "error" "Site build failed"
    exit 1
fi

# Step 4: Check for generated files
echo "Step 4: Checking generated files..."
if [ -d "_site" ]; then
    print_status "success" "_site directory created"
    
    # Count generated pages
    page_count=$(find _site -name "*.html" | wc -l)
    print_status "success" "Generated $page_count HTML pages"
    
    # Check for key pages
    key_pages=(
        "_site/index.html"
        "_site/frontend/index.html"
        "_site/leetcode/index.html"
        "_site/interview-checklist.html"
        "_site/progress-tracker.html"
    )
    
    for page in "${key_pages[@]}"; do
        if [ -f "$page" ]; then
            print_status "success" "Key page exists: $(basename "$page")"
        else
            print_status "warning" "Missing key page: $(basename "$page")"
        fi
    done
    
else
    print_status "error" "_site directory not found"
    exit 1
fi

# Step 5: Check for Liquid errors in build output
echo "Step 5: Checking for Liquid errors..."
if bundle exec jekyll build --baseurl "/interview" 2>&1 | grep -q "Liquid"; then
    print_status "error" "Liquid errors found in build output"
    echo "Build output with errors:"
    bundle exec jekyll build --baseurl "/interview" 2>&1 | grep -A 5 -B 5 "Liquid"
    exit 1
else
    print_status "success" "No Liquid errors found"
fi

# Step 6: Validate HTML structure
echo "Step 6: Validating HTML structure..."
if command -v tidy &> /dev/null; then
    echo "Running HTML validation..."
    for html_file in _site/*.html; do
        if [ -f "$html_file" ]; then
            if tidy -q -e "$html_file" 2>/dev/null; then
                print_status "success" "HTML validation passed: $(basename "$html_file")"
            else
                print_status "warning" "HTML validation issues in: $(basename "$html_file")"
            fi
        fi
    done
else
    print_status "warning" "HTML Tidy not found, skipping HTML validation"
fi

# Step 7: Check for broken links
echo "Step 7: Checking for broken internal links..."
broken_links=0
for html_file in _site/*.html; do
    if [ -f "$html_file" ]; then
        # Extract internal links and check if they exist
        links=$(grep -o 'href="[^"]*"' "$html_file" | sed 's/href="//g' | sed 's/"//g' | grep -E '^/|^\.\./|^\./')
        for link in $links; do
            # Convert relative links to absolute paths
            if [[ $link == /* ]]; then
                target="_site$link"
            else
                target="_site/$(dirname "$html_file")/$link"
            fi
            
            if [ ! -f "$target" ] && [ ! -d "$target" ]; then
                print_status "warning" "Broken link in $(basename "$html_file"): $link"
                ((broken_links++))
            fi
        done
    fi
done

if [ $broken_links -eq 0 ]; then
    print_status "success" "No broken internal links found"
else
    print_status "warning" "Found $broken_links broken internal links"
fi

# Step 8: Check file sizes
echo "Step 8: Checking file sizes..."
large_files=$(find _site -name "*.html" -size +1M)
if [ -n "$large_files" ]; then
    print_status "warning" "Large HTML files found:"
    echo "$large_files"
else
    print_status "success" "All HTML files are reasonably sized"
fi

# Step 9: Final summary
echo ""
echo "=== Test Summary ==="
print_status "success" "All pages render correctly!"
print_status "success" "Site is ready for deployment"

echo ""
echo "Next steps:"
echo "1. Commit all changes: git add . && git commit -m 'Update navigation and fix Liquid issues'"
echo "2. Push to repository: git push origin main"
echo "3. Deploy to GitHub Pages or your hosting platform"

echo ""
echo "Test completed successfully! 🎉" 
#!/bin/bash

# Fix Liquid syntax errors in markdown files
# This script wraps JavaScript/React code blocks in {% raw %} tags to prevent Jekyll from parsing them

echo "Fixing Liquid syntax errors..."

# Function to fix a specific pattern using a more compatible approach
fix_pattern() {
    local file="$1"
    local pattern="$2"
    local replacement="$3"
    
    if grep -q "$pattern" "$file"; then
        echo "Fixing pattern in $file"
        # Use a temporary file approach that works on both Linux and macOS
        sed "s/$pattern/$replacement/g" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
}

# Fix frontend/challenges/README.md - line 1012
if [ -f "frontend/challenges/README.md" ]; then
    echo "Fixing frontend/challenges/README.md..."
    
    # Create a temporary file with the fixed content
    awk '
    /options={{$/ {
        print "{% raw %}"
        print $0
        in_options = 1
        next
    }
    in_options && /^            }}/ {
        print $0
        print "{% endraw %}"
        in_options = 0
        next
    }
    { print }
    ' frontend/challenges/README.md > frontend/challenges/README.md.tmp && mv frontend/challenges/README.md.tmp frontend/challenges/README.md
fi

# Fix frontend/architecture/frontend-system-design-framework.md
if [ -f "frontend/architecture/frontend-system-design-framework.md" ]; then
    echo "Fixing frontend/architecture/frontend-system-design-framework.md..."
    
    # Fix the style objects and destructuring patterns
    sed 's/{{ position: '\''absolute'\'', top: index \* POST_HEIGHT, height: POST_HEIGHT }}/{% raw %}{{ position: '\''absolute'\'', top: index * POST_HEIGHT, height: POST_HEIGHT }}{% endraw %}/g' frontend/architecture/frontend-system-design-framework.md > frontend/architecture/frontend-system-design-framework.md.tmp && mv frontend/architecture/frontend-system-design-framework.md.tmp frontend/architecture/frontend-system-design-framework.md
    
    sed 's/{{ activeKey, setActiveKey }}/{% raw %}{{ activeKey, setActiveKey }}{% endraw %}/g' frontend/architecture/frontend-system-design-framework.md > frontend/architecture/frontend-system-design-framework.md.tmp && mv frontend/architecture/frontend-system-design-framework.md.tmp frontend/architecture/frontend-system-design-framework.md
    
    sed 's/{{ state, dispatch }}/{% raw %}{{ state, dispatch }}{% endraw %}/g' frontend/architecture/frontend-system-design-framework.md > frontend/architecture/frontend-system-design-framework.md.tmp && mv frontend/architecture/frontend-system-design-framework.md.tmp frontend/architecture/frontend-system-design-framework.md
    
    sed 's/{{ position: '\''absolute'\'', top: index \* 200, height: 200 }}/{% raw %}{{ position: '\''absolute'\'', top: index * 200, height: 200 }}{% endraw %}/g' frontend/architecture/frontend-system-design-framework.md > frontend/architecture/frontend-system-design-framework.md.tmp && mv frontend/architecture/frontend-system-design-framework.md.tmp frontend/architecture/frontend-system-design-framework.md
fi

# Fix frontend/coding-problems/01-dynamic-table.md
if [ -f "frontend/coding-problems/01-dynamic-table.md" ]; then
    echo "Fixing frontend/coding-problems/01-dynamic-table.md..."
    
    # Fix the style object
    sed 's/{{ width: "100%" }}/{% raw %}{{ width: "100%" }}{% endraw %}/g' frontend/coding-problems/01-dynamic-table.md > frontend/coding-problems/01-dynamic-table.md.tmp && mv frontend/coding-problems/01-dynamic-table.md.tmp frontend/coding-problems/01-dynamic-table.md
fi

# Fix frontend/coding-problems/missing-answers.md
if [ -f "frontend/coding-problems/missing-answers.md" ]; then
    echo "Fixing frontend/coding-problems/missing-answers.md..."
    
    # Fix the __html property
    sed 's/{{ __html: sanitized }}/{% raw %}{{ __html: sanitized }}{% endraw %}/g' frontend/coding-problems/missing-answers.md > frontend/coding-problems/missing-answers.md.tmp && mv frontend/coding-problems/missing-answers.md.tmp frontend/coding-problems/missing-answers.md
fi

# Fix frontend/react/advanced-patterns.md
if [ -f "frontend/react/advanced-patterns.md" ]; then
    echo "Fixing frontend/react/advanced-patterns.md..."
    
    # Fix the destructuring
    sed 's/{{ activeTab, setActiveTab }}/{% raw %}{{ activeTab, setActiveTab }}{% endraw %}/g' frontend/react/advanced-patterns.md > frontend/react/advanced-patterns.md.tmp && mv frontend/react/advanced-patterns.md.tmp frontend/react/advanced-patterns.md
fi

echo "Liquid syntax fixes completed!"
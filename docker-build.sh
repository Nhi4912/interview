#!/bin/bash

# Docker script to build and test Jekyll site
# English: Build Jekyll site in Docker container to test for errors
# Vietnamese: Build site Jekyll trong Docker container để test lỗi

echo "🐳 Building Jekyll site in Docker container..."

# Build Docker image
echo "📦 Building Docker image..."
docker build -t jekyll-site .

# Run Jekyll build in container
echo "🔨 Running Jekyll build..."
docker run --rm jekyll-site

# Check build status
BUILD_STATUS=$?

if [ $BUILD_STATUS -eq 0 ]; then
    echo "✅ Jekyll build successful!"
    echo "(Tiếng Việt: Build Jekyll thành công!)"
else
    echo "❌ Jekyll build failed!"
    echo "(Tiếng Việt: Build Jekyll bị lỗi!)"
    echo "Check the output above for error details."
    echo "(Kiểm tra output ở trên để xem chi tiết lỗi.)"
fi

exit $BUILD_STATUS 
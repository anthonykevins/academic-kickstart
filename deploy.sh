#!/bin/bash

echo "🚀 Deploying to anthonykevins.github.io..."

# Build the site
echo "Building site with Hugo..."
hugo --gc --minify

# Navigate to public folder
cd public

# Add changes to git
git add -A

# Commit changes
msg="Site rebuild $(date)"
if [ -n "$*" ]; then
    msg="$*"
fi
git commit -m "$msg"

# Push to GitHub
echo "Pushing to GitHub Pages..."
git push origin master

echo "✅ Deploy complete! Your site will be live in 1-2 minutes."

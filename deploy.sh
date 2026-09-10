#!/bin/bash
set -euo pipefail

# Always run from the repo root, whatever directory this was invoked from.
cd "$(dirname "$0")"

echo "🚀 Deploying to anthonykevins.github.io..."

# Hugo writes into public/ but never deletes files whose source content has
# been removed, so a deleted page would stay on the live site indefinitely.
# Clear public/ first, preserving public/.git (the submodule pointing at the
# published repo) so history and the remote are untouched.
echo "Cleaning public/ (preserving git metadata)..."
if [ ! -d public ]; then
    echo "ERROR: public/ not found — is the submodule checked out?" >&2
    exit 1
fi
find public -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Build the site
echo "Building site with Hugo..."
hugo --gc --minify

# Navigate to public folder
cd public

# Stage everything, including deletions from the clean above
git add -A

# One message for both repos, so a deploy and the source behind it match.
msg="Site rebuild $(date)"
if [ -n "$*" ]; then
    msg="$*"
fi

# Only commit and push if the build actually changed something. Previously an
# empty commit failed and, without `set -e`, the script pushed anyway. This no
# longer exits early -- the source repo below still needs committing even when
# the rendered output happens to be identical.
if git diff --cached --quiet; then
    echo "✅ No changes to deploy — the live site is already up to date."
else
    git commit -m "$msg"
    echo "Pushing to GitHub Pages..."
    git push origin master
    echo "✅ Deploy complete! Your site will be live in 1-2 minutes."
fi

# Now the source repo. Without this the site goes live but the content, CSS and
# images that produced it stay uncommitted locally, along with the submodule
# pointer to the commit just pushed above. `master` tracks upstream/master,
# which is github.com/anthonykevins/academic-kickstart.
cd ..
echo "Committing source repo..."
git add -A
if git diff --cached --quiet; then
    echo "✅ Source repo already up to date."
else
    git commit -m "$msg"
    git push upstream master
    echo "✅ Source pushed to anthonykevins/academic-kickstart."
fi

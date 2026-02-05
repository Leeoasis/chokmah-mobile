#!/bin/bash
# Create simple colored placeholder images using ImageMagick or base64
# For now, we'll create empty placeholder files that Expo will handle

# Create icon.png (1024x1024)
echo "Creating placeholder icons..."
echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==" | base64 -d > icon.png

# Create splash.png
cp icon.png splash.png

# Create adaptive-icon.png
cp icon.png adaptive-icon.png

# Create favicon.png
cp icon.png favicon.png

echo "Placeholder images created!"

#!/bin/bash

# Installation script for Topics functionality
# Run this script to complete the setup

echo "======================================"
echo "Topics Functionality Setup"
echo "======================================"
echo ""

# Step 1: Install expo-image-picker
echo "Step 1: Installing expo-image-picker..."
npx expo install expo-image-picker

if [ $? -eq 0 ]; then
    echo "✅ expo-image-picker installed successfully"
else
    echo "❌ Failed to install expo-image-picker"
    exit 1
fi

echo ""
echo "======================================"
echo "Installation completed!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Open /components/CreateTopicModal.tsx"
echo "2. Uncomment the import at line 13:"
echo "   import * as ImagePicker from 'expo-image-picker';"
echo "3. Replace the handlePickImage function with the commented implementation"
echo "4. Save the file and restart your dev server"
echo ""
echo "Then you can:"
echo "- Create topics with images"
echo "- Like/unlike topics"
echo "- Comment on topics"
echo "- Reply to comments (up to 3 levels)"
echo ""
echo "For detailed documentation, see:"
echo "- TOPICS_IMPLEMENTATION.md (English)"
echo "- TOPICS_IMPLEMENTATION_VI.md (Vietnamese)"
echo ""

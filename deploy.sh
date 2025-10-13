#!/bin/bash
# Security Leader AI Blog - Quick Deploy Script

echo "🚀 Security Leader AI Blog Deployment"
echo "======================================"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the blog root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check errors above."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📋 Deployment options:"
echo ""
echo "1. Deploy to Vercel (recommended):"
echo "   vercel --prod"
echo ""
echo "2. Push to GitHub (auto-deploys):"
echo "   git add ."
echo "   git commit -m \"Deploy blog\""
echo "   git push origin main"
echo ""
echo "3. Test locally:"
echo "   npm run dev"
echo "   # Visit http://localhost:3000"
echo ""
echo "🌐 Don't forget to add securityleader.ai in Vercel project settings!"

#!/bin/bash

echo "🔍 EC2 Deployment Setup Verification"
echo "======================================"

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found"
    exit 1
fi

# Check curl
echo "🌐 Checking curl..."
if command -v curl &> /dev/null; then
    echo "✅ curl: $(curl --version | head -n1)"
else
    echo "❌ curl not found"
fi

# Check tar
echo "📦 Checking tar..."
if command -v tar &> /dev/null; then
    echo "✅ tar: available"
else
    echo "❌ tar not found"
fi

# Check GitHub Actions runner
echo "🤖 Checking GitHub Actions runner..."
if systemctl is-active --quiet actions.runner.* 2>/dev/null; then
    echo "✅ GitHub Actions runner is active"
    systemctl status actions.runner.* --no-pager -l
elif ps aux | grep -q "[r]unner" 2>/dev/null; then
    echo "✅ GitHub Actions runner process found"
    ps aux | grep runner
else
    echo "❌ GitHub Actions runner not found"
    echo "   You need to set up a self-hosted runner on this EC2 instance"
fi

# Check port 3000
echo "🔌 Checking if port 3000 is available..."
if netstat -tulpn 2>/dev/null | grep -q ":3000 "; then
    echo "⚠️  Port 3000 is already in use"
    netstat -tulpn | grep ":3000 "
else
    echo "✅ Port 3000 is available"
fi

# Check internet connectivity
echo "🌍 Checking internet connectivity..."
if curl -s --max-time 5 https://www.google.com > /dev/null; then
    echo "✅ Internet connectivity: OK"
else
    echo "❌ No internet connectivity"
fi

# Check deployment directory permissions
echo "📁 Checking deployment directory..."
DEPLOY_DIR="/home/$USER/vite-todo"
if mkdir -p "$DEPLOY_DIR" 2>/dev/null; then
    echo "✅ Can create deployment directory: $DEPLOY_DIR"
    rmdir "$DEPLOY_DIR" 2>/dev/null
else
    echo "❌ Cannot create deployment directory: $DEPLOY_DIR"
fi

echo ""
echo "🎯 Summary:"
echo "- If all checks pass, your EC2 is ready for deployment"
echo "- If GitHub Actions runner is missing, follow GitHub's self-hosted runner setup guide"
echo "- Ensure your repository has Actions enabled and this EC2 runner is connected"

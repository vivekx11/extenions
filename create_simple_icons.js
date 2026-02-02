// Simple script to create basic icon files
// Run this in browser console or Node.js environment

const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient (simplified to solid color for basic version)
    ctx.fillStyle = '#667eea';
    ctx.fillRect(0, 0, size, size);
    
    // Add rupee symbol
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹', size/2, size/2);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/${filename}`, buffer);
}

// Create icons (requires canvas package: npm install canvas)
try {
    createIcon(16, 'icon16.png');
    createIcon(48, 'icon48.png');
    createIcon(128, 'icon128.png');
    console.log('Icons created successfully!');
} catch (error) {
    console.log('Canvas package not available. Use the HTML method instead.');
}
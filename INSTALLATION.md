# 🚀 Installation Guide

## Quick Start (2 minutes)

### Step 1: Create Icons
1. Open `create_basic_icons.html` in your web browser
2. Click "Generate & Download Icons" 
3. Move the 3 downloaded PNG files to the `icons/` folder

### Step 2: Install Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked" and select this folder
4. Pin the extension to your toolbar

### Step 3: Start Calculating!
Click the extension icon and start using all the financial calculators!

## Detailed Instructions

### Creating Icons (Required)

The extension needs 3 icon files. You have two options:

**Option A: Automatic (Recommended)**
1. Double-click `create_basic_icons.html`
2. Click the "Generate & Download Icons" button
3. Move downloaded files (`icon16.png`, `icon48.png`, `icon128.png`) to `icons/` folder

**Option B: Manual**
- Create 16x16, 48x48, and 128x128 pixel PNG images
- Name them `icon16.png`, `icon48.png`, `icon128.png`
- Place in the `icons/` folder

### Loading the Extension

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in address bar, OR
   - Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch (top-right corner)

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the extension folder
   - Click "Select Folder"

4. **Pin to Toolbar (Optional)**
   - Click the puzzle piece icon in Chrome toolbar
   - Find "Personal Finance Calculator"
   - Click the pin icon to keep it visible

### Verification

✅ Extension appears in `chrome://extensions/`  
✅ Extension icon visible in toolbar  
✅ Clicking icon opens the calculator popup  
✅ All tabs (Budget, Tax, Investment, Loan) work  
✅ Calculators open in modal windows  

## Troubleshooting

**Extension won't load:**
- Ensure all files are in the same folder
- Check that `manifest.json` exists
- Verify icons are in `icons/` folder

**Icons missing:**
- Run `create_basic_icons.html` to generate them
- Ensure PNG files are named correctly

**Calculators not working:**
- Check browser console (F12) for errors
- Ensure JavaScript is enabled
- Try refreshing the extension

**Permission errors:**
- Extension only needs "storage" permission
- No additional permissions required

## File Structure

Your extension folder should look like this:

```
personal-finance-extension/
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── create_basic_icons.html
├── README.md
└── INSTALLATION.md
```

## Next Steps

Once installed, you can:
- Calculate EMIs for home loans
- Plan your retirement corpus
- Compare different investment options
- Calculate tax liability
- Plan monthly budgets
- Set and track savings goals

Enjoy your new financial planning toolkit! 💰
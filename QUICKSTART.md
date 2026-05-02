# CESIONBNK DSM - Quick Start Guide

**Get up and running in 3 minutes** 🚀

---

## 📋 Prerequisites

- **Node.js 18+** (check with `node -v`)
- **npm 9+** (check with `npm -v`)

---

## ⚡ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Result:** Server running at `http://localhost:5173` (or next available port)

---

## 🎯 What You Get

### DSM Showcase (96 Pages)

Navigate to http://localhost:5173 to see:

- **96 showcase pages** - All components documented
- **5 tenants** - CESIONBNK, C-Financia, Eurocapital, IRIS, Lulo Empresas
- **Light/Dark mode** - Toggle in header
- **Live examples** - Interactive component demos
- **Help system** - Product tour + contextual help

### Factoring App

Click "Factoring" in the header to access:

- **Full factoring platform** - Invoice management
- **Dashboard Comercial** - Analytics dashboard
- **Multi-view system** - Operations, Inversionistas, Settings

---

## 🔧 Common Issues

### Issue: `vite: command not found`

**Cause:** Dependencies not installed

**Fix:**

```bash
npm install
npm run dev
```

---

### Issue: Dependency version errors

**Cause:** Old `node_modules` or `package-lock.json`

**Fix:**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Port 5173 already in use

**Cause:** Another Vite server running

**Fix:** Vite auto-increments to port 5174. No action needed.

Or stop the other server:

```bash
# Find process
lsof -i :5173

# Kill process
kill -9 <PID>
```

---

### Issue: npm install hangs

**Cause:** Slow internet or npm cache corruption

**Fix:**

```bash
npm cache clean --force
npm install --verbose
```

---

## 📁 Project Structure

```
/
├── App.tsx                    # Main entry point
├── main.tsx                   # Vite entry
├── index.html                 # HTML entry
├── package.json               # Dependencies
├── vite.config.ts             # Vite config
├── tsconfig.json              # TypeScript config
├── components/                # All UI components
│   ├── ui/                    # Primitives (Button, Input, etc.)
│   ├── patterns/              # Compositions (forms, tables, business patterns)
│   ├── layout/                # Structural components (Sidebar, Logo, etc.)
│   ├── advanced/              # High-complexity components (Charts, RichText)
│   └── providers/             # Context providers
├── pages/                     # DSM showcase pages
├── styles/                    # CSS (Tailwind v4)
├── guidelines/                # Documentation
└── plugin/                    # Figma plugins
```

---

## 🎨 Development Workflow

### 1. Start Dev Server

```bash
npm run dev
```

### 2. Edit Components

- **UI components:** `/components/ui/*.tsx`
- **Patterns:** `/components/patterns/*.tsx`
- **Pages:** `/pages/*.tsx`
- **Styles:** `/styles/*.css`

### 3. Hot Reload

Vite automatically reloads when you save files.

### 4. Type Check

```bash
npm run typecheck
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Build

```bash
npm run preview
```

---

## 🌈 Theme Switching

### Change Tenant

Click the **Tenant Selector** in the header:

1. **CESIONBNK** (default) - Gray theme, Gotham font
2. **C-Financia** - Green theme, Satoshi font
3. **Eurocapital** - Blue theme, Montserrat font
4. **IRIS** - Teal theme, System UI font
5. **Lulo Empresas** - Cyan theme, Poppins font

### Toggle Dark Mode

Click the **Moon/Sun icon** in the header.

---

## 📖 Documentation

| File | Description |
|------|-------------|
| **PROJECT_AUDIT.md** | Complete audit report (what we fixed) |
| **/guidelines/Guidelines.md** | Master index of all guidelines |
| **/guidelines/COMPONENTS.md** | Component catalog |
| **/guidelines/TOKENS.md** | Design tokens documentation |
| **/plugin/README.md** | Figma plugin technical guide |
| **/plugin/QUICKSTART.md** | Figma plugin quick start |

---

## 🚀 Next Steps

1. **Explore the showcase:**
   - Navigate through all 96 pages
   - Test all components
   - Try theme switching
   - Test light/dark mode

2. **Try the Factoring App:**
   - Click "Factoring" in header
   - Explore dashboard
   - Test invoice table
   - Try different views

3. **Read the guidelines:**
   - `/guidelines/Guidelines.md` - Start here
   - `/guidelines/COMPONENTS.md` - Component catalog
   - `/guidelines/TOKENS.md` - Design system tokens

4. **Run Figma plugins:**
   - See `/plugin/README.md` for instructions
   - Run Tokens plugin first
   - Then Components plugin
   - Then DSM Refactor (optional)

---

## 🆘 Need Help?

### Check Logs

If something fails, check the terminal output for errors.

### Common Commands

```bash
# Full reinstall
rm -rf node_modules package-lock.json && npm install

# Force install
npm install --force

# Install with verbose logs
npm install --verbose

# Check outdated packages
npm outdated

# Audit security
npm audit
```

---

## ✅ Success Checklist

After installation, verify:

- [ ] `npm run dev` starts without errors
- [ ] Browser opens to http://localhost:5173
- [ ] DSM Showcase page loads
- [ ] No console errors in browser DevTools
- [ ] Theme toggle works (Moon/Sun icon)
- [ ] Tenant selector works (5 options)
- [ ] Navigation between pages works
- [ ] Factoring app loads (click "Factoring" button)

---

## 🎉 You're Ready!

The project is now running. Start exploring the Design System Manager or dive into the Factoring App.

**Happy coding!** 🚀

---

**Version:** 0.3.0  
**Last Updated:** March 2, 2026
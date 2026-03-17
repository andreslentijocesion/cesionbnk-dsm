#!/usr/bin/env node
/**
 * build-tokens-plugin.cjs
 * Reads tokens/cesionbnk.tokens.json and regenerates plugin/cesionbnk-tokens/code.js
 *
 * Run: npm run build:tokens:plugin
 *
 * Flujo:
 *   cesionbnk.tokens.json → [este script] → plugin/cesionbnk-tokens/code.js → Figma Variables
 *
 * Secciones del code.js generado:
 *   [STATIC]  Primitives (Tailwind palettes + custom — no cambian)
 *   [DYNAMIC] Semantic   (generado desde tokens.color.*)
 *   [DYNAMIC] Component floats: Radius + Spacing (generado desde tokens.radius/spacing)
 *   [STATIC]  Opacity, BorderWidth, Size (no están en el JSON aún)
 *   [STATIC]  Text styles + Effect styles
 */

const fs   = require('fs');
const path = require('path');

const ROOT   = path.resolve(__dirname, '..');
const SRC    = path.join(ROOT, 'tokens/cesionbnk.tokens.json');
const DEST   = path.join(ROOT, 'plugin/cesionbnk-tokens/code.js');

const tokens = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// ── Helpers ──────────────────────────────────────────────────────────────────

function val(tokenObj, mode) {
  const v = tokenObj?.$value;
  if (!v) return null;
  if (typeof v === 'object') return v[mode] ?? v.light ?? null;
  return v;
}

// kebab-case → "Title Case" con expansiones comunes
function toTitle(s) {
  return s.split('-').map(w => {
    if (w === 'fg')  return 'Foreground';
    if (w === 'bg')  return 'Background';
    if (w === 'on')  return 'On';
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

// ── Mapeo JSON → Figma variable name ─────────────────────────────────────────
// Clave: path en el JSON (sin "color.")  →  Valor: nombre en Figma
// Formato figma: "Categoria/Nombre"
const COLOR_MAP = {
  // Brand
  'brand.primary':            'Brand/Primary',
  'brand.primary-fg':         'Brand/Primary Foreground',
  'brand.secondary':          'Brand/Secondary',
  'brand.secondary-fg':       'Brand/Secondary Foreground',
  'brand.ring':               'Form/Ring',

  // Surfaces
  'surface.background':       'Surface/Background',
  'surface.foreground':       'Surface/Foreground',
  'surface.card':             'Surface/Card',
  'surface.card-fg':          'Surface/Card Foreground',
  'surface.popover':          'Surface/Popover',
  'surface.popover-fg':       'Surface/Popover Foreground',
  'surface.muted':            'Neutral/Muted',
  'surface.muted-fg':         'Neutral/Muted Foreground',
  'surface.accent':           'Neutral/Accent',
  'surface.border':           'Form/Border',
  'surface.input':            'Form/Input Border',

  // UI
  'ui.switch-bg':             'Form/Switch Background',
  'ui.input-bg':              'Form/Input Background',

  // Semantic / Feedback
  'semantic.destructive':           'Feedback/Destructive',
  'semantic.destructive-fg':        'Feedback/Destructive Foreground',
  'semantic.success':               'Feedback/Success',
  'semantic.success-fg':            'Feedback/Success Foreground',
  'semantic.warning':               'Feedback/Warning',
  'semantic.warning-fg':            'Feedback/Warning Foreground',
  'semantic.info':                  'Feedback/Info',
  'semantic.info-fg':               'Feedback/Info Foreground',

  // Subtle backgrounds
  'semantic.success-subtle':        'Feedback/Success Subtle',
  'semantic.destructive-subtle':    'Feedback/Destructive Subtle',
  'semantic.warning-subtle':        'Feedback/Warning Subtle',
  'semantic.info-subtle':           'Feedback/Info Subtle',
  'semantic.secondary-subtle':      'Feedback/Secondary Subtle',

  // On-subtle foregrounds
  'semantic.success-on-subtle':     'Feedback/Success On Subtle',
  'semantic.destructive-on-subtle': 'Feedback/Destructive On Subtle',
  'semantic.warning-on-subtle':     'Feedback/Warning On Subtle',
  'semantic.info-on-subtle':        'Feedback/Info On Subtle',
  'semantic.secondary-on-subtle':   'Feedback/Secondary On Subtle',
};

// ── Generadores de secciones ──────────────────────────────────────────────────

function genSemantic() {
  const lines = [];
  lines.push('  // ── 2. SEMANTIC — generado desde tokens/cesionbnk.tokens.json ───────────');
  lines.push('  const SC = figma.variables.createVariableCollection(\'2. Semantic\');');
  lines.push('  SC.renameMode(SC.defaultModeId, \'Light\');');
  lines.push('  const L = SC.defaultModeId;');
  lines.push('  const D = SC.addMode(\'Dark\');');
  lines.push('  function sem(name, lv, dv) {');
  lines.push('    const v = figma.variables.createVariable(name, SC, \'COLOR\');');
  lines.push('    v.setValueForMode(L, rgb(lv)); v.setValueForMode(D, rgb(dv)); return v;');
  lines.push('  }');
  lines.push('');

  const c = tokens.color;
  for (const [jsonPath, figmaName] of Object.entries(COLOR_MAP)) {
    const [category, ...rest] = jsonPath.split('.');
    const key = rest.join('.');
    const tokenObj = key.split('.').reduce((o, k) => o?.[k], c[category]);
    if (!tokenObj) {
      lines.push(`  // WARN: token not found in JSON: ${jsonPath}`);
      continue;
    }
    const lv = val(tokenObj, 'light');
    const dv = val(tokenObj, 'dark');
    if (!lv || !dv) {
      lines.push(`  // WARN: missing light/dark value for: ${jsonPath}`);
      continue;
    }
    lines.push(`  sem('${figmaName}', '${lv}', '${dv}');`);
  }

  // Sidebar (hardcoded — no en JSON aún)
  lines.push('');
  lines.push('  // Sidebar (hardcoded)');
  lines.push("  sem('Sidebar/Background',         '#fafafa',  '#1e293b');");
  lines.push("  sem('Sidebar/Foreground',         '#222222',  '#f8fafc');");
  lines.push("  sem('Sidebar/Primary',            '#222222',  '#4f46e5');");
  lines.push("  sem('Sidebar/Primary Foreground', '#fafafa',  '#ffffff');");
  lines.push("  sem('Sidebar/Accent',             '#f5f5f5',  '#334155');");
  lines.push("  sem('Sidebar/Accent Foreground',  '#222222',  '#f8fafc');");
  lines.push("  sem('Sidebar/Border',             '#e5e5e5',  '#334155');");
  lines.push("  sem('Sidebar/Ring',               '#adadad',  '#4f46e5');");

  // Charts (hardcoded — no en JSON aún)
  lines.push('');
  lines.push('  // Charts (hardcoded)');
  lines.push("  sem('Chart/1', '#e76f51', '#6366f1');");
  lines.push("  sem('Chart/2', '#2a9d8f', '#4ade80');");
  lines.push("  sem('Chart/3', '#264653', '#84cc16');");
  lines.push("  sem('Chart/4', '#e9c46a', '#d946ef');");
  lines.push("  sem('Chart/5', '#84cc16', '#f97316');");

  return lines.join('\n');
}

function genComponentFloats() {
  const lines = [];
  lines.push('  // ── 3. COMPONENT — generado desde tokens/cesionbnk.tokens.json ──────────');
  lines.push('  const CC = figma.variables.createVariableCollection(\'3. Component\');');
  lines.push('  CC.renameMode(CC.defaultModeId, \'Value\');');
  lines.push('  const CV = CC.defaultModeId;');
  lines.push('  function compFloat(name, v) {');
  lines.push('    const variable = figma.variables.createVariable(name, CC, \'FLOAT\');');
  lines.push('    variable.setValueForMode(CV, v); return variable;');
  lines.push('  }');
  lines.push('');

  // Radius desde JSON
  lines.push('  // Radius');
  const radius = tokens.radius || {};
  for (const [key, tokenObj] of Object.entries(radius)) {
    const v = val(tokenObj, 'light') ?? tokenObj.$value;
    lines.push(`  compFloat('Radius/${key}', ${v});`);
  }

  // Spacing desde JSON
  lines.push('');
  lines.push('  // Spacing');
  const spacing = tokens.spacing || {};
  for (const [key, tokenObj] of Object.entries(spacing)) {
    const v = val(tokenObj, 'light') ?? tokenObj.$value;
    lines.push(`  compFloat('Spacing/${key}', ${v});`);
  }

  // Opcionales hardcoded: spacing intermedios no en JSON
  lines.push('  compFloat(\'Spacing/0\',    0);');
  lines.push('  compFloat(\'Spacing/0-5\',  2);');
  lines.push('  compFloat(\'Spacing/1-5\',  6);');
  lines.push('  compFloat(\'Spacing/2-5\', 10);');
  lines.push('  compFloat(\'Spacing/3-5\', 14);');
  lines.push('  compFloat(\'Spacing/7\',   28);');
  lines.push('  compFloat(\'Spacing/9\',   36);');
  lines.push('  compFloat(\'Spacing/14\',  56);');
  lines.push('  compFloat(\'Spacing/20\',  80);');

  // Opacity (hardcoded)
  lines.push('');
  lines.push('  // Opacity (hardcoded)');
  [[0,0],[5,0.05],[8,0.08],[10,0.10],[16,0.16],[20,0.20],[25,0.25],
   [30,0.30],[40,0.40],[50,0.50],[60,0.60],[70,0.70],[80,0.80],[90,0.90],[100,1.00]]
    .forEach(([k, v]) => lines.push(`  compFloat('Opacity/${k}', ${v});`));

  // BorderWidth (hardcoded)
  lines.push('');
  lines.push('  // BorderWidth (hardcoded)');
  lines.push("  compFloat('BorderWidth/none',    0);");
  lines.push("  compFloat('BorderWidth/thin',    1);");
  lines.push("  compFloat('BorderWidth/default', 1);");
  lines.push("  compFloat('BorderWidth/medium',  1.5);");
  lines.push("  compFloat('BorderWidth/thick',   2);");
  lines.push("  compFloat('BorderWidth/heavy',   4);");

  // Size (hardcoded)
  lines.push('');
  lines.push('  // Size (hardcoded)');
  lines.push("  compFloat('Size/Icon/xs',  12);");
  lines.push("  compFloat('Size/Icon/sm',  16);");
  lines.push("  compFloat('Size/Icon/md',  20);");
  lines.push("  compFloat('Size/Icon/lg',  24);");
  lines.push("  compFloat('Size/Icon/xl',  32);");
  lines.push("  compFloat('Size/Avatar/sm',      32);");
  lines.push("  compFloat('Size/Avatar/default', 40);");
  lines.push("  compFloat('Size/Avatar/lg',      48);");

  return lines.join('\n');
}

// ── Ensamblado del code.js completo ──────────────────────────────────────────

const meta = tokens.$metadata;
const version = meta?.version || '?';
const updatedAt = new Date().toISOString().slice(0, 10);

// Recalcula cantidad de tokens generados para el mensaje final
const semCount = Object.keys(COLOR_MAP).length + 8 + 5; // mapeados + sidebar + charts
const radCount = Object.keys(tokens.radius || {}).length;
const spCount  = Object.keys(tokens.spacing || {}).length;

const output = `// CESIONBNK — Tokens CESIONBNK
// AUTO-GENERADO por scripts/build-tokens-plugin.cjs — NO editar manualmente
// Fuente: tokens/cesionbnk.tokens.json v${version} (${updatedAt})
// Para actualizar: npm run build:tokens:plugin
(async () => {
  try {

  // ── HELPERS ──────────────────────────────────────────────
  function rgb(hex) {
    const c = hex.replace('#', '');
    return { r: parseInt(c.slice(0,2),16)/255, g: parseInt(c.slice(2,4),16)/255, b: parseInt(c.slice(4,6),16)/255, a: 1 };
  }

  async function font(family, style) {
    try { await figma.loadFontAsync({ family, style }); return { family, style }; }
    catch (e1) {
      if (style === 'SemiBold') { try { await figma.loadFontAsync({ family, style: 'Bold' }); return { family, style: 'Bold' }; } catch (e2) {} }
      var s = style === 'SemiBold' ? 'Semi Bold' : style;
      try { await figma.loadFontAsync({ family: 'Inter', style: s }); return { family: 'Inter', style: s }; }
      catch (e3) { await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }); return { family: 'Inter', style: 'Regular' }; }
    }
  }

  // ── 1. PRIMITIVES (Tailwind palettes + custom — estático) ──
  const PC = figma.variables.createVariableCollection('1. Primitives');
  PC.renameMode(PC.defaultModeId, 'Value');
  const PV = PC.defaultModeId;

  const primData = {
    'Slate/50':'#f8fafc','Slate/100':'#f1f5f9','Slate/200':'#e2e8f0','Slate/300':'#cbd5e1','Slate/400':'#94a3b8',
    'Slate/500':'#64748b','Slate/600':'#475569','Slate/700':'#334155','Slate/800':'#1e293b','Slate/900':'#0f172a',
    'Gray/50':'#f9fafb','Gray/100':'#f3f4f6','Gray/200':'#e5e7eb','Gray/300':'#d1d5db','Gray/400':'#9ca3af',
    'Gray/500':'#6b7280','Gray/600':'#4b5563','Gray/700':'#374151','Gray/800':'#1f2937','Gray/900':'#111827',
    'Zinc/50':'#fafafa','Zinc/100':'#f4f4f5','Zinc/200':'#e4e4e7','Zinc/300':'#d4d4d8','Zinc/400':'#a1a1aa',
    'Zinc/500':'#71717a','Zinc/600':'#52525b','Zinc/700':'#3f3f46','Zinc/800':'#27272a','Zinc/900':'#18181b',
    'Neutral/50':'#fafafa','Neutral/100':'#f5f5f5','Neutral/200':'#e5e5e5','Neutral/300':'#d4d4d4','Neutral/400':'#a3a3a3',
    'Neutral/500':'#737373','Neutral/600':'#525252','Neutral/700':'#404040','Neutral/800':'#262626','Neutral/900':'#171717',
    'Red/50':'#fef2f2','Red/100':'#fee2e2','Red/200':'#fecaca','Red/300':'#fca5a5','Red/400':'#f87171',
    'Red/500':'#ef4444','Red/600':'#dc2626','Red/700':'#b91c1c','Red/800':'#991b1b','Red/900':'#7f1d1d',
    'Amber/50':'#fffbeb','Amber/100':'#fef3c7','Amber/200':'#fde68a','Amber/300':'#fcd34d','Amber/400':'#fbbf24',
    'Amber/500':'#f59e0b','Amber/600':'#d97706','Amber/700':'#b45309','Amber/800':'#92400e','Amber/900':'#78350f',
    'Green/50':'#f0fdf4','Green/100':'#dcfce7','Green/200':'#bbf7d0','Green/300':'#86efac','Green/400':'#4ade80',
    'Green/500':'#22c55e','Green/600':'#16a34a','Green/700':'#15803d','Green/800':'#166534','Green/900':'#14532d',
    'Blue/50':'#eff6ff','Blue/100':'#dbeafe','Blue/200':'#bfdbfe','Blue/300':'#93c5fd','Blue/400':'#60a5fa',
    'Blue/500':'#3b82f6','Blue/600':'#2563eb','Blue/700':'#1d4ed8','Blue/800':'#1e40af','Blue/900':'#1e3a8a',
    'Indigo/50':'#eef2ff','Indigo/100':'#e0e7ff','Indigo/200':'#c7d2fe','Indigo/300':'#a5b4fc','Indigo/400':'#818cf8',
    'Indigo/500':'#6366f1','Indigo/600':'#4f46e5','Indigo/700':'#4338ca','Indigo/800':'#3730a3','Indigo/900':'#312e81',
    'Violet/50':'#f5f3ff','Violet/100':'#ede9fe','Violet/200':'#ddd6fe','Violet/300':'#c4b5fd','Violet/400':'#a78bfa',
    'Violet/500':'#8b5cf6','Violet/600':'#7c3aed','Violet/700':'#6d28d9','Violet/800':'#5b21b6','Violet/900':'#4c1d95',
    'Neutral/White':'#ffffff','Neutral/Gray':'#cbced4','Neutral/Charcoal':'#222222',
    'Neutral/98':'#fafafa','Neutral/97':'#f5f5f5','Neutral/92':'#e5e5e5','Neutral/71':'#adadad',
    'CESIONBNK/Purple':'#796eff',
    'Chart/Light/1':'#e76f51','Chart/Light/2':'#2a9d8f','Chart/Light/3':'#264653',
    'Chart/Light/4':'#e9c46a','Chart/Light/5':'#84cc16',
    'Chart/Dark/1':'#6366f1','Chart/Dark/2':'#4ade80','Chart/Dark/3':'#84cc16',
    'Chart/Dark/4':'#d946ef','Chart/Dark/5':'#f97316',
  };

  for (const [name, color] of Object.entries(primData)) {
    const v = figma.variables.createVariable(name, PC, 'COLOR');
    v.setValueForMode(PV, rgb(color));
  }

${genSemantic()}

${genComponentFloats()}

  // ── 4. TEXT STYLES ────────────────────────────────────────
  const wMap = { 400:'Regular', 500:'Medium', 600:'SemiBold', 700:'Bold' };
  for (const [name, size, weight, lh] of [
    ['Display',48,700,150],['H1/Page Title',30,600,150],['H2/Section',24,600,150],
    ['H3/Subsection',20,500,150],['H4/Card Title',18,500,150],['Body/Default',16,400,150],
    ['Body/Small',14,400,150],['Caption',12,400,150],['Label',14,500,150],
    ['Button',16,500,150],['KPI Value',36,700,125],
  ]) {
    const fn = await font('Gotham', wMap[weight]);
    const s = figma.createTextStyle();
    s.name = name; s.fontName = fn; s.fontSize = size;
    s.lineHeight = { unit:'PERCENT', value:lh };
    s.letterSpacing = { unit:'PERCENT', value:2.5 };
  }

  // ── 5. EFFECT STYLES ──────────────────────────────────────
  const charcoal = { r:34/255, g:34/255, b:34/255 };
  const sh = (y,b,sp,a) => ({ type:'DROP_SHADOW', color:{r:charcoal.r,g:charcoal.g,b:charcoal.b,a:a}, offset:{x:0,y:y}, radius:b, spread:sp, visible:true, blendMode:'NORMAL' });
  for (const [name, layers] of [
    ['Elevation/1', [sh(1,2,0,0.05)]],
    ['Elevation/2', [sh(4,6,-1,0.1), sh(2,4,-2,0.1)]],
    ['Elevation/3', [sh(10,15,-3,0.1), sh(4,6,-4,0.1)]],
    ['Elevation/4', [sh(20,25,-5,0.1), sh(8,10,-6,0.1)]],
  ]) {
    const s = figma.createEffectStyle();
    s.name = name; s.effects = layers;
  }

  figma.closePlugin(
    '\\u2705 Tokens CESIONBNK v${version}: ' +
    Object.keys(primData).length + ' primitivos \\xb7 ' +
    '${semCount} semánticos \\xb7 ' +
    '(${radCount} radius + ${spCount} spacing + opacity + borders + sizes) component \\xb7 ' +
    '11 text styles \\xb7 4 effect styles'
  );

  } catch (err) {
    figma.closePlugin('\\u274c Error: ' + (err.message || err));
  }
})();
`;

fs.writeFileSync(DEST, output, 'utf8');
console.log(`✅ Generado: plugin/cesionbnk-tokens/code.js`);
console.log(`   Fuente:   tokens/cesionbnk.tokens.json v${version}`);
console.log(`   Tokens semánticos: ${Object.keys(COLOR_MAP).length} desde JSON + sidebar + charts`);
console.log(`   Radius: ${radCount} | Spacing: ${spCount}`);

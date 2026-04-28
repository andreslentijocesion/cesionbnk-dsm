// CESIONBNK — Tokens CESIONBNK
// AUTO-GENERADO por scripts/build-tokens-plugin.cjs — NO editar manualmente
// Fuente: tokens/cesionbnk.tokens.json v7.0.1 (2026-04-28)
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

  // ── 2. SEMANTIC — generado desde tokens/cesionbnk.tokens.json ───────────
  const SC = figma.variables.createVariableCollection('2. Semantic');
  SC.renameMode(SC.defaultModeId, 'Light');
  const L = SC.defaultModeId;
  const D = SC.addMode('Dark');
  function sem(name, lv, dv) {
    const v = figma.variables.createVariable(name, SC, 'COLOR');
    v.setValueForMode(L, rgb(lv)); v.setValueForMode(D, rgb(dv)); return v;
  }

  sem('Brand/Primary', '#374151', '#d1d5db');
  sem('Brand/Primary Foreground', '#ffffff', '#09090b');
  sem('Brand/Secondary', '#796eff', '#796eff');
  sem('Brand/Secondary Foreground', '#ffffff', '#09090b');
  sem('Form/Ring', '#374151', '#d1d5db');
  sem('Surface/Background', '#ffffff', '#09090b');
  sem('Surface/Foreground', '#3f3f46', '#fafafa');
  sem('Surface/Card', '#ffffff', '#09090b');
  sem('Surface/Card Foreground', '#3f3f46', '#fafafa');
  sem('Surface/Popover', '#ffffff', '#18181b');
  sem('Surface/Popover Foreground', '#3f3f46', '#fafafa');
  sem('Neutral/Muted', '#f4f4f5', '#27272a');
  sem('Neutral/Muted Foreground', '#52525b', '#a1a1aa');
  sem('Neutral/Accent', '#f4f4f5', '#27272a');
  sem('Form/Border', '#e4e4e7', '#27272a');
  sem('Form/Input Border', '#e4e4e7', '#27272a');
  sem('Form/Switch Background', '#cbced4', '#475569');
  sem('Form/Input Background', '#ffffff', '#334155');
  sem('Feedback/Destructive', '#ef4444', '#ef4444');
  sem('Feedback/Destructive Foreground', '#ffffff', '#fafafa');
  sem('Feedback/Success', '#22c55e', '#22c55e');
  sem('Feedback/Success Foreground', '#ffffff', '#052e16');
  sem('Feedback/Warning', '#f59e0b', '#f59e0b');
  sem('Feedback/Warning Foreground', '#ffffff', '#1c1917');
  sem('Feedback/Info', '#3b82f6', '#3b82f6');
  sem('Feedback/Info Foreground', '#ffffff', '#172554');
  sem('Feedback/Success Subtle', '#f0fdf4', '#052e16');
  sem('Feedback/Destructive Subtle', '#fef2f2', '#450a0a');
  sem('Feedback/Warning Subtle', '#fef3c7', '#451a03');
  sem('Feedback/Info Subtle', '#eff6ff', '#172554');
  sem('Feedback/Secondary Subtle', '#ede9fe', '#2e1065');
  sem('Feedback/Success On Subtle', '#15803d', '#4ade80');
  sem('Feedback/Destructive On Subtle', '#b91c1c', '#f87171');
  sem('Feedback/Warning On Subtle', '#b45309', '#fbbf24');
  sem('Feedback/Info On Subtle', '#1d4ed8', '#93c5fd');
  sem('Feedback/Secondary On Subtle', '#7c3aed', '#c4b5fd');

  // Sidebar (hardcoded)
  sem('Sidebar/Background',         '#fafafa',  '#1e293b');
  sem('Sidebar/Foreground',         '#222222',  '#f8fafc');
  sem('Sidebar/Primary',            '#222222',  '#4f46e5');
  sem('Sidebar/Primary Foreground', '#fafafa',  '#ffffff');
  sem('Sidebar/Accent',             '#f5f5f5',  '#334155');
  sem('Sidebar/Accent Foreground',  '#222222',  '#f8fafc');
  sem('Sidebar/Border',             '#e5e5e5',  '#334155');
  sem('Sidebar/Ring',               '#adadad',  '#4f46e5');

  // Charts (hardcoded)
  sem('Chart/1', '#e76f51', '#6366f1');
  sem('Chart/2', '#2a9d8f', '#4ade80');
  sem('Chart/3', '#264653', '#84cc16');
  sem('Chart/4', '#e9c46a', '#d946ef');
  sem('Chart/5', '#84cc16', '#f97316');

  // ── 3. COMPONENT — generado desde tokens/cesionbnk.tokens.json ──────────
  const CC = figma.variables.createVariableCollection('3. Component');
  CC.renameMode(CC.defaultModeId, 'Value');
  const CV = CC.defaultModeId;
  function compFloat(name, v) {
    const variable = figma.variables.createVariable(name, CC, 'FLOAT');
    variable.setValueForMode(CV, v); return variable;
  }

  // Radius
  compFloat('Radius/sm', 6);
  compFloat('Radius/default', 10);
  compFloat('Radius/lg', 12);
  compFloat('Radius/xl', 16);
  compFloat('Radius/2xl', 24);
  compFloat('Radius/full', 9999);

  // Spacing
  compFloat('Spacing/1', 4);
  compFloat('Spacing/2', 8);
  compFloat('Spacing/3', 12);
  compFloat('Spacing/4', 16);
  compFloat('Spacing/5', 20);
  compFloat('Spacing/6', 24);
  compFloat('Spacing/8', 32);
  compFloat('Spacing/10', 40);
  compFloat('Spacing/12', 48);
  compFloat('Spacing/16', 64);
  compFloat('Spacing/0',    0);
  compFloat('Spacing/0-5',  2);
  compFloat('Spacing/1-5',  6);
  compFloat('Spacing/2-5', 10);
  compFloat('Spacing/3-5', 14);
  compFloat('Spacing/7',   28);
  compFloat('Spacing/9',   36);
  compFloat('Spacing/14',  56);
  compFloat('Spacing/20',  80);

  // Opacity (hardcoded)
  compFloat('Opacity/0', 0);
  compFloat('Opacity/5', 0.05);
  compFloat('Opacity/8', 0.08);
  compFloat('Opacity/10', 0.1);
  compFloat('Opacity/16', 0.16);
  compFloat('Opacity/20', 0.2);
  compFloat('Opacity/25', 0.25);
  compFloat('Opacity/30', 0.3);
  compFloat('Opacity/40', 0.4);
  compFloat('Opacity/50', 0.5);
  compFloat('Opacity/60', 0.6);
  compFloat('Opacity/70', 0.7);
  compFloat('Opacity/80', 0.8);
  compFloat('Opacity/90', 0.9);
  compFloat('Opacity/100', 1);

  // BorderWidth (hardcoded)
  compFloat('BorderWidth/none',    0);
  compFloat('BorderWidth/thin',    1);
  compFloat('BorderWidth/default', 1);
  compFloat('BorderWidth/medium',  1.5);
  compFloat('BorderWidth/thick',   2);
  compFloat('BorderWidth/heavy',   4);

  // Size (hardcoded)
  compFloat('Size/Icon/xs',  12);
  compFloat('Size/Icon/sm',  16);
  compFloat('Size/Icon/md',  20);
  compFloat('Size/Icon/lg',  24);
  compFloat('Size/Icon/xl',  32);
  compFloat('Size/Avatar/sm',      32);
  compFloat('Size/Avatar/default', 40);
  compFloat('Size/Avatar/lg',      48);

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
    '\u2705 Tokens CESIONBNK v7.0.1: ' +
    Object.keys(primData).length + ' primitivos \xb7 ' +
    '49 semánticos \xb7 ' +
    '(6 radius + 10 spacing + opacity + borders + sizes) component \xb7 ' +
    '11 text styles \xb7 4 effect styles'
  );

  } catch (err) {
    figma.closePlugin('\u274c Error: ' + (err.message || err));
  }
})();

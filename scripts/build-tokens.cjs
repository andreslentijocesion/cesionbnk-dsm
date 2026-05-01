#!/usr/bin/env node
/**
 * build-tokens.js
 * Reads tokens/cesionbnk.tokens.json and updates:
 *   1. styles/themes/cesionbnk.css  — CSS custom properties (:root and .dark)
 *   2. plugin/dsm-refactor/code.js  — var C = {...} and var DARK = {...}
 *
 * Run: npm run build:tokens
 */

const fs   = require('fs');
const path = require('path');

const ROOT   = path.resolve(__dirname, '..');
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens/cesionbnk.tokens.json'), 'utf8'));

// ── Helpers ────────────────────────────────────────────────────────────────

function val(tokenObj, mode) {
  const v = tokenObj?.$value;
  if (!v) return null;
  if (typeof v === 'object') return v[mode] ?? v.light ?? null;
  return v;
}

const c  = tokens.color;
const cs = tokens.color.semantic;
const cu = tokens.color.ui;
const r  = tokens.radius;
const sp = tokens.spacing;
const ty = tokens.typography;
const sh = tokens.shadow;

// ── 1. CSS GENERATION ──────────────────────────────────────────────────────

function buildCSSVars(mode) {
  const m = mode; // 'light' | 'dark'
  const lines = [];

  const add = (varName, tokenObj) => {
    const v = val(tokenObj, m);
    if (v !== null) {
      lines.push(`  --${varName}: ${v};`);
      // Generar variante oklch si es un color hex
      if (v.startsWith('#')) {
        lines.push(`  --${varName}-oklch: oklch(from ${v} l c h);`);
      }
    }
  };

  lines.push('  /* Brand */');
  add('primary',                  c.brand.primary);
  add('primary-foreground',       c.brand['primary-fg']);
  add('secondary',                c.brand.secondary);
  add('secondary-foreground',     c.brand['secondary-fg']);

  lines.push('');
  lines.push('  /* Surfaces */');
  add('background',               c.surface.background);
  add('foreground',               c.surface.foreground);
  add('card',                     c.surface.card);
  add('card-foreground',          c.surface['card-fg']);
  add('popover',                  c.surface.popover);
  add('popover-foreground',       c.surface['popover-fg']);

  lines.push('');
  lines.push('  /* Neutral */');
  add('muted',                    c.surface.muted);
  add('muted-foreground',         c.surface['muted-fg']);
  add('accent',                   c.surface.accent);
  add('accent-foreground',        c.surface.foreground);

  lines.push('');
  lines.push('  /* Semantic */');
  add('destructive',              cs.destructive);
  add('destructive-foreground',   cs['destructive-fg']);
  add('success',                  cs.success);
  add('success-foreground',       cs['success-fg']);
  add('warning',                  cs.warning);
  add('warning-foreground',       cs['warning-fg']);
  add('info',                     cs.info);
  add('info-foreground',          cs['info-fg']);

  lines.push('');
  lines.push('  /* Semantic subtle (soft backgrounds) */');
  add('success-subtle',           cs['success-subtle']);
  add('destructive-subtle',       cs['destructive-subtle']);
  add('warning-subtle',           cs['warning-subtle']);
  add('info-subtle',              cs['info-subtle']);
  add('secondary-subtle',         cs['secondary-subtle']);
  add('success-on-subtle',        cs['success-on-subtle']);
  add('destructive-on-subtle',    cs['destructive-on-subtle']);
  add('warning-on-subtle',        cs['warning-on-subtle']);
  add('info-on-subtle',           cs['info-on-subtle']);
  add('secondary-on-subtle',      cs['secondary-on-subtle']);

  lines.push('');
  lines.push('  /* UI */');
  add('switch-background',        cu['switch-bg']);
  add('input-background',         cu['input-bg']);

  lines.push('');
  lines.push('  /* Forms */');
  add('border',                   c.surface.border);
  add('input',                    c.surface.input);
  add('ring',                     c.brand.ring);

  if (mode === 'light') {
    lines.push('');
    lines.push('  /* Radius */');
    lines.push(`  --radius: ${val(r.default, m) / 16}rem;`);
    lines.push('  --button-radius: var(--radius);');
  }

  return lines.join('\n');
}

const CSS_LIGHT = buildCSSVars('light');
const CSS_DARK  = buildCSSVars('dark');

// ── Read + patch CSS file ──────────────────────────────────────────────────

const CSS_FILE = path.join(ROOT, 'styles/themes/cesionbnk.css');
let css = fs.readFileSync(CSS_FILE, 'utf8');

const LIGHT_START = '/* [TOKENS:LIGHT:START] */';
const LIGHT_END   = '/* [TOKENS:LIGHT:END] */';
const DARK_START  = '/* [TOKENS:DARK:START] */';
const DARK_END    = '/* [TOKENS:DARK:END] */';

function replaceBlock(src, start, end, content) {
  const i = src.indexOf(start);
  const j = src.indexOf(end);
  if (i === -1 || j === -1) {
    console.error(`  ✗ Markers not found: "${start}"`);
    return src;
  }
  return src.slice(0, i + start.length) + '\n' + content + '\n' + src.slice(j);
}

css = replaceBlock(css, LIGHT_START, LIGHT_END, CSS_LIGHT);
css = replaceBlock(css, DARK_START,  DARK_END,  CSS_DARK);

fs.writeFileSync(CSS_FILE, css, 'utf8');
console.log('✓ styles/themes/cesionbnk.css updated');

// ── 2. PLUGIN C OBJECT GENERATION ─────────────────────────────────────────

function buildPluginC(mode) {
  const m = mode;
  const g = (tokenObj) => val(tokenObj, m) ?? 'null';

  const lines = [
    `    primary:       '${g(c.brand.primary)}',       primaryFg:   '${g(c.brand['primary-fg'])}',`,
    `    secondary:     '${g(c.brand.secondary)}',     secondaryFg: '${g(c.brand['secondary-fg'])}',`,
    `    bg:            '${g(c.surface.background)}',`,
    `    fg:            '${g(c.surface.foreground)}',`,
    `    card:          '${g(c.surface.card)}',         cardFg:      '${g(c.surface['card-fg'])}',`,
    `    popover:       '${g(c.surface.popover)}',      popoverFg:   '${g(c.surface['popover-fg'])}',`,
    `    muted:         '${g(c.surface.muted)}',        mutedFg:     '${g(c.surface['muted-fg'])}',`,
    `    accent:        '${g(c.surface.accent)}',       accentFg:    '${g(c.surface.foreground)}',`,
    `    destructive:      '${g(cs.destructive)}',       destructiveFg:      '${g(cs['destructive-fg'])}',`,
    `    success:          '${g(cs.success)}',           successFg:          '${g(cs['success-fg'])}',`,
    `    warning:          '${g(cs.warning)}',           warningFg:          '${g(cs['warning-fg'])}',`,
    `    info:             '${g(cs.info)}',              infoFg:             '${g(cs['info-fg'])}',`,
    `    successSubtle:    '${g(cs['success-subtle'])}',`,
    `    destructiveSubtle:'${g(cs['destructive-subtle'])}',`,
    `    warningSubtle:    '${g(cs['warning-subtle'])}',`,
    `    infoSubtle:       '${g(cs['info-subtle'])}',`,
    `    secondarySubtle:  '${g(cs['secondary-subtle'])}',`,
    `    successOnSubtle:     '${g(cs['success-on-subtle'])}',`,
    `    destructiveOnSubtle: '${g(cs['destructive-on-subtle'])}',`,
    `    warningOnSubtle:     '${g(cs['warning-on-subtle'])}',`,
    `    infoOnSubtle:        '${g(cs['info-on-subtle'])}',`,
    `    secondaryOnSubtle:   '${g(cs['secondary-on-subtle'])}',`,
    `    border:           '${g(c.surface.border)}',`,
    `    input:            '${g(c.surface.input)}',`,
    `    ring:             '${g(c.brand.ring)}',`,
    `    surface:          '${g(c.surface.card)}',      // alias for card`,
    `    switchBg:         '${g(cu['switch-bg'])}',`,
    `    inputBg:          '${g(cu['input-bg'])}'`,
  ];
  return lines.join('\n');
}

const PLUGIN_C_CONTENT    = buildPluginC('light');
const PLUGIN_DARK_CONTENT = buildPluginC('dark');

// ── Read + patch plugin file ───────────────────────────────────────────────

const PLUGIN_FILE = path.join(ROOT, 'plugin/cesionbnk-componentes/code.js');
let plugin = fs.readFileSync(PLUGIN_FILE, 'utf8');

const PC_START = '// [TOKENS:C:START]';
const PC_END   = '// [TOKENS:C:END]';
const PD_START = '// [TOKENS:DARK:START]';
const PD_END   = '// [TOKENS:DARK:END]';

plugin = replaceBlock(plugin, PC_START,   PC_END,   PLUGIN_C_CONTENT);
plugin = replaceBlock(plugin, PD_START,   PD_END,   PLUGIN_DARK_CONTENT);

fs.writeFileSync(PLUGIN_FILE, plugin, 'utf8');
console.log('✓ plugin/cesionbnk-componentes/code.js updated');

console.log('\nDone. To apply: re-run the Figma plugin for design, `npm run build:lib` for code.');

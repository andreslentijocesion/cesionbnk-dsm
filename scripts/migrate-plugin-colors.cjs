#!/usr/bin/env node
/**
 * One-time migration: replace hardcoded hex colors in plugin/dsm-refactor/code.js
 * with C.* token references.
 * Run: node scripts/migrate-plugin-colors.cjs
 */

const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../plugin/dsm-refactor/code.js');
let code = fs.readFileSync(FILE, 'utf8');
const original = code;

// ── Protect token definition blocks from replacement ─────────────────────────
// Strip C/DARK object contents before replacing, restore after
const C_START = '// [TOKENS:C:START]';
const C_END   = '// [TOKENS:C:END]';
const D_START = '// [TOKENS:DARK:START]';
const D_END   = '// [TOKENS:DARK:END]';

function extractBlock(src, start, end) {
  const i = src.indexOf(start), j = src.indexOf(end);
  if (i === -1 || j === -1) return null;
  return { content: src.slice(i + start.length, j), start: i + start.length, end: j };
}
const cBlock   = extractBlock(code, C_START, C_END);
const dkBlock  = extractBlock(code, D_START, D_END);
// Replace token blocks with placeholders during migration
if (cBlock)  code = code.slice(0, cBlock.start)  + '\n__C_BLOCK_PLACEHOLDER__\n'  + code.slice(cBlock.end);
if (dkBlock) code = code.slice(0, dkBlock.start) + '\n__D_BLOCK_PLACEHOLDER__\n' + code.slice(dkBlock.end);

// ── Helpers ─────────────────────────────────────────────────────────────────

let count = 0;
function replace(from, to) {
  const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const next = code.replace(re, to);
  const n = (code.match(re) || []).length;
  if (n > 0) console.log(`  ${n}x  ${from}  →  ${to}`);
  count += n;
  code = next;
}

console.log('Migrating hardcoded colors in plugin...\n');

// ── 1. White text in tx() calls: '#ffffff' as last arg → C.primaryFg ────────
// Pattern: tx(anything, 'Weight', size, '#ffffff')
code = code.replace(/tx\(([^)]+),\s*'#ffffff'\)/g, (m, inner) => {
  count++;
  return `tx(${inner}, C.primaryFg)`;
});
console.log(`  tx(..., '#ffffff') → tx(..., C.primaryFg)`);

// White stroke: stroke(node, '#ffffff', width) → C.primaryFg
code = code.replace(/stroke\(([^,]+),\s*'#ffffff'/g, (m, node) => {
  count++;
  return `stroke(${node}, C.primaryFg`;
});
console.log(`  stroke(..., '#ffffff') → C.primaryFg`);

// ── 2. White fills → C.card ──────────────────────────────────────────────────
replace("fill(igMain, '#ffffff')", "fill(igMain, C.card)");

// ── 3. Near-white surface fills → C.bg ──────────────────────────────────────
replace("'#fafafa'", 'C.bg');
replace("'#f9fafb'", 'C.bg');
replace("'#f8f8ff'", 'C.bg');

// ── 4. Muted/gray fills → C.muted ───────────────────────────────────────────
replace("'#f5f5f5'", 'C.muted');
replace("'#f0f0f0'", 'C.muted');
replace("'#f3f4f6'", 'C.muted');
replace("'#f1f5f9'", 'C.muted');

// ── 5. Success subtle → C.successSubtle ─────────────────────────────────────
replace("'#f0fdf4'", 'C.successSubtle');
replace("'#dcfce7'", 'C.successSubtle');
replace("'#d1fae5'", 'C.successSubtle');

// ── 6. Destructive subtle → C.destructiveSubtle ─────────────────────────────
replace("'#fef2f2'", 'C.destructiveSubtle');
replace("'#fee2e2'", 'C.destructiveSubtle');
replace("'#fecaca'", 'C.destructiveSubtle');

// ── 7. Warning subtle → C.warningSubtle ─────────────────────────────────────
replace("'#fef3c7'", 'C.warningSubtle');

// ── 8. Info subtle → C.infoSubtle ───────────────────────────────────────────
replace("'#eff6ff'", 'C.infoSubtle');
replace("'#dbeafe'", 'C.infoSubtle');

// ── 9. Secondary subtle → C.secondarySubtle ─────────────────────────────────
replace("'#ede9fe'", 'C.secondarySubtle');
replace("'#f0edff'", 'C.secondarySubtle');

// ── 10. Semantic foregrounds ─────────────────────────────────────────────────
replace("'#10b981'", 'C.success');   // emerald-500 → success
replace("'#16a34a'", 'C.success');   // green-600 → success
replace("'#22c55e'", 'C.success');   // green-500 → success (if any)
replace("'#7c3aed'", 'C.secondary'); // violet-700 → secondary
replace("'#796eff'", 'C.secondary'); // brand violet (if hardcoded anywhere)
replace("'#3b82f6'", 'C.info');      // blue-500 → info
replace("'#1d4ed8'", 'C.info');      // blue-700 → info
replace("'#93c5fd'", 'C.info');      // blue-300 → info (border)
replace("'#b91c1c'", 'C.destructive'); // red-700 → destructive
replace("'#ef4444'", 'C.destructive'); // red-500 → destructive (if any)
replace("'#f59e0b'", 'C.warning');   // amber-500 → warning
replace("'#92400e'", 'C.warning');   // amber-800 → warning text
replace("'#a16207'", 'C.warning');   // yellow-700 → warning
replace("'#94a3b8'", 'C.mutedFg');   // slate-400 → muted-foreground
replace("'#e4e4e7'", 'C.border');    // zinc-200 → border
replace("'#d1d5db'", 'C.mutedFg');   // gray-300 → muted-fg (in text contexts)

// ── 11. Switch background ────────────────────────────────────────────────────
replace("'#cbced4'", 'C.switchBg');

// ── 12. Special: #f0f4ff (blue tint similar to infoSubtle) ──────────────────
replace("'#f0f4ff'", 'C.infoSubtle');

// ── Pass 2: on-subtle text colors ────────────────────────────────────────────
replace("'#15803d'", 'C.successOnSubtle');
replace("'#86efac'", 'C.successOnSubtle');   // success border → same token
replace("'#059669'", 'C.successOnSubtle');
replace("'#b45309'", 'C.warningOnSubtle');
replace("'#fcd34d'", 'C.warningOnSubtle');   // warning border → same token
replace("'#b91c1c'", 'C.destructiveOnSubtle');
replace("'#fca5a5'", 'C.destructiveOnSubtle'); // destructive border
replace("'#7c3aed'", 'C.secondaryOnSubtle');
replace("'#8b5cf6'", 'C.secondaryOnSubtle');
replace("'#1d4ed8'", 'C.infoOnSubtle');
replace("'#93c5fd'", 'C.infoOnSubtle');      // info border

// ── Pass 3: remaining surface/primary tokens ──────────────────────────────────
replace("'#374151'", 'C.primary');   // gray-700 = primary
replace("'#222222'", 'C.fg');        // dark foreground
replace("'#4b5563'", 'C.fg');        // gray-600 ≈ foreground
replace("'#6b7280'", 'C.mutedFg');   // gray-500 → muted-fg
replace("'#9ca3af'", 'C.mutedFg');   // gray-400 → muted-fg
replace("'#6366f1'", 'C.secondary'); // indigo-500 (rebranded to secondary)
replace("'#e5e7eb'", 'C.border');    // gray-200 → border
replace("'#e0e7ef'", 'C.border');    // blue-gray → border
replace("'#f0f9ff'", 'C.infoSubtle'); // sky-50
replace("'#fffbeb'", 'C.warningSubtle'); // yellow-50
replace("'#ffedd5'", 'C.warningSubtle'); // orange-100
replace("'#fef9c3'", 'C.warningSubtle'); // yellow-100
replace("'#f4f4f5'", 'C.muted');     // zinc-100 → muted
replace("'#f4f4f4'", 'C.muted');

// Fix remaining #ffffff in tx/iconNode/conditionals
code = code.replace(/'#ffffff'/g, 'C.primaryFg');

// ── Restore protected token blocks ───────────────────────────────────────────
if (cBlock)  code = code.replace('__C_BLOCK_PLACEHOLDER__',  cBlock.content);
if (dkBlock) code = code.replace('__D_BLOCK_PLACEHOLDER__', dkBlock.content);

// ── Write ────────────────────────────────────────────────────────────────────
if (code !== original) {
  fs.writeFileSync(FILE, code, 'utf8');
  console.log(`\n✓ Done — ${count} replacements applied to plugin/dsm-refactor/code.js`);
} else {
  console.log('\n⚠ No changes made.');
}

// ═══════════════════════════════════════════════════════════════════════════
// CESIONBNK — DSM Refactor Plugin v8.0.0
// ───────────────────────────────────────────────────────────────────────────
// STRATEGY: NEVER change figma.currentPage.
//   Create all nodes on the default page, then move to target pages.
// TOKENS: Exact match to /styles/themes/cesionbnk.css
// ICONS: Lucide SVGs via figma.createNodeFromSvg()
// BUTTON: iconLeft + iconRight via Instance Swap + Boolean visibility
// v6.1.0: Left icon visible, right icon hidden by default. Icons tinted to match text color.
//   Only one icon side shown at a time (user can toggle). Instance Swap with imported Lucide.
// ═══════════════════════════════════════════════════════════════════════════

(async function () {

  // ── Storybook links — Chromatic permalink (latest main build) ──
  var SB_BASE = 'https://main--69ae33b7558bac7457a8a468.chromatic.com/?path=/docs/';
  var SB = {
    // Primitives
    'Button':        SB_BASE + 'dsm-primitives-button--docs',
    'IconButton':    SB_BASE + 'dsm-primitives-button--docs',
    'Input':         SB_BASE + 'dsm-primitives-input--docs',
    'Badge':         SB_BASE + 'dsm-primitives-badge--docs',
    'Avatar':        SB_BASE + 'dsm-primitives-avatar--docs',
    'Checkbox':      SB_BASE + 'dsm-primitives-checkbox--docs',
    'RadioGroup':    SB_BASE + 'dsm-primitives-radiogroup--docs',
    'Switch':        SB_BASE + 'dsm-primitives-switch--docs',
    'Label':         SB_BASE + 'dsm-primitives-label--docs',
    'Slider':        SB_BASE + 'dsm-primitives-slider--docs',
    'Toggle':        SB_BASE + 'dsm-primitives-toggle--docs',
    'Progress':      SB_BASE + 'dsm-primitives-progress--docs',
    'Separator':     SB_BASE + 'dsm-primitives-separator--docs',
    'Skeleton':      SB_BASE + 'dsm-primitives-skeleton--docs',
    'Select':        SB_BASE + 'dsm-primitives-select--docs',
    'Textarea':      SB_BASE + 'dsm-primitives-textarea--docs',
    'SplitButton':   SB_BASE + 'dsm-primitives-splitbutton--docs',
    'InlineBanner':  SB_BASE + 'dsm-primitives-inlinebanner--docs',
    'CurrencyInput': SB_BASE + 'dsm-primitives-currencyinput--docs',
    'NumberInput':   SB_BASE + 'dsm-primitives-numberinput--docs',
    'InputOTP':      SB_BASE + 'dsm-primitives-inputotp--docs',
    'InputFile':     SB_BASE + 'dsm-primitives-inputfile--docs',
    'MaskedInput':   SB_BASE + 'dsm-primitives-maskedinput--docs',
    'TagInput':      SB_BASE + 'dsm-primitives-taginput--docs',
    // Components
    'Card':          SB_BASE + 'dsm-components-card--docs',
    'Alert':         SB_BASE + 'dsm-components-alert--docs',
    'Table':         SB_BASE + 'dsm-components-table--docs',
    'Tabs':          SB_BASE + 'dsm-components-tabs--docs',
    'Dialog':        SB_BASE + 'dsm-components-dialog--docs',
    'Popover':       SB_BASE + 'dsm-components-popover--docs',
    'Tooltip':       SB_BASE + 'dsm-components-tooltip--docs',
    'Sheet':         SB_BASE + 'dsm-components-sheet--docs',
    'Breadcrumb':    SB_BASE + 'dsm-components-breadcrumb--docs',
    'Pagination':    SB_BASE + 'dsm-components-pagination--docs',
    'Accordion':     SB_BASE + 'dsm-components-accordion--docs',
    'DropdownMenu':  SB_BASE + 'dsm-components-dropdownmenu--docs',
    'MultiSelect':   SB_BASE + 'dsm-components-multiselect--docs',
    'StatCard':      SB_BASE + 'dsm-components-statcard--docs',
    'AlertDialog':   SB_BASE + 'dsm-components-alertdialog--docs',
    // Patterns (key = exact frame .name used in plugin)
    'Factoring Dashboard':            SB_BASE + 'dsm-patterns-factoringdashboard--docs',
    'Factoring Portfolio':            SB_BASE + 'dsm-patterns-factoringportfolio--docs',
    'Factoring New Operation':        SB_BASE + 'dsm-patterns-factoringnewoperation--docs',
    'Factoring Approval Queue':       SB_BASE + 'dsm-patterns-factoringapprovalqueue--docs',
    'Factoring Cedent List':          SB_BASE + 'dsm-patterns-factoringcedentlist--docs',
    'Factoring Cedent Profile':       SB_BASE + 'dsm-patterns-factoringcedentprofile--docs',
    'Factoring Debtor List':          SB_BASE + 'dsm-patterns-factoringdebtorlist--docs',
    'Factoring Maturity Alerts':      SB_BASE + 'dsm-patterns-factoringmaturityalerts--docs',
    'Factoring Portfolio Report':     SB_BASE + 'dsm-patterns-factoringportfolioreport--docs',
    'Factoring Calculator':           SB_BASE + 'dsm-patterns-factoringcalculator--docs',
    'DataTableAdvanced':        SB_BASE + 'dsm-patterns-datatableadvanced--docs',
    'EmptyState':               SB_BASE + 'dsm-patterns-emptystate--docs',
    'LoadingStates':            SB_BASE + 'dsm-patterns-loadingstates--docs',
    'ApprovalFlow':             SB_BASE + 'dsm-patterns-approvalflow--docs',
    'Timeline':                 SB_BASE + 'dsm-patterns-timeline--docs',
    'DetailCard':               SB_BASE + 'dsm-patterns-detailcard--docs',
    'EditableTable':            SB_BASE + 'dsm-patterns-editabletable--docs',
    'RiskIndicator':            SB_BASE + 'dsm-patterns-riskindicator--docs',
    'MultiStepWizard':          SB_BASE + 'dsm-patterns-multistepwizard--docs',
    'AuditLog':                 SB_BASE + 'dsm-patterns-auditlog--docs',
    'BulkActionToolbar':        SB_BASE + 'dsm-patterns-bulkactiontoolbar--docs',
    'CreditScoreCard':          SB_BASE + 'dsm-patterns-creditscorecard--docs',
  };

  // Helper: assign Storybook description to any node
  function sbDesc(node) { if (SB[node.name]) try { node.description = '\uD83D\uDCD6 Storybook: ' + SB[node.name]; } catch(e) {} }

  // ── CESIONBNK Tokens — generated by scripts/build-tokens.js ──
  // DO NOT EDIT manually. Run: npm run build:tokens
  var C = {
  // [TOKENS:C:START]
    primary:       '#374151',       primaryFg:   '#ffffff',
    secondary:     '#796eff',     secondaryFg: '#ffffff',
    bg:            '#ffffff',
    fg:            '#3f3f46',
    card:          '#ffffff',         cardFg:      '#3f3f46',
    popover:       '#ffffff',      popoverFg:   '#3f3f46',
    muted:         '#f4f4f5',        mutedFg:     '#52525b',
    accent:        '#f4f4f5',       accentFg:    '#3f3f46',
    destructive:      '#ef4444',       destructiveFg:      '#ffffff',
    success:          '#22c55e',           successFg:          '#ffffff',
    warning:          '#f59e0b',           warningFg:          '#ffffff',
    caution:          '#f97316',           cautionFg:          '#ffffff',
    info:             '#3b82f6',              infoFg:             '#ffffff',
    successSubtle:    '#f0fdf4',
    destructiveSubtle:'#fef2f2',
    warningSubtle:    '#fef3c7',
    cautionSubtle:    '#fff7ed',
    infoSubtle:       '#eff6ff',
    secondarySubtle:  '#ede9fe',
    successOnSubtle:     '#15803d',
    destructiveOnSubtle: '#b91c1c',
    warningOnSubtle:     '#b45309',
    cautionOnSubtle:     '#c2410c',
    infoOnSubtle:        '#1d4ed8',
    secondaryOnSubtle:   '#7c3aed',
    border:           '#e4e4e7',
    input:            '#e4e4e7',
    ring:             '#374151',
    surface:          '#ffffff',      // alias for card
    switchBg:         '#cbced4',
    inputBg:          '#ffffff'
// [TOKENS:C:END]
  };
  var RAD = 10; // 0.625rem = 10px

  // ── Lucide SVG inner paths (24×24 viewBox, stroke only) ──
  var LU = {
    'arrow-down':'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    'arrow-left':'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-right':'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up':'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    'alert-circle':'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    'bell':'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'bookmark':'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    'calendar':'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    'check':'<path d="M20 6 9 17l-5-5"/>',
    'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    'chevron-left':'<path d="m15 18-6-6 6-6"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'chevron-up':'<path d="m18 15-6-6-6 6"/>',
    'circle':'<circle cx="12" cy="12" r="10"/>',
    'clipboard':'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    'clock':'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'copy':'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'edit':'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    'eye':'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off':'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    'file':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    'file-text':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
    'filter':'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    'folder':'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    'globe':'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'heart':'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'home':'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    'image':'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'link':'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'lock':'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    'mail':'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    'menu':'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    'minus':'<path d="M5 12h14"/>',
    'moon':'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'more-horizontal':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    'more-vertical':'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    'pencil':'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    'plus':'<path d="M5 12h14"/><path d="M12 5v14"/>',
    'refresh-cw':'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
    'search':'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'settings':'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'share':'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>',
    'shield':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    'star':'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    'trash-2':'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    'upload':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    'user':'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'x':'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'x-circle':'<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    'zap':'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    'hash':'<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
    'bold':'<path d="M6 12h9a4 4 0 0 1 0 8H6V4h8a4 4 0 0 1 0 8"/>',
    'italic':'<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>',
    'underline':'<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/>',
    'align-left':'<line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/>',
    'align-center':'<line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/>',
    'align-right':'<line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/>',
    'paperclip':'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    'list':'<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
    'table':'<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
    'grip-vertical':'<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
    'panel-left':'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
    'panel-right':'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
    'scroll':'<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>',
    'tags':'<path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8 18.414a2 2 0 0 0 2.828 0L17 12.243"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/>',
    'command':'<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
    'trending-up':'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'trending-down':'<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    'shield-check':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'check-square':'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    'bar-chart':'<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    'bar-chart-2':'<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
    'user-plus':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
    'file-plus':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M12 12v6"/>'
  };

  // ── Icon auto-categorization (scales to any number of icons) ──
  // Instead of maintaining a manual mapping, derive category from icon name patterns.
  // This works with 60 icons or 1500+ — just paste more paths into LU above.
  // To expand: node plugin/dsm-refactor/extract-lucide.js → paste icons into LU
  var CAT_RULES = [
    ['1-Navigation', /^(arrow|chevron|chevrons|move|navigation|compass|route|map)/],
    ['2-Status',     /^(alert|check|info|x-|x$|zap|shield|bell|activity|signal|gauge|thermometer|ban)/],
    ['3-Actions',    /^(plus|minus|edit|pencil|trash|copy|download|upload|filter|search|refresh|share|log-|link|unlink|save|send|reply|undo|redo|rotate|repeat|shuffle|crop|scan|delete|zoom|maximize|minimize|external|paperclip|pin|power|indent)/],
    ['4-Content',    /^(file|folder|clipboard|image|bookmark|book|library|receipt|tag|inbox|archive|database|package|box|layers)/],
    ['5-People',     /^(user|users|contact|message|phone|video|at-sign|mail|megaphone)/],
    ['6-Interface',  /^(home|settings|globe|menu|ellipsis|more-|calendar|clock|lock|unlock|eye|circle|square|triangle|star|heart|help|list|table|layout|panel|sidebar|columns|loader|toggle|slider|keyboard|qr|grip|hash)/],
    ['7-Devices',    /^(monitor|laptop|smartphone|tablet|tv|camera|mic|headphones|wifi|bluetooth|battery|printer|server|cloud|cast|radio)/],
    ['8-Media',      /^(play|pause|skip|volume|music|shuffle|repeat)/],
    ['9-Finance',    /^(dollar|credit|wallet|shopping|briefcase|building|trophy|award|gift|receipt|truck|percent)/],
    ['A-Editing',    /^(bold|italic|underline|type|align|code|terminal)/],
    ['B-Theme',      /^(sun|moon|sparkle|wind|air-vent|palette|accessibility)/],
    ['C-Dev',        /^(git-|rocket|puzzle|wrench|key)/],
  ];
  function iconCategory(name) {
    for (var r = 0; r < CAT_RULES.length; r++) {
      if (CAT_RULES[r][1].test(name)) return CAT_RULES[r][0];
    }
    return '6-Interface'; // default fallback
  }
  // Auto-generate keywords from icon name (split on hyphens + add category)
  function iconKeywords(name) {
    var cat = iconCategory(name);
    var catLabel = cat.replace(/^\w-/, '').toLowerCase();
    return name.replace(/-/g, ' ') + ' ' + catLabel;
  }

  // ══════════ HELPERS ══════════

  function hx(h) {
    var x = h.replace('#', '');
    return { r: parseInt(x.substring(0, 2), 16) / 255, g: parseInt(x.substring(2, 4), 16) / 255, b: parseInt(x.substring(4, 6), 16) / 255 };
  }
  function fill(n, h) { n.fills = [{ type: 'SOLID', color: hx(h) }]; }
  function noFill(n) { n.fills = []; }
  function stroke(n, h, w) { n.strokes = [{ type: 'SOLID', color: hx(h) }]; n.strokeWeight = w || 1; }
  function hexToRgb(h) { return hx(h); } // alias — some pattern blocks use hexToRgb instead of hx
  // Returns a light pastel background for a semantic color (replaces color+'22' / color+'15' hacks)
  function softBg(hex) {
    var h = hex.replace('#','').substring(0,6).toLowerCase();
    var map = {
      '374151':C.muted,'d1d5db':C.bg, // primary grays
      '796eff':C.secondarySubtle,                      // secondary purple
      'ef4444':C.destructiveSubtle,                      // destructive red
      '22c55e':C.successSubtle,'10b981':C.successSubtle,  // success greens
      'f59e0b':C.warningSubtle,'f97316':C.warningSubtle,  // warning ambers/orange
      '3b82f6':C.infoSubtle,                      // info blue
      '8b5cf6':C.secondarySubtle,                      // violet
      '6b7280':C.muted,'52525b':C.muted,  // muted grays
      'ffffff':C.bg,                      // white → background
    };
    return map[h] || C.muted;
  }
  function addShadow(n) { shadow(n, 4, 12, 0.08); } // alias — elevation-1 shadow shorthand
  function shadow(n, oy, bl, a) {
    n.effects = [{ type: 'DROP_SHADOW', blendMode: 'NORMAL', color: { r: 0, g: 0, b: 0, a: a || 0.1 }, offset: { x: 0, y: oy || 4 }, radius: bl || 12, spread: 0, visible: true }];
  }

  // Always load Inter first (guaranteed available in Figma)
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  // Try loading Gotham — each style independently so one failure doesn't block others
  var _gothamLoaded = 0;
  try { await figma.loadFontAsync({ family: 'Gotham', style: 'Book' });   _gothamLoaded++; } catch(e) {}
  try { await figma.loadFontAsync({ family: 'Gotham', style: 'Medium' }); _gothamLoaded++; } catch(e) {}
  try { await figma.loadFontAsync({ family: 'Gotham', style: 'Bold' });   _gothamLoaded++; } catch(e) {}
  var USE_GOTHAM = (_gothamLoaded === 3);
  console.log('[FONT] ' + (USE_GOTHAM ? 'Gotham loaded (Book/Medium/Bold)' : 'Inter fallback (' + _gothamLoaded + '/3 Gotham styles found)'));

  function tx(s, wt, sz, col) {
    var n = figma.createText();
    if (USE_GOTHAM) {
      var gs = (wt === 'Bold' || wt === 'SemiBold' || wt === 'Semi Bold') ? 'Bold' : wt === 'Medium' ? 'Medium' : 'Book';
      n.fontName = { family: 'Gotham', style: gs };
    } else {
      var is = (wt === 'SemiBold') ? 'Semi Bold' : (wt || 'Regular');
      n.fontName = { family: 'Inter', style: is };
    }
    n.characters = String(s);
    n.fontSize = sz || 14;
    fill(n, col || C.fg);
    return n;
  }
  function row(gap) {
    var f = figma.createFrame(); f.layoutMode = 'HORIZONTAL';
    f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
    f.itemSpacing = gap !== undefined ? gap : 8; noFill(f); return f;
  }
  function col(gap) {
    var f = figma.createFrame(); f.layoutMode = 'VERTICAL';
    f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
    f.itemSpacing = gap !== undefined ? gap : 8; noFill(f); return f;
  }
  function lucideSvg(inner, color) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + (color || C.fg) + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  var nSets = 0, nVars = 0;

  // ─── 2D Grid Layout System ────────────────────────────────────────────────
  // Places ComponentSets side-by-side (like standard Figma DSM libraries),
  // wrapping to the next row when the row exceeds maxW.
  var GRID = { page: null, x: 60, y: 200, rowH: 0, maxW: 1440, colGap: 48, rowGap: 88 };

  function gridInit(page, startY) {
    GRID.page = page; GRID.x = 60; GRID.y = startY || 200; GRID.rowH = 0;
  }

  function gridFlush() {
    if (GRID.x > 60) {
      GRID.y += GRID.rowH + GRID.rowGap;
      GRID.x = 60; GRID.rowH = 0;
    }
  }

  function gridSection(label) {
    gridFlush();
    GRID.y += 32;
  }

  function makeSet(name, comps, targetPage, x, y, onCS) {
    if (!comps.length) return GRID.y + GRID.rowH + GRID.rowGap;
    if (GRID.page !== targetPage) gridInit(targetPage, y || 200);

    // IMPORTANT: do NOT set figma.currentPage before combineAsVariants.
    // Components were created on figma.currentPage at creation time.
    // combineAsVariants must run on the same page they were created on,
    // then we move the result to targetPage with appendChild.
    var cs = figma.combineAsVariants(comps, figma.currentPage);
    targetPage.appendChild(cs); // move ComponentSet to target page
    cs.name = name;
    if (SB[name]) cs.description = '📖 Storybook: ' + SB[name];

    // Apply Auto Layout FIRST, then sizing
    cs.layoutMode = 'HORIZONTAL';
    cs.paddingLeft = cs.paddingRight = cs.paddingTop = cs.paddingBottom = 20;
    cs.itemSpacing = 16; cs.counterAxisSpacing = 16;
    cs.cornerRadius = 10; fill(cs, C.bg); stroke(cs, C.border);

    // Read natural width (all variants in one row) AFTER setting padding/spacing
    // but BEFORE applying wrap, so we have the raw per-variant estimate.
    var naturalW = cs.width;
    var avgVariantW = comps.length > 0 ? Math.round(naturalW / comps.length) : 180;

    if (naturalW <= 820) {
      // Small set: single row, auto-width — fits nicely on canvas
      cs.layoutWrap = 'NO_WRAP';
      cs.primaryAxisSizingMode = 'AUTO';
      cs.counterAxisSizingMode = 'AUTO';
    } else {
      // Large set: wrap into a compact square-ish grid
      cs.layoutWrap = 'WRAP';
      cs.primaryAxisSizingMode = 'FIXED';
      cs.counterAxisSizingMode = 'AUTO';
      var cols = Math.min(Math.max(Math.ceil(Math.sqrt(comps.length)), 3), 8);
      var wrapW = Math.min(Math.max(cols * (avgVariantW + 16) + 40, 400), 960);
      cs.resize(wrapW, cs.height); // keep auto-calculated height; only force width
    }

    // Grid placement: wrap to next canvas row if this set doesn't fit current row
    if (GRID.x > 60 && GRID.x + cs.width > GRID.maxW) {
      GRID.y += GRID.rowH + GRID.rowGap;
      GRID.x = 60; GRID.rowH = 0;
    }
    cs.x  = GRID.x; cs.y  = GRID.y;
    GRID.x += cs.width + GRID.colGap;
    GRID.rowH = Math.max(GRID.rowH, 22 + cs.height);

    nSets++; nVars += comps.length;
    console.log('  + ' + name + ' (' + comps.length + ' variants)');
    if (onCS) try { onCS(cs); } catch(e) { console.error('[WARN] makeSet onCS ' + name + ': ' + e.message); }
    return GRID.y + GRID.rowH + GRID.rowGap;
  }

  // ══════════════════════════════════════════════════════════════════════
  // CREATE PAGES
  // ════��═════════════════════════════════════════════════════════════════
  // Snapshot existing children on currentPage BEFORE building — used by cleanup
  var _preExistingIds = {};
  for (var _pi = 0; _pi < figma.currentPage.children.length; _pi++) {
    _preExistingIds[figma.currentPage.children[_pi].id] = true;
  }

  console.log('v8.0.0 — Creating pages...');
  var pCover  = figma.createPage(); pCover.name  = 'Cover';
  var p0      = figma.createPage(); p0.name      = 'Design System';
  var p1      = figma.createPage(); p1.name      = 'Primitives';
  var p2      = figma.createPage(); p2.name      = 'Components';
  var p3      = figma.createPage(); p3.name      = 'Patterns';
  var p5      = figma.createPage(); p5.name      = 'Advanced';
  var pIcons  = figma.createPage(); pIcons.name  = 'Icons';
  console.log('  7 pages created');

  // ══════════════════════════════════════════════════════════════════════
  // FIGMA VARIABLES — Design Token System (Light + Dark modes)
  // Creates a "CESIONBNK Tokens" Variable Collection visible in the
  // right panel → Variables. Groups: Color/Brand, Color/Semantic,
  // Color/Surface, Radius, Spacing, Typography
  // ══════════════════════════════════════════════════════════════════════
  // Dark mode counterparts — defined at top level so any try-block failure can't make it undefined
  // DO NOT EDIT manually. Run: npm run build:tokens
  var DARK = {
  // [TOKENS:DARK:START]
    primary:       '#9ca3af',       primaryFg:   '#09090b',
    secondary:     '#796eff',     secondaryFg: '#ffffff',
    bg:            '#09090b',
    fg:            '#fafafa',
    card:          '#18181b',         cardFg:      '#fafafa',
    popover:       '#27272a',      popoverFg:   '#fafafa',
    muted:         '#27272a',        mutedFg:     '#a1a1aa',
    accent:        '#27272a',       accentFg:    '#fafafa',
    destructive:      '#ef4444',       destructiveFg:      '#fafafa',
    success:          '#22c55e',           successFg:          '#052e16',
    warning:          '#f59e0b',           warningFg:          '#1c1917',
    caution:          '#f97316',           cautionFg:          '#1c1917',
    info:             '#3b82f6',              infoFg:             '#172554',
    successSubtle:    '#14532d',
    destructiveSubtle:'#7f1d1d',
    warningSubtle:    '#78350f',
    cautionSubtle:    '#7c2d12',
    infoSubtle:       '#1e3a8a',
    secondarySubtle:  '#3b0764',
    successOnSubtle:     '#4ade80',
    destructiveOnSubtle: '#f87171',
    warningOnSubtle:     '#fbbf24',
    cautionOnSubtle:     '#fb923c',
    infoOnSubtle:        '#93c5fd',
    secondaryOnSubtle:   '#c4b5fd',
    border:           '#3f3f46',
    input:            '#27272a',
    ring:             '#d1d5db',
    surface:          '#18181b',      // alias for card
    switchBg:         '#52525b',
    inputBg:          '#27272a'
// [TOKENS:DARK:END]
  };

  console.log('Creating Figma Variables...');
  var figmaVars = {}; // tokenName → Variable
  try {
    // Remove existing collection so re-runs produce a clean result (requires Async API)
    var _existingColls = await figma.variables.getLocalVariableCollectionsAsync();
    for (var _eci = 0; _eci < _existingColls.length; _eci++) {
      if (_existingColls[_eci].name === 'CESIONBNK Tokens') { _existingColls[_eci].remove(); break; }
    }
    var tokColl = figma.variables.createVariableCollection('CESIONBNK Tokens');
    var lightId = tokColl.modes[0].modeId;
    tokColl.renameMode(lightId, 'Light');
    var darkId = tokColl.addMode('Dark');

    function toRgba(h) {
      var x = h.replace('#', '');
      return { r: parseInt(x.substring(0,2),16)/255, g: parseInt(x.substring(2,4),16)/255, b: parseInt(x.substring(4,6),16)/255, a: 1 };
    }
    function mkColorVar(name, lightHex, darkHex) {
      var v = figma.variables.createVariable(name, tokColl, 'COLOR');
      v.setValueForMode(lightId, toRgba(lightHex));
      v.setValueForMode(darkId,  toRgba(darkHex));
      figmaVars[name] = v;
    }
    function mkFloatVar(name, val) {
      var v = figma.variables.createVariable(name, tokColl, 'FLOAT');
      v.setValueForMode(lightId, val);
      v.setValueForMode(darkId,  val);
      figmaVars[name] = v;
    }

    // ── Color / Brand ──
    mkColorVar('Color/Brand/Primary',      C.primary,     DARK.primary);
    mkColorVar('Color/Brand/Primary FG',   C.primaryFg,   DARK.primaryFg);
    mkColorVar('Color/Brand/Secondary',    C.secondary,   DARK.secondary);
    mkColorVar('Color/Brand/Secondary FG', C.secondaryFg, DARK.secondaryFg);
    mkColorVar('Color/Brand/Ring',         C.ring,        DARK.ring);

    // ── Color / Semantic ──
    mkColorVar('Color/Semantic/Destructive',    C.destructive,    DARK.destructive);
    mkColorVar('Color/Semantic/Destructive FG', C.destructiveFg,  DARK.destructiveFg);
    mkColorVar('Color/Semantic/Success',        C.success,        DARK.success);
    mkColorVar('Color/Semantic/Success FG',     C.successFg,      DARK.successFg);
    mkColorVar('Color/Semantic/Warning',        C.warning,        DARK.warning);
    mkColorVar('Color/Semantic/Warning FG',     C.warningFg,      DARK.warningFg);
    mkColorVar('Color/Semantic/Info',           C.info,           DARK.info);
    mkColorVar('Color/Semantic/Info FG',        C.infoFg,         DARK.infoFg);
    mkColorVar('Color/Semantic/Caution',        C.caution,        DARK.caution);
    mkColorVar('Color/Semantic/Caution FG',     C.cautionFg,      DARK.cautionFg);

    // ── Color / Surface ──
    mkColorVar('Color/Surface/Background', C.bg,       DARK.bg);
    mkColorVar('Color/Surface/Foreground', C.fg,       DARK.fg);
    mkColorVar('Color/Surface/Card',       C.card,     DARK.card);
    mkColorVar('Color/Surface/Card FG',    C.cardFg,   DARK.cardFg);
    mkColorVar('Color/Surface/Popover',    C.popover,  DARK.popover);
    mkColorVar('Color/Surface/Popover FG', C.popoverFg, DARK.popoverFg);
    mkColorVar('Color/Surface/Muted',      C.muted,    DARK.muted);
    mkColorVar('Color/Surface/Muted FG',   C.mutedFg,  DARK.mutedFg);
    mkColorVar('Color/Surface/Accent',     C.accent,   DARK.accent);
    mkColorVar('Color/Surface/Border',     C.border,   DARK.border);
    mkColorVar('Color/Surface/Input',      C.input,    DARK.input);

    // ── Color / Semantic Subtle ──
    mkColorVar('Color/Semantic/Success Subtle',          C.successSubtle,        DARK.successSubtle);
    mkColorVar('Color/Semantic/Destructive Subtle',      C.destructiveSubtle,    DARK.destructiveSubtle);
    mkColorVar('Color/Semantic/Warning Subtle',          C.warningSubtle,        DARK.warningSubtle);
    mkColorVar('Color/Semantic/Info Subtle',             C.infoSubtle,           DARK.infoSubtle);
    mkColorVar('Color/Semantic/Secondary Subtle',        C.secondarySubtle,      DARK.secondarySubtle);
    mkColorVar('Color/Semantic/Success On Subtle',       C.successOnSubtle,      DARK.successOnSubtle);
    mkColorVar('Color/Semantic/Destructive On Subtle',   C.destructiveOnSubtle,  DARK.destructiveOnSubtle);
    mkColorVar('Color/Semantic/Warning On Subtle',       C.warningOnSubtle,      DARK.warningOnSubtle);
    mkColorVar('Color/Semantic/Info On Subtle',          C.infoOnSubtle,         DARK.infoOnSubtle);
    mkColorVar('Color/Semantic/Caution Subtle',          C.cautionSubtle,        DARK.cautionSubtle);
    mkColorVar('Color/Semantic/Caution On Subtle',       C.cautionOnSubtle,      DARK.cautionOnSubtle);
    mkColorVar('Color/Semantic/Secondary On Subtle',     C.secondaryOnSubtle,    DARK.secondaryOnSubtle);

    // ── Color / UI ──
    mkColorVar('Color/UI/Switch BG',  C.switchBg, DARK.switchBg);
    mkColorVar('Color/UI/Input BG',   C.inputBg,  DARK.inputBg);

    // ── Radius ──
    mkFloatVar('Radius/sm',      6);
    mkFloatVar('Radius/Default', 10);
    mkFloatVar('Radius/lg',      12);
    mkFloatVar('Radius/xl',      16);
    mkFloatVar('Radius/2xl',     24);
    mkFloatVar('Radius/full',    9999);

    // ── Spacing ──
    var _sp = [[1,4],[2,8],[3,12],[4,16],[5,20],[6,24],[8,32],[10,40],[12,48],[16,64],[20,80],[24,96]];
    for (var _si = 0; _si < _sp.length; _si++) mkFloatVar('Spacing/' + _sp[_si][0], _sp[_si][1]);

    // ── Typography / Size ──
    var _ty = [['2xs',10],['xs',12],['sm',14],['base',16],['lg',18],['xl',20],['2xl',24],['3xl',32]];
    for (var _ti = 0; _ti < _ty.length; _ti++) mkFloatVar('Typography/Size/' + _ty[_ti][0], _ty[_ti][1]);

    console.log('[OK] Figma Variables — ' + Object.keys(figmaVars).length + ' tokens (Light + Dark modes)');
  } catch (e) { console.error('[FAIL] Figma Variables: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // ICON LIBRARY — Create Lucide icon Components FIRST
  // (Needed before Button so we can place instances for Instance Swap)
  // ══════════════════════════════════════════════════════════════════════
  console.log('Building Icon Components...');
  var iconComps = {}; // name → Component
  var iconNames = Object.keys(LU);

  // "None" icon — empty placeholder for Instance Swap defaults
  var noneIcon = figma.createComponent();
  noneIcon.name = 'Icon=0-none'; noneIcon.resize(24, 24); noFill(noneIcon);
  noneIcon.description = 'Empty icon slot — swap with any icon from the Lucide library.';
  // Auto-layout so the dashed rect adapts to any resize (sm=14, default=16, lg=18)
  noneIcon.layoutMode = 'HORIZONTAL';
  noneIcon.primaryAxisSizingMode = 'FIXED'; noneIcon.counterAxisSizingMode = 'FIXED';
  noneIcon.primaryAxisAlignItems = 'CENTER'; noneIcon.counterAxisAlignItems = 'CENTER';
  noneIcon.paddingLeft = noneIcon.paddingRight = noneIcon.paddingTop = noneIcon.paddingBottom = 3;
  var noRect = figma.createRectangle();
  noRect.cornerRadius = 3; noRect.fills = [];
  noRect.strokes = [{ type: 'SOLID', color: hx(C.border) }];
  noRect.strokeWeight = 1; noRect.dashPattern = [2, 2];
  noneIcon.appendChild(noRect);
  noRect.layoutSizingHorizontal = 'FILL';
  noRect.layoutSizingVertical = 'FILL';
  iconComps['none'] = noneIcon;
  // Move to Primitives page off-canvas so the final cleanup doesn't delete it
  // (noneIcon must persist as source component for Button/IconButton Instance Swap)
  p1.appendChild(noneIcon); noneIcon.x = -300; noneIcon.y = -300;

  for (var ii = 0; ii < iconNames.length; ii++) {
    var iName = iconNames[ii];
    // Build categorized variant name: "Icon=1-Navigation/arrow-down"
    var catPrefix = iconCategory(iName) + '/';
    var keywords = iconKeywords(iName);
    try {
      var svgNode = figma.createNodeFromSvg(lucideSvg(LU[iName]));
      var iComp = figma.createComponent();
      iComp.name = 'Icon=' + catPrefix + iName;
      iComp.description = keywords;
      iComp.resize(24, 24); noFill(iComp);
      var kids = [];
      for (var k = 0; k < svgNode.children.length; k++) kids.push(svgNode.children[k]);
      for (var k = 0; k < kids.length; k++) iComp.appendChild(kids[k]);
      svgNode.remove();
      iconComps[iName] = iComp;
    } catch (e) {
      // Fallback: text-based icon
      var iComp2 = figma.createComponent();
      iComp2.name = 'Icon=' + catPrefix + iName; iComp2.resize(24, 24);
      iComp2.description = keywords;
      iComp2.layoutMode = 'HORIZONTAL';
      iComp2.primaryAxisAlignItems = 'CENTER'; iComp2.counterAxisAlignItems = 'CENTER';
      noFill(iComp2);
      iComp2.appendChild(tx(iName.substring(0, 2).toUpperCase(), 'Medium', 10, C.mutedFg));
      iconComps[iName] = iComp2;
    }
  }

  // Icon ComponentSet removed — designer uses their own Lucide library via Instance Swap

  // Helper to get an icon instance (16×16 for button context)
  // Strategy: detach instance → tint each geometry node individually (no flatten)
  // This preserves SVG path quality while allowing per-instance color overrides
  function iconInst(name, color, size) {
    var comp = iconComps[name] || noneIcon;
    var inst = comp.createInstance();
    var s = size || 16;
    inst.resize(s, s);
    if (color) {
      var rgb = hx(color);
      try {
        // Detach so we can manipulate children directly
        var frame = inst.detachInstance();
        // Tint ALL geometry nodes recursively — NO flatten (preserves SVG path quality)
        function tintGeo(n) {
          var t = n.type;
          if (t === 'VECTOR' || t === 'BOOLEAN_OPERATION' || t === 'LINE' ||
              t === 'ELLIPSE' || t === 'RECTANGLE' || t === 'POLYGON' || t === 'STAR') {
            try {
              n.strokes = [{ type: 'SOLID', color: rgb }];
              n.fills = [];
            } catch (e2) {}
          }
          if ('children' in n) {
            for (var ci = 0; ci < n.children.length; ci++) tintGeo(n.children[ci]);
          }
        }
        tintGeo(frame);
        return frame;
      } catch (e) {
        // If detach fails, tint on the instance directly
        function tintInst(node) {
          var t = node.type;
          if (t === 'VECTOR' || t === 'BOOLEAN_OPERATION' || t === 'LINE' ||
              t === 'ELLIPSE' || t === 'RECTANGLE' || t === 'POLYGON' || t === 'STAR') {
            try { node.strokes = [{ type: 'SOLID', color: rgb }]; node.fills = []; } catch (e3) {}
          }
          if ('children' in node) {
            for (var ci = 0; ci < node.children.length; ci++) tintInst(node.children[ci]);
          }
        }
        tintInst(inst);
      }
    }
    return inst;
  }

  // Convenience wrapper: same as iconInst but with (name, size, color) argument order
  // (used in pattern blocks where size comes before color for readability)
  function iconNode(name, size, color) { return iconInst(name, color, size); }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 0: FOUNDATIONS
  // ═��════════════════════════════════════════════════════════════════════
  try {
    console.log('Building Design System...');
    var fRoot = col(40);
    fRoot.name = 'Design System'; fRoot.paddingLeft = fRoot.paddingRight = 60;
    fRoot.paddingTop = fRoot.paddingBottom = 60; fill(fRoot, C.bg);

    fRoot.appendChild(tx('DESIGN SYSTEM', 'Bold', 48, C.fg));
    fRoot.appendChild(tx('Brand · Design Tokens · Typography · Color Palette · Spacing — CESIONBNK', 'Regular', 16, C.mutedFg));

    // ── Design Tokens / Variables Reference ──
    fRoot.appendChild(tx('Design Tokens', 'Bold', 24, C.fg));
    fRoot.appendChild(tx('50 tokens · CESIONBNK Tokens collection · 2 modes: Light / Dark', 'Regular', 14, C.mutedFg));
    var tokRefGroups = [
      { label: 'Color / Brand',    items: [
        { name: 'Color/Brand/Primary',      light: C.primary,     dark: C.mutedFg },
        { name: 'Color/Brand/Secondary',    light: C.secondary,   dark: C.secondary },
        { name: 'Color/Brand/Ring',         light: C.ring,        dark: C.mutedFg },
      ]},
      { label: 'Color / Semantic', items: [
        { name: 'Color/Semantic/Destructive', light: C.destructive, dark: C.destructive },
        { name: 'Color/Semantic/Success',     light: C.success,     dark: C.success },
        { name: 'Color/Semantic/Warning',     light: C.warning,     dark: C.warning },
        { name: 'Color/Semantic/Info',        light: C.info,        dark: C.info },
      ]},
      { label: 'Color / Surface',  items: [
        { name: 'Color/Surface/Background', light: C.bg,      dark: DARK.bg },
        { name: 'Color/Surface/Foreground', light: C.fg,      dark: C.bg },
        { name: 'Color/Surface/Card',       light: C.card,    dark: DARK.card },
        { name: 'Color/Surface/Muted',      light: C.muted,   dark: DARK.muted },
        { name: 'Color/Surface/Muted FG',   light: C.mutedFg, dark: DARK.mutedFg },
        { name: 'Color/Surface/Border',     light: C.border,  dark: DARK.border },
      ]},
    ];
    var tokRefWrap = row(32); tokRefWrap.counterAxisAlignItems = 'MIN';
    for (var trg = 0; trg < tokRefGroups.length; trg++) {
      var tgrp = tokRefGroups[trg];
      var tCol = col(0); tCol.paddingLeft = tCol.paddingRight = tCol.paddingTop = tCol.paddingBottom = 16;
      tCol.cornerRadius = 8; fill(tCol, C.bg); stroke(tCol, C.border);
      // Group header
      var tHdr = row(8); tHdr.counterAxisAlignItems = 'CENTER';
      var tHdrBadge = figma.createFrame();
      tHdrBadge.resize(6, 6); tHdrBadge.cornerRadius = 3; fill(tHdrBadge, C.secondary);
      tHdr.appendChild(tHdrBadge);
      tHdr.appendChild(tx(tgrp.label, 'Bold', 11, C.fg));
      tCol.appendChild(tHdr);
      // Separator
      var tSep = figma.createFrame(); tSep.resize(220, 1); fill(tSep, C.border);
      tCol.appendChild(tSep);
      // Token rows
      for (var tri = 0; tri < tgrp.items.length; tri++) {
        var tok = tgrp.items[tri];
        var tRow = row(8); tRow.counterAxisAlignItems = 'CENTER'; tRow.paddingTop = 4;
        // Light swatch
        var lsw = figma.createFrame(); lsw.resize(16, 16); lsw.cornerRadius = 3;
        fill(lsw, tok.light);
        if (tok.light === C.primaryFg || tok.light === C.muted) stroke(lsw, C.border);
        // Dark swatch
        var dsw = figma.createFrame(); dsw.resize(16, 16); dsw.cornerRadius = 3;
        fill(dsw, tok.dark);
        if (tok.dark === C.bg) stroke(dsw, C.border);
        // Name (last segment only for brevity)
        var shortName = tok.name.split('/').slice(-1)[0];
        var tName = tx(shortName, 'Regular', 11, C.fg);
        var tVals = tx(tok.light + '  /  ' + tok.dark, 'Regular', 9, C.mutedFg);
        var tInfo = col(2);
        tInfo.appendChild(tName); tInfo.appendChild(tVals);
        tRow.appendChild(lsw); tRow.appendChild(dsw); tRow.appendChild(tInfo);
        tCol.appendChild(tRow);
      }
      tokRefWrap.appendChild(tCol);
    }
    fRoot.appendChild(tokRefWrap);

    // Brand
    fRoot.appendChild(tx('Brand Colors', 'Bold', 24, C.fg));
    var bRow = row(16);
    var brands = [['Primary', C.primary], ['Secondary', C.secondary], ['Ring', C.ring]];
    for (var i = 0; i < brands.length; i++) {
      var bc = col(6);
      var bsw = figma.createFrame(); bsw.resize(120, 80); fill(bsw, brands[i][1]); bsw.cornerRadius = RAD;
      bc.appendChild(bsw); bc.appendChild(tx(brands[i][0], 'Medium', 13, C.fg)); bc.appendChild(tx(brands[i][1], 'Regular', 12, C.mutedFg));
      bRow.appendChild(bc);
    }
    fRoot.appendChild(bRow);

    // Semantic
    fRoot.appendChild(tx('Semantic Colors', 'Bold', 24, C.fg));
    var sRow = row(16);
    var sems = [['Destructive', C.destructive], ['Success', C.success], ['Warning', C.warning], ['Info', C.info]];
    for (var i = 0; i < sems.length; i++) {
      var sc = col(6);
      var ssw = figma.createFrame(); ssw.resize(120, 80); fill(ssw, sems[i][1]); ssw.cornerRadius = RAD;
      sc.appendChild(ssw); sc.appendChild(tx(sems[i][0], 'Medium', 13, C.fg)); sc.appendChild(tx(sems[i][1], 'Regular', 12, C.mutedFg));
      sRow.appendChild(sc);
    }
    fRoot.appendChild(sRow);

    // ── Tailwind Color Palettes ──
    fRoot.appendChild(tx('Tailwind Color Palettes', 'Bold', 24, C.fg));
    fRoot.appendChild(tx('Complete color system — all shades from 50 to 950', 'Regular', 14, C.mutedFg));
    var TW = {
      'slate':   ['#f8fafc',C.muted,'#e2e8f0','#cbd5e1',C.mutedFg,'#64748b','#475569','#334155','#1e293b','#0f172a','#020617'],
      'gray':    [C.bg,C.muted,C.border,C.mutedFg,C.mutedFg,C.mutedFg,C.fg,C.primary,'#1f2937','#111827','#030712'],
      'zinc':    [C.bg,C.muted,C.border,'#d4d4d8','#a1a1aa','#71717a','#52525b','#3f3f46','#27272a','#18181b','#09090b'],
      'neutral': [C.bg,C.muted,'#e5e5e5','#d4d4d4','#a3a3a3','#737373','#525252','#404040','#262626','#171717','#0a0a0a'],
      'stone':   ['#fafaf9','#f5f5f4','#e7e5e4','#d6d3d1','#a8a29e','#78716c','#57534e','#44403c','#292524','#1c1917','#0c0a09'],
      'red':     [C.destructiveSubtle,C.destructiveSubtle,C.destructiveSubtle,C.destructiveOnSubtle,'#f87171',C.destructive,'#dc2626',C.destructive,'#991b1b','#7f1d1d','#450a0a'],
      'orange':  ['#fff7ed',C.warningSubtle,'#fed7aa','#fdba74','#fb923c',C.warning,'#ea580c','#c2410c','#9a3412','#7c2d12','#431407'],
      'amber':   [C.warningSubtle,C.warningSubtle,'#fde68a',C.warningOnSubtle,'#fbbf24',C.warning,'#d97706',C.warningOnSubtle,C.warning,'#78350f','#451a03'],
      'yellow':  ['#fefce8',C.warningSubtle,'#fef08a','#fde047','#facc15','#eab308','#ca8a04',C.warning,'#854d0e','#713f12','#422006'],
      'lime':    ['#f7fee7','#ecfccb','#d9f99d','#bef264','#a3e635','#84cc16','#65a30d','#4d7c0f','#3f6212','#365314','#1a2e05'],
      'green':   [C.successSubtle,C.successSubtle,'#bbf7d0',C.successOnSubtle,'#4ade80',C.success,C.success,C.successOnSubtle,'#166534','#14532d','#052e16'],
      'emerald': ['#ecfdf5',C.successSubtle,'#a7f3d0','#6ee7b7','#34d399',C.success,C.successOnSubtle,'#047857','#065f46','#064e3b','#022c22'],
      'teal':    ['#f0fdfa','#ccfbf1','#99f6e4','#5eead4','#2dd4bf','#14b8a6','#0d9488','#0f766e','#115e59','#134e4a','#042f2e'],
      'cyan':    ['#ecfeff','#cffafe','#a5f3fc','#67e8f9','#22d3ee','#06b6d4','#0891b2','#0e7490','#155e75','#164e63','#083344'],
      'sky':     [C.infoSubtle,'#e0f2fe','#bae6fd','#7dd3fc','#38bdf8','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'],
      'blue':    [C.infoSubtle,C.infoSubtle,'#bfdbfe',C.info,'#60a5fa',C.info,'#2563eb',C.info,'#1e40af','#1e3a8a','#172554'],
      'indigo':  ['#eef2ff','#e0e7ff','#c7d2fe','#a5b4fc','#818cf8',C.secondary,'#4f46e5','#4338ca','#3730a3','#312e81','#1e1b4b'],
      'violet':  ['#f5f3ff',C.secondarySubtle,'#ddd6fe','#c4b5fd','#a78bfa',C.secondaryOnSubtle,C.secondary,'#6d28d9','#5b21b6','#4c1d95','#2e1065'],
      'purple':  ['#faf5ff','#f3e8ff','#e9d5ff','#d8b4fe','#c084fc','#a855f7','#9333ea','#7e22ce','#6b21a8','#581c87','#3b0764'],
      'fuchsia': ['#fdf4ff','#fae8ff','#f5d0fe','#f0abfc','#e879f9','#d946ef','#c026d3','#a21caf','#86198f','#701a75','#4a044e'],
      'pink':    ['#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9d174d','#831843','#500724'],
      'rose':    ['#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337','#4c0519']
    };
    var twShades = ['50','100','200','300','400','500','600','700','800','900','950'];
    var twNames = Object.keys(TW);
    for (var ti = 0; ti < twNames.length; ti++) {
      var twName = twNames[ti];
      var twPal = TW[twName];
      var palRow = row(4);
      var palLbl = tx(twName, 'Medium', 12, C.fg); palLbl.resize(64, 18); palRow.appendChild(palLbl);
      for (var si = 0; si < twPal.length; si++) {
        var swCol = col(2); swCol.counterAxisAlignItems = 'CENTER';
        var sw = figma.createFrame(); sw.resize(48, 32); fill(sw, twPal[si]); sw.cornerRadius = 4;
        if (si < 2) stroke(sw, C.border);
        swCol.appendChild(sw);
        swCol.appendChild(tx(twShades[si], 'Regular', 8, C.mutedFg));
        palRow.appendChild(swCol);
      }
      fRoot.appendChild(palRow);
    }

    // Neutral / Surfaces
    fRoot.appendChild(tx('Surfaces & Neutral', 'Bold', 24, C.fg));
    var nRow = row(16);
    var neus = [['Background', C.bg], ['Foreground', C.fg], ['Card', C.card], ['Muted', C.muted], ['Muted FG', C.mutedFg], ['Border', C.border], ['Input', C.input]];
    for (var i = 0; i < neus.length; i++) {
      var nc = col(6);
      var nsw = figma.createFrame(); nsw.resize(100, 64); fill(nsw, neus[i][1]); nsw.cornerRadius = RAD;
      if (neus[i][1] === C.primaryFg || neus[i][1] === C.muted) stroke(nsw, C.border);
      nc.appendChild(nsw); nc.appendChild(tx(neus[i][0], 'Medium', 11, C.fg)); nc.appendChild(tx(neus[i][1], 'Regular', 10, C.mutedFg));
      nRow.appendChild(nc);
    }
    fRoot.appendChild(nRow);

    // Radius
    fRoot.appendChild(tx('Border Radius — 0.625rem (10px) all tenants', 'Bold', 24, C.fg));
    var rRow = row(24);
    var radii = [['sm', 6], ['DEFAULT', 10], ['lg', 12], ['xl', 16], ['2xl', 24]];
    for (var i = 0; i < radii.length; i++) {
      var rc = col(6); rc.counterAxisAlignItems = 'CENTER';
      var rsw = figma.createFrame(); rsw.resize(56, 56); noFill(rsw); stroke(rsw, C.primary, 2); rsw.cornerRadius = radii[i][1];
      rc.appendChild(rsw); rc.appendChild(tx(radii[i][0], 'Medium', 13, C.fg)); rc.appendChild(tx(radii[i][1] + 'px', 'Regular', 12, C.mutedFg));
      rRow.appendChild(rc);
    }
    fRoot.appendChild(rRow);

    // Typography
    fRoot.appendChild(tx('Typography Scale (font-sans: Gotham → Inter fallback)', 'Bold', 24, C.fg));
    var typos = [['xs', 12], ['sm', 14], ['base', 16], ['lg', 18], ['xl', 20], ['2xl', 24], ['3xl', 32]];
    for (var i = 0; i < typos.length; i++) {
      var tyRow = row(16); tyRow.counterAxisAlignItems = 'CENTER';
      var tyLbl = tx('text-' + typos[i][0] + ' (' + typos[i][1] + 'px)', 'Regular', 12, C.mutedFg); tyLbl.resize(160, 16); tyRow.appendChild(tyLbl);
      tyRow.appendChild(tx('The quick brown fox jumps over the lazy dog', 'Regular', typos[i][1], C.fg));
      fRoot.appendChild(tyRow);
    }

    // Spacing
    fRoot.appendChild(tx('Spacing Scale', 'Bold', 24, C.fg));
    var spaces = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
    for (var i = 0; i < spaces.length; i++) {
      var spRow = row(12); spRow.counterAxisAlignItems = 'CENTER';
      var spLbl = tx(spaces[i] + 'px', 'Regular', 12, C.mutedFg); spLbl.resize(48, 16); spRow.appendChild(spLbl);
      var spBar = figma.createFrame(); spBar.resize(Math.max(spaces[i] * 2, 8), 14); fill(spBar, C.primary); spBar.cornerRadius = 3; spRow.appendChild(spBar);
      fRoot.appendChild(spRow);
    }

    // Elevations
    fRoot.appendChild(tx('Elevations (shadow-elevation-1..4)', 'Bold', 24, C.fg));
    var eRow = row(24);
    var elvs = [['1', 1, 2, 0.05], ['2', 4, 6, 0.1], ['3', 10, 15, 0.1], ['4', 20, 25, 0.1]];
    for (var i = 0; i < elvs.length; i++) {
      var ec = col(8); ec.counterAxisAlignItems = 'CENTER';
      var esw = figma.createFrame(); esw.resize(80, 56); fill(esw, C.bg); esw.cornerRadius = RAD; shadow(esw, elvs[i][1], elvs[i][2], elvs[i][3]);
      ec.appendChild(esw); ec.appendChild(tx('elevation-' + elvs[i][0], 'Medium', 12, C.fg));
      eRow.appendChild(ec);
    }
    fRoot.appendChild(eRow);

    p0.appendChild(fRoot);
    console.log('[OK] Foundations');
  } catch (e) { console.error('[FAIL] Foundations: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 1: PRIMITIVES
  // ══════════════════════════════════════════════════════════════════════
  try {
    var title1 = tx('PRIMITIVES', 'Bold', 48, C.fg);
    p1.appendChild(title1); title1.x = 60; title1.y = 60;
    var sub1 = tx('Actions · Forms — Core interactive elements · CESIONBNK theme', 'Regular', 16, C.mutedFg);
    p1.appendChild(sub1); sub1.x = 60; sub1.y = 120;
    var y1 = 160;
    gridInit(p1, 160);
  } catch (e) { console.error('[FAIL] Primitives title: ' + e.message); var y1 = 160; gridInit(p1, 160); }

  // ── Shared button state helper (used by Button AND IconButton) ──
  var bvars   = ['default', 'secondary', 'outline', 'ghost', 'destructive'];
  var bszs    = ['sm', 'default', 'lg'];
  var bsts    = ['Default', 'Hover', 'Disabled'];
  var bshapes = ['default', 'pill'];
  var bcm = {
    'default':     [C.primary,     C.primaryFg,     null],
    'secondary':   [C.secondary,   C.secondaryFg,   null],
    'outline':     [null,          C.fg,            C.border],
    'ghost':       [null,          C.fg,            null],
    'destructive': [C.destructive, C.destructiveFg, null]
  };

  function applyBtnState(node, state, bgHex, hasFill) {
    if (state === 'Disabled') { node.opacity = 0.45; }
    else if (state === 'Hover') {
      node.fills = hasFill
        ? [{ type: 'SOLID', color: hx(bgHex), opacity: 0.82 }]
        : [{ type: 'SOLID', color: hx(C.muted) }];
    }
  }

  // ── Button (5 styles × 3 sizes × 3 states × 2 shapes = 90 variants) ──
  // Icon-only is a SEPARATE component: IconButton (see below).
  // Boolean properties are added to the ComponentSet AFTER combineAsVariants,
  // then rebound to every variant's icon nodes in one pass.
  try {
    var btns = [];
    var btnIconNodes = []; // [{icoL, icoR}] — one entry per variant, same order as btns

    for (var vi = 0; vi < bvars.length; vi++) {
      var bcc = bcm[bvars[vi]];
      for (var si = 0; si < bszs.length; si++) {
        var bh     = bszs[si] === 'sm' ? 32 : (bszs[si] === 'lg' ? 44 : 36);
        var bPad   = bszs[si] === 'sm' ? 12 : (bszs[si] === 'lg' ? 24 : 16);
        var bFsz   = bszs[si] === 'sm' ? 13 : (bszs[si] === 'lg' ? 16 : 14);
        var bIsz   = bszs[si] === 'sm' ? 14 : (bszs[si] === 'lg' ? 18 : 16);

        for (var ti = 0; ti < bsts.length; ti++) {
          for (var shi = 0; shi < bshapes.length; shi++) {
            var b = figma.createComponent();
            b.name = 'Variant=' + bvars[vi] + ', Size=' + bszs[si]
                   + ', State=' + bsts[ti] + ', Shape=' + bshapes[shi];
            b.layoutMode = 'HORIZONTAL';
            b.primaryAxisSizingMode = 'AUTO'; b.counterAxisSizingMode = 'FIXED';
            b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER';
            b.resize(120, bh);
            b.itemSpacing = 6;
            b.paddingLeft = b.paddingRight = bPad;
            b.cornerRadius = bshapes[shi] === 'pill' ? 999 : RAD;
            if (bcc[0]) fill(b, bcc[0]); else noFill(b);
            if (bcc[2]) stroke(b, bcc[2]);
            applyBtnState(b, bsts[ti], bcc[0], !!bcc[0]);

            // ── Left icon: empty slot — designer swaps with real Lucide library (fill-based) ──
            var icoL = noneIcon.createInstance();
            icoL.name = 'iconLeft'; icoL.resize(bIsz, bIsz);
            icoL.visible = false;
            b.appendChild(icoL);

            // ── Label ──
            var bLabel = tx('Button', 'Medium', bFsz, bcc[1]);
            bLabel.name = 'label';
            b.appendChild(bLabel);

            // ── Right icon: empty slot — designer swaps with real Lucide library (fill-based) ──
            var icoR = noneIcon.createInstance();
            icoR.name = 'iconRight'; icoR.resize(bIsz, bIsz);
            icoR.visible = false;
            b.appendChild(icoR);

            btnIconNodes.push({ icoL: icoL, icoR: icoR });
            btns.push(b);
          }
        }
      }
    }

    y1 = makeSet('Button', btns, p1, 60, y1, function(cs) {
      // ── Boolean visibility properties (always safe) ──
      var bShowL = cs.addComponentProperty('Icon left',  'BOOLEAN', false);
      var bShowR = cs.addComponentProperty('Icon right', 'BOOLEAN', false);

      // ── INSTANCE_SWAP: wrapped individually — local component keys may not be accepted ──
      var bSwapL = null, bSwapR = null;
      try { bSwapL = cs.addComponentProperty('Left icon',  'INSTANCE_SWAP', noneIcon.key); }
      catch(e) { console.warn('[BTN] INSTANCE_SWAP Left icon skipped: ' + e.message); }
      try { bSwapR = cs.addComponentProperty('Right icon', 'INSTANCE_SWAP', noneIcon.key); }
      catch(e) { console.warn('[BTN] INSTANCE_SWAP Right icon skipped: ' + e.message); }

      // ── Bind references to every variant's icon instances ──
      var refOk = 0, refFail = 0;
      btnIconNodes.forEach(function(pair) {
        var refsL = { visible: bShowL }; if (bSwapL) refsL.mainComponent = bSwapL;
        var refsR = { visible: bShowR }; if (bSwapR) refsR.mainComponent = bSwapR;
        try { pair.icoL.componentPropertyReferences = refsL; refOk++; } catch(e) { refFail++; console.error('[BTN] icoL ref: ' + e.message); }
        try { pair.icoR.componentPropertyReferences = refsR; refOk++; } catch(e) { refFail++; console.error('[BTN] icoR ref: ' + e.message); }
      });
      console.log('[BTN] INSTANCE_SWAP L:' + (bSwapL ? 'ok' : 'skip') + ' R:' + (bSwapR ? 'ok' : 'skip') + ' | refs ok:' + refOk + ' fail:' + refFail);
    });

    console.log('[OK] Button (' + btns.length + ' variants: 5 styles × 3 sizes × 3 states × 2 shapes)');
  } catch (e) { console.error('[FAIL] Button: ' + e.message); y1 += 60; }

  // ── IconButton (5 styles × 2 shapes × 3 states = 30 variants) — separate from Button ──
  // Size is always square (sm=28, default=36, lg=44); no label; single icon via Instance Swap.
  try {
    var ibts = [];
    var ibszs = [['sm', 28, 16], ['default', 36, 18], ['lg', 44, 20]];
    var ibShapes = ['default', 'pill'];
    for (var ibvi = 0; ibvi < bvars.length; ibvi++) {
      var ibcc = bcm[bvars[ibvi]];
      for (var ibshi = 0; ibshi < ibShapes.length; ibshi++) {
        for (var ibsi = 0; ibsi < ibszs.length; ibsi++) {
          for (var ibti = 0; ibti < bsts.length; ibti++) {
            var ibt = figma.createComponent();
            var ibSz = ibszs[ibsi][1];
            ibt.name = 'Variant=' + bvars[ibvi] + ', Size=' + ibszs[ibsi][0]
                     + ', Shape=' + ibShapes[ibshi] + ', State=' + bsts[ibti];
            ibt.layoutMode = 'HORIZONTAL'; ibt.resize(ibSz, ibSz);
            ibt.primaryAxisSizingMode = 'FIXED'; ibt.counterAxisSizingMode = 'FIXED';
            ibt.primaryAxisAlignItems = 'CENTER'; ibt.counterAxisAlignItems = 'CENTER';
            ibt.cornerRadius = ibShapes[ibshi] === 'pill' ? 999 : RAD;
            if (ibcc[0]) fill(ibt, ibcc[0]); else noFill(ibt);
            if (ibcc[2]) stroke(ibt, ibcc[2]);
            applyBtnState(ibt, bsts[ibti], ibcc[0], !!ibcc[0]);
            var ibIco = noneIcon.createInstance();
            ibIco.name = 'icon'; ibIco.resize(ibszs[ibsi][2], ibszs[ibsi][2]);
            ibt.appendChild(ibIco);
            try {
              var ibSwapKey = ibt.addComponentProperty('Icon', 'INSTANCE_SWAP', noneIcon.key);
              ibIco.componentPropertyReferences = { mainComponent: ibSwapKey };
            } catch(e) {}
            ibts.push(ibt);
          }
        }
      }
    }
    y1 = makeSet('IconButton', ibts, p1, 60, y1);
    console.log('[OK] IconButton (' + ibts.length + ' variants: 5 styles × 2 shapes × 3 sizes × 3 states)');
  } catch (e) { console.error('[FAIL] IconButton: ' + e.message); y1 += 60; }

  gridSection('Form Inputs');
  // ── Input (3 sizes × 4 states × 4 icon configs = 48 variants) ──
  try {
    var inps = [];
    var iszs = ['sm', 'default', 'lg'];
    var ists = ['Default', 'Focus', 'Error', 'Disabled'];
    var iicons = ['none', 'left', 'right', 'both'];
    var iDefIconL = 'search';
    var iDefIconR = 'x';
    for (var i = 0; i < iszs.length; i++) {
      for (var j = 0; j < ists.length; j++) {
        for (var ik = 0; ik < iicons.length; ik++) {
          var inp = figma.createComponent();
          inp.name = 'Size=' + iszs[i] + ', State=' + ists[j] + ', Icons=' + iicons[ik];
          var ih = iszs[i] === 'sm' ? 32 : (iszs[i] === 'lg' ? 44 : 36);
          inp.layoutMode = 'HORIZONTAL'; inp.resize(260, ih);
          inp.primaryAxisSizingMode = 'FIXED'; inp.counterAxisSizingMode = 'FIXED';
          inp.paddingLeft = inp.paddingRight = 12; inp.counterAxisAlignItems = 'CENTER';
          inp.itemSpacing = 8;
          fill(inp, C.bg); inp.cornerRadius = RAD;
          if (ists[j] === 'Focus') stroke(inp, C.ring, 2);
          else if (ists[j] === 'Error') stroke(inp, C.destructive);
          else stroke(inp, C.input);
          if (ists[j] === 'Disabled') inp.opacity = 0.5;
          var iIconSz = iszs[i] === 'sm' ? 14 : (iszs[i] === 'lg' ? 18 : 16);
          // iconLeft — visible & swappable when Icons=left or Icons=both
          if (iicons[ik] === 'left' || iicons[ik] === 'both') {
            var inpIcoL = iconInst(iDefIconL, C.mutedFg, iIconSz); inpIcoL.name = 'iconLeft'; inp.appendChild(inpIcoL);
          }
          // Placeholder text (fills remaining space)
          var placeholderTx = tx('Placeholder', 'Regular', 14, C.mutedFg);
          inp.appendChild(placeholderTx); placeholderTx.layoutGrow = 1;
          // iconRight — visible & swappable when Icons=right or Icons=both
          if (iicons[ik] === 'right' || iicons[ik] === 'both') {
            var inpIcoR = iconInst(iDefIconR, C.mutedFg, iIconSz); inpIcoR.name = 'iconRight'; inp.appendChild(inpIcoR);
          }
          inps.push(inp);
        }
      }
    }
    y1 = makeSet('Input', inps, p1, 60, y1);
    console.log('[OK] Input (' + inps.length + ' variants: 3 sizes, 4 states, 4 icon configs)');
  } catch (e) { console.error('[FAIL] Input: ' + e.message); y1 += 60; }

  // ── InputField (Label + Input + HelperText — Size × State × Icons × Label) ──
  try {
    var iflds = [];
    var ifSizes  = ['sm', 'default', 'lg'];
    var ifStates = ['Default', 'Focus', 'Error', 'Disabled'];
    var ifIcons  = ['none', 'left', 'right', 'both'];
    var ifLabels = [true, false];

    for (var ifSi = 0; ifSi < ifSizes.length; ifSi++) {
      var ifSize = ifSizes[ifSi];
      var ifH    = ifSize === 'sm' ? 32 : (ifSize === 'lg' ? 44 : 36);
      var ifFs   = ifSize === 'sm' ? 12 : (ifSize === 'lg' ? 16 : 14);
      var ifIcoSz= ifSize === 'sm' ? 14 : (ifSize === 'lg' ? 18 : 16);

      for (var ifSti = 0; ifSti < ifStates.length; ifSti++) {
        var ifState = ifStates[ifSti];

        for (var ifIi = 0; ifIi < ifIcons.length; ifIi++) {
          var ifIcon = ifIcons[ifIi];

          for (var ifLi = 0; ifLi < ifLabels.length; ifLi++) {
            var ifHasLabel = ifLabels[ifLi];

            var ifComp = figma.createComponent();
            ifComp.name = 'Size=' + ifSize + ', State=' + ifState + ', Icons=' + ifIcon + ', Label=' + (ifHasLabel ? 'true' : 'false');
            ifComp.layoutMode = 'VERTICAL';
            ifComp.primaryAxisSizingMode = 'AUTO';
            ifComp.counterAxisSizingMode = 'AUTO';
            ifComp.itemSpacing = 6;
            ifComp.counterAxisAlignItems = 'MIN';
            noFill(ifComp);

            // ── Label ──
            if (ifHasLabel) {
              var ifLabelRow = row(4);
              ifLabelRow.primaryAxisSizingMode = 'AUTO';
              ifLabelRow.counterAxisSizingMode = 'AUTO';
              ifLabelRow.counterAxisAlignItems = 'CENTER';
              noFill(ifLabelRow);
              var ifLabelTx = tx('Label', 'Medium', ifFs, C.fg);
              ifLabelRow.appendChild(ifLabelTx);
              // asterisco requerido
              var ifReqTx = tx('*', 'Medium', ifFs, C.destructive);
              ifLabelRow.appendChild(ifReqTx);
              ifComp.appendChild(ifLabelRow);
            }

            // ── Campo input ──
            var ifField = figma.createFrame();
            ifField.layoutMode = 'HORIZONTAL';
            ifField.primaryAxisSizingMode = 'FIXED';
            ifField.counterAxisSizingMode = 'FIXED';
            ifField.resize(260, ifH);
            ifField.paddingLeft = ifField.paddingRight = 12;
            ifField.counterAxisAlignItems = 'CENTER';
            ifField.itemSpacing = 8;
            ifField.cornerRadius = RAD;
            fill(ifField, ifState === 'Disabled' ? C.muted : C.bg);
            if (ifState === 'Focus')    stroke(ifField, C.ring, 2);
            else if (ifState === 'Error') stroke(ifField, C.destructive);
            else                          stroke(ifField, C.input);
            if (ifState === 'Disabled') ifField.opacity = 0.5;

            if (ifIcon === 'left' || ifIcon === 'both') {
              ifField.appendChild(iconInst('search', C.mutedFg, ifIcoSz));
            }
            var ifPlaceholder = tx('Placeholder', 'Regular', ifFs, C.mutedFg);
            ifPlaceholder.layoutGrow = 1;
            ifField.appendChild(ifPlaceholder);
            if (ifIcon === 'right' || ifIcon === 'both') {
              ifField.appendChild(iconInst('x', C.mutedFg, ifIcoSz));
            }
            ifComp.appendChild(ifField);

            // ── Mensaje inferior (error o hint) ──
            var ifMsgRow = row(4); ifMsgRow.name = 'helper-msg';
            ifMsgRow.primaryAxisSizingMode = 'AUTO';
            ifMsgRow.counterAxisSizingMode = 'AUTO';
            ifMsgRow.counterAxisAlignItems = 'CENTER';
            ifMsgRow.itemSpacing = 4;
            noFill(ifMsgRow);

            if (ifState === 'Error') {
              ifMsgRow.appendChild(iconInst('alert-circle', C.destructive, 12));
              ifMsgRow.appendChild(tx('Este campo es requerido', 'Regular', 12, C.destructive));
            } else {
              ifMsgRow.appendChild(tx('Texto de ayuda opcional', 'Regular', 12, C.mutedFg));
            }
            ifComp.appendChild(ifMsgRow);

            iflds.push(ifComp);
          }
        }
      }
    }

    y1 = makeSet('InputField', iflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] InputField (' + iflds.length + ' variants: Size × State × Icons × Label)');
  } catch (e) { console.error('[FAIL] InputField: ' + e.message); y1 += 60; }

  // ── Helper: construye wrapper Field (Label + control + mensaje) ──────────────
  function makeFieldWrapper(name, sizes, states, buildControl) {
    var flds = [];
    var hasLabels = [true, false];
    for (var fsi = 0; fsi < sizes.length; fsi++) {
      for (var fsti = 0; fsti < states.length; fsti++) {
        for (var fli = 0; fli < hasLabels.length; fli++) {
          var fSize     = sizes[fsi];
          var fState    = states[fsti];
          var fHasLabel = hasLabels[fli];
          var fFs       = fSize === 'sm' ? 12 : (fSize === 'lg' ? 16 : 14);
          var fComp = figma.createComponent();
          fComp.name = 'Size=' + fSize + ', State=' + fState + ', Label=' + (fHasLabel ? 'true' : 'false');
          fComp.layoutMode = 'VERTICAL';
          fComp.primaryAxisSizingMode = 'AUTO';
          fComp.counterAxisSizingMode = 'AUTO';
          fComp.itemSpacing = 6;
          fComp.counterAxisAlignItems = 'MIN';
          noFill(fComp);
          // Label
          if (fHasLabel) {
            var fLRow = row(4); fLRow.primaryAxisSizingMode = 'AUTO'; fLRow.counterAxisSizingMode = 'AUTO'; noFill(fLRow);
            fLRow.appendChild(tx('Label', 'Medium', fFs, C.fg));
            fLRow.appendChild(tx('*', 'Medium', fFs, C.destructive));
            fComp.appendChild(fLRow);
          }
          // Control (delegado al caller)
          var fControl = buildControl(fSize, fState, fFs);
          fComp.appendChild(fControl);
          // Mensaje
          var fMsgRow = row(4); fMsgRow.name = 'helper-msg';
          fMsgRow.primaryAxisSizingMode = 'AUTO'; fMsgRow.counterAxisSizingMode = 'AUTO'; fMsgRow.itemSpacing = 4; noFill(fMsgRow);
          if (fState === 'Error') {
            fMsgRow.appendChild(iconInst('alert-circle', C.destructive, 12));
            fMsgRow.appendChild(tx('Este campo es requerido', 'Regular', 12, C.destructive));
          } else {
            fMsgRow.appendChild(tx('Texto de ayuda opcional', 'Regular', 12, C.mutedFg));
          }
          fComp.appendChild(fMsgRow);
          flds.push(fComp);
        }
      }
    }
    return flds;
  }

  // Adds a "Show helper text" BOOLEAN property to a field wrapper ComponentSet.
  // Error variants are excluded — their message (required field) must always show.
  function addHelperToggle(cs) {
    try {
      var helperKey = cs.addComponentProperty('Show helper text', 'BOOLEAN', true, {});
      for (var vi = 0; vi < cs.children.length; vi++) {
        var variant = cs.children[vi];
        if (variant.type !== 'COMPONENT') continue;
        if (variant.name.indexOf('Error') !== -1) continue;
        for (var ci = 0; ci < variant.children.length; ci++) {
          var child = variant.children[ci];
          if (child.name === 'helper-msg') {
            child.componentPropertyReferences = { visible: helperKey };
          }
        }
      }
    } catch(e) { console.warn('[WARN] addHelperToggle: ' + e.message); }
  }

  // ── SelectField ──────────────────────────────────────────────────────────────
  try {
    var sflds = makeFieldWrapper('SelectField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 8;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        var p = tx('Seleccionar...', 'Regular', fs, C.mutedFg); p.layoutGrow = 1; f.appendChild(p);
        f.appendChild(iconInst('chevron-down', C.mutedFg, fs));
        return f;
      });
    y1 = makeSet('SelectField', sflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] SelectField (' + sflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] SelectField: ' + e.message); y1 += 60; }

  // ── TextareaField ─────────────────────────────────────────────────────────────
  try {
    var taflds = makeFieldWrapper('TextareaField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 72 : (sz === 'lg' ? 120 : 96);
        var f = figma.createFrame();
        f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.paddingTop = f.paddingBottom = 10;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        f.appendChild(tx('Escribe aquí...', 'Regular', fs, C.mutedFg));
        return f;
      });
    y1 = makeSet('TextareaField', taflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] TextareaField (' + taflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] TextareaField: ' + e.message); y1 += 60; }

  // ── ComboboxField ─────────────────────────────────────────────────────────────
  try {
    var cbflds = makeFieldWrapper('ComboboxField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 8;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        f.appendChild(iconInst('search', C.mutedFg, fs));
        var p = tx('Buscar...', 'Regular', fs, C.mutedFg); p.layoutGrow = 1; f.appendChild(p);
        f.appendChild(iconInst('chevron-down', C.mutedFg, fs));
        return f;
      });
    y1 = makeSet('ComboboxField', cbflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] ComboboxField (' + cbflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] ComboboxField: ' + e.message); y1 += 60; }

  // ── CheckboxField (label inline + descripción opcional) ───────────────────────
  try {
    var chkflds = [];
    var chkStates = ['Default', 'Checked', 'Indeterminate', 'Disabled'];
    var chkDescs  = [true, false];
    for (var chkSti = 0; chkSti < chkStates.length; chkSti++) {
      for (var chkDi = 0; chkDi < chkDescs.length; chkDi++) {
        var chkState   = chkStates[chkSti];
        var chkHasDesc = chkDescs[chkDi];
        var chkComp = figma.createComponent();
        chkComp.name = 'State=' + chkState + ', Description=' + (chkHasDesc ? 'true' : 'false');
        chkComp.layoutMode = 'HORIZONTAL'; chkComp.primaryAxisSizingMode = 'AUTO'; chkComp.counterAxisSizingMode = 'AUTO';
        chkComp.itemSpacing = 10; chkComp.counterAxisAlignItems = 'MIN'; noFill(chkComp);
        if (chkState === 'Disabled') chkComp.opacity = 0.5;
        // Box
        var chkBox = figma.createFrame();
        chkBox.resize(16, 16); chkBox.cornerRadius = 4;
        chkBox.layoutMode = 'HORIZONTAL';
        chkBox.primaryAxisSizingMode = 'FIXED'; chkBox.counterAxisSizingMode = 'FIXED';
        chkBox.primaryAxisAlignItems = 'CENTER'; chkBox.counterAxisAlignItems = 'CENTER';
        if (chkState === 'Checked' || chkState === 'Indeterminate') { fill(chkBox, C.primary); stroke(chkBox, C.primary); }
        else { noFill(chkBox); stroke(chkBox, C.input); }
        if (chkState === 'Checked')       chkBox.appendChild(iconInst('check', C.primaryFg, 12));
        if (chkState === 'Indeterminate') chkBox.appendChild(iconInst('minus', C.primaryFg, 12));
        chkComp.appendChild(chkBox);
        // Texto
        var chkTxtCol = figma.createFrame();
        chkTxtCol.layoutMode = 'VERTICAL'; chkTxtCol.primaryAxisSizingMode = 'AUTO'; chkTxtCol.counterAxisSizingMode = 'AUTO';
        chkTxtCol.itemSpacing = 2; noFill(chkTxtCol);
        chkTxtCol.appendChild(tx('Etiqueta del checkbox', 'Medium', 14, C.fg));
        if (chkHasDesc) chkTxtCol.appendChild(tx('Descripción opcional del campo', 'Regular', 12, C.mutedFg));
        chkComp.appendChild(chkTxtCol);
        chkflds.push(chkComp);
      }
    }
    y1 = makeSet('CheckboxField', chkflds, p1, 60, y1);
    console.log('[OK] CheckboxField (' + chkflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] CheckboxField: ' + e.message); y1 += 60; }

  // ── SwitchField (label inline + descripción opcional) ────────────────────────
  try {
    var swflds = [];
    var swStates = ['Off', 'On', 'Disabled'];
    var swDescs  = [true, false];
    for (var swSti = 0; swSti < swStates.length; swSti++) {
      for (var swDi = 0; swDi < swDescs.length; swDi++) {
        var swState   = swStates[swSti];
        var swHasDesc = swDescs[swDi];
        var swComp = figma.createComponent();
        swComp.name = 'State=' + swState + ', Description=' + (swHasDesc ? 'true' : 'false');
        swComp.layoutMode = 'HORIZONTAL'; swComp.primaryAxisSizingMode = 'AUTO'; swComp.counterAxisSizingMode = 'AUTO';
        swComp.itemSpacing = 10; swComp.counterAxisAlignItems = 'MIN'; noFill(swComp);
        if (swState === 'Disabled') swComp.opacity = 0.5;
        // Track
        var swTrack = figma.createFrame();
        swTrack.resize(44, 24); swTrack.cornerRadius = 999;
        fill(swTrack, swState === 'On' ? C.primary : C.switchBg);
        swTrack.layoutMode = 'HORIZONTAL';
        swTrack.primaryAxisSizingMode = 'FIXED'; swTrack.counterAxisSizingMode = 'FIXED';
        swTrack.primaryAxisAlignItems = swState === 'On' ? 'MAX' : 'MIN';
        swTrack.counterAxisAlignItems = 'CENTER';
        swTrack.paddingLeft = swTrack.paddingRight = 2;
        swTrack.paddingTop = swTrack.paddingBottom = 2;
        // Thumb
        var swThumb = figma.createFrame();
        swThumb.resize(20, 20); swThumb.cornerRadius = 999; fill(swThumb, C.bg);
        swThumb.layoutSizingHorizontal = 'FIXED'; swThumb.layoutSizingVertical = 'FIXED';
        swTrack.appendChild(swThumb);
        swComp.appendChild(swTrack);
        // Texto
        var swTxtCol = figma.createFrame();
        swTxtCol.layoutMode = 'VERTICAL'; swTxtCol.primaryAxisSizingMode = 'AUTO'; swTxtCol.counterAxisSizingMode = 'AUTO';
        swTxtCol.itemSpacing = 2; noFill(swTxtCol);
        swTxtCol.appendChild(tx('Etiqueta del switch', 'Medium', 14, C.fg));
        if (swHasDesc) swTxtCol.appendChild(tx('Descripción opcional', 'Regular', 12, C.mutedFg));
        swComp.appendChild(swTxtCol);
        swflds.push(swComp);
      }
    }
    y1 = makeSet('SwitchField', swflds, p1, 60, y1);
    console.log('[OK] SwitchField (' + swflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] SwitchField: ' + e.message); y1 += 60; }

  // ── RadioGroupField ───────────────────────────────────────────────────────────
  try {
    var rgflds = [];
    var rgCounts  = [2, 3, 4];
    var rgSelecteds = [1, 2];
    for (var rgCi = 0; rgCi < rgCounts.length; rgCi++) {
      for (var rgSi = 0; rgSi < rgSelecteds.length; rgSi++) {
        var rgCount    = rgCounts[rgCi];
        var rgSelected = rgSelecteds[rgSi];
        if (rgSelected > rgCount) continue;
        var rgComp = figma.createComponent();
        rgComp.name = 'Count=' + rgCount + ', Selected=' + rgSelected;
        rgComp.layoutMode = 'VERTICAL'; rgComp.primaryAxisSizingMode = 'AUTO'; rgComp.counterAxisSizingMode = 'AUTO';
        rgComp.itemSpacing = 8; noFill(rgComp);
        // Group label
        rgComp.appendChild(tx('Grupo de opciones', 'Medium', 14, C.fg));
        // Options
        for (var rgi = 0; rgi < rgCount; rgi++) {
          var isRgSelected = (rgi === rgSelected - 1);
          var rgItem = row(8);
          rgItem.primaryAxisSizingMode = 'AUTO'; rgItem.counterAxisSizingMode = 'AUTO';
          rgItem.counterAxisAlignItems = 'CENTER'; noFill(rgItem);
          // Radio dot
          var rgDot = figma.createFrame();
          rgDot.resize(16, 16); rgDot.cornerRadius = 999;
          if (isRgSelected) { fill(rgDot, C.bg); stroke(rgDot, C.primary, 2); }
          else { fill(rgDot, C.bg); stroke(rgDot, C.input); }
          if (isRgSelected) {
            var rgInner = figma.createFrame();
            rgInner.resize(6, 6); rgInner.cornerRadius = 999; fill(rgInner, C.primary);
            rgInner.x = 5; rgInner.y = 5;
            rgDot.appendChild(rgInner);
          }
          rgItem.appendChild(rgDot);
          rgItem.appendChild(tx('Opción ' + (rgi + 1), isRgSelected ? 'Medium' : 'Regular', 14, C.fg));
          rgComp.appendChild(rgItem);
        }
        // Helper hint
        var rgHint = row(4); rgHint.name = 'helper-msg'; rgHint.primaryAxisSizingMode = 'AUTO'; rgHint.counterAxisSizingMode = 'AUTO'; rgHint.itemSpacing = 4; noFill(rgHint);
        rgHint.appendChild(tx('Texto de ayuda opcional', 'Regular', 12, C.mutedFg));
        rgComp.appendChild(rgHint);
        rgflds.push(rgComp);
      }
    }
    y1 = makeSet('RadioGroupField', rgflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] RadioGroupField (' + rgflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] RadioGroupField: ' + e.message); y1 += 60; }

  // ── NumberInputField ──────────────────────────────────────────────────────────
  try {
    var niflds = makeFieldWrapper('NumberInputField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 8; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 4;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        // Botón menos
        var niBtnSz = sz === 'sm' ? 24 : (sz === 'lg' ? 32 : 28);
        var niMinus = figma.createFrame();
        niMinus.layoutMode = 'HORIZONTAL';
        niMinus.primaryAxisSizingMode = 'FIXED'; niMinus.counterAxisSizingMode = 'FIXED';
        niMinus.resize(niBtnSz, niBtnSz); niMinus.cornerRadius = RAD - 2;
        niMinus.layoutSizingHorizontal = 'FIXED'; niMinus.layoutSizingVertical = 'FIXED';
        niMinus.primaryAxisAlignItems = 'CENTER'; niMinus.counterAxisAlignItems = 'CENTER';
        fill(niMinus, C.muted);
        niMinus.appendChild(iconInst('minus', C.mutedFg, 14));
        f.appendChild(niMinus);
        var niVal = tx('0', 'Regular', fs, C.fg); niVal.layoutGrow = 1; niVal.textAlignHorizontal = 'CENTER'; f.appendChild(niVal);
        // Botón más
        var niPlus = figma.createFrame();
        niPlus.layoutMode = 'HORIZONTAL';
        niPlus.primaryAxisSizingMode = 'FIXED'; niPlus.counterAxisSizingMode = 'FIXED';
        niPlus.resize(niBtnSz, niBtnSz); niPlus.cornerRadius = RAD - 2;
        niPlus.layoutSizingHorizontal = 'FIXED'; niPlus.layoutSizingVertical = 'FIXED';
        niPlus.primaryAxisAlignItems = 'CENTER'; niPlus.counterAxisAlignItems = 'CENTER';
        fill(niPlus, C.muted);
        niPlus.appendChild(iconInst('plus', C.mutedFg, 14));
        f.appendChild(niPlus);
        return f;
      });
    y1 = makeSet('NumberInputField', niflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] NumberInputField (' + niflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] NumberInputField: ' + e.message); y1 += 60; }

  // ── CurrencyInputField ────────────────────────────────────────────────────────
  try {
    var ciflds = makeFieldWrapper('CurrencyInputField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 6;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        // Prefix: plain text inline, no background (matches absolute <span> in React)
        var ciPfx = tx('$', 'Regular', fs, C.mutedFg);
        f.appendChild(ciPfx);
        // Value: fills remaining space, right-aligned
        var ciVal = tx('0,00', 'Regular', fs, C.fg);
        ciVal.layoutGrow = 1; ciVal.textAlignHorizontal = 'RIGHT';
        f.appendChild(ciVal);
        return f;
      });
    y1 = makeSet('CurrencyInputField', ciflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] CurrencyInputField (' + ciflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] CurrencyInputField: ' + e.message); y1 += 60; }

  // ── DatePickerField ───────────────────────────────────────────────────────────
  try {
    var dpflds = makeFieldWrapper('DatePickerField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 8;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        f.appendChild(iconInst('calendar', C.mutedFg, fs));
        var p = tx('dd/mm/aaaa', 'Regular', fs, C.mutedFg); p.layoutGrow = 1; f.appendChild(p);
        return f;
      });
    y1 = makeSet('DatePickerField', dpflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] DatePickerField (' + dpflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] DatePickerField: ' + e.message); y1 += 60; }

  // ── DateRangePickerField ──────────────────────────────────────────────────────
  try {
    var drpflds = makeFieldWrapper('DateRangePickerField', ['sm','default','lg'], ['Default','Focus','Error','Disabled'],
      function(sz, st, fs) {
        var h = sz === 'sm' ? 32 : (sz === 'lg' ? 44 : 36);
        var f = figma.createFrame();
        f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
        f.resize(260, h); f.paddingLeft = f.paddingRight = 12; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = 6;
        f.cornerRadius = RAD;
        fill(f, st === 'Disabled' ? C.muted : C.bg);
        if (st === 'Focus') stroke(f, C.ring, 2); else if (st === 'Error') stroke(f, C.destructive); else stroke(f, C.input);
        if (st === 'Disabled') f.opacity = 0.5;
        f.appendChild(iconInst('calendar', C.mutedFg, fs));
        var p1t = tx('Inicio', 'Regular', fs, C.mutedFg); p1t.layoutGrow = 1; f.appendChild(p1t);
        f.appendChild(iconInst('arrow-right', C.mutedFg, 12));
        var p2t = tx('Fin', 'Regular', fs, C.mutedFg); p2t.layoutGrow = 1; f.appendChild(p2t);
        return f;
      });
    y1 = makeSet('DateRangePickerField', drpflds, p1, 60, y1, addHelperToggle);
    console.log('[OK] DateRangePickerField (' + drpflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] DateRangePickerField: ' + e.message); y1 += 60; }

  // ── SliderField ───────────────────────────────────────────────────────────────
  try {
    var slflds = [];
    var slStates = ['Default', 'Disabled'];
    var slLabels = [true, false];
    for (var slSti = 0; slSti < slStates.length; slSti++) {
      for (var slLi = 0; slLi < slLabels.length; slLi++) {
        var slState    = slStates[slSti];
        var slHasLabel = slLabels[slLi];
        var slComp = figma.createComponent();
        slComp.name = 'State=' + slState + ', Label=' + (slHasLabel ? 'true' : 'false');
        slComp.layoutMode = 'VERTICAL'; slComp.primaryAxisSizingMode = 'AUTO'; slComp.counterAxisSizingMode = 'AUTO';
        slComp.itemSpacing = 8; slComp.counterAxisAlignItems = 'MIN'; noFill(slComp);
        if (slState === 'Disabled') slComp.opacity = 0.5;
        // Label + valor
        if (slHasLabel) {
          var slLabelRow = row(0);
          slLabelRow.primaryAxisSizingMode = 'FIXED'; slLabelRow.counterAxisSizingMode = 'AUTO';
          slLabelRow.primaryAxisAlignItems = 'SPACE_BETWEEN'; noFill(slLabelRow);
          slLabelRow.appendChild(tx('Etiqueta', 'Medium', 14, C.fg));
          slLabelRow.appendChild(tx('50', 'Regular', 14, C.mutedFg));
          slLabelRow.resize(260, slLabelRow.height); // width fixed, height already hugged by AUTO
          slComp.appendChild(slLabelRow);
        }
        // Contenedor del slider (altura suficiente para el thumb, sin clipping)
        var slContainer = figma.createFrame();
        slContainer.resize(260, 20); slContainer.clipsContent = false; noFill(slContainer);
        // Track bar (centrado verticalmente en 20px → y=7)
        var slTrack = figma.createFrame();
        slTrack.resize(260, 6); slTrack.cornerRadius = 999; slTrack.y = 7; fill(slTrack, C.muted);
        // Fill progress (50%)
        var slFill = figma.createFrame();
        slFill.resize(130, 6); slFill.cornerRadius = 999; fill(slFill, C.primary);
        slTrack.appendChild(slFill);
        slContainer.appendChild(slTrack);
        // Thumb (centrado en 20px → y=2, x=122)
        var slThumb = figma.createFrame();
        slThumb.resize(16, 16); slThumb.cornerRadius = 999; fill(slThumb, C.bg); stroke(slThumb, C.primary, 2);
        slThumb.x = 122; slThumb.y = 2;
        slContainer.appendChild(slThumb);
        slComp.appendChild(slContainer);
        slflds.push(slComp);
      }
    }
    y1 = makeSet('SliderField', slflds, p1, 60, y1);
    console.log('[OK] SliderField (' + slflds.length + ' variants)');
  } catch(e) { console.error('[FAIL] SliderField: ' + e.message); y1 += 60; }

  // ── InputGroup — removed (not in DSM) ──
  if (false) try {
    var igAll = [];
    var igLefts  = ['none', 'text', 'icon'];
    var igRights = ['none', 'text', 'button'];
    var igStates = ['Default', 'Focus', 'Error', 'Disabled'];
    for (var igL = 0; igL < igLefts.length; igL++) {
      for (var igR = 0; igR < igRights.length; igR++) {
        for (var igS = 0; igS < igStates.length; igS++) {
          var igLeft = igLefts[igL]; var igRight = igRights[igR]; var igState = igStates[igS];
          var igComp = figma.createComponent();
          igComp.name = 'AddonLeft=' + igLeft + ', AddonRight=' + igRight + ', State=' + igState;
          igComp.layoutMode = 'HORIZONTAL'; igComp.primaryAxisSizingMode = 'AUTO';
          igComp.counterAxisSizingMode = 'FIXED'; igComp.resize(280, 36);
          igComp.itemSpacing = 0; igComp.counterAxisAlignItems = 'CENTER';
          noFill(igComp); igComp.cornerRadius = 0;
          // Left addon
          if (igLeft === 'text' || igLeft === 'icon') {
            var igAddonL = figma.createFrame();
            igAddonL.layoutMode = 'HORIZONTAL'; igAddonL.primaryAxisSizingMode = 'FIXED';
            igAddonL.counterAxisSizingMode = 'FIXED'; igAddonL.resize(40, 36);
            igAddonL.primaryAxisAlignItems = 'CENTER'; igAddonL.counterAxisAlignItems = 'CENTER';
            fill(igAddonL, C.muted); stroke(igAddonL, C.input);
            igAddonL.cornerRadius = RAD; igAddonL.topRightRadius = 0; igAddonL.bottomRightRadius = 0;
            if (igLeft === 'text') { igAddonL.appendChild(tx('@', 'Regular', 13, C.mutedFg)); }
            else { igAddonL.appendChild(iconInst('search', C.mutedFg, 16)); }
            igComp.appendChild(igAddonL);
          }
          // Main input
          var igMain = figma.createFrame();
          igMain.layoutMode = 'HORIZONTAL'; igMain.primaryAxisSizingMode = 'FIXED';
          igMain.counterAxisSizingMode = 'FIXED'; igMain.resize(200, 36);
          igMain.paddingLeft = 12; igMain.paddingRight = 12; igMain.counterAxisAlignItems = 'CENTER';
          igMain.itemSpacing = 8; fill(igMain, C.card); igMain.cornerRadius = RAD;
          if (igLeft === 'text' || igLeft === 'icon') { igMain.topLeftRadius = 0; igMain.bottomLeftRadius = 0; }
          if (igRight === 'text' || igRight === 'button') { igMain.topRightRadius = 0; igMain.bottomRightRadius = 0; }
          if (igState === 'Focus') { stroke(igMain, C.ring, 2); }
          else if (igState === 'Error') { stroke(igMain, C.destructive); }
          else { stroke(igMain, C.input); }
          var igPlaceholder = tx('Enter value...', 'Regular', 14, C.mutedFg);
          igPlaceholder.layoutGrow = 1;
          igMain.appendChild(igPlaceholder);
          igComp.appendChild(igMain);
          // Right addon
          if (igRight === 'text' || igRight === 'button') {
            var igAddonR = figma.createFrame();
            igAddonR.layoutMode = 'HORIZONTAL'; igAddonR.primaryAxisSizingMode = 'FIXED';
            igAddonR.counterAxisSizingMode = 'FIXED'; igAddonR.primaryAxisAlignItems = 'CENTER';
            igAddonR.counterAxisAlignItems = 'CENTER'; igAddonR.cornerRadius = RAD;
            igAddonR.topLeftRadius = 0; igAddonR.bottomLeftRadius = 0;
            if (igRight === 'text') {
              igAddonR.resize(48, 36); fill(igAddonR, C.muted); stroke(igAddonR, C.input);
              igAddonR.appendChild(tx('COP', 'Regular', 12, C.mutedFg));
            } else {
              igAddonR.resize(72, 36); fill(igAddonR, C.primary);
              igAddonR.appendChild(tx('Search', 'Medium', 13, C.primaryFg));
            }
            igComp.appendChild(igAddonR);
          }
          if (igState === 'Disabled') { igComp.opacity = 0.5; }
          igAll.push(igComp);
        }
      }
    }
    y1 = makeSet('InputGroup', igAll, p1, 60, y1);
    console.log('[OK] InputGroup (' + igAll.length + ' variants: 3 AddonLeft × 3 AddonRight × 4 State)');
  } catch (e) { console.error('[FAIL] InputGroup: ' + e.message); y1 += 60; }

  // ── Select ──
  try {
    var sels = [];
    for (var i = 0; i < iszs.length; i++) {
      var sel = figma.createComponent();
      sel.name = 'Size=' + iszs[i];
      var sh = iszs[i] === 'sm' ? 32 : (iszs[i] === 'lg' ? 44 : 36);
      sel.layoutMode = 'HORIZONTAL'; sel.resize(260, sh);
      sel.primaryAxisSizingMode = 'FIXED'; sel.counterAxisSizingMode = 'FIXED';
      sel.paddingLeft = sel.paddingRight = 12; sel.counterAxisAlignItems = 'CENTER';
      sel.primaryAxisAlignItems = 'SPACE_BETWEEN';
      fill(sel, C.bg); sel.cornerRadius = RAD; stroke(sel, C.input);
      sel.appendChild(tx('Select option...', 'Regular', 14, C.mutedFg));
      var chevInst = iconInst('chevron-down', null, 16);
      sel.appendChild(chevInst);
      sels.push(sel);
    }
    y1 = makeSet('Select', sels, p1, 60, y1);
    console.log('[OK] Select');
  } catch (e) { console.error('[FAIL] Select: ' + e.message); y1 += 60; }

  // ── Textarea ──
  try {
    var txas = [];
    var tsz = ['sm', 'default', 'lg'];
    for (var i = 0; i < tsz.length; i++) {
      var ta = figma.createComponent();
      ta.name = 'Size=' + tsz[i];
      var tah = tsz[i] === 'sm' ? 72 : (tsz[i] === 'lg' ? 120 : 96);
      ta.layoutMode = 'VERTICAL'; ta.resize(260, tah);
      ta.primaryAxisSizingMode = 'FIXED'; ta.counterAxisSizingMode = 'FIXED';
      ta.paddingLeft = ta.paddingRight = 12; ta.paddingTop = 8;
      fill(ta, C.bg); ta.cornerRadius = RAD; stroke(ta, C.input);
      ta.appendChild(tx('Enter text...', 'Regular', 14, C.mutedFg));
      txas.push(ta);
    }
    y1 = makeSet('Textarea', txas, p1, 60, y1);
    console.log('[OK] Textarea');
  } catch (e) { console.error('[FAIL] Textarea: ' + e.message); y1 += 60; }

  // ── Checkbox ──
  try {
    var cbs = [];
    var csts = ['Unchecked', 'Checked', 'Disabled'];
    for (var i = 0; i < csts.length; i++) {
      var cb = figma.createComponent();
      cb.name = 'State=' + csts[i];
      cb.layoutMode = 'HORIZONTAL'; cb.resize(16, 16);
      cb.primaryAxisSizingMode = 'FIXED'; cb.counterAxisSizingMode = 'FIXED';
      cb.primaryAxisAlignItems = 'CENTER'; cb.counterAxisAlignItems = 'CENTER'; cb.cornerRadius = 4;
      if (csts[i] === 'Checked') { fill(cb, C.primary); cb.appendChild(iconInst('check', C.primaryFg, 12)); }
      else if (csts[i] === 'Disabled') { fill(cb, C.muted); stroke(cb, C.border); cb.opacity = 0.5; }
      else { fill(cb, C.bg); stroke(cb, C.input); }
      cbs.push(cb);
    }
    y1 = makeSet('Checkbox', cbs, p1, 60, y1);
    console.log('[OK] Checkbox');
  } catch (e) { console.error('[FAIL] Checkbox: ' + e.message); y1 += 60; }

  // ── Radio ──
  try {
    var rads = [];
    var rsts = ['Unselected', 'Selected', 'Disabled'];
    for (var i = 0; i < rsts.length; i++) {
      var rd = figma.createComponent();
      rd.name = 'State=' + rsts[i]; rd.resize(20, 20); rd.cornerRadius = 10;
      if (rsts[i] === 'Selected') {
        fill(rd, C.primary);
        var dot = figma.createEllipse(); dot.resize(8, 8); dot.x = 6; dot.y = 6; fill(dot, C.primaryFg); rd.appendChild(dot);
      } else if (rsts[i] === 'Disabled') { fill(rd, C.muted); stroke(rd, C.border); rd.opacity = 0.5; }
      else { fill(rd, C.bg); stroke(rd, C.input, 2); }
      rads.push(rd);
    }
    y1 = makeSet('Radio', rads, p1, 60, y1);
    console.log('[OK] Radio');
  } catch (e) { console.error('[FAIL] Radio: ' + e.message); y1 += 60; }

  // ── Switch ──
  try {
    var sws = [];
    var swsts = ['Off', 'On', 'Disabled'];
    for (var i = 0; i < swsts.length; i++) {
      var sw2 = figma.createComponent();
      sw2.name = 'State=' + swsts[i]; sw2.resize(44, 24); sw2.cornerRadius = 12;
      var thumb = figma.createEllipse(); thumb.resize(20, 20); thumb.y = 2; fill(thumb, C.primaryFg);
      if (swsts[i] === 'On') { fill(sw2, C.primary); thumb.x = 22; }
      else { fill(sw2, C.switchBg); thumb.x = 2; } // --switch-background
      sw2.appendChild(thumb);
      if (swsts[i] === 'Disabled') sw2.opacity = 0.5;
      sws.push(sw2);
    }
    y1 = makeSet('Switch', sws, p1, 60, y1);
    console.log('[OK] Switch');
  } catch (e) { console.error('[FAIL] Switch: ' + e.message); y1 += 60; }

  // ── Label ──
  try {
    var lbls = [];
    var lrs = ['false', 'true'];
    for (var i = 0; i < lrs.length; i++) {
      var lb = figma.createComponent();
      lb.name = 'Required=' + lrs[i];
      lb.layoutMode = 'HORIZONTAL'; lb.primaryAxisSizingMode = 'AUTO'; lb.counterAxisSizingMode = 'AUTO';
      lb.itemSpacing = 2; noFill(lb);
      lb.appendChild(tx('Label', 'Medium', 14, C.fg));
      if (lrs[i] === 'true') lb.appendChild(tx('*', 'Medium', 14, C.destructive));
      lbls.push(lb);
    }
    y1 = makeSet('Label', lbls, p1, 60, y1);
    console.log('[OK] Label');
  } catch (e) { console.error('[FAIL] Label: ' + e.message); y1 += 60; }

  gridSection('Selection Controls');
  // ── Slider ──
  try {
    var sliders = [];
    var slsts = ['Default', 'Disabled'];
    for (var i = 0; i < slsts.length; i++) {
      var sl = figma.createComponent();
      sl.name = 'State=' + slsts[i]; sl.resize(200, 18);
      var slBg = figma.createFrame(); slBg.resize(200, 6); slBg.y = 6; fill(slBg, C.muted); slBg.cornerRadius = 3; sl.appendChild(slBg);
      var slFl = figma.createFrame(); slFl.resize(100, 6); slFl.y = 6; fill(slFl, slsts[i] === 'Disabled' ? C.mutedFg : C.primary); slFl.cornerRadius = 3; sl.appendChild(slFl);
      var slTh = figma.createEllipse(); slTh.resize(18, 18); slTh.x = 91; fill(slTh, slsts[i] === 'Disabled' ? C.mutedFg : C.primary); stroke(slTh, C.primaryFg, 2); sl.appendChild(slTh);
      if (slsts[i] === 'Disabled') sl.opacity = 0.5;
      sliders.push(sl);
    }
    y1 = makeSet('Slider', sliders, p1, 60, y1);
    console.log('[OK] Slider');
  } catch (e) { console.error('[FAIL] Slider: ' + e.message); y1 += 60; }

  // ── Toggle ──
  try {
    var togs = [];
    var togsts = ['Off', 'On'];
    for (var i = 0; i < togsts.length; i++) {
      var tog = figma.createComponent();
      tog.name = 'State=' + togsts[i];
      tog.layoutMode = 'HORIZONTAL'; tog.resize(36, 36);
      tog.primaryAxisSizingMode = 'FIXED'; tog.counterAxisSizingMode = 'FIXED';
      tog.primaryAxisAlignItems = 'CENTER'; tog.counterAxisAlignItems = 'CENTER'; tog.cornerRadius = RAD;
      stroke(tog, C.border);
      if (togsts[i] === 'On') { fill(tog, C.accent); tog.appendChild(tx('B', 'Bold', 14, C.accentFg)); }
      else { noFill(tog); tog.appendChild(tx('B', 'Regular', 14, C.mutedFg)); }
      togs.push(tog);
    }
    y1 = makeSet('Toggle', togs, p1, 60, y1);
    console.log('[OK] Toggle');
  } catch (e) { console.error('[FAIL] Toggle: ' + e.message); y1 += 60; }

  console.log('[DONE] Primitives');

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 2: COMPONENTS
  // ══════════════════════════════════════════════════════════════════════
  try {
    var title2 = tx('COMPONENTS', 'Bold', 48, C.fg);
    p2.appendChild(title2); title2.x = 60; title2.y = 60;
    var sub2 = tx('Navigation · Data Display · Feedback · Layout — CESIONBNK theme', 'Regular', 16, C.mutedFg);
    p2.appendChild(sub2); sub2.x = 60; sub2.y = 120;
    var y2 = 160;
    gridInit(p2, 160);
  } catch (e) { console.error('[FAIL] Components title: ' + e.message); var y2 = 160; gridInit(p2, 160); }

  // ── Badge ──────────────────────────────────────────────────────────────────
  // Variant  = primary | secondary | outline | neutral | soft | soft-outline
  // Color    = default | success | warning | destructive | info   (semantic)
  // Size     = sm | default | lg
  // State    = default | disabled
  // BOOLEAN  = Icon Left | Icon Right
  // Total: 6 × 5 × 3 × 2 = 180 components
  var bdCompsByVariant = {};
  try {
    var badges = [];

    var bdVariants = ['primary', 'primary-soft', 'secondary', 'outline', 'neutral', 'soft', 'soft-outline'];
    var bdColors   = ['default', 'success', 'warning', 'caution', 'destructive', 'info'];
    var bdSizeKeys = ['sm', 'default', 'lg'];
    var bdStates   = ['default', 'disabled'];

    // Size tokens: [paddingH, paddingV, fontSize, iconSize, cornerRadius]
    var bdSizes = {
      sm:      [6,  1, 10, 10, 4],
      default: [8,  2, 12, 12, 6],
      lg:      [12, 3, 14, 14, 8]
    };

    // Per-color semantic tokens
    var bdColorTokens = {
      default:     { subtle: C.muted,             on: C.mutedFg,             border: C.border,      solidBg: C.primary,     solidFg: C.primaryFg },
      success:     { subtle: C.successSubtle,      on: C.successOnSubtle,     border: C.success,     solidBg: C.success,     solidFg: C.successFg },
      warning:     { subtle: C.warningSubtle,      on: C.warningOnSubtle,     border: C.warning,     solidBg: C.warning,     solidFg: C.warningFg },
      caution:     { subtle: C.cautionSubtle,      on: C.cautionOnSubtle,     border: C.caution,     solidBg: C.caution,     solidFg: C.cautionFg },
      destructive: { subtle: C.destructiveSubtle,  on: C.destructiveOnSubtle, border: C.destructive, solidBg: C.destructive, solidFg: C.destructiveFg },
      info:        { subtle: C.infoSubtle,         on: C.infoOnSubtle,        border: C.info,        solidBg: C.info,        solidFg: C.infoFg }
    };

    // Returns [bg|null, fg, strokeBorder|null]
    function getBdTokens(variant, color) {
      var ct = bdColorTokens[color] || bdColorTokens['default'];
      if (variant === 'primary')      return [C.primary,        C.primaryFg,   null];
      if (variant === 'primary-soft') return [C.secondarySubtle, C.secondary,  null];
      if (variant === 'secondary')    return [C.secondary,      C.secondaryFg, null];
      if (variant === 'neutral')      return [C.muted,          C.mutedFg,     null];
      if (variant === 'outline')      return [null,             ct.on,         ct.border];
      if (variant === 'soft')         return [ct.subtle,        ct.on,         null];
      if (variant === 'soft-outline') return [ct.subtle,        ct.on,         ct.border];
      return [null, C.fg, null];
    }

    function getBdIcons(variant, color) {
      if (color === 'destructive') return ['alert-circle', 'x'];
      if (color === 'success')     return ['check-circle', 'chevron-right'];
      if (color === 'warning')     return ['alert-circle', 'x-circle'];
      if (color === 'caution')     return ['alert-circle', 'chevron-right'];
      if (color === 'info')        return ['info', 'arrow-right'];
      if (variant === 'secondary' || variant === 'primary-soft') return ['star', 'arrow-right'];
      return ['circle', 'chevron-right'];
    }

    // Brand/neutral variants (primary, primary-soft, secondary, neutral) ignore Color — only generate Color=default.
    // Semantic variants (outline, soft, soft-outline) generate all colors.
    var bdColorAware = { 'outline': true, 'soft': true, 'soft-outline': true };
    var bdColorLabels = { default: 'Badge', success: 'Éxito', warning: 'Alerta', caution: 'Riesgo', destructive: 'Error', info: 'Info' };

    for (var bvi = 0; bvi < bdVariants.length; bvi++) {
      var bdVariant = bdVariants[bvi];
      var bdColsForVariant = bdColorAware[bdVariant] ? bdColors : ['default'];

      for (var bci = 0; bci < bdColsForVariant.length; bci++) {
        var bdColor = bdColsForVariant[bci];
        var bdTok   = getBdTokens(bdVariant, bdColor);
        var bdBg     = bdTok[0];
        var bdFg     = bdTok[1];
        var bdBorder = bdTok[2];
        var bdIcons  = getBdIcons(bdVariant, bdColor);
        // Label: brand variants show variant name; semantic variants show color name
        var bdLabel = bdColorAware[bdVariant] ? (bdColorLabels[bdColor] || 'Badge') : (bdVariant.charAt(0).toUpperCase() + bdVariant.slice(1));

        for (var bsi = 0; bsi < bdSizeKeys.length; bsi++) {
          var bdSzKey = bdSizeKeys[bsi];
          var bdSz    = bdSizes[bdSzKey];

          for (var bsti = 0; bsti < bdStates.length; bsti++) {
            var bdState = bdStates[bsti];

            var bg2 = figma.createComponent();
            bg2.name = 'Variant=' + bdVariant + ', Color=' + bdColor + ', Size=' + bdSzKey + ', State=' + bdState;
            bg2.layoutMode = 'HORIZONTAL';
            bg2.primaryAxisSizingMode = 'AUTO'; bg2.counterAxisSizingMode = 'AUTO';
            bg2.paddingLeft = bg2.paddingRight = bdSz[0];
            bg2.paddingTop  = bg2.paddingBottom = bdSz[1];
            bg2.primaryAxisAlignItems = 'CENTER'; bg2.counterAxisAlignItems = 'CENTER';
            bg2.cornerRadius = bdSz[4]; bg2.itemSpacing = 4;
            if (bdBg) fill(bg2, bdBg); else noFill(bg2);
            if (bdBorder) stroke(bg2, bdBorder);
            if (bdState === 'disabled') bg2.opacity = 0.5;

            // Icon Left — hidden by default, bound to BOOLEAN property after combineAsVariants
            var biL = iconInst(bdIcons[0], bdFg, bdSz[3]);
            biL.name = 'icon-left'; biL.visible = false;
            bg2.appendChild(biL);

            // Label
            bg2.appendChild(tx(bdLabel, 'Medium', bdSz[2], bdFg));

            // Icon Right — hidden by default, bound to BOOLEAN property after combineAsVariants
            var biR = iconInst(bdIcons[1], bdFg, bdSz[3]);
            biR.name = 'icon-right'; biR.visible = false;
            bg2.appendChild(biR);

            // Store for pattern instancing (default size + default state)
            if (bsi === 1 && bsti === 0) {
              bdCompsByVariant[bdVariant + '-' + bdColor] = bg2;
              if (bdColor === 'default') bdCompsByVariant[bdVariant] = bg2;
            }
            badges.push(bg2);
          }
        }
      }
    }

    // Add BOOLEAN properties for icon toggles after combineAsVariants
    function addBadgeIconToggles(cs) {
      try {
        var leftKey  = cs.addComponentProperty('Icon Left',  'BOOLEAN', false, {});
        var rightKey = cs.addComponentProperty('Icon Right', 'BOOLEAN', false, {});
        for (var vi = 0; vi < cs.children.length; vi++) {
          var variant = cs.children[vi];
          if (variant.type !== 'COMPONENT') continue;
          for (var ci = 0; ci < variant.children.length; ci++) {
            var ch = variant.children[ci];
            if (ch.name === 'icon-left')  ch.componentPropertyReferences = { visible: leftKey };
            if (ch.name === 'icon-right') ch.componentPropertyReferences = { visible: rightKey };
          }
        }
      } catch(e) { console.warn('[WARN] addBadgeIconToggles: ' + e.message); }
    }

    y2 = makeSet('Badge', badges, p2, 60, y2, addBadgeIconToggles);
    console.log('[OK] Badge (' + badges.length + ' variants: primary/secondary/neutral×1color + outline/soft/soft-outline×5colors × 3 sizes × 2 states + Icon Left/Right toggles)');
  } catch (e) { console.error('[FAIL] Badge: ' + e.message); y2 += 60; }

  // badgeInst(variant, label) — creates a Badge instance for use in patterns
  // Maps C.* semantic color → badge variant+color key
  function colorToBadgeVariant(color) {
    var map = {};
    map[C.success]     = 'soft-success';
    map[C.destructive] = 'soft-destructive';
    map[C.warning]     = 'soft-warning';
    map[C.caution]     = 'soft-caution';
    map[C.info]        = 'soft-info';
    map[C.secondary]   = 'secondary';
    map[C.primary]     = 'primary';
    map[C.mutedFg]     = 'neutral';
    return map[color] || 'neutral';
  }
  function badgeInst(variant, label) {
    var comp = bdCompsByVariant[variant] || bdCompsByVariant['neutral'];
    if (!comp) return null;
    var inst = comp.createInstance();
    var txLayers = inst.findAll(function(n) { return n.type === 'TEXT'; });
    if (txLayers.length > 0) txLayers[0].characters = label;
    return inst;
  }

  // ── Avatar (Type × Size, + online indicator, + group) ──
  try {
    var avs = [];
    var avSizes = [['sm', 32], ['default', 40], ['lg', 48], ['xl', 64]];
    var avColors = [C.secondary,C.primary,C.success,C.warning,C.destructive,C.info];
    var avInitials = ['AB','CD','EF','GH','IJ','KL'];
    // Type=initials × Size × 6 color variants
    for (var avsi = 0; avsi < avSizes.length; avsi++) {
      for (var avci = 0; avci < avColors.length; avci++) {
        var av = figma.createComponent();
        var as2 = avSizes[avsi][1];
        av.name = 'Type=initials, Size=' + avSizes[avsi][0] + ', Color=' + avci;
        av.resize(as2, as2); av.cornerRadius = as2 / 2;
        av.layoutMode = 'HORIZONTAL'; av.primaryAxisSizingMode = 'FIXED'; av.counterAxisSizingMode = 'FIXED';
        av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER';
        fill(av, avColors[avci]);
        av.appendChild(tx(avInitials[avci], 'Bold', Math.round(as2 * 0.38), C.primaryFg));
        avs.push(av);
      }
    }
    // Type=image × Size (muted placeholder)
    for (var avii = 0; avii < avSizes.length; avii++) {
      var avi = figma.createComponent();
      var as3 = avSizes[avii][1];
      avi.name = 'Type=image, Size=' + avSizes[avii][0];
      avi.resize(as3, as3); avi.cornerRadius = as3 / 2;
      avi.layoutMode = 'HORIZONTAL'; avi.primaryAxisSizingMode = 'FIXED'; avi.counterAxisSizingMode = 'FIXED';
      avi.primaryAxisAlignItems = 'CENTER'; avi.counterAxisAlignItems = 'CENTER';
      fill(avi, C.muted);
      avi.appendChild(iconInst('user', C.mutedFg, Math.round(as3 * 0.5)));
      avs.push(avi);
    }
    // Type=online × Size=default/lg (with green indicator dot)
    for (var avoi = 1; avoi <= 2; avoi++) {
      var avo = figma.createComponent();
      var avosz = avSizes[avoi][1];
      avo.name = 'Type=online, Size=' + avSizes[avoi][0];
      avo.resize(avosz + 4, avosz + 4); noFill(avo);
      avo.layoutMode = 'HORIZONTAL'; avo.primaryAxisSizingMode = 'FIXED'; avo.counterAxisSizingMode = 'FIXED';
      // Avatar circle
      var avoCircle = figma.createFrame();
      avoCircle.resize(avosz, avosz); avoCircle.cornerRadius = avosz / 2;
      avoCircle.layoutMode = 'HORIZONTAL'; avoCircle.primaryAxisSizingMode = 'FIXED'; avoCircle.counterAxisSizingMode = 'FIXED';
      avoCircle.primaryAxisAlignItems = 'CENTER'; avoCircle.counterAxisAlignItems = 'CENTER';
      fill(avoCircle, C.secondary);
      avoCircle.appendChild(tx('AN', 'Bold', Math.round(avosz * 0.38), C.primaryFg));
      avo.appendChild(avoCircle);
      // Online dot (absolute)
      var avoDot = figma.createFrame(); var avoDotSz = avoi === 1 ? 10 : 12;
      avoDot.resize(avoDotSz, avoDotSz); avoDot.cornerRadius = avoDotSz / 2;
      fill(avoDot, C.success); stroke(avoDot, C.primaryFg, 2);
      avo.appendChild(avoDot);
      avoDot.layoutPositioning = 'ABSOLUTE'; avoDot.x = avosz - avoDotSz + 4; avoDot.y = avosz - avoDotSz + 4;
      avs.push(avo);
    }
    // Type=group × Count=3/4 (stacked, overlapping)
    var avGroupCounts = [3, 4];
    for (var agci = 0; agci < avGroupCounts.length; agci++) {
      var avGroup = figma.createComponent();
      avGroup.name = 'Type=group, Count=' + avGroupCounts[agci];
      var agSz = 36; var agOvlp = 10;
      var agTotalW = agSz + (avGroupCounts[agci] - 1) * (agSz - agOvlp);
      avGroup.resize(agTotalW, agSz); noFill(avGroup);
      avGroup.layoutMode = 'HORIZONTAL'; avGroup.primaryAxisSizingMode = 'FIXED'; avGroup.counterAxisSizingMode = 'FIXED';
      for (var agi = 0; agi < avGroupCounts[agci]; agi++) {
        var agCircle = figma.createFrame();
        agCircle.resize(agSz, agSz); agCircle.cornerRadius = agSz / 2;
        agCircle.layoutMode = 'HORIZONTAL'; agCircle.primaryAxisSizingMode = 'FIXED'; agCircle.counterAxisSizingMode = 'FIXED';
        agCircle.primaryAxisAlignItems = 'CENTER'; agCircle.counterAxisAlignItems = 'CENTER';
        fill(agCircle, avColors[agi % avColors.length]); stroke(agCircle, C.primaryFg, 2);
        agCircle.appendChild(tx(avInitials[agi % avInitials.length], 'Bold', 13, C.primaryFg));
        avGroup.appendChild(agCircle);
        agCircle.layoutPositioning = 'ABSOLUTE'; agCircle.x = agi * (agSz - agOvlp); agCircle.y = 0;
      }
      avs.push(avGroup);
    }
    y2 = makeSet('Avatar', avs, p2, 60, y2);
    console.log('[OK] Avatar (' + avs.length + ' variants: initials/image/online/group)');
  } catch (e) { console.error('[FAIL] Avatar: ' + e.message); y2 += 60; }

  gridSection('Layout & Content');
  // ── Card ──
  try {
    var cards = [];

    // makeCardSection — note: layoutSizingHorizontal = 'FILL' must be set AFTER
    // the section is appended to its auto-layout parent. Do NOT set it inside here.
    function makeCardSection(label, paddingTop, paddingBottom, paddingH, withBorderTop, content) {
      var sec = figma.createFrame();
      sec.name = label;
      sec.layoutMode = 'VERTICAL'; sec.primaryAxisSizingMode = 'AUTO'; sec.counterAxisSizingMode = 'AUTO';
      sec.paddingLeft = sec.paddingRight = paddingH;
      sec.paddingTop = paddingTop; sec.paddingBottom = paddingBottom;
      sec.itemSpacing = 4; noFill(sec);
      if (withBorderTop) {
        sec.strokes = [{ type: 'SOLID', color: hx(C.border) }];
        sec.strokeTopWeight = 1; sec.strokeRightWeight = 0; sec.strokeBottomWeight = 0; sec.strokeLeftWeight = 0;
        sec.strokeAlign = 'INSIDE';
      }
      for (var si = 0; si < content.length; si++) sec.appendChild(content[si]);
      return sec;
    }

    // ── Default card: Header + Content + Footer ──
    var cdDef = figma.createComponent();
    cdDef.name = 'Variant=Default';
    cdDef.layoutMode = 'VERTICAL'; cdDef.primaryAxisSizingMode = 'AUTO'; cdDef.counterAxisSizingMode = 'AUTO';
    cdDef.paddingLeft = cdDef.paddingRight = 0; cdDef.paddingTop = cdDef.paddingBottom = 0; cdDef.itemSpacing = 0;
    cdDef.resize(320, 10);
    fill(cdDef, C.card); stroke(cdDef, C.border); cdDef.cornerRadius = 12; cdDef.clipsContent = true;
    var cdHdr  = makeCardSection('Header',  24, 16, 24, false, [tx('Card Title', 'SemiBold', 16, C.cardFg), tx('Card description or subtitle goes here.', 'Regular', 14, C.mutedFg)]);
    var cdBody = makeCardSection('Content', 16, 16, 24, false, [tx('Card body content goes here. Add any elements inside this section.', 'Regular', 14, C.mutedFg)]);
    var cdFtr  = makeCardSection('Footer',  16, 20, 24, true,  []);
    // Footer row — append to cdFtr FIRST, then set FILL
    var cdFtrRow = figma.createFrame();
    cdFtrRow.layoutMode = 'HORIZONTAL'; cdFtrRow.primaryAxisSizingMode = 'AUTO'; cdFtrRow.counterAxisSizingMode = 'AUTO';
    cdFtrRow.itemSpacing = 8; cdFtrRow.primaryAxisAlignItems = 'MAX'; noFill(cdFtrRow);
    var cdFtrCancel = figma.createFrame();
    cdFtrCancel.layoutMode = 'HORIZONTAL'; cdFtrCancel.primaryAxisSizingMode = 'AUTO'; cdFtrCancel.counterAxisSizingMode = 'AUTO';
    cdFtrCancel.paddingLeft = cdFtrCancel.paddingRight = 14; cdFtrCancel.paddingTop = cdFtrCancel.paddingBottom = 8;
    cdFtrCancel.cornerRadius = RAD; stroke(cdFtrCancel, C.border); noFill(cdFtrCancel);
    cdFtrCancel.appendChild(tx('Cancelar', 'Medium', 14, C.fg));
    var cdFtrOk = figma.createFrame();
    cdFtrOk.layoutMode = 'HORIZONTAL'; cdFtrOk.primaryAxisSizingMode = 'AUTO'; cdFtrOk.counterAxisSizingMode = 'AUTO';
    cdFtrOk.paddingLeft = cdFtrOk.paddingRight = 14; cdFtrOk.paddingTop = cdFtrOk.paddingBottom = 8;
    cdFtrOk.cornerRadius = RAD; fill(cdFtrOk, C.primary);
    cdFtrOk.appendChild(tx('Confirmar', 'Medium', 14, C.primaryFg));
    cdFtrRow.appendChild(cdFtrCancel); cdFtrRow.appendChild(cdFtrOk);
    cdFtr.appendChild(cdFtrRow);
    cdFtrRow.layoutSizingHorizontal = 'FILL'; // AFTER appendChild
    cdDef.appendChild(cdHdr);  cdHdr.layoutSizingHorizontal  = 'FILL';
    cdDef.appendChild(cdBody); cdBody.layoutSizingHorizontal = 'FILL';
    cdDef.appendChild(cdFtr);  cdFtr.layoutSizingHorizontal  = 'FILL';
    cards.push(cdDef);

    // ── Compact card: Header + Content only ──
    var cdComp = figma.createComponent();
    cdComp.name = 'Variant=Compact';
    cdComp.layoutMode = 'VERTICAL'; cdComp.primaryAxisSizingMode = 'AUTO'; cdComp.counterAxisSizingMode = 'AUTO';
    cdComp.paddingLeft = cdComp.paddingRight = 0; cdComp.paddingTop = cdComp.paddingBottom = 0; cdComp.itemSpacing = 0;
    cdComp.resize(280, 10);
    fill(cdComp, C.card); stroke(cdComp, C.border); cdComp.cornerRadius = 12; cdComp.clipsContent = true;
    var cdcHdr  = makeCardSection('Header',  16, 12, 20, false, [tx('Card Title', 'SemiBold', 16, C.cardFg), tx('Card description goes here.', 'Regular', 14, C.mutedFg)]);
    var cdcBody = makeCardSection('Content', 12, 16, 20, false, [tx('Compact card with no footer. Ideal for grids and lists.', 'Regular', 14, C.mutedFg)]);
    cdComp.appendChild(cdcHdr);  cdcHdr.layoutSizingHorizontal  = 'FILL';
    cdComp.appendChild(cdcBody); cdcBody.layoutSizingHorizontal = 'FILL';
    cards.push(cdComp);

    // ── WithImage card: edge-to-edge image + Header + Content ──
    var cdImg = figma.createComponent();
    cdImg.name = 'Variant=WithImage';
    cdImg.layoutMode = 'VERTICAL'; cdImg.primaryAxisSizingMode = 'AUTO'; cdImg.counterAxisSizingMode = 'AUTO';
    cdImg.paddingLeft = cdImg.paddingRight = 0; cdImg.paddingTop = cdImg.paddingBottom = 0; cdImg.itemSpacing = 0;
    cdImg.resize(320, 10);
    fill(cdImg, C.card); stroke(cdImg, C.border); cdImg.cornerRadius = 12; cdImg.clipsContent = true;
    // Image frame — append first, then set FILL
    var cimgFrame = figma.createFrame();
    cimgFrame.name = 'Image'; cimgFrame.resize(320, 160);
    cimgFrame.layoutMode = 'HORIZONTAL'; cimgFrame.primaryAxisSizingMode = 'FIXED'; cimgFrame.counterAxisSizingMode = 'FIXED';
    cimgFrame.primaryAxisAlignItems = 'CENTER'; cimgFrame.counterAxisAlignItems = 'CENTER';
    fill(cimgFrame, C.muted);
    cimgFrame.appendChild(tx('Imagen', 'Regular', 14, C.mutedFg));
    cdImg.appendChild(cimgFrame);
    cimgFrame.layoutSizingHorizontal = 'FILL'; // AFTER appendChild
    var cdiHdr  = makeCardSection('Header',  20,  8, 24, false, [tx('Card con imagen', 'SemiBold', 16, C.cardFg), tx('La imagen es edge-to-edge sin padding superior.', 'Regular', 14, C.mutedFg)]);
    var cdiBody = makeCardSection('Content',  8, 20, 24, false, [tx('El contenido va aquí debajo del header.', 'Regular', 14, C.mutedFg)]);
    cdImg.appendChild(cdiHdr);  cdiHdr.layoutSizingHorizontal  = 'FILL';
    cdImg.appendChild(cdiBody); cdiBody.layoutSizingHorizontal = 'FILL';
    cards.push(cdImg);

    y2 = makeSet('Card', cards, p2, 60, y2);
    console.log('[OK] Card (3 variants with Header / Content / Footer sections)');
  } catch (e) { console.error('[FAIL] Card: ' + e.message); y2 += 60; }

  gridSection('Feedback & Status');
  // ── Alert ──
  try {
    var alerts = [];
    var alvs = ['default', 'destructive', 'success', 'warning', 'info'];
    var alcm = {
      'default':     [C.muted,    C.border,      C.fg,          'info'],
      'destructive': [C.destructiveSubtle,  C.destructive, C.destructive, 'alert-circle'],
      'success':     [C.successSubtle,  C.success,     C.success,     'check-circle'],
      'warning':     [C.warningSubtle,  C.warning,     C.warning,     'alert-circle'],
      'info':        [C.infoSubtle,  C.info,        C.info,        'info']
    };
    for (var i = 0; i < alvs.length; i++) {
      var al = figma.createComponent();
      al.name = 'Variant=' + alvs[i];
      al.layoutMode = 'HORIZONTAL'; al.primaryAxisSizingMode = 'AUTO'; al.counterAxisSizingMode = 'AUTO';
      al.paddingLeft = al.paddingRight = 16; al.paddingTop = al.paddingBottom = 12; al.itemSpacing = 12;
      var ac = alcm[alvs[i]]; fill(al, ac[0]); stroke(al, ac[1]); al.cornerRadius = RAD;
      al.counterAxisAlignItems = 'CENTER';
      // Icon
      var alIco = iconInst(ac[3], ac[2], 20); alIco.name = 'icon'; al.appendChild(alIco);
      // Text column
      var alTxt = col(4); alTxt.appendChild(tx('Alert Title', 'Bold', 14, ac[2]));
      alTxt.appendChild(tx('This is an alert message for the user.', 'Regular', 13, ac[2]));
      al.appendChild(alTxt);
      alerts.push(al);
    }
    y2 = makeSet('Alert', alerts, p2, 60, y2);
    console.log('[OK] Alert');
  } catch (e) { console.error('[FAIL] Alert: ' + e.message); y2 += 60; }

  // ── Progress ──
  try {
    var prgs = [];
    var prSizes  = [{ name: 'sm', h: 4, w: 240 }, { name: 'default', h: 8, w: 260 }, { name: 'lg', h: 12, w: 280 }];
    var prValues = [25, 50, 75];
    // Size × Value — simple bar
    for (var psi = 0; psi < prSizes.length; psi++) {
      for (var pvi = 0; pvi < prValues.length; pvi++) {
        var pr = figma.createComponent();
        pr.name = 'Size=' + prSizes[psi].name + ', Value=' + prValues[pvi] + '%';
        pr.resize(prSizes[psi].w, prSizes[psi].h); fill(pr, C.muted); pr.cornerRadius = Math.ceil(prSizes[psi].h / 2);
        var prBar = figma.createFrame();
        prBar.resize(Math.round(prSizes[psi].w * prValues[pvi] / 100), prSizes[psi].h);
        fill(prBar, C.primary); prBar.cornerRadius = Math.ceil(prSizes[psi].h / 2);
        pr.appendChild(prBar); prgs.push(pr);
      }
    }
    // Labeled variant — bar with % label and title
    var prLabeledData = [
      { label: 'Documentos revisados', pct: 65 },
      { label: 'Facturas aprobadas',   pct: 40 },
      { label: 'Monto desembolsado',   pct: 82 }
    ];
    for (var pli = 0; pli < prLabeledData.length; pli++) {
      var prl = figma.createComponent();
      prl.name = 'Type=labeled, Label=' + prLabeledData[pli].label;
      prl.layoutMode = 'VERTICAL'; prl.primaryAxisSizingMode = 'AUTO'; prl.counterAxisSizingMode = 'FIXED';
      prl.resize(260, 1); prl.itemSpacing = 6; noFill(prl);
      // Header row: label + pct
      var prlHdr = figma.createFrame(); prlHdr.layoutMode = 'HORIZONTAL';
      prlHdr.primaryAxisSizingMode = 'AUTO'; prlHdr.counterAxisSizingMode = 'AUTO';
      prlHdr.counterAxisAlignItems = 'CENTER'; noFill(prlHdr);
      prlHdr.appendChild(tx(prLabeledData[pli].label, 'Medium', 12, C.fg));
      var prlSp = figma.createFrame(); prlSp.resize(4, 1); noFill(prlSp); prlHdr.appendChild(prlSp); prlSp.layoutGrow = 1;
      prlHdr.appendChild(tx(prLabeledData[pli].pct + '%', 'SemiBold', 12, C.primary));
      prl.appendChild(prlHdr);
      prlHdr.layoutSizingHorizontal = 'FILL';
      // Bar
      var prlTrack = figma.createFrame(); prlTrack.resize(260, 8); fill(prlTrack, C.muted); prlTrack.cornerRadius = 4;
      var prlBar = figma.createFrame(); prlBar.resize(Math.round(260 * prLabeledData[pli].pct / 100), 8); fill(prlBar, C.primary); prlBar.cornerRadius = 4;
      prlTrack.appendChild(prlBar);
      prl.appendChild(prlTrack);
      prlTrack.layoutSizingHorizontal = 'FILL';
      prgs.push(prl);
    }
    // Date variant — Emisión / Vencimiento with progress
    var prDateData = [
      { emisión: '01/01/2025', vencimiento: '31/03/2025', pct: 60, label: 'Factoring op.' },
      { emisión: '15/02/2025', vencimiento: '15/05/2025', pct: 25, label: 'Crédito' }
    ];
    for (var pdi = 0; pdi < prDateData.length; pdi++) {
      var prd = figma.createComponent();
      prd.name = 'Type=dates, Label=' + prDateData[pdi].label;
      prd.layoutMode = 'VERTICAL'; prd.primaryAxisSizingMode = 'AUTO'; prd.counterAxisSizingMode = 'FIXED';
      prd.resize(260, 1); prd.itemSpacing = 6; noFill(prd);
      // Title
      prd.appendChild(tx(prDateData[pdi].label, 'SemiBold', 13, C.fg));
      // Bar
      var prdTrack = figma.createFrame(); prdTrack.resize(260, 8); fill(prdTrack, C.muted); prdTrack.cornerRadius = 4;
      var prdBar = figma.createFrame(); prdBar.resize(Math.round(260 * prDateData[pdi].pct / 100), 8); fill(prdBar, C.primary); prdBar.cornerRadius = 4;
      prdTrack.appendChild(prdBar);
      prd.appendChild(prdTrack);
      prdTrack.layoutSizingHorizontal = 'FILL';
      // Dates row
      var prdDates = figma.createFrame(); prdDates.layoutMode = 'HORIZONTAL';
      prdDates.primaryAxisSizingMode = 'AUTO'; prdDates.counterAxisSizingMode = 'AUTO'; noFill(prdDates);
      prdDates.appendChild(tx('Emisión: ' + prDateData[pdi].emisión, 'Regular', 11, C.mutedFg));
      var prdSp = figma.createFrame(); prdSp.resize(4, 1); noFill(prdSp); prdDates.appendChild(prdSp); prdSp.layoutGrow = 1;
      prdDates.appendChild(tx('Venc.: ' + prDateData[pdi].vencimiento, 'Regular', 11, C.mutedFg));
      prd.appendChild(prdDates);
      prdDates.layoutSizingHorizontal = 'FILL';
      prgs.push(prd);
    }
    y2 = makeSet('Progress', prgs, p2, 60, y2);
    console.log('[OK] Progress (' + prgs.length + ' variants)');
  } catch (e) { console.error('[FAIL] Progress: ' + e.message); y2 += 60; }

  // ── Toast ──
  try {
    var toasts = [];
    var tsvs = ['default', 'destructive', 'success'];
    var tscm = {
      'default':     [C.popover,     C.popoverFg, C.border],
      'destructive': [C.destructive, C.destructiveFg, C.destructive],
      'success':     [C.success,     C.successFg, C.success]
    };
    for (var i = 0; i < tsvs.length; i++) {
      var ts2 = figma.createComponent();
      ts2.name = 'Variant=' + tsvs[i];
      ts2.layoutMode = 'HORIZONTAL'; ts2.resize(340, 48);
      ts2.primaryAxisSizingMode = 'FIXED'; ts2.counterAxisSizingMode = 'FIXED';
      ts2.paddingLeft = ts2.paddingRight = 16; ts2.primaryAxisAlignItems = 'SPACE_BETWEEN'; ts2.counterAxisAlignItems = 'CENTER';
      var tc = tscm[tsvs[i]]; fill(ts2, tc[0]); stroke(ts2, tc[2]); ts2.cornerRadius = RAD; shadow(ts2);
      ts2.appendChild(tx('Toast message here', 'Medium', 14, tc[1]));
      var xIco = iconInst('x', null, 16); ts2.appendChild(xIco);
      toasts.push(ts2);
    }
    y2 = makeSet('Toast', toasts, p2, 60, y2);
    console.log('[OK] Toast');
  } catch (e) { console.error('[FAIL] Toast: ' + e.message); y2 += 60; }

  // ── Dialog ──
  try {
    var dlgs = [];
    var dlszs = ['sm', 'default', 'lg'];
    for (var i = 0; i < dlszs.length; i++) {
      var dl = figma.createComponent();
      dl.name = 'Size=' + dlszs[i];
      dl.layoutMode = 'VERTICAL'; dl.primaryAxisSizingMode = 'AUTO'; dl.counterAxisSizingMode = 'AUTO';
      dl.paddingLeft = dl.paddingRight = 24; dl.paddingTop = 24; dl.paddingBottom = 16; dl.itemSpacing = 16;
      fill(dl, C.popover); stroke(dl, C.border); dl.cornerRadius = 12; shadow(dl, 8, 24, 0.15);
      dl.appendChild(tx('Dialog Title', 'Bold', 18, C.popoverFg));
      dl.appendChild(tx('Dialog body content goes here. Confirm your action below.', 'Regular', 14, C.mutedFg));
      var dlFt = row(8);
      var dlC = row(0); dlC.paddingLeft = dlC.paddingRight = 16; dlC.paddingTop = dlC.paddingBottom = 8;
      dlC.primaryAxisAlignItems = 'CENTER'; dlC.counterAxisAlignItems = 'CENTER'; stroke(dlC, C.border); dlC.cornerRadius = RAD;
      dlC.appendChild(tx('Cancel', 'Medium', 14, C.fg)); dlFt.appendChild(dlC);
      var dlO = row(0); dlO.paddingLeft = dlO.paddingRight = 16; dlO.paddingTop = dlO.paddingBottom = 8;
      dlO.primaryAxisAlignItems = 'CENTER'; dlO.counterAxisAlignItems = 'CENTER'; fill(dlO, C.primary); dlO.cornerRadius = RAD;
      dlO.appendChild(tx('Confirm', 'Medium', 14, C.primaryFg)); dlFt.appendChild(dlO);
      dl.appendChild(dlFt); dlgs.push(dl);
    }
    y2 = makeSet('Dialog', dlgs, p2, 60, y2);
    console.log('[OK] Dialog');
  } catch (e) { console.error('[FAIL] Dialog: ' + e.message); y2 += 60; }

  gridSection('Navigation');
  // ── Tabs (Style × Size × Count = 27 variants) ──
  try {
    var tabsList = [];
    var tabStyles2 = ['default', 'underline', 'pill'];
    var tabCounts  = [2, 3, 4];
    var tNames     = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];
    // Size tokens: [tabPaddingH, tabPaddingV, fontSize, containerPad, cornerRadius]
    var tabSizes = {
      sm:      [10, 5,  12, 3, 6],
      default: [16, 8,  14, 4, RAD],
      lg:      [20, 10, 16, 5, RAD]
    };
    var tabSizeKeys = ['sm', 'default', 'lg'];

    for (var tsi2 = 0; tsi2 < tabStyles2.length; tsi2++) {
      for (var tszk = 0; tszk < tabSizeKeys.length; tszk++) {
        for (var tci = 0; tci < tabCounts.length; tci++) {
          var tStyle = tabStyles2[tsi2];
          var tSzKey = tabSizeKeys[tszk];
          var tSz    = tabSizes[tSzKey];
          var tb = figma.createComponent();
          tb.name = 'Style=' + tStyle + ', Size=' + tSzKey + ', Count=' + tabCounts[tci];
          tb.layoutMode = 'HORIZONTAL'; tb.primaryAxisSizingMode = 'AUTO'; tb.counterAxisSizingMode = 'AUTO';
          tb.itemSpacing = tStyle === 'underline' ? 0 : 4;
          if (tStyle === 'default') {
            fill(tb, C.muted); tb.cornerRadius = tSz[4];
            tb.paddingLeft = tb.paddingRight = tSz[3]; tb.paddingTop = tb.paddingBottom = tSz[3];
          } else if (tStyle === 'underline') {
            noFill(tb); tb.paddingBottom = 0;
            tb.strokes = [{ type: 'SOLID', color: hx(C.border) }];
            tb.strokeWeight = 1; tb.strokeAlign = 'OUTSIDE';
          } else {
            fill(tb, C.muted); tb.cornerRadius = 99;
            tb.paddingLeft = tb.paddingRight = tSz[3]; tb.paddingTop = tb.paddingBottom = tSz[3];
          }
          for (var tni = 0; tni < tabCounts[tci]; tni++) {
            var tab = row(0);
            tab.paddingLeft = tab.paddingRight = tStyle === 'underline' ? tSz[0] - 4 : tSz[0];
            tab.paddingTop = tab.paddingBottom = tSz[1];
            tab.primaryAxisAlignItems = 'CENTER'; tab.counterAxisAlignItems = 'CENTER';
            if (tStyle === 'pill') tab.cornerRadius = 99;
            if (tni === 0) {
              if (tStyle === 'default') {
                fill(tab, C.bg); shadow(tab, 1, 2, 0.05); tab.cornerRadius = tSz[4] - 2;
              } else if (tStyle === 'underline') {
                noFill(tab);
                tab.strokes = [{ type: 'SOLID', color: hx(C.primary) }];
                tab.strokeWeight = 2; tab.strokeAlign = 'OUTSIDE';
              } else {
                fill(tab, C.primary);
              }
              tab.appendChild(tx(tNames[tni], 'Medium', tSz[2], tStyle === 'pill' ? C.primaryFg : C.fg));
            } else {
              noFill(tab);
              tab.appendChild(tx(tNames[tni], 'Regular', tSz[2], C.mutedFg));
            }
            tb.appendChild(tab);
          }
          tabsList.push(tb);
        }
      }
    }
    y2 = makeSet('Tabs', tabsList, p2, 60, y2);
    console.log('[OK] Tabs (' + tabsList.length + ' variants: 3 styles × 3 sizes × 3 counts)');
  } catch (e) { console.error('[FAIL] Tabs: ' + e.message); y2 += 60; }

  // ── Breadcrumb (Items × Home style: text / icon) ──
  try {
    var bcs2 = [];
    var bcHomeStyles = ['text', 'icon'];
    for (var bhi = 0; bhi < bcHomeStyles.length; bhi++) {
      for (var n3 = 2; n3 <= 4; n3++) {
        var bc3 = figma.createComponent();
        bc3.name = 'Items=' + n3 + ', Home=' + bcHomeStyles[bhi];
        bc3.layoutMode = 'HORIZONTAL'; bc3.primaryAxisSizingMode = 'AUTO'; bc3.counterAxisSizingMode = 'AUTO';
        bc3.itemSpacing = 8; bc3.counterAxisAlignItems = 'CENTER'; noFill(bc3);
        var bcN = ['Home', 'Products', 'Category', 'Item'];
        for (var j = 0; j < n3; j++) {
          if (j > 0) {
            var chevI = iconInst('chevron-right', C.mutedFg, 14);
            bc3.appendChild(chevI);
          }
          if (j === 0 && bcHomeStyles[bhi] === 'icon') {
            bc3.appendChild(iconInst('home', C.mutedFg, 16));
          } else {
            bc3.appendChild(tx(bcN[j], j === n3 - 1 ? 'Medium' : 'Regular', 14, j === n3 - 1 ? C.fg : C.mutedFg));
          }
        }
        bcs2.push(bc3);
      }
    }
    y2 = makeSet('Breadcrumb', bcs2, p2, 60, y2);
    console.log('[OK] Breadcrumb (' + bcs2.length + ' variants: 3 items × 2 home styles)');
  } catch (e) { console.error('[FAIL] Breadcrumb: ' + e.message); y2 += 60; }

  // ── Pagination ──
  try {
    var pags = [];
    var pagN = figma.createComponent(); pagN.name = 'Type=numbered';
    pagN.layoutMode = 'HORIZONTAL'; pagN.primaryAxisSizingMode = 'AUTO'; pagN.counterAxisSizingMode = 'AUTO';
    pagN.itemSpacing = 4; pagN.counterAxisAlignItems = 'CENTER'; noFill(pagN);
    // Prev button
    var pnPrev = figma.createFrame(); pnPrev.layoutMode = 'HORIZONTAL'; pnPrev.resize(36, 36);
    pnPrev.primaryAxisSizingMode = 'FIXED'; pnPrev.counterAxisSizingMode = 'FIXED';
    pnPrev.primaryAxisAlignItems = 'CENTER'; pnPrev.counterAxisAlignItems = 'CENTER';
    pnPrev.cornerRadius = RAD; noFill(pnPrev); stroke(pnPrev, C.border);
    pnPrev.appendChild(iconInst('chevron-left', C.fg, 16)); pagN.appendChild(pnPrev);
    // Page number buttons
    for (var i = 1; i <= 5; i++) {
      var pb = figma.createFrame(); pb.layoutMode = 'HORIZONTAL'; pb.resize(36, 36);
      pb.primaryAxisSizingMode = 'FIXED'; pb.counterAxisSizingMode = 'FIXED';
      pb.primaryAxisAlignItems = 'CENTER'; pb.counterAxisAlignItems = 'CENTER'; pb.cornerRadius = RAD;
      if (i === 3) { fill(pb, C.primary); pb.appendChild(tx(String(i), 'Medium', 14, C.primaryFg)); }
      else { noFill(pb); stroke(pb, C.border); pb.appendChild(tx(String(i), 'Regular', 14, C.fg)); }
      pagN.appendChild(pb);
    }
    // Next button
    var pnNext = figma.createFrame(); pnNext.layoutMode = 'HORIZONTAL'; pnNext.resize(36, 36);
    pnNext.primaryAxisSizingMode = 'FIXED'; pnNext.counterAxisSizingMode = 'FIXED';
    pnNext.primaryAxisAlignItems = 'CENTER'; pnNext.counterAxisAlignItems = 'CENTER';
    pnNext.cornerRadius = RAD; noFill(pnNext); stroke(pnNext, C.border);
    pnNext.appendChild(iconInst('chevron-right', C.fg, 16)); pagN.appendChild(pnNext);
    pags.push(pagN);
    var pagS = figma.createComponent(); pagS.name = 'Type=simple';
    pagS.layoutMode = 'HORIZONTAL'; pagS.primaryAxisSizingMode = 'AUTO'; pagS.counterAxisSizingMode = 'AUTO';
    pagS.itemSpacing = 8; noFill(pagS);
    var pprev = row(4); pprev.paddingLeft = pprev.paddingRight = 12; pprev.paddingTop = pprev.paddingBottom = 8;
    pprev.primaryAxisAlignItems = 'CENTER'; pprev.counterAxisAlignItems = 'CENTER'; stroke(pprev, C.border); pprev.cornerRadius = RAD;
    pprev.appendChild(iconInst('chevron-left', null, 14)); pprev.appendChild(tx('Prev', 'Medium', 14, C.fg)); pagS.appendChild(pprev);
    var pnext = row(4); pnext.paddingLeft = pnext.paddingRight = 12; pnext.paddingTop = pnext.paddingBottom = 8;
    pnext.primaryAxisAlignItems = 'CENTER'; pnext.counterAxisAlignItems = 'CENTER'; stroke(pnext, C.border); pnext.cornerRadius = RAD;
    pnext.appendChild(tx('Next', 'Medium', 14, C.fg)); pnext.appendChild(iconInst('chevron-right', null, 14)); pagS.appendChild(pnext);
    pags.push(pagS);
    y2 = makeSet('Pagination', pags, p2, 60, y2);
    console.log('[OK] Pagination');
  } catch (e) { console.error('[FAIL] Pagination: ' + e.message); y2 += 60; }

  // ── Separator ──
  try {
    var seps = [];
    var sepH = figma.createComponent(); sepH.name = 'Orientation=horizontal'; sepH.resize(260, 1); fill(sepH, C.border); seps.push(sepH);
    var sepV = figma.createComponent(); sepV.name = 'Orientation=vertical'; sepV.resize(1, 40); fill(sepV, C.border); seps.push(sepV);
    y2 = makeSet('Separator', seps, p2, 60, y2);
    console.log('[OK] Separator');
  } catch (e) { console.error('[FAIL] Separator: ' + e.message); y2 += 60; }

  // ── Tooltip (Direction=top/bottom/left/right × Icon=false/true = 8 variants) ──
  // Arrow is a solid vector triangle pointing toward the trigger element.
  try {
    var tips = [];
    var tpDirs    = ['top', 'bottom', 'left', 'right'];
    var tpIcons   = [false, true];
    var AW = 10; var AH = 6; // arrow width and height (px)

    // SVG-style vector path for each direction's triangle
    // "top"    → tooltip above trigger → arrow at BOTTOM pointing ↓
    // "bottom" → tooltip below trigger → arrow at TOP pointing ↑
    // "left"   → tooltip left of trigger → arrow at RIGHT pointing →
    // "right"  → tooltip right of trigger → arrow at LEFT pointing ←
    var tpArrowPath = {
      top:    { data: 'M 0 0 L ' + (AW/2) + ' ' + AH + ' L ' + AW + ' 0 Z', w: AW, h: AH },
      bottom: { data: 'M 0 ' + AH + ' L ' + (AW/2) + ' 0 L ' + AW + ' ' + AH + ' Z', w: AW, h: AH },
      left:   { data: 'M 0 0 L ' + AH + ' ' + (AW/2) + ' L 0 ' + AW + ' Z', w: AH, h: AW },
      right:  { data: 'M ' + AH + ' 0 L 0 ' + (AW/2) + ' L ' + AH + ' ' + AW + ' Z', w: AH, h: AW }
    };

    for (var tpdi = 0; tpdi < tpDirs.length; tpdi++) {
      for (var tpii = 0; tpii < tpIcons.length; tpii++) {
        var tpDir    = tpDirs[tpdi];
        var tpHasIco = tpIcons[tpii];
        var tpAp     = tpArrowPath[tpDir];
        var isVert   = (tpDir === 'top' || tpDir === 'bottom');

        // Outer container — no fill, aligns bubble + arrow
        var tp = figma.createComponent();
        tp.name = 'Direction=' + tpDir + ', Icon=' + (tpHasIco ? 'true' : 'false');
        tp.layoutMode = isVert ? 'VERTICAL' : 'HORIZONTAL';
        tp.primaryAxisSizingMode = 'AUTO'; tp.counterAxisSizingMode = 'AUTO';
        tp.primaryAxisAlignItems = 'CENTER'; tp.counterAxisAlignItems = 'CENTER';
        tp.itemSpacing = 0; noFill(tp);

        // Bubble
        var tpBubble = figma.createFrame();
        tpBubble.name = 'bubble';
        tpBubble.layoutMode = 'HORIZONTAL';
        tpBubble.primaryAxisSizingMode = 'AUTO'; tpBubble.counterAxisSizingMode = 'AUTO';
        tpBubble.paddingLeft = tpBubble.paddingRight = 10;
        tpBubble.paddingTop  = tpBubble.paddingBottom = 6;
        tpBubble.itemSpacing = 6; tpBubble.counterAxisAlignItems = 'CENTER';
        fill(tpBubble, C.fg); tpBubble.cornerRadius = 6;
        if (tpHasIco) tpBubble.appendChild(iconInst('info', C.bg, 12));
        tpBubble.appendChild(tx('Tooltip text', 'Regular', 12, C.bg));

        // Arrow vector
        var tpArrow = figma.createVector();
        tpArrow.name = 'arrow';
        tpArrow.resize(tpAp.w, tpAp.h);
        tpArrow.vectorPaths = [{ windingRule: 'NONZERO', data: tpAp.data }];
        tpArrow.fills   = [{ type: 'SOLID', color: hx(C.fg) }];
        tpArrow.strokes = [];
        // Sizing inside auto-layout parent
        tpArrow.layoutSizingHorizontal = 'FIXED';
        tpArrow.layoutSizingVertical   = 'FIXED';

        // Order: arrow wraps around the bubble edge closest to the trigger
        if (tpDir === 'top') {
          // Arrow at bottom (tooltip is above)
          tp.appendChild(tpBubble); tp.appendChild(tpArrow);
        } else if (tpDir === 'bottom') {
          // Arrow at top (tooltip is below)
          tp.appendChild(tpArrow); tp.appendChild(tpBubble);
        } else if (tpDir === 'left') {
          // Arrow at right (tooltip is to the left)
          tp.appendChild(tpBubble); tp.appendChild(tpArrow);
        } else {
          // Arrow at left (tooltip is to the right)
          tp.appendChild(tpArrow); tp.appendChild(tpBubble);
        }

        tips.push(tp);
      }
    }
    y2 = makeSet('Tooltip', tips, p2, 60, y2);
    console.log('[OK] Tooltip (8 variants: 4 directions × 2 icon states)');
  } catch (e) { console.error('[FAIL] Tooltip: ' + e.message); y2 += 60; }

  // ── Sheet ──
  try {
    var sheets = [];
    var shS = ['left', 'right', 'top', 'bottom'];
    for (var i = 0; i < shS.length; i++) {
      var sh3 = figma.createComponent();
      sh3.name = 'Side=' + shS[i];
      var sv = shS[i] === 'left' || shS[i] === 'right';
      sh3.layoutMode = 'VERTICAL'; sh3.resize(sv ? 320 : 480, sv ? 400 : 240);
      sh3.primaryAxisSizingMode = 'FIXED'; sh3.counterAxisSizingMode = 'FIXED';
      sh3.paddingLeft = sh3.paddingRight = 24; sh3.paddingTop = sh3.paddingBottom = 24; sh3.itemSpacing = 16;
      fill(sh3, C.popover); shadow(sh3, 0, 16, 0.15);
      sh3.appendChild(tx('Sheet Title', 'Bold', 18, C.popoverFg));
      sh3.appendChild(tx('Sheet panel (' + shS[i] + ' side)', 'Regular', 14, C.mutedFg));
      sheets.push(sh3);
    }
    y2 = makeSet('Sheet', sheets, p2, 60, y2);
    console.log('[OK] Sheet');
  } catch (e) { console.error('[FAIL] Sheet: ' + e.message); y2 += 60; }

  // ── DropdownMenu ──
  try {
    var dds = [];
    var ddN = [3, 5];
    var ddNames = ['Edit', 'Duplicate', 'Archive', 'Move to...', 'Delete'];
    var ddIcons = ['edit', 'copy', 'folder', 'arrow-right', 'trash-2'];
    for (var i = 0; i < ddN.length; i++) {
      var dd = figma.createComponent();
      dd.name = 'Items=' + ddN[i];
      dd.layoutMode = 'VERTICAL'; dd.primaryAxisSizingMode = 'AUTO'; dd.counterAxisSizingMode = 'AUTO';
      dd.paddingTop = dd.paddingBottom = 4;
      fill(dd, C.popover); stroke(dd, C.border); dd.cornerRadius = RAD; shadow(dd);
      for (var j = 0; j < ddN[i]; j++) {
        var di = row(8); di.resize(220, 36); di.layoutSizingHorizontal = 'FIXED'; di.layoutSizingVertical = 'FIXED';
        di.paddingLeft = di.paddingRight = 12; di.counterAxisAlignItems = 'CENTER';
        di.appendChild(iconInst(ddIcons[j], null, 16));
        di.appendChild(tx(ddNames[j], 'Regular', 14, ddNames[j] === 'Delete' ? C.destructive : C.popoverFg));
        dd.appendChild(di);
      }
      dds.push(dd);
    }
    y2 = makeSet('DropdownMenu', dds, p2, 60, y2);
    console.log('[OK] DropdownMenu');
  } catch (e) { console.error('[FAIL] DropdownMenu: ' + e.message); y2 += 60; }

  // ── EmptyState ──
  try {
    var ess = [];
    var esD = [
      ['default', 'No items yet',  'Create your first item to get started.', 'Create',  'plus'],
      ['search',  'No results',    'Try adjusting your search criteria.',    'Clear',   'search'],
      ['error',   'Something broke','An error occurred. Please try again.',  'Retry',   'refresh-cw']
    ];
    for (var i = 0; i < esD.length; i++) {
      var es = figma.createComponent();
      es.name = 'Variant=' + esD[i][0];
      es.layoutMode = 'VERTICAL'; es.primaryAxisSizingMode = 'AUTO'; es.counterAxisSizingMode = 'AUTO';
      es.paddingLeft = es.paddingRight = 32; es.paddingTop = es.paddingBottom = 48; es.itemSpacing = 16;
      es.counterAxisAlignItems = 'CENTER'; noFill(es);
      // Icon
      var esIco = iconInst(esD[i][4], null, 40); es.appendChild(esIco);
      es.appendChild(tx(esD[i][1], 'Bold', 18, C.fg));
      es.appendChild(tx(esD[i][2], 'Regular', 14, C.mutedFg));
      var cta = row(0); cta.paddingLeft = cta.paddingRight = 16; cta.paddingTop = cta.paddingBottom = 8;
      cta.primaryAxisAlignItems = 'CENTER'; cta.counterAxisAlignItems = 'CENTER';
      fill(cta, C.primary); cta.cornerRadius = RAD;
      cta.appendChild(tx(esD[i][3], 'Medium', 14, C.primaryFg));
      es.appendChild(cta); ess.push(es);
    }
    y2 = makeSet('EmptyState', ess, p2, 60, y2);
    console.log('[OK] EmptyState');
  } catch (e) { console.error('[FAIL] EmptyState: ' + e.message); y2 += 60; }

  // ── Calendar ──
  try {
    var cals = [];
    var calTypes = ['single', 'range'];
    for (var ci = 0; ci < calTypes.length; ci++) {
      var cal = figma.createComponent();
      cal.name = 'Type=' + calTypes[ci];
      cal.layoutMode = 'VERTICAL'; cal.primaryAxisSizingMode = 'AUTO'; cal.counterAxisSizingMode = 'AUTO';
      cal.paddingLeft = cal.paddingRight = 12; cal.paddingTop = cal.paddingBottom = 12; cal.itemSpacing = 4;
      fill(cal, C.popover); stroke(cal, C.border); cal.cornerRadius = RAD;
      var mRow = row(8); mRow.counterAxisAlignItems = 'CENTER';
      mRow.appendChild(iconInst('chevron-left', null, 16));
      mRow.appendChild(tx('March 2026', 'Bold', 14, C.fg));
      mRow.appendChild(iconInst('chevron-right', null, 16));
      cal.appendChild(mRow);
      var wRow = row(4);
      var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      for (var d = 0; d < 7; d++) { var dTx = tx(days[d], 'Medium', 11, C.mutedFg); dTx.resize(28, 20); dTx.textAlignHorizontal = 'CENTER'; wRow.appendChild(dTx); }
      cal.appendChild(wRow);
      for (var r = 0; r < 5; r++) {
        var gRow = row(4);
        for (var c2 = 0; c2 < 7; c2++) {
          var dn = r * 7 + c2 - 1;
          var cell = figma.createFrame(); cell.layoutMode = 'HORIZONTAL'; cell.resize(28, 28);
          cell.primaryAxisAlignItems = 'CENTER'; cell.counterAxisAlignItems = 'CENTER'; cell.cornerRadius = 6;
          if (dn >= 1 && dn <= 31) {
            if (dn === 15) { fill(cell, C.primary); cell.appendChild(tx(String(dn), 'Medium', 12, C.primaryFg)); }
            else if (calTypes[ci] === 'range' && dn >= 10 && dn <= 20) { fill(cell, C.accent); cell.appendChild(tx(String(dn), 'Regular', 12, C.accentFg)); }
            else { noFill(cell); cell.appendChild(tx(String(dn), 'Regular', 12, C.fg)); }
          } else { noFill(cell); }
          gRow.appendChild(cell);
        }
        cal.appendChild(gRow);
      }
      cals.push(cal);
    }
    y2 = makeSet('Calendar', cals, p2, 60, y2);
    console.log('[OK] Calendar');
  } catch (e) { console.error('[FAIL] Calendar: ' + e.message); y2 += 60; }

  // ── Accordion (2 variants: collapsed, expanded) ──
  try {
    var accs = [];
    var accStates = ['collapsed', 'expanded'];
    for (var ai = 0; ai < 2; ai++) {
      var ac = figma.createComponent();
      ac.name = 'State=' + accStates[ai];
      ac.layoutMode = 'VERTICAL'; ac.counterAxisSizingMode = 'FIXED';
      ac.resize(360, 1); ac.primaryAxisSizingMode = 'AUTO'; ac.itemSpacing = 0;
      noFill(ac);
      // 3 items
      for (var aci = 0; aci < 3; aci++) {
 var acItem = col(0);
        // trigger row
 var acTrig = row(0);
        acTrig.paddingTop = acTrig.paddingBottom = 12;
        acTrig.counterAxisAlignItems = 'CENTER';
        var acLabel = tx('Accordion Item ' + (aci + 1), 'Medium', 14, C.fg);
        acTrig.appendChild(acLabel);
        var acChev = iconInst(ai === 1 && aci === 0 ? 'chevron-up' : 'chevron-down', C.mutedFg, 16);
        acTrig.appendChild(acChev);
        acItem.appendChild(acTrig);
        acTrig.layoutSizingHorizontal = 'FILL';
        // content (only first item if expanded)
        if (ai === 1 && aci === 0) {
          var acContent = tx('Yes. It adheres to the WAI-ARIA design pattern.', 'Regular', 14, C.mutedFg);
          acContent.resize(340, 1); acContent.textAutoResize = 'HEIGHT';
 var acCWrap = col(0);
          acCWrap.paddingBottom = 12;
          acCWrap.appendChild(acContent);
          acItem.appendChild(acCWrap);
          acCWrap.layoutSizingHorizontal = 'FILL';
        }
        // bottom border
        var acBord = figma.createFrame(); acBord.resize(360, 1);
 acBord.layoutMode = 'HORIZONTAL';
        fill(acBord, C.border);
        acItem.appendChild(acBord);
        acBord.layoutSizingHorizontal = 'FILL';
        ac.appendChild(acItem);
        acItem.layoutSizingHorizontal = 'FILL';
      }
      accs.push(ac);
    }
    y2 = makeSet('Accordion', accs, p2, 60, y2);
    console.log('[OK] Accordion');
  } catch (e) { console.error('[FAIL] Accordion: ' + e.message); y2 += 60; }

  // ── AlertDialog (2 variants: default, destructive) ──
  try {
    var adlgs = [];
    var adTypes = [
      ['default', 'Are you absolutely sure?', 'This action cannot be undone.', 'Continue', C.primary, C.primaryFg],
      ['destructive', 'Delete this operation?', 'This will permanently delete the operation and all associated invoices.', 'Delete', C.destructive, C.primaryFg]
    ];
    for (var adi = 0; adi < adTypes.length; adi++) {
      var ad = figma.createComponent();
      ad.name = 'Variant=' + adTypes[adi][0];
      ad.layoutMode = 'VERTICAL'; ad.primaryAxisSizingMode = 'AUTO'; ad.counterAxisSizingMode = 'AUTO';
      ad.paddingLeft = ad.paddingRight = 24; ad.paddingTop = ad.paddingBottom = 24;
      ad.itemSpacing = 16; fill(ad, C.card); stroke(ad, C.border); ad.cornerRadius = 12;
      shadow(ad, 8, 24, 0.15);
      ad.appendChild(tx(adTypes[adi][1], 'Bold', 18, C.cardFg));
      var adDesc = tx(adTypes[adi][2], 'Regular', 14, C.mutedFg);
      adDesc.resize(360, 1); adDesc.textAutoResize = 'HEIGHT';
      ad.appendChild(adDesc);
      var adBtns = row(8); adBtns.primaryAxisAlignItems = 'MAX';
 adBtns.layoutMode = 'HORIZONTAL';
      var adCancel = row(0); adCancel.paddingLeft = adCancel.paddingRight = 16; adCancel.paddingTop = adCancel.paddingBottom = 8;
      adCancel.primaryAxisAlignItems = 'CENTER'; adCancel.counterAxisAlignItems = 'CENTER';
      stroke(adCancel, C.border); adCancel.cornerRadius = RAD;
      adCancel.appendChild(tx('Cancel', 'Medium', 14, C.fg)); adBtns.appendChild(adCancel);
      var adConfirm = row(0); adConfirm.paddingLeft = adConfirm.paddingRight = 16; adConfirm.paddingTop = adConfirm.paddingBottom = 8;
      adConfirm.primaryAxisAlignItems = 'CENTER'; adConfirm.counterAxisAlignItems = 'CENTER';
      fill(adConfirm, adTypes[adi][4]); adConfirm.cornerRadius = RAD;
      adConfirm.appendChild(tx(adTypes[adi][3], 'Medium', 14, adTypes[adi][5])); adBtns.appendChild(adConfirm);
      ad.appendChild(adBtns);
      adBtns.layoutSizingHorizontal = 'FILL';
      adlgs.push(ad);
    }
    y2 = makeSet('AlertDialog', adlgs, p2, 60, y2);
    console.log('[OK] AlertDialog');
  } catch (e) { console.error('[FAIL] AlertDialog: ' + e.message); y2 += 60; }


  // ── Combobox (2 variants: closed, open) ──
  try {
    var combos = [];
    for (var cbi = 0; cbi < 2; cbi++) {
      var cb = figma.createComponent();
      cb.name = 'State=' + (cbi === 0 ? 'closed' : 'open');
      cb.layoutMode = 'VERTICAL'; cb.primaryAxisSizingMode = 'AUTO'; cb.counterAxisSizingMode = 'AUTO';
      cb.itemSpacing = 4;
      // trigger button
      var cbTrig = row(0); cbTrig.resize(240, 36); cbTrig.layoutSizingHorizontal = 'FIXED';
      cbTrig.paddingLeft = cbTrig.paddingRight = 12; cbTrig.counterAxisAlignItems = 'CENTER';
      fill(cbTrig, C.bg); stroke(cbTrig, C.input); cbTrig.cornerRadius = RAD;
      var cbPlaceholder = tx(cbi === 0 ? 'Select framework...' : 'Next.js', 'Regular', 14, cbi === 0 ? C.mutedFg : C.fg);
      cbTrig.appendChild(cbPlaceholder);
      var cbTrigSp = figma.createFrame(); cbTrigSp.resize(4, 1); noFill(cbTrigSp);
      cbTrig.appendChild(cbTrigSp); cbTrigSp.layoutGrow = 1;
      cbTrig.appendChild(iconInst('chevron-down', C.mutedFg, 14));
      cb.appendChild(cbTrig);
      // dropdown if open
      if (cbi === 1) {
        var cbDrop = col(0);
        cbDrop.primaryAxisSizingMode = 'AUTO'; cbDrop.counterAxisSizingMode = 'AUTO';
        cbDrop.layoutSizingHorizontal = 'FIXED';
        fill(cbDrop, C.popover); stroke(cbDrop, C.border); cbDrop.cornerRadius = RAD;
        cbDrop.paddingTop = cbDrop.paddingBottom = 4;
        shadow(cbDrop, 4, 12, 0.1);
        // search
        var cbSearch = row(8); cbSearch.layoutMode = 'HORIZONTAL';
        cbSearch.paddingLeft = cbSearch.paddingRight = 8; cbSearch.paddingTop = cbSearch.paddingBottom = 8;
        cbSearch.counterAxisAlignItems = 'CENTER';
        cbSearch.appendChild(iconInst('search', C.mutedFg, 14));
        cbSearch.appendChild(tx('Search framework...', 'Regular', 14, C.mutedFg));
        cbDrop.appendChild(cbSearch);
        cbSearch.layoutSizingHorizontal = 'FILL';
        var cbSep = figma.createFrame(); cbSep.resize(240, 1); cbSep.layoutMode = 'HORIZONTAL'; cbSep.primaryAxisSizingMode = 'FIXED'; cbSep.counterAxisSizingMode = 'FIXED'; fill(cbSep, C.border);
        cbDrop.appendChild(cbSep);
        cbSep.layoutSizingHorizontal = 'FILL';
        var cbItems = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
        for (var cbii = 0; cbii < cbItems.length; cbii++) {
          var cbItem = row(8); cbItem.layoutMode = 'HORIZONTAL';
          cbItem.paddingLeft = cbItem.paddingRight = 8; cbItem.paddingTop = cbItem.paddingBottom = 6;
          cbItem.counterAxisAlignItems = 'CENTER';
          if (cbii === 0) fill(cbItem, C.accent);
          cbItem.appendChild(iconInst(cbii === 0 ? 'check' : 'circle', cbii === 0 ? C.fg : C.bg, 14));
          cbItem.appendChild(tx(cbItems[cbii], 'Regular', 14, C.fg));
          cbDrop.appendChild(cbItem);
          cbItem.layoutSizingHorizontal = 'FILL';
        }
        cbDrop.resize(240, cbDrop.height);
        cb.appendChild(cbDrop);
      }
      combos.push(cb);
    }
    y2 = makeSet('Combobox', combos, p2, 60, y2);
    console.log('[OK] Combobox');
  } catch (e) { console.error('[FAIL] Combobox: ' + e.message); y2 += 60; }

  // ── DatePicker (2 variants: placeholder, selected) ──
  try {
    var dps = [];
    for (var dpi = 0; dpi < 2; dpi++) {
      var dp = figma.createComponent();
      dp.name = 'State=' + (dpi === 0 ? 'placeholder' : 'selected');
      dp.layoutMode = 'HORIZONTAL'; dp.primaryAxisSizingMode = 'FIXED'; dp.counterAxisSizingMode = 'AUTO';
      dp.resize(240, 36); dp.paddingLeft = dp.paddingRight = 12; dp.counterAxisAlignItems = 'CENTER';
      dp.itemSpacing = 8;
      fill(dp, C.bg); stroke(dp, C.input); dp.cornerRadius = RAD;
      dp.appendChild(iconInst('calendar', C.mutedFg, 16));
      dp.appendChild(tx(dpi === 0 ? 'Pick a date' : 'Jan 20, 2026', 'Regular', 14, dpi === 0 ? C.mutedFg : C.fg));
      dps.push(dp);
    }
    y2 = makeSet('DatePicker', dps, p2, 60, y2);
    console.log('[OK] DatePicker');
  } catch (e) { console.error('[FAIL] DatePicker: ' + e.message); y2 += 60; }

  // ── Drawer (4 variants: top, right, bottom, left) ──
  try {
    var dws = [];
    var dwSides = ['top', 'right', 'bottom', 'left'];
    var dwIcons = ['chevron-up', 'panel-right', 'chevron-down', 'panel-left'];
    for (var dwi = 0; dwi < 4; dwi++) {
      var dw = figma.createComponent();
      dw.name = 'Side=' + dwSides[dwi];
      dw.layoutMode = 'VERTICAL'; dw.primaryAxisSizingMode = 'AUTO'; dw.counterAxisSizingMode = 'AUTO';
      dw.paddingLeft = dw.paddingRight = 24; dw.paddingTop = dw.paddingBottom = 24;
      dw.itemSpacing = 16; fill(dw, C.card); stroke(dw, C.border);
      dw.cornerRadius = 12;
      shadow(dw, 8, 24, 0.15);
      // handle bar (for bottom/top)
      if (dwSides[dwi] === 'top' || dwSides[dwi] === 'bottom') {
        var dwHandle = row(0); dwHandle.primaryAxisAlignItems = 'CENTER';
 dwHandle.layoutMode = 'HORIZONTAL';
        var dwBar = figma.createFrame(); dwBar.resize(48, 4); dwBar.cornerRadius = 2; fill(dwBar, C.muted);
        dwHandle.appendChild(dwBar); dw.appendChild(dwHandle);
        dwHandle.layoutSizingHorizontal = 'FILL';
      }
      dw.appendChild(tx('Drawer (' + dwSides[dwi] + ')', 'Bold', 18, C.cardFg));
      var dwDesc = tx('This drawer slides in from the ' + dwSides[dwi] + '.', 'Regular', 14, C.mutedFg);
      dwDesc.resize(280, 1); dwDesc.textAutoResize = 'HEIGHT';
      dw.appendChild(dwDesc);
      var dwClose = row(8); dwClose.paddingLeft = dwClose.paddingRight = 16; dwClose.paddingTop = dwClose.paddingBottom = 8;
      dwClose.primaryAxisAlignItems = 'CENTER'; dwClose.counterAxisAlignItems = 'CENTER';
      stroke(dwClose, C.border); dwClose.cornerRadius = RAD;
      dwClose.appendChild(tx('Close', 'Medium', 14, C.fg));
      dw.appendChild(dwClose);
      dws.push(dw);
    }
    y2 = makeSet('Drawer', dws, p2, 60, y2);
    console.log('[OK] Drawer');
  } catch (e) { console.error('[FAIL] Drawer: ' + e.message); y2 += 60; }


  gridSection('Pickers & Date');
  // ── InputOTP (2 lengths × 4 states × 2 fill = 16 variants) ──
  try {
    var otps = [];
    var otpLens = [4, 6];
    var otpStates = ['Default', 'Focus', 'Error', 'Disabled'];
    var otpFills = ['empty', 'partial'];
    for (var oi = 0; oi < otpLens.length; oi++) {
      for (var osI = 0; osI < otpStates.length; osI++) {
        for (var ofI = 0; ofI < otpFills.length; ofI++) {
          var otp = figma.createComponent();
          otp.name = 'Slots=' + otpLens[oi] + ', State=' + otpStates[osI] + ', Fill=' + otpFills[ofI];
          otp.layoutMode = 'HORIZONTAL'; otp.primaryAxisSizingMode = 'AUTO'; otp.counterAxisSizingMode = 'AUTO';
          otp.itemSpacing = 8; otp.counterAxisAlignItems = 'CENTER';
          if (otpStates[osI] === 'Disabled') otp.opacity = 0.5;
          var filledCount = otpFills[ofI] === 'empty' ? 0 : Math.floor(otpLens[oi] / 2);
          for (var osi = 0; osi < otpLens[oi]; osi++) {
            if (otpLens[oi] === 6 && osi === 3) {
              otp.appendChild(tx('—', 'Regular', 16, C.mutedFg));
            }
            var otpSlot = figma.createFrame();
            otpSlot.resize(40, 48); otpSlot.layoutMode = 'HORIZONTAL';
            otpSlot.primaryAxisSizingMode = 'FIXED'; otpSlot.counterAxisSizingMode = 'FIXED';
            otpSlot.primaryAxisAlignItems = 'CENTER'; otpSlot.counterAxisAlignItems = 'CENTER';
            fill(otpSlot, C.bg); otpSlot.cornerRadius = RAD;
            var slotFilled = osi < filledCount;
            if (otpStates[osI] === 'Error') stroke(otpSlot, C.destructive);
            else if (otpStates[osI] === 'Focus' && osi === filledCount) stroke(otpSlot, C.ring, 2);
            else if (slotFilled) stroke(otpSlot, C.fg);
            else stroke(otpSlot, C.input);
            if (slotFilled) {
              otpSlot.appendChild(tx(String(osi + 1), 'Bold', 20, C.fg));
            }
            otp.appendChild(otpSlot);
          }
          otps.push(otp);
        }
      }
    }
    y2 = makeSet('InputOTP', otps, p2, 60, y2);
    console.log('[OK] InputOTP (' + otps.length + ' variants: 2 lengths, 4 states, 2 fill)');
  } catch (e) { console.error('[FAIL] InputOTP: ' + e.message); y2 += 60; }


  // ── RadioGroup (2 layouts × 3 states = 6 variants) ──
  try {
    var rgs = [];
    var rgDirs = ['vertical', 'horizontal'];
    var rgStates = ['Default', 'Disabled', 'Error'];
    var rgItems = ['Default', 'Comfortable', 'Compact'];
    for (var rgi = 0; rgi < rgDirs.length; rgi++) {
      for (var rgsi = 0; rgsi < rgStates.length; rgsi++) {
        var rg = figma.createComponent();
        rg.name = 'Layout=' + rgDirs[rgi] + ', State=' + rgStates[rgsi];
        rg.layoutMode = rgi === 0 ? 'VERTICAL' : 'HORIZONTAL';
        rg.primaryAxisSizingMode = 'AUTO'; rg.counterAxisSizingMode = 'AUTO';
        rg.itemSpacing = rgi === 0 ? 12 : 24;
        if (rgStates[rgsi] === 'Disabled') rg.opacity = 0.5;
        for (var rgii = 0; rgii < rgItems.length; rgii++) {
          var rgRow = row(8); rgRow.counterAxisAlignItems = 'CENTER';
          var rgCircle = figma.createFrame(); rgCircle.resize(16, 16); rgCircle.cornerRadius = 8;
          var rgBorderColor = rgStates[rgsi] === 'Error' ? C.destructive : (rgii === 0 ? C.primary : C.input);
          var rgBorderW = rgii === 0 ? 2 : 1;
          stroke(rgCircle, rgBorderColor, rgBorderW);
          fill(rgCircle, C.bg);
          if (rgii === 0) {
            rgCircle.layoutMode = 'HORIZONTAL';
            rgCircle.primaryAxisSizingMode = 'FIXED'; rgCircle.counterAxisSizingMode = 'FIXED';
            rgCircle.primaryAxisAlignItems = 'CENTER'; rgCircle.counterAxisAlignItems = 'CENTER';
            var rgDot = figma.createFrame(); rgDot.resize(8, 8); rgDot.cornerRadius = 4;
            // Error state: dot matches border (destructive). Default: primary.
            fill(rgDot, rgStates[rgsi] === 'Error' ? C.destructive : C.primary);
            rgCircle.appendChild(rgDot);
          }
          rgRow.appendChild(rgCircle);
          var rgLabelColor = C.fg;
          rgRow.appendChild(tx(rgItems[rgii], 'Regular', 14, rgLabelColor));
          rg.appendChild(rgRow);
        }
        if (rgStates[rgsi] === 'Error') {
          var rgErr = row(4); rgErr.counterAxisAlignItems = 'CENTER';
          rgErr.appendChild(iconInst('alert-circle', C.destructive, 12));
          rgErr.appendChild(tx('Please select an option', 'Regular', 12, C.destructive));
          rg.appendChild(rgErr);
        }
        rgs.push(rg);
      }
    }
    y2 = makeSet('RadioGroup', rgs, p2, 60, y2);
    console.log('[OK] RadioGroup (' + rgs.length + ' variants: 2 layouts, 3 states)');
  } catch (e) { console.error('[FAIL] RadioGroup: ' + e.message); y2 += 60; }


  // ── Table (Variant=default/striped/selection/sorted × Density=normal/compact = 8 variants) ──
  try {
    var tbls = [];
    var tblHeaders = ['Invoice', 'Status', 'Method', 'Amount'];
    var tblData = [
      ['INV-001', 'Paid', 'Credit Card', '$250.00'],
      ['INV-002', 'Pending', 'Bank Transfer', '$150.00'],
      ['INV-003', 'Unpaid', 'PayPal', '$350.00'],
      ['INV-004', 'Paid', 'Credit Card', '$450.00']
    ];
    var tblColW = [140, 110, 130, 100];
    var tblStatusClr = {
      'Paid':    { bg: C.successSubtle, fg: C.successOnSubtle, border: C.successOnSubtle },
      'Pending': { bg: C.warningSubtle, fg: C.warningOnSubtle, border: C.warningOnSubtle },
      'Unpaid':  { bg: C.destructiveSubtle, fg: C.destructive, border: C.destructiveOnSubtle }
    };
    var tblVariants = ['default', 'striped', 'selection', 'sorted'];
    var tblDensities = ['normal', 'compact'];

    for (var tvi = 0; tvi < tblVariants.length; tvi++) {
      for (var tdi2 = 0; tdi2 < tblDensities.length; tdi2++) {
        var tblV = tblVariants[tvi]; var tblD = tblDensities[tdi2];
        var tRowH = tblD === 'compact' ? 32 : 44;
        var tHdrH = tblD === 'compact' ? 32 : 40;
        var tFontSz = tblD === 'compact' ? 11 : 13;

        var tbl2 = figma.createComponent();
        tbl2.name = 'Variant=' + tblV + ', Density=' + tblD;
        var tblTotalW = tblColW.reduce(function(a,b){return a+b;},0) + (tblV === 'selection' ? 40 : 0);
        tbl2.layoutMode = 'VERTICAL'; tbl2.counterAxisSizingMode = 'FIXED';
        tbl2.resize(tblTotalW, 10); tbl2.primaryAxisSizingMode = 'AUTO'; tbl2.itemSpacing = 0; stroke(tbl2, C.border); tbl2.cornerRadius = RAD; tbl2.clipsContent = true;

        // Header row
 var tHdrRow = row(0); tHdrRow.layoutMode = 'HORIZONTAL'; fill(tHdrRow, C.muted);
        tHdrRow.counterAxisAlignItems = 'CENTER';
        if (tblV === 'selection') {
          var tHdrCb = figma.createFrame(); tHdrCb.resize(40, tHdrH);
          tHdrCb.layoutMode = 'HORIZONTAL'; tHdrCb.primaryAxisSizingMode = 'FIXED'; tHdrCb.counterAxisSizingMode = 'FIXED';
          tHdrCb.primaryAxisAlignItems = 'CENTER'; tHdrCb.counterAxisAlignItems = 'CENTER'; noFill(tHdrCb);
          var tHdrCbBox = figma.createFrame(); tHdrCbBox.resize(14, 14); tHdrCbBox.cornerRadius = 3;
          fill(tHdrCbBox, C.primary); tHdrCbBox.layoutMode = 'HORIZONTAL';
          tHdrCbBox.primaryAxisSizingMode = 'FIXED'; tHdrCbBox.counterAxisSizingMode = 'FIXED';
          tHdrCbBox.primaryAxisAlignItems = 'CENTER'; tHdrCbBox.counterAxisAlignItems = 'CENTER';
          tHdrCbBox.appendChild(tx('−', 'Bold', 10, C.primaryFg));
          tHdrCb.appendChild(tHdrCbBox); tHdrRow.appendChild(tHdrCb);
        }
        for (var thi = 0; thi < tblHeaders.length; thi++) {
          var thCell = row(6); thCell.resize(tblColW[thi], tHdrH);
          thCell.layoutSizingHorizontal = 'FIXED'; thCell.counterAxisAlignItems = 'CENTER';
          thCell.paddingLeft = thCell.paddingRight = 12;
          thCell.appendChild(tx(tblHeaders[thi], 'SemiBold', tblD === 'compact' ? 11 : 12, C.mutedFg));
          if (tblV === 'sorted') {
            if (thi === 0) { thCell.appendChild(iconInst('arrow-up', C.primary, 12)); }
            else if (thi === 3) { thCell.appendChild(iconInst('chevron-up', C.mutedFg, 12)); }
          }
          tHdrRow.appendChild(thCell);
        }
        tbl2.appendChild(tHdrRow);
        tHdrRow.layoutSizingHorizontal = 'FILL';

        // Data rows
        for (var tri = 0; tri < tblData.length; tri++) {
          var isSelected = tblV === 'selection' && (tri === 0 || tri === 2);
 var dRow = row(0); dRow.layoutMode = 'HORIZONTAL'; dRow.counterAxisAlignItems = 'CENTER';
          if (tblV === 'striped' && tri % 2 === 1) fill(dRow, C.muted);
          else if (isSelected) fill(dRow, C.accent);
          else noFill(dRow);

          if (tblV === 'selection') {
            var tDCb = figma.createFrame(); tDCb.resize(40, tRowH);
            tDCb.layoutMode = 'HORIZONTAL'; tDCb.primaryAxisSizingMode = 'FIXED'; tDCb.counterAxisSizingMode = 'FIXED';
            tDCb.primaryAxisAlignItems = 'CENTER'; tDCb.counterAxisAlignItems = 'CENTER'; noFill(tDCb);
            var tDCbBox = figma.createFrame(); tDCbBox.resize(14, 14); tDCbBox.cornerRadius = 3;
            if (isSelected) { fill(tDCbBox, C.primary); tDCbBox.layoutMode = 'HORIZONTAL'; tDCbBox.primaryAxisSizingMode = 'FIXED'; tDCbBox.counterAxisSizingMode = 'FIXED'; tDCbBox.primaryAxisAlignItems = 'CENTER'; tDCbBox.counterAxisAlignItems = 'CENTER'; tDCbBox.appendChild(tx('✓', 'Bold', 9, C.primaryFg)); }
            else { noFill(tDCbBox); stroke(tDCbBox, C.border); }
            tDCb.appendChild(tDCbBox); dRow.appendChild(tDCb);
          }

          for (var tdi = 0; tdi < tblData[tri].length; tdi++) {
            var tdCell = row(0); tdCell.resize(tblColW[tdi], tRowH);
            tdCell.layoutSizingHorizontal = 'FIXED'; tdCell.counterAxisAlignItems = 'CENTER';
            tdCell.paddingLeft = tdCell.paddingRight = 12;
            if (tdi === 1) {
              var stBg = row(0); stBg.paddingLeft = stBg.paddingRight = 8; stBg.paddingTop = stBg.paddingBottom = 2; stBg.cornerRadius = 6;
              var stSoft = tblStatusClr[tblData[tri][tdi]] || { bg: C.muted, fg: C.mutedFg, border: C.border };
              fill(stBg, stSoft.bg); stroke(stBg, stSoft.border);
              stBg.appendChild(tx(tblData[tri][tdi], 'Medium', tblD === 'compact' ? 10 : 11, stSoft.fg));
              tdCell.appendChild(stBg);
            } else {
              tdCell.appendChild(tx(tblData[tri][tdi], 'Regular', tFontSz, C.fg));
            }
            dRow.appendChild(tdCell);
          }
          tbl2.appendChild(dRow);
          dRow.layoutSizingHorizontal = 'FILL';
          if (tri < tblData.length - 1) {
 var tSep = figma.createFrame(); tSep.resize(480, 1); tSep.layoutMode = 'HORIZONTAL'; tSep.primaryAxisSizingMode = 'FIXED'; tSep.counterAxisSizingMode = 'FIXED'; fill(tSep, C.border);
            tbl2.appendChild(tSep);
            tSep.layoutSizingHorizontal = 'FILL';
          }
        }

        if (tblV === 'selection') {
          var tFoot = row(0); tFoot.paddingLeft = tFoot.paddingRight = 12; tFoot.paddingTop = tFoot.paddingBottom = 8;
 tFoot.layoutMode = 'HORIZONTAL'; fill(tFoot, C.muted); tFoot.counterAxisAlignItems = 'CENTER';
          tFoot.appendChild(tx('2 of 4 rows selected', 'Regular', 12, C.mutedFg));
          var tFootSp = figma.createFrame(); tFootSp.resize(4, 1); noFill(tFootSp); tFoot.appendChild(tFootSp); tFootSp.layoutGrow = 1;
          var tDelBtn = row(6); tDelBtn.paddingLeft = tDelBtn.paddingRight = 10; tDelBtn.paddingTop = tDelBtn.paddingBottom = 5;
          fill(tDelBtn, C.destructive); tDelBtn.cornerRadius = 6;
          tDelBtn.appendChild(iconInst('trash-2', C.primaryFg, 12));
          tDelBtn.appendChild(tx('Delete', 'Medium', 12, C.primaryFg));
          tFoot.appendChild(tDelBtn); tbl2.appendChild(tFoot);
          tFoot.layoutSizingHorizontal = 'FILL';
        }
        tbls.push(tbl2);
      }
    }
    y2 = makeSet('Table', tbls, p2, 60, y2);
    console.log('[OK] Table (' + tbls.length + ' variants: default/striped/selection/sorted × normal/compact)');
  } catch (e) { console.error('[FAIL] Table: ' + e.message); y2 += 60; }

  gridSection('Data Display');
  // ── ToggleGroup (Size × Type × Count × Active) ──
  try {
    var tgs = [];

    var tgTextLabels = {
      2: ['On', 'Off'],
      3: ['Opt 1', 'Opt 2', 'Opt 3'],
      4: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4']
    };
    var tgIconSets = {
      2: ['align-left', 'align-right'],
      3: ['align-left', 'align-center', 'align-right'],
      4: ['align-left', 'align-center', 'align-right', 'list']
    };

    // [paddingH, paddingV, fontSize, iconSize]
    var tgSizes = {
      sm:      [8,  4,  12, 12],
      default: [12, 8,  14, 14],
      lg:      [16, 10, 16, 16]
    };
    var tgSizeKeys = ['sm', 'default', 'lg'];
    var tgCounts   = [2, 3, 4];
    var tgTypes    = ['text', 'text-icon', 'icons'];

    for (var tgSi = 0; tgSi < tgSizeKeys.length; tgSi++) {
      var tgSize   = tgSizeKeys[tgSi];
      var tgSzCfg  = tgSizes[tgSize];
      var tgPH     = tgSzCfg[0];
      var tgPV     = tgSzCfg[1];
      var tgFs     = tgSzCfg[2];
      var tgIs     = tgSzCfg[3];
      var innerR   = Math.max(0, RAD - 2);

      for (var tgTi = 0; tgTi < tgTypes.length; tgTi++) {
        var tgType = tgTypes[tgTi];

        for (var tgCi = 0; tgCi < tgCounts.length; tgCi++) {
          var tgCount = tgCounts[tgCi];

          for (var tgActive = 1; tgActive <= tgCount; tgActive++) {
            var tgComp = figma.createComponent();
            tgComp.name = 'Size=' + tgSize + ', Type=' + tgType + ', Count=' + tgCount + ', Active=' + tgActive;
            tgComp.layoutMode = 'HORIZONTAL';
            tgComp.primaryAxisSizingMode = 'AUTO';
            tgComp.counterAxisSizingMode = 'AUTO';
            tgComp.itemSpacing = 1;
            stroke(tgComp, C.border);
            tgComp.cornerRadius = RAD;
            fill(tgComp, C.bg);
            tgComp.clipsContent = true;

            for (var tgIdx = 0; tgIdx < tgCount; tgIdx++) {
              var isActive = (tgIdx === tgActive - 1);
              var isFirst  = (tgIdx === 0);
              var isLast   = (tgIdx === tgCount - 1);

              var tgItem = row(6);
              tgItem.paddingLeft = tgItem.paddingRight = tgPH;
              tgItem.paddingTop  = tgItem.paddingBottom = tgPV;
              tgItem.primaryAxisAlignItems = 'CENTER';
              tgItem.counterAxisAlignItems = 'CENTER';

              tgItem.topLeftRadius     = isFirst ? innerR : 0;
              tgItem.bottomLeftRadius  = isFirst ? innerR : 0;
              tgItem.topRightRadius    = isLast  ? innerR : 0;
              tgItem.bottomRightRadius = isLast  ? innerR : 0;

              if (isActive) fill(tgItem, C.accent); else noFill(tgItem);

              var tgTextColor  = isActive ? C.fg : C.mutedFg;
              var tgTextWeight = isActive ? 'Medium' : 'Regular';

              if (tgType === 'text') {
                tgItem.appendChild(tx(tgTextLabels[tgCount][tgIdx], tgTextWeight, tgFs, tgTextColor));
              } else if (tgType === 'text-icon') {
                tgItem.appendChild(iconInst(tgIconSets[tgCount][tgIdx], tgTextColor, tgIs));
                tgItem.appendChild(tx(tgTextLabels[tgCount][tgIdx], tgTextWeight, tgFs, tgTextColor));
              } else {
                tgItem.appendChild(iconInst(tgIconSets[tgCount][tgIdx], tgTextColor, tgIs));
              }

              tgComp.appendChild(tgItem);
            }
            tgs.push(tgComp);
          }
        }
      }
    }

    y2 = makeSet('ToggleGroup', tgs, p2, 60, y2);
    console.log('[OK] ToggleGroup — ' + tgs.length + ' variants (Size × Type × Count × Active)');
  } catch (e) { console.error('[FAIL] ToggleGroup: ' + e.message); y2 += 60; }

  // ── MultiSelect (3 sizes × 3 states × 2 content = 18 variants) ──
  try {
    var mss = [];
    var msSizes = ['sm', 'default', 'lg'];
    var msStates = ['Default', 'Focus', 'Disabled'];
    var msContents = ['empty', 'selected'];
    for (var msSi = 0; msSi < msSizes.length; msSi++) {
      for (var msStI = 0; msStI < msStates.length; msStI++) {
        for (var msCi = 0; msCi < msContents.length; msCi++) {
          var ms = figma.createComponent();
          ms.name = 'Size=' + msSizes[msSi] + ', State=' + msStates[msStI] + ', Content=' + msContents[msCi];
          ms.layoutMode = 'HORIZONTAL'; ms.primaryAxisSizingMode = 'FIXED'; ms.counterAxisSizingMode = 'AUTO';
          ms.resize(280, 36); ms.paddingLeft = ms.paddingRight = 8; ms.paddingTop = ms.paddingBottom = msSizes[msSi] === 'sm' ? 4 : 6;
          ms.itemSpacing = 6; ms.counterAxisAlignItems = 'CENTER';
          fill(ms, C.bg); ms.cornerRadius = RAD;
          if (msStates[msStI] === 'Focus') stroke(ms, C.ring, 2);
          else stroke(ms, C.input);
          if (msStates[msStI] === 'Disabled') ms.opacity = 0.5;
          if (msContents[msCi] === 'empty') {
            var msPlaceholder = tx('Select options...', 'Regular', msSizes[msSi] === 'sm' ? 12 : 14, C.mutedFg);
            ms.appendChild(msPlaceholder); msPlaceholder.layoutGrow = 1;
          } else {
            var msChips = ['React', 'TypeScript', 'Tailwind'];
            for (var mci = 0; mci < msChips.length; mci++) {
              var msChip = row(4); msChip.paddingLeft = msChip.paddingRight = 8; msChip.paddingTop = msChip.paddingBottom = 2;
              fill(msChip, C.accent); msChip.cornerRadius = 6; msChip.counterAxisAlignItems = 'CENTER';
              msChip.appendChild(tx(msChips[mci], 'Medium', msSizes[msSi] === 'sm' ? 10 : 12, C.fg));
              msChip.appendChild(iconInst('x', C.mutedFg, msSizes[msSi] === 'sm' ? 8 : 10));
              ms.appendChild(msChip);
            }
            var msSpacer = figma.createFrame(); msSpacer.resize(4, 1); noFill(msSpacer);
            ms.appendChild(msSpacer); msSpacer.layoutGrow = 1;
          }
          var msChev = iconInst('chevron-down', C.mutedFg, msSizes[msSi] === 'sm' ? 12 : 14);
          ms.appendChild(msChev);
          mss.push(ms);
        }
      }
    }
    y2 = makeSet('MultiSelect', mss, p2, 60, y2);
    console.log('[OK] MultiSelect (' + mss.length + ' variants: 3 sizes, 3 states, 2 content)');
  } catch (e) { console.error('[FAIL] MultiSelect: ' + e.message); y2 += 60; }

  // ── InputFile (2 variants: default, with-file) ──
  try {
    var ifs = [];
    for (var ifi = 0; ifi < 2; ifi++) {
      var iFile = figma.createComponent();
      iFile.name = 'State=' + (ifi === 0 ? 'default' : 'with-file');
      iFile.layoutMode = 'HORIZONTAL'; iFile.primaryAxisSizingMode = 'FIXED'; iFile.counterAxisSizingMode = 'FIXED';
      iFile.resize(320, 36); iFile.itemSpacing = 0; iFile.counterAxisAlignItems = 'CENTER';
      fill(iFile, C.bg); stroke(iFile, C.input); iFile.cornerRadius = RAD;
      // button section
      var ifBtn = row(6); ifBtn.paddingLeft = ifBtn.paddingRight = 12; ifBtn.paddingTop = ifBtn.paddingBottom = 8;
      fill(ifBtn, C.muted); ifBtn.counterAxisAlignItems = 'CENTER';
      ifBtn.appendChild(iconInst('paperclip', C.mutedFg, 14));
      ifBtn.appendChild(tx('Choose file', 'Medium', 13, C.fg));
      iFile.appendChild(ifBtn);
      // file name
      var ifName = tx(ifi === 0 ? 'No file chosen' : 'invoice-2026.pdf', 'Regular', 13, ifi === 0 ? C.mutedFg : C.fg);
 var ifWrap = row(0); ifWrap.paddingLeft = ifWrap.paddingRight = 12;
      ifWrap.counterAxisAlignItems = 'CENTER';
      ifWrap.appendChild(ifName);
      iFile.appendChild(ifWrap);
      ifWrap.layoutSizingHorizontal = 'FILL';
      ifs.push(iFile);
    }
    y2 = makeSet('InputFile', ifs, p2, 60, y2);
    console.log('[OK] InputFile');
  } catch (e) { console.error('[FAIL] InputFile: ' + e.message); y2 += 60; }

  // ── DateRangePicker (2 variants: placeholder, selected) ──
  try {
    var drps = [];
    for (var dri = 0; dri < 2; dri++) {
      var drp = figma.createComponent();
      drp.name = 'State=' + (dri === 0 ? 'placeholder' : 'selected');
      drp.layoutMode = 'HORIZONTAL'; drp.primaryAxisSizingMode = 'FIXED'; drp.counterAxisSizingMode = 'AUTO';
      drp.resize(280, 36); drp.paddingLeft = drp.paddingRight = 12; drp.counterAxisAlignItems = 'CENTER';
      drp.itemSpacing = 8;
      fill(drp, C.bg); stroke(drp, C.input); drp.cornerRadius = RAD;
      drp.appendChild(iconInst('calendar', C.mutedFg, 16));
      if (dri === 0) {
        drp.appendChild(tx('Pick a date range', 'Regular', 14, C.mutedFg));
      } else {
        drp.appendChild(tx('Jan 20, 2026', 'Medium', 14, C.fg));
        drp.appendChild(tx('—', 'Regular', 14, C.mutedFg));
        drp.appendChild(tx('Feb 09, 2026', 'Medium', 14, C.fg));
      }
      drps.push(drp);
    }
    y2 = makeSet('DateRangePicker', drps, p2, 60, y2);
    console.log('[OK] DateRangePicker');
  } catch (e) { console.error('[FAIL] DateRangePicker: ' + e.message); y2 += 60; }


  // ── LoadingStates (4 types) ──
  try {
    var lss = [];
    var lsTypes = ['spinner', 'dots', 'overlay', 'inline'];
    for (var lsi = 0; lsi < lsTypes.length; lsi++) {
      var ls = figma.createComponent();
      ls.name = 'Type=' + lsTypes[lsi];
      ls.layoutMode = 'VERTICAL'; ls.primaryAxisSizingMode = 'AUTO'; ls.counterAxisSizingMode = 'AUTO';
      ls.itemSpacing = 8; ls.primaryAxisAlignItems = 'CENTER'; ls.counterAxisAlignItems = 'CENTER'; noFill(ls);
      if (lsTypes[lsi] === 'spinner') {
        ls.paddingLeft = ls.paddingRight = ls.paddingTop = ls.paddingBottom = 16;
        ls.appendChild(iconInst('refresh-cw', C.primary, 32));
        ls.appendChild(tx('Loading...', 'Regular', 14, C.mutedFg));
      } else if (lsTypes[lsi] === 'dots') {
        var lsDotsRow = row(6); lsDotsRow.counterAxisAlignItems = 'CENTER'; noFill(lsDotsRow);
        for (var lsd = 0; lsd < 3; lsd++) {
          var lsDot = figma.createFrame(); lsDot.resize(8, 8); lsDot.cornerRadius = 4;
          fill(lsDot, lsd === 0 ? C.primary : C.muted); lsDotsRow.appendChild(lsDot);
        }
        ls.appendChild(lsDotsRow);
        ls.appendChild(tx('Processing...', 'Regular', 12, C.mutedFg));
      } else if (lsTypes[lsi] === 'overlay') {
        ls.resize(200, 120); ls.primaryAxisSizingMode = 'FIXED'; ls.counterAxisSizingMode = 'FIXED';
        ls.fills = [{ type: 'SOLID', color: hx(C.bg), opacity: 0.85 }]; ls.cornerRadius = RAD;
        ls.appendChild(iconInst('refresh-cw', C.primary, 24));
        ls.appendChild(tx('Loading...', 'Medium', 14, C.fg));
      } else {
        var lsInlineRow = row(8); lsInlineRow.counterAxisAlignItems = 'CENTER'; noFill(lsInlineRow);
        lsInlineRow.appendChild(iconInst('refresh-cw', C.primary, 16));
        lsInlineRow.appendChild(tx('Saving changes...', 'Regular', 14, C.mutedFg));
        ls.appendChild(lsInlineRow);
      }
      lss.push(ls);
    }
    y2 = makeSet('LoadingStates', lss, p2, 60, y2);
    console.log('[OK] LoadingStates');
  } catch (e) { console.error('[FAIL] LoadingStates: ' + e.message); y2 += 60; }


  gridSection('Complex Components');
  // ── Sidebar (2 states: expanded/collapsed × 2 themes: light/dark) ──
  try {
    var sidebars = [];
    var sbStates = [['expanded', 240], ['collapsed', 56]];
    var sbThemes = [['light', C.card, C.fg, C.border], ['dark', C.primary, C.primaryFg, C.fg]];
    var sbNavItems = [['home','Dashboard',true],['file-text','Operations',false],['users','Clients',false],['bar-chart','Reports',false],['settings','Settings',false]];
    for (var sbti = 0; sbti < sbThemes.length; sbti++) {
      for (var sbsi = 0; sbsi < sbStates.length; sbsi++) {
        var sb = figma.createComponent();
        sb.name = 'State=' + sbStates[sbsi][0] + ', Theme=' + sbThemes[sbti][0];
        var sbW = sbStates[sbsi][1];
        sb.layoutMode = 'VERTICAL'; sb.resize(sbW, 360);
        sb.primaryAxisSizingMode = 'FIXED'; sb.counterAxisSizingMode = 'FIXED';
        sb.itemSpacing = 0; fill(sb, sbThemes[sbti][1]); stroke(sb, sbThemes[sbti][2], 0);
        sb.strokes = [{ type: 'SOLID', color: hx(sbThemes[sbti][3]) }]; sb.strokeWeight = 1; sb.strokeAlign = 'OUTSIDE';
        // Logo area
        var sbLogo = figma.createFrame(); sbLogo.resize(sbW, 56); fill(sbLogo, sbThemes[sbti][1]);
        sbLogo.layoutMode = 'HORIZONTAL'; sbLogo.itemSpacing = 10;
        sbLogo.paddingLeft = 14; sbLogo.counterAxisAlignItems = 'CENTER';
        sbLogo.primaryAxisSizingMode = 'FIXED'; sbLogo.counterAxisSizingMode = 'FIXED';
        var sbLogoCircle = figma.createFrame(); sbLogoCircle.resize(28, 28); sbLogoCircle.cornerRadius = 6;
        fill(sbLogoCircle, C.secondary);
        sbLogoCircle.layoutMode = 'HORIZONTAL'; sbLogoCircle.primaryAxisAlignItems = 'CENTER'; sbLogoCircle.counterAxisAlignItems = 'CENTER';
        sbLogoCircle.primaryAxisSizingMode = 'FIXED'; sbLogoCircle.counterAxisSizingMode = 'FIXED';
        sbLogoCircle.appendChild(tx('CB', 'Bold', 11, C.primaryFg));
        sbLogo.appendChild(sbLogoCircle);
        if (sbStates[sbsi][0] === 'expanded') sbLogo.appendChild(tx('CESIONBNK', 'Bold', 13, sbThemes[sbti][2]));
        sb.appendChild(sbLogo);
        // Separator
        var sbSep = figma.createFrame(); sbSep.resize(sbW, 1); fill(sbSep, sbThemes[sbti][3]); sb.appendChild(sbSep);
        // Nav items
        for (var sbni = 0; sbni < sbNavItems.length; sbni++) {
          var sbRow = figma.createFrame(); sbRow.resize(sbW, 40);
          sbRow.layoutMode = 'HORIZONTAL'; sbRow.itemSpacing = 10;
          sbRow.paddingLeft = 14; sbRow.counterAxisAlignItems = 'CENTER';
          sbRow.primaryAxisSizingMode = 'FIXED'; sbRow.counterAxisSizingMode = 'FIXED';
          if (sbNavItems[sbni][2]) {
            sbRow.fills = [{ type: 'SOLID', color: hx(sbThemes[sbti][0] === 'dark' ? C.fg : C.accent) }];
          } else { noFill(sbRow); }
          var sbItemIco = iconInst(sbNavItems[sbni][0], sbNavItems[sbni][2] ? (sbThemes[sbti][0] === 'dark' ? C.primaryFg : C.primary) : C.mutedFg, 18);
          sbRow.appendChild(sbItemIco);
          if (sbStates[sbsi][0] === 'expanded') {
            sbRow.appendChild(tx(sbNavItems[sbni][1], sbNavItems[sbni][2] ? 'Medium' : 'Regular', 14, sbNavItems[sbni][2] ? sbThemes[sbti][2] : C.mutedFg));
          }
          sb.appendChild(sbRow);
        }
        // Spacer + user profile at bottom
        var sbSpacer = figma.createFrame(); sbSpacer.resize(sbW, 80); noFill(sbSpacer); sb.appendChild(sbSpacer);
        var sbSep2 = figma.createFrame(); sbSep2.resize(sbW, 1); fill(sbSep2, sbThemes[sbti][3]); sb.appendChild(sbSep2);
        var sbUser = figma.createFrame(); sbUser.resize(sbW, 52);
        sbUser.layoutMode = 'HORIZONTAL'; sbUser.itemSpacing = 10;
        sbUser.paddingLeft = 12; sbUser.counterAxisAlignItems = 'CENTER';
        sbUser.primaryAxisSizingMode = 'FIXED'; sbUser.counterAxisSizingMode = 'FIXED'; noFill(sbUser);
        var sbAvatar = figma.createFrame(); sbAvatar.resize(28, 28); sbAvatar.cornerRadius = 14;
        fill(sbAvatar, C.secondary);
        sbAvatar.layoutMode = 'HORIZONTAL'; sbAvatar.primaryAxisAlignItems = 'CENTER'; sbAvatar.counterAxisAlignItems = 'CENTER';
        sbAvatar.primaryAxisSizingMode = 'FIXED'; sbAvatar.counterAxisSizingMode = 'FIXED';
        sbAvatar.appendChild(tx('AG', 'Bold', 11, C.primaryFg)); sbUser.appendChild(sbAvatar);
        if (sbStates[sbsi][0] === 'expanded') {
          var sbUserTxt = figma.createFrame(); sbUserTxt.layoutMode = 'VERTICAL'; sbUserTxt.itemSpacing = 2;
          sbUserTxt.primaryAxisSizingMode = 'AUTO'; sbUserTxt.counterAxisSizingMode = 'AUTO'; noFill(sbUserTxt);
          sbUserTxt.appendChild(tx('Ana García', 'Medium', 12, sbThemes[sbti][2]));
          sbUserTxt.appendChild(tx('Admin', 'Regular', 11, C.mutedFg));
          sbUser.appendChild(sbUserTxt);
        }
        sb.appendChild(sbUser);
        sidebars.push(sb);
      }
    }
    y2 = makeSet('Sidebar', sidebars, p2, 60, y2);
    console.log('[OK] Sidebar (' + sidebars.length + ' variants: 2 states × 2 themes)');
  } catch (e) { console.error('[FAIL] Sidebar: ' + e.message); y2 += 60; }

  // ── KPIDashboard (3 layouts: row/grid/compact) ──
  try {
    var kpiDashs = [];
    var kpiDLayouts = ['row', 'grid', 'compact'];
    var kpiDData = [
      ['Total Revenue', '$124,592', '+12.3%', C.primary, C.success, 'trending-up'],
      ['Active Ops', '1,429', '+5.7%', C.success, C.success, 'file-text'],
      ['Clients', '847', '-2.1%', C.secondary, C.destructive, 'users'],
      ['Conversion', '3.24%', '+0.8%', C.warning, C.success, 'zap']
    ];
    for (var kdli = 0; kdli < kpiDLayouts.length; kdli++) {
      var kpid = figma.createComponent();
      kpid.name = 'Layout=' + kpiDLayouts[kdli];
      var isGrid = kpiDLayouts[kdli] === 'grid';
      var isCompact = kpiDLayouts[kdli] === 'compact';
      kpid.layoutMode = isGrid ? 'HORIZONTAL' : 'HORIZONTAL';
      kpid.primaryAxisSizingMode = 'AUTO'; kpid.counterAxisSizingMode = 'AUTO';
      if (isGrid) { kpid.layoutWrap = 'WRAP'; kpid.resize(560, 1); kpid.primaryAxisSizingMode = 'FIXED'; }
      kpid.itemSpacing = 12; kpid.counterAxisSpacing = 12; noFill(kpid);
      for (var kdci = 0; kdci < kpiDData.length; kdci++) {
        var kdc = col(isCompact ? 4 : 8);
        var kdcW = isGrid ? 260 : (isCompact ? 160 : 220);
        kdc.resize(kdcW, 10);
        kdc.primaryAxisSizingMode = 'AUTO'; kdc.counterAxisSizingMode = 'FIXED';
        kdc.paddingLeft = kdc.paddingRight = isCompact ? 12 : 16; kdc.paddingTop = kdc.paddingBottom = isCompact ? 10 : 16;
        fill(kdc, C.card); stroke(kdc, C.border); kdc.cornerRadius = 10;
 var kdcH = row(0); kdcH.counterAxisAlignItems = 'CENTER'; kdcH.layoutMode = 'HORIZONTAL'; noFill(kdcH);
        kdcH.appendChild(tx(kpiDData[kdci][0], 'Regular', isCompact ? 11 : 12, C.mutedFg));
        var kdcSp = figma.createFrame(); kdcSp.resize(4, 1); noFill(kdcSp); kdcH.appendChild(kdcSp); kdcSp.layoutGrow = 1;
        kdcH.appendChild(iconInst(kpiDData[kdci][5], C.mutedFg, isCompact ? 12 : 14));
        kdc.appendChild(kdcH);
        kdcH.layoutSizingHorizontal = 'FILL';
        kdc.appendChild(tx(kpiDData[kdci][1], 'Bold', isCompact ? 18 : 22, C.fg));
        if (!isCompact) {
          var kdcBadge = row(4); kdcBadge.paddingLeft = kdcBadge.paddingRight = 6; kdcBadge.paddingTop = kdcBadge.paddingBottom = 2;
          kdcBadge.cornerRadius = 6;
          fill(kdcBadge, kpiDData[kdci][4] === C.success ? C.successSubtle : C.destructiveSubtle);
          kdcBadge.appendChild(tx(kpiDData[kdci][2], 'Medium', 11, kpiDData[kdci][4]));
          kdc.appendChild(kdcBadge);
        }
        kpid.appendChild(kdc);
      }
      kpiDashs.push(kpid);
    }
    y2 = makeSet('KPIDashboard', kpiDashs, p2, 60, y2);
    console.log('[OK] KPIDashboard');
  } catch (e) { console.error('[FAIL] KPIDashboard: ' + e.message); y2 += 60; }

  // ── TextareaAutoresize (State=empty/short/medium/tall) ──
  try {
    var taAutos = [];
    var taAutoStates = [
      ['empty',  1, 'Type something...', true],
      ['short',  2, 'This is a short one-line note.', false],
      ['medium', 3, 'This is a medium-length text that spans two lines.\nIt wraps naturally.', false],
      ['tall',   5, 'This is a longer body of text that spans multiple lines.\nLine two here.\nLine three.\nAnd a fourth line as well.', false],
    ];
    for (var tai2 = 0; tai2 < taAutoStates.length; tai2++) {
      var taA = figma.createComponent();
      taA.name = 'State=' + taAutoStates[tai2][0];
      taA.layoutMode = 'VERTICAL'; taA.counterAxisSizingMode = 'FIXED';
      taA.resize(320, 1); taA.primaryAxisSizingMode = 'AUTO'; taA.paddingLeft = taA.paddingRight = 12; taA.paddingTop = taA.paddingBottom = 10;
      taA.itemSpacing = 0; fill(taA, C.bg); stroke(taA, C.border); taA.cornerRadius = RAD;
      var taLines = taAutoStates[tai2][1];
      var taText = tx(taAutoStates[tai2][2], 'Regular', 14, taAutoStates[tai2][3] ? C.mutedFg : C.fg);
      taText.resize(296, taLines * 20); taText.textAutoResize = 'HEIGHT';
      taA.appendChild(taText);
      // Resize handle indicator (bottom-right corner dots)
      var taHandle = row(2); noFill(taHandle); taHandle.primaryAxisAlignItems = 'MAX';
 taHandle.resize(296, 12); taHandle.layoutMode = 'HORIZONTAL';
      for (var thd = 0; thd < 3; thd++) {
        var thdDot = figma.createFrame(); thdDot.resize(3, 3); thdDot.cornerRadius = 1; fill(thdDot, C.border);
        taHandle.appendChild(thdDot);
      }
      taA.appendChild(taHandle);
      taHandle.layoutSizingHorizontal = 'FILL';
      taAutos.push(taA);
    }
    y2 = makeSet('TextareaAutoresize', taAutos, p2, 60, y2);
    console.log('[OK] TextareaAutoresize (' + taAutos.length + ' variants)');
  } catch (e) { console.error('[FAIL] TextareaAutoresize: ' + e.message); y2 += 60; }



  // ── Stepper (Steps × Orientation = 6 variants) ──
  try {
    var stepperComps = [];
    var stepCounts = [3, 4, 5];
    var stepOrients = ['Horizontal', 'Vertical'];
    for (var sc = 0; sc < stepCounts.length; sc++) {
      for (var so = 0; so < stepOrients.length; so++) {
        var nSteps = stepCounts[sc]; var orient = stepOrients[so];
        var sComp = figma.createComponent();
        sComp.name = 'Steps=' + nSteps + ', Orientation=' + orient;
        sComp.layoutMode = orient === 'Horizontal' ? 'HORIZONTAL' : 'VERTICAL';
        sComp.primaryAxisSizingMode = 'AUTO'; sComp.counterAxisSizingMode = 'AUTO';
        sComp.itemSpacing = 0; sComp.paddingLeft = 16; sComp.paddingRight = 16;
        sComp.paddingTop = 16; sComp.paddingBottom = 16;
        noFill(sComp);
        if (orient === 'Horizontal') { sComp.counterAxisAlignItems = 'MIN'; }
        for (var si = 0; si < nSteps; si++) {
          // Step item
          var sItem = figma.createFrame();
          sItem.layoutMode = orient === 'Horizontal' ? 'VERTICAL' : 'HORIZONTAL';
          sItem.primaryAxisSizingMode = 'AUTO'; sItem.counterAxisSizingMode = 'AUTO';
          sItem.itemSpacing = orient === 'Horizontal' ? 6 : 12;
          sItem.counterAxisAlignItems = 'CENTER'; noFill(sItem);
          // Circle
          var sCircle = figma.createFrame();
          sCircle.layoutMode = 'HORIZONTAL'; sCircle.primaryAxisSizingMode = 'FIXED';
          sCircle.counterAxisSizingMode = 'FIXED'; sCircle.resize(28, 28);
          sCircle.cornerRadius = 14; sCircle.primaryAxisAlignItems = 'CENTER';
          sCircle.counterAxisAlignItems = 'CENTER';
          if (si === 0) {
            // completed
            fill(sCircle, C.primary);
            sCircle.appendChild(iconInst('check', C.primaryFg, 14));
          } else if (si === 1) {
            // current
            fill(sCircle, C.primary);
            sCircle.appendChild(tx(String(si + 1), 'Medium', 13, C.primaryFg));
          } else {
            // upcoming
            noFill(sCircle); stroke(sCircle, C.border);
            sCircle.appendChild(tx(String(si + 1), 'Regular', 13, C.mutedFg));
          }
          sItem.appendChild(sCircle);
          // Label
          var sLabel = figma.createFrame();
          sLabel.layoutMode = 'VERTICAL'; sLabel.primaryAxisSizingMode = 'AUTO';
          sLabel.counterAxisSizingMode = 'AUTO'; sLabel.itemSpacing = 2; noFill(sLabel);
          var sTitle = tx('Step ' + (si + 1), 'Medium', 13, si <= 1 ? C.fg : C.mutedFg);
          var sDesc = tx(si === 0 ? 'Completed' : si === 1 ? 'In progress' : 'Pending', 'Regular', 11, C.mutedFg);
          sLabel.appendChild(sTitle); sLabel.appendChild(sDesc);
          sItem.appendChild(sLabel);
          sComp.appendChild(sItem);
          // Connector between steps — aligned to circle center
          if (si < nSteps - 1) {
            var sConn = figma.createFrame();
            if (orient === 'Horizontal') {
              // Wrap in a 28px-tall frame so connector sits at circle vertical center
              var sConnWrap = figma.createFrame();
              sConnWrap.layoutMode = 'VERTICAL'; sConnWrap.primaryAxisSizingMode = 'AUTO';
              sConnWrap.counterAxisSizingMode = 'AUTO'; sConnWrap.itemSpacing = 0; noFill(sConnWrap);
              var sConnSpacer = figma.createFrame(); sConnSpacer.resize(32, 13); noFill(sConnSpacer);
              sConnWrap.appendChild(sConnSpacer);
              sConn.resize(32, 2); sConn.layoutMode = 'HORIZONTAL';
              sConn.primaryAxisSizingMode = 'FIXED'; sConn.counterAxisSizingMode = 'FIXED';
              fill(sConn, si === 0 ? C.primary : C.border);
              sConnWrap.appendChild(sConn);
              sComp.appendChild(sConnWrap);
            } else {
              // Wrap in a frame with left offset = 13px (center of 28px circle)
              var sConnWrap = figma.createFrame();
              sConnWrap.layoutMode = 'HORIZONTAL'; sConnWrap.primaryAxisSizingMode = 'AUTO';
              sConnWrap.counterAxisSizingMode = 'AUTO'; sConnWrap.itemSpacing = 0; noFill(sConnWrap);
              var sConnSpacerL = figma.createFrame(); sConnSpacerL.resize(13, 20); noFill(sConnSpacerL);
              sConnWrap.appendChild(sConnSpacerL);
              sConn.resize(2, 20); sConn.layoutMode = 'VERTICAL';
              sConn.primaryAxisSizingMode = 'FIXED'; sConn.counterAxisSizingMode = 'FIXED';
              fill(sConn, si === 0 ? C.primary : C.border);
              sConnWrap.appendChild(sConn);
              sComp.appendChild(sConnWrap);
            }
          }
        }
        stepperComps.push(sComp);
      }
    }
    y2 = makeSet('Stepper', stepperComps, p2, 60, y2);
    console.log('[OK] Stepper (' + stepperComps.length + ' variants: 3 Steps × 2 Orientation)');
  } catch (e) { console.error('[FAIL] Stepper: ' + e.message); y2 += 60; }

  console.log('[DONE] Components');

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 3: PATTERNS
  // ══════════════════════════════════════════════════════════════════════
  console.log('Building Patterns...');
  var ptRoot = col(48);
  ptRoot.name = 'Patterns'; ptRoot.paddingLeft = ptRoot.paddingRight = 60; ptRoot.paddingTop = ptRoot.paddingBottom = 60;
  fill(ptRoot, C.bg);
  // Move to p3 FIRST so children always land on the right page
  p3.appendChild(ptRoot);
  // ── Pattern: Multi-Step Form (horizontal steps) ──
  try {
    var msfStepLabels = ['Personal Info', 'Account', 'Billing', 'Confirm'];
    var msfCurrent = 2; // step index shown as active
    var msf = col(0); msf.name = 'Multi-Step Form';
    msf.resize(640, 1); msf.primaryAxisSizingMode = 'AUTO'; msf.counterAxisSizingMode = 'FIXED';
    fill(msf, C.card); stroke(msf, C.border); msf.cornerRadius = 12; msf.paddingBottom = 0;
    // Step header
 var msfHdr = row(0); msfHdr.resize(640, 1); msfHdr.layoutMode = 'HORIZONTAL';
    msfHdr.paddingLeft = msfHdr.paddingRight = 32; msfHdr.paddingTop = msfHdr.paddingBottom = 24;
    msfHdr.counterAxisAlignItems = 'CENTER'; fill(msfHdr, C.muted);
    for (var msi2 = 0; msi2 < msfStepLabels.length; msi2++) {
      var msfStep = col(6); msfStep.counterAxisAlignItems = 'CENTER'; noFill(msfStep);
      var msfCircle = figma.createFrame(); msfCircle.resize(28, 28); msfCircle.cornerRadius = 14;
      msfCircle.layoutMode = 'HORIZONTAL'; msfCircle.primaryAxisAlignItems = 'CENTER'; msfCircle.counterAxisAlignItems = 'CENTER';
      var isDone2 = msi2 < msfCurrent, isAct2 = msi2 === msfCurrent;
      fill(msfCircle, isDone2 ? C.success : isAct2 ? C.primary : C.bg);
      if (!isDone2 && !isAct2) stroke(msfCircle, C.border);
      msfCircle.appendChild(tx(isDone2 ? '✓' : String(msi2 + 1), 'Bold', 12, isDone2 || isAct2 ? C.primaryFg : C.mutedFg));
      msfStep.appendChild(msfCircle);
      msfStep.appendChild(tx(msfStepLabels[msi2], 'Medium', 11, isAct2 ? C.fg : C.mutedFg));
      msfHdr.appendChild(msfStep);
      if (msi2 < msfStepLabels.length - 1) {
        var msfLine2 = figma.createFrame(); msfLine2.resize(1, 1); noFill(msfLine2);
        fill(msfLine2, msi2 < msfCurrent ? C.success : C.border); msfLine2.layoutSizingVertical = 'FIXED'; msfLine2.resize(1, 1);
        msfHdr.appendChild(msfLine2); msfLine2.layoutGrow = 1;
      }
    }
    msf.appendChild(msfHdr);
    msfHdr.layoutSizingHorizontal = 'FILL';
 var msfSep = figma.createFrame(); msfSep.resize(640, 1); fill(msfSep, C.border); msfSep.layoutMode = 'HORIZONTAL'; msfSep.primaryAxisSizingMode = 'FIXED'; msfSep.counterAxisSizingMode = 'FIXED'; msf.appendChild(msfSep); msfSep.layoutSizingHorizontal = 'FILL';
    // Body (step 3 = Billing)
    var msfBody = col(16); msfBody.paddingLeft = msfBody.paddingRight = 32; msfBody.paddingTop = msfBody.paddingBottom = 28;
 msfBody.resize(640, 1); noFill(msfBody);
    msfBody.appendChild(tx('Billing Information', 'SemiBold', 18, C.fg));
    msfBody.appendChild(tx('Enter your payment details to complete setup.', 'Regular', 13, C.mutedFg));
    var msfFields = [['Card Number', '•••• •••• •••• 4242'], ['Expiry', 'MM / YY'], ['CVV', '•••']];
    for (var mff = 0; mff < msfFields.length; mff++) {
      var msfFG = col(6); noFill(msfFG);
      msfFG.appendChild(tx(msfFields[mff][0], 'Medium', 13, C.fg));
 var msfIn2 = row(0); msfIn2.resize(576, 40); msfIn2.layoutMode = 'HORIZONTAL'; msfIn2.layoutSizingVertical = 'FIXED';
      msfIn2.paddingLeft = msfIn2.paddingRight = 12; msfIn2.counterAxisAlignItems = 'CENTER';
      fill(msfIn2, C.bg); stroke(msfIn2, C.border); msfIn2.cornerRadius = 6;
      msfIn2.appendChild(tx(msfFields[mff][1], 'Regular', 14, C.mutedFg));
      msfFG.appendChild(msfIn2); msfBody.appendChild(msfFG);
      msfIn2.layoutSizingHorizontal = 'FILL'; msfFG.layoutSizingHorizontal = 'FILL';
    }
    msf.appendChild(msfBody);
    msfBody.layoutSizingHorizontal = 'FILL';
    // Footer
 var msfSep2 = figma.createFrame(); msfSep2.resize(640, 1); fill(msfSep2, C.border); msfSep2.layoutMode = 'HORIZONTAL'; msfSep2.primaryAxisSizingMode = 'FIXED'; msfSep2.counterAxisSizingMode = 'FIXED'; msf.appendChild(msfSep2); msfSep2.layoutSizingHorizontal = 'FILL';
    var msfFoot = row(0); msfFoot.paddingLeft = msfFoot.paddingRight = 32; msfFoot.paddingTop = msfFoot.paddingBottom = 20;
 msfFoot.resize(640, 1); msfFoot.layoutMode = 'HORIZONTAL'; msfFoot.counterAxisAlignItems = 'CENTER'; fill(msfFoot, C.muted);
    var msfBack2 = row(8); msfBack2.paddingLeft = msfBack2.paddingRight = 16; msfBack2.paddingTop = msfBack2.paddingBottom = 8;
    fill(msfBack2, C.bg); stroke(msfBack2, C.border); msfBack2.cornerRadius = RAD;
    msfBack2.appendChild(iconInst('chevron-left', C.fg, 14)); msfBack2.appendChild(tx('Back', 'Medium', 14, C.fg));
    msfFoot.appendChild(msfBack2);
    var msfFSp2 = figma.createFrame(); msfFSp2.resize(4, 1); noFill(msfFSp2); msfFoot.appendChild(msfFSp2); msfFSp2.layoutGrow = 1;
    msfFoot.appendChild(tx('Step 3 of 4', 'Regular', 12, C.mutedFg));
    var msfFSp3 = figma.createFrame(); msfFSp3.resize(4, 1); noFill(msfFSp3); msfFoot.appendChild(msfFSp3); msfFSp3.layoutGrow = 1;
    var msfNext2 = row(8); msfNext2.paddingLeft = msfNext2.paddingRight = 16; msfNext2.paddingTop = msfNext2.paddingBottom = 8;
    fill(msfNext2, C.primary); msfNext2.cornerRadius = RAD;
    msfNext2.appendChild(tx('Continue', 'Medium', 14, C.primaryFg)); msfNext2.appendChild(iconInst('chevron-right', C.primaryFg, 14));
    msfFoot.appendChild(msfNext2); msf.appendChild(msfFoot);
    msfFoot.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(msf);
    console.log('[OK] Pattern: Multi-Step Form');
  } catch (e) { console.error('[FAIL] Pattern Multi-Step Form: ' + e.message); }

  // ── Pattern: Multi-Step Form Vertical ──
  try {
    var msfvLabels = ['Account Setup', 'Personal Details', 'Preferences', 'Review'];
    var msfvCurr = 1;
    var msfvWrap = row(0); msfvWrap.name = 'Multi-Step Form Vertical';
    msfvWrap.resize(680, 1); msfvWrap.primaryAxisSizingMode = 'AUTO'; msfvWrap.counterAxisSizingMode = 'FIXED';
    msfvWrap.counterAxisAlignItems = 'MIN'; msfvWrap.itemSpacing = 0;
    fill(msfvWrap, C.card); stroke(msfvWrap, C.border); msfvWrap.cornerRadius = 12;
    // Left steps sidebar
 var msfvSide = col(0); msfvSide.resize(200, 1); msfvSide.layoutMode = 'VERTICAL'; msfvSide.layoutSizingHorizontal = 'FIXED';
    fill(msfvSide, C.muted); msfvSide.paddingTop = msfvSide.paddingBottom = 24; msfvSide.paddingLeft = msfvSide.paddingRight = 20;
    msfvSide.itemSpacing = 0;
    for (var mvi = 0; mvi < msfvLabels.length; mvi++) {
      var msfvStep = row(12); msfvStep.paddingTop = msfvStep.paddingBottom = 12;
 msfvStep.resize(160, 1); msfvStep.layoutMode = 'HORIZONTAL'; msfvStep.counterAxisAlignItems = 'CENTER'; noFill(msfvStep);
      var mvDone = mvi < msfvCurr, mvAct = mvi === msfvCurr;
      var msfvCircle = figma.createFrame(); msfvCircle.resize(24, 24); msfvCircle.cornerRadius = 12;
      msfvCircle.layoutMode = 'HORIZONTAL'; msfvCircle.primaryAxisAlignItems = 'CENTER'; msfvCircle.counterAxisAlignItems = 'CENTER';
      fill(msfvCircle, mvDone ? C.success : mvAct ? C.primary : C.bg);
      if (!mvDone && !mvAct) stroke(msfvCircle, C.border);
      msfvCircle.appendChild(tx(mvDone ? '✓' : String(mvi + 1), 'Bold', 10, mvDone || mvAct ? C.primaryFg : C.mutedFg));
      msfvStep.appendChild(msfvCircle);
      msfvStep.appendChild(tx(msfvLabels[mvi], 'Medium', 12, mvAct ? C.fg : C.mutedFg));
      msfvSide.appendChild(msfvStep);
      msfvStep.layoutSizingHorizontal = 'FILL';
      if (mvi < msfvLabels.length - 1) {
        var msfvLine = figma.createFrame(); msfvLine.resize(2, 20); fill(msfvLine, mvi < msfvCurr ? C.success : C.border);
        msfvLine.layoutPositioning = 'ABSOLUTE'; msfvLine.x = 29; msfvLine.y = -10; msfvSide.appendChild(msfvLine);
      }
    }
    msfvWrap.appendChild(msfvSide);
    msfvSide.layoutSizingVertical = 'FILL';
    // Vertical divider
 var msfvDiv = figma.createFrame(); msfvDiv.resize(1, 1); msfvDiv.layoutMode = 'VERTICAL'; fill(msfvDiv, C.border);
    msfvWrap.appendChild(msfvDiv);
    msfvDiv.layoutSizingVertical = 'FILL';
    // Right content
    var msfvContent = col(16); msfvContent.primaryAxisSizingMode = 'AUTO';
    msfvContent.paddingLeft = msfvContent.paddingRight = 32; msfvContent.paddingTop = msfvContent.paddingBottom = 28;
    noFill(msfvContent);
    msfvContent.appendChild(tx('Personal Details', 'SemiBold', 18, C.fg));
    msfvContent.appendChild(tx('Tell us about yourself.', 'Regular', 13, C.mutedFg));
    var msfvFRow = row(16); noFill(msfvFRow);
    var msfvFNames = ['First Name', 'Last Name'];
    for (var mvfi = 0; mvfi < 2; mvfi++) {
      var msfvFG2 = col(6); noFill(msfvFG2);
      msfvFG2.appendChild(tx(msfvFNames[mvfi], 'Medium', 13, C.fg));
 var msfvIn = row(0); msfvIn.resize(160, 40); msfvIn.layoutMode = 'HORIZONTAL'; msfvIn.layoutSizingVertical = 'FIXED';
      msfvIn.paddingLeft = msfvIn.paddingRight = 12; msfvIn.counterAxisAlignItems = 'CENTER';
      fill(msfvIn, C.bg); stroke(msfvIn, C.border); msfvIn.cornerRadius = 6;
      msfvIn.appendChild(tx(mvfi === 0 ? 'Jane' : 'Doe', 'Regular', 14, C.fg));
      msfvFG2.appendChild(msfvIn); msfvFRow.appendChild(msfvFG2); msfvFG2.layoutGrow = 1;
      msfvIn.layoutSizingHorizontal = 'FILL';
    }
    msfvContent.appendChild(msfvFRow); msfvFRow.layoutSizingHorizontal = 'FILL';
    var msfvEmailFG = col(6); noFill(msfvEmailFG);
    msfvEmailFG.appendChild(tx('Email', 'Medium', 13, C.fg));
 var msfvEmailIn = row(0); msfvEmailIn.resize(400, 40); msfvEmailIn.layoutMode = 'HORIZONTAL'; msfvEmailIn.layoutSizingVertical = 'FIXED';
    msfvEmailIn.paddingLeft = msfvEmailIn.paddingRight = 12; msfvEmailIn.counterAxisAlignItems = 'CENTER';
    fill(msfvEmailIn, C.bg); stroke(msfvEmailIn, C.border); msfvEmailIn.cornerRadius = 6;
    msfvEmailIn.appendChild(tx('jane.doe@example.com', 'Regular', 14, C.fg));
    msfvEmailFG.appendChild(msfvEmailIn); msfvContent.appendChild(msfvEmailFG);
    msfvEmailIn.layoutSizingHorizontal = 'FILL'; msfvEmailFG.layoutSizingHorizontal = 'FILL';
    // Footer buttons
    var msfvFoot = row(8); msfvFoot.paddingTop = 16; noFill(msfvFoot); msfvFoot.primaryAxisAlignItems = 'MAX';
    var msfvBack = row(8); msfvBack.paddingLeft = msfvBack.paddingRight = 16; msfvBack.paddingTop = msfvBack.paddingBottom = 8;
    fill(msfvBack, C.bg); stroke(msfvBack, C.border); msfvBack.cornerRadius = RAD;
    msfvBack.appendChild(tx('Back', 'Medium', 14, C.fg)); msfvFoot.appendChild(msfvBack);
    var msfvNext = row(8); msfvNext.paddingLeft = msfvNext.paddingRight = 16; msfvNext.paddingTop = msfvNext.paddingBottom = 8;
    fill(msfvNext, C.primary); msfvNext.cornerRadius = RAD;
    msfvNext.appendChild(tx('Save & Continue', 'Medium', 14, C.primaryFg)); msfvFoot.appendChild(msfvNext);
    msfvContent.appendChild(msfvFoot); msfvWrap.appendChild(msfvContent); msfvContent.layoutGrow = 1;
    ptRoot.appendChild(msfvWrap);
    console.log('[OK] Pattern: Multi-Step Form Vertical');
  } catch (e) { console.error('[FAIL] Pattern Multi-Step Form Vertical: ' + e.message); }

  // ── Pattern: Multi-Step Wizard Vertical ──
  try {
    var mswvLabels = [['Connect Source', 'done'], ['Map Fields', 'active'], ['Configure Rules', 'pending'], ['Publish', 'pending']];
    var mswv = col(0); mswv.name = 'Multi-Step Wizard Vertical';
    mswv.resize(600, 1); mswv.primaryAxisSizingMode = 'AUTO'; mswv.counterAxisSizingMode = 'FIXED';
    fill(mswv, C.card); stroke(mswv, C.border); mswv.cornerRadius = 12;
    // Header
    var mswvHdr = row(0); mswvHdr.paddingLeft = mswvHdr.paddingRight = 28; mswvHdr.paddingTop = mswvHdr.paddingBottom = 20;
 mswvHdr.resize(600, 1); mswvHdr.layoutMode = 'HORIZONTAL'; mswvHdr.counterAxisAlignItems = 'CENTER'; fill(mswvHdr, C.muted);
    mswvHdr.appendChild(tx('Data Import Wizard', 'Bold', 18, C.fg));
    var mswvHSp = figma.createFrame(); mswvHSp.resize(4, 1); noFill(mswvHSp); mswvHdr.appendChild(mswvHSp); mswvHSp.layoutGrow = 1;
    mswvHdr.appendChild(tx('Step 2 of 4', 'Regular', 13, C.mutedFg)); mswv.appendChild(mswvHdr);
    mswvHdr.layoutSizingHorizontal = 'FILL';
 var mswvSepH = figma.createFrame(); mswvSepH.resize(600, 1); fill(mswvSepH, C.border); mswvSepH.layoutMode = 'HORIZONTAL'; mswvSepH.primaryAxisSizingMode = 'FIXED'; mswvSepH.counterAxisSizingMode = 'FIXED'; mswv.appendChild(mswvSepH); mswvSepH.layoutSizingHorizontal = 'FILL';
    // Body
 var mswvBody = row(0); mswvBody.resize(600, 1); mswvBody.layoutMode = 'HORIZONTAL';
    mswvBody.counterAxisAlignItems = 'MIN'; mswvBody.primaryAxisSizingMode = 'AUTO'; noFill(mswvBody);
    // Steps sidebar
 var mswvStepsSide = col(0); mswvStepsSide.resize(200, 1); mswvStepsSide.layoutMode = 'VERTICAL';
    fill(mswvStepsSide, C.bg); mswvStepsSide.paddingTop = mswvStepsSide.paddingBottom = 20;
    mswvStepsSide.paddingLeft = mswvStepsSide.paddingRight = 16; mswvStepsSide.itemSpacing = 0;
    for (var mwvi = 0; mwvi < mswvLabels.length; mwvi++) {
      var mwvState = mswvLabels[mwvi][1];
      var mswvStepRow = row(10); mswvStepRow.paddingTop = mswvStepRow.paddingBottom = 10;
 mswvStepRow.resize(168, 1); mswvStepRow.layoutMode = 'HORIZONTAL'; mswvStepRow.counterAxisAlignItems = 'CENTER'; noFill(mswvStepRow);
      if (mwvState === 'active') fill(mswvStepRow, C.accent);
      mswvStepRow.cornerRadius = 6;
      var mswvCirc2 = figma.createFrame(); mswvCirc2.resize(22, 22); mswvCirc2.cornerRadius = 11;
      mswvCirc2.layoutMode = 'HORIZONTAL'; mswvCirc2.primaryAxisAlignItems = 'CENTER'; mswvCirc2.counterAxisAlignItems = 'CENTER';
      fill(mswvCirc2, mwvState === 'done' ? C.success : mwvState === 'active' ? C.primary : C.muted);
      if (mwvState === 'pending') stroke(mswvCirc2, C.border);
      mswvCirc2.appendChild(tx(mwvState === 'done' ? '✓' : String(mwvi + 1), 'Bold', 10,
        mwvState === 'pending' ? C.mutedFg : C.primaryFg));
      mswvStepRow.appendChild(mswvCirc2);
      var mswvStepInfo = col(1); noFill(mswvStepInfo);
      mswvStepInfo.appendChild(tx(mswvLabels[mwvi][0], 'Medium', 12, mwvState === 'active' ? C.fg : C.mutedFg));
      mswvStepInfo.appendChild(tx(mwvState === 'done' ? 'Completed' : mwvState === 'active' ? 'In progress' : 'Pending', 'Regular', 10,
        mwvState === 'done' ? C.success : mwvState === 'active' ? C.primary : C.mutedFg));
      mswvStepRow.appendChild(mswvStepInfo); mswvStepsSide.appendChild(mswvStepRow);
      mswvStepRow.layoutSizingHorizontal = 'FILL';
    }
    mswvBody.appendChild(mswvStepsSide);
    mswvStepsSide.layoutSizingVertical = 'FILL';
 var mswvSideDiv = figma.createFrame(); mswvSideDiv.resize(1, 1); mswvSideDiv.layoutMode = 'VERTICAL'; fill(mswvSideDiv, C.border);
    mswvBody.appendChild(mswvSideDiv);
    mswvSideDiv.layoutSizingVertical = 'FILL';
    // Content area
    var mswvContent2 = col(16); noFill(mswvContent2);
    mswvContent2.paddingLeft = mswvContent2.paddingRight = 28; mswvContent2.paddingTop = mswvContent2.paddingBottom = 24;
    mswvContent2.appendChild(tx('Map Fields', 'SemiBold', 16, C.fg));
    mswvContent2.appendChild(tx('Match your CSV columns to the system fields.', 'Regular', 13, C.mutedFg));
    var mswvFields2 = [['Name', 'full_name'], ['Email', 'email_address'], ['Amount', 'invoice_total']];
    for (var mwcf = 0; mwcf < mswvFields2.length; mwcf++) {
      var mwRow = row(8); mwRow.counterAxisAlignItems = 'CENTER'; noFill(mwRow);
 mwRow.resize(340, 1); mwRow.layoutMode = 'HORIZONTAL';
      var mwSrc = row(0); mwSrc.resize(130, 36); mwSrc.layoutSizingVertical = 'FIXED'; mwSrc.layoutSizingHorizontal = 'FILL';
      mwSrc.paddingLeft = mwSrc.paddingRight = 10; mwSrc.counterAxisAlignItems = 'CENTER';
      fill(mwSrc, C.successSubtle); stroke(mwSrc, C.success); mwSrc.cornerRadius = 6;
      mwSrc.appendChild(tx(mswvFields2[mwcf][0], 'Regular', 12, C.fg)); mwRow.appendChild(mwSrc);
      mwRow.appendChild(iconInst('arrow-right', C.mutedFg, 14));
      var mwDst = row(0); mwDst.resize(130, 36); mwDst.layoutSizingVertical = 'FIXED'; mwDst.layoutSizingHorizontal = 'FILL';
      mwDst.paddingLeft = mwDst.paddingRight = 10; mwDst.counterAxisAlignItems = 'CENTER';
      fill(mwDst, C.muted); stroke(mwDst, C.border); mwDst.cornerRadius = 6;
      mwDst.appendChild(tx(mswvFields2[mwcf][1], 'Regular', 12, C.mutedFg)); mwRow.appendChild(mwDst);
      mwRow.appendChild(iconInst('check-circle', C.success, 14));
      mswvContent2.appendChild(mwRow);
      mwRow.layoutSizingHorizontal = 'FILL';
    }
    mswvBody.appendChild(mswvContent2); mswvContent2.layoutGrow = 1; mswv.appendChild(mswvBody);
    mswvBody.layoutSizingHorizontal = 'FILL';
    // Footer
 var mswvSepF = figma.createFrame(); mswvSepF.resize(600, 1); fill(mswvSepF, C.border); mswvSepF.layoutMode = 'HORIZONTAL'; mswvSepF.primaryAxisSizingMode = 'FIXED'; mswvSepF.counterAxisSizingMode = 'FIXED'; mswv.appendChild(mswvSepF); mswvSepF.layoutSizingHorizontal = 'FILL';
    var mswvFoot = row(0); mswvFoot.paddingLeft = mswvFoot.paddingRight = 28; mswvFoot.paddingTop = mswvFoot.paddingBottom = 16;
 mswvFoot.resize(600, 1); mswvFoot.layoutMode = 'HORIZONTAL'; mswvFoot.counterAxisAlignItems = 'CENTER'; fill(mswvFoot, C.muted);
    var mswvBack2 = row(8); mswvBack2.paddingLeft = mswvBack2.paddingRight = 14; mswvBack2.paddingTop = mswvBack2.paddingBottom = 8;
    fill(mswvBack2, C.bg); stroke(mswvBack2, C.border); mswvBack2.cornerRadius = RAD;
    mswvBack2.appendChild(iconInst('chevron-left', C.fg, 14)); mswvBack2.appendChild(tx('Back', 'Medium', 13, C.fg));
    mswvFoot.appendChild(mswvBack2);
    var mswvFSp = figma.createFrame(); mswvFSp.resize(4, 1); noFill(mswvFSp); mswvFoot.appendChild(mswvFSp); mswvFSp.layoutGrow = 1;
    var mswvNext2 = row(8); mswvNext2.paddingLeft = mswvNext2.paddingRight = 14; mswvNext2.paddingTop = mswvNext2.paddingBottom = 8;
    fill(mswvNext2, C.primary); mswvNext2.cornerRadius = RAD;
    mswvNext2.appendChild(tx('Next Step', 'Medium', 13, C.primaryFg)); mswvNext2.appendChild(iconInst('chevron-right', C.primaryFg, 14));
    mswvFoot.appendChild(mswvNext2); mswv.appendChild(mswvFoot);
    mswvFoot.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(mswv);
    console.log('[OK] Pattern: Multi-Step Wizard Vertical');
  } catch (e) { console.error('[FAIL] Pattern Multi-Step Wizard Vertical: ' + e.message); }

  // ── Pattern: Advanced Forms (complex validation + conditional fields) ──
  try {
    var advForm = col(0); advForm.name = 'Advanced Forms';
    advForm.resize(640, 1); advForm.primaryAxisSizingMode = 'AUTO'; advForm.counterAxisSizingMode = 'FIXED';
    fill(advForm, C.card); stroke(advForm, C.border); advForm.cornerRadius = 12;
    // Header
    var afHdr = row(0); afHdr.paddingLeft = afHdr.paddingRight = 28; afHdr.paddingTop = afHdr.paddingBottom = 20;
 afHdr.resize(640, 1); afHdr.layoutMode = 'HORIZONTAL'; afHdr.counterAxisAlignItems = 'CENTER'; fill(afHdr, C.muted);
    afHdr.appendChild(tx('Advanced Registration Form', 'Bold', 18, C.fg));
    var afHBadge = row(0); afHBadge.paddingLeft = afHBadge.paddingRight = 8; afHBadge.paddingTop = afHBadge.paddingBottom = 3;
    fill(afHBadge, C.secondarySubtle); afHBadge.cornerRadius = 10; afHBadge.appendChild(tx('3 / 6 filled', 'Medium', 11, C.secondary));
    var afHSp = figma.createFrame(); afHSp.resize(4, 1); noFill(afHSp); afHdr.appendChild(afHSp); afHSp.layoutGrow = 1;
    afHdr.appendChild(afHBadge); advForm.appendChild(afHdr);
    afHdr.layoutSizingHorizontal = 'FILL';
 var afSep1 = figma.createFrame(); afSep1.resize(640, 1); fill(afSep1, C.border); afSep1.layoutMode = 'HORIZONTAL'; afSep1.primaryAxisSizingMode = 'FIXED'; afSep1.counterAxisSizingMode = 'FIXED'; advForm.appendChild(afSep1); afSep1.layoutSizingHorizontal = 'FILL';
    // Body
    var afBody = col(16); afBody.paddingLeft = afBody.paddingRight = 28; afBody.paddingTop = afBody.paddingBottom = 24;
 afBody.resize(640, 1); noFill(afBody);
    // Row 1: 2 columns
 var afRow1 = row(16); noFill(afRow1); afRow1.resize(584, 1); afRow1.layoutMode = 'HORIZONTAL';
    var afFieldDefs = [
      { label: 'Full Name *', val: 'Jane Doe', error: null },
      { label: 'Company', val: '', error: null },
    ];
    for (var affi = 0; affi < afFieldDefs.length; affi++) {
      var afFG2 = col(6); noFill(afFG2);
      afFG2.appendChild(tx(afFieldDefs[affi].label, 'Medium', 13, C.fg));
 var afIn = row(0); afIn.resize(260, 40); afIn.layoutMode = 'HORIZONTAL'; afIn.layoutSizingVertical = 'FIXED';
      afIn.paddingLeft = afIn.paddingRight = 12; afIn.counterAxisAlignItems = 'CENTER';
      fill(afIn, C.bg); stroke(afIn, afFieldDefs[affi].error ? C.destructive : C.border); afIn.cornerRadius = 6;
      afIn.appendChild(tx(afFieldDefs[affi].val || 'Enter value...', 'Regular', 14, afFieldDefs[affi].val ? C.fg : C.mutedFg));
      afFG2.appendChild(afIn); afRow1.appendChild(afFG2); afFG2.layoutGrow = 1;
      afIn.layoutSizingHorizontal = 'FILL';
    }
    afBody.appendChild(afRow1);
    afRow1.layoutSizingHorizontal = 'FILL';
    // Email with error
    var afEmailFG = col(6); noFill(afEmailFG);
    afEmailFG.appendChild(tx('Email Address *', 'Medium', 13, C.fg));
 var afEmailIn = row(8); afEmailIn.resize(584, 40); afEmailIn.layoutMode = 'HORIZONTAL'; afEmailIn.layoutSizingVertical = 'FIXED';
    afEmailIn.paddingLeft = afEmailIn.paddingRight = 12; afEmailIn.counterAxisAlignItems = 'CENTER';
    fill(afEmailIn, C.destructiveSubtle); stroke(afEmailIn, C.destructive); afEmailIn.cornerRadius = 6;
    afEmailIn.appendChild(tx('not-valid-email', 'Regular', 14, C.fg));
    var afEmailSp = figma.createFrame(); afEmailSp.resize(4, 1); noFill(afEmailSp); afEmailIn.appendChild(afEmailSp); afEmailSp.layoutGrow = 1;
    afEmailIn.appendChild(iconInst('x-circle', C.destructive, 16));
    afEmailFG.appendChild(afEmailIn);
    afEmailIn.layoutSizingHorizontal = 'FILL';
    afEmailFG.appendChild(tx('Please enter a valid email address.', 'Regular', 12, C.destructive));
    afBody.appendChild(afEmailFG);
    // Conditional field: Role selector
    var afRoleFG = col(6); noFill(afRoleFG);
    afRoleFG.appendChild(tx('Role', 'Medium', 13, C.fg));
 var afRoleSel = row(0); afRoleSel.resize(584, 40); afRoleSel.layoutMode = 'HORIZONTAL'; afRoleSel.layoutSizingVertical = 'FIXED';
    afRoleSel.paddingLeft = afRoleSel.paddingRight = 12; afRoleSel.counterAxisAlignItems = 'CENTER';
    fill(afRoleSel, C.bg); stroke(afRoleSel, C.border); afRoleSel.cornerRadius = 6;
    afRoleSel.appendChild(tx('Manager', 'Regular', 14, C.fg));
    var afRoleSp = figma.createFrame(); afRoleSp.resize(4, 1); noFill(afRoleSp); afRoleSel.appendChild(afRoleSp); afRoleSp.layoutGrow = 1;
    afRoleSel.appendChild(iconInst('chevron-down', C.mutedFg, 16));
    afRoleFG.appendChild(afRoleSel);
    afRoleSel.layoutSizingHorizontal = 'FILL';
    // Conditional field (shown when Role=Manager)
    var afCondBox = col(10); afCondBox.paddingLeft = afCondBox.paddingRight = 16; afCondBox.paddingTop = afCondBox.paddingBottom = 12;
 afCondBox.resize(584, 1);
    fill(afCondBox, C.infoSubtle); stroke(afCondBox, C.info); afCondBox.cornerRadius = 6;
    var afCondHdr = row(8); afCondHdr.counterAxisAlignItems = 'CENTER'; noFill(afCondHdr);
    afCondHdr.appendChild(iconInst('info', C.info, 14));
    afCondHdr.appendChild(tx('Manager fields (shown conditionally)', 'Medium', 12, C.info));
    afCondBox.appendChild(afCondHdr);
 var afCondIn = row(0); afCondIn.resize(552, 36); afCondIn.layoutMode = 'HORIZONTAL'; afCondIn.layoutSizingVertical = 'FIXED';
    afCondIn.paddingLeft = afCondIn.paddingRight = 10; afCondIn.counterAxisAlignItems = 'CENTER';
    fill(afCondIn, C.bg); stroke(afCondIn, C.border); afCondIn.cornerRadius = 6;
    afCondIn.appendChild(tx('Team size...', 'Regular', 13, C.mutedFg)); afCondBox.appendChild(afCondIn);
    afCondIn.layoutSizingHorizontal = 'FILL';
    afRoleFG.appendChild(afCondBox); afBody.appendChild(afRoleFG);
    afCondBox.layoutSizingHorizontal = 'FILL';
    advForm.appendChild(afBody);
    afBody.layoutSizingHorizontal = 'FILL';
    // Footer
 var afSepF = figma.createFrame(); afSepF.resize(640, 1); fill(afSepF, C.border); afSepF.layoutMode = 'HORIZONTAL'; afSepF.primaryAxisSizingMode = 'FIXED'; afSepF.counterAxisSizingMode = 'FIXED'; advForm.appendChild(afSepF); afSepF.layoutSizingHorizontal = 'FILL';
    var afFoot = row(0); afFoot.paddingLeft = afFoot.paddingRight = 28; afFoot.paddingTop = afFoot.paddingBottom = 16;
 afFoot.resize(640, 1); afFoot.layoutMode = 'HORIZONTAL'; afFoot.counterAxisAlignItems = 'CENTER'; fill(afFoot, C.muted);
    afFoot.appendChild(tx('* Required fields', 'Regular', 12, C.mutedFg));
    var afFootSp = figma.createFrame(); afFootSp.resize(4, 1); noFill(afFootSp); afFoot.appendChild(afFootSp); afFootSp.layoutGrow = 1;
    var afCancel = row(0); afCancel.paddingLeft = afCancel.paddingRight = 16; afCancel.paddingTop = afCancel.paddingBottom = 9;
    fill(afCancel, C.bg); stroke(afCancel, C.border); afCancel.cornerRadius = RAD;
    afCancel.appendChild(tx('Cancel', 'Medium', 14, C.fg)); afFoot.appendChild(afCancel);
    var afSubmit = row(8); afSubmit.paddingLeft = afSubmit.paddingRight = 20; afSubmit.paddingTop = afSubmit.paddingBottom = 9;
    fill(afSubmit, C.primary); afSubmit.cornerRadius = RAD;
    afSubmit.appendChild(tx('Submit Form', 'Medium', 14, C.primaryFg));
    afSubmit.appendChild(iconInst('check', C.primaryFg, 14)); afFoot.appendChild(afSubmit);
    advForm.appendChild(afFoot); ptRoot.appendChild(advForm);
    afFoot.layoutSizingHorizontal = 'FILL';
    console.log('[OK] Pattern: Advanced Forms');
  } catch (e) { console.error('[FAIL] Pattern Advanced Forms: ' + e.message); }

  // ── Pattern: Table Catalog ──
  try {
    var tcat = col(24); tcat.name = 'Table Catalog';
    tcat.resize(760, 1); tcat.primaryAxisSizingMode = 'AUTO'; tcat.counterAxisSizingMode = 'FIXED';
    fill(tcat, C.card); stroke(tcat, C.border); tcat.cornerRadius = 12;
    // Header
    var tcatHdr = row(0); tcatHdr.paddingLeft = tcatHdr.paddingRight = 24; tcatHdr.paddingTop = tcatHdr.paddingBottom = 16;
 tcatHdr.resize(760, 1); tcatHdr.layoutMode = 'HORIZONTAL'; tcatHdr.counterAxisAlignItems = 'CENTER'; fill(tcatHdr, C.muted);
    tcatHdr.appendChild(tx('Table Catalog', 'Bold', 18, C.fg));
    var tcatHSp = figma.createFrame(); tcatHSp.resize(4,1); noFill(tcatHSp); tcatHdr.appendChild(tcatHSp); tcatHSp.layoutGrow = 1;
    tcatHdr.appendChild(tx('4 variants · 2 densities · 8 total', 'Regular', 12, C.mutedFg));
    tcat.appendChild(tcatHdr);
    tcatHdr.layoutSizingHorizontal = 'FILL';
 var tcatSep = figma.createFrame(); tcatSep.resize(760, 1); fill(tcatSep, C.border); tcatSep.layoutMode = 'HORIZONTAL'; tcatSep.primaryAxisSizingMode = 'FIXED'; tcatSep.counterAxisSizingMode = 'FIXED'; tcat.appendChild(tcatSep); tcatSep.layoutSizingHorizontal = 'FILL';

    var tcatBody = col(32); tcatBody.paddingLeft = tcatBody.paddingRight = 24; tcatBody.paddingTop = tcatBody.paddingBottom = 24;
 tcatBody.resize(760, 1); noFill(tcatBody);

    var tcatVariants = [
      { name: 'Default',   desc: 'Standard table with header and row separators', stripe: false, sel: false, sort: false },
      { name: 'Striped',   desc: 'Alternating row background for readability',     stripe: true,  sel: false, sort: false },
      { name: 'Selection', desc: 'Row checkboxes with multi-select support',        stripe: false, sel: true,  sort: false },
      { name: 'Sorted',    desc: 'Column sort indicators (asc/desc/neutral)',       stripe: false, sel: false, sort: true  },
    ];
    var tcatCols = ['Invoice', 'Status', 'Method', 'Amount'];
    var tcatColW = [140, 100, 120, 90];
    var tcatRows = [
      ['INV-001', 'Paid',    'Card',    '$250'],
      ['INV-002', 'Pending', 'Bank',    '$150'],
      ['INV-003', 'Unpaid',  'PayPal',  '$350'],
    ];
    var tcatStClr = { 'Paid': C.success, 'Pending': C.warning, 'Unpaid': '#dc2626' };

    for (var tcvi = 0; tcvi < tcatVariants.length; tcvi++) {
      var tv = tcatVariants[tcvi];
 var tcatSection = col(8); tcatSection.resize(712, 1); noFill(tcatSection);
      // Section label
      var tcatLblRow = row(8); noFill(tcatLblRow); tcatLblRow.counterAxisAlignItems = 'CENTER';
      var tcatBadge = row(0); tcatBadge.paddingLeft = tcatBadge.paddingRight = 8; tcatBadge.paddingTop = tcatBadge.paddingBottom = 3;
      fill(tcatBadge, C.accent); tcatBadge.cornerRadius = 10;
      tcatBadge.appendChild(tx(tv.name, 'Medium', 11, C.primary));
      tcatLblRow.appendChild(tcatBadge);
      tcatLblRow.appendChild(tx(tv.desc, 'Regular', 12, C.mutedFg));
      tcatSection.appendChild(tcatLblRow);

      // Mini table
      var tcatTbl = figma.createFrame(); tcatTbl.layoutMode = 'VERTICAL'; tcatTbl.primaryAxisSizingMode = 'AUTO'; tcatTbl.counterAxisSizingMode = 'AUTO';
      tcatTbl.itemSpacing = 0; stroke(tcatTbl, C.border); tcatTbl.cornerRadius = 8; tcatTbl.clipsContent = true; noFill(tcatTbl);

      // Header
      var tcatTHdr = row(0); tcatTHdr.counterAxisAlignItems = 'CENTER'; fill(tcatTHdr, C.muted);
      if (tv.sel) {
        var tcCbH = figma.createFrame(); tcCbH.resize(36, 36); tcCbH.layoutMode = 'HORIZONTAL'; tcCbH.primaryAxisSizingMode = 'FIXED'; tcCbH.counterAxisSizingMode = 'FIXED'; tcCbH.primaryAxisAlignItems = 'CENTER'; tcCbH.counterAxisAlignItems = 'CENTER'; noFill(tcCbH);
        var tcCbHBox = figma.createFrame(); tcCbHBox.resize(13, 13); tcCbHBox.cornerRadius = 3; fill(tcCbHBox, C.primary); tcCbHBox.layoutMode = 'HORIZONTAL'; tcCbHBox.primaryAxisSizingMode = 'FIXED'; tcCbHBox.counterAxisSizingMode = 'FIXED'; tcCbHBox.primaryAxisAlignItems = 'CENTER'; tcCbHBox.counterAxisAlignItems = 'CENTER'; tcCbHBox.appendChild(tx('−', 'Bold', 9, C.primaryFg));
        tcCbH.appendChild(tcCbHBox); tcatTHdr.appendChild(tcCbH);
      }
      for (var tchi = 0; tchi < tcatCols.length; tchi++) {
        var tchCell = row(4); tchCell.resize(tcatColW[tchi], 36); tchCell.layoutSizingHorizontal = tchi === tcatCols.length - 1 ? 'FILL' : 'FIXED'; tchCell.counterAxisAlignItems = 'CENTER'; tchCell.paddingLeft = tchCell.paddingRight = 10;
        tchCell.appendChild(tx(tcatCols[tchi], 'SemiBold', 11, C.mutedFg));
        if (tv.sort && tchi === 0) tchCell.appendChild(iconInst('arrow-up', C.primary, 11));
        else if (tv.sort && tchi === 3) tchCell.appendChild(iconInst('chevron-up', C.mutedFg, 11));
        tcatTHdr.appendChild(tchCell);
      }
      tcatTbl.appendChild(tcatTHdr); tcatTHdr.layoutSizingHorizontal = 'FILL';

      // Rows
      for (var tcri = 0; tcri < tcatRows.length; tcri++) {
        var isSel = tv.sel && tcri === 0;
        var tcrRow = row(0); tcrRow.counterAxisAlignItems = 'CENTER';
        if (tv.stripe && tcri % 2 === 1) fill(tcrRow, C.muted);
        else if (isSel) fill(tcrRow, C.accent);
        else noFill(tcrRow);
        if (tv.sel) {
          var tcCbD = figma.createFrame(); tcCbD.resize(36, 36); tcCbD.layoutMode = 'HORIZONTAL'; tcCbD.primaryAxisSizingMode = 'FIXED'; tcCbD.counterAxisSizingMode = 'FIXED'; tcCbD.primaryAxisAlignItems = 'CENTER'; tcCbD.counterAxisAlignItems = 'CENTER'; noFill(tcCbD);
          var tcCbDBox = figma.createFrame(); tcCbDBox.resize(13, 13); tcCbDBox.cornerRadius = 3;
          if (isSel) { fill(tcCbDBox, C.primary); tcCbDBox.layoutMode = 'HORIZONTAL'; tcCbDBox.primaryAxisSizingMode = 'FIXED'; tcCbDBox.counterAxisSizingMode = 'FIXED'; tcCbDBox.primaryAxisAlignItems = 'CENTER'; tcCbDBox.counterAxisAlignItems = 'CENTER'; tcCbDBox.appendChild(tx('✓', 'Bold', 8, C.primaryFg)); }
          else { noFill(tcCbDBox); stroke(tcCbDBox, C.border); }
          tcCbD.appendChild(tcCbDBox); tcrRow.appendChild(tcCbD);
        }
        for (var tcdi = 0; tcdi < tcatRows[tcri].length; tcdi++) {
          var tcdCell = row(0); tcdCell.resize(tcatColW[tcdi], 36); tcdCell.layoutSizingHorizontal = tcdi === tcatRows[tcri].length - 1 ? 'FILL' : 'FIXED'; tcdCell.counterAxisAlignItems = 'CENTER'; tcdCell.paddingLeft = tcdCell.paddingRight = 10;
          if (tcdi === 1) {
            var tcStBg = row(0); tcStBg.paddingLeft = tcStBg.paddingRight = 6; tcStBg.paddingTop = tcStBg.paddingBottom = 2; tcStBg.cornerRadius = 6;
            fill(tcStBg, softBg(tcatStClr[tcatRows[tcri][1]] || C.fg));
            tcStBg.appendChild(tx(tcatRows[tcri][1], 'Medium', 10, tcatStClr[tcatRows[tcri][1]] || C.fg));
            tcdCell.appendChild(tcStBg);
          } else { tcdCell.appendChild(tx(tcatRows[tcri][tcdi], 'Regular', 12, C.fg)); }
          tcrRow.appendChild(tcdCell);
        }
        tcatTbl.appendChild(tcrRow); tcrRow.layoutSizingHorizontal = 'FILL';
        if (tcri < tcatRows.length - 1) {
 var tcSep = figma.createFrame(); tcSep.resize(460, 1); tcSep.layoutMode = 'HORIZONTAL'; tcSep.primaryAxisSizingMode = 'FIXED'; tcSep.counterAxisSizingMode = 'FIXED'; fill(tcSep, C.border); tcatTbl.appendChild(tcSep); tcSep.layoutSizingHorizontal = 'FILL';
        }
      }
      tcatSection.appendChild(tcatTbl); tcatTbl.layoutSizingHorizontal = 'FILL';
      tcatBody.appendChild(tcatSection);
      tcatSection.layoutSizingHorizontal = 'FILL';
      if (tcvi < tcatVariants.length - 1) {
 var tcBodySep = figma.createFrame(); tcBodySep.resize(712, 1); fill(tcBodySep, C.border); tcBodySep.layoutMode = 'HORIZONTAL'; tcBodySep.primaryAxisSizingMode = 'FIXED'; tcBodySep.counterAxisSizingMode = 'FIXED'; tcatBody.appendChild(tcBodySep); tcBodySep.layoutSizingHorizontal = 'FILL';
      }
    }
    tcat.appendChild(tcatBody);
    tcatBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(tcat);
    console.log('[OK] Pattern: Table Catalog');
  } catch (e) { console.error('[FAIL] Pattern Table Catalog: ' + e.message); }

  // ── Pattern: Infinite Scroll ──
  try {
    var infScroll = col(0); infScroll.name = 'Infinite Scroll';
    infScroll.resize(480, 1); infScroll.primaryAxisSizingMode = 'AUTO'; infScroll.counterAxisSizingMode = 'FIXED';
    fill(infScroll, C.card); stroke(infScroll, C.border); infScroll.cornerRadius = 12; infScroll.clipsContent = true;
    // Header + search bar
    var isHdr = row(0); isHdr.paddingLeft = isHdr.paddingRight = 16; isHdr.paddingTop = isHdr.paddingBottom = 12;
 isHdr.resize(480, 1); isHdr.layoutMode = 'HORIZONTAL'; isHdr.counterAxisAlignItems = 'CENTER'; fill(isHdr, C.muted);
    isHdr.appendChild(tx('Invoices', 'Bold', 16, C.fg));
    var isHSp = figma.createFrame(); isHSp.resize(4,1); noFill(isHSp); isHdr.appendChild(isHSp); isHSp.layoutGrow = 1;
    var isSearch = row(8); isSearch.paddingLeft = isSearch.paddingRight = 10; isSearch.paddingTop = isSearch.paddingBottom = 6;
    fill(isSearch, C.bg); stroke(isSearch, C.border); isSearch.cornerRadius = 6; isSearch.counterAxisAlignItems = 'CENTER';
    isSearch.appendChild(iconInst('search', C.mutedFg, 13));
    isSearch.appendChild(tx('Search...', 'Regular', 12, C.mutedFg));
    isHdr.appendChild(isSearch); infScroll.appendChild(isHdr);
    isHdr.layoutSizingHorizontal = 'FILL';
 var isSep0 = figma.createFrame(); isSep0.resize(480, 1); fill(isSep0, C.border); isSep0.layoutMode = 'HORIZONTAL'; isSep0.primaryAxisSizingMode = 'FIXED'; isSep0.counterAxisSizingMode = 'FIXED'; infScroll.appendChild(isSep0); isSep0.layoutSizingHorizontal = 'FILL';

    // Items (first 6 = loaded, last = ghost loading skeleton)
    var isData = [
      { id: 'INV-047', client: 'Acme Corporation',  date: 'Mar 1',  amt: '$5,626', status: 'Paid',    dot: C.success },
      { id: 'INV-046', client: 'TechCo Solutions',  date: 'Feb 28', amt: '$2,100', status: 'Pending', dot: C.warning },
      { id: 'INV-045', client: 'StartupX Inc.',      date: 'Feb 25', amt: '$890',   status: 'Unpaid',  dot: C.destructive },
      { id: 'INV-044', client: 'GlobTech Ltd.',      date: 'Feb 20', amt: '$3,200', status: 'Paid',    dot: C.success },
      { id: 'INV-043', client: 'NovaCorp',           date: 'Feb 18', amt: '$1,540', status: 'Pending', dot: C.warning },
      { id: 'INV-042', client: 'FastScale Agency',   date: 'Feb 15', amt: '$720',   status: 'Paid',    dot: C.success },
    ];
    for (var isi = 0; isi < isData.length; isi++) {
      var isRow = row(12); isRow.paddingLeft = isRow.paddingRight = 16; isRow.paddingTop = isRow.paddingBottom = 12;
 isRow.resize(480, 1); isRow.layoutMode = 'HORIZONTAL'; isRow.counterAxisAlignItems = 'CENTER'; noFill(isRow);
      var isDot = figma.createFrame(); isDot.resize(8, 8); isDot.cornerRadius = 4; fill(isDot, isData[isi].dot); isRow.appendChild(isDot);
      var isInfo = col(2); noFill(isInfo);
      isInfo.appendChild(tx(isData[isi].id + ' · ' + isData[isi].client, 'Medium', 13, C.fg));
      isInfo.appendChild(tx(isData[isi].date, 'Regular', 11, C.mutedFg));
      isRow.appendChild(isInfo); isInfo.layoutGrow = 1;
      var isAmt = col(2); isAmt.counterAxisAlignItems = 'MAX'; noFill(isAmt);
      isAmt.appendChild(tx(isData[isi].amt, 'SemiBold', 13, C.fg));
      var isStBg = row(0); isStBg.paddingLeft = isStBg.paddingRight = 6; isStBg.paddingTop = isStBg.paddingBottom = 2; isStBg.cornerRadius = 10;
      fill(isStBg, softBg(isData[isi].dot));
      isStBg.appendChild(tx(isData[isi].status, 'Medium', 10, isData[isi].dot));
      isAmt.appendChild(isStBg); isRow.appendChild(isAmt);
      infScroll.appendChild(isRow);
      isRow.layoutSizingHorizontal = 'FILL';
      if (isi < isData.length - 1) {
 var isSepR = figma.createFrame(); isSepR.resize(480, 1); fill(isSepR, C.border); isSepR.layoutMode = 'HORIZONTAL'; isSepR.primaryAxisSizingMode = 'FIXED'; isSepR.counterAxisSizingMode = 'FIXED'; infScroll.appendChild(isSepR); isSepR.layoutSizingHorizontal = 'FILL';
      }
    }
    // Loading sentinel at bottom
    var isLoader = row(8); isLoader.paddingTop = isLoader.paddingBottom = 16;
 isLoader.resize(480, 1); isLoader.layoutMode = 'HORIZONTAL'; isLoader.primaryAxisAlignItems = 'CENTER'; fill(isLoader, C.muted);
    isLoader.appendChild(iconInst('refresh-cw', C.primary, 14));
    isLoader.appendChild(tx('Loading more invoices...', 'Regular', 12, C.mutedFg));
    infScroll.appendChild(isLoader);
    isLoader.layoutSizingHorizontal = 'FILL';
    // Footer counter
    var isFoot = row(0); isFoot.paddingTop = isFoot.paddingBottom = 8;
 isFoot.resize(480, 1); isFoot.layoutMode = 'HORIZONTAL'; isFoot.primaryAxisAlignItems = 'CENTER'; fill(isFoot, C.bg);
    isFoot.appendChild(tx('Showing 6 of 1,247 · scroll to load more', 'Regular', 11, C.mutedFg));
    infScroll.appendChild(isFoot);
    isFoot.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(infScroll);
    console.log('[OK] Pattern: Infinite Scroll');
  } catch (e) { console.error('[FAIL] Pattern Infinite Scroll: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // FACTORING DOMAIN PATTERNS (11 módulos CESIONBNK)
  // ══════════════════════════════════════════════════════════════════════

  // ── Pattern: Factoring Dashboard ──
  try {
    var fdash = col(0); fdash.name = 'Factoring Dashboard'; sbDesc(fdash);
    fdash.resize(760, 1); fdash.primaryAxisSizingMode = 'AUTO'; fdash.counterAxisSizingMode = 'FIXED';
    fill(fdash, C.card); stroke(fdash, C.border); fdash.cornerRadius = 12;
    // Header
    var fdHdr = row(0); fdHdr.paddingLeft = fdHdr.paddingRight = 24; fdHdr.paddingTop = fdHdr.paddingBottom = 16;
 fdHdr.resize(760, 1); fdHdr.layoutMode = 'HORIZONTAL'; fdHdr.counterAxisAlignItems = 'CENTER'; fill(fdHdr, C.muted);
    var fdHTitle = col(2); noFill(fdHTitle);
    fdHTitle.appendChild(tx('Factoring Dashboard', 'Bold', 18, C.fg));
    fdHTitle.appendChild(tx('CESIONBNK · Módulo de Factoring', 'Regular', 12, C.mutedFg));
    fdHdr.appendChild(fdHTitle);
    var fdHSp = figma.createFrame(); fdHSp.resize(4, 1); noFill(fdHSp); fdHdr.appendChild(fdHSp); fdHSp.layoutGrow = 1;
    var fdPeriod = row(6); fdPeriod.paddingLeft = fdPeriod.paddingRight = 10; fdPeriod.paddingTop = fdPeriod.paddingBottom = 6;
    fill(fdPeriod, C.bg); stroke(fdPeriod, C.border); fdPeriod.cornerRadius = 6; fdPeriod.counterAxisAlignItems = 'CENTER';
    fdPeriod.appendChild(iconInst('calendar', C.mutedFg, 13));
    fdPeriod.appendChild(tx('Ene 2026', 'Regular', 12, C.fg));
    fdPeriod.appendChild(iconInst('chevron-down', C.mutedFg, 12));
    fdHdr.appendChild(fdPeriod);
    fdash.appendChild(fdHdr);
    fdHdr.layoutSizingHorizontal = 'FILL';
 var fdSep1 = figma.createFrame(); fdSep1.resize(760, 1); fill(fdSep1, C.border); fdSep1.layoutMode = 'HORIZONTAL'; fdSep1.primaryAxisSizingMode = 'FIXED'; fdSep1.counterAxisSizingMode = 'FIXED'; fdash.appendChild(fdSep1); fdSep1.layoutSizingHorizontal = 'FILL';
    // KPI cards
    var fdKpiRow = row(12); fdKpiRow.paddingLeft = fdKpiRow.paddingRight = 20; fdKpiRow.paddingTop = fdKpiRow.paddingBottom = 16;
 fdKpiRow.resize(760, 1); fdKpiRow.layoutMode = 'HORIZONTAL'; noFill(fdKpiRow);
    var fdKpis = [
      ['Cartera Total', '$4,820,000,000', '+12.4%', C.primary, 'arrow-up'],
      ['Ops Activas', '184', '+8', C.success, 'zap'],
      ['Vencidas', '12', '-3', C.destructive, 'alert-circle'],
      ['Tasa Promedio', '1.72% MV', '-0.05', C.warning, 'hash']
    ];
    for (var fki = 0; fki < fdKpis.length; fki++) {
      var fdKCard = col(8); fdKCard.paddingLeft = fdKCard.paddingRight = 16; fdKCard.paddingTop = fdKCard.paddingBottom = 14;
      fill(fdKCard, C.bg); stroke(fdKCard, C.border); fdKCard.cornerRadius = 8; fdKCard.layoutGrow = 1;
 var fdKH = row(6); fdKH.counterAxisAlignItems = 'CENTER'; noFill(fdKH); fdKH.layoutMode = 'HORIZONTAL';
      fdKH.appendChild(tx(fdKpis[fki][0], 'Regular', 11, C.mutedFg));
      var fdKHSp = figma.createFrame(); fdKHSp.resize(4,1); noFill(fdKHSp); fdKH.appendChild(fdKHSp); fdKHSp.layoutGrow = 1;
      fdKH.appendChild(iconInst(fdKpis[fki][4], fdKpis[fki][3], 14));
      fdKCard.appendChild(fdKH);
      fdKH.layoutSizingHorizontal = 'FILL';
      fdKCard.appendChild(tx(fdKpis[fki][1], 'Bold', 18, C.fg));
      var fdKT = row(4); fdKT.counterAxisAlignItems = 'CENTER'; noFill(fdKT);
      var fdTrendUp = fki !== 2;
      fdKT.appendChild(iconInst(fdTrendUp ? 'arrow-up' : 'arrow-down', fdKpis[fki][3], 11));
      fdKT.appendChild(tx(fdKpis[fki][2] + ' vs mes ant.', 'Regular', 11, C.mutedFg));
      fdKCard.appendChild(fdKT);
      fdKpiRow.appendChild(fdKCard);
    }
    fdash.appendChild(fdKpiRow);
    fdKpiRow.layoutSizingHorizontal = 'FILL';
 var fdSep2 = figma.createFrame(); fdSep2.resize(760, 1); fill(fdSep2, C.border); fdSep2.layoutMode = 'HORIZONTAL'; fdSep2.primaryAxisSizingMode = 'FIXED'; fdSep2.counterAxisSizingMode = 'FIXED'; fdash.appendChild(fdSep2); fdSep2.layoutSizingHorizontal = 'FILL';
    // Body: chart + recent ops
 var fdBody = row(0); fdBody.resize(760, 1); fdBody.layoutMode = 'HORIZONTAL'; fdBody.primaryAxisSizingMode = 'AUTO'; fdBody.counterAxisAlignItems = 'MIN'; noFill(fdBody);
    // Left: bar chart
    var fdChartBox = col(12); fdChartBox.paddingLeft = fdChartBox.paddingRight = 20; fdChartBox.paddingTop = fdChartBox.paddingBottom = 16;
    noFill(fdChartBox); fdChartBox.layoutGrow = 1;
    fdChartBox.appendChild(tx('Desembolsos vs Cobros (COP MM)', 'SemiBold', 13, C.fg));
    var fdChartArea = figma.createFrame(); fdChartArea.resize(400, 160); fill(fdChartArea, C.bg); stroke(fdChartArea, C.border); fdChartArea.cornerRadius = 8;
 fdChartArea.layoutMode = 'HORIZONTAL'; fdChartArea.counterAxisAlignItems = 'MAX'; fdChartArea.itemSpacing = 8; fdChartArea.paddingLeft = fdChartArea.paddingRight = 12; fdChartArea.paddingBottom = 8;
    var fdMonths = ['Ago','Sep','Oct','Nov','Dic','Ene'];
    var fdDesBars = [0.6, 0.75, 0.55, 0.8, 0.7, 0.9];
    var fdCobBars = [0.5, 0.65, 0.6, 0.7, 0.65, 0.8];
    for (var fdmi = 0; fdmi < 6; fdmi++) {
      var fdMCol = col(3); fdMCol.counterAxisAlignItems = 'CENTER'; noFill(fdMCol); fdMCol.layoutGrow = 1;
      var fdBarPair = row(2); fdBarPair.counterAxisAlignItems = 'MAX'; noFill(fdBarPair);
      var fdB1 = figma.createFrame(); fdB1.resize(14, Math.round(120 * fdDesBars[fdmi])); fill(fdB1, C.primary); fdB1.cornerRadius = 3; fdBarPair.appendChild(fdB1);
      var fdB2 = figma.createFrame(); fdB2.resize(14, Math.round(120 * fdCobBars[fdmi])); fill(fdB2, C.success); fdB2.cornerRadius = 3; fdBarPair.appendChild(fdB2);
      fdMCol.appendChild(fdBarPair);
      fdMCol.appendChild(tx(fdMonths[fdmi], 'Regular', 9, C.mutedFg));
      fdChartArea.appendChild(fdMCol);
    }
    fdChartBox.appendChild(fdChartArea);
    fdChartArea.layoutSizingHorizontal = 'FILL';
    var fdLegend = row(12); fdLegend.counterAxisAlignItems = 'CENTER'; noFill(fdLegend);
    var fdL1 = figma.createFrame(); fdL1.resize(8,8); fill(fdL1, C.primary); fdLegend.appendChild(fdL1); fdLegend.appendChild(tx('Desembolsos', 'Regular', 10, C.mutedFg));
    var fdL2 = figma.createFrame(); fdL2.resize(8,8); fill(fdL2, C.success); fdLegend.appendChild(fdL2); fdLegend.appendChild(tx('Cobros', 'Regular', 10, C.mutedFg));
    fdChartBox.appendChild(fdLegend);
    fdBody.appendChild(fdChartBox);
 var fdBodyDiv = figma.createFrame(); fdBodyDiv.resize(1, 1); fdBodyDiv.layoutMode = 'VERTICAL'; fill(fdBodyDiv, C.border); fdBody.appendChild(fdBodyDiv); fdBodyDiv.layoutSizingVertical = 'FILL';
    // Right: recent operations
    var fdRecent = col(0); fdRecent.paddingLeft = fdRecent.paddingRight = 16; fdRecent.paddingTop = fdRecent.paddingBottom = 16; noFill(fdRecent);
    fdRecent.resize(260, 1); fdRecent.layoutSizingHorizontal = 'FIXED'; fdRecent.primaryAxisSizingMode = 'AUTO';
    fdRecent.appendChild(tx('Operaciones Recientes', 'SemiBold', 12, C.fg));
    var fdOps = [['OP-2026-0184','Empresa ABC','$245M','vigente',C.success],['OP-2026-0183','TechCo SAS','$180M','en_mora',C.destructive],['OP-2026-0182','Industrias XY','$320M','vigente',C.success],['OP-2026-0181','Servicios Ltda','$95M','vencida',C.warning]];
    for (var fopi = 0; fopi < fdOps.length; fopi++) {
 var fdOpRow = col(2); fdOpRow.paddingTop = fdOpRow.paddingBottom = 8; noFill(fdOpRow); fdOpRow.resize(228, 1);
 var fdOpH = row(4); fdOpH.counterAxisAlignItems = 'CENTER'; noFill(fdOpH); fdOpH.layoutMode = 'HORIZONTAL';
      var fdOpDot = figma.createFrame(); fdOpDot.resize(6,6); fdOpDot.cornerRadius = 3; fill(fdOpDot, fdOps[fopi][4]); fdOpH.appendChild(fdOpDot);
      fdOpH.appendChild(tx(fdOps[fopi][0], 'Medium', 11, C.fg));
      var fdOpHSp = figma.createFrame(); fdOpHSp.resize(4,1); noFill(fdOpHSp); fdOpH.appendChild(fdOpHSp); fdOpHSp.layoutGrow = 1;
      fdOpH.appendChild(tx(fdOps[fopi][2], 'Medium', 11, C.fg));
      fdOpRow.appendChild(fdOpH);
      fdOpH.layoutSizingHorizontal = 'FILL';
      fdOpRow.appendChild(tx(fdOps[fopi][1], 'Regular', 10, C.mutedFg));
      fdRecent.appendChild(fdOpRow);
      fdOpRow.layoutSizingHorizontal = 'FILL';
 if (fopi < fdOps.length - 1) { var fdOpSep = figma.createFrame(); fdOpSep.resize(228, 1); fill(fdOpSep, C.border); fdOpSep.layoutMode = 'HORIZONTAL'; fdOpSep.primaryAxisSizingMode = 'FIXED'; fdOpSep.counterAxisSizingMode = 'FIXED'; fdRecent.appendChild(fdOpSep); fdOpSep.layoutSizingHorizontal = 'FILL'; }
    }
    fdBody.appendChild(fdRecent);
    fdash.appendChild(fdBody);
    fdBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(fdash);
    console.log('[OK] Pattern: Factoring Dashboard');
  } catch (e) { console.error('[FAIL] Pattern Factoring Dashboard: ' + e.message); }

  // ── Pattern: Factoring Portfolio ──
  try {
    var fport = col(0); fport.name = 'Factoring Portfolio'; sbDesc(fport);
    fport.resize(760, 1); fport.primaryAxisSizingMode = 'AUTO'; fport.counterAxisSizingMode = 'FIXED';
    fill(fport, C.card); stroke(fport, C.border); fport.cornerRadius = 12;
    // Header
    var fpHdr = row(0); fpHdr.paddingLeft = fpHdr.paddingRight = 20; fpHdr.paddingTop = fpHdr.paddingBottom = 14;
 fpHdr.resize(760, 1); fpHdr.layoutMode = 'HORIZONTAL'; fpHdr.counterAxisAlignItems = 'CENTER'; fill(fpHdr, C.muted);
    fpHdr.appendChild(tx('Cartera de Operaciones', 'Bold', 16, C.fg));
    var fpHSp = figma.createFrame(); fpHSp.resize(4,1); noFill(fpHSp); fpHdr.appendChild(fpHSp); fpHSp.layoutGrow = 1;
    // Search
    var fpSrch = row(6); fpSrch.paddingLeft = fpSrch.paddingRight = 10; fpSrch.paddingTop = fpSrch.paddingBottom = 6;
    fill(fpSrch, C.bg); stroke(fpSrch, C.border); fpSrch.cornerRadius = 6; fpSrch.counterAxisAlignItems = 'CENTER';
    fpSrch.appendChild(iconInst('search', C.mutedFg, 13));
    fpSrch.appendChild(tx('Buscar operación...', 'Regular', 12, C.mutedFg));
    fpHdr.appendChild(fpSrch);
    var fpNewBtn = row(6); fpNewBtn.paddingLeft = fpNewBtn.paddingRight = 14; fpNewBtn.paddingTop = fpNewBtn.paddingBottom = 7;
    fill(fpNewBtn, C.primary); fpNewBtn.cornerRadius = 6; fpNewBtn.counterAxisAlignItems = 'CENTER';
    fpNewBtn.appendChild(iconInst('plus', C.primaryFg, 13));
    fpNewBtn.appendChild(tx('Nueva Op.', 'Medium', 13, C.primaryFg));
    fpHdr.appendChild(fpNewBtn);
    fport.appendChild(fpHdr);
    fpHdr.layoutSizingHorizontal = 'FILL';
    // Filter bar
    var fpFilters = row(8); fpFilters.paddingLeft = fpFilters.paddingRight = 20; fpFilters.paddingTop = fpFilters.paddingBottom = 10;
 fpFilters.resize(760, 1); fpFilters.layoutMode = 'HORIZONTAL'; fpFilters.counterAxisAlignItems = 'CENTER'; noFill(fpFilters);
    var fpFStates = ['Todos', 'Vigentes', 'Vencidas', 'En mora', 'Cobradas'];
    var fpFActive = 0;
    for (var fpfi = 0; fpfi < fpFStates.length; fpfi++) {
      var fpFTab = row(0); fpFTab.paddingLeft = fpFTab.paddingRight = 12; fpFTab.paddingTop = fpFTab.paddingBottom = 6;
      fill(fpFTab, fpfi === fpFActive ? C.primary : C.muted); fpFTab.cornerRadius = 6;
      fpFTab.appendChild(tx(fpFStates[fpfi], 'Medium', 12, fpfi === fpFActive ? C.primaryFg : C.mutedFg));
      fpFilters.appendChild(fpFTab);
    }
    var fpFSp = figma.createFrame(); fpFSp.resize(4,1); noFill(fpFSp); fpFilters.appendChild(fpFSp); fpFSp.layoutGrow = 1;
    fpFilters.appendChild(tx('184 operaciones', 'Regular', 12, C.mutedFg));
    fport.appendChild(fpFilters);
    fpFilters.layoutSizingHorizontal = 'FILL';
 var fpSepF = figma.createFrame(); fpSepF.resize(760, 1); fill(fpSepF, C.border); fpSepF.layoutMode = 'HORIZONTAL'; fpSepF.primaryAxisSizingMode = 'FIXED'; fpSepF.counterAxisSizingMode = 'FIXED'; fport.appendChild(fpSepF); fpSepF.layoutSizingHorizontal = 'FILL';
    // Table header
    var fpTblHdr = row(0); fpTblHdr.paddingLeft = fpTblHdr.paddingRight = 16; fpTblHdr.paddingTop = fpTblHdr.paddingBottom = 0;
 fpTblHdr.resize(760, 36); fpTblHdr.layoutMode = 'HORIZONTAL'; fpTblHdr.layoutSizingVertical = 'FIXED'; fpTblHdr.counterAxisAlignItems = 'CENTER'; fill(fpTblHdr, C.muted);
    var fpCols = [['ID Operación',120],['Cedente',130],['Deudor',110],['Nominal',90],['Descuento',90],['Vencimiento',90],['Estado',80]];
    for (var fphc = 0; fphc < fpCols.length; fphc++) {
 var fpHC = figma.createFrame(); fpHC.resize(fpCols[fphc][1], 36); fpHC.layoutMode = 'HORIZONTAL';
      fpHC.primaryAxisSizingMode = 'FIXED'; fpHC.counterAxisSizingMode = 'FIXED';
      fpHC.counterAxisAlignItems = 'CENTER'; fpHC.paddingLeft = 8;
      noFill(fpHC); fpHC.appendChild(tx(fpCols[fphc][0], 'SemiBold', 11, C.mutedFg)); fpTblHdr.appendChild(fpHC);
      fpHC.layoutSizingVertical = 'FILL';
    }
    fport.appendChild(fpTblHdr);
    fpTblHdr.layoutSizingHorizontal = 'FILL';
    // Table rows
    var fpRowData = [
      ['OP-2026-0184','Empresa ABC S.A.S.','Deudor XY S.A.','$245M','$4.2M','15/Feb/26','vigente',C.success],
      ['OP-2026-0183','TechCo SAS','Retail Corp','$180M','$3.1M','20/Feb/26','en_mora',C.destructive],
      ['OP-2026-0182','Industrias XY','Dist. Norte','$320M','$5.5M','28/Feb/26','vigente',C.success],
      ['OP-2026-0181','Servicios Ltda','Cadena Sur','$95M','$1.6M','05/Mar/26','vencida',C.warning],
      ['OP-2026-0180','Constructora PQ','Materiales SA','$410M','$7.0M','10/Mar/26','vigente',C.success],
    ];
    for (var fpri = 0; fpri < fpRowData.length; fpri++) {
      var fpRow = row(0); fpRow.paddingLeft = fpRow.paddingRight = 16; fpRow.resize(760, 44);
 fpRow.layoutMode = 'HORIZONTAL'; fpRow.layoutSizingVertical = 'FIXED'; fpRow.counterAxisAlignItems = 'CENTER';
      fill(fpRow, fpri % 2 === 0 ? C.bg : C.bg);
      var fpCells = [fpRowData[fpri][0], fpRowData[fpri][1], fpRowData[fpri][2], fpRowData[fpri][3], fpRowData[fpri][4], fpRowData[fpri][5]];
      var fpCellW = [120, 130, 110, 90, 90, 90];
      for (var fpci = 0; fpci < fpCells.length; fpci++) {
 var fpCell = figma.createFrame(); fpCell.resize(fpCellW[fpci], 44); fpCell.layoutMode = 'HORIZONTAL';
        fpCell.primaryAxisSizingMode = 'FIXED'; fpCell.counterAxisSizingMode = 'FIXED';
        fpCell.counterAxisAlignItems = 'CENTER'; fpCell.paddingLeft = 8; noFill(fpCell);
        fpCell.appendChild(tx(fpCells[fpci], 'Regular', 12, C.fg)); fpRow.appendChild(fpCell);
        fpCell.layoutSizingVertical = 'FILL';
      }
 var fpStCell = figma.createFrame(); fpStCell.resize(80, 44); fpStCell.layoutMode = 'HORIZONTAL';
      fpStCell.primaryAxisSizingMode = 'FIXED'; fpStCell.counterAxisSizingMode = 'FIXED';
      fpStCell.counterAxisAlignItems = 'CENTER'; fpStCell.paddingLeft = 8; noFill(fpStCell);
      var fpStBadge = badgeInst(colorToBadgeVariant(fpRowData[fpri][7]), fpRowData[fpri][6]);
      if (!fpStBadge) { fpStBadge = row(0); fpStBadge.paddingLeft = fpStBadge.paddingRight = 7; fpStBadge.paddingTop = fpStBadge.paddingBottom = 3; fpStBadge.cornerRadius = 10; fill(fpStBadge, softBg(fpRowData[fpri][7])); fpStBadge.appendChild(tx(fpRowData[fpri][6], 'Medium', 10, fpRowData[fpri][7])); }
      fpStCell.appendChild(fpStBadge); fpRow.appendChild(fpStCell);
      fpStCell.layoutSizingVertical = 'FILL';
      fport.appendChild(fpRow);
      fpRow.layoutSizingHorizontal = 'FILL';
 var fpRSep = figma.createFrame(); fpRSep.resize(760, 1); fill(fpRSep, C.border); fpRSep.layoutMode = 'HORIZONTAL'; fpRSep.primaryAxisSizingMode = 'FIXED'; fpRSep.counterAxisSizingMode = 'FIXED'; fport.appendChild(fpRSep); fpRSep.layoutSizingHorizontal = 'FILL';
    }
    // Footer pagination
    var fpFoot = row(0); fpFoot.paddingLeft = fpFoot.paddingRight = 20; fpFoot.paddingTop = fpFoot.paddingBottom = 12;
 fpFoot.resize(760, 1); fpFoot.layoutMode = 'HORIZONTAL'; fpFoot.counterAxisAlignItems = 'CENTER'; fill(fpFoot, C.muted);
    fpFoot.appendChild(tx('Página 1 de 37 · 184 operaciones', 'Regular', 12, C.mutedFg));
    var fpFootSp = figma.createFrame(); fpFootSp.resize(4,1); noFill(fpFootSp); fpFoot.appendChild(fpFootSp); fpFootSp.layoutGrow = 1;
    var fpPagBtns = ['‹', '1', '2', '3', '›'];
    for (var fpp = 0; fpp < fpPagBtns.length; fpp++) {
      var fpPB = row(0); fpPB.resize(28, 28); fpPB.primaryAxisAlignItems = 'CENTER'; fpPB.counterAxisAlignItems = 'CENTER';
      fill(fpPB, fpp === 1 ? C.primary : C.bg); stroke(fpPB, C.border); fpPB.cornerRadius = 6;
      fpPB.appendChild(tx(fpPagBtns[fpp], 'Medium', 12, fpp === 1 ? C.primaryFg : C.fg));
      fpFoot.appendChild(fpPB);
    }
    fport.appendChild(fpFoot);
    fpFoot.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(fport);
    console.log('[OK] Pattern: Factoring Portfolio');
  } catch (e) { console.error('[FAIL] Pattern Factoring Portfolio: ' + e.message); }

  // ── Pattern: Factoring New Operation ──
  try {
    var fnop = col(0); fnop.name = 'Factoring New Operation'; sbDesc(fnop);
    fnop.resize(680, 1); fnop.primaryAxisSizingMode = 'AUTO'; fnop.counterAxisSizingMode = 'FIXED';
    fill(fnop, C.card); stroke(fnop, C.border); fnop.cornerRadius = 12;
    // Header
    var fnHdr = row(0); fnHdr.paddingLeft = fnHdr.paddingRight = 24; fnHdr.paddingTop = fnHdr.paddingBottom = 16;
 fnHdr.resize(680, 1); fnHdr.layoutMode = 'HORIZONTAL'; fnHdr.counterAxisAlignItems = 'CENTER'; fill(fnHdr, C.muted);
    fnHdr.appendChild(tx('Nueva Operación de Factoring', 'Bold', 16, C.fg));
    var fnHSp = figma.createFrame(); fnHSp.resize(4,1); noFill(fnHSp); fnHdr.appendChild(fnHSp); fnHSp.layoutGrow = 1;
    fnHdr.appendChild(iconInst('x', C.mutedFg, 18));
    fnop.appendChild(fnHdr);
    fnHdr.layoutSizingHorizontal = 'FILL';
    // Stepper
    var fnSteps = ['Datos Básicos', 'Facturas', 'Condiciones', 'Revisión'];
    var fnStepCurr = 1;
    var fnStepRow = row(0); fnStepRow.paddingLeft = fnStepRow.paddingRight = 24; fnStepRow.paddingTop = fnStepRow.paddingBottom = 16;
 fnStepRow.resize(680, 1); fnStepRow.layoutMode = 'HORIZONTAL'; fnStepRow.counterAxisAlignItems = 'CENTER'; noFill(fnStepRow);
    for (var fnsi = 0; fnsi < fnSteps.length; fnsi++) {
      var fnSCol = col(4); fnSCol.counterAxisAlignItems = 'CENTER'; noFill(fnSCol); if (fnsi > 0) fnSCol.layoutGrow = 1;
      var fnCirc = row(0); fnCirc.resize(28, 28); fnCirc.primaryAxisAlignItems = 'CENTER'; fnCirc.counterAxisAlignItems = 'CENTER'; fnCirc.cornerRadius = 14;
      var fnDone = fnsi < fnStepCurr; var fnAct = fnsi === fnStepCurr;
      fill(fnCirc, fnDone ? C.success : fnAct ? C.primary : C.muted);
      if (!fnDone && !fnAct) stroke(fnCirc, C.border);
      fnCirc.appendChild(tx(fnDone ? '✓' : String(fnsi + 1), 'Bold', 11, fnDone || fnAct ? C.primaryFg : C.mutedFg));
      fnSCol.appendChild(fnCirc);
      fnSCol.appendChild(tx(fnSteps[fnsi], 'Medium', 11, fnAct ? C.fg : C.mutedFg));
      fnStepRow.appendChild(fnSCol);
      if (fnsi < fnSteps.length - 1) {
        var fnLine = figma.createFrame(); fnLine.resize(1, 2); fnLine.layoutGrow = 1;
        fill(fnLine, fnsi < fnStepCurr ? C.success : C.border); fnStepRow.appendChild(fnLine);
      }
    }
    fnop.appendChild(fnStepRow);
    fnStepRow.layoutSizingHorizontal = 'FILL';
 var fnSepS = figma.createFrame(); fnSepS.resize(680, 1); fill(fnSepS, C.border); fnSepS.layoutMode = 'HORIZONTAL'; fnSepS.primaryAxisSizingMode = 'FIXED'; fnSepS.counterAxisSizingMode = 'FIXED'; fnop.appendChild(fnSepS); fnSepS.layoutSizingHorizontal = 'FILL';
    // Form body
    var fnBody = col(16); fnBody.paddingLeft = fnBody.paddingRight = 24; fnBody.paddingTop = fnBody.paddingBottom = 20;
 fnBody.resize(680, 1); noFill(fnBody);
    fnBody.appendChild(tx('Facturas a Descontar', 'SemiBold', 14, C.fg));
    fnBody.appendChild(tx('Agrega las facturas que deseas incluir en esta operación.', 'Regular', 12, C.mutedFg));
    // Invoice rows
 var fnInvHdr = row(0); fnInvHdr.resize(632, 32); fnInvHdr.layoutMode = 'HORIZONTAL'; fnInvHdr.counterAxisAlignItems = 'CENTER'; fill(fnInvHdr, C.muted); fnInvHdr.cornerRadius = 6;
    var fnInvCols = [['No. Factura', 160], ['Fecha Emisión', 120], ['Vencimiento', 120], ['Valor', 100], ['', 50]];
    for (var fnic = 0; fnic < fnInvCols.length; fnic++) {
      var fnIH = figma.createFrame(); fnIH.resize(fnInvCols[fnic][1], 32); fnIH.layoutMode = 'HORIZONTAL'; fnIH.counterAxisAlignItems = 'CENTER'; fnIH.paddingLeft = 10; noFill(fnIH);
      fnIH.appendChild(tx(fnInvCols[fnic][0], 'SemiBold', 11, C.mutedFg)); fnInvHdr.appendChild(fnIH);
    }
    fnBody.appendChild(fnInvHdr);
    fnInvHdr.layoutSizingHorizontal = 'FILL';
    var fnInvRows = [['FACT-2026-001','15/Ene/26','15/Feb/26','$45,200,000'],['FACT-2026-002','18/Ene/26','18/Feb/26','$82,500,000'],['FACT-2026-003','20/Ene/26','20/Feb/26','$117,300,000']];
    for (var fnir = 0; fnir < fnInvRows.length; fnir++) {
 var fnIRow = row(0); fnIRow.resize(632, 40); fnIRow.layoutMode = 'HORIZONTAL'; fnIRow.counterAxisAlignItems = 'CENTER';
      fill(fnIRow, fnir % 2 === 0 ? C.bg : C.bg); stroke(fnIRow, C.border); fnIRow.cornerRadius = 6;
      var fnIWs = [160, 120, 120, 100, 50];
      for (var fnicc = 0; fnicc < fnInvRows[fnir].length; fnicc++) {
        var fnICell = figma.createFrame(); fnICell.resize(fnIWs[fnicc], 40); fnICell.layoutMode = 'HORIZONTAL'; fnICell.counterAxisAlignItems = 'CENTER'; fnICell.paddingLeft = 10; noFill(fnICell);
        fnICell.appendChild(tx(fnInvRows[fnir][fnicc], 'Regular', 12, C.fg)); fnIRow.appendChild(fnICell);
      }
      var fnIDel = figma.createFrame(); fnIDel.resize(50, 40); fnIDel.layoutMode = 'HORIZONTAL'; fnIDel.primaryAxisSizingMode = 'FIXED'; fnIDel.counterAxisSizingMode = 'FIXED'; fnIDel.primaryAxisAlignItems = 'CENTER'; fnIDel.counterAxisAlignItems = 'CENTER'; noFill(fnIDel);
      fnIDel.appendChild(iconInst('trash-2', C.destructive, 14)); fnIRow.appendChild(fnIDel);
      fnBody.appendChild(fnIRow);
      fnIRow.layoutSizingHorizontal = 'FILL';
    }
    // Add factura button
    var fnAddBtn = row(6); fnAddBtn.paddingLeft = fnAddBtn.paddingRight = 14; fnAddBtn.paddingTop = fnAddBtn.paddingBottom = 8;
    stroke(fnAddBtn, C.border); fill(fnAddBtn, C.bg); fnAddBtn.cornerRadius = 6; fnAddBtn.counterAxisAlignItems = 'CENTER';
    fnAddBtn.appendChild(iconInst('plus', C.primary, 13));
    fnAddBtn.appendChild(tx('Agregar factura', 'Medium', 13, C.primary));
    fnBody.appendChild(fnAddBtn);
    // Total row
    var fnTotal = row(0); fnTotal.paddingLeft = fnTotal.paddingRight = 16; fnTotal.paddingTop = fnTotal.paddingBottom = 12;
 fnTotal.resize(632, 1); fnTotal.layoutMode = 'HORIZONTAL'; fnTotal.counterAxisAlignItems = 'CENTER';
    fill(fnTotal, C.accent); fnTotal.cornerRadius = 8;
    fnTotal.appendChild(tx('Total de facturas: 3 · Valor nominal:', 'Medium', 13, C.fg));
    var fnTSp = figma.createFrame(); fnTSp.resize(4,1); noFill(fnTSp); fnTotal.appendChild(fnTSp); fnTSp.layoutGrow = 1;
    fnTotal.appendChild(tx('$245,000,000', 'Bold', 14, C.primary));
    fnBody.appendChild(fnTotal);
    fnTotal.layoutSizingHorizontal = 'FILL';
    fnop.appendChild(fnBody);
    fnBody.layoutSizingHorizontal = 'FILL';
    // Footer
 var fnSepF = figma.createFrame(); fnSepF.resize(680, 1); fill(fnSepF, C.border); fnSepF.layoutMode = 'HORIZONTAL'; fnSepF.primaryAxisSizingMode = 'FIXED'; fnSepF.counterAxisSizingMode = 'FIXED'; fnop.appendChild(fnSepF); fnSepF.layoutSizingHorizontal = 'FILL';
    var fnFoot = row(8); fnFoot.paddingLeft = fnFoot.paddingRight = 24; fnFoot.paddingTop = fnFoot.paddingBottom = 16;
 fnFoot.resize(680, 1); fnFoot.layoutMode = 'HORIZONTAL'; fnFoot.counterAxisAlignItems = 'CENTER'; fill(fnFoot, C.muted); fnFoot.primaryAxisAlignItems = 'MAX';
    var fnCancel = row(0); fnCancel.paddingLeft = fnCancel.paddingRight = 16; fnCancel.paddingTop = fnCancel.paddingBottom = 9;
    fill(fnCancel, C.bg); stroke(fnCancel, C.border); fnCancel.cornerRadius = 6; fnCancel.appendChild(tx('Cancelar', 'Medium', 13, C.fg)); fnFoot.appendChild(fnCancel);
    var fnBack = row(0); fnBack.paddingLeft = fnBack.paddingRight = 16; fnBack.paddingTop = fnBack.paddingBottom = 9;
    fill(fnBack, C.bg); stroke(fnBack, C.border); fnBack.cornerRadius = 6; fnBack.appendChild(tx('← Anterior', 'Medium', 13, C.fg)); fnFoot.appendChild(fnBack);
    var fnNext = row(6); fnNext.paddingLeft = fnNext.paddingRight = 20; fnNext.paddingTop = fnNext.paddingBottom = 9;
    fill(fnNext, C.primary); fnNext.cornerRadius = 6; fnNext.counterAxisAlignItems = 'CENTER';
    fnNext.appendChild(tx('Continuar', 'Medium', 13, C.primaryFg)); fnNext.appendChild(iconInst('arrow-right', C.primaryFg, 13)); fnFoot.appendChild(fnNext);
    fnop.appendChild(fnFoot);
    fnFoot.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(fnop);
    console.log('[OK] Pattern: Factoring New Operation');
  } catch (e) { console.error('[FAIL] Pattern Factoring New Operation: ' + e.message); }

  // ── Pattern: Factoring Approval Queue ──
  try {
    var faq = col(0); faq.name = 'Factoring Approval Queue'; sbDesc(faq);
    faq.resize(760, 1); faq.primaryAxisSizingMode = 'AUTO'; faq.counterAxisSizingMode = 'FIXED';
    fill(faq, C.card); stroke(faq, C.border); faq.cornerRadius = 12;
    // Header
    var faqHdr = row(0); faqHdr.paddingLeft = faqHdr.paddingRight = 20; faqHdr.paddingTop = faqHdr.paddingBottom = 14;
 faqHdr.resize(760, 1); faqHdr.layoutMode = 'HORIZONTAL'; faqHdr.counterAxisAlignItems = 'CENTER'; fill(faqHdr, C.muted);
    var faqHLeft = col(2); noFill(faqHLeft);
    faqHLeft.appendChild(tx('Cola de Aprobación', 'Bold', 16, C.fg));
    faqHLeft.appendChild(tx('Operaciones pendientes de revisión', 'Regular', 12, C.mutedFg));
    faqHdr.appendChild(faqHLeft);
    var faqHSp = figma.createFrame(); faqHSp.resize(4,1); noFill(faqHSp); faqHdr.appendChild(faqHSp); faqHSp.layoutGrow = 1;
    var faqBadge = row(0); faqBadge.paddingLeft = faqBadge.paddingRight = 10; faqBadge.paddingTop = faqBadge.paddingBottom = 5;
    fill(faqBadge, C.destructiveSubtle); faqBadge.cornerRadius = 20;
    faqBadge.appendChild(tx('7 pendientes', 'Bold', 12, C.destructive)); faqHdr.appendChild(faqBadge);
    faq.appendChild(faqHdr);
    faqHdr.layoutSizingHorizontal = 'FILL';
    // Filter tabs
    var faqTabs = row(8); faqTabs.paddingLeft = faqTabs.paddingRight = 20; faqTabs.paddingTop = faqTabs.paddingBottom = 10;
 faqTabs.resize(760, 1); faqTabs.layoutMode = 'HORIZONTAL'; faqTabs.counterAxisAlignItems = 'CENTER'; noFill(faqTabs);
    var faqTabLabels = [['Todos', '12', true], ['Pendientes', '7', false], ['En Revisión', '3', false], ['Escalados', '2', false]];
    for (var faqti = 0; faqti < faqTabLabels.length; faqti++) {
      var faqTab = row(6); faqTab.paddingLeft = faqTab.paddingRight = 12; faqTab.paddingTop = faqTab.paddingBottom = 6;
      fill(faqTab, faqTabLabels[faqti][2] ? C.primary : C.muted); faqTab.cornerRadius = 6; faqTab.counterAxisAlignItems = 'CENTER';
      faqTab.appendChild(tx(faqTabLabels[faqti][0], 'Medium', 12, faqTabLabels[faqti][2] ? C.primaryFg : C.mutedFg));
      var faqTBadge = row(0); faqTBadge.paddingLeft = faqTBadge.paddingRight = 6; faqTBadge.paddingTop = faqTBadge.paddingBottom = 1;
      fill(faqTBadge, faqTabLabels[faqti][2] ? C.border : C.border); faqTBadge.cornerRadius = 10;
      faqTBadge.appendChild(tx(faqTabLabels[faqti][1], 'Bold', 10, faqTabLabels[faqti][2] ? C.primaryFg : C.mutedFg));
      faqTab.appendChild(faqTBadge); faqTabs.appendChild(faqTab);
    }
    faq.appendChild(faqTabs);
    faqTabs.layoutSizingHorizontal = 'FILL';
 var faqSep = figma.createFrame(); faqSep.resize(760, 1); fill(faqSep, C.border); faqSep.layoutMode = 'HORIZONTAL'; faqSep.primaryAxisSizingMode = 'FIXED'; faqSep.counterAxisSizingMode = 'FIXED'; faq.appendChild(faqSep); faqSep.layoutSizingHorizontal = 'FILL';
    // Operation cards
    var faqOps = [
      { id: 'OP-2026-0191', cedente: 'Constructora PQ SAS', deudor: 'Gobierno Nacional', nominal: '$820,000,000', tasa: '1.55% MV', plazo: 45, priority: 'alta', days: 2 },
      { id: 'OP-2026-0190', cedente: 'Industrias XY SA', deudor: 'Cadena Retail Norte', nominal: '$320,000,000', tasa: '1.72% MV', plazo: 30, priority: 'media', days: 5 },
      { id: 'OP-2026-0189', cedente: 'Servicios Integrales', deudor: 'Empresa Pública', nominal: '$95,000,000', tasa: '1.90% MV', plazo: 60, priority: 'normal', days: 8 },
    ];
    var faqPrColors = { 'alta': C.destructive, 'media': C.warning, 'normal': C.success };
    for (var faqoi = 0; faqoi < faqOps.length; faqoi++) {
      var faqOp = faqOps[faqoi];
      var faqCard = col(12); faqCard.paddingLeft = faqCard.paddingRight = 20; faqCard.paddingTop = faqCard.paddingBottom = 14;
 faqCard.resize(760, 1); noFill(faqCard);
      // Card header
 var faqCH = row(0); faqCH.counterAxisAlignItems = 'CENTER'; noFill(faqCH); faqCH.layoutMode = 'HORIZONTAL';
      var faqCHLeft = col(3); noFill(faqCHLeft);
      faqCHLeft.appendChild(tx(faqOp.id, 'Bold', 13, C.fg));
      faqCHLeft.appendChild(tx(faqOp.cedente, 'Regular', 12, C.mutedFg));
      faqCH.appendChild(faqCHLeft);
      var faqCHSp = figma.createFrame(); faqCHSp.resize(4,1); noFill(faqCHSp); faqCH.appendChild(faqCHSp); faqCHSp.layoutGrow = 1;
      // Priority badge
      var faqPBadge = row(0); faqPBadge.paddingLeft = faqPBadge.paddingRight = 8; faqPBadge.paddingTop = faqPBadge.paddingBottom = 3;
      fill(faqPBadge, softBg(faqPrColors[faqOp.priority])); faqPBadge.cornerRadius = 10;
      faqPBadge.appendChild(tx('Prioridad ' + faqOp.priority, 'Medium', 10, faqPrColors[faqOp.priority])); faqCH.appendChild(faqPBadge);
      faqCard.appendChild(faqCH);
      faqCH.layoutSizingHorizontal = 'FILL';
      // Details row
 var faqDets = row(0); faqDets.counterAxisAlignItems = 'CENTER'; noFill(faqDets); faqDets.layoutMode = 'HORIZONTAL';
      var faqDetItems = [['Deudor', faqOp.deudor], ['Nominal', faqOp.nominal], ['Tasa', faqOp.tasa], ['Plazo', faqOp.plazo + ' días']];
      for (var faqdi = 0; faqdi < faqDetItems.length; faqdi++) {
        if (faqdi > 0) { var faqDS = figma.createFrame(); faqDS.resize(1, 28); fill(faqDS, C.border); faqDets.appendChild(faqDS); }
        var faqDetCol = col(2); noFill(faqDetCol); faqDetCol.paddingLeft = faqDetCol.paddingRight = 12;
        faqDetCol.appendChild(tx(faqDetItems[faqdi][0], 'Regular', 10, C.mutedFg));
        faqDetCol.appendChild(tx(faqDetItems[faqdi][1], 'Medium', 12, C.fg)); faqDets.appendChild(faqDetCol);
      }
      var faqDetSp = figma.createFrame(); faqDetSp.resize(4,1); noFill(faqDetSp); faqDets.appendChild(faqDetSp); faqDetSp.layoutGrow = 1;
      // Timer
      var faqTimer = row(4); faqTimer.counterAxisAlignItems = 'CENTER'; noFill(faqTimer);
      faqTimer.appendChild(iconInst('clock', faqOp.days <= 3 ? C.destructive : C.mutedFg, 13));
      faqTimer.appendChild(tx(faqOp.days + ' días restantes', 'Regular', 11, faqOp.days <= 3 ? C.destructive : C.mutedFg)); faqDets.appendChild(faqTimer);
      faqCard.appendChild(faqDets);
      faqDets.layoutSizingHorizontal = 'FILL';
      // Action buttons
      var faqActions = row(8); faqActions.counterAxisAlignItems = 'CENTER'; noFill(faqActions); faqActions.primaryAxisAlignItems = 'MAX';
      var faqView = row(6); faqView.paddingLeft = faqView.paddingRight = 12; faqView.paddingTop = faqView.paddingBottom = 7;
      fill(faqView, C.bg); stroke(faqView, C.border); faqView.cornerRadius = 6; faqView.counterAxisAlignItems = 'CENTER';
      faqView.appendChild(iconInst('eye', C.mutedFg, 13)); faqView.appendChild(tx('Ver detalle', 'Medium', 12, C.fg)); faqActions.appendChild(faqView);
      var faqRej = row(6); faqRej.paddingLeft = faqRej.paddingRight = 12; faqRej.paddingTop = faqRej.paddingBottom = 7;
      fill(faqRej, C.bg); stroke(faqRej, C.destructive); faqRej.cornerRadius = 6; faqRej.counterAxisAlignItems = 'CENTER';
      faqRej.appendChild(iconInst('x', C.destructive, 13)); faqRej.appendChild(tx('Rechazar', 'Medium', 12, C.destructive)); faqActions.appendChild(faqRej);
      var faqApp = row(6); faqApp.paddingLeft = faqApp.paddingRight = 14; faqApp.paddingTop = faqApp.paddingBottom = 7;
      fill(faqApp, C.primary); faqApp.cornerRadius = 6; faqApp.counterAxisAlignItems = 'CENTER';
      faqApp.appendChild(iconInst('check', C.primaryFg, 13)); faqApp.appendChild(tx('Aprobar', 'Medium', 12, C.primaryFg)); faqActions.appendChild(faqApp);
      faqCard.appendChild(faqActions);
      faq.appendChild(faqCard);
      faqCard.layoutSizingHorizontal = 'FILL';
 if (faqoi < faqOps.length - 1) { var faqCardSep = figma.createFrame(); faqCardSep.resize(760, 1); fill(faqCardSep, C.border); faqCardSep.layoutMode = 'HORIZONTAL'; faqCardSep.primaryAxisSizingMode = 'FIXED'; faqCardSep.counterAxisSizingMode = 'FIXED'; faq.appendChild(faqCardSep); faqCardSep.layoutSizingHorizontal = 'FILL'; }
    }
    ptRoot.appendChild(faq);
    console.log('[OK] Pattern: Factoring Approval Queue');
  } catch (e) { console.error('[FAIL] Pattern Factoring Approval Queue: ' + e.message); }

  // ── Pattern: Factoring Cedent List ──
  try {
    var fcel = col(0); fcel.name = 'Factoring Cedent List'; sbDesc(fcel);
    fcel.resize(760, 1); fcel.primaryAxisSizingMode = 'AUTO'; fcel.counterAxisSizingMode = 'FIXED';
    fill(fcel, C.card); stroke(fcel, C.border); fcel.cornerRadius = 12;
    // Header
    var fcelHdr = row(0); fcelHdr.paddingLeft = fcelHdr.paddingRight = 20; fcelHdr.paddingTop = fcelHdr.paddingBottom = 14;
 fcelHdr.resize(760, 1); fcelHdr.layoutMode = 'HORIZONTAL'; fcelHdr.counterAxisAlignItems = 'CENTER'; fill(fcelHdr, C.muted);
    fcelHdr.appendChild(tx('Gestión de Cedentes', 'Bold', 16, C.fg));
    var fcelHSp = figma.createFrame(); fcelHSp.resize(4,1); noFill(fcelHSp); fcelHdr.appendChild(fcelHSp); fcelHSp.layoutGrow = 1;
    var fcelSrch = row(6); fcelSrch.paddingLeft = fcelSrch.paddingRight = 10; fcelSrch.paddingTop = fcelSrch.paddingBottom = 6;
    fill(fcelSrch, C.bg); stroke(fcelSrch, C.border); fcelSrch.cornerRadius = 6; fcelSrch.counterAxisAlignItems = 'CENTER';
    fcelSrch.appendChild(iconInst('search', C.mutedFg, 13)); fcelSrch.appendChild(tx('Buscar cedente...', 'Regular', 12, C.mutedFg));
    fcelHdr.appendChild(fcelSrch);
    var fcelNew = row(6); fcelNew.paddingLeft = fcelNew.paddingRight = 14; fcelNew.paddingTop = fcelNew.paddingBottom = 7;
    fill(fcelNew, C.primary); fcelNew.cornerRadius = 6; fcelNew.counterAxisAlignItems = 'CENTER';
    fcelNew.appendChild(iconInst('plus', C.primaryFg, 13)); fcelNew.appendChild(tx('Nuevo Cedente', 'Medium', 13, C.primaryFg)); fcelHdr.appendChild(fcelNew);
    fcel.appendChild(fcelHdr);
    fcelHdr.layoutSizingHorizontal = 'FILL';
 var fcelSep = figma.createFrame(); fcelSep.resize(760, 1); fill(fcelSep, C.border); fcelSep.layoutMode = 'HORIZONTAL'; fcelSep.primaryAxisSizingMode = 'FIXED'; fcelSep.counterAxisSizingMode = 'FIXED'; fcel.appendChild(fcelSep); fcelSep.layoutSizingHorizontal = 'FILL';
    // Table header
 var fcelTH = row(0); fcelTH.resize(760, 36); fcelTH.layoutMode = 'HORIZONTAL'; fcelTH.layoutSizingVertical = 'FIXED'; fcelTH.counterAxisAlignItems = 'CENTER'; fill(fcelTH, C.muted);
    var fcelCols = [['NIT',100],['Razón Social',170],['Cupo Aprobado',120],['Utilizado',110],['% Uso',100],['Estado',90],['Acciones',70]];
    for (var fcelci = 0; fcelci < fcelCols.length; fcelci++) {
      var fcelHC = figma.createFrame(); fcelHC.resize(fcelCols[fcelci][1], 36); fcelHC.layoutMode = 'HORIZONTAL'; fcelHC.primaryAxisSizingMode = 'FIXED'; fcelHC.counterAxisSizingMode = 'FIXED'; fcelHC.counterAxisAlignItems = 'CENTER'; fcelHC.paddingLeft = 8; noFill(fcelHC);
      fcelHC.appendChild(tx(fcelCols[fcelci][0], 'SemiBold', 11, C.mutedFg)); fcelTH.appendChild(fcelHC);
    }
    fcel.appendChild(fcelTH);
    fcelTH.layoutSizingHorizontal = 'FILL';
    // Data rows
    var fcelData = [
      ['900.123.456-7','Empresa ABC S.A.S.','$500,000,000','$265,000,000',53,'activo'],
      ['800.234.567-1','TechCo SAS','$300,000,000','$240,000,000',80,'activo'],
      ['700.345.678-2','Industrias XY SA','$750,000,000','$410,000,000',55,'activo'],
      ['600.456.789-3','Servicios Ltda','$200,000,000','$195,000,000',98,'suspendido'],
      ['500.567.890-4','Constructora PQ','$1,000,000,000','$380,000,000',38,'activo'],
    ];
    for (var fcelri = 0; fcelri < fcelData.length; fcelri++) {
 var fcelRow = row(0); fcelRow.resize(760, 44); fcelRow.layoutMode = 'HORIZONTAL'; fcelRow.layoutSizingVertical = 'FIXED'; fcelRow.counterAxisAlignItems = 'CENTER';
      fill(fcelRow, fcelri % 2 === 0 ? C.bg : C.bg);
      var fcelRCols = [fcelData[fcelri][0], fcelData[fcelri][1], fcelData[fcelri][2], fcelData[fcelri][3]];
      var fcelRWs = [100, 170, 120, 110];
      for (var fcelrci = 0; fcelrci < fcelRCols.length; fcelrci++) {
        var fcelRC = figma.createFrame(); fcelRC.resize(fcelRWs[fcelrci], 44); fcelRC.layoutMode = 'HORIZONTAL'; fcelRC.primaryAxisSizingMode = 'FIXED'; fcelRC.counterAxisSizingMode = 'FIXED'; fcelRC.counterAxisAlignItems = 'CENTER'; fcelRC.paddingLeft = 8; noFill(fcelRC);
        fcelRC.appendChild(tx(fcelRCols[fcelrci], 'Regular', 12, C.fg)); fcelRow.appendChild(fcelRC);
      }
      // Progress cell
      var fcelPCell = figma.createFrame(); fcelPCell.resize(100, 44); fcelPCell.layoutMode = 'VERTICAL'; fcelPCell.primaryAxisSizingMode = 'FIXED'; fcelPCell.counterAxisSizingMode = 'FIXED'; fcelPCell.primaryAxisAlignItems = 'CENTER'; fcelPCell.paddingLeft = 8; fcelPCell.paddingRight = 8; fcelPCell.itemSpacing = 3; noFill(fcelPCell);
      fcelPCell.appendChild(tx(fcelData[fcelri][4] + '%', 'Medium', 11, fcelData[fcelri][4] >= 90 ? C.destructive : fcelData[fcelri][4] >= 70 ? C.warning : C.success));
      var fcelTrack = figma.createFrame(); fcelTrack.resize(80, 5); fill(fcelTrack, C.muted); fcelTrack.cornerRadius = 3; fcelTrack.layoutMode = 'HORIZONTAL'; fcelTrack.primaryAxisSizingMode = 'FIXED'; fcelTrack.counterAxisSizingMode = 'FIXED';
      var fcelFill = figma.createFrame(); var fcelPW = Math.round(80 * fcelData[fcelri][4] / 100);
      fcelFill.resize(fcelPW, 5); fill(fcelFill, fcelData[fcelri][4] >= 90 ? C.destructive : fcelData[fcelri][4] >= 70 ? C.warning : C.success); fcelFill.cornerRadius = 3;
      fcelTrack.appendChild(fcelFill); fcelPCell.appendChild(fcelTrack); fcelRow.appendChild(fcelPCell);
      // Status
      var fcelStCell = figma.createFrame(); fcelStCell.resize(90, 44); fcelStCell.layoutMode = 'HORIZONTAL'; fcelStCell.primaryAxisSizingMode = 'FIXED'; fcelStCell.counterAxisSizingMode = 'FIXED'; fcelStCell.counterAxisAlignItems = 'CENTER'; fcelStCell.paddingLeft = 8; noFill(fcelStCell);
      var fcelStBadge = row(0); fcelStBadge.paddingLeft = fcelStBadge.paddingRight = 8; fcelStBadge.paddingTop = fcelStBadge.paddingBottom = 3; fcelStBadge.cornerRadius = 10;
      var fcelStColor = fcelData[fcelri][5] === 'activo' ? C.success : C.destructive;
      fcelStBadge = badgeInst(colorToBadgeVariant(fcelStColor), fcelData[fcelri][5]) || fcelStBadge;
      if (!fcelStBadge.parent) { fill(fcelStBadge, softBg(fcelStColor)); fcelStBadge.appendChild(tx(fcelData[fcelri][5], 'Medium', 10, fcelStColor)); }
      fcelStCell.appendChild(fcelStBadge); fcelRow.appendChild(fcelStCell);
      // Actions
      var fcelActCell = figma.createFrame(); fcelActCell.resize(70, 44); fcelActCell.layoutMode = 'HORIZONTAL'; fcelActCell.primaryAxisSizingMode = 'FIXED'; fcelActCell.counterAxisSizingMode = 'FIXED'; fcelActCell.primaryAxisAlignItems = 'CENTER'; fcelActCell.counterAxisAlignItems = 'CENTER'; fcelActCell.itemSpacing = 6; noFill(fcelActCell);
      fcelActCell.appendChild(iconInst('eye', C.primary, 14)); fcelActCell.appendChild(iconInst('edit', C.mutedFg, 14)); fcelRow.appendChild(fcelActCell);
      fcel.appendChild(fcelRow);
      fcelRow.layoutSizingHorizontal = 'FILL';
 var fcelRSep = figma.createFrame(); fcelRSep.resize(760, 1); fill(fcelRSep, C.border); fcelRSep.layoutMode = 'HORIZONTAL'; fcelRSep.primaryAxisSizingMode = 'FIXED'; fcelRSep.counterAxisSizingMode = 'FIXED'; fcel.appendChild(fcelRSep); fcelRSep.layoutSizingHorizontal = 'FILL';
    }
    ptRoot.appendChild(fcel);
    console.log('[OK] Pattern: Factoring Cedent List');
  } catch (e) { console.error('[FAIL] Pattern Factoring Cedent List: ' + e.message); }

  // ── Pattern: Factoring Cedent Profile ──
  try {
    var fcp = col(0); fcp.name = 'Factoring Cedent Profile'; sbDesc(fcp);
    fcp.resize(760, 1); fcp.primaryAxisSizingMode = 'AUTO'; fcp.counterAxisSizingMode = 'FIXED';
    fill(fcp, C.card); stroke(fcp, C.border); fcp.cornerRadius = 12;
    // Header with cedente info
    var fcpHdr = col(10); fcpHdr.paddingLeft = fcpHdr.paddingRight = 24; fcpHdr.paddingTop = fcpHdr.paddingBottom = 16;
 fcpHdr.resize(760, 1); fill(fcpHdr, C.muted);
 var fcpHTop = row(0); fcpHTop.counterAxisAlignItems = 'CENTER'; noFill(fcpHTop); fcpHTop.layoutMode = 'HORIZONTAL';
    var fcpAvt = row(0); fcpAvt.resize(48, 48); fcpAvt.cornerRadius = 24; fill(fcpAvt, C.primary); fcpAvt.primaryAxisAlignItems = 'CENTER'; fcpAvt.counterAxisAlignItems = 'CENTER';
    fcpAvt.appendChild(tx('EA', 'Bold', 16, C.primaryFg)); fcpHTop.appendChild(fcpAvt);
    var fcpInfo = col(3); noFill(fcpInfo); fcpInfo.paddingLeft = 12;
    fcpInfo.appendChild(tx('Empresa ABC S.A.S.', 'Bold', 18, C.fg));
    var fcpNitRow = row(8); fcpNitRow.counterAxisAlignItems = 'CENTER'; noFill(fcpNitRow);
    fcpNitRow.appendChild(tx('NIT: 900.123.456-7', 'Regular', 13, C.mutedFg));
    var fcpSepDot = tx('·', 'Regular', 13, C.mutedFg); fcpNitRow.appendChild(fcpSepDot);
    fcpNitRow.appendChild(tx('Medellín, Colombia', 'Regular', 13, C.mutedFg)); fcpInfo.appendChild(fcpNitRow); fcpHTop.appendChild(fcpInfo);
    var fcpHSp = figma.createFrame(); fcpHSp.resize(4,1); noFill(fcpHSp); fcpHTop.appendChild(fcpHSp); fcpHSp.layoutGrow = 1;
    var fcpStBadge = badgeInst('soft-success', 'Activo') || row(0);
    fcpHTop.appendChild(fcpStBadge);
    fcpHdr.appendChild(fcpHTop);
    fcpHTop.layoutSizingHorizontal = 'FILL';
    // Cupos row
    var fcpCupos = row(0); fcpCupos.counterAxisAlignItems = 'CENTER'; noFill(fcpCupos);
    var fcpCupoItems = [['Cupo Aprobado','$500,000,000',C.primary],['Cupo Utilizado','$265,000,000',C.secondary],['Cupo Disponible','$235,000,000',C.success],['Ops Activas','12',C.fg]];
    for (var fcpci = 0; fcpci < fcpCupoItems.length; fcpci++) {
      if (fcpci > 0) { var fcpCS = figma.createFrame(); fcpCS.resize(1, 36); fill(fcpCS, C.border); fcpCupos.appendChild(fcpCS); }
      var fcpCupoCol = col(2); noFill(fcpCupoCol); fcpCupoCol.paddingLeft = fcpCupoCol.paddingRight = 20;
      fcpCupoCol.appendChild(tx(fcpCupoItems[fcpci][0], 'Regular', 11, C.mutedFg));
      fcpCupoCol.appendChild(tx(fcpCupoItems[fcpci][1], 'Bold', 16, fcpCupoItems[fcpci][2])); fcpCupos.appendChild(fcpCupoCol);
    }
    fcpHdr.appendChild(fcpCupos);
    // Utilización bar
    var fcpUtilRow = col(4); noFill(fcpUtilRow);
    fcpUtilRow.appendChild(tx('Utilización del cupo: 53%', 'Regular', 11, C.mutedFg));
 var fcpBarTrack = figma.createFrame(); fcpBarTrack.resize(712, 8); fill(fcpBarTrack, C.muted); fcpBarTrack.cornerRadius = 4; fcpBarTrack.layoutMode = 'HORIZONTAL';
    var fcpBarFill = figma.createFrame(); fcpBarFill.resize(378, 8); fill(fcpBarFill, C.success); fcpBarFill.cornerRadius = 4; fcpBarTrack.appendChild(fcpBarFill); fcpUtilRow.appendChild(fcpBarTrack); fcpHdr.appendChild(fcpUtilRow);
    fcpBarTrack.layoutSizingHorizontal = 'FILL';
    fcp.appendChild(fcpHdr);
    fcpHdr.layoutSizingHorizontal = 'FILL';
 var fcpSepH = figma.createFrame(); fcpSepH.resize(760, 1); fill(fcpSepH, C.border); fcpSepH.layoutMode = 'HORIZONTAL'; fcpSepH.primaryAxisSizingMode = 'FIXED'; fcpSepH.counterAxisSizingMode = 'FIXED'; fcp.appendChild(fcpSepH); fcpSepH.layoutSizingHorizontal = 'FILL';
    // Tabs
    var fcpTabsRow = row(0); fcpTabsRow.paddingLeft = fcpTabsRow.paddingRight = 20; fcpTabsRow.paddingTop = 0; fcpTabsRow.paddingBottom = 0;
 fcpTabsRow.resize(760, 44); fcpTabsRow.layoutMode = 'HORIZONTAL'; fcpTabsRow.counterAxisAlignItems = 'MAX'; noFill(fcpTabsRow);
    var fcpTabLabels = ['Información General', 'Operaciones', 'Documentos', 'Alertas'];
    for (var fcpti = 0; fcpti < fcpTabLabels.length; fcpti++) {
      var fcpTab = row(0); fcpTab.paddingLeft = fcpTab.paddingRight = 16; fcpTab.paddingTop = fcpTab.paddingBottom = 12;
      noFill(fcpTab);
      if (fcpti === 1) { fcpTab.strokes = [{ type: 'SOLID', color: hx(C.primary) }]; fcpTab.strokeWeight = 2; fcpTab.strokeAlign = 'OUTSIDE'; }
      fcpTab.appendChild(tx(fcpTabLabels[fcpti], fcpti === 1 ? 'Medium' : 'Regular', 13, fcpti === 1 ? C.primary : C.mutedFg)); fcpTabsRow.appendChild(fcpTab);
    }
    fcp.appendChild(fcpTabsRow);
    fcpTabsRow.layoutSizingHorizontal = 'FILL';
 var fcpSepT = figma.createFrame(); fcpSepT.resize(760, 1); fill(fcpSepT, C.border); fcpSepT.layoutMode = 'HORIZONTAL'; fcpSepT.primaryAxisSizingMode = 'FIXED'; fcpSepT.counterAxisSizingMode = 'FIXED'; fcp.appendChild(fcpSepT); fcpSepT.layoutSizingHorizontal = 'FILL';
    // Operations mini-table
    var fcpOpsBody = col(0); fcpOpsBody.resize(760, 1); noFill(fcpOpsBody);
 var fcpOpTH = row(0); fcpOpTH.resize(760, 34); fcpOpTH.layoutMode = 'HORIZONTAL'; fcpOpTH.layoutSizingVertical = 'FIXED'; fcpOpTH.counterAxisAlignItems = 'CENTER'; fill(fcpOpTH, C.muted);
    var fcpOpHCols = [['ID',120],['Deudor',160],['Nominal',120],['Tasa',100],['Vencimiento',110],['Estado',110],['',40]];
    for (var fcpohc = 0; fcpohc < fcpOpHCols.length; fcpohc++) {
      var fcpOHC = figma.createFrame(); fcpOHC.resize(fcpOpHCols[fcpohc][1], 34); fcpOHC.layoutMode = 'HORIZONTAL'; fcpOHC.counterAxisAlignItems = 'CENTER'; fcpOHC.paddingLeft = 16; noFill(fcpOHC);
      fcpOHC.appendChild(tx(fcpOpHCols[fcpohc][0], 'SemiBold', 11, C.mutedFg)); fcpOpTH.appendChild(fcpOHC);
    }
    fcpOpsBody.appendChild(fcpOpTH);
    fcpOpTH.layoutSizingHorizontal = 'FILL';
    var fcpOpsData = [
      ['OP-2026-0184','Deudor XY SA','$245,000,000','1.55% MV','15/Feb/26','vigente',C.success],
      ['OP-2026-0171','Retail Corp','$180,000,000','1.72% MV','28/Mar/26','vigente',C.success],
      ['OP-2026-0155','Dist. Norte','$95,000,000','1.90% MV','10/Ene/26','cobrada',C.mutedFg],
    ];
    for (var fcpoi = 0; fcpoi < fcpOpsData.length; fcpoi++) {
 var fcpORow = row(0); fcpORow.resize(760, 42); fcpORow.layoutMode = 'HORIZONTAL'; fcpORow.layoutSizingVertical = 'FIXED'; fcpORow.counterAxisAlignItems = 'CENTER';
      fill(fcpORow, fcpoi % 2 === 0 ? C.bg : C.bg);
      var fcpORWs = [120, 160, 120, 100, 110];
      for (var fcporc = 0; fcporc < 5; fcporc++) {
        var fcpOCell = figma.createFrame(); fcpOCell.resize(fcpORWs[fcporc], 42); fcpOCell.layoutMode = 'HORIZONTAL'; fcpOCell.counterAxisAlignItems = 'CENTER'; fcpOCell.paddingLeft = 16; noFill(fcpOCell);
        fcpOCell.appendChild(tx(fcpOpsData[fcpoi][fcporc], 'Regular', 12, C.fg)); fcpORow.appendChild(fcpOCell);
      }
      var fcpOStC = figma.createFrame(); fcpOStC.resize(110, 42); fcpOStC.layoutMode = 'HORIZONTAL'; fcpOStC.counterAxisAlignItems = 'CENTER'; fcpOStC.paddingLeft = 16; noFill(fcpOStC);
      var fcpOBadge = row(0); fcpOBadge.paddingLeft = fcpOBadge.paddingRight = 8; fcpOBadge.paddingTop = fcpOBadge.paddingBottom = 3; fcpOBadge.cornerRadius = 10;
      fill(fcpOBadge, softBg(fcpOpsData[fcpoi][6])); fcpOBadge.appendChild(tx(fcpOpsData[fcpoi][5], 'Medium', 10, fcpOpsData[fcpoi][6])); fcpOStC.appendChild(fcpOBadge); fcpORow.appendChild(fcpOStC);
      var fcpOActC = figma.createFrame(); fcpOActC.resize(40, 42); fcpOActC.layoutMode = 'HORIZONTAL'; fcpOActC.primaryAxisAlignItems = 'CENTER'; fcpOActC.counterAxisAlignItems = 'CENTER'; noFill(fcpOActC);
      fcpOActC.appendChild(iconInst('link', C.primary, 13)); fcpORow.appendChild(fcpOActC);
      fcpOpsBody.appendChild(fcpORow);
      fcpORow.layoutSizingHorizontal = 'FILL';
 var fcpOSep = figma.createFrame(); fcpOSep.resize(760, 1); fill(fcpOSep, C.border); fcpOSep.layoutMode = 'HORIZONTAL'; fcpOSep.primaryAxisSizingMode = 'FIXED'; fcpOSep.counterAxisSizingMode = 'FIXED'; fcpOpsBody.appendChild(fcpOSep); fcpOSep.layoutSizingHorizontal = 'FILL';
    }
    fcp.appendChild(fcpOpsBody);
    fcpOpsBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(fcp);
    console.log('[OK] Pattern: Factoring Cedent Profile');
  } catch (e) { console.error('[FAIL] Pattern Factoring Cedent Profile: ' + e.message); }

  // ── Pattern: Gestión de Operaciones ─────────────────────────────────────────
  // ComponentSet: Select=false (9 cols) | Select=true (checkbox + BulkBar + 10 cols)
  // Mirrors FactoringOperationListV2 design: TimeProgress bar, colored tasa, status badges
  try {
    var FOW = 1000; // outer frame width (same for both variants)

    // TimeProgress sub-component builder
    // Draws: [date label → date label] / [colored bar + marker dot] / [pct% text]
    function makeTimeProgress(emisionLabel, vencLabel, pct, status) {
      var isOverdue = status === 'vencida';
      var isDone    = status === 'completada';
      var barCol = isDone ? C.mutedFg : isOverdue ? C.destructive : pct >= 75 ? C.warning : C.secondary;
      var endFg  = isOverdue ? C.destructive : pct >= 75 ? C.warning : C.fg;
      var TW = 130;
      var tp = col(4); tp.resize(TW, 1); tp.primaryAxisSizingMode = 'AUTO'; tp.counterAxisSizingMode = 'FIXED'; noFill(tp);

      // Labels row
      var tpLbls = row(4); noFill(tpLbls); tpLbls.counterAxisAlignItems = 'CENTER';
      tpLbls.resize(TW, 1); tpLbls.primaryAxisSizingMode = 'AUTO'; tpLbls.counterAxisSizingMode = 'FIXED';
      tpLbls.appendChild(tx(emisionLabel, 'Regular', 10, C.mutedFg));
      tpLbls.appendChild(tx('→', 'Regular', 10, C.mutedFg));
      var tpLSp = figma.createFrame(); tpLSp.resize(4,1); noFill(tpLSp); tpLSp.layoutGrow = 1; tpLbls.appendChild(tpLSp);
      tpLbls.appendChild(tx(vencLabel, 'Medium', 10, endFg));
      tp.appendChild(tpLbls);
      tpLbls.layoutSizingHorizontal = 'FILL';

      // Bar track (NONE layout — absolute children)
      var tpTrack = figma.createFrame(); tpTrack.resize(TW, 6); fill(tpTrack, C.muted); tpTrack.cornerRadius = 3;
      tpTrack.layoutMode = 'NONE'; tpTrack.clipsContent = false;
      var fillW = Math.max(4, Math.min(TW, Math.round(TW * pct / 100)));
      var tpFill = figma.createFrame(); tpFill.resize(fillW, 6); fill(tpFill, barCol); tpFill.cornerRadius = 3;
      tpFill.x = 0; tpFill.y = 0; tpTrack.appendChild(tpFill);
      if (!isDone) {
        var markerX = Math.max(-4, Math.min(TW - 4, Math.round(TW * pct / 100) - 4));
        var tpMark = figma.createFrame(); tpMark.resize(8, 8); fill(tpMark, barCol); tpMark.cornerRadius = 4;
        tpMark.strokes = [{ type: 'SOLID', color: hx(C.bg) }]; tpMark.strokeWeight = 2;
        tpMark.x = markerX; tpMark.y = -1; tpTrack.appendChild(tpMark);
      }
      tp.appendChild(tpTrack);
      tpTrack.layoutSizingHorizontal = 'FILL';

      // Pct label (right-aligned)
      var pctTxt = isDone ? 'Completada' : isOverdue ? 'Vencida' : pct + '% transcurrido';
      var tpPctRow = row(0); noFill(tpPctRow); tpPctRow.counterAxisAlignItems = 'CENTER';
      tpPctRow.resize(TW, 1); tpPctRow.primaryAxisSizingMode = 'AUTO'; tpPctRow.counterAxisSizingMode = 'FIXED';
      var tpPSp = figma.createFrame(); tpPSp.resize(4,1); noFill(tpPSp); tpPSp.layoutGrow = 1; tpPctRow.appendChild(tpPSp);
      tpPctRow.appendChild(tx(pctTxt, 'Regular', 10, C.mutedFg));
      tp.appendChild(tpPctRow);
      tpPctRow.layoutSizingHorizontal = 'FILL';
      return tp;
    }

    // Checkbox visual helper (simple styled 16×16)
    function makeFopChk(checked) {
      var chk = figma.createFrame(); chk.resize(16, 16); chk.cornerRadius = 3;
      chk.layoutMode = 'HORIZONTAL'; chk.primaryAxisSizingMode = 'FIXED'; chk.counterAxisSizingMode = 'FIXED';
      chk.primaryAxisAlignItems = 'CENTER'; chk.counterAxisAlignItems = 'CENTER';
      if (checked) { fill(chk, C.primary); chk.appendChild(iconInst('check', C.primaryFg, 10)); }
      else { noFill(chk); stroke(chk, C.border); }
      return chk;
    }

    // ── Data rows (5 rows, same data as FactoringOperationListV2) ──
    var fopData = [
      { id:'OP-2024-0891', sector:'Tecnología',   cedente:'Servicios TI Colombia',  deudor:'Bancolombia S.A.',      fcts:4, nominal:'$128M',  tasa:1.80, emision:'1 nov',  venc:'15 dic', pct:73,  status:'desembolsada', analista:'C. Vargas' },
      { id:'OP-2024-0892', sector:'Construcción', cedente:'Construcciones Andina',  deudor:'Ecopetrol S.A.',        fcts:2, nominal:'$95M',   tasa:2.10, emision:'8 nov',  venc:'15 ene', pct:37,  status:'aprobada',     analista:'M. Rodríguez' },
      { id:'OP-2024-0893', sector:'Manufactura',  cedente:'Industrias Cóndor S.A.', deudor:'Grupo Éxito S.A.',      fcts:6, nominal:'$210M',  tasa:1.60, emision:'22 oct', venc:'10 feb', pct:38,  status:'desembolsada', analista:'A. Torres' },
      { id:'OP-2024-0894', sector:'Textil',       cedente:'Textiles del Valle',     deudor:'Alpina S.A.',           fcts:1, nominal:'$42.5M', tasa:2.40, emision:'5 oct',  venc:'25 nov', pct:100, status:'vencida',      analista:'M. Rodríguez' },
      { id:'OP-2024-0895', sector:'Comercio',     cedente:'Distribuidora Norte',    deudor:'Avianca Holdings',      fcts:3, nominal:'$67M',   tasa:2.00, emision:'10 nov', venc:'20 dic', pct:58,  status:'pendiente',    analista:'C. Vargas' }
    ];
    var fopStatusMap = {
      'pendiente':    { label:'Pendiente',    badgeKey:'soft-outline-warning' },
      'aprobada':     { label:'Aprobada',     badgeKey:'secondary' },
      'desembolsada': { label:'Desembolsada', badgeKey:'soft-outline-success' },
      'vencida':      { label:'Vencida',      badgeKey:'soft-outline-destructive' },
      'completada':   { label:'Completada',   badgeKey:'neutral' }
    };
    function fopTasaColor(t) { return t <= 1.80 ? C.success : t <= 2.10 ? C.warning : C.destructive; }

    var fopComps = [];

    for (var fopvi = 0; fopvi < 2; fopvi++) {
      var fopHasSelect = fopvi === 1;

      // Column header labels and widths
      var fopColHdrs, fopCols;
      if (!fopHasSelect) {
        fopColHdrs = ['ID Operación', 'Cedente · Deudor', 'Fcts.', 'Nominal', 'Tasa', 'Plazo', 'Analista', 'Estado', ''];
        fopCols    = [140, 190, 55, 105, 75, 160, 100, 130, 45];
      } else {
        fopColHdrs = ['', 'ID Operación', 'Cedente · Deudor', 'Fcts.', 'Nominal', 'Tasa', 'Plazo', 'Analista', 'Estado', ''];
        fopCols    = [44, 130, 180, 50, 100, 72, 155, 95, 130, 44];
      }
      // Sortable column indices (Plazo = active sort default)
      var fopSortIdx = fopHasSelect ? 6 : 5; // "Plazo" column index

      var fopComp = figma.createComponent();
      fopComp.name = 'Select=' + (fopHasSelect ? 'true' : 'false');
      fopComp.layoutMode = 'VERTICAL';
      fopComp.primaryAxisSizingMode = 'AUTO';
      fopComp.counterAxisSizingMode = 'FIXED';
      fopComp.resize(FOW, 100);
      fill(fopComp, C.card);
      stroke(fopComp, C.border);
      fopComp.cornerRadius = 12;
      fopComp.clipsContent = true;

      // ── Header row 1: Title + action buttons ──────────────────────────────
      var fopHdr1 = row(10); fopHdr1.paddingLeft = fopHdr1.paddingRight = 20;
      fopHdr1.paddingTop = fopHdr1.paddingBottom = 14; noFill(fopHdr1); fopHdr1.counterAxisAlignItems = 'CENTER';
      var fopTitleCol = col(3); noFill(fopTitleCol);
      fopTitleCol.appendChild(tx('Gestión de Operaciones', 'Bold', 16, C.fg));
      fopTitleCol.appendChild(tx('Seguimiento con progreso emisión → vencimiento', 'Regular', 12, C.mutedFg));
      fopHdr1.appendChild(fopTitleCol);
      var fopH1Sp = figma.createFrame(); fopH1Sp.resize(4,1); noFill(fopH1Sp); fopH1Sp.layoutGrow = 1; fopHdr1.appendChild(fopH1Sp);
      // Export btn (outline)
      var fopBtnExp = row(6); fopBtnExp.paddingLeft = fopBtnExp.paddingRight = 10; fopBtnExp.paddingTop = fopBtnExp.paddingBottom = 6;
      noFill(fopBtnExp); stroke(fopBtnExp, C.border); fopBtnExp.cornerRadius = 6; fopBtnExp.counterAxisAlignItems = 'CENTER';
      fopBtnExp.appendChild(iconInst('download', C.mutedFg, 13)); fopBtnExp.appendChild(tx('Exportar', 'Medium', 12, C.fg));
      // Refresh icon btn
      var fopBtnRef = figma.createFrame(); fopBtnRef.resize(32, 32); fopBtnRef.layoutMode = 'HORIZONTAL';
      fopBtnRef.primaryAxisSizingMode = 'FIXED'; fopBtnRef.counterAxisSizingMode = 'FIXED';
      fopBtnRef.primaryAxisAlignItems = 'CENTER'; fopBtnRef.counterAxisAlignItems = 'CENTER';
      noFill(fopBtnRef); stroke(fopBtnRef, C.border); fopBtnRef.cornerRadius = 6;
      fopBtnRef.appendChild(iconInst('refresh-cw', C.mutedFg, 14));
      // Primary CTA
      var fopBtnNew = row(6); fopBtnNew.paddingLeft = fopBtnNew.paddingRight = 14; fopBtnNew.paddingTop = fopBtnNew.paddingBottom = 7;
      fill(fopBtnNew, C.primary); fopBtnNew.cornerRadius = 6; fopBtnNew.counterAxisAlignItems = 'CENTER';
      fopBtnNew.appendChild(iconInst('file-text', C.primaryFg, 13)); fopBtnNew.appendChild(tx('Nueva operación', 'Medium', 13, C.primaryFg));
      fopHdr1.appendChild(fopBtnExp); fopHdr1.appendChild(fopBtnRef); fopHdr1.appendChild(fopBtnNew);
      fopComp.appendChild(fopHdr1); fopHdr1.layoutSizingHorizontal = 'FILL';

      // Separator
      var fopS1 = figma.createFrame(); fopS1.resize(FOW, 1); fill(fopS1, C.border);
      fopS1.layoutMode = 'HORIZONTAL'; fopS1.primaryAxisSizingMode = 'FIXED'; fopS1.counterAxisSizingMode = 'FIXED';
      fopComp.appendChild(fopS1); fopS1.layoutSizingHorizontal = 'FILL';

      // ── Header row 2: Search + Filter + KPIs ─────────────────────────────
      var fopHdr2 = row(10); fopHdr2.paddingLeft = fopHdr2.paddingRight = 20;
      fopHdr2.paddingTop = fopHdr2.paddingBottom = 10; noFill(fopHdr2); fopHdr2.counterAxisAlignItems = 'CENTER';
      // Search
      var fopSrch = row(6); fopSrch.paddingLeft = fopSrch.paddingRight = 10; fopSrch.paddingTop = fopSrch.paddingBottom = 7;
      fill(fopSrch, C.bg); stroke(fopSrch, C.border); fopSrch.cornerRadius = 6; fopSrch.counterAxisAlignItems = 'CENTER';
      fopSrch.resize(210, 34); fopSrch.primaryAxisSizingMode = 'FIXED'; fopSrch.counterAxisSizingMode = 'FIXED';
      fopSrch.appendChild(iconInst('search', C.mutedFg, 13)); fopSrch.appendChild(tx('Buscar operación, cedente...', 'Regular', 11, C.mutedFg));
      // Estado filter
      var fopFilt = row(6); fopFilt.paddingLeft = fopFilt.paddingRight = 10; fopFilt.paddingTop = fopFilt.paddingBottom = 7;
      fill(fopFilt, C.bg); stroke(fopFilt, C.border); fopFilt.cornerRadius = 6; fopFilt.counterAxisAlignItems = 'CENTER';
      fopFilt.resize(148, 34); fopFilt.primaryAxisSizingMode = 'FIXED'; fopFilt.counterAxisSizingMode = 'FIXED';
      fopFilt.appendChild(iconInst('filter', C.mutedFg, 13)); fopFilt.appendChild(tx('Estado: Todos', 'Regular', 11, C.mutedFg));
      var fopFSp = figma.createFrame(); fopFSp.resize(4,1); noFill(fopFSp); fopFSp.layoutGrow = 1; fopFilt.appendChild(fopFSp);
      fopFilt.appendChild(iconInst('chevron-down', C.mutedFg, 12));
      fopHdr2.appendChild(fopSrch); fopHdr2.appendChild(fopFilt);
      // Spacer
      var fopH2Sp = figma.createFrame(); fopH2Sp.resize(4,1); noFill(fopH2Sp); fopH2Sp.layoutGrow = 1; fopHdr2.appendChild(fopH2Sp);
      // KPIs
      var fopKpiRow = row(14); noFill(fopKpiRow); fopKpiRow.counterAxisAlignItems = 'CENTER';
      var fopKpiItems = [
        ['clock',       C.warning,     '2 pendientes'],
        ['check-circle',C.success,     '2 desembolsadas'],
        ['alert-circle',C.destructive, '1 vencida']
      ];
      for (var fki = 0; fki < fopKpiItems.length; fki++) {
        var fkpiI = row(4); noFill(fkpiI); fkpiI.counterAxisAlignItems = 'CENTER';
        fkpiI.appendChild(iconInst(fopKpiItems[fki][0], fopKpiItems[fki][1], 12));
        fkpiI.appendChild(tx(fopKpiItems[fki][2], 'Regular', 11, C.mutedFg));
        fopKpiRow.appendChild(fkpiI);
      }
      fopHdr2.appendChild(fopKpiRow);
      fopComp.appendChild(fopHdr2); fopHdr2.layoutSizingHorizontal = 'FILL';

      // Separator
      var fopS2 = figma.createFrame(); fopS2.resize(FOW, 1); fill(fopS2, C.border);
      fopS2.layoutMode = 'HORIZONTAL'; fopS2.primaryAxisSizingMode = 'FIXED'; fopS2.counterAxisSizingMode = 'FIXED';
      fopComp.appendChild(fopS2); fopS2.layoutSizingHorizontal = 'FILL';

      // ── BulkBar (Select=true variant only) ───────────────────────────────
      if (fopHasSelect) {
        var fopBulk = row(10); fopBulk.paddingLeft = fopBulk.paddingRight = 20;
        fopBulk.paddingTop = fopBulk.paddingBottom = 8; fopBulk.counterAxisAlignItems = 'CENTER';
        fopBulk.fills = [{ type: 'SOLID', color: hx(C.secondary), opacity: 0.08 }];
        fopBulk.appendChild(tx('2 seleccionadas', 'Medium', 12, C.secondary));
        var fopBulkSp = figma.createFrame(); fopBulkSp.resize(4,1); noFill(fopBulkSp); fopBulkSp.layoutGrow = 1; fopBulk.appendChild(fopBulkSp);
        var fopBulkExp = row(5); fopBulkExp.paddingLeft = fopBulkExp.paddingRight = 8; fopBulkExp.paddingTop = fopBulkExp.paddingBottom = 5; noFill(fopBulkExp); fopBulkExp.cornerRadius = 5; fopBulkExp.counterAxisAlignItems = 'CENTER';
        fopBulkExp.appendChild(iconInst('download', C.fg, 12)); fopBulkExp.appendChild(tx('Exportar', 'Regular', 11, C.fg));
        var fopBulkDel = row(5); fopBulkDel.paddingLeft = fopBulkDel.paddingRight = 8; fopBulkDel.paddingTop = fopBulkDel.paddingBottom = 5; noFill(fopBulkDel); fopBulkDel.cornerRadius = 5; fopBulkDel.counterAxisAlignItems = 'CENTER';
        fopBulkDel.appendChild(iconInst('trash-2', C.destructive, 12)); fopBulkDel.appendChild(tx('Eliminar', 'Regular', 11, C.destructive));
        var fopBulkCan = row(0); fopBulkCan.paddingLeft = fopBulkCan.paddingRight = 8; fopBulkCan.paddingTop = fopBulkCan.paddingBottom = 5; noFill(fopBulkCan); fopBulkCan.cornerRadius = 5;
        fopBulkCan.appendChild(tx('Cancelar', 'Regular', 11, C.mutedFg));
        fopBulk.appendChild(fopBulkExp); fopBulk.appendChild(fopBulkDel); fopBulk.appendChild(fopBulkCan);
        fopComp.appendChild(fopBulk); fopBulk.layoutSizingHorizontal = 'FILL';
        var fopSB = figma.createFrame(); fopSB.resize(FOW, 1); fill(fopSB, C.border);
        fopSB.layoutMode = 'HORIZONTAL'; fopSB.primaryAxisSizingMode = 'FIXED'; fopSB.counterAxisSizingMode = 'FIXED';
        fopComp.appendChild(fopSB); fopSB.layoutSizingHorizontal = 'FILL';
      }

      // ── Table header ─────────────────────────────────────────────────────
      var fopTH = figma.createFrame(); fopTH.resize(FOW, 36); fopTH.layoutMode = 'HORIZONTAL';
      fopTH.primaryAxisSizingMode = 'FIXED'; fopTH.counterAxisSizingMode = 'FIXED'; fopTH.counterAxisAlignItems = 'CENTER';
      fill(fopTH, C.muted);
      for (var fopci = 0; fopci < fopColHdrs.length; fopci++) {
        var fopHC = figma.createFrame(); fopHC.resize(fopCols[fopci], 36); fopHC.layoutMode = 'HORIZONTAL';
        fopHC.primaryAxisSizingMode = 'FIXED'; fopHC.counterAxisSizingMode = 'FIXED'; fopHC.counterAxisAlignItems = 'CENTER'; noFill(fopHC);
        if (fopci === 0 && fopHasSelect) {
          fopHC.primaryAxisAlignItems = 'CENTER';
          fopHC.appendChild(makeFopChk(false));
        } else if (fopColHdrs[fopci] !== '') {
          fopHC.paddingLeft = 8;
          if (fopci === fopSortIdx) {
            var fopSortRow = row(4); noFill(fopSortRow); fopSortRow.counterAxisAlignItems = 'CENTER';
            fopSortRow.appendChild(tx(fopColHdrs[fopci], 'SemiBold', 11, C.fg));
            fopSortRow.appendChild(iconInst('arrow-up', C.primary, 10));
            fopHC.appendChild(fopSortRow);
          } else {
            fopHC.appendChild(tx(fopColHdrs[fopci], 'SemiBold', 11, C.mutedFg));
          }
        }
        fopTH.appendChild(fopHC);
      }
      fopComp.appendChild(fopTH); fopTH.layoutSizingHorizontal = 'FILL';

      // ── Data rows ────────────────────────────────────────────────────────
      for (var fopri = 0; fopri < fopData.length; fopri++) {
        var fopR = fopData[fopri];
        var fopIsSelected = fopHasSelect && (fopri === 0 || fopri === 2);

        var fopRow = figma.createFrame(); fopRow.resize(FOW, 52); fopRow.layoutMode = 'HORIZONTAL';
        fopRow.primaryAxisSizingMode = 'FIXED'; fopRow.counterAxisSizingMode = 'FIXED'; fopRow.counterAxisAlignItems = 'CENTER';
        if (fopIsSelected) {
          fopRow.fills = [{ type: 'SOLID', color: hx(C.secondary), opacity: 0.05 }];
        } else { fill(fopRow, C.bg); }

        var fci = 0; // column index cursor

        // Checkbox cell
        if (fopHasSelect) {
          var fopChkC = figma.createFrame(); fopChkC.resize(fopCols[fci], 52); fopChkC.layoutMode = 'HORIZONTAL';
          fopChkC.primaryAxisSizingMode = 'FIXED'; fopChkC.counterAxisSizingMode = 'FIXED';
          fopChkC.primaryAxisAlignItems = 'CENTER'; fopChkC.counterAxisAlignItems = 'CENTER'; noFill(fopChkC);
          fopChkC.appendChild(makeFopChk(fopIsSelected));
          fopRow.appendChild(fopChkC); fci++;
        }

        // ID + Sector
        var fopIdC = figma.createFrame(); fopIdC.resize(fopCols[fci], 52); fopIdC.layoutMode = 'VERTICAL';
        fopIdC.primaryAxisSizingMode = 'FIXED'; fopIdC.counterAxisSizingMode = 'FIXED';
        fopIdC.primaryAxisAlignItems = 'CENTER'; fopIdC.paddingLeft = 8; noFill(fopIdC);
        fopIdC.appendChild(tx(fopR.id, 'SemiBold', 11, C.fg));
        fopIdC.appendChild(tx(fopR.sector, 'Regular', 10, C.mutedFg));
        fopRow.appendChild(fopIdC); fci++;

        // Cedente · Deudor
        var fopCedC = figma.createFrame(); fopCedC.resize(fopCols[fci], 52); fopCedC.layoutMode = 'VERTICAL';
        fopCedC.primaryAxisSizingMode = 'FIXED'; fopCedC.counterAxisSizingMode = 'FIXED';
        fopCedC.primaryAxisAlignItems = 'CENTER'; fopCedC.paddingLeft = 8; noFill(fopCedC);
        var fopCedTxt = fopR.cedente.length > 24 ? fopR.cedente.substring(0,23) + '\u2026' : fopR.cedente;
        var fopDeuTxt = fopR.deudor.length > 22  ? fopR.deudor.substring(0,21)  + '\u2026' : fopR.deudor;
        fopCedC.appendChild(tx(fopCedTxt, 'Medium', 11, C.fg));
        fopCedC.appendChild(tx(fopDeuTxt, 'Regular', 10, C.mutedFg));
        fopRow.appendChild(fopCedC); fci++;

        // Facturas (centered bold)
        var fopFctC = figma.createFrame(); fopFctC.resize(fopCols[fci], 52); fopFctC.layoutMode = 'HORIZONTAL';
        fopFctC.primaryAxisSizingMode = 'FIXED'; fopFctC.counterAxisSizingMode = 'FIXED';
        fopFctC.primaryAxisAlignItems = 'CENTER'; fopFctC.counterAxisAlignItems = 'CENTER'; noFill(fopFctC);
        fopFctC.appendChild(tx(String(fopR.fcts), 'Bold', 13, C.fg));
        fopRow.appendChild(fopFctC); fci++;

        // Nominal (right-aligned)
        var fopNomC = figma.createFrame(); fopNomC.resize(fopCols[fci], 52); fopNomC.layoutMode = 'HORIZONTAL';
        fopNomC.primaryAxisSizingMode = 'FIXED'; fopNomC.counterAxisSizingMode = 'FIXED';
        fopNomC.primaryAxisAlignItems = 'MAX'; fopNomC.counterAxisAlignItems = 'CENTER'; fopNomC.paddingRight = 8; noFill(fopNomC);
        fopNomC.appendChild(tx(fopR.nominal, 'SemiBold', 11, C.fg));
        fopRow.appendChild(fopNomC); fci++;

        // Tasa (colored, two lines)
        var fopTasaC = figma.createFrame(); fopTasaC.resize(fopCols[fci], 52); fopTasaC.layoutMode = 'VERTICAL';
        fopTasaC.primaryAxisSizingMode = 'FIXED'; fopTasaC.counterAxisSizingMode = 'FIXED';
        fopTasaC.primaryAxisAlignItems = 'CENTER'; fopTasaC.paddingLeft = 8; noFill(fopTasaC);
        fopTasaC.appendChild(tx(fopR.tasa.toFixed(2) + '%', 'SemiBold', 12, fopTasaColor(fopR.tasa)));
        fopTasaC.appendChild(tx('mensual', 'Regular', 10, C.mutedFg));
        fopRow.appendChild(fopTasaC); fci++;

        // Plazo (TimeProgress)
        var fopPlazoC = figma.createFrame(); fopPlazoC.resize(fopCols[fci], 52); fopPlazoC.layoutMode = 'HORIZONTAL';
        fopPlazoC.primaryAxisSizingMode = 'FIXED'; fopPlazoC.counterAxisSizingMode = 'FIXED';
        fopPlazoC.counterAxisAlignItems = 'CENTER'; fopPlazoC.paddingLeft = 8; fopPlazoC.paddingRight = 8; noFill(fopPlazoC);
        var fopTP = makeTimeProgress(fopR.emision, fopR.venc, fopR.pct, fopR.status);
        fopPlazoC.appendChild(fopTP); fopTP.layoutSizingHorizontal = 'FILL';
        fopRow.appendChild(fopPlazoC); fci++;

        // Analista
        var fopAnaC = figma.createFrame(); fopAnaC.resize(fopCols[fci], 52); fopAnaC.layoutMode = 'HORIZONTAL';
        fopAnaC.primaryAxisSizingMode = 'FIXED'; fopAnaC.counterAxisSizingMode = 'FIXED';
        fopAnaC.counterAxisAlignItems = 'CENTER'; fopAnaC.paddingLeft = 8; noFill(fopAnaC);
        fopAnaC.appendChild(tx(fopR.analista, 'Regular', 11, C.mutedFg));
        fopRow.appendChild(fopAnaC); fci++;

        // Estado (badge)
        var fopEstC = figma.createFrame(); fopEstC.resize(fopCols[fci], 52); fopEstC.layoutMode = 'HORIZONTAL';
        fopEstC.primaryAxisSizingMode = 'FIXED'; fopEstC.counterAxisSizingMode = 'FIXED';
        fopEstC.counterAxisAlignItems = 'CENTER'; fopEstC.paddingLeft = 8; noFill(fopEstC);
        var fopSt = fopStatusMap[fopR.status];
        var fopBdg = badgeInst(fopSt.badgeKey, fopSt.label);
        if (fopBdg) { fopEstC.appendChild(fopBdg); }
        else { fopEstC.appendChild(tx(fopSt.label, 'Medium', 11, C.fg)); }
        fopRow.appendChild(fopEstC); fci++;

        // Actions (⋯ icon button)
        var fopActC = figma.createFrame(); fopActC.resize(fopCols[fci], 52); fopActC.layoutMode = 'HORIZONTAL';
        fopActC.primaryAxisSizingMode = 'FIXED'; fopActC.counterAxisSizingMode = 'FIXED';
        fopActC.primaryAxisAlignItems = 'CENTER'; fopActC.counterAxisAlignItems = 'CENTER'; noFill(fopActC);
        var fopActBtn = figma.createFrame(); fopActBtn.resize(28, 28); fopActBtn.layoutMode = 'HORIZONTAL';
        fopActBtn.primaryAxisSizingMode = 'FIXED'; fopActBtn.counterAxisSizingMode = 'FIXED';
        fopActBtn.primaryAxisAlignItems = 'CENTER'; fopActBtn.counterAxisAlignItems = 'CENTER'; noFill(fopActBtn); fopActBtn.cornerRadius = 5;
        fopActBtn.appendChild(iconInst('more-horizontal', C.mutedFg, 14));
        fopActC.appendChild(fopActBtn); fopRow.appendChild(fopActC);

        fopComp.appendChild(fopRow); fopRow.layoutSizingHorizontal = 'FILL';

        // Row separator
        var fopRS = figma.createFrame(); fopRS.resize(FOW, 1); fill(fopRS, C.border);
        fopRS.layoutMode = 'HORIZONTAL'; fopRS.primaryAxisSizingMode = 'FIXED'; fopRS.counterAxisSizingMode = 'FIXED';
        fopComp.appendChild(fopRS); fopRS.layoutSizingHorizontal = 'FILL';
      }

      // ── Footer (pagination) ──────────────────────────────────────────────
      var fopFoot = row(10); fopFoot.paddingLeft = fopFoot.paddingRight = 20;
      fopFoot.paddingTop = fopFoot.paddingBottom = 12; noFill(fopFoot); fopFoot.counterAxisAlignItems = 'CENTER';
      fopFoot.appendChild(tx('Mostrando 1-5 de 7 operaciones', 'Regular', 11, C.mutedFg));
      var fopFtSp = figma.createFrame(); fopFtSp.resize(4,1); noFill(fopFtSp); fopFtSp.layoutGrow = 1; fopFoot.appendChild(fopFtSp);
      var fopPagRow = row(4); noFill(fopPagRow); fopPagRow.counterAxisAlignItems = 'CENTER';
      // Prev btn (disabled)
      var fopPrev = figma.createFrame(); fopPrev.resize(28, 28); fopPrev.layoutMode = 'HORIZONTAL';
      fopPrev.primaryAxisSizingMode = 'FIXED'; fopPrev.counterAxisSizingMode = 'FIXED';
      fopPrev.primaryAxisAlignItems = 'CENTER'; fopPrev.counterAxisAlignItems = 'CENTER';
      noFill(fopPrev); stroke(fopPrev, C.border); fopPrev.cornerRadius = 4; fopPrev.opacity = 0.35;
      fopPrev.appendChild(iconInst('chevron-left', C.fg, 14)); fopPagRow.appendChild(fopPrev);
      // Page 1 (active)
      var fopPg1 = figma.createFrame(); fopPg1.resize(28, 28); fopPg1.layoutMode = 'HORIZONTAL';
      fopPg1.primaryAxisSizingMode = 'FIXED'; fopPg1.counterAxisSizingMode = 'FIXED';
      fopPg1.primaryAxisAlignItems = 'CENTER'; fopPg1.counterAxisAlignItems = 'CENTER'; fopPg1.cornerRadius = 4;
      fill(fopPg1, C.primary); fopPg1.appendChild(tx('1', 'Medium', 12, C.primaryFg)); fopPagRow.appendChild(fopPg1);
      // Page 2
      var fopPg2 = figma.createFrame(); fopPg2.resize(28, 28); fopPg2.layoutMode = 'HORIZONTAL';
      fopPg2.primaryAxisSizingMode = 'FIXED'; fopPg2.counterAxisSizingMode = 'FIXED';
      fopPg2.primaryAxisAlignItems = 'CENTER'; fopPg2.counterAxisAlignItems = 'CENTER'; fopPg2.cornerRadius = 4;
      noFill(fopPg2); stroke(fopPg2, C.border); fopPg2.appendChild(tx('2', 'Regular', 12, C.mutedFg)); fopPagRow.appendChild(fopPg2);
      // Next btn
      var fopNext = figma.createFrame(); fopNext.resize(28, 28); fopNext.layoutMode = 'HORIZONTAL';
      fopNext.primaryAxisSizingMode = 'FIXED'; fopNext.counterAxisSizingMode = 'FIXED';
      fopNext.primaryAxisAlignItems = 'CENTER'; fopNext.counterAxisAlignItems = 'CENTER';
      noFill(fopNext); stroke(fopNext, C.border); fopNext.cornerRadius = 4;
      fopNext.appendChild(iconInst('chevron-right', C.fg, 14)); fopPagRow.appendChild(fopNext);
      fopFoot.appendChild(fopPagRow);
      fopComp.appendChild(fopFoot); fopFoot.layoutSizingHorizontal = 'FILL';

      fopComps.push(fopComp);
    }

    // Combine as ComponentSet, stack variants vertically, append to ptRoot
    var fopCS = figma.combineAsVariants(fopComps, figma.currentPage);
    fopCS.name = 'Gestión de Operaciones';
    fopCS.layoutMode = 'VERTICAL';
    fopCS.paddingLeft = fopCS.paddingRight = fopCS.paddingTop = fopCS.paddingBottom = 20;
    fopCS.itemSpacing = 40;
    fopCS.primaryAxisSizingMode = 'AUTO'; fopCS.counterAxisSizingMode = 'AUTO';
    fill(fopCS, C.bg); stroke(fopCS, C.border); fopCS.cornerRadius = 10;
    ptRoot.appendChild(fopCS);
    console.log('[OK] Pattern: Gestión de Operaciones (Select=false | Select=true)');
  } catch(e) { console.error('[FAIL] Pattern Gestión de Operaciones: ' + e.message); }

  // ── Pattern: Factoring Debtor List ──
  try {
    var fdbl = col(0); fdbl.name = 'Factoring Debtor List'; sbDesc(fdbl);
    fdbl.resize(760, 1); fdbl.primaryAxisSizingMode = 'AUTO'; fdbl.counterAxisSizingMode = 'FIXED';
    fill(fdbl, C.card); stroke(fdbl, C.border); fdbl.cornerRadius = 12;
    // Header
    var fdblHdr = row(0); fdblHdr.paddingLeft = fdblHdr.paddingRight = 20; fdblHdr.paddingTop = fdblHdr.paddingBottom = 14;
 fdblHdr.resize(760, 1); fdblHdr.layoutMode = 'HORIZONTAL'; fdblHdr.counterAxisAlignItems = 'CENTER'; fill(fdblHdr, C.muted);
    var fdblHLeft = col(2); noFill(fdblHLeft);
    fdblHLeft.appendChild(tx('Gestión de Deudores', 'Bold', 16, C.fg));
    fdblHLeft.appendChild(tx('Entidades pagadoras registradas', 'Regular', 12, C.mutedFg)); fdblHdr.appendChild(fdblHLeft);
    var fdblHSp = figma.createFrame(); fdblHSp.resize(4,1); noFill(fdblHSp); fdblHdr.appendChild(fdblHSp); fdblHSp.layoutGrow = 1;
    var fdblSrch = row(6); fdblSrch.paddingLeft = fdblSrch.paddingRight = 10; fdblSrch.paddingTop = fdblSrch.paddingBottom = 6;
    fill(fdblSrch, C.bg); stroke(fdblSrch, C.border); fdblSrch.cornerRadius = 6; fdblSrch.counterAxisAlignItems = 'CENTER';
    fdblSrch.appendChild(iconInst('search', C.mutedFg, 13)); fdblSrch.appendChild(tx('Buscar deudor...', 'Regular', 12, C.mutedFg)); fdblHdr.appendChild(fdblSrch);
    var fdblExport = row(6); fdblExport.paddingLeft = fdblExport.paddingRight = 12; fdblExport.paddingTop = fdblExport.paddingBottom = 7;
    fill(fdblExport, C.bg); stroke(fdblExport, C.border); fdblExport.cornerRadius = 6; fdblExport.counterAxisAlignItems = 'CENTER';
    fdblExport.appendChild(iconInst('download', C.mutedFg, 13)); fdblExport.appendChild(tx('Exportar', 'Medium', 12, C.fg)); fdblHdr.appendChild(fdblExport);
    fdbl.appendChild(fdblHdr);
    fdblHdr.layoutSizingHorizontal = 'FILL';
 var fdblSep = figma.createFrame(); fdblSep.resize(760, 1); fill(fdblSep, C.border); fdblSep.layoutMode = 'HORIZONTAL'; fdblSep.primaryAxisSizingMode = 'FIXED'; fdblSep.counterAxisSizingMode = 'FIXED'; fdbl.appendChild(fdblSep); fdblSep.layoutSizingHorizontal = 'FILL';
    // Table header
 var fdblTH = row(0); fdblTH.resize(760, 36); fdblTH.layoutMode = 'HORIZONTAL'; fdblTH.layoutSizingVertical = 'FIXED'; fdblTH.counterAxisAlignItems = 'CENTER'; fill(fdblTH, C.muted);
    var fdblCols = [['NIT',100],['Nombre Deudor',160],['Ops Activas',90],['Exposición Total',120],['Límite',100],['Rating',70],['Estado',70],['',50]];
    for (var fdblci = 0; fdblci < fdblCols.length; fdblci++) {
      var fdblHC = figma.createFrame(); fdblHC.resize(fdblCols[fdblci][1], 36); fdblHC.layoutMode = 'HORIZONTAL'; fdblHC.primaryAxisSizingMode = 'FIXED'; fdblHC.counterAxisSizingMode = 'FIXED'; fdblHC.counterAxisAlignItems = 'CENTER'; fdblHC.paddingLeft = 10; noFill(fdblHC);
      fdblHC.appendChild(tx(fdblCols[fdblci][0], 'SemiBold', 11, C.mutedFg)); fdblTH.appendChild(fdblHC);
    }
    fdbl.appendChild(fdblTH);
    fdblTH.layoutSizingHorizontal = 'FILL';
    // Rows
    var fdblData = [
      ['830.001.234-5','Gobierno Nacional','24','$1,840,000,000','$2,500,000,000','AAA','activo',C.success],
      ['800.234.789-2','Cadena Retail Norte','8','$520,000,000','$800,000,000','AA','activo',C.success],
      ['900.345.678-1','Materiales SA','5','$280,000,000','$400,000,000','A','activo',C.success],
      ['700.456.123-3','Empresa Pública','3','$95,000,000','$100,000,000','BBB','alerta',C.warning],
      ['600.567.234-8','Dist. Sur Ltda','2','$62,000,000','$150,000,000','BB','activo',C.success],
    ];
    for (var fdblri = 0; fdblri < fdblData.length; fdblri++) {
 var fdblRow = row(0); fdblRow.resize(760, 44); fdblRow.layoutMode = 'HORIZONTAL'; fdblRow.layoutSizingVertical = 'FIXED'; fdblRow.counterAxisAlignItems = 'CENTER';
      fill(fdblRow, fdblri % 2 === 0 ? C.bg : C.bg);
      var fdblRWs = [100,160,90,120,100];
      for (var fdblrci = 0; fdblrci < 5; fdblrci++) {
        var fdblRC = figma.createFrame(); fdblRC.resize(fdblRWs[fdblrci], 44); fdblRC.layoutMode = 'HORIZONTAL'; fdblRC.primaryAxisSizingMode = 'FIXED'; fdblRC.counterAxisSizingMode = 'FIXED'; fdblRC.counterAxisAlignItems = 'CENTER'; fdblRC.paddingLeft = 10; noFill(fdblRC);
        fdblRC.appendChild(tx(fdblData[fdblri][fdblrci], 'Regular', 12, C.fg)); fdblRow.appendChild(fdblRC);
      }
      // Rating cell
      var fdblRatC = figma.createFrame(); fdblRatC.resize(70, 44); fdblRatC.layoutMode = 'HORIZONTAL'; fdblRatC.primaryAxisSizingMode = 'FIXED'; fdblRatC.counterAxisSizingMode = 'FIXED'; fdblRatC.counterAxisAlignItems = 'CENTER'; fdblRatC.paddingLeft = 10; noFill(fdblRatC);
      var fdblRatColor = fdblData[fdblri][6] === 'alerta' ? C.warning : C.success;
      var fdblRBadge = row(0); fdblRBadge.paddingLeft = fdblRBadge.paddingRight = 8; fdblRBadge.paddingTop = fdblRBadge.paddingBottom = 3; fdblRBadge.cornerRadius = 6;
      fill(fdblRBadge, softBg(fdblRatColor)); fdblRBadge.appendChild(tx(fdblData[fdblri][5], 'Bold', 11, fdblRatColor)); fdblRatC.appendChild(fdblRBadge); fdblRow.appendChild(fdblRatC);
      // Status cell
      var fdblStC = figma.createFrame(); fdblStC.resize(70, 44); fdblStC.layoutMode = 'HORIZONTAL'; fdblStC.primaryAxisSizingMode = 'FIXED'; fdblStC.counterAxisSizingMode = 'FIXED'; fdblStC.counterAxisAlignItems = 'CENTER'; fdblStC.paddingLeft = 10; noFill(fdblStC);
      var fdblStBadge = badgeInst(colorToBadgeVariant(fdblData[fdblri][7]), fdblData[fdblri][6]);
      if (!fdblStBadge) { fdblStBadge = row(0); fdblStBadge.paddingLeft = fdblStBadge.paddingRight = 8; fdblStBadge.paddingTop = fdblStBadge.paddingBottom = 3; fdblStBadge.cornerRadius = 10; fill(fdblStBadge, softBg(fdblData[fdblri][7])); fdblStBadge.appendChild(tx(fdblData[fdblri][6], 'Medium', 10, fdblData[fdblri][7])); }
      fdblStC.appendChild(fdblStBadge); fdblRow.appendChild(fdblStC);
      // Actions
      var fdblActC = figma.createFrame(); fdblActC.resize(50, 44); fdblActC.layoutMode = 'HORIZONTAL'; fdblActC.primaryAxisSizingMode = 'FIXED'; fdblActC.counterAxisSizingMode = 'FIXED'; fdblActC.primaryAxisAlignItems = 'CENTER'; fdblActC.counterAxisAlignItems = 'CENTER'; fdblActC.itemSpacing = 6; noFill(fdblActC);
      fdblActC.appendChild(iconInst('eye', C.primary, 14)); fdblActC.appendChild(iconInst('edit', C.mutedFg, 14)); fdblRow.appendChild(fdblActC);
      fdbl.appendChild(fdblRow);
      fdblRow.layoutSizingHorizontal = 'FILL';
 var fdblRSep = figma.createFrame(); fdblRSep.resize(760, 1); fill(fdblRSep, C.border); fdblRSep.layoutMode = 'HORIZONTAL'; fdblRSep.primaryAxisSizingMode = 'FIXED'; fdblRSep.counterAxisSizingMode = 'FIXED'; fdbl.appendChild(fdblRSep); fdblRSep.layoutSizingHorizontal = 'FILL';
    }
    ptRoot.appendChild(fdbl);
    console.log('[OK] Pattern: Factoring Debtor List');
  } catch (e) { console.error('[FAIL] Pattern Factoring Debtor List: ' + e.message); }

  // ── Pattern: Factoring Maturity Alerts ──
  try {
    var fmat = col(0); fmat.name = 'Factoring Maturity Alerts'; sbDesc(fmat);
    fmat.resize(760, 1); fmat.primaryAxisSizingMode = 'AUTO'; fmat.counterAxisSizingMode = 'FIXED';
    fill(fmat, C.card); stroke(fmat, C.border); fmat.cornerRadius = 12;
    // Header
    var fmatHdr = row(0); fmatHdr.paddingLeft = fmatHdr.paddingRight = 20; fmatHdr.paddingTop = fmatHdr.paddingBottom = 14;
 fmatHdr.resize(760, 1); fmatHdr.layoutMode = 'HORIZONTAL'; fmatHdr.counterAxisAlignItems = 'CENTER'; fill(fmatHdr, C.muted);
    var fmatHLeft = col(2); noFill(fmatHLeft);
    fmatHLeft.appendChild(tx('Alertas de Vencimiento', 'Bold', 16, C.fg));
    fmatHLeft.appendChild(tx('Facturas próximas a vencer o vencidas', 'Regular', 12, C.mutedFg)); fmatHdr.appendChild(fmatHLeft);
    var fmatHSp = figma.createFrame(); fmatHSp.resize(4,1); noFill(fmatHSp); fmatHdr.appendChild(fmatHSp); fmatHSp.layoutGrow = 1;
    var fmatSummary = row(8); fmatSummary.counterAxisAlignItems = 'CENTER'; noFill(fmatSummary);
    var fmatSumItems = [['3','Vencidas',C.destructive],['5','Críticas (≤3d)',C.warning],['8','Próximas (≤7d)',C.primary]];
    for (var fmsi = 0; fmsi < fmatSumItems.length; fmsi++) {
      var fmSumBadge = row(4); fmSumBadge.paddingLeft = fmSumBadge.paddingRight = 10; fmSumBadge.paddingTop = fmSumBadge.paddingBottom = 5;
      fill(fmSumBadge, softBg(fmatSumItems[fmsi][2])); fmSumBadge.cornerRadius = 6; fmSumBadge.counterAxisAlignItems = 'CENTER';
      fmSumBadge.appendChild(tx(fmatSumItems[fmsi][0], 'Bold', 13, fmatSumItems[fmsi][2]));
      fmSumBadge.appendChild(tx(fmatSumItems[fmsi][1], 'Regular', 11, fmatSumItems[fmsi][2])); fmatSummary.appendChild(fmSumBadge);
    }
    fmatHdr.appendChild(fmatSummary);
    fmat.appendChild(fmatHdr);
    fmatHdr.layoutSizingHorizontal = 'FILL';
 var fmatSep = figma.createFrame(); fmatSep.resize(760, 1); fill(fmatSep, C.border); fmatSep.layoutMode = 'HORIZONTAL'; fmatSep.primaryAxisSizingMode = 'FIXED'; fmatSep.counterAxisSizingMode = 'FIXED'; fmat.appendChild(fmatSep); fmatSep.layoutSizingHorizontal = 'FILL';
    // Alert rows
    var fmatAlerts = [
      { cedente:'Servicios Ltda', deudor:'Empresa Pública', factura:'FACT-2026-0081', valor:'$95,000,000', vence:'05/Feb/26', dias:-5, sev:'vencida', color:C.destructive },
      { cedente:'TechCo SAS', deudor:'Retail Corp', factura:'FACT-2026-0092', valor:'$45,000,000', vence:'08/Feb/26', dias:-2, sev:'vencida', color:C.destructive },
      { cedente:'Empresa ABC', deudor:'Dist. Norte', factura:'FACT-2026-0105', valor:'$120,000,000', vence:'12/Feb/26', dias:2, sev:'crítica', color:C.warning },
      { cedente:'Industrias XY', deudor:'Gobierno Nal.', factura:'FACT-2026-0112', valor:'$280,000,000', vence:'15/Feb/26', dias:5, sev:'crítica', color:C.warning },
      { cedente:'Constructora PQ', deudor:'Cadena Sur', factura:'FACT-2026-0118', valor:'$175,000,000', vence:'19/Feb/26', dias:9, sev:'próxima', color:C.primary },
    ];
    for (var fmali = 0; fmali < fmatAlerts.length; fmali++) {
      var fmA = fmatAlerts[fmali];
      var fmAlertRow = row(0); fmAlertRow.paddingLeft = 0; fmAlertRow.paddingRight = 16; fmAlertRow.paddingTop = fmAlertRow.paddingBottom = 12;
 fmAlertRow.resize(760, 1); fmAlertRow.layoutMode = 'HORIZONTAL'; fmAlertRow.counterAxisAlignItems = 'CENTER'; noFill(fmAlertRow);
      // Severity bar
      var fmBar = figma.createFrame(); fmBar.resize(4, 40); fill(fmBar, fmA.color); fmAlertRow.appendChild(fmBar);
      // Icon
      var fmIcoWrap = row(0); fmIcoWrap.resize(44, 44); fmIcoWrap.primaryAxisAlignItems = 'CENTER'; fmIcoWrap.counterAxisAlignItems = 'CENTER'; noFill(fmIcoWrap);
      fmIcoWrap.appendChild(iconInst(fmA.dias < 0 ? 'alert-circle' : 'clock', fmA.color, 20)); fmAlertRow.appendChild(fmIcoWrap);
      // Info
      var fmInfo = col(3); noFill(fmInfo); fmInfo.layoutGrow = 1;
      var fmInfoTop = row(6); fmInfoTop.counterAxisAlignItems = 'CENTER'; noFill(fmInfoTop);
      fmInfoTop.appendChild(tx(fmA.factura, 'Medium', 13, C.fg));
      var fmSevBadge = row(0); fmSevBadge.paddingLeft = fmSevBadge.paddingRight = 7; fmSevBadge.paddingTop = fmSevBadge.paddingBottom = 2; fmSevBadge.cornerRadius = 10;
      fill(fmSevBadge, softBg(fmA.color)); fmSevBadge.appendChild(tx(fmA.sev, 'Medium', 10, fmA.color)); fmInfoTop.appendChild(fmSevBadge); fmInfo.appendChild(fmInfoTop);
      fmInfo.appendChild(tx(fmA.cedente + ' → ' + fmA.deudor, 'Regular', 11, C.mutedFg)); fmAlertRow.appendChild(fmInfo);
      // Valor & vencimiento
      var fmAmtCol = col(2); fmAmtCol.counterAxisAlignItems = 'MAX'; noFill(fmAmtCol);
      fmAmtCol.appendChild(tx(fmA.valor, 'Bold', 13, C.fg));
      var fmDaysText = fmA.dias < 0 ? ('Venció hace ' + Math.abs(fmA.dias) + ' días') : (fmA.dias === 0 ? 'Vence hoy' : ('Vence en ' + fmA.dias + ' días'));
      fmAmtCol.appendChild(tx(fmDaysText, 'Regular', 11, fmA.color)); fmAlertRow.appendChild(fmAmtCol);
      // Actions
      var fmActWrap = row(6); fmActWrap.paddingLeft = 12; noFill(fmActWrap); fmActWrap.counterAxisAlignItems = 'CENTER';
      var fmGestBtn = row(0); fmGestBtn.paddingLeft = fmGestBtn.paddingRight = 10; fmGestBtn.paddingTop = fmGestBtn.paddingBottom = 6;
      fill(fmGestBtn, C.primary); fmGestBtn.cornerRadius = 6; fmGestBtn.appendChild(tx('Gestionar', 'Medium', 11, C.primaryFg)); fmActWrap.appendChild(fmGestBtn);
      fmAlertRow.appendChild(fmActWrap);
      fmat.appendChild(fmAlertRow);
      fmAlertRow.layoutSizingHorizontal = 'FILL';
 var fmASep = figma.createFrame(); fmASep.resize(760, 1); fill(fmASep, C.border); fmASep.layoutMode = 'HORIZONTAL'; fmASep.primaryAxisSizingMode = 'FIXED'; fmASep.counterAxisSizingMode = 'FIXED'; fmat.appendChild(fmASep); fmASep.layoutSizingHorizontal = 'FILL';
    }
    ptRoot.appendChild(fmat);
    console.log('[OK] Pattern: Factoring Maturity Alerts');
  } catch (e) { console.error('[FAIL] Pattern Factoring Maturity Alerts: ' + e.message); }

  // ── Pattern: Factoring Portfolio Report ──
  try {
    var frep = col(0); frep.name = 'Factoring Portfolio Report'; sbDesc(frep);
    frep.resize(760, 1); frep.primaryAxisSizingMode = 'AUTO'; frep.counterAxisSizingMode = 'FIXED';
    fill(frep, C.card); stroke(frep, C.border); frep.cornerRadius = 12;
    // Header
    var frepHdr = row(0); frepHdr.paddingLeft = frepHdr.paddingRight = 20; frepHdr.paddingTop = frepHdr.paddingBottom = 14;
 frepHdr.resize(760, 1); frepHdr.layoutMode = 'HORIZONTAL'; frepHdr.counterAxisAlignItems = 'CENTER'; fill(frepHdr, C.muted);
    frepHdr.appendChild(tx('Reporte de Cartera', 'Bold', 16, C.fg));
    var frepHSp = figma.createFrame(); frepHSp.resize(4,1); noFill(frepHSp); frepHdr.appendChild(frepHSp); frepHSp.layoutGrow = 1;
    var frepPeriod = row(6); frepPeriod.paddingLeft = frepPeriod.paddingRight = 10; frepPeriod.paddingTop = frepPeriod.paddingBottom = 6;
    fill(frepPeriod, C.bg); stroke(frepPeriod, C.border); frepPeriod.cornerRadius = 6; frepPeriod.counterAxisAlignItems = 'CENTER';
    frepPeriod.appendChild(iconInst('calendar', C.mutedFg, 13)); frepPeriod.appendChild(tx('Ene 2026 – Ene 2026', 'Regular', 12, C.fg));
    frepPeriod.appendChild(iconInst('chevron-down', C.mutedFg, 12)); frepHdr.appendChild(frepPeriod);
    var frepExport = row(6); frepExport.paddingLeft = frepExport.paddingRight = 12; frepExport.paddingTop = frepExport.paddingBottom = 7;
    fill(frepExport, C.bg); stroke(frepExport, C.border); frepExport.cornerRadius = 6; frepExport.counterAxisAlignItems = 'CENTER';
    frepExport.appendChild(iconInst('download', C.mutedFg, 13)); frepExport.appendChild(tx('Exportar', 'Medium', 12, C.fg)); frepHdr.appendChild(frepExport);
    frep.appendChild(frepHdr);
    frepHdr.layoutSizingHorizontal = 'FILL';
 var frepSep = figma.createFrame(); frepSep.resize(760, 1); fill(frepSep, C.border); frepSep.layoutMode = 'HORIZONTAL'; frepSep.primaryAxisSizingMode = 'FIXED'; frepSep.counterAxisSizingMode = 'FIXED'; frep.appendChild(frepSep); frepSep.layoutSizingHorizontal = 'FILL';
    // KPI cards
    var frepKpis = row(12); frepKpis.paddingLeft = frepKpis.paddingRight = 20; frepKpis.paddingTop = frepKpis.paddingBottom = 16;
 frepKpis.resize(760, 1); frepKpis.layoutMode = 'HORIZONTAL'; noFill(frepKpis);
    var frepKData = [['Total Desembolsado','$2,340,000,000','+8.2%',C.primary],['Total Cobrado','$1,890,000,000','+11.4%',C.success],['En Cartera','$450,000,000','-2.1%',C.warning],['Morosidad','2.6%','-0.4pp',C.destructive]];
    for (var frepki = 0; frepki < frepKData.length; frepki++) {
      var frepKC = col(6); frepKC.paddingLeft = frepKC.paddingRight = 14; frepKC.paddingTop = frepKC.paddingBottom = 12;
      fill(frepKC, C.bg); stroke(frepKC, C.border); frepKC.cornerRadius = 8; frepKC.layoutGrow = 1;
      frepKC.appendChild(tx(frepKData[frepki][0], 'Regular', 11, C.mutedFg));
      frepKC.appendChild(tx(frepKData[frepki][1], 'Bold', 16, C.fg));
      var frepKT = row(4); frepKT.counterAxisAlignItems = 'CENTER'; noFill(frepKT);
      frepKT.appendChild(iconInst(frepki < 2 ? 'arrow-up' : 'arrow-down', frepKData[frepki][3], 11));
      frepKT.appendChild(tx(frepKData[frepki][2] + ' vs mes ant.', 'Regular', 10, C.mutedFg)); frepKC.appendChild(frepKT);
      frepKpis.appendChild(frepKC);
    }
    frep.appendChild(frepKpis);
    frepKpis.layoutSizingHorizontal = 'FILL';
 var frepSep2 = figma.createFrame(); frepSep2.resize(760, 1); fill(frepSep2, C.border); frepSep2.layoutMode = 'HORIZONTAL'; frepSep2.primaryAxisSizingMode = 'FIXED'; frepSep2.counterAxisSizingMode = 'FIXED'; frep.appendChild(frepSep2); frepSep2.layoutSizingHorizontal = 'FILL';
    // Chart + status breakdown
 var frepBody = row(0); frepBody.resize(760, 1); frepBody.layoutMode = 'HORIZONTAL'; frepBody.primaryAxisSizingMode = 'AUTO'; frepBody.counterAxisAlignItems = 'MIN'; noFill(frepBody);
    // Bar chart
    var frepChBox = col(12); frepChBox.paddingLeft = frepChBox.paddingRight = 20; frepChBox.paddingTop = frepChBox.paddingBottom = 16; noFill(frepChBox); frepChBox.layoutGrow = 1;
    frepChBox.appendChild(tx('Desembolsos vs Cobros (COP MM)', 'SemiBold', 12, C.fg));
    var frepChart = figma.createFrame(); frepChart.resize(400, 140); fill(frepChart, C.bg); stroke(frepChart, C.border); frepChart.cornerRadius = 8;
 frepChart.layoutMode = 'HORIZONTAL'; frepChart.counterAxisAlignItems = 'MAX'; frepChart.itemSpacing = 6; frepChart.paddingLeft = frepChart.paddingRight = 10; frepChart.paddingBottom = 8;
    var frepMths = ['Ago','Sep','Oct','Nov','Dic','Ene']; var frepDb = [0.55,0.7,0.5,0.85,0.65,0.9]; var frepCb = [0.45,0.6,0.55,0.75,0.6,0.8];
    for (var frepm = 0; frepm < 6; frepm++) {
      var frepMC = col(3); frepMC.counterAxisAlignItems = 'CENTER'; noFill(frepMC); frepMC.layoutGrow = 1;
      var frepBP = row(2); frepBP.counterAxisAlignItems = 'MAX'; noFill(frepBP);
      var frepB1 = figma.createFrame(); frepB1.resize(12, Math.round(100 * frepDb[frepm])); fill(frepB1, C.primary); frepB1.cornerRadius = 3; frepBP.appendChild(frepB1);
      var frepB2 = figma.createFrame(); frepB2.resize(12, Math.round(100 * frepCb[frepm])); fill(frepB2, C.success); frepB2.cornerRadius = 3; frepBP.appendChild(frepB2);
      frepMC.appendChild(frepBP); frepMC.appendChild(tx(frepMths[frepm], 'Regular', 9, C.mutedFg)); frepChart.appendChild(frepMC);
    }
    frepChBox.appendChild(frepChart);
    frepChart.layoutSizingHorizontal = 'FILL';
    frepBody.appendChild(frepChBox);
 var frepBDiv = figma.createFrame(); frepBDiv.resize(1, 1); frepBDiv.layoutMode = 'VERTICAL'; fill(frepBDiv, C.border); frepBody.appendChild(frepBDiv); frepBDiv.layoutSizingVertical = 'FILL';
    // Status breakdown
    var frepStatBox = col(12); frepStatBox.paddingLeft = frepStatBox.paddingRight = 20; frepStatBox.paddingTop = frepStatBox.paddingBottom = 16; noFill(frepStatBox);
    frepStatBox.resize(220, 1); frepStatBox.layoutSizingHorizontal = 'FIXED'; frepStatBox.primaryAxisSizingMode = 'AUTO';
    frepStatBox.appendChild(tx('Cartera por Estado', 'SemiBold', 12, C.fg));
    var frepStItems = [['Vigentes','72%',C.success],['Cobradas','18%',C.mutedFg],['Vencidas','7%',C.warning],['En mora','3%',C.destructive]];
    for (var frepsti = 0; frepsti < frepStItems.length; frepsti++) {
      var frepStRow = col(4); noFill(frepStRow);
      var frepStH = row(0); frepStH.counterAxisAlignItems = 'CENTER'; noFill(frepStH);
      var frepStDot = figma.createFrame(); frepStDot.resize(8,8); frepStDot.cornerRadius = 4; fill(frepStDot, frepStItems[frepsti][2]); frepStH.appendChild(frepStDot);
      frepStH.appendChild(tx(frepStItems[frepsti][0], 'Regular', 12, C.fg));
      var frepStHSp = figma.createFrame(); frepStHSp.resize(4,1); noFill(frepStHSp); frepStH.appendChild(frepStHSp); frepStHSp.layoutGrow = 1;
      frepStH.appendChild(tx(frepStItems[frepsti][1], 'Bold', 12, frepStItems[frepsti][2])); frepStRow.appendChild(frepStH);
      frepStH.layoutSizingHorizontal = 'FILL';
      var frepStTrack = figma.createFrame(); frepStTrack.resize(180, 6); fill(frepStTrack, C.muted); frepStTrack.cornerRadius = 3; frepStTrack.layoutMode = 'HORIZONTAL';
      var frepStFill = figma.createFrame(); var frepStW = Math.round(180 * parseInt(frepStItems[frepsti][1]) / 100);
      frepStFill.resize(frepStW, 6); fill(frepStFill, frepStItems[frepsti][2]); frepStFill.cornerRadius = 3; frepStTrack.appendChild(frepStFill); frepStRow.appendChild(frepStTrack);
      frepStatBox.appendChild(frepStRow);
      frepStRow.layoutSizingHorizontal = 'FILL';
    }
    frepBody.appendChild(frepStatBox);
    frep.appendChild(frepBody);
    frepBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(frep);
    console.log('[OK] Pattern: Factoring Portfolio Report');
  } catch (e) { console.error('[FAIL] Pattern Factoring Portfolio Report: ' + e.message); }

  // ── Pattern: Factoring Calculator ──
  try {
    var fcalc = col(0); fcalc.name = 'Factoring Calculator'; sbDesc(fcalc);
    fcalc.resize(680, 1); fcalc.primaryAxisSizingMode = 'AUTO'; fcalc.counterAxisSizingMode = 'FIXED';
    fill(fcalc, C.card); stroke(fcalc, C.border); fcalc.cornerRadius = 12;
    // Header
    var fcalcHdr = row(0); fcalcHdr.paddingLeft = fcalcHdr.paddingRight = 24; fcalcHdr.paddingTop = fcalcHdr.paddingBottom = 14;
 fcalcHdr.resize(680, 1); fcalcHdr.layoutMode = 'HORIZONTAL'; fcalcHdr.counterAxisAlignItems = 'CENTER'; fill(fcalcHdr, C.muted);
    var fcalcHLeft = col(2); noFill(fcalcHLeft);
    fcalcHLeft.appendChild(tx('Calculadora de Factoring', 'Bold', 16, C.fg));
    fcalcHLeft.appendChild(tx('Simulador de descuento en tiempo real', 'Regular', 12, C.mutedFg)); fcalcHdr.appendChild(fcalcHLeft);
    var fcalcHSp = figma.createFrame(); fcalcHSp.resize(4,1); noFill(fcalcHSp); fcalcHdr.appendChild(fcalcHSp); fcalcHSp.layoutGrow = 1;
    var fcalcReset = row(6); fcalcReset.paddingLeft = fcalcReset.paddingRight = 12; fcalcReset.paddingTop = fcalcReset.paddingBottom = 7;
    fill(fcalcReset, C.bg); stroke(fcalcReset, C.border); fcalcReset.cornerRadius = 6; fcalcReset.counterAxisAlignItems = 'CENTER';
    fcalcReset.appendChild(iconInst('refresh-cw', C.mutedFg, 13)); fcalcReset.appendChild(tx('Restablecer', 'Medium', 12, C.fg)); fcalcHdr.appendChild(fcalcReset);
    fcalc.appendChild(fcalcHdr);
    fcalcHdr.layoutSizingHorizontal = 'FILL';
 var fcalcSep = figma.createFrame(); fcalcSep.resize(680, 1); fill(fcalcSep, C.border); fcalcSep.layoutMode = 'HORIZONTAL'; fcalcSep.primaryAxisSizingMode = 'FIXED'; fcalcSep.counterAxisSizingMode = 'FIXED'; fcalc.appendChild(fcalcSep); fcalcSep.layoutSizingHorizontal = 'FILL';
    // Body: inputs + results
 var fcalcBody = row(0); fcalcBody.resize(680, 1); fcalcBody.layoutMode = 'HORIZONTAL'; fcalcBody.primaryAxisSizingMode = 'AUTO'; fcalcBody.counterAxisAlignItems = 'MIN'; noFill(fcalcBody);
    // Left: inputs
    var fcalcInputs = col(16); fcalcInputs.paddingLeft = fcalcInputs.paddingRight = 24; fcalcInputs.paddingTop = fcalcInputs.paddingBottom = 20; noFill(fcalcInputs); fcalcInputs.layoutGrow = 1;
    fcalcInputs.appendChild(tx('Parámetros', 'SemiBold', 13, C.fg));
    var fcalcFields = [
      ['Valor Nominal (COP)', '$245,000,000', 'Valor total de las facturas'],
      ['Tasa Mensual (% MV)', '1.72%', 'Tasa de descuento mensual'],
      ['Plazo (días)', '30', 'Número de días de la operación'],
      ['Comisión (%)', '0.5%', 'Comisión de gestión'],
    ];
    for (var fcfi = 0; fcfi < fcalcFields.length; fcfi++) {
      var fcFG = col(5); noFill(fcFG);
      fcFG.appendChild(tx(fcalcFields[fcfi][0], 'Medium', 12, C.fg));
      // Input row with value
 var fcIn = row(0); fcIn.resize(280, 40); fcIn.layoutMode = 'HORIZONTAL'; fcIn.layoutSizingVertical = 'FIXED';
      fcIn.paddingLeft = fcIn.paddingRight = 12; fcIn.counterAxisAlignItems = 'CENTER';
      fill(fcIn, C.bg); stroke(fcIn, fcfi === 1 ? C.primary : C.border); fcIn.cornerRadius = 6;
      if (fcfi === 1) { fcIn.strokes = [{ type: 'SOLID', color: hx(C.primary) }]; fcIn.strokeWeight = 2; }
      var fcInSp = figma.createFrame(); fcInSp.resize(4,1); noFill(fcInSp);
      fcIn.appendChild(tx(fcalcFields[fcfi][1], 'Regular', 14, C.fg)); fcIn.appendChild(fcInSp); fcInSp.layoutGrow = 1;
      if (fcfi === 1) fcIn.appendChild(iconInst('hash', C.primary, 14));
      fcFG.appendChild(fcIn);
      fcIn.layoutSizingHorizontal = 'FILL';
      // Slider track
 var fcSliderTrack = figma.createFrame(); fcSliderTrack.resize(280, 4); fill(fcSliderTrack, C.muted); fcSliderTrack.cornerRadius = 2; fcSliderTrack.layoutMode = 'HORIZONTAL';
      var fcSliderFill = figma.createFrame(); var fcSlW = fcfi === 0 ? 200 : fcfi === 1 ? 140 : fcfi === 2 ? 96 : 40;
      fcSliderFill.resize(fcSlW, 4); fill(fcSliderFill, C.primary); fcSliderFill.cornerRadius = 2; fcSliderTrack.appendChild(fcSliderFill); fcFG.appendChild(fcSliderTrack);
      fcSliderTrack.layoutSizingHorizontal = 'FILL';
      fcFG.appendChild(tx(fcalcFields[fcfi][2], 'Regular', 10, C.mutedFg));
      fcalcInputs.appendChild(fcFG);
    }
    fcalcBody.appendChild(fcalcInputs);
 var fcalcBDiv = figma.createFrame(); fcalcBDiv.resize(1, 1); fcalcBDiv.layoutMode = 'VERTICAL'; fill(fcalcBDiv, C.border); fcalcBody.appendChild(fcalcBDiv); fcalcBDiv.layoutSizingVertical = 'FILL';
    // Right: results + donut
    var fcalcResults = col(12); fcalcResults.paddingLeft = fcalcResults.paddingRight = 20; fcalcResults.paddingTop = fcalcResults.paddingBottom = 20; noFill(fcalcResults);
    fcalcResults.resize(236, 1); fcalcResults.layoutSizingHorizontal = 'FIXED'; fcalcResults.primaryAxisSizingMode = 'AUTO';
    fcalcResults.appendChild(tx('Resultado', 'SemiBold', 13, C.fg));
    // Donut chart placeholder
    var fcalcDonut = row(0); fcalcDonut.resize(180, 180); fcalcDonut.primaryAxisAlignItems = 'CENTER'; fcalcDonut.counterAxisAlignItems = 'CENTER'; fcalcDonut.layoutGrow = 0;
    fcalcDonut.cornerRadius = 90; fill(fcalcDonut, C.primary);
    var fcalcInner = row(0); fcalcInner.resize(110, 110); fcalcInner.primaryAxisAlignItems = 'CENTER'; fcalcInner.counterAxisAlignItems = 'CENTER';
    fcalcInner.cornerRadius = 55; fill(fcalcInner, C.card);
    var fcalcInnerCol = col(2); fcalcInnerCol.counterAxisAlignItems = 'CENTER'; noFill(fcalcInnerCol);
    fcalcInnerCol.appendChild(tx('94.2%', 'Bold', 18, C.fg));
    fcalcInnerCol.appendChild(tx('Neto', 'Regular', 10, C.mutedFg)); fcalcInner.appendChild(fcalcInnerCol);
    fcalcDonut.appendChild(fcalcInner); fcalcResults.appendChild(fcalcDonut);
    // Result rows
    var fcalcRRows = [['Descuento','$4,175,000',C.destructive],['Comisión','$1,225,000',C.warning],['Desembolso','$239,600,000',C.success],['TEA','22.8%',C.primary]];
    for (var fcrri = 0; fcrri < fcalcRRows.length; fcrri++) {
 var fcrRow = row(0); fcrRow.counterAxisAlignItems = 'CENTER'; noFill(fcrRow); fcrRow.layoutMode = 'HORIZONTAL';
      if (fcrri === 2) { fill(fcrRow, C.accent); fcrRow.cornerRadius = 6; fcrRow.paddingLeft = fcrRow.paddingRight = 8; fcrRow.paddingTop = fcrRow.paddingBottom = 4; }
      fcrRow.appendChild(tx(fcalcRRows[fcrri][0], 'Regular', 12, C.mutedFg));
      var fcrSp = figma.createFrame(); fcrSp.resize(4,1); noFill(fcrSp); fcrRow.appendChild(fcrSp); fcrSp.layoutGrow = 1;
      fcrRow.appendChild(tx(fcalcRRows[fcrri][1], fcrri === 2 ? 'Bold' : 'Medium', 13, fcalcRRows[fcrri][2]));
      fcalcResults.appendChild(fcrRow);
      fcrRow.layoutSizingHorizontal = 'FILL';
    }
    fcalcBody.appendChild(fcalcResults);
    fcalc.appendChild(fcalcBody);
    fcalcBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(fcalc);
    console.log('[OK] Pattern: Factoring Calculator');
  } catch (e) { console.error('[FAIL] Pattern Factoring Calculator: ' + e.message); }


  // ── Pattern: OperationStatusPipeline ────────────────────────────────────
  try {
    var ospCard = figma.createFrame();
    ospCard.name = 'OperationStatusPipeline'; ospCard.resize(760, 200);
    ospCard.layoutMode = 'VERTICAL'; ospCard.primaryAxisAlignItems = 'MIN'; ospCard.counterAxisAlignItems = 'MIN';
    ospCard.paddingLeft = ospCard.paddingRight = ospCard.paddingTop = ospCard.paddingBottom = 20;
    ospCard.itemSpacing = 16; ospCard.cornerRadius = 8; fill(ospCard, C.surface); addShadow(ospCard);

    ospCard.appendChild(tx('OperationStatusPipeline', 'Bold', 13, C.fg));
    ospCard.appendChild(tx('Horizontal pipeline — factoring operation stages with status', 'Regular', 11, C.mutedFg));

    // Pipeline row
 var ospRow = row(12); ospRow.layoutMode = 'HORIZONTAL'; ospRow.counterAxisAlignItems = 'CENTER';
    noFill(ospRow);

    var ospStages = [
      { label: 'Radicación', status: 'completed' },
      { label: 'Análisis',   status: 'completed' },
      { label: 'Aprobación', status: 'active' },
      { label: 'Desembolso', status: 'pending' },
      { label: 'En cobro',   status: 'pending' },
      { label: 'Cobrado',    status: 'pending' },
    ];

    ospStages.forEach(function(st, i) {
      var stageCol = figma.createFrame();
      stageCol.layoutMode = 'VERTICAL'; stageCol.counterAxisAlignItems = 'CENTER';
      stageCol.primaryAxisAlignItems = 'MIN'; stageCol.itemSpacing = 6; noFill(stageCol);

      // Circle
      var circleRow = row(0); circleRow.counterAxisAlignItems = 'CENTER'; noFill(circleRow);

      // Connector left
      if (i > 0) {
        var connL = figma.createFrame(); connL.resize(20, 2);
        fill(connL, st.status === 'pending' ? C.border : C.primary);
 connL.layoutMode = 'HORIZONTAL'; circleRow.appendChild(connL); connL.layoutSizingHorizontal = 'FILL';
      }

      var circ = figma.createFrame();
      circ.resize(28, 28); circ.cornerRadius = 14;
      if (st.status === 'completed') { fill(circ, C.primary); }
      else if (st.status === 'active') { fill(circ, C.surface); circ.strokes = [{ type: 'SOLID', color: hexToRgb(C.primary), opacity: 1 }]; circ.strokeWeight = 2; }
      else { fill(circ, C.muted); }
      circ.layoutMode = 'HORIZONTAL'; circ.primaryAxisAlignItems = 'CENTER'; circ.counterAxisAlignItems = 'CENTER';

      if (st.status === 'completed') {
        var chk = iconNode('check', 14, C.primaryFg); circ.appendChild(chk);
      } else if (st.status === 'active') {
        var dot = figma.createFrame(); dot.resize(8, 8); dot.cornerRadius = 4; fill(dot, C.primary); circ.appendChild(dot);
      } else {
        var dotG = figma.createFrame(); dotG.resize(8, 8); dotG.cornerRadius = 4; fill(dotG, C.mutedFg); circ.appendChild(dotG);
      }
      circleRow.appendChild(circ);

      // Connector right
      if (i < ospStages.length - 1) {
        var connR = figma.createFrame(); connR.resize(20, 2);
        fill(connR, ospStages[i + 1].status === 'pending' && st.status !== 'active' ? C.border : st.status === 'completed' ? C.primary : C.border);
 connR.layoutMode = 'HORIZONTAL'; circleRow.appendChild(connR); connR.layoutSizingHorizontal = 'FILL';
      }
      stageCol.appendChild(circleRow);
      circleRow.layoutSizingHorizontal = 'FILL';

      // Label
      var labelColor = st.status === 'completed' ? C.fg : st.status === 'active' ? C.primary : C.mutedFg;
      var labelWeight = st.status === 'active' ? 'SemiBold' : 'Regular';
      stageCol.appendChild(tx(st.label, labelWeight, 10, labelColor));
      ospRow.appendChild(stageCol);
      stageCol.layoutSizingHorizontal = 'FILL';
    });

    ospCard.appendChild(ospRow);
    ospRow.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(ospCard);
    console.log('[OK] Pattern: OperationStatusPipeline');
  } catch (e) { console.error('[FAIL] Pattern OperationStatusPipeline: ' + e.message); }

  // ── Pattern: RiskIndicator ───────────────────────────────────────────────
  try {
    var riCard = figma.createFrame();
    riCard.name = 'RiskIndicator'; sbDesc(riCard); riCard.resize(320, 260);
    riCard.layoutMode = 'VERTICAL'; riCard.primaryAxisAlignItems = 'MIN'; riCard.counterAxisAlignItems = 'MIN';
    riCard.paddingLeft = riCard.paddingRight = riCard.paddingTop = riCard.paddingBottom = 20;
    riCard.itemSpacing = 12; riCard.cornerRadius = 8; fill(riCard, C.surface); addShadow(riCard);

    // Header row: title + badge
 var riHeader = row(8); riHeader.counterAxisAlignItems = 'CENTER'; riHeader.layoutMode = 'HORIZONTAL'; noFill(riHeader);
    riHeader.appendChild(tx('Riesgo Crediticio', 'SemiBold', 13, C.fg));
    var riBadge = row(0); riBadge.paddingLeft = riBadge.paddingRight = 10; riBadge.paddingTop = riBadge.paddingBottom = 4;
    riBadge.cornerRadius = 12; fill(riBadge, C.successSubtle);
    riBadge.appendChild(tx('Bajo', 'SemiBold', 11, C.success));
    riHeader.appendChild(riBadge);
    riCard.appendChild(riHeader);
    riHeader.layoutSizingHorizontal = 'FILL';

    // Score row: gauge + score text
    var riScoreRow = row(16); riScoreRow.counterAxisAlignItems = 'CENTER'; noFill(riScoreRow);

    // Gauge SVG-like representation using frames
    var riGaugeWrap = figma.createFrame(); riGaugeWrap.resize(80, 50); riGaugeWrap.layoutMode = 'VERTICAL';
    riGaugeWrap.primaryAxisAlignItems = 'CENTER'; riGaugeWrap.counterAxisAlignItems = 'CENTER'; noFill(riGaugeWrap);
    var riTrack = figma.createFrame(); riTrack.resize(70, 8); riTrack.cornerRadius = 4; fill(riTrack, C.muted);
    riTrack.layoutMode = 'HORIZONTAL';
    var riFill = figma.createFrame(); riFill.resize(56, 8); riFill.cornerRadius = 4; fill(riFill, C.success);
    riTrack.appendChild(riFill); riGaugeWrap.appendChild(riTrack);
    riGaugeWrap.appendChild(tx('Score', 'Regular', 9, C.mutedFg));
    riScoreRow.appendChild(riGaugeWrap);

    var riScoreInfo = figma.createFrame(); riScoreInfo.layoutMode = 'VERTICAL'; riScoreInfo.itemSpacing = 2; noFill(riScoreInfo);
    riScoreInfo.appendChild(tx('780', 'Bold', 28, C.fg));
    riScoreInfo.appendChild(tx('de 1000', 'Regular', 10, C.mutedFg));

    // Trend icon
    var riTrend = row(4); riTrend.counterAxisAlignItems = 'CENTER'; noFill(riTrend);
    riTrend.appendChild(iconNode('trending-up', 14, C.success));
    riTrend.appendChild(tx('Mejorando', 'Regular', 10, C.success));
    riScoreInfo.appendChild(riTrend);

    riScoreRow.appendChild(riScoreInfo);
    riCard.appendChild(riScoreRow);

    // Separator
    var riSep = figma.createFrame(); riSep.resize(280, 1); fill(riSep, C.border); riCard.appendChild(riSep);

    // Factors
    riCard.appendChild(tx('Factores de riesgo', 'SemiBold', 11, C.fg));
    var riFactors = [
      { label: 'Historial de pagos', val: 'Excelente', impact: 'positive' },
      { label: 'Concentración deudores', val: 'Media', impact: 'neutral' },
      { label: 'Deuda vigente', val: 'Alta', impact: 'negative' },
    ];
    riFactors.forEach(function(f) {
 var fRow = row(0); fRow.layoutMode = 'HORIZONTAL'; fRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
      fRow.counterAxisAlignItems = 'CENTER'; noFill(fRow); fRow.paddingTop = fRow.paddingBottom = 3;
      fRow.appendChild(tx(f.label, 'Regular', 10, C.mutedFg));
      var impColor = f.impact === 'positive' ? C.success : f.impact === 'negative' ? C.destructive : C.mutedFg;
      fRow.appendChild(tx(f.val, 'Medium', 10, impColor));
      riCard.appendChild(fRow);
      fRow.layoutSizingHorizontal = 'FILL';
    });

    // Updated at
    riCard.appendChild(tx('Actualizado: 08/03/2025', 'Regular', 9, C.mutedFg));

    ptRoot.appendChild(riCard);
    console.log('[OK] Pattern: RiskIndicator');
  } catch (e) { console.error('[FAIL] Pattern RiskIndicator: ' + e.message); }

  // ── Pattern: SignaturePanel ──────────────────────────────────────────────
  try {
    var spCard = figma.createFrame();
    spCard.name = 'SignaturePanel'; spCard.resize(480, 300);
    spCard.layoutMode = 'VERTICAL'; spCard.primaryAxisAlignItems = 'MIN'; spCard.counterAxisAlignItems = 'MIN';
    spCard.paddingLeft = spCard.paddingRight = spCard.paddingTop = spCard.paddingBottom = 20;
    spCard.itemSpacing = 14; spCard.cornerRadius = 8; fill(spCard, C.surface); addShadow(spCard);

    // Title row
 var spHeader = row(8); spHeader.counterAxisAlignItems = 'CENTER'; spHeader.layoutMode = 'HORIZONTAL'; noFill(spHeader);
    spHeader.appendChild(iconNode('file-text', 16, C.fg));
    var spTitleCol = figma.createFrame(); spTitleCol.layoutMode = 'VERTICAL'; spTitleCol.itemSpacing = 2; noFill(spTitleCol);
    spTitleCol.appendChild(tx('Firma Electrónica', 'SemiBold', 13, C.fg));
    spTitleCol.appendChild(tx('Contrato de Cesión #OP-2025-0312', 'Regular', 10, C.mutedFg));
    spHeader.appendChild(spTitleCol);
    spCard.appendChild(spHeader);
    spHeader.layoutSizingHorizontal = 'FILL';

    // Progress bar
    var spProgRow = row(8); spProgRow.counterAxisAlignItems = 'CENTER'; noFill(spProgRow);
    spProgRow.appendChild(tx('2 de 3 firmantes', 'Regular', 10, C.mutedFg));
    var spTrack = figma.createFrame(); spTrack.resize(200, 6); spTrack.cornerRadius = 3; fill(spTrack, C.muted);
    spTrack.layoutMode = 'HORIZONTAL';
    var spFill = figma.createFrame(); spFill.resize(133, 6); spFill.cornerRadius = 3; fill(spFill, C.primary);
    spTrack.appendChild(spFill); spProgRow.appendChild(spTrack);
    spCard.appendChild(spProgRow);

    // Signatory rows
    var signatories = [
      { name: 'Ana López', role: 'Representante Legal', status: 'signed', time: '07/03 10:42' },
      { name: 'Carlos Mora', role: 'Gerente Financiero', status: 'signed', time: '07/03 14:15' },
      { name: 'María Soto', role: 'Director Comercial', status: 'pending', time: null },
    ];

    signatories.forEach(function(sig) {
 var sigRow = row(10); sigRow.layoutMode = 'HORIZONTAL'; sigRow.counterAxisAlignItems = 'CENTER'; noFill(sigRow);
      sigRow.paddingTop = sigRow.paddingBottom = 8; sigRow.paddingLeft = sigRow.paddingRight = 12;
      sigRow.cornerRadius = 6;
      fill(sigRow, sig.status === 'signed' ? C.successSubtle : C.muted);

      // Avatar
      var sigAv = figma.createFrame(); sigAv.resize(32, 32); sigAv.cornerRadius = 16;
      fill(sigAv, sig.status === 'signed' ? C.successSubtle : C.muted);
      sigAv.layoutMode = 'HORIZONTAL'; sigAv.primaryAxisAlignItems = 'CENTER'; sigAv.counterAxisAlignItems = 'CENTER';
      var initials = sig.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2);
      sigAv.appendChild(tx(initials, 'SemiBold', 11, sig.status === 'signed' ? C.success : C.mutedFg));
      sigRow.appendChild(sigAv);

      // Info
      var sigInfo = figma.createFrame(); sigInfo.layoutMode = 'VERTICAL'; sigInfo.itemSpacing = 2; noFill(sigInfo);
      sigInfo.appendChild(tx(sig.name, 'Medium', 11, C.fg));
      sigInfo.appendChild(tx(sig.role, 'Regular', 10, C.mutedFg));
      sigRow.appendChild(sigInfo);
      sigInfo.layoutSizingHorizontal = 'FILL';

      // Status badge
      var statusLabel = sig.status === 'signed' ? 'Firmado' : sig.status === 'rejected' ? 'Rechazado' : 'Pendiente';
      var sigSoft = sig.status === 'signed' ? { bg: C.successSubtle, fg: C.successOnSubtle } : sig.status === 'rejected' ? { bg: C.destructiveSubtle, fg: C.destructive } : { bg: C.warningSubtle, fg: C.warningOnSubtle };
      var sBadge = row(0); sBadge.paddingLeft = sBadge.paddingRight = 8; sBadge.paddingTop = sBadge.paddingBottom = 3;
      sBadge.cornerRadius = 10; fill(sBadge, sigSoft.bg);
      sBadge.appendChild(tx(statusLabel, 'Medium', 10, sigSoft.fg));
      sigRow.appendChild(sBadge);

      if (sig.time) { sigRow.appendChild(tx(sig.time, 'Regular', 9, C.mutedFg)); }
      spCard.appendChild(sigRow);
      sigRow.layoutSizingHorizontal = 'FILL';
    });

    // Action buttons
    var spActions = row(8); spActions.counterAxisAlignItems = 'CENTER'; noFill(spActions);
    var spResend = row(0); spResend.paddingLeft = spResend.paddingRight = 12; spResend.paddingTop = spResend.paddingBottom = 7;
    spResend.cornerRadius = 6; fill(spResend, C.muted);
    spResend.appendChild(tx('Reenviar invitación', 'Medium', 11, C.fg));
    spActions.appendChild(spResend);
    var spVoid = row(0); spVoid.paddingLeft = spVoid.paddingRight = 12; spVoid.paddingTop = spVoid.paddingBottom = 7;
    spVoid.cornerRadius = 6; fill(spVoid, C.destructiveSubtle);
    spVoid.appendChild(tx('Anular proceso', 'Medium', 11, C.destructive));
    spActions.appendChild(spVoid);
    spCard.appendChild(spActions);

    ptRoot.appendChild(spCard);
    console.log('[OK] Pattern: SignaturePanel');
  } catch (e) { console.error('[FAIL] Pattern SignaturePanel: ' + e.message); }

  // ── Pattern: ApprovalFlow ────────────────────────────────────────────────
  try {
    var afCard = figma.createFrame();
    afCard.name = 'ApprovalFlow'; sbDesc(afCard); afCard.resize(480, 320);
    afCard.layoutMode = 'VERTICAL'; afCard.itemSpacing = 14;
    afCard.paddingLeft = afCard.paddingRight = afCard.paddingTop = afCard.paddingBottom = 20;
    afCard.cornerRadius = 8; fill(afCard, C.surface); addShadow(afCard);

    // Header
 var afHdr = row(8); afHdr.counterAxisAlignItems = 'CENTER'; afHdr.layoutMode = 'HORIZONTAL'; noFill(afHdr);
 var afTitleCol = figma.createFrame(); afTitleCol.layoutMode = 'VERTICAL'; afTitleCol.itemSpacing = 2; noFill(afTitleCol);
    afTitleCol.appendChild(tx('Aprobación de Operación', 'SemiBold', 13, C.fg));
    afTitleCol.appendChild(tx('OP-2025-0312 · Cedente: Comercial López Ltda.', 'Regular', 10, C.mutedFg));
    afHdr.appendChild(afTitleCol);
    afTitleCol.layoutSizingHorizontal = 'FILL';
    var afStatusBadge = row(0); afStatusBadge.paddingLeft = afStatusBadge.paddingRight = 10; afStatusBadge.paddingTop = afStatusBadge.paddingBottom = 4;
    afStatusBadge.cornerRadius = 12; fill(afStatusBadge, C.warningSubtle);
    afStatusBadge.appendChild(tx('En revisión', 'SemiBold', 11, C.warning));
    afHdr.appendChild(afStatusBadge);
    afCard.appendChild(afHdr);
    afHdr.layoutSizingHorizontal = 'FILL';

    // Separator
 var afSep = figma.createFrame(); afSep.resize(440, 1); afSep.layoutMode = 'HORIZONTAL'; afSep.primaryAxisSizingMode = 'FIXED'; afSep.counterAxisSizingMode = 'FIXED'; fill(afSep, C.border); afCard.appendChild(afSep); afSep.layoutSizingHorizontal = 'FILL';

    // Approver rows
    var afApprovers = [
      { name: 'Ana López', role: 'Analista de Riesgo', status: 'approved', time: '07/03 10:42' },
      { name: 'Carlos Mora', role: 'Gerente Comercial', status: 'pending', time: null },
      { name: 'María Soto', role: 'Director Financiero', status: 'pending', time: null },
    ];
    afApprovers.forEach(function(ap) {
 var apRow = row(10); apRow.layoutMode = 'HORIZONTAL'; apRow.counterAxisAlignItems = 'CENTER'; noFill(apRow);
      apRow.paddingTop = apRow.paddingBottom = 8;
      // Avatar
      var apAv = figma.createFrame(); apAv.resize(32, 32); apAv.cornerRadius = 16; noFill(apAv);
      fill(apAv, ap.status === 'approved' ? C.successSubtle : C.muted);
      apAv.layoutMode = 'HORIZONTAL'; apAv.primaryAxisAlignItems = 'CENTER'; apAv.counterAxisAlignItems = 'CENTER';
      var initials = ap.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2);
      apAv.appendChild(tx(initials, 'SemiBold', 11, ap.status === 'approved' ? C.success : C.mutedFg));
      apRow.appendChild(apAv);
      // Info
 var apInfo = figma.createFrame(); apInfo.layoutMode = 'VERTICAL'; apInfo.itemSpacing = 2; noFill(apInfo);
      apInfo.appendChild(tx(ap.name, 'Medium', 11, C.fg));
      apInfo.appendChild(tx(ap.role, 'Regular', 10, C.mutedFg));
      apRow.appendChild(apInfo);
      apInfo.layoutSizingHorizontal = 'FILL';
      // Status
      var apColor = ap.status === 'approved' ? C.success : ap.status === 'rejected' ? C.destructive : C.mutedFg;
      var apLabel = ap.status === 'approved' ? 'Aprobado' : ap.status === 'rejected' ? 'Rechazado' : 'Pendiente';
      var apBadge = row(0); apBadge.paddingLeft = apBadge.paddingRight = 8; apBadge.paddingTop = apBadge.paddingBottom = 3;
      apBadge.cornerRadius = 10; fill(apBadge, softBg(apColor));
      apBadge.appendChild(tx(apLabel, 'Medium', 10, apColor));
      apRow.appendChild(apBadge);
      if (ap.time) apRow.appendChild(tx(ap.time, 'Regular', 9, C.mutedFg));
      afCard.appendChild(apRow);
      apRow.layoutSizingHorizontal = 'FILL';
    });

    // Action buttons
    var afActions = row(8); noFill(afActions);
    var afApprove = row(0); afApprove.paddingLeft = afApprove.paddingRight = 16; afApprove.paddingTop = afApprove.paddingBottom = 8;
    afApprove.cornerRadius = 6; fill(afApprove, C.primary);
    afApprove.appendChild(tx('Aprobar', 'SemiBold', 12, C.primaryFg));
    afActions.appendChild(afApprove);
    var afReject = row(0); afReject.paddingLeft = afReject.paddingRight = 16; afReject.paddingTop = afReject.paddingBottom = 8;
    afReject.cornerRadius = 6; fill(afReject, C.destructiveSubtle);
    afReject.appendChild(tx('Rechazar', 'Medium', 12, C.destructive));
    afActions.appendChild(afReject);
    afCard.appendChild(afActions);

    ptRoot.appendChild(afCard);
    console.log('[OK] Pattern: ApprovalFlow');
  } catch (e) { console.error('[FAIL] Pattern ApprovalFlow: ' + e.message); }

  // ── Pattern: AuditLog ────────────────────────────────────────────────────
  try {
    var alCard = figma.createFrame();
    alCard.name = 'AuditLog'; sbDesc(alCard); alCard.resize(760, 320);
    alCard.layoutMode = 'VERTICAL'; alCard.itemSpacing = 12;
    alCard.paddingLeft = alCard.paddingRight = alCard.paddingTop = alCard.paddingBottom = 20;
    alCard.cornerRadius = 8; fill(alCard, C.surface); addShadow(alCard);

    alCard.appendChild(tx('AuditLog', 'Bold', 13, C.fg));

    // Toolbar
 var alToolbar = row(8); alToolbar.layoutMode = 'HORIZONTAL'; alToolbar.counterAxisAlignItems = 'CENTER'; noFill(alToolbar);
    var alSearch = figma.createFrame(); alSearch.resize(260, 36); alSearch.cornerRadius = 6; alSearch.layoutMode = 'HORIZONTAL';
    alSearch.counterAxisAlignItems = 'CENTER'; alSearch.paddingLeft = 10; alSearch.paddingRight = 10; alSearch.itemSpacing = 6;
    alSearch.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; alSearch.strokeWeight = 1; fill(alSearch, C.primaryFg);
    alSearch.appendChild(iconNode('search', 14, C.mutedFg));
    alSearch.appendChild(tx('Buscar usuario, descripción...', 'Regular', 11, C.mutedFg));
    alToolbar.appendChild(alSearch);
    var alSelA = figma.createFrame(); alSelA.resize(140, 36); alSelA.cornerRadius = 6; alSelA.layoutMode = 'HORIZONTAL';
    alSelA.counterAxisAlignItems = 'CENTER'; alSelA.paddingLeft = 10; alSelA.paddingRight = 10; alSelA.primaryAxisAlignItems = 'SPACE_BETWEEN';
    alSelA.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; alSelA.strokeWeight = 1; fill(alSelA, C.primaryFg);
    alSelA.appendChild(tx('Todas las acciones', 'Regular', 11, C.mutedFg));
    alSelA.appendChild(iconNode('chevron-down', 12, C.mutedFg));
    alToolbar.appendChild(alSelA);
    var alSelE = figma.createFrame(); alSelE.resize(140, 36); alSelE.cornerRadius = 6; alSelE.layoutMode = 'HORIZONTAL';
    alSelE.counterAxisAlignItems = 'CENTER'; alSelE.paddingLeft = 10; alSelE.paddingRight = 10; alSelE.primaryAxisAlignItems = 'SPACE_BETWEEN';
    alSelE.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; alSelE.strokeWeight = 1; fill(alSelE, C.primaryFg);
    alSelE.appendChild(tx('Todas las entidades', 'Regular', 11, C.mutedFg));
    alSelE.appendChild(iconNode('chevron-down', 12, C.mutedFg));
    alToolbar.appendChild(alSelE);
    alCard.appendChild(alToolbar);
    alToolbar.layoutSizingHorizontal = 'FILL';

    // Table header
 var alHead = row(0); alHead.layoutMode = 'HORIZONTAL'; fill(alHead, C.muted); alHead.paddingTop = alHead.paddingBottom = 8;
    var alHCols = [{ w: 120, label: 'Fecha / Hora' }, { w: 150, label: 'Usuario' }, { w: 100, label: 'Acción' }, { w: 250, label: 'Descripción' }, { w: 100, label: 'Origen' }];
    alHCols.forEach(function(c) {
      var hCell = figma.createFrame(); hCell.resize(c.w, 28); hCell.layoutMode = 'HORIZONTAL'; hCell.counterAxisAlignItems = 'CENTER'; hCell.paddingLeft = 10; noFill(hCell);
      hCell.appendChild(tx(c.label, 'Medium', 11, C.fg));
      alHead.appendChild(hCell);
    });
    alCard.appendChild(alHead);
    alHead.layoutSizingHorizontal = 'FILL';

    // Table rows
    var alEntries = [
      { ts: '08/03 09:14', user: 'Ana López', role: 'Analista', action: 'Aprobó', actionColor: C.primary, desc: 'Operación OP-2025-0312', src: '192.168.1.4' },
      { ts: '08/03 08:52', user: 'Carlos Mora', role: 'Gerente', action: 'Modificó', actionColor: C.mutedFg, desc: 'Condiciones de Cesión', src: '192.168.1.7' },
      { ts: '07/03 17:30', user: 'Sistema', role: null, action: 'Exportó', actionColor: C.mutedFg, desc: 'Reporte mensual PDF', src: 'sistema' },
    ];
    alEntries.forEach(function(e) {
 var alRow = row(0); alRow.layoutMode = 'HORIZONTAL'; alRow.paddingTop = alRow.paddingBottom = 8; noFill(alRow);
      alRow.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 0.5 }]; alRow.strokeAlign = 'OUTSIDE'; alRow.strokeWeight = 1;
      var alCells = [
        { w: 120, content: function() { return tx(e.ts, 'Regular', 10, C.mutedFg); } },
        { w: 150, content: function() {
          var uc = figma.createFrame(); uc.layoutMode = 'VERTICAL'; uc.itemSpacing = 1; noFill(uc);
          uc.appendChild(tx(e.user, 'Medium', 11, C.fg));
          if (e.role) uc.appendChild(tx(e.role, 'Regular', 9, C.mutedFg));
          return uc;
        }},
        { w: 100, content: function() {
          var badge = row(0); badge.paddingLeft = badge.paddingRight = 6; badge.paddingTop = badge.paddingBottom = 2;
          badge.cornerRadius = 4; fill(badge, softBg(e.actionColor));
          badge.appendChild(tx(e.action, 'Medium', 10, e.actionColor));
          return badge;
        }},
        { w: 250, content: function() { return tx(e.desc, 'Regular', 11, C.mutedFg); } },
        { w: 100, content: function() { return tx(e.src, 'Regular', 10, C.mutedFg); } },
      ];
      alCells.forEach(function(cell) {
        var cellF = figma.createFrame(); cellF.resize(cell.w, 36); cellF.layoutMode = 'HORIZONTAL'; cellF.counterAxisAlignItems = 'CENTER'; cellF.paddingLeft = 10; noFill(cellF);
        cellF.appendChild(cell.content());
        alRow.appendChild(cellF);
      });
      alCard.appendChild(alRow);
      alRow.layoutSizingHorizontal = 'FILL';
    });

    alCard.appendChild(tx('3 de 3 registros', 'Regular', 10, C.mutedFg));
    ptRoot.appendChild(alCard);
    console.log('[OK] Pattern: AuditLog');
  } catch (e) { console.error('[FAIL] Pattern AuditLog: ' + e.message); }

  // ── Pattern: BulkActionToolbar ───────────────────────────────────────────
  try {
    var batCard = figma.createFrame();
    batCard.name = 'BulkActionToolbar'; sbDesc(batCard); batCard.resize(680, 60);
    batCard.layoutMode = 'HORIZONTAL'; batCard.counterAxisAlignItems = 'CENTER';
    batCard.primaryAxisAlignItems = 'SPACE_BETWEEN';
    batCard.paddingLeft = batCard.paddingRight = 20; batCard.paddingTop = batCard.paddingBottom = 12;
    batCard.itemSpacing = 12; batCard.cornerRadius = 8; fill(batCard, C.fg); addShadow(batCard);

    // Left: selection count
    var batLeft = row(10); batLeft.counterAxisAlignItems = 'CENTER'; noFill(batLeft);
    batLeft.appendChild(iconNode('check-square', 16, C.primaryFg));
    batLeft.appendChild(tx('5 filas seleccionadas', 'SemiBold', 12, C.primaryFg));
    var batClear = row(0); batClear.paddingLeft = batClear.paddingRight = 8; batClear.paddingTop = batClear.paddingBottom = 4;
    batClear.cornerRadius = 4; fill(batClear, C.muted);
    batClear.appendChild(tx('Limpiar', 'Regular', 11, C.primaryFg));
    batLeft.appendChild(batClear);
    batCard.appendChild(batLeft);

    // Right: action buttons
    var batRight = row(8); noFill(batRight);
    var batActions = [
      { label: 'Aprobar', bg: C.success },
      { label: 'Exportar', bg: null },
      { label: 'Eliminar', bg: C.destructive },
    ];
    batActions.forEach(function(a) {
      var btn = row(0); btn.paddingLeft = btn.paddingRight = 14; btn.paddingTop = btn.paddingBottom = 7;
      btn.cornerRadius = 6;
      if (a.bg) fill(btn, a.bg); else btn.fills = [{ type: 'SOLID', color: { r:1, g:1, b:1 }, opacity: 0.15 }];
      btn.appendChild(tx(a.label, 'Medium', 11, C.primaryFg));
      batRight.appendChild(btn);
    });
    batCard.appendChild(batRight);

    ptRoot.appendChild(batCard);
    console.log('[OK] Pattern: BulkActionToolbar');
  } catch (e) { console.error('[FAIL] Pattern BulkActionToolbar: ' + e.message); }

  // ── Pattern: CommentThread ───────────────────────────────────────────────
  try {
    var ctCard = figma.createFrame();
    ctCard.name = 'CommentThread'; ctCard.resize(480, 340);
    ctCard.layoutMode = 'VERTICAL'; ctCard.itemSpacing = 12;
    ctCard.paddingLeft = ctCard.paddingRight = ctCard.paddingTop = ctCard.paddingBottom = 20;
    ctCard.cornerRadius = 8; fill(ctCard, C.surface); addShadow(ctCard);

 var ctHeader = row(0); ctHeader.layoutMode = 'HORIZONTAL'; ctHeader.primaryAxisAlignItems = 'SPACE_BETWEEN'; ctHeader.counterAxisAlignItems = 'CENTER'; noFill(ctHeader);
    ctHeader.appendChild(tx('Notas internas', 'SemiBold', 13, C.fg));
    var ctBadge = row(0); ctBadge.paddingLeft = ctBadge.paddingRight = 8; ctBadge.paddingTop = ctBadge.paddingBottom = 3;
    ctBadge.cornerRadius = 10; fill(ctBadge, C.muted);
    ctBadge.appendChild(tx('2 comentarios', 'Regular', 10, C.mutedFg));
    ctHeader.appendChild(ctBadge);
    ctCard.appendChild(ctHeader);
    ctHeader.layoutSizingHorizontal = 'FILL';

    var ctComments = [
      { initials: 'AL', name: 'Ana López', role: 'Analista', time: 'hace 2h', vis: 'Interno', visColor: C.secondary, text: 'El cedente tiene historial de pagos irregular en Q3 2024. Recomiendo solicitar garantías adicionales antes de aprobar.' },
      { initials: 'CM', name: 'Carlos Mora', role: 'Gerente', time: 'hace 45m', vis: 'Interno', visColor: C.secondary, text: 'Confirmado. Solicitar estados financieros actualizados y contactar al área legal.' },
    ];
    ctComments.forEach(function(c) {
      var cBox = figma.createFrame(); cBox.layoutMode = 'VERTICAL'; cBox.itemSpacing = 8;
      cBox.paddingLeft = cBox.paddingRight = cBox.paddingTop = cBox.paddingBottom = 12;
 cBox.cornerRadius = 6; fill(cBox, C.muted); cBox.layoutMode = 'HORIZONTAL';
      // Top row
 var cTop = row(8); cTop.counterAxisAlignItems = 'CENTER'; cTop.layoutMode = 'HORIZONTAL'; noFill(cTop);
      var cAv = figma.createFrame(); cAv.resize(28, 28); cAv.cornerRadius = 14; fill(cAv, C.muted);
      cAv.layoutMode = 'HORIZONTAL'; cAv.primaryAxisAlignItems = 'CENTER'; cAv.counterAxisAlignItems = 'CENTER';
      cAv.appendChild(tx(c.initials, 'SemiBold', 10, C.primary));
      cTop.appendChild(cAv);
 var cMeta = figma.createFrame(); cMeta.layoutMode = 'VERTICAL'; cMeta.itemSpacing = 1; noFill(cMeta);
      cMeta.appendChild(tx(c.name + ' · ' + c.role, 'Medium', 11, C.fg));
      cMeta.appendChild(tx(c.time, 'Regular', 9, C.mutedFg));
      cTop.appendChild(cMeta);
      cMeta.layoutSizingHorizontal = 'FILL';
      var cVisBadge = row(0); cVisBadge.paddingLeft = cVisBadge.paddingRight = 6; cVisBadge.paddingTop = cVisBadge.paddingBottom = 2;
      cVisBadge.cornerRadius = 8; fill(cVisBadge, softBg(c.visColor));
      cVisBadge.appendChild(tx(c.vis, 'Regular', 9, c.visColor));
      cTop.appendChild(cVisBadge);
      cBox.appendChild(cTop);
      cTop.layoutSizingHorizontal = 'FILL';
      cBox.appendChild(tx(c.text, 'Regular', 11, C.mutedFg));
      ctCard.appendChild(cBox);
      cBox.layoutSizingHorizontal = 'FILL';
    });

    // New comment input
 var ctInput = figma.createFrame(); ctInput.resize(440, 60); ctInput.layoutMode = 'HORIZONTAL'; ctInput.cornerRadius = 6;
    ctInput.layoutMode = 'HORIZONTAL'; ctInput.counterAxisAlignItems = 'CENTER'; ctInput.paddingLeft = 12; ctInput.paddingRight = 8; ctInput.paddingTop = ctInput.paddingBottom = 8; ctInput.itemSpacing = 8;
    ctInput.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; ctInput.strokeWeight = 1; fill(ctInput, C.primaryFg);
    ctInput.appendChild(tx('Agregar nota interna...', 'Regular', 11, C.mutedFg));
    var ctSend = row(0); ctSend.paddingLeft = ctSend.paddingRight = 12; ctSend.paddingTop = ctSend.paddingBottom = 6; ctSend.cornerRadius = 6; fill(ctSend, C.primary);
    ctSend.appendChild(tx('Enviar', 'Medium', 11, C.primaryFg));
    ctInput.appendChild(ctSend);
    ctCard.appendChild(ctInput);
    ctInput.layoutSizingHorizontal = 'FILL';

    ptRoot.appendChild(ctCard);
    console.log('[OK] Pattern: CommentThread');
  } catch (e) { console.error('[FAIL] Pattern CommentThread: ' + e.message); }

  // ── Pattern: CreditScoreCard ─────────────────────────────────────────────
  try {
    var cscCard = figma.createFrame();
    cscCard.name = 'CreditScoreCard'; sbDesc(cscCard); cscCard.resize(380, 340);
    cscCard.layoutMode = 'VERTICAL'; cscCard.itemSpacing = 0; cscCard.cornerRadius = 8;
    fill(cscCard, C.surface); addShadow(cscCard); cscCard.clipsContent = true;

    // Color strip
 var cscStrip = figma.createFrame(); cscStrip.resize(380, 4); cscStrip.layoutMode = 'HORIZONTAL'; fill(cscStrip, C.success); cscCard.appendChild(cscStrip); cscStrip.layoutSizingHorizontal = 'FILL';

    var cscBody = figma.createFrame(); cscBody.layoutMode = 'VERTICAL'; cscBody.itemSpacing = 14;
 cscBody.paddingLeft = cscBody.paddingRight = cscBody.paddingTop = cscBody.paddingBottom = 20; noFill(cscBody);

    // Header: name + risk badge
 var cscHdr = row(0); cscHdr.layoutMode = 'HORIZONTAL'; cscHdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; cscHdr.counterAxisAlignItems = 'MIN'; noFill(cscHdr);
    var cscNameCol = figma.createFrame(); cscNameCol.layoutMode = 'VERTICAL'; cscNameCol.itemSpacing = 2; noFill(cscNameCol);
    cscNameCol.appendChild(tx('Constructora Santa Fe SpA', 'SemiBold', 13, C.fg));
    cscNameCol.appendChild(tx('NIT 900.543.210-7', 'Regular', 10, C.mutedFg));
    cscNameCol.appendChild(tx('Construcción · Obras civiles', 'Regular', 10, C.mutedFg));
    cscHdr.appendChild(cscNameCol);
    var cscRiskPill = row(6); cscRiskPill.paddingLeft = cscRiskPill.paddingRight = 10; cscRiskPill.paddingTop = cscRiskPill.paddingBottom = 6;
    cscRiskPill.cornerRadius = 8; fill(cscRiskPill, C.successSubtle);
    cscRiskPill.appendChild(iconNode('shield-check', 14, C.success));
    cscRiskPill.appendChild(tx('Riesgo Bajo', 'SemiBold', 11, C.success));
    cscHdr.appendChild(cscRiskPill);
    cscBody.appendChild(cscHdr);
    cscHdr.layoutSizingHorizontal = 'FILL';

    // Score + limits row
    var cscScoreRow = row(16); cscScoreRow.counterAxisAlignItems = 'CENTER'; noFill(cscScoreRow);
    // Gauge
    var cscGauge = figma.createFrame(); cscGauge.resize(90, 60); cscGauge.layoutMode = 'VERTICAL';
    cscGauge.primaryAxisAlignItems = 'CENTER'; cscGauge.counterAxisAlignItems = 'CENTER'; cscGauge.itemSpacing = 3; noFill(cscGauge);
    var cscTrack = figma.createFrame(); cscTrack.resize(80, 10); cscTrack.cornerRadius = 5; fill(cscTrack, C.muted); cscTrack.layoutMode = 'HORIZONTAL';
    var cscFill = figma.createFrame(); cscFill.resize(62, 10); cscFill.cornerRadius = 5; fill(cscFill, C.success); cscTrack.appendChild(cscFill);
    cscGauge.appendChild(cscTrack);
    cscGauge.appendChild(tx('780 / 1000', 'Bold', 14, C.fg));
    cscGauge.appendChild(tx('Score crediticio', 'Regular', 9, C.mutedFg));
    cscScoreRow.appendChild(cscGauge);

    // Limit + usage
 var cscLimits = figma.createFrame(); cscLimits.layoutMode = 'VERTICAL'; cscLimits.itemSpacing = 8; noFill(cscLimits);
    var cscApproved = figma.createFrame(); cscApproved.layoutMode = 'VERTICAL'; cscApproved.itemSpacing = 1; noFill(cscApproved);
    cscApproved.appendChild(tx('Límite aprobado', 'Regular', 10, C.mutedFg));
    cscApproved.appendChild(tx('$150.000.000', 'Bold', 16, C.fg));
    cscLimits.appendChild(cscApproved);
    var cscUsed = figma.createFrame(); cscUsed.layoutMode = 'VERTICAL'; cscUsed.itemSpacing = 1; noFill(cscUsed);
    cscUsed.appendChild(tx('Utilizado', 'Regular', 10, C.mutedFg));
    cscUsed.appendChild(tx('$45.000.000', 'SemiBold', 13, C.fg));
    cscLimits.appendChild(cscUsed);
    // Usage bar
 var cscBarWrap = figma.createFrame(); cscBarWrap.layoutMode = 'VERTICAL'; cscBarWrap.itemSpacing = 4; noFill(cscBarWrap);
    cscBarWrap.appendChild(tx('Uso del cupo · 30%', 'Regular', 9, C.mutedFg));
 var cscBarTrack = figma.createFrame(); cscBarTrack.resize(200, 6); cscBarTrack.cornerRadius = 3; fill(cscBarTrack, C.muted); cscBarTrack.layoutMode = 'HORIZONTAL';
    var cscBarFill = figma.createFrame(); cscBarFill.resize(60, 6); cscBarFill.cornerRadius = 3; fill(cscBarFill, C.success); cscBarTrack.appendChild(cscBarFill);
    cscBarWrap.appendChild(cscBarTrack);
    cscBarTrack.layoutSizingHorizontal = 'FILL';
    cscLimits.appendChild(cscBarWrap);
    cscBarWrap.layoutSizingHorizontal = 'FILL';
    cscScoreRow.appendChild(cscLimits);
    cscLimits.layoutSizingHorizontal = 'FILL';
    cscBody.appendChild(cscScoreRow);

    // Metrics grid
 var cscMetrics = figma.createFrame(); cscMetrics.layoutMode = 'HORIZONTAL'; cscMetrics.layoutWrap = 'WRAP'; cscMetrics.itemSpacing = 8; cscMetrics.counterAxisSpacing = 8; noFill(cscMetrics);
    var cscMData = [
      { label: 'Facturas cedidas', val: '127', trend: 'up' },
      { label: 'Mora histórica', val: '1.2%', trend: 'down' },
      { label: 'Antigüedad', val: '8 años', trend: null },
      { label: 'Deudores', val: '14', trend: null },
    ];
    cscMData.forEach(function(m) {
      var mCell = figma.createFrame(); mCell.resize(156, 44); mCell.cornerRadius = 6; fill(mCell, C.muted);
      mCell.layoutMode = 'VERTICAL'; mCell.paddingLeft = mCell.paddingRight = 12; mCell.paddingTop = mCell.paddingBottom = 8; mCell.itemSpacing = 2;
      mCell.appendChild(tx(m.label, 'Regular', 9, C.mutedFg));
      var mValRow = row(4); mValRow.counterAxisAlignItems = 'CENTER'; noFill(mValRow);
      mValRow.appendChild(tx(m.val, 'SemiBold', 13, C.fg));
      if (m.trend === 'up') mValRow.appendChild(iconNode('trending-up', 12, C.success));
      if (m.trend === 'down') mValRow.appendChild(iconNode('trending-down', 12, C.destructive));
      mCell.appendChild(mValRow);
      cscMetrics.appendChild(mCell);
    });
    cscBody.appendChild(cscMetrics);
    cscMetrics.layoutSizingHorizontal = 'FILL';

    cscBody.appendChild(tx('Actualizado: 08/03/2025', 'Regular', 9, C.mutedFg));
    cscCard.appendChild(cscBody);
    cscBody.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(cscCard);
    console.log('[OK] Pattern: CreditScoreCard');
  } catch (e) { console.error('[FAIL] Pattern CreditScoreCard: ' + e.message); }

  // ── Pattern: DetailCard ──────────────────────────────────────────────────
  try {
    var dcCard = figma.createFrame();
    dcCard.name = 'DetailCard'; sbDesc(dcCard); dcCard.resize(560, 240);
    dcCard.layoutMode = 'VERTICAL'; dcCard.itemSpacing = 14;
    dcCard.paddingLeft = dcCard.paddingRight = dcCard.paddingTop = dcCard.paddingBottom = 20;
    dcCard.cornerRadius = 8; fill(dcCard, C.surface); addShadow(dcCard);

    // Header
 var dcHdr = row(0); dcHdr.layoutMode = 'HORIZONTAL'; dcHdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; dcHdr.counterAxisAlignItems = 'CENTER'; noFill(dcHdr);
    dcHdr.appendChild(tx('Datos del Cedente', 'SemiBold', 13, C.fg));
    var dcEditBtn = row(6); dcEditBtn.paddingLeft = dcEditBtn.paddingRight = 12; dcEditBtn.paddingTop = dcEditBtn.paddingBottom = 6;
    dcEditBtn.cornerRadius = 6; fill(dcEditBtn, C.muted);
    dcEditBtn.appendChild(iconNode('pencil', 13, C.mutedFg));
    dcEditBtn.appendChild(tx('Editar', 'Medium', 11, C.mutedFg));
    dcHdr.appendChild(dcEditBtn);
    dcCard.appendChild(dcHdr);
    dcHdr.layoutSizingHorizontal = 'FILL';

    // Field grid
    var dcGrid = figma.createFrame(); dcGrid.layoutMode = 'HORIZONTAL'; dcGrid.layoutWrap = 'WRAP';
 dcGrid.itemSpacing = 0; dcGrid.counterAxisSpacing = 12; dcGrid.layoutMode = 'HORIZONTAL'; noFill(dcGrid);
    var dcFields = [
      { label: 'Razón Social', val: 'Comercial López Ltda.' },
      { label: 'NIT', val: '900.543.210-7' },
      { label: 'Giro', val: 'Comercio al por mayor' },
      { label: 'Región', val: 'Metropolitana' },
      { label: 'Representante Legal', val: 'Juan López Soto' },
      { label: 'Fecha Incorporación', val: '15/01/2021' },
    ];
    dcFields.forEach(function(f) {
      var fCell = figma.createFrame(); fCell.resize(173, 52); fCell.layoutMode = 'VERTICAL'; fCell.itemSpacing = 3;
      fCell.paddingLeft = fCell.paddingRight = fCell.paddingTop = fCell.paddingBottom = 10; noFill(fCell);
      fCell.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 0.5 }]; fCell.strokeWeight = 1;
      fCell.appendChild(tx(f.label, 'Regular', 9, C.mutedFg));
      fCell.appendChild(tx(f.val, 'Medium', 12, C.fg));
      dcGrid.appendChild(fCell);
    });
    dcCard.appendChild(dcGrid);
    dcGrid.layoutSizingHorizontal = 'FILL';
    ptRoot.appendChild(dcCard);
    console.log('[OK] Pattern: DetailCard');
  } catch (e) { console.error('[FAIL] Pattern DetailCard: ' + e.message); }

  // ── Pattern: ExportPanel ─────────────────────────────────────────────────
  try {
    var epCard = figma.createFrame();
    epCard.name = 'ExportPanel'; epCard.resize(420, 360);
    epCard.layoutMode = 'VERTICAL'; epCard.itemSpacing = 16;
    epCard.paddingLeft = epCard.paddingRight = epCard.paddingTop = epCard.paddingBottom = 24;
    epCard.cornerRadius = 8; fill(epCard, C.surface); addShadow(epCard);

 var epHdr = row(0); epHdr.layoutMode = 'HORIZONTAL'; epHdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; epHdr.counterAxisAlignItems = 'CENTER'; noFill(epHdr);
    var epTitleCol = figma.createFrame(); epTitleCol.layoutMode = 'VERTICAL'; epTitleCol.itemSpacing = 2; noFill(epTitleCol);
    epTitleCol.appendChild(tx('Exportar Portafolio', 'SemiBold', 14, C.fg));
    epTitleCol.appendChild(tx('Selecciona formato y columnas a exportar', 'Regular', 11, C.mutedFg));
    epHdr.appendChild(epTitleCol);
    epHdr.appendChild(iconNode('x', 16, C.mutedFg));
    epCard.appendChild(epHdr);
    epHdr.layoutSizingHorizontal = 'FILL';

 var epSep1 = figma.createFrame(); epSep1.resize(372, 1); epSep1.layoutMode = 'HORIZONTAL'; epSep1.primaryAxisSizingMode = 'FIXED'; epSep1.counterAxisSizingMode = 'FIXED'; fill(epSep1, C.border); epCard.appendChild(epSep1); epSep1.layoutSizingHorizontal = 'FILL';

    // Format selector
    epCard.appendChild(tx('Formato', 'Medium', 11, C.fg));
    var epFormats = figma.createFrame(); epFormats.layoutMode = 'HORIZONTAL'; epFormats.itemSpacing = 8; noFill(epFormats);
    var fmts = [{ label: 'Excel (.xlsx)', sel: true }, { label: 'CSV', sel: false }, { label: 'PDF', sel: false }];
    fmts.forEach(function(f) {
      var fBtn = row(6); fBtn.paddingLeft = fBtn.paddingRight = 14; fBtn.paddingTop = fBtn.paddingBottom = 8; fBtn.cornerRadius = 6;
      fill(fBtn, f.sel ? C.primary : C.muted);
      fBtn.strokes = f.sel ? [] : [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; fBtn.strokeWeight = 1;
      fBtn.appendChild(tx(f.label, 'Medium', 11, f.sel ? C.primaryFg : C.fg));
      epFormats.appendChild(fBtn);
    });
    epCard.appendChild(epFormats);

    // Columns
    epCard.appendChild(tx('Columnas', 'Medium', 11, C.fg));
    var epCols = figma.createFrame(); epCols.layoutMode = 'HORIZONTAL'; epCols.layoutWrap = 'WRAP'; epCols.itemSpacing = 8; epCols.counterAxisSpacing = 8; noFill(epCols);
    var epColList = ['Operación', 'Cedente', 'Deudor', 'Monto', 'Tasa', 'Vencimiento', 'Estado'];
    epColList.forEach(function(col, i) {
      var cRow = row(6); cRow.counterAxisAlignItems = 'CENTER'; noFill(cRow);
      var cb = figma.createFrame(); cb.resize(14, 14); cb.cornerRadius = 3;
      fill(cb, i < 5 ? C.primary : C.primaryFg);
      if (i >= 5) { cb.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 1 }]; cb.strokeWeight = 1; }
      cRow.appendChild(cb);
      cRow.appendChild(tx(col, 'Regular', 11, C.fg));
      epCols.appendChild(cRow);
    });
    epCard.appendChild(epCols);

 var epSep2 = figma.createFrame(); epSep2.resize(372, 1); epSep2.layoutMode = 'HORIZONTAL'; epSep2.primaryAxisSizingMode = 'FIXED'; epSep2.counterAxisSizingMode = 'FIXED'; fill(epSep2, C.border); epCard.appendChild(epSep2); epSep2.layoutSizingHorizontal = 'FILL';

    // Actions
 var epActions = row(8); epActions.layoutMode = 'HORIZONTAL'; epActions.primaryAxisAlignItems = 'MAX'; noFill(epActions);
    var epCancel = row(0); epCancel.paddingLeft = epCancel.paddingRight = 16; epCancel.paddingTop = epCancel.paddingBottom = 9; epCancel.cornerRadius = 6; fill(epCancel, C.muted);
    epCancel.appendChild(tx('Cancelar', 'Medium', 12, C.fg));
    epActions.appendChild(epCancel);
    var epExport = row(6); epExport.paddingLeft = epExport.paddingRight = 16; epExport.paddingTop = epExport.paddingBottom = 9; epExport.cornerRadius = 6; fill(epExport, C.primary);
    epExport.appendChild(iconNode('download', 14, C.primaryFg));
    epExport.appendChild(tx('Exportar', 'SemiBold', 12, C.primaryFg));
    epActions.appendChild(epExport);
    epCard.appendChild(epActions);
    epActions.layoutSizingHorizontal = 'FILL';

    ptRoot.appendChild(epCard);
    console.log('[OK] Pattern: ExportPanel');
  } catch (e) { console.error('[FAIL] Pattern ExportPanel: ' + e.message); }

  // ── Pattern: FileViewer ──────────────────────────────────────────────────
  try {
    var fvCard = figma.createFrame();
    fvCard.name = 'FileViewer'; fvCard.resize(520, 280);
    fvCard.layoutMode = 'VERTICAL'; fvCard.itemSpacing = 0;
    fvCard.paddingLeft = fvCard.paddingRight = fvCard.paddingTop = fvCard.paddingBottom = 20;
    fvCard.cornerRadius = 8; fill(fvCard, C.surface); addShadow(fvCard);

 var fvHdr = row(0); fvHdr.layoutMode = 'HORIZONTAL'; fvHdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; fvHdr.counterAxisAlignItems = 'CENTER'; noFill(fvHdr); fvHdr.paddingBottom = 14;
    fvHdr.appendChild(tx('Documentos adjuntos', 'SemiBold', 13, C.fg));
    var fvAdd = row(6); fvAdd.paddingLeft = fvAdd.paddingRight = 12; fvAdd.paddingTop = fvAdd.paddingBottom = 6; fvAdd.cornerRadius = 6; fill(fvAdd, C.muted);
    fvAdd.appendChild(iconNode('plus', 13, C.mutedFg));
    fvAdd.appendChild(tx('Agregar', 'Medium', 11, C.mutedFg));
    fvHdr.appendChild(fvAdd);
    fvCard.appendChild(fvHdr);
    fvHdr.layoutSizingHorizontal = 'FILL';

    var fvFiles = [
      { name: 'Factura_0312.pdf', size: '245 KB', date: '08/03/2025', icon: 'file-text', iconColor: C.destructive },
      { name: 'Contrato_cesion.pdf', size: '1.2 MB', date: '07/03/2025', icon: 'file-text', iconColor: C.destructive },
      { name: 'Balance_2024.xlsx', size: '380 KB', date: '01/03/2025', icon: 'file-spreadsheet', iconColor: C.success },
      { name: 'Foto_cheque.jpg', size: '620 KB', date: '06/03/2025', icon: 'image', iconColor: C.secondary },
    ];
    fvFiles.forEach(function(f, i) {
 var fRow = row(12); fRow.layoutMode = 'HORIZONTAL'; fRow.counterAxisAlignItems = 'CENTER'; noFill(fRow);
      fRow.paddingTop = fRow.paddingBottom = 10;
      if (i < fvFiles.length - 1) { fRow.strokes = [{ type: 'SOLID', color: hexToRgb(C.border), opacity: 0.5 }]; fRow.strokeAlign = 'OUTSIDE'; fRow.strokeWeight = 1; }
      // Icon
      var fIconBox = figma.createFrame(); fIconBox.resize(36, 36); fIconBox.cornerRadius = 6; fill(fIconBox, softBg(f.iconColor));
      fIconBox.layoutMode = 'HORIZONTAL'; fIconBox.primaryAxisAlignItems = 'CENTER'; fIconBox.counterAxisAlignItems = 'CENTER';
      fIconBox.appendChild(iconNode(f.icon, 16, f.iconColor));
      fRow.appendChild(fIconBox);
      // Meta
 var fMeta = figma.createFrame(); fMeta.layoutMode = 'VERTICAL'; fMeta.itemSpacing = 2; noFill(fMeta);
      fMeta.appendChild(tx(f.name, 'Medium', 11, C.fg));
      fMeta.appendChild(tx(f.size + ' · ' + f.date, 'Regular', 9, C.mutedFg));
      fRow.appendChild(fMeta);
      fMeta.layoutSizingHorizontal = 'FILL';
      // Actions
      var fActs = row(4); noFill(fActs);
      fActs.appendChild(iconNode('eye', 14, C.mutedFg));
      fActs.appendChild(iconNode('download', 14, C.mutedFg));
      fRow.appendChild(fActs);
      fvCard.appendChild(fRow);
      fRow.layoutSizingHorizontal = 'FILL';
    });

    ptRoot.appendChild(fvCard);
    console.log('[OK] Pattern: FileViewer');
  } catch (e) { console.error('[FAIL] Pattern FileViewer: ' + e.message); }

  // ── Pattern: Onboarding ──────────────────────────────────────────────────
  try {
    var obCard = figma.createFrame();
    obCard.name = 'Onboarding'; obCard.resize(480, 360);
    obCard.layoutMode = 'VERTICAL'; obCard.counterAxisAlignItems = 'CENTER';
    obCard.primaryAxisAlignItems = 'CENTER'; obCard.itemSpacing = 20;
    obCard.paddingLeft = obCard.paddingRight = obCard.paddingTop = obCard.paddingBottom = 40;
    obCard.cornerRadius = 8; fill(obCard, C.surface); addShadow(obCard);

    // Icon
    var obIconBox = figma.createFrame(); obIconBox.resize(64, 64); obIconBox.cornerRadius = 16;
    fill(obIconBox, C.muted); obIconBox.layoutMode = 'HORIZONTAL';
    obIconBox.primaryAxisAlignItems = 'CENTER'; obIconBox.counterAxisAlignItems = 'CENTER';
    obIconBox.appendChild(iconNode('file-text', 28, C.primary));
    obCard.appendChild(obIconBox);

    // Text
    var obText = figma.createFrame(); obText.layoutMode = 'VERTICAL'; obText.counterAxisAlignItems = 'CENTER'; obText.itemSpacing = 8; noFill(obText);
    obText.appendChild(tx('Comienza con Factoring', 'Bold', 18, C.fg));
    obText.appendChild(tx('Aún no tienes operaciones registradas.\nCrea tu primera cesión de facturas y\ncomienza a gestionar tu portafolio.', 'Regular', 13, C.mutedFg));
    obCard.appendChild(obText);

    // CTA
    var obCTA = row(8); obCTA.paddingLeft = obCTA.paddingRight = 24; obCTA.paddingTop = obCTA.paddingBottom = 12;
    obCTA.counterAxisAlignItems = 'CENTER'; obCTA.cornerRadius = 8; fill(obCTA, C.primary);
    obCTA.appendChild(iconNode('plus', 16, C.primaryFg));
    obCTA.appendChild(tx('Nueva operación', 'SemiBold', 13, C.primaryFg));
    obCard.appendChild(obCTA);

    // Steps
    var obSteps = figma.createFrame(); obSteps.layoutMode = 'HORIZONTAL'; obSteps.itemSpacing = 24;
    obSteps.counterAxisAlignItems = 'CENTER'; noFill(obSteps);
    var obStepData = [
      { n: '1', label: 'Ingresa cedente' },
      { n: '2', label: 'Sube facturas' },
      { n: '3', label: 'Firma y desembolso' },
    ];
    obStepData.forEach(function(s, i) {
      var sCol = figma.createFrame(); sCol.layoutMode = 'VERTICAL'; sCol.counterAxisAlignItems = 'CENTER'; sCol.itemSpacing = 4; noFill(sCol);
      var sCirc = figma.createFrame(); sCirc.resize(24, 24); sCirc.cornerRadius = 12;
      fill(sCirc, C.muted); sCirc.layoutMode = 'HORIZONTAL'; sCirc.primaryAxisAlignItems = 'CENTER'; sCirc.counterAxisAlignItems = 'CENTER';
      sCirc.appendChild(tx(s.n, 'SemiBold', 10, C.primary));
      sCol.appendChild(sCirc);
      sCol.appendChild(tx(s.label, 'Regular', 10, C.mutedFg));
      obSteps.appendChild(sCol);
      if (i < obStepData.length - 1) {
        var oc = figma.createFrame(); oc.resize(24, 1); fill(oc, C.border); obSteps.appendChild(oc);
      }
    });
    obCard.appendChild(obSteps);

    ptRoot.appendChild(obCard);
    console.log('[OK] Pattern: Onboarding');
  } catch (e) { console.error('[FAIL] Pattern Onboarding: ' + e.message); }

  // ── Pattern: Timeline ────────────────────────────────────────────────────
  try {
    var tlCard = figma.createFrame();
    tlCard.name = 'Timeline'; sbDesc(tlCard); tlCard.resize(420, 300);
    tlCard.layoutMode = 'VERTICAL'; tlCard.itemSpacing = 0;
    tlCard.paddingLeft = tlCard.paddingRight = tlCard.paddingTop = tlCard.paddingBottom = 20;
    tlCard.cornerRadius = 8; fill(tlCard, C.surface); addShadow(tlCard);

    tlCard.appendChild(tx('Historial de la operación', 'SemiBold', 13, C.fg));
 var tlSep = figma.createFrame(); tlSep.resize(380, 1); tlSep.layoutMode = 'HORIZONTAL'; tlSep.primaryAxisSizingMode = 'FIXED'; tlSep.counterAxisSizingMode = 'FIXED'; fill(tlSep, C.border); tlCard.appendChild(tlSep); tlSep.layoutSizingHorizontal = 'FILL';

    var tlItems = [
      { status: 'completed', label: 'Desembolso realizado', date: '08/03/2025 · 14:32', desc: 'Transferencia a cuenta Bancolombia 1234567890', color: C.success },
      { status: 'completed', label: 'Aprobación final', date: '07/03/2025 · 10:15', desc: 'María Soto — Director Financiero', color: C.success },
      { status: 'current', label: 'Análisis de riesgo', date: '06/03/2025 · 09:40', desc: 'Score 780 · Riesgo Bajo · Ana López', color: C.primary },
      { status: 'pending', label: 'Radicación de facturas', date: '05/03/2025', desc: '12 facturas por $150.000.000', color: C.mutedFg },
    ];
    tlItems.forEach(function(item, i) {
 var tlRow = row(0); tlRow.layoutMode = 'HORIZONTAL'; tlRow.counterAxisAlignItems = 'MIN'; noFill(tlRow); tlRow.paddingTop = 14;
      // Dot column
      var dotCol = figma.createFrame(); dotCol.resize(24, 52); dotCol.layoutMode = 'VERTICAL'; dotCol.counterAxisAlignItems = 'CENTER'; dotCol.itemSpacing = 0; noFill(dotCol);
      var dot = figma.createFrame(); dot.resize(14, 14); dot.cornerRadius = 7; fill(dot, item.color);
      if (item.status === 'current') { dot.strokes = [{ type: 'SOLID', color: hexToRgb(item.color), opacity: 1 }]; dot.strokeWeight = 3; dot.resize(10, 10); dot.cornerRadius = 5; }
      dotCol.appendChild(dot);
      if (i < tlItems.length - 1) {
        var connector = figma.createFrame(); connector.resize(2, 38); fill(connector, item.status === 'completed' ? item.color : C.border); dotCol.appendChild(connector);
      }
      tlRow.appendChild(dotCol);
      // Content
 var tlContent = figma.createFrame(); tlContent.layoutMode = 'VERTICAL'; tlContent.itemSpacing = 3; noFill(tlContent); tlContent.paddingLeft = 8;
      tlContent.appendChild(tx(item.label, item.status === 'pending' ? 'Regular' : 'Medium', 12, item.status === 'pending' ? C.mutedFg : C.fg));
      tlContent.appendChild(tx(item.date, 'Regular', 10, C.mutedFg));
      tlContent.appendChild(tx(item.desc, 'Regular', 10, C.mutedFg));
      tlRow.appendChild(tlContent);
      tlContent.layoutSizingHorizontal = 'FILL';
      tlCard.appendChild(tlRow);
      tlRow.layoutSizingHorizontal = 'FILL';
    });

    ptRoot.appendChild(tlCard);
    console.log('[OK] Pattern: Timeline');
  } catch (e) { console.error('[FAIL] Pattern Timeline: ' + e.message); }

  // ── Pattern: AgingReport ────────────────────────────────────────────────
  try {
    var arWrap = figma.createFrame();
    arWrap.name = 'AgingReport'; arWrap.layoutMode = 'VERTICAL'; arWrap.itemSpacing = 16;
    arWrap.primaryAxisSizingMode = 'AUTO'; arWrap.counterAxisSizingMode = 'AUTO';
    arWrap.paddingLeft = arWrap.paddingRight = arWrap.paddingTop = arWrap.paddingBottom = 0;
    noFill(arWrap);

    var arBuckets = [
      { label: 'Al día',      amount: 850,  count: 312, risk: 'ok',       bar: C.primary },
      { label: '1–30 días',   amount: 420,  count: 148, risk: 'low',      bar: C.secondary },
      { label: '31–60 días',  amount: 210,  count: 67,  risk: 'medium',   bar: C.warning },
      { label: '61–90 días',  amount: 95,   count: 28,  risk: 'high',     bar: C.warning },
      { label: '+90 días',    amount: 45,   count: 11,  risk: 'critical', bar: C.destructive },
    ];
    var arTotal = 0;
    for (var ai = 0; ai < arBuckets.length; ai++) { arTotal += arBuckets[ai].amount; }

    // ── KPI cards row ──
    var arKpiRow = row(12);
    for (var ai = 0; ai < arBuckets.length; ai++) {
      var b = arBuckets[ai];
      var pct = arTotal > 0 ? ((b.amount / arTotal) * 100).toFixed(1) : '0.0';
      var kpiCard = figma.createFrame();
      kpiCard.name = 'KPI_' + b.label; kpiCard.layoutMode = 'VERTICAL'; kpiCard.itemSpacing = 4;
      kpiCard.primaryAxisSizingMode = 'FIXED'; kpiCard.counterAxisSizingMode = 'FIXED';
      kpiCard.resize(160, 88); kpiCard.cornerRadius = 8; kpiCard.clipsContent = true;
      kpiCard.paddingLeft = kpiCard.paddingRight = 16; kpiCard.paddingTop = 16; kpiCard.paddingBottom = 12;
      fill(kpiCard, C.card); stroke(kpiCard, C.border);
      // Accent top bar
      var arAccent = figma.createFrame();
      arAccent.resize(160, 3); arAccent.layoutMode = 'HORIZONTAL';
      arAccent.primaryAxisSizingMode = 'FIXED'; arAccent.counterAxisSizingMode = 'FIXED';
      fill(arAccent, b.bar); arAccent.x = 0; arAccent.y = 0;
      kpiCard.appendChild(arAccent);
      kpiCard.appendChild(tx(b.label, 'Regular', 11, C.mutedFg));
      kpiCard.appendChild(tx('$' + (b.amount >= 1000 ? (b.amount / 1000).toFixed(1) + 'B' : b.amount + 'M'), 'Bold', 18, C.fg));
 var arFooter = row(0); arFooter.counterAxisAlignItems = 'CENTER'; arFooter.layoutMode = 'HORIZONTAL';
      arFooter.primaryAxisAlignItems = 'SPACE_BETWEEN';
      arFooter.appendChild(tx(b.count + ' facturas', 'Regular', 10, C.mutedFg));
      arFooter.appendChild(tx(pct + '%', 'Medium', 10, C.mutedFg));
      kpiCard.appendChild(arFooter);
      arFooter.layoutSizingHorizontal = 'FILL';
      arKpiRow.appendChild(kpiCard);
    }
    arWrap.appendChild(arKpiRow);

    // ── Summary table card ──
    var arTableCard = figma.createFrame();
    arTableCard.name = 'AgingTable'; arTableCard.layoutMode = 'VERTICAL'; arTableCard.itemSpacing = 0;
    arTableCard.counterAxisSizingMode = 'FIXED';
    arTableCard.resize(860, 100); arTableCard.primaryAxisSizingMode = 'AUTO'; arTableCard.cornerRadius = 8;
    fill(arTableCard, C.card); stroke(arTableCard, C.border);

    // Table header
 var arTHead = row(0); arTHead.layoutMode = 'HORIZONTAL'; arTHead.counterAxisAlignItems = 'CENTER';
    arTHead.paddingLeft = arTHead.paddingRight = 16; arTHead.paddingTop = arTHead.paddingBottom = 10;
    fill(arTHead, C.card);
    var arHdrLabels = ['Tramo', 'Facturas', 'Monto', '% Cartera', 'Riesgo'];
    var arColWidths = [160, 120, 160, 140, 120];
    for (var hi = 0; hi < arHdrLabels.length; hi++) {
      var hCell = figma.createFrame(); hCell.layoutMode = 'HORIZONTAL';
      hCell.primaryAxisSizingMode = 'FIXED'; hCell.counterAxisSizingMode = 'AUTO';
      hCell.resize(arColWidths[hi], 20);
      hCell.primaryAxisAlignItems = hi === 0 ? 'MIN' : 'MAX';
      hCell.appendChild(tx(arHdrLabels[hi], 'Medium', 11, C.mutedFg));
      arTHead.appendChild(hCell);
    }
    arTableCard.appendChild(arTHead);
    arTHead.layoutSizingHorizontal = 'FILL';

    // Divider
 var arDiv = figma.createFrame(); arDiv.resize(860, 1); arDiv.layoutMode = 'HORIZONTAL'; arDiv.primaryAxisSizingMode = 'FIXED'; arDiv.counterAxisSizingMode = 'FIXED'; fill(arDiv, C.border);
    arTableCard.appendChild(arDiv);
    arDiv.layoutSizingHorizontal = 'FILL';

    // Data rows
    var arRiskLabels = { ok: 'Al día', low: 'Bajo', medium: 'Medio', high: 'Alto', critical: 'Crítico' };
    var arRiskColors = { ok: C.primary, low: C.secondary, medium: C.warning, high: C.warning, critical: C.destructive };
    for (var ri = 0; ri < arBuckets.length; ri++) {
      var rb = arBuckets[ri];
      var rpct = arTotal > 0 ? ((rb.amount / arTotal) * 100).toFixed(1) : '0.0';
 var arRow = row(0); arRow.layoutMode = 'HORIZONTAL'; arRow.counterAxisAlignItems = 'CENTER';
      arRow.paddingLeft = arRow.paddingRight = 16; arRow.paddingTop = arRow.paddingBottom = 10;
      fill(arRow, ri % 2 === 0 ? C.card : C.muted);
      var arCells = [
        { text: rb.label, align: 'MIN', weight: 'Medium', color: C.fg },
        { text: String(rb.count), align: 'MAX', weight: 'Regular', color: C.mutedFg },
        { text: '$' + (rb.amount >= 1000 ? (rb.amount / 1000).toFixed(1) + 'B' : rb.amount + 'M'), align: 'MAX', weight: 'Medium', color: C.fg },
        { text: rpct + '%', align: 'MAX', weight: 'Regular', color: C.mutedFg },
        { text: arRiskLabels[rb.risk], align: 'MAX', weight: 'Medium', color: arRiskColors[rb.risk] },
      ];
      for (var ci = 0; ci < arCells.length; ci++) {
        var cDef = arCells[ci];
        var cell = figma.createFrame(); cell.layoutMode = 'HORIZONTAL';
        cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'AUTO';
        cell.resize(arColWidths[ci], 20); cell.primaryAxisAlignItems = cDef.align; noFill(cell);
        cell.appendChild(tx(cDef.text, cDef.weight, 12, cDef.color));
        arRow.appendChild(cell);
      }
      arTableCard.appendChild(arRow);
      arRow.layoutSizingHorizontal = 'FILL';
      if (ri < arBuckets.length - 1) {
 var arRowDiv = figma.createFrame(); arRowDiv.resize(860, 1); arRowDiv.layoutMode = 'HORIZONTAL'; arRowDiv.primaryAxisSizingMode = 'FIXED'; arRowDiv.counterAxisSizingMode = 'FIXED'; fill(arRowDiv, C.border);
        arTableCard.appendChild(arRowDiv);
        arRowDiv.layoutSizingHorizontal = 'FILL';
      }
    }

    // Total row
 var arTotalRow = row(0); arTotalRow.layoutMode = 'HORIZONTAL'; arTotalRow.counterAxisAlignItems = 'CENTER';
    arTotalRow.paddingLeft = arTotalRow.paddingRight = 16; arTotalRow.paddingTop = arTotalRow.paddingBottom = 10;
    fill(arTotalRow, C.muted);
    var arTotalCells = [
      { text: 'Total', w: arColWidths[0], align: 'MIN', weight: 'SemiBold', color: C.fg },
      { text: String(arBuckets.reduce(function(s,b){return s+b.count;},0)), w: arColWidths[1], align: 'MAX', weight: 'SemiBold', color: C.fg },
      { text: '$' + (arTotal >= 1000 ? (arTotal/1000).toFixed(1)+'B' : arTotal+'M'), w: arColWidths[2], align: 'MAX', weight: 'SemiBold', color: C.fg },
      { text: '100%', w: arColWidths[3], align: 'MAX', weight: 'SemiBold', color: C.fg },
      { text: '', w: arColWidths[4], align: 'MAX', weight: 'Regular', color: C.mutedFg },
    ];
    for (var ti = 0; ti < arTotalCells.length; ti++) {
      var tc = arTotalCells[ti];
      var tCell = figma.createFrame(); tCell.layoutMode = 'HORIZONTAL';
      tCell.primaryAxisSizingMode = 'FIXED'; tCell.counterAxisSizingMode = 'AUTO';
      tCell.resize(tc.w, 20); tCell.primaryAxisAlignItems = tc.align; noFill(tCell);
      tCell.appendChild(tx(tc.text, tc.weight, 12, tc.color));
      arTotalRow.appendChild(tCell);
    }
    arTableCard.appendChild(arTotalRow);
    arTotalRow.layoutSizingHorizontal = 'FILL';
    arWrap.appendChild(arTableCard);

    ptRoot.appendChild(arWrap);
    console.log('[OK] Pattern: AgingReport (5 KPI cards + summary table with 5 buckets + total row)');
  } catch (e) { console.error('[FAIL] Pattern AgingReport: ' + e.message); }

  // ── Pattern: FactoringStatusCards ───────────────────────────────────────
  try {
    var fscStatuses = [
      { label: 'Aprobado',     subtitle: 'Monto total', amount: '$12.4M', count: 8,  icon: 'check-circle', color: C.secondary },
      { label: 'Desembolsado', subtitle: 'Monto total', amount: '$34.1M', count: 23, icon: 'download',     color: C.primary },
      { label: 'En Cobro',     subtitle: 'Monto total', amount: '$8.7M',  count: 11, icon: 'refresh-cw',   color: C.warning },
      { label: 'Cobrado',      subtitle: 'Monto total', amount: '$51.2M', count: 47, icon: 'check',        color: C.success },
      { label: 'Vencido',      subtitle: 'Monto total', amount: '$3.9M',  count: 5,  icon: 'alert-circle', color: C.warning },
      { label: 'Rechazado',    subtitle: 'Monto total', amount: '$1.2M',  count: 3,  icon: 'x-circle',     color: C.destructive },
    ];
    var GRAY_BORDER = C.mutedFg;
    var GRAY_TITLE  = C.mutedFg; // inactive title color (React: text-gray-500)
    var CARD_W = 200;            // wider to match flex grid appearance

    function buildFscCard(status, active) {
      var card = figma.createFrame();
      card.name = 'FactoringStatusCard/' + status.label + (active ? '/Active' : '/Inactive');
      card.layoutMode = 'VERTICAL';
      card.primaryAxisSizingMode = 'AUTO';
      card.counterAxisSizingMode = 'FIXED';
      card.resize(CARD_W, 100);
      card.cornerRadius = 16;
      card.clipsContent = false;
      card.itemSpacing = 12;    // gap-3 = 12px
      card.paddingLeft = card.paddingRight = 20;
      card.paddingTop = card.paddingBottom = 16;
      fill(card, C.card);

      // Bottom-only border (4px) — strokeWeight must be set before individual weights
      var borderColor = active ? status.color : GRAY_BORDER;
      card.strokes = [{ type: 'SOLID', color: hx(borderColor) }];
      card.strokeWeight = 4;
      card.strokeBottomWeight = 4;
      card.strokeTopWeight = 0;
      card.strokeLeftWeight = 0;
      card.strokeRightWeight = 0;
      card.strokeAlign = 'INSIDE';

      // Shadow
      if (active) {
        card.effects = [
          { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.10 }, offset: { x: 0, y: 20 }, radius: 25, spread: -5, visible: true, blendMode: 'NORMAL' },
          { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.10 }, offset: { x: 0, y: 8  }, radius: 10, spread: -6, visible: true, blendMode: 'NORMAL' },
        ];
      } else {
        card.effects = [
          { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 1  }, radius: 3,  spread: 0,  visible: true, blendMode: 'NORMAL' },
        ];
      }

      // Title row — title fills, count pill pushed right via layoutGrow
 var fscHdr = row(8); fscHdr.layoutMode = 'HORIZONTAL';
      fscHdr.counterAxisAlignItems = 'CENTER';
      var titleColor = active ? status.color : GRAY_TITLE; // inactive = #6b7280
      var titleTx = tx(status.label, 'Bold', 16, titleColor); // text-base = 16px
      titleTx.layoutGrow = 1;
      fscHdr.appendChild(titleTx);

      // Count pill — h-6 = 24px, text-xs = 12px
      var fscPill = figma.createFrame();
      fscPill.name = 'CountBadge'; fscPill.layoutMode = 'HORIZONTAL';
      fscPill.resize(24, 24); fscPill.primaryAxisSizingMode = 'AUTO'; fscPill.counterAxisSizingMode = 'FIXED';
      fscPill.cornerRadius = 10;
      fscPill.paddingLeft = fscPill.paddingRight = 6;
      fscPill.paddingTop = fscPill.paddingBottom = 0;
      fscPill.primaryAxisAlignItems = 'CENTER'; fscPill.counterAxisAlignItems = 'CENTER';
      fill(fscPill, active ? status.color : GRAY_BORDER);
      fscPill.appendChild(tx(String(status.count), 'SemiBold', 12, C.primaryFg)); // text-xs = 12px
      fscHdr.appendChild(fscPill);
      card.appendChild(fscHdr);
      fscHdr.layoutSizingHorizontal = 'FILL';

      // Divider
      var fscDiv = figma.createFrame(); fscDiv.name = 'Divider';
 fscDiv.resize(CARD_W - 40, 1); fscDiv.layoutMode = 'HORIZONTAL';
      fill(fscDiv, C.border);
      card.appendChild(fscDiv);
      fscDiv.layoutSizingHorizontal = 'FILL';

      // Bottom row — left col grows, icon at end aligned to bottom
 var fscBottom = row(8); fscBottom.layoutMode = 'HORIZONTAL';
      fscBottom.counterAxisAlignItems = 'MAX';

      // Left col: subtitle (12px) + amount (24px)
      var fscLeft = col(4); fscLeft.layoutGrow = 1;
      fscLeft.appendChild(tx(status.subtitle, 'Regular', 12, C.mutedFg)); // text-xs = 12px
      fscLeft.appendChild(tx(status.amount, 'Regular', 24, C.mutedFg));   // text-2xl = 24px
      fscBottom.appendChild(fscLeft);

      // Icon — 32px (React: width:32 height:32)
      var fscIcon = iconInst(status.icon, active ? status.color : GRAY_BORDER, 32);
      fscBottom.appendChild(fscIcon);

      card.appendChild(fscBottom);
      fscBottom.layoutSizingHorizontal = 'FILL';
      return card;
    }

    // Wrapper
    var fscWrap = figma.createFrame();
    fscWrap.name = 'FactoringStatusCards'; fscWrap.layoutMode = 'VERTICAL'; fscWrap.itemSpacing = 24;
    fscWrap.primaryAxisSizingMode = 'AUTO'; fscWrap.counterAxisSizingMode = 'AUTO';
    fscWrap.paddingLeft = fscWrap.paddingRight = fscWrap.paddingTop = fscWrap.paddingBottom = 0;
    noFill(fscWrap);

    // Row label: Inactive
    fscWrap.appendChild(tx('Inactive State', 'Medium', 12, C.mutedFg));
    var fscRowInactive = row(12);
    for (var fi = 0; fi < fscStatuses.length; fi++) {
      fscRowInactive.appendChild(buildFscCard(fscStatuses[fi], false));
    }
    fscWrap.appendChild(fscRowInactive);

    // Row label: Active
    fscWrap.appendChild(tx('Active State', 'Medium', 12, C.mutedFg));
    var fscRowActive = row(12);
    for (var fi = 0; fi < fscStatuses.length; fi++) {
      fscRowActive.appendChild(buildFscCard(fscStatuses[fi], true));
    }
    fscWrap.appendChild(fscRowActive);

    ptRoot.appendChild(fscWrap);
    console.log('[OK] Pattern: FactoringStatusCards (6 statuses × 2 states = 12 cards: inactive + active with elevation-4)');
  } catch (e) { console.error('[FAIL] Pattern FactoringStatusCards: ' + e.message); }

  console.log('[DONE] Patterns (52 total on page 03 — inc. 11 factoring modules + 10 new DSM patterns + OperationStatusPipeline, RiskIndicator, SignaturePanel, AgingReport, FactoringStatusCards. MultiStepFormPattern covered by existing Multi-Step Form demo).');

  // ══════════════════════════════════════════════════════════════════════
  // PATTERNS SIZING FIX — Bottom-up pass to restore AUTO sizing
  // Root cause: resize(w, 1) in Figma API resets primaryAxisSizingMode and
  // counterAxisSizingMode to FIXED, leaving content frames squished at 1px.
  // This pass detects frames with children that are suspiciously small and
  // restores HUG (AUTO) on the axis that shouldn't be fixed.
  // ══════════════════════════════════════════════════════════════════════
  try {
    var _fixCount = 0;
    function _fixSquished(node) {
      // Fix children first (bottom-up so parents recalculate on top of correct children)
      if ('children' in node) {
        var _fkids = node.children.slice();
        for (var _fki = 0; _fki < _fkids.length; _fki++) _fixSquished(_fkids[_fki]);
      }
      if (!node.layoutMode || node.layoutMode === 'NONE') return;
      if (!('children' in node) || node.children.length === 0) return;
      // Only fix frames that are suspiciously small (≤ 4px) — separators are 1px but have NO children
      if (node.height > 4) return;
      try {
        if (node.layoutMode === 'HORIZONTAL' && node.counterAxisSizingMode === 'FIXED') {
          // HORIZONTAL frame: counterAxis = HEIGHT — restore HUG
          node.counterAxisSizingMode = 'AUTO';
          _fixCount++;
        } else if (node.layoutMode === 'VERTICAL' && node.primaryAxisSizingMode === 'FIXED') {
          // VERTICAL frame: primaryAxis = HEIGHT — restore HUG
          node.primaryAxisSizingMode = 'AUTO';
          _fixCount++;
        }
      } catch (e) {}
    }
    _fixSquished(ptRoot);
    if (_fixCount > 0) console.log('[FIX] Restored AUTO sizing on ' + _fixCount + ' squished frame(s) in Patterns');
  } catch (e) { console.error('[FIX FAIL] Pattern sizing: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 5: BUSINESS
  // ═════════════════════════════════��════════════════════════════════════
  try {
    console.log('Building Business...');
    var fTitle = tx('ADVANCED', 'Bold', 48, C.fg);
    p5.appendChild(fTitle); fTitle.x = 60; fTitle.y = 60;
    var fSub = tx('Advanced & Business components — CESIONBNK', 'Regular', 16, C.mutedFg);
    p5.appendChild(fSub); fSub.x = 60; fSub.y = 120;
    var y5 = 160;
    gridInit(p5, 160);

    gridSection('Business Components');

  // ── FactoringStatusCard (6 statuses × 2 states = 12 variants) ──
  try {
    var fscComps = [];
    var fscData = [
      { status: 'Aprobado',     icon: 'check-circle', color: C.secondary },
      { status: 'Desembolsado', icon: 'download',     color: C.primary },
      { status: 'En Cobro',     icon: 'refresh-cw',   color: C.warning },
      { status: 'Cobrado',      icon: 'check',        color: C.success },
      { status: 'Vencido',      icon: 'alert-circle', color: C.warning },
      { status: 'Rechazado',    icon: 'x-circle',     color: C.destructive },
    ];
    var fscStates = ['Inactive', 'Active'];
    var FSC_W = 200;
    var FSC_GRAY_BORDER = C.mutedFg;
    var FSC_GRAY_TITLE  = C.mutedFg;

    for (var fdi = 0; fdi < fscData.length; fdi++) {
      var fd = fscData[fdi];
      for (var fsi = 0; fsi < fscStates.length; fsi++) {
        var active = fscStates[fsi] === 'Active';
        var fsc = figma.createComponent();
        fsc.name = 'Status=' + fd.status + ', State=' + fscStates[fsi];
        fsc.layoutMode = 'VERTICAL';
        fsc.primaryAxisSizingMode = 'AUTO';
        fsc.counterAxisSizingMode = 'FIXED';
        fsc.resize(FSC_W, 100);
        fsc.cornerRadius = 16;
        fsc.clipsContent = false;
        fsc.itemSpacing = 12;
        fsc.paddingLeft = fsc.paddingRight = 20;
        fsc.paddingTop = fsc.paddingBottom = 16;
        fill(fsc, C.card);

        // Bottom-only border
        var fscBorderColor = active ? fd.color : FSC_GRAY_BORDER;
        fsc.strokes = [{ type: 'SOLID', color: hx(fscBorderColor) }];
        fsc.strokeWeight = 4;
        fsc.strokeBottomWeight = 4;
        fsc.strokeTopWeight = 0;
        fsc.strokeLeftWeight = 0;
        fsc.strokeRightWeight = 0;
        fsc.strokeAlign = 'INSIDE';

        // Shadow
        fsc.effects = active
          ? [{ type: 'DROP_SHADOW', color: { r:0,g:0,b:0,a:0.10 }, offset:{x:0,y:20}, radius:25, spread:-5, visible:true, blendMode:'NORMAL' },
             { type: 'DROP_SHADOW', color: { r:0,g:0,b:0,a:0.10 }, offset:{x:0,y:8 }, radius:10, spread:-6, visible:true, blendMode:'NORMAL' }]
          : [{ type: 'DROP_SHADOW', color: { r:0,g:0,b:0,a:0.05 }, offset:{x:0,y:1 }, radius:3,  spread:0,  visible:true, blendMode:'NORMAL' }];

        // Header row: title + count pill
        var fscHdr = row(8);

        fscHdr.counterAxisAlignItems = 'CENTER';
        var fscTitleColor = active ? fd.color : FSC_GRAY_TITLE;
        var fscTitle = tx(fd.status, 'Bold', 14, fscTitleColor);
        fscTitle.layoutGrow = 1;
        fscHdr.appendChild(fscTitle);
        var fscPill = figma.createFrame();
        fscPill.layoutMode = 'HORIZONTAL';
        fscPill.primaryAxisSizingMode = 'AUTO';
        fscPill.counterAxisSizingMode = 'FIXED';
        fscPill.resize(28, 20);
        fscPill.cornerRadius = 10;
        fscPill.paddingLeft = fscPill.paddingRight = 6;
        fscPill.paddingTop = fscPill.paddingBottom = 0;
        fscPill.primaryAxisAlignItems = 'CENTER';
        fscPill.counterAxisAlignItems = 'CENTER';
        fill(fscPill, active ? fd.color : FSC_GRAY_BORDER);
        fscPill.appendChild(tx('8', 'SemiBold', 11, C.primaryFg));
        fscHdr.appendChild(fscPill);
        fsc.appendChild(fscHdr);
        fscHdr.layoutSizingHorizontal = 'FILL';

        // Divider
        var fscDiv = figma.createFrame();
        fscDiv.layoutMode = 'HORIZONTAL';

        fscDiv.resize(FSC_W - 40, 1);
        fill(fscDiv, C.border);
        fsc.appendChild(fscDiv);
        fscDiv.layoutSizingHorizontal = 'FILL';

        // Bottom row: amount (left, grows), icon (right, bottom-aligned)
        var fscBot = row(8);

        fscBot.counterAxisAlignItems = 'MAX';
        var fscLeft = col(4);
        fscLeft.layoutGrow = 1;
        fscLeft.appendChild(tx('Monto total', 'Regular', 11, C.mutedFg));
        fscLeft.appendChild(tx('$12.4M', 'SemiBold', 20, C.fg));
        fscBot.appendChild(fscLeft);
        var fscIco = iconInst(fd.icon, active ? fd.color : FSC_GRAY_BORDER, 28);
        fscBot.appendChild(fscIco);
        fsc.appendChild(fscBot);
        fscBot.layoutSizingHorizontal = 'FILL';

        fscComps.push(fsc);
      }
    }
    y5 = makeSet('FactoringStatusCard', fscComps, p5, 60, y5);
    console.log('[OK] FactoringStatusCard (' + fscComps.length + ' variants: 6 statuses × 2 states)');
  } catch (e) { console.error('[FAIL] FactoringStatusCard: ' + e.message); y5 += 60; }

    var kpis = [];
    var kpiC = [
      ['blue',     C.info, C.infoSubtle],
      ['yellow',   '#eab308', C.warningSubtle],
      ['green',    C.success, C.successSubtle],
      ['orange',   C.warning, C.warningSubtle],
      ['darkgray', C.primary, C.muted],
      ['purple',   C.secondary, C.secondarySubtle],
      ['lime',     '#84cc16', '#f7fee7']
    ];
    var kpiS = ['Default', 'Active'];
    for (var i = 0; i < kpiC.length; i++) {
      for (var j = 0; j < kpiS.length; j++) {
        var kpi = figma.createComponent();
        kpi.name = 'Color=' + kpiC[i][0] + ', State=' + kpiS[j];
        kpi.layoutMode = 'VERTICAL'; kpi.resize(260, 150);
        kpi.primaryAxisSizingMode = 'FIXED'; kpi.counterAxisSizingMode = 'FIXED';
        kpi.paddingLeft = kpi.paddingRight = 20; kpi.paddingTop = 20; kpi.paddingBottom = 16; kpi.itemSpacing = 8;
        fill(kpi, C.card); kpi.cornerRadius = RAD;
        // Left border accent
        kpi.strokes = [{ type: 'SOLID', color: hx(kpiC[i][1]) }];
        kpi.strokeWeight = 3; kpi.strokeAlign = 'INSIDE';
        if (kpiS[j] === 'Active') shadow(kpi, 4, 12, 0.12);

 var kH = row(8); kH.counterAxisAlignItems = 'CENTER'; kH.layoutMode = 'HORIZONTAL';
        kH.appendChild(tx('KPI Label', 'Medium', 12, C.mutedFg));
        var kB = row(0); kB.paddingLeft = kB.paddingRight = 6; kB.paddingTop = kB.paddingBottom = 2;
        kB.primaryAxisAlignItems = 'CENTER'; kB.counterAxisAlignItems = 'CENTER';
        fill(kB, kpiC[i][1]); kB.cornerRadius = 10;
        kB.appendChild(tx('12', 'Bold', 11, C.primaryFg));
        kH.appendChild(kB); kpi.appendChild(kH);
        kH.layoutSizingHorizontal = 'FILL';
        kpi.appendChild(tx('$1,234,567', 'Bold', 24, C.cardFg));
 var kTrend = row(4); kTrend.counterAxisAlignItems = 'CENTER'; kTrend.layoutMode = 'HORIZONTAL';
        kTrend.appendChild(iconInst('arrow-up', C.success, 12));
        kTrend.appendChild(tx('+8.2% vs last month', 'Regular', 12, C.mutedFg));
        kpi.appendChild(kTrend);
        kTrend.layoutSizingHorizontal = 'FILL';
        kpis.push(kpi);
      }
    }
    y5 = makeSet('BusinessKpiCard', kpis, p5, 60, y5);
    console.log('[OK] BusinessKpiCard');
  } catch (e) { console.error('[FAIL] BusinessKpiCard: ' + e.message); y5 += 60; }

  // ── BusinessInvoiceRow (3 status × 2 states = 6 variants) ──
  try {
    var invRows = [];
    var invStatuses = ['pending', 'approved', 'rejected'];
    var invStatusColors = {
      'pending':  { bg: C.warningSubtle, fg: C.warningOnSubtle, border: C.warningOnSubtle },
      'approved': { bg: C.successSubtle, fg: C.successOnSubtle, border: C.successOnSubtle },
      'rejected': { bg: C.destructiveSubtle, fg: C.destructive, border: C.destructiveOnSubtle }
    };
    var invStatusLabels = { 'pending': 'Pending', 'approved': 'Approved', 'rejected': 'Rejected' };
    var invRowStates = ['Default', 'Selected'];
    for (var iri = 0; iri < invStatuses.length; iri++) {
      for (var irsi = 0; irsi < invRowStates.length; irsi++) {
        var ir = figma.createComponent();
        ir.name = 'Status=' + invStatuses[iri] + ', State=' + invRowStates[irsi];
        ir.layoutMode = 'HORIZONTAL'; ir.resize(720, 56);
        ir.primaryAxisSizingMode = 'FIXED'; ir.counterAxisSizingMode = 'FIXED';
        ir.paddingLeft = ir.paddingRight = 16; ir.counterAxisAlignItems = 'CENTER'; ir.itemSpacing = 16;
        if (invRowStates[irsi] === 'Selected') fill(ir, C.accent); else fill(ir, C.card);
        stroke(ir, C.border); ir.strokesIncludedInLayout = true;
        // Checkbox
        var irCb = figma.createFrame(); irCb.resize(16, 16); irCb.cornerRadius = 4;
        if (invRowStates[irsi] === 'Selected') { fill(irCb, C.primary); irCb.layoutMode = 'HORIZONTAL'; irCb.primaryAxisSizingMode = 'FIXED'; irCb.counterAxisSizingMode = 'FIXED'; irCb.primaryAxisAlignItems = 'CENTER'; irCb.counterAxisAlignItems = 'CENTER'; irCb.appendChild(tx('✓', 'Bold', 10, C.primaryFg)); }
        else { fill(irCb, C.bg); stroke(irCb, C.input); }
        ir.appendChild(irCb);
        // Invoice number (fixed width, height auto)
        var irNum = figma.createFrame();
        irNum.name = 'InvoiceNum'; irNum.layoutMode = 'HORIZONTAL'; irNum.resize(120, 20);
        irNum.primaryAxisSizingMode = 'FIXED'; irNum.counterAxisSizingMode = 'AUTO';
        noFill(irNum); irNum.appendChild(tx('INV-2026-00' + (iri + 1), 'Medium', 13, C.fg));
        ir.appendChild(irNum);
        // Client name (fills remaining space)
        var irClient = figma.createFrame();
        irClient.name = 'Client'; irClient.layoutMode = 'HORIZONTAL';
        irClient.primaryAxisSizingMode = 'AUTO'; irClient.counterAxisSizingMode = 'AUTO';
        noFill(irClient);
        irClient.appendChild(tx('Empresa ABC S.A.S.', 'Regular', 13, C.fg));
        ir.appendChild(irClient); irClient.layoutGrow = 1;
        // Amount
        ir.appendChild(tx('$45,230,000', 'Medium', 13, C.fg));
        // Status badge
        var irBadge = row(0); irBadge.paddingLeft = irBadge.paddingRight = 8; irBadge.paddingTop = irBadge.paddingBottom = 2;
        irBadge.primaryAxisAlignItems = 'CENTER'; irBadge.counterAxisAlignItems = 'CENTER'; irBadge.cornerRadius = 6;
        var irSoft = invStatusColors[invStatuses[iri]];
        fill(irBadge, irSoft.bg); stroke(irBadge, irSoft.border);
        irBadge.appendChild(tx(invStatusLabels[invStatuses[iri]], 'Medium', 11, irSoft.fg));
        ir.appendChild(irBadge);
        // Actions
        ir.appendChild(iconInst('more-horizontal', C.mutedFg, 16));
        invRows.push(ir);
      }
    }
    y5 = makeSet('BusinessInvoiceRow', invRows, p5, 60, y5);
    console.log('[OK] BusinessInvoiceRow (' + invRows.length + ' variants)');
  } catch (e) { console.error('[FAIL] BusinessInvoiceRow: ' + e.message); y5 += 60; }

  // ── BusinessStatusBadge (6 operation statuses) ──
  try {
    var fsBadges = [];
    var fsAll = [
      ['in-review',     'In Review',     C.info, C.infoSubtle],
      ['approved',      'Approved',      C.success, C.successSubtle],
      ['disbursed',     'Disbursed',     C.secondaryOnSubtle, C.secondarySubtle],
      ['overdue',       'Overdue',       C.destructive, C.destructiveSubtle],
      ['paid',          'Paid',          C.primary, C.muted],
      ['rejected',      'Rejected',      C.warning, C.warningSubtle]
    ];
    for (var fsi = 0; fsi < fsAll.length; fsi++) {
      var fsb = figma.createComponent();
      fsb.name = 'Status=' + fsAll[fsi][0];
      fsb.layoutMode = 'HORIZONTAL'; fsb.primaryAxisSizingMode = 'AUTO'; fsb.counterAxisSizingMode = 'AUTO';
      fsb.paddingLeft = fsb.paddingRight = 10; fsb.paddingTop = fsb.paddingBottom = 4;
      fsb.primaryAxisAlignItems = 'CENTER'; fsb.counterAxisAlignItems = 'CENTER';
      fsb.itemSpacing = 6; fsb.cornerRadius = 6;
      fill(fsb, fsAll[fsi][3]);
      // Dot indicator
      var fsDot = figma.createFrame(); fsDot.resize(6, 6); fsDot.cornerRadius = 3; fill(fsDot, fsAll[fsi][2]);
      fsb.appendChild(fsDot);
      fsb.appendChild(tx(fsAll[fsi][1], 'Medium', 12, fsAll[fsi][2]));
      fsBadges.push(fsb);
    }
    y5 = makeSet('BusinessStatusBadge', fsBadges, p5, 60, y5);
    console.log('[OK] BusinessStatusBadge (' + fsBadges.length + ' variants)');
  } catch (e) { console.error('[FAIL] BusinessStatusBadge: ' + e.message); y5 += 60; }

  // ── BusinessClientCard (2 variants: compact, expanded) ──
  try {
    var fcCards = [];
    var fcTypes = ['compact', 'expanded'];
    for (var fci = 0; fci < fcTypes.length; fci++) {
      var fcc = figma.createComponent();
      fcc.name = 'Type=' + fcTypes[fci];
      fcc.layoutMode = 'VERTICAL'; fcc.counterAxisSizingMode = 'FIXED';
      fcc.resize(320, 1); fcc.primaryAxisSizingMode = 'AUTO'; fcc.paddingLeft = fcc.paddingRight = 20; fcc.paddingTop = fcc.paddingBottom = 16;
      fcc.itemSpacing = 12; fill(fcc, C.card); fcc.cornerRadius = RAD; stroke(fcc, C.border);
      // Header: avatar + name
 var fccHead = row(12); fccHead.counterAxisAlignItems = 'CENTER'; fccHead.layoutMode = 'HORIZONTAL';
      var fccAv = figma.createFrame(); fccAv.resize(40, 40); fccAv.cornerRadius = 20; fill(fccAv, C.primary);
      fccAv.layoutMode = 'HORIZONTAL'; fccAv.primaryAxisAlignItems = 'CENTER'; fccAv.counterAxisAlignItems = 'CENTER';
      fccAv.primaryAxisSizingMode = 'FIXED'; fccAv.counterAxisSizingMode = 'FIXED';
      fccAv.appendChild(tx('EA', 'Bold', 14, C.primaryFg));
      fccHead.appendChild(fccAv);
      fccAv.layoutSizingHorizontal = 'FIXED'; fccAv.layoutSizingVertical = 'FIXED';
      var fccInfo = col(2);
      fccInfo.appendChild(tx('Empresa ABC S.A.S.', 'Bold', 14, C.cardFg));
      fccInfo.appendChild(tx('NIT: 900.123.456-7', 'Regular', 12, C.mutedFg));
      fccHead.appendChild(fccInfo); fccInfo.layoutGrow = 1;
      fcc.appendChild(fccHead);
      fccHead.layoutSizingHorizontal = 'FILL';
      if (fcTypes[fci] === 'expanded') {
        // Separator
        var fccSep = figma.createFrame(); fccSep.name = 'Separator';
        fccSep.resize(1, 1); fill(fccSep, C.border);
 fccSep.layoutMode = 'HORIZONTAL'; fccSep.layoutSizingVertical = 'FIXED'; fccSep.layoutGrow = 0;
        fcc.appendChild(fccSep);
        fccSep.layoutSizingHorizontal = 'FILL';
        // Detail rows (each stretches to parent width)
        var fccDetails = [
          ['Cupo aprobado', '$500,000,000'],
          ['Cupo disponible', '$234,567,890'],
          ['Operaciones activas', '12'],
          ['Tasa promedio', '1.8% MV']
        ];
        for (var fdi = 0; fdi < fccDetails.length; fdi++) {
          var fdRow = figma.createFrame(); fdRow.name = fccDetails[fdi][0];
 fdRow.layoutMode = 'HORIZONTAL';
          fdRow.counterAxisSizingMode = 'AUTO';
          fdRow.primaryAxisAlignItems = 'SPACE_BETWEEN'; fdRow.counterAxisAlignItems = 'CENTER';
          noFill(fdRow);
          fdRow.appendChild(tx(fccDetails[fdi][0], 'Regular', 12, C.mutedFg));
          fdRow.appendChild(tx(fccDetails[fdi][1], 'Medium', 12, C.cardFg));
          fcc.appendChild(fdRow);
          fdRow.layoutSizingHorizontal = 'FILL';
        }
      }
      fcCards.push(fcc);
    }
    y5 = makeSet('BusinessClientCard', fcCards, p5, 60, y5);
    console.log('[OK] BusinessClientCard (' + fcCards.length + ' variants)');
  } catch (e) { console.error('[FAIL] BusinessClientCard: ' + e.message); y5 += 60; }

  gridSection('Data Visualization');
  // ── BusinessSidebarNav (4 variants: default, active, collapsed, collapsed-active) ──
  try {
    var fsnItems = [];
    var fsnStates = [
      ['default', false, false],
      ['active', true, false],
      ['collapsed', false, true],
      ['collapsed-active', true, true]
    ];
    var fsnLinks = [
      ['home', 'Dashboard'],
      ['file-text', 'Operaciones'],
      ['users', 'Clientes'],
      ['settings', 'Configuración']
    ];
    for (var fnsi = 0; fnsi < fsnStates.length; fnsi++) {
      var fsnState = fsnStates[fnsi];
      var fsn = figma.createComponent();
      fsn.name = 'State=' + fsnState[0];
      fsn.layoutMode = 'VERTICAL'; fsn.counterAxisSizingMode = 'FIXED';
      fsn.resize(fsnState[2] ? 56 : 240, 1); fsn.primaryAxisSizingMode = 'AUTO'; fsn.itemSpacing = 2;
      fsn.paddingLeft = fsn.paddingRight = 8; fsn.paddingTop = fsn.paddingBottom = 8;
      noFill(fsn);
      for (var fli = 0; fli < fsnLinks.length; fli++) {
        var isActive = fsnState[1] && fli === 0;
        var flRow = row(fsnState[2] ? 0 : 12);
 flRow.counterAxisAlignItems = 'CENTER'; flRow.layoutMode = 'HORIZONTAL';
        flRow.paddingLeft = flRow.paddingRight = fsnState[2] ? 8 : 12;
        flRow.paddingTop = flRow.paddingBottom = 10;
        flRow.cornerRadius = 8;
        if (fsnState[2]) { flRow.primaryAxisAlignItems = 'CENTER'; flRow.counterAxisAlignItems = 'CENTER'; }
        if (isActive) fill(flRow, C.accent); else noFill(flRow);
        flRow.appendChild(iconInst(fsnLinks[fli][0], isActive ? C.primary : C.mutedFg, 18));
        if (!fsnState[2]) {
          flRow.appendChild(tx(fsnLinks[fli][1], isActive ? 'Medium' : 'Regular', 14, isActive ? C.primary : C.fg));
        }
        fsn.appendChild(flRow);
        flRow.layoutSizingHorizontal = 'FILL';
      }
      fsnItems.push(fsn);
    }
    y5 = makeSet('BusinessSidebarNav', fsnItems, p5, 60, y5);
    console.log('[OK] BusinessSidebarNav (' + fsnItems.length + ' variants)');
  } catch (e) { console.error('[FAIL] BusinessSidebarNav: ' + e.message); y5 += 60; }

  // ── BusinessOperationSummary (2 variants: compact, full) ──
  try {
    var fosCards = [];
    var fosTypes = ['compact', 'full'];
    for (var fosi = 0; fosi < fosTypes.length; fosi++) {
      var fos = figma.createComponent();
      fos.name = 'Type=' + fosTypes[fosi];
      fos.layoutMode = 'VERTICAL'; fos.counterAxisSizingMode = 'FIXED';
      fos.resize(360, 1); fos.primaryAxisSizingMode = 'AUTO'; fos.paddingLeft = fos.paddingRight = 20; fos.paddingTop = fos.paddingBottom = 16;
      fos.itemSpacing = 12; fill(fos, C.card); fos.cornerRadius = RAD; stroke(fos, C.border);
      // Header (stretches to parent width)
      var fosHead = figma.createFrame(); fosHead.name = 'Header';
 fosHead.layoutMode = 'HORIZONTAL';
      fosHead.counterAxisSizingMode = 'AUTO';
      fosHead.primaryAxisAlignItems = 'SPACE_BETWEEN'; fosHead.counterAxisAlignItems = 'CENTER';
      noFill(fosHead);
      var fosTitle = col(2);
      fosTitle.appendChild(tx('OP-2026-0042', 'Bold', 16, C.cardFg));
      fosTitle.appendChild(tx('Empresa ABC S.A.S.', 'Regular', 12, C.mutedFg));
      fosHead.appendChild(fosTitle);
      // Status badge inline
      var fosBadge = row(0); fosBadge.paddingLeft = fosBadge.paddingRight = 8; fosBadge.paddingTop = fosBadge.paddingBottom = 4;
      fosBadge.cornerRadius = 6; fill(fosBadge, C.infoSubtle); fosBadge.primaryAxisAlignItems = 'CENTER'; fosBadge.counterAxisAlignItems = 'CENTER';
      fosBadge.appendChild(tx('En estudio', 'Medium', 11, C.info));
      fosHead.appendChild(fosBadge);
      fos.appendChild(fosHead);
      fosHead.layoutSizingHorizontal = 'FILL';
      // Separator
      var fosSep = figma.createFrame(); fosSep.name = 'Separator';
 fosSep.resize(1, 1); fill(fosSep, C.border); fosSep.layoutMode = 'HORIZONTAL'; fosSep.layoutSizingVertical = 'FIXED'; fosSep.layoutGrow = 0;
      fos.appendChild(fosSep);
      fosSep.layoutSizingHorizontal = 'FILL';
      // Summary grid (2 cols, wrap layout)
      var fosGrid = figma.createFrame();
      fosGrid.name = 'SummaryGrid'; fosGrid.layoutMode = 'HORIZONTAL';
      fosGrid.layoutWrap = 'WRAP'; fosGrid.itemSpacing = 16; fosGrid.counterAxisSpacing = 12;
 fosGrid.layoutMode = 'HORIZONTAL';
      fosGrid.counterAxisSizingMode = 'AUTO';
      noFill(fosGrid);
      var fosItems = [
        ['Facturas', '8'],
        ['Valor nominal', '$125,400,000'],
        ['Valor a girar', '$120,200,000'],
        ['Tasa', '1.65% MV']
      ];
      for (var fgi = 0; fgi < fosItems.length; fgi++) {
        var fosItem = col(2); fosItem.resize(148, 1); fosItem.primaryAxisSizingMode = 'AUTO'; fosItem.counterAxisSizingMode = 'FIXED';
        fosItem.appendChild(tx(fosItems[fgi][0], 'Regular', 11, C.mutedFg));
        fosItem.appendChild(tx(fosItems[fgi][1], 'Bold', 14, C.cardFg));
        fosGrid.appendChild(fosItem);
      }
      fos.appendChild(fosGrid);
      fosGrid.layoutSizingHorizontal = 'FILL';
      if (fosTypes[fosi] === 'full') {
        // Action buttons row
        var fosActions = figma.createFrame(); fosActions.name = 'Actions';
        fosActions.layoutMode = 'HORIZONTAL'; fosActions.itemSpacing = 8;
 fosActions.layoutMode = 'HORIZONTAL';
        fosActions.counterAxisSizingMode = 'AUTO'; fosActions.primaryAxisAlignItems = 'MAX';
        noFill(fosActions);
        var fosBtn1 = row(6); fosBtn1.paddingLeft = fosBtn1.paddingRight = 16; fosBtn1.paddingTop = fosBtn1.paddingBottom = 8;
        fosBtn1.cornerRadius = RAD; stroke(fosBtn1, C.border); noFill(fosBtn1);
        fosBtn1.primaryAxisAlignItems = 'CENTER'; fosBtn1.counterAxisAlignItems = 'CENTER';
        fosBtn1.appendChild(tx('Rechazar', 'Medium', 13, C.fg));
        fosActions.appendChild(fosBtn1);
        var fosBtn2 = row(6); fosBtn2.paddingLeft = fosBtn2.paddingRight = 16; fosBtn2.paddingTop = fosBtn2.paddingBottom = 8;
        fosBtn2.cornerRadius = RAD; fill(fosBtn2, C.primary);
        fosBtn2.primaryAxisAlignItems = 'CENTER'; fosBtn2.counterAxisAlignItems = 'CENTER';
        fosBtn2.appendChild(iconInst('check', C.primaryFg, 14));
        fosBtn2.appendChild(tx('Aprobar', 'Medium', 13, C.primaryFg));
        fosActions.appendChild(fosBtn2);
        fos.appendChild(fosActions);
        fosActions.layoutSizingHorizontal = 'FILL';
      }
      fosCards.push(fos);
    }
    y5 = makeSet('BusinessOperationSummary', fosCards, p5, 60, y5);
    console.log('[OK] BusinessOperationSummary (' + fosCards.length + ' variants)');
  } catch (e) { console.error('[FAIL] BusinessOperationSummary: ' + e.message); y5 += 60; }

  // ── ChartBar (4 color variants × 2 sizes = 8) ──
  try {
    var chartBars = [];
    var chartColors = [['primary', C.primary], ['secondary', C.secondary], ['success', C.success], ['muted', C.muted]];
    var chartSizes = [['sm', 120, 60], ['default', 200, 120]];
    for (var cbi = 0; cbi < chartColors.length; cbi++) {
      for (var csi = 0; csi < chartSizes.length; csi++) {
        var cb = figma.createComponent();
        cb.name = 'Color=' + chartColors[cbi][0] + ', Size=' + chartSizes[csi][0];
        cb.layoutMode = 'VERTICAL'; cb.primaryAxisSizingMode = 'AUTO'; cb.counterAxisSizingMode = 'AUTO';
        cb.itemSpacing = 8; noFill(cb);
        var cbChart = figma.createFrame();
        cbChart.resize(chartSizes[csi][1], chartSizes[csi][2]);
        cbChart.primaryAxisSizingMode = 'FIXED'; cbChart.counterAxisSizingMode = 'FIXED';
        cbChart.layoutMode = 'HORIZONTAL'; cbChart.counterAxisAlignItems = 'MAX'; cbChart.itemSpacing = 4;
        cbChart.paddingBottom = 0; noFill(cbChart);
        var barHeights = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8];
        var barW = Math.floor((chartSizes[csi][1] - 20) / barHeights.length);
        for (var bhi = 0; bhi < barHeights.length; bhi++) {
          var cbBar = figma.createFrame();
          cbBar.resize(barW - 4, Math.round(chartSizes[csi][2] * barHeights[bhi]));
          fill(cbBar, bhi === 3 ? chartColors[cbi][1] : C.muted);
          cbBar.fills = [{ type: 'SOLID', color: hx(bhi === 3 ? chartColors[cbi][1] : chartColors[cbi][1]), opacity: bhi === 3 ? 1 : 0.25 + bhi * 0.1 }];
          cbBar.cornerRadius = 4; cbChart.appendChild(cbBar);
        }
        cb.appendChild(cbChart);
        cb.appendChild(tx('Bar Chart', 'Medium', 12, C.mutedFg));
        chartBars.push(cb);
      }
    }
    y5 = makeSet('ChartBar', chartBars, p5, 60, y5);
    console.log('[OK] ChartBar');
  } catch (e) { console.error('[FAIL] ChartBar: ' + e.message); y5 += 60; }

  // ── ChartLine (3 variants) — native shapes, no SVG ──
  try {
    var chartLines = [];
    var lineColors = [['primary', C.primary], ['success', C.success], ['secondary', C.secondary]];
    // Data: [Jan=45, Feb=52, Mar=61, Apr=58, May=70, Jun=65] normalized to 90px height with 5px top pad
    var clPts = [{x:10,y:80},{x:46,y:62},{x:82,y:41},{x:118,y:50},{x:154,y:18},{x:190,y:30}];
    var clLabels = ['Jan','Feb','Mar','Apr','May','Jun'];
    for (var cli = 0; cli < lineColors.length; cli++) {
      var cl = figma.createComponent();
      cl.name = 'Color=' + lineColors[cli][0];
      cl.layoutMode = 'VERTICAL'; cl.primaryAxisSizingMode = 'AUTO'; cl.counterAxisSizingMode = 'FIXED';
      cl.resize(220, 1); cl.itemSpacing = 4; noFill(cl);
      // Plot area (absolute positioned children)
      var clChart = figma.createFrame(); clChart.resize(200, 100);
      fill(clChart, C.bg); stroke(clChart, C.border); clChart.cornerRadius = 8;
      clChart.layoutMode = 'HORIZONTAL'; clChart.primaryAxisSizingMode = 'FIXED'; clChart.counterAxisSizingMode = 'FIXED';
      // Horizontal grid lines (3)
      for (var clg = 1; clg < 4; clg++) {
        var clGrid = figma.createFrame(); clGrid.resize(200, 1);
        fill(clGrid, C.border); clGrid.opacity = 0.5;
        clChart.appendChild(clGrid);
        clGrid.layoutPositioning = 'ABSOLUTE'; clGrid.x = 0; clGrid.y = clg * 25;
      }
      // Area fill (columns, faded)
      for (var clf = 0; clf < clPts.length; clf++) {
        var clFill = figma.createFrame(); var clFH = 100 - clPts[clf].y;
        clFill.resize(Math.floor(180 / clPts.length), clFH);
        fill(clFill, lineColors[cli][1]); clFill.opacity = 0.08;
        clChart.appendChild(clFill);
        clFill.layoutPositioning = 'ABSOLUTE'; clFill.x = clPts[clf].x - 5; clFill.y = clPts[clf].y;
      }
      // Line segments between points
      for (var clp = 0; clp < clPts.length - 1; clp++) {
        var clPa = clPts[clp], clPb = clPts[clp + 1];
        var dx = clPb.x - clPa.x, dy = clPb.y - clPa.y;
        var len = Math.round(Math.sqrt(dx * dx + dy * dy));
        var ang = Math.atan2(dy, dx) * 180 / Math.PI;
        var cx = (clPa.x + clPb.x) / 2, cy = (clPa.y + clPb.y) / 2;
        var clSeg = figma.createFrame(); clSeg.resize(Math.max(len, 1), 2); clSeg.cornerRadius = 1;
        fill(clSeg, lineColors[cli][1]);
        clChart.appendChild(clSeg);
        clSeg.layoutPositioning = 'ABSOLUTE';
        clSeg.x = Math.round(cx - len / 2); clSeg.y = Math.round(cy - 1);
        clSeg.rotation = ang;
      }
      // Dots at each data point
      for (var cld = 0; cld < clPts.length; cld++) {
        var clDot = figma.createFrame(); clDot.resize(6, 6); clDot.cornerRadius = 3;
        fill(clDot, lineColors[cli][1]);
        clChart.appendChild(clDot);
        clDot.layoutPositioning = 'ABSOLUTE'; clDot.x = clPts[cld].x - 3; clDot.y = clPts[cld].y - 3;
      }
      cl.appendChild(clChart);
      // X-axis labels row
 var clXRow = row(0); clXRow.resize(200, 1); clXRow.layoutMode = 'HORIZONTAL'; noFill(clXRow);
      for (var clx = 0; clx < clLabels.length; clx++) {
        var clXL = figma.createFrame(); clXL.resize(Math.floor(200 / 6), 14);
        clXL.layoutMode = 'HORIZONTAL'; clXL.primaryAxisAlignItems = 'CENTER'; noFill(clXL);
        clXL.appendChild(tx(clLabels[clx], 'Regular', 9, C.mutedFg)); clXRow.appendChild(clXL);
      }
      cl.appendChild(clXRow);
      clXRow.layoutSizingHorizontal = 'FILL';
      cl.appendChild(tx('Line Chart', 'Medium', 12, C.mutedFg));
      chartLines.push(cl);
    }
    y5 = makeSet('ChartLine', chartLines, p5, 60, y5);
    console.log('[OK] ChartLine');
  } catch (e) { console.error('[FAIL] ChartLine: ' + e.message); y5 += 60; }

  // ── ChartDonut (3 variants) ──
  try {
    var chartDonuts = [];
    var donutColors = [['primary', C.primary], ['secondary', C.secondary], ['success', C.success]];
    for (var dci = 0; dci < donutColors.length; dci++) {
      var dc = figma.createComponent();
      dc.name = 'Color=' + donutColors[dci][0];
      dc.layoutMode = 'VERTICAL'; dc.primaryAxisSizingMode = 'AUTO'; dc.counterAxisSizingMode = 'AUTO';
      dc.itemSpacing = 8; dc.counterAxisAlignItems = 'CENTER'; noFill(dc);
      var dcOuter = row(0); dcOuter.resize(100, 100); dcOuter.primaryAxisAlignItems = 'CENTER'; dcOuter.counterAxisAlignItems = 'CENTER';
      dcOuter.primaryAxisSizingMode = 'FIXED'; dcOuter.counterAxisSizingMode = 'FIXED';
      dcOuter.cornerRadius = 50; fill(dcOuter, donutColors[dci][1]);
      var dcInner = row(0); dcInner.resize(60, 60); dcInner.primaryAxisAlignItems = 'CENTER'; dcInner.counterAxisAlignItems = 'CENTER';
      dcInner.primaryAxisSizingMode = 'FIXED'; dcInner.counterAxisSizingMode = 'FIXED';
      dcInner.cornerRadius = 30; fill(dcInner, C.card);
      dcInner.appendChild(tx('73%', 'Bold', 14, C.fg));
      dcOuter.appendChild(dcInner); dc.appendChild(dcOuter);
      dc.appendChild(tx('Donut Chart', 'Medium', 12, C.mutedFg));
      chartDonuts.push(dc);
    }
    y5 = makeSet('ChartDonut', chartDonuts, p5, 60, y5);
    console.log('[OK] ChartDonut');
  } catch (e) { console.error('[FAIL] ChartDonut: ' + e.message); y5 += 60; }

  // ── ChartArea (3 variants: single/multi/stacked) ──
  try {
    var chartAreas = [];
    var caTypes = ['single', 'multi', 'stacked'];
    var caColors = [[C.primary], [C.primary, C.success], [C.primary, C.secondary, C.success]];
    for (var cai = 0; cai < caTypes.length; cai++) {
      var ca = figma.createComponent();
      ca.name = 'Type=' + caTypes[cai];
      ca.layoutMode = 'VERTICAL'; ca.counterAxisSizingMode = 'FIXED';
      ca.resize(320, 1); ca.primaryAxisSizingMode = 'AUTO'; fill(ca, C.card); stroke(ca, C.border); ca.cornerRadius = RAD;
      ca.paddingLeft = ca.paddingRight = ca.paddingTop = ca.paddingBottom = 16; ca.itemSpacing = 12;
 var caHdr = row(0); caHdr.counterAxisAlignItems = 'CENTER'; noFill(caHdr); caHdr.layoutMode = 'HORIZONTAL';
      caHdr.appendChild(tx('Area Chart · ' + caTypes[cai], 'SemiBold', 13, C.fg));
      var caHSp = figma.createFrame(); caHSp.resize(4,1); noFill(caHSp); caHdr.appendChild(caHSp); caHSp.layoutGrow = 1;
      caHdr.appendChild(tx('Last 7 days', 'Regular', 11, C.mutedFg)); ca.appendChild(caHdr);
      caHdr.layoutSizingHorizontal = 'FILL';
      // SVG area chart placeholder
      var caChart = figma.createFrame(); caChart.resize(288, 100); noFill(caChart);
      caChart.layoutMode = 'HORIZONTAL'; caChart.counterAxisAlignItems = 'MAX'; caChart.itemSpacing = 0;
      var caPoints = [30, 55, 40, 70, 45, 80, 60];
      for (var cap = 0; cap < caPoints.length; cap++) {
        var caCol2 = figma.createFrame(); caCol2.resize(Math.floor(288 / caPoints.length), 100);
        caCol2.layoutMode = 'VERTICAL'; caCol2.primaryAxisAlignItems = 'MAX'; noFill(caCol2);
        // Fill area
        for (var caci = 0; caci < caColors[cai].length; caci++) {
          var caBar2 = figma.createFrame(); var caH2 = Math.round((caPoints[cap] / 100) * (80 - caci * 20));
          caBar2.resize(Math.floor(288 / caPoints.length), caH2);
          fill(caBar2, caColors[cai][caci]); caBar2.opacity = 0.2 + (0.15 * (caColors[cai].length - caci));
          caCol2.appendChild(caBar2);
        }
        caChart.appendChild(caCol2);
      }
      ca.appendChild(caChart);
      // X axis
 var caXRow = row(0); caXRow.resize(288, 1); caXRow.layoutMode = 'HORIZONTAL'; noFill(caXRow);
      var caXLabels = ['M','T','W','T','F','S','S'];
      for (var caxl = 0; caxl < caXLabels.length; caxl++) {
        var caXL = figma.createFrame(); caXL.resize(Math.floor(288 / 7), 16); caXL.layoutMode = 'HORIZONTAL'; caXL.primaryAxisAlignItems = 'CENTER'; noFill(caXL);
        caXL.appendChild(tx(caXLabels[caxl], 'Regular', 9, C.mutedFg)); caXRow.appendChild(caXL);
      }
      ca.appendChild(caXRow);
      caXRow.layoutSizingHorizontal = 'FILL';
      chartAreas.push(ca);
    }
    y5 = makeSet('ChartArea', chartAreas, p5, 60, y5);
    console.log('[OK] ChartArea (' + chartAreas.length + ' variants)');
  } catch (e) { console.error('[FAIL] ChartArea: ' + e.message); y5 += 60; }

  // ── ChartScatter (2 variants: default/with-trend) ──
  try {
    var scatters = [];
    var scatterTypes = ['default', 'with-trend'];
    var scatterDots = [
      { x: 40, y: 60 }, { x: 80, y: 30 }, { x: 120, y: 75 }, { x: 160, y: 50 },
      { x: 200, y: 85 }, { x: 240, y: 40 }, { x: 60, y: 90 }, { x: 180, y: 20 },
    ];
    for (var sci = 0; sci < scatterTypes.length; sci++) {
      var sc = figma.createComponent();
      sc.name = 'Type=' + scatterTypes[sci];
      sc.layoutMode = 'VERTICAL'; sc.counterAxisSizingMode = 'FIXED';
      sc.resize(280, 1); sc.primaryAxisSizingMode = 'AUTO'; fill(sc, C.card); stroke(sc, C.border); sc.cornerRadius = RAD;
      sc.paddingLeft = sc.paddingRight = sc.paddingTop = sc.paddingBottom = 16; sc.itemSpacing = 10;
      sc.appendChild(tx('Scatter Plot · ' + scatterTypes[sci], 'SemiBold', 13, C.fg));
      // Plot area
      var scPlot = figma.createFrame(); scPlot.resize(248, 140); fill(scPlot, C.bg); stroke(scPlot, C.border); scPlot.cornerRadius = 6;
      scPlot.layoutMode = 'HORIZONTAL'; scPlot.primaryAxisSizingMode = 'FIXED'; scPlot.counterAxisSizingMode = 'FIXED'; // absolute children
      // Grid lines
      for (var scg = 1; scg < 4; scg++) {
        var scGridH = figma.createFrame(); scGridH.resize(248, 1); fill(scGridH, C.border);
        scPlot.appendChild(scGridH);
        scGridH.layoutPositioning = 'ABSOLUTE'; scGridH.x = 0; scGridH.y = scg * 35;
        var scGridV = figma.createFrame(); scGridV.resize(1, 140); fill(scGridV, C.border);
        scPlot.appendChild(scGridV);
        scGridV.layoutPositioning = 'ABSOLUTE'; scGridV.x = scg * 62; scGridV.y = 0;
      }
      // Trend line for variant 2
      if (scatterTypes[sci] === 'with-trend') {
        var scTrend = figma.createFrame(); scTrend.resize(220, 2); fill(scTrend, C.primary); scTrend.opacity = 0.4;
        scTrend.cornerRadius = 1;
        scPlot.appendChild(scTrend);
        scTrend.layoutPositioning = 'ABSOLUTE'; scTrend.x = 14; scTrend.y = 90;
      }
      // Dots
      for (var scd = 0; scd < scatterDots.length; scd++) {
        var scDot = figma.createFrame(); scDot.resize(8, 8); scDot.cornerRadius = 4;
        fill(scDot, scd % 2 === 0 ? C.primary : C.secondary);
        scPlot.appendChild(scDot);
        scDot.layoutPositioning = 'ABSOLUTE'; scDot.x = scatterDots[scd].x; scDot.y = scatterDots[scd].y;
      }
      sc.appendChild(scPlot);
      // Legend
      var scLeg = row(12); noFill(scLeg); scLeg.counterAxisAlignItems = 'CENTER';
      var scLegDots = [C.primary, C.secondary];
      var scLegLabels = ['Series A', 'Series B'];
      for (var sll = 0; sll < 2; sll++) {
        var scLd = figma.createFrame(); scLd.resize(8, 8); scLd.cornerRadius = 4; fill(scLd, scLegDots[sll]);
        scLeg.appendChild(scLd); scLeg.appendChild(tx(scLegLabels[sll], 'Regular', 11, C.mutedFg));
      }
      sc.appendChild(scLeg);
      scatters.push(sc);
    }
    y5 = makeSet('ChartScatter', scatters, p5, 60, y5);
    console.log('[OK] ChartScatter (' + scatters.length + ' variants)');
  } catch (e) { console.error('[FAIL] ChartScatter: ' + e.message); y5 += 60; }

  // ── ChartGauge (3 variants: 25%/50%/75%/100% — 4 variants) ──
  try {
    var gauges = [];
    var gaugeVals = [25, 50, 75, 100];
    var gaugeColors = [C.destructive, C.warning, C.primary, C.success];
    for (var gvi = 0; gvi < gaugeVals.length; gvi++) {
      var gv = figma.createComponent();
      gv.name = 'Value=' + gaugeVals[gvi] + '%';
      gv.layoutMode = 'VERTICAL'; gv.counterAxisSizingMode = 'FIXED';
      gv.resize(200, 1); gv.primaryAxisSizingMode = 'AUTO'; fill(gv, C.card); stroke(gv, C.border); gv.cornerRadius = RAD;
      gv.paddingLeft = gv.paddingRight = gv.paddingTop = gv.paddingBottom = 20; gv.itemSpacing = 12;
      gv.counterAxisAlignItems = 'CENTER';
      gv.appendChild(tx('Performance', 'SemiBold', 13, C.fg));
      // Gauge visual (semicircle approximation with track + fill)
      var gaugeWrap = figma.createFrame(); gaugeWrap.resize(120, 70); noFill(gaugeWrap); gaugeWrap.layoutMode = 'VERTICAL'; gaugeWrap.counterAxisAlignItems = 'CENTER'; gaugeWrap.itemSpacing = 4;
      // Track bar
      var gaugeTrack = figma.createFrame(); gaugeTrack.resize(120, 12); fill(gaugeTrack, C.muted); gaugeTrack.cornerRadius = 6;
      gaugeTrack.layoutMode = 'HORIZONTAL'; gaugeTrack.counterAxisAlignItems = 'CENTER';
      var gaugeFill = figma.createFrame(); var gfW = Math.round(120 * gaugeVals[gvi] / 100);
      gaugeFill.resize(gfW, 12); fill(gaugeFill, gaugeColors[gvi]); gaugeFill.cornerRadius = 6;
      gaugeTrack.appendChild(gaugeFill); gaugeWrap.appendChild(gaugeTrack);
      // Big percentage label
      var gaugePct = tx(gaugeVals[gvi] + '%', 'Bold', 32, gaugeColors[gvi]); gaugeWrap.appendChild(gaugePct);
      gv.appendChild(gaugeWrap);
      var gaugeSubtxt = tx(gaugeVals[gvi] < 50 ? 'Critical' : gaugeVals[gvi] < 75 ? 'Warning' : gaugeVals[gvi] < 100 ? 'Good' : 'Excellent', 'Medium', 12, gaugeColors[gvi]);
      gv.appendChild(gaugeSubtxt);
      gauges.push(gv);
    }
    y5 = makeSet('ChartGauge', gauges, p5, 60, y5);
    console.log('[OK] ChartGauge (' + gauges.length + ' variants)');
  } catch (e) { console.error('[FAIL] ChartGauge: ' + e.message); y5 += 60; }


  // ── FileUploader (3 states) ──
  try {
    var fups = [];
    var fupStates = ['idle', 'hover', 'uploading', 'complete', 'error'];
    for (var fui = 0; fui < fupStates.length; fui++) {
      var fup = figma.createComponent();
      fup.name = 'State=' + fupStates[fui];
      fup.layoutMode = 'VERTICAL'; fup.primaryAxisSizingMode = 'FIXED'; fup.counterAxisSizingMode = 'FIXED';
      fup.resize(320, 160); fup.primaryAxisAlignItems = 'CENTER'; fup.counterAxisAlignItems = 'CENTER'; fup.itemSpacing = 8;
      fup.cornerRadius = 12;
      if (fupStates[fui] === 'idle') { fill(fup, C.bg); stroke(fup, C.border); }
      else if (fupStates[fui] === 'hover') { fill(fup, C.infoSubtle); stroke(fup, C.primary, 2); }
      else if (fupStates[fui] === 'complete') { fill(fup, C.successSubtle); stroke(fup, C.success, 1); }
      else if (fupStates[fui] === 'error') { fill(fup, C.destructiveSubtle); stroke(fup, C.destructive, 1); }
      else { fill(fup, C.bg); stroke(fup, C.secondary, 1); }
      var fupIco = fupStates[fui] === 'complete' ? 'check-circle' : (fupStates[fui] === 'error' ? 'x-circle' : 'upload');
      var fupCol = fupStates[fui] === 'complete' ? C.success : (fupStates[fui] === 'error' ? C.destructive : C.primary);
      fup.appendChild(iconInst(fupIco, fupCol, 32));
      if (fupStates[fui] === 'idle') {
        fup.appendChild(tx('Drag & drop files here', 'Medium', 14, C.fg));
        fup.appendChild(tx('or click to browse  ·  Max 10MB', 'Regular', 12, C.mutedFg));
      } else if (fupStates[fui] === 'hover') {
        fup.appendChild(tx('Drop your files here', 'Medium', 14, C.primary));
      } else if (fupStates[fui] === 'uploading') {
        fup.appendChild(tx('Uploading...', 'Medium', 14, C.secondary));
        var fupTrack = figma.createFrame(); fupTrack.resize(240, 6); fill(fupTrack, C.muted); fupTrack.cornerRadius = 3;
        var fupBar2 = figma.createFrame(); fupBar2.resize(160, 6); fill(fupBar2, C.secondary); fupBar2.cornerRadius = 3;
        fupTrack.appendChild(fupBar2); fup.appendChild(fupTrack);
        fup.appendChild(tx('67% • 2.3 MB of 3.4 MB', 'Regular', 12, C.mutedFg));
      } else if (fupStates[fui] === 'complete') {
        fup.appendChild(tx('Upload complete!', 'Medium', 14, C.success));
        fup.appendChild(tx('document.pdf • 2.3 MB', 'Regular', 12, C.mutedFg));
      } else {
        fup.appendChild(tx('Upload failed', 'Medium', 14, C.destructive));
        fup.appendChild(tx('File exceeds 10MB limit', 'Regular', 12, C.destructive));
      }
      fups.push(fup);
    }
    y5 = makeSet('FileUploader', fups, p5, 60, y5);
    console.log('[OK] FileUploader');
  } catch (e) { console.error('[FAIL] FileUploader: ' + e.message); y5 += 60; }

  // ── TreeTable — removed per user request ──
  if (false) try {
    var trtbls = [];
    var trtblStates = ['collapsed', 'partial', 'expanded'];
    for (var tri = 0; tri < trtblStates.length; tri++) {
      var trtbl = figma.createComponent();
      trtbl.name = 'State=' + trtblStates[tri];
      trtbl.layoutMode = 'VERTICAL'; trtbl.counterAxisSizingMode = 'FIXED';
      trtbl.resize(480, 1); trtbl.primaryAxisSizingMode = 'AUTO'; trtbl.itemSpacing = 0;
      fill(trtbl, C.card); stroke(trtbl, C.border); trtbl.cornerRadius = 12;
      // Header
 var trtblH = row(0); trtblH.resize(480, 36); trtblH.layoutMode = 'HORIZONTAL'; trtblH.layoutSizingVertical = 'FIXED';
      trtblH.paddingLeft = trtblH.paddingRight = 12; trtblH.counterAxisAlignItems = 'CENTER'; fill(trtblH, C.muted);
      var trtblHT = tx('Account', 'Bold', 11, C.mutedFg); trtblHT.resize(200, 14); trtblH.appendChild(trtblHT);
      var trtblHA = tx('Amount', 'Bold', 11, C.mutedFg); trtblHA.resize(100, 14); trtblH.appendChild(trtblHA);
      var trtblHS = tx('Status', 'Bold', 11, C.mutedFg); trtblHS.resize(100, 14); trtblH.appendChild(trtblHS);
      trtbl.appendChild(trtblH);
      trtblH.layoutSizingHorizontal = 'FILL';
      // Parent rows + children
      var trtblData = [
        { name: 'CESION Group', amount: '$42,800', status: 'active', children: ['Alpha SA', 'Beta SL', 'Gamma Corp'] },
        { name: 'Investors Fund A', amount: '$18,500', status: 'pending', children: ['Fund 1', 'Fund 2'] }
      ];
      for (var tri2 = 0; tri2 < trtblData.length; tri2++) {
 var trtblPR = row(8); trtblPR.resize(480, 40); trtblPR.layoutMode = 'HORIZONTAL'; trtblPR.layoutSizingVertical = 'FIXED';
        trtblPR.paddingLeft = trtblPR.paddingRight = 12; trtblPR.counterAxisAlignItems = 'CENTER';
        fill(trtblPR, C.muted);
        var trtblExpIcon = (trtblStates[tri] === 'collapsed' || (trtblStates[tri] === 'partial' && tri2 === 1)) ? 'chevron-right' : 'chevron-down';
        trtblPR.appendChild(iconInst(trtblExpIcon, C.fg, 14));
        var trtblPT = tx(trtblData[tri2].name, 'Bold', 13, C.fg); trtblPT.resize(180, 16); trtblPR.appendChild(trtblPT);
        var trtblPA = tx(trtblData[tri2].amount, 'Medium', 13, C.fg); trtblPA.resize(100, 16); trtblPR.appendChild(trtblPA);
        var trtblPS = tx(trtblData[tri2].status, 'Regular', 12, trtblData[tri2].status === 'active' ? C.success : C.warning); trtblPS.resize(100, 16); trtblPR.appendChild(trtblPS);
        trtbl.appendChild(trtblPR);
        trtblPR.layoutSizingHorizontal = 'FILL';
        // Add children if expanded
        var showChildren = (trtblStates[tri] === 'expanded') || (trtblStates[tri] === 'partial' && tri2 === 0);
        if (showChildren) {
          for (var trch = 0; trch < trtblData[tri2].children.length; trch++) {
 var trtblCR = row(0); trtblCR.resize(480, 36); trtblCR.layoutMode = 'HORIZONTAL'; trtblCR.layoutSizingVertical = 'FIXED';
            trtblCR.paddingLeft = 36; trtblCR.paddingRight = 12; trtblCR.counterAxisAlignItems = 'CENTER';
            fill(trtblCR, C.bg);
            var trtblCT = tx(trtblData[tri2].children[trch], 'Regular', 13, C.fg); trtblCT.resize(192, 16); trtblCR.appendChild(trtblCT);
            var trtblCA = tx('$' + (Math.floor(Math.random() * 8000) + 2000) + '.00', 'Regular', 13, C.mutedFg); trtblCA.resize(100, 16); trtblCR.appendChild(trtblCA);
            trtblCR.appendChild(tx('active', 'Regular', 12, C.success));
            trtbl.appendChild(trtblCR);
            trtblCR.layoutSizingHorizontal = 'FILL';
          }
        }
        if (tri2 < trtblData.length - 1) {
 var trtblSep = figma.createFrame(); trtblSep.resize(480, 1); fill(trtblSep, C.border); trtblSep.layoutMode = 'HORIZONTAL'; trtblSep.primaryAxisSizingMode = 'FIXED'; trtblSep.counterAxisSizingMode = 'FIXED';
          trtbl.appendChild(trtblSep);
          trtblSep.layoutSizingHorizontal = 'FILL';
        }
      }
      trtbls.push(trtbl);
    }
    y5 = makeSet('TreeTable', trtbls, p5, 60, y5);
    console.log('[OK] TreeTable');
  } catch (e) { console.error('[FAIL] TreeTable: ' + e.message); y5 += 60; }
  gridFlush(); // close last row

  console.log('[DONE] Advanced page (14 ComponentSets: ChartBar, ChartLine, ChartDonut, ChartArea, ChartScatter, ChartGauge)');

  // ══════════════════════════════════════════════════════════════════════
  // ICONS PAGE — Visual gallery of all Lucide icon source components
  // ══════════════════════════════════════════════════════════════════════
  try {
    console.log('Building Icons page...');
    var igRoot = col(0); igRoot.name = 'Icons'; igRoot.primaryAxisSizingMode = 'AUTO'; igRoot.counterAxisSizingMode = 'FIXED';
    igRoot.paddingLeft = igRoot.paddingRight = 60; igRoot.paddingTop = igRoot.paddingBottom = 60;
    igRoot.resize(1200, 1); igRoot.itemSpacing = 48; fill(igRoot, C.bg);
    // Build category map first (needed for subtitle count)
    var iconCats = {};
    for (var ici = 0; ici < iconNames.length; ici++) {
      var icN = iconNames[ici];
      var icCat = iconCategory(icN);
      if (!iconCats[icCat]) iconCats[icCat] = [];
      iconCats[icCat].push(icN);
    }
    var catKeys = Object.keys(iconCats).sort();

    igRoot.appendChild(tx('ICONS', 'Bold', 48, C.fg));
    igRoot.appendChild(tx('Lucide icon library — ' + iconNames.length + ' icons · ' + catKeys.length + ' categories · CESIONBNK DSM', 'Regular', 16, C.mutedFg));

    for (var ck = 0; ck < catKeys.length; ck++) {
      var catName = catKeys[ck];
      var catIcons = iconCats[catName];
      // Section header
      var igSecHdr = row(8); igSecHdr.counterAxisAlignItems = 'CENTER'; noFill(igSecHdr);
      igSecHdr.appendChild(tx(catName.replace(/^\d+-/, ''), 'SemiBold', 14, C.primary));
      var igSecLine = figma.createFrame(); igSecLine.resize(60, 1); fill(igSecLine, C.border);
      igSecLine.layoutMode = 'HORIZONTAL'; igSecLine.primaryAxisSizingMode = 'FIXED'; igSecLine.counterAxisSizingMode = 'FIXED';
      igSecHdr.appendChild(igSecLine);
      igRoot.appendChild(igSecHdr);
      igSecHdr.layoutSizingHorizontal = 'FILL';

      // Icon grid row (wrap)
      var igGrid = figma.createFrame(); igGrid.layoutMode = 'HORIZONTAL';
      igGrid.primaryAxisSizingMode = 'AUTO'; igGrid.counterAxisSizingMode = 'AUTO';
      igGrid.layoutWrap = 'WRAP'; igGrid.itemSpacing = 8; igGrid.counterAxisSpacing = 8;
      igGrid.paddingLeft = igGrid.paddingRight = igGrid.paddingTop = igGrid.paddingBottom = 0;
      noFill(igGrid);

      for (var ig = 0; ig < catIcons.length; ig++) {
        var igName = catIcons[ig];
        var igComp = iconComps[igName];
        if (!igComp) continue;
        var igCell = col(4); igCell.resize(72, 1); igCell.primaryAxisSizingMode = 'AUTO'; igCell.counterAxisSizingMode = 'FIXED';
        igCell.primaryAxisAlignItems = 'CENTER'; igCell.counterAxisAlignItems = 'CENTER';
        igCell.paddingTop = igCell.paddingBottom = 8; igCell.paddingLeft = igCell.paddingRight = 8;
        igCell.cornerRadius = 8; noFill(igCell);
        var igInst = iconInst(igName, C.fg, 20);
        igCell.appendChild(igInst);
        var igLbl = tx(igName, 'Regular', 9, C.mutedFg);
        igLbl.textAlignHorizontal = 'CENTER'; igLbl.textAutoResize = 'WIDTH_AND_HEIGHT';
        igCell.appendChild(igLbl);
        igGrid.appendChild(igCell);
      }
      igRoot.appendChild(igGrid);
      igGrid.layoutSizingHorizontal = 'FILL';
    }

    pIcons.appendChild(igRoot);
    igRoot.x = 60; igRoot.y = 60;
    console.log('[OK] Icons page (' + iconNames.length + ' icons in ' + catKeys.length + ' categories)');
  } catch (e) { console.error('[FAIL] Icons page: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // COVER PAGE
  // ══════════════════════════════════════════════════════════════════════
  try {
    console.log('Building Cover...');
    var cover = col(24);
    cover.name = 'Cover'; cover.resize(1440, 900);
    cover.primaryAxisSizingMode = 'FIXED'; cover.counterAxisSizingMode = 'FIXED';
    cover.primaryAxisAlignItems = 'CENTER'; cover.counterAxisAlignItems = 'CENTER';
    // Gradient-like background (primary → dark)
    fill(cover, C.primary);

    // CESIONBNK wordmark — actual SVG paths from Figma design source
    var _cSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 31" width="480" height="58">' +
      '<path fill="#ffffff" d="M16.0155 24.8533C10.5795 24.8533 6.1727 20.644 6.1727 15.4515C6.1727 10.2589 10.5795 6.0498 16.0155 6.0498C19.2689 6.0498 22.1526 7.55826 23.9445 9.88231L29.2034 6.77101C26.3141 2.77352 21.4854 0.153496 16.0155 0.153496C7.17035 0.153496 0 7.0027 0 15.4515C0 23.9005 7.17035 30.7497 16.0155 30.7497C21.4925 30.7497 26.3266 28.1229 29.2144 24.1169L23.9997 20.9467C22.2121 23.3122 19.3031 24.8533 16.0155 24.8533Z"/>' +
      '<path fill="#ffffff" d="M34.8504 7.00356H64.2042V1.30166H34.8504V7.00356Z"/>' +
      '<path fill="#ffffff" d="M34.8504 19.1207H64.2042V13.4189H34.8504V19.1207Z"/>' +
      '<path fill="#ffffff" d="M34.8504 30.445H64.2042V24.7431H34.8504V30.445Z"/>' +
      '<path fill="#ffffff" d="M82.2664 30.445C79.2207 30.445 76.6624 29.8999 74.5913 28.8118C72.5202 27.7236 70.9365 26.0076 69.84 23.6659L75.3832 20.7079C76.7232 23.5023 79.0781 24.8985 82.4491 24.8985C84.0329 24.8985 85.2103 24.6424 85.9821 24.128C86.7532 23.6147 87.1394 22.8859 87.1394 21.9404C87.1394 20.8724 86.6418 20.0512 85.6471 19.4751C84.6516 18.9004 83.0784 18.3043 80.9262 17.6879C78.8952 17.1132 77.2202 16.5277 75.9009 15.9316C74.581 15.3366 73.4538 14.4528 72.5202 13.2817C71.5856 12.1107 71.1192 10.5809 71.1192 8.69055C71.1192 5.97898 72.1442 3.85262 74.1953 2.3119C76.2456 0.771404 78.8553 0.000937447 82.0228 0.000937447C84.3774 0.000937447 86.5201 0.504628 88.4492 1.51092C90.3775 2.51809 91.8907 3.98644 92.9873 5.9173L87.566 8.87537C86.3068 6.65682 84.3774 5.54743 81.7791 5.54743C80.4391 5.54743 79.413 5.8044 78.703 6.31768C77.9921 6.83205 77.637 7.56089 77.637 8.5055C77.637 9.49152 78.1138 10.2417 79.0686 10.755C80.0221 11.2692 81.4945 11.7929 83.4847 12.3265C85.5957 12.9023 87.3318 13.4973 88.6929 14.1137C90.0529 14.7298 91.2207 15.6448 92.1953 16.856C93.1699 18.0685 93.6572 19.6813 93.6572 21.6939C93.6572 24.4055 92.6314 26.5423 90.5811 28.1031C88.53 29.6649 85.7585 30.445 82.2664 30.445Z"/>' +
      '<path fill="#ffffff" d="M99.2931 1.30079H104.929V30.1481H99.2931V1.30079Z"/>' +
      '<path fill="#ffffff" d="M125.535 24.6077C120.454 24.6077 116.335 20.4404 116.335 15.2998C116.335 10.1593 120.454 5.99206 125.535 5.99206C130.616 5.99206 134.735 10.1593 134.735 15.2998C134.735 20.4404 130.616 24.6077 125.535 24.6077ZM125.535 0.154812C117.267 0.154812 110.565 6.93536 110.565 15.2998C110.565 23.6644 117.267 30.445 125.535 30.445C133.802 30.445 140.505 23.6644 140.505 15.2998C140.505 6.93536 133.802 0.154812 125.535 0.154812Z"/>' +
      '<path fill="#ffffff" d="M175.922 0.153714H170.261V21.8364L151.802 0.24983V0.153714H146.14V30.7152H151.802V9.28054L170.261 30.7497L170.266 30.7152H175.922V0.153714Z"/>' +
      '<path fill="#ffffff" d="M192.904 28.2729C195.166 28.2729 196.895 27.7165 198.088 26.6027C199.281 25.4898 199.878 23.8979 199.878 21.8278C199.878 20.1975 199.336 18.81 198.251 17.6646C197.166 16.5202 195.848 15.9476 194.299 15.9476H183.93V28.2729H192.904ZM194.113 13.7367C195.445 13.7367 196.554 13.1802 197.437 12.0665C198.321 10.9536 198.763 9.59665 198.763 7.9973C198.763 6.96224 198.491 6.00607 197.949 5.12772C197.406 4.25024 196.639 3.55191 195.647 3.03427C194.655 2.51685 193.524 2.25814 192.253 2.25814H183.93V13.7367H194.113ZM181.558 0.000134529H191.974C193.803 0.000134529 195.415 0.337527 196.809 1.01144C198.204 1.68623 199.281 2.61885 200.041 3.8104C200.801 5.00261 201.18 6.367 201.18 7.90314C201.18 9.44015 200.893 10.7655 200.32 11.8784C199.746 12.9919 198.871 13.9409 197.693 14.7244C199.181 15.3831 200.32 16.3321 201.111 17.5705C201.901 18.81 202.296 20.26 202.296 21.9219C202.296 24.6198 201.459 26.7285 199.785 28.2491C198.112 29.7709 195.817 30.5309 192.904 30.5309H181.558V0.000134529Z"/>' +
      '<path fill="#ffffff" d="M205.114 0.00241879H207.971C215.216 8.40651 221.883 17.3311 227.972 26.777V0.00241879H230.361V30.7575H227.785C221.696 21.0592 214.935 11.8813 207.503 3.22465V30.7575H205.114V0.00241879Z"/>' +
      '<path fill="#ffffff" d="M252.636 30.7575H256L245.812 15.4196L255.434 0.00241879H252.439L235.696 27.149V0.00241879H233.179V30.7575H236.056L244.292 17.7107L252.636 30.7575Z"/>' +
      '</svg>';
    try {
      var logoNode = figma.createNodeFromSvg(_cSVG);
      logoNode.name = 'CESIONBNK Wordmark'; logoNode.resize(480, 58);
      cover.appendChild(logoNode);
    } catch (eL) { cover.appendChild(tx('CESIONBNK', 'Bold', 64, C.primaryFg)); }

    // Subtitle
    cover.appendChild(tx('Design System Library', 'Regular', 24, C.primaryFg));

    // Version badge
    var verBadge = row(8);
    verBadge.paddingLeft = verBadge.paddingRight = 16; verBadge.paddingTop = verBadge.paddingBottom = 8;
    verBadge.cornerRadius = 20;
    fill(verBadge, C.secondary);
    verBadge.appendChild(tx('DSM v1.3', 'Bold', 14, C.secondaryFg));
    cover.appendChild(verBadge);

    // Info row
    var coverInfo = row(24); coverInfo.counterAxisAlignItems = 'CENTER';
    var ciItems = ['Gotham', '#374151 Primary', '#796eff Secondary', '10px Radius'];
    for (var cii = 0; cii < ciItems.length; cii++) {
      if (cii > 0) coverInfo.appendChild(tx('\u00b7', 'Regular', 16, C.primaryFg));
      coverInfo.appendChild(tx(ciItems[cii], 'Regular', 14, C.primaryFg));
    }
    cover.appendChild(coverInfo);

    // Date
    cover.appendChild(tx('Last updated: March 2026', 'Regular', 12, C.primaryFg));

    pCover.appendChild(cover);
    console.log('[OK] Cover');
  } catch (e) { console.error('[FAIL] Cover: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // TEMPLATES PAGE — removed
  // ══════════════════════════════════════════════════════════════════════
  if (false) {
    console.log('Building Templates...');
    // Title block on the page
    var tplTitle = tx('TEMPLATES', 'Bold', 48, C.fg); pTemplates.appendChild(tplTitle); tplTitle.x = 60; tplTitle.y = 60;
    var tplSub = tx('Reusable page templates and screen layouts — CESIONBNK', 'Regular', 16, C.mutedFg); pTemplates.appendChild(tplSub); tplSub.x = 60; tplSub.y = 120;
    var tplY = 180; // running Y position on page

    // helper: place a child at absolute x,y inside a frame (no auto-layout on child)
    function place(parent, child, x, y) {
      parent.appendChild(child);
      child.x = x; child.y = y;
    }
    // helper: simple filled rect at absolute position inside parent
    function rect(parent, x, y, w, h, fillHex, strokeHex, radius) {
      var f = figma.createFrame(); f.resize(w, h);
      if (fillHex) fill(f, fillHex); else noFill(f);
      if (strokeHex) stroke(f, strokeHex);
      if (radius) f.cornerRadius = radius;
      place(parent, f, x, y); return f;
    }
    function tplLabel(parent, text, x, y) {
      var lbl = tx(text, 'Bold', 28, C.fg); place(parent, lbl, x, y); return lbl;
    }

    // ── Template 1: Dashboard Layout ──
    try {
      tplLabel(pTemplates, 'Dashboard Layout', 60, tplY);
      // ── T1: Dashboard (1280×800, absolute layout) ──
      var tplDash = figma.createFrame(); tplDash.name = 'Dashboard Layout'; tplDash.resize(1280, 800); fill(tplDash, C.muted);
      pTemplates.appendChild(tplDash); tplDash.x = 60; tplDash.y = tplY + 50;
      // Sidebar (240×800)
      var tplSD = figma.createFrame(); tplSD.resize(240, 800); fill(tplSD, C.card); stroke(tplSD, C.border);
      place(tplDash, tplSD, 0, 0);
      var tplSDLogo = figma.createFrame(); tplSDLogo.resize(240, 56); fill(tplSDLogo, C.primary); place(tplSD, tplSDLogo, 0, 0);
      var tplSDLogoTx = tx('CESIONBNK', 'Bold', 14, C.primaryFg); place(tplSDLogo, tplSDLogoTx, 16, 18);
      var tplSDItems = [['home','Dashboard',true],['file-text','Operations',false],['users','Clients',false],['settings','Settings',false]];
      for (var tsdi = 0; tsdi < tplSDItems.length; tsdi++) {
        var tplSDRow = figma.createFrame(); tplSDRow.resize(240, 40);
        if (tplSDItems[tsdi][2]) fill(tplSDRow, C.accent); else noFill(tplSDRow);
        place(tplSD, tplSDRow, 0, 56 + tsdi * 40);
        var tplSDIco = iconInst(tplSDItems[tsdi][0], tplSDItems[tsdi][2] ? C.primary : C.mutedFg, 16); place(tplSDRow, tplSDIco, 16, 12);
        var tplSDTx = tx(tplSDItems[tsdi][1], tplSDItems[tsdi][2] ? 'Medium' : 'Regular', 14, tplSDItems[tsdi][2] ? C.primary : C.fg); place(tplSDRow, tplSDTx, 40, 12);
      }
      // Top header (240..1280 wide = 1040, 56px tall)
      var tplDHdr = figma.createFrame(); tplDHdr.resize(1040, 56); fill(tplDHdr, C.card); stroke(tplDHdr, C.border);
      place(tplDash, tplDHdr, 240, 0);
      place(tplDHdr, tx('Dashboard', 'Bold', 18, C.fg), 24, 18);
      place(tplDHdr, iconInst('bell', C.mutedFg, 20), 960, 18);
      // KPI cards (4 cards, y=80, h=100, w=240)
      var tplKD = [['Revenue','$124,592',C.primary],['Operations','1,429',C.success],['Clients','847',C.secondary],['Conv.','3.24%',C.warning]];
      for (var tki2 = 0; tki2 < tplKD.length; tki2++) {
        var tplKC = figma.createFrame(); tplKC.resize(234, 96); fill(tplKC, C.card); stroke(tplKC, C.border); tplKC.cornerRadius = 12;
        place(tplDash, tplKC, 264 + tki2 * 250, 80);
        place(tplKC, tx(tplKD[tki2][0], 'Regular', 12, C.mutedFg), 16, 16);
        place(tplKC, tx(tplKD[tki2][1], 'Bold', 22, tplKD[tki2][2]), 16, 38);
      }
      // Chart area (640×260) + Activity (340×260)
      var tplChF = figma.createFrame(); tplChF.resize(640, 260); fill(tplChF, C.card); stroke(tplChF, C.border); tplChF.cornerRadius = 12;
      place(tplDash, tplChF, 264, 196);
      place(tplChF, tx('Revenue Overview', 'Bold', 15, C.fg), 20, 20);
      var tplChPH = figma.createFrame(); tplChPH.resize(600, 200); fill(tplChPH, C.muted); tplChPH.cornerRadius = 8; place(tplChF, tplChPH, 20, 46);
      var tplActF = figma.createFrame(); tplActF.resize(336, 260); fill(tplActF, C.card); stroke(tplActF, C.border); tplActF.cornerRadius = 12;
      place(tplDash, tplActF, 924, 196);
      place(tplActF, tx('Recent Activity', 'Bold', 14, C.fg), 16, 16);
      for (var tai2 = 0; tai2 < 4; tai2++) {
        var tplAF = figma.createFrame(); tplAF.resize(336, 44); if (tai2 < 2) fill(tplAF, C.bg); else noFill(tplAF);
        place(tplActF, tplAF, 0, 48 + tai2 * 48);
        var tplADot2 = figma.createFrame(); tplADot2.resize(8, 8); tplADot2.cornerRadius = 4;
        fill(tplADot2, tai2 === 0 ? C.success : C.muted); place(tplAF, tplADot2, 16, 18);
        place(tplAF, tx('Operation #' + (1200 + tai2), 'Medium', 13, C.fg), 32, 12);
        place(tplAF, tx(tai2 === 0 ? 'Just now' : (tai2 + ' min ago'), 'Regular', 11, C.mutedFg), 32, 28);
      }
      console.log('[OK] Template: Dashboard Layout');
    } catch (e) { console.error('[FAIL] Template Dashboard: ' + e.message); }
    tplY += 880;

    // ── T2: List / Table View (1280×720) ──
    try {
      tplLabel(pTemplates, 'List / Table View', 60, tplY);
      var tplList = figma.createFrame(); tplList.name = 'List / Table View'; tplList.resize(1280, 720); fill(tplList, C.muted);
      pTemplates.appendChild(tplList); tplList.x = 60; tplList.y = tplY + 50;
      // Top bar
      var tplLBar = figma.createFrame(); tplLBar.resize(1280, 56); fill(tplLBar, C.card); stroke(tplLBar, C.border);
      place(tplList, tplLBar, 0, 0);
      place(tplLBar, tx('Operations', 'Bold', 18, C.fg), 32, 18);
      var tplLSrch = figma.createFrame(); tplLSrch.resize(240, 32); fill(tplLSrch, C.bg); stroke(tplLSrch, C.input); tplLSrch.cornerRadius = RAD;
      place(tplLBar, tplLSrch, 940, 12);
      place(tplLSrch, iconInst('search', C.mutedFg, 14), 10, 9);
      place(tplLSrch, tx('Search...', 'Regular', 13, C.mutedFg), 30, 8);
      var tplLBtn = figma.createFrame(); tplLBtn.resize(140, 32); fill(tplLBtn, C.primary); tplLBtn.cornerRadius = RAD;
      place(tplLBar, tplLBtn, 1192 - 140, 12);
      place(tplLBtn, tx('+ New Operation', 'Medium', 12, C.primaryFg), 12, 8);
      // Table card
      var tplLTbl = figma.createFrame(); tplLTbl.resize(1216, 556); fill(tplLTbl, C.card); stroke(tplLTbl, C.border); tplLTbl.cornerRadius = 12;
      place(tplList, tplLTbl, 32, 80);
      // Table header
      var tplLTH = figma.createFrame(); tplLTH.resize(1216, 40); fill(tplLTH, C.muted); place(tplLTbl, tplLTH, 0, 0);
      var tplLColNames = [['Invoice', 0, 130], ['Client', 150, 180], ['Amount', 350, 110], ['Date', 480, 110], ['Status', 610, 110], ['Actions', 740, 80]];
      for (var tlhc = 0; tlhc < tplLColNames.length; tlhc++) {
        var tplLHT2 = tx(tplLColNames[tlhc][0], 'Bold', 11, C.mutedFg); place(tplLTH, tplLHT2, 16 + tplLColNames[tlhc][1], 13);
      }
      // Table rows
      var tplLRowData = [['INV-1001','Acme Corp','$4,250.00','Jan 15','paid'],['INV-1002','Beta LLC','$1,890.00','Jan 18','pending'],['INV-1003','Gamma SA','$7,100.00','Jan 20','overdue'],['INV-1004','Delta Inc','$2,340.00','Jan 22','paid'],['INV-1005','Epsilon SL','$900.00','Jan 24','pending'],['INV-1006','Zeta Corp','$3,120.00','Jan 26','paid'],['INV-1007','Eta Grp','$5,670.00','Jan 28','overdue']];
      var tplLSC = { paid: C.success, pending: C.warning, overdue: C.destructive };
      for (var tlri = 0; tlri < tplLRowData.length; tlri++) {
        var tplLR = figma.createFrame(); tplLR.resize(1216, 48); fill(tplLR, tlri % 2 === 0 ? C.bg : C.bg);
        place(tplLTbl, tplLR, 0, 40 + tlri * 49);
        var tplLRData = [[tplLRowData[tlri][0],0],[tplLRowData[tlri][1],150],[tplLRowData[tlri][2],350],[tplLRowData[tlri][3],480],[tplLRowData[tlri][4],610],['···',750]];
        for (var tlrc = 0; tlrc < tplLRData.length; tlrc++) {
          var tplLRT = tx(tplLRData[tlrc][0], 'Regular', 13, tlrc === 4 ? (tplLSC[tplLRowData[tlri][4]] || C.mutedFg) : C.fg);
          place(tplLR, tplLRT, 16 + tplLRData[tlrc][1], 16);
        }
        var tplLSep = figma.createFrame(); tplLSep.resize(1216, 1); fill(tplLSep, C.border); place(tplLTbl, tplLSep, 0, 88 + tlri * 49);
      }
      console.log('[OK] Template: List View');
    } catch (e) { console.error('[FAIL] Template List View: ' + e.message); }
    tplY += 800;

    // ── T3: Auth / Login (1280×720) ──
    try {
      tplLabel(pTemplates, 'Auth Page — Login', 60, tplY);
      var tplAuth = figma.createFrame(); tplAuth.name = 'Auth Page'; tplAuth.resize(1280, 720); noFill(tplAuth);
      pTemplates.appendChild(tplAuth); tplAuth.x = 60; tplAuth.y = tplY + 50;
      // Left brand panel (560×720)
      var tplAL = figma.createFrame(); tplAL.resize(560, 720); fill(tplAL, C.primary); place(tplAuth, tplAL, 0, 0);
      var tplALogo = figma.createFrame(); tplALogo.resize(80, 80); tplALogo.cornerRadius = 40; fill(tplALogo, C.secondary);
      place(tplAL, tplALogo, 240, 260);
      place(tplALogo, tx('CB', 'Bold', 24, C.primaryFg), 22, 25);
      place(tplAL, tx('CESIONBNK', 'Bold', 32, C.primaryFg), 145, 360);
      place(tplAL, tx('Factoring & Invoice Finance', 'Regular', 15, C.primaryFg), 115, 400);
      // Right form panel (720×720)
      var tplAR = figma.createFrame(); tplAR.resize(720, 720); fill(tplAR, C.bg); stroke(tplAR, C.border); place(tplAuth, tplAR, 560, 0);
      place(tplAR, tx('Welcome back', 'Bold', 28, C.fg), 190, 200);
      place(tplAR, tx('Sign in to your account', 'Regular', 14, C.mutedFg), 218, 240);
      var tplARFlds = [['Email address', 'you@example.com', 300], ['Password', '••••••••', 380]];
      for (var tafi = 0; tafi < tplARFlds.length; tafi++) {
        place(tplAR, tx(tplARFlds[tafi][0], 'Medium', 13, C.fg), 190, tplARFlds[tafi][2]);
        var tplARI = figma.createFrame(); tplARI.resize(340, 40); fill(tplARI, C.bg); stroke(tplARI, C.input); tplARI.cornerRadius = RAD;
        place(tplAR, tplARI, 190, tplARFlds[tafi][2] + 20);
        place(tplARI, tx(tplARFlds[tafi][1], 'Regular', 14, C.mutedFg), 12, 10);
      }
      var tplARBtn = figma.createFrame(); tplARBtn.resize(340, 44); fill(tplARBtn, C.primary); tplARBtn.cornerRadius = RAD;
      place(tplAR, tplARBtn, 190, 440);
      place(tplARBtn, tx('Sign In', 'Bold', 15, C.primaryFg), 130, 12);
      place(tplAR, tx("Don't have an account? Register", 'Regular', 13, C.primary), 190, 500);
      console.log('[OK] Template: Auth Page');
    } catch (e) { console.error('[FAIL] Template Auth: ' + e.message); }
    tplY += 800;

    // ── T4: Settings Page (1280×720) ──
    try {
      tplLabel(pTemplates, 'Settings Page', 60, tplY);
      var tplSet = figma.createFrame(); tplSet.name = 'Settings Page'; tplSet.resize(1280, 720); fill(tplSet, C.muted);
      pTemplates.appendChild(tplSet); tplSet.x = 60; tplSet.y = tplY + 50;
      // Left settings nav (240×720)
      var tplSNav = figma.createFrame(); tplSNav.resize(240, 720); fill(tplSNav, C.card); stroke(tplSNav, C.border);
      place(tplSet, tplSNav, 0, 0);
      place(tplSNav, tx('Settings', 'Bold', 18, C.fg), 16, 24);
      var tplSNItems = [['user','Profile',true],['lock','Security',false],['bell','Notifications',false],['globe','Integrations',false],['shield','Billing',false]];
      for (var tsni2 = 0; tsni2 < tplSNItems.length; tsni2++) {
        var tplSNRow = figma.createFrame(); tplSNRow.resize(240, 40);
        if (tplSNItems[tsni2][2]) fill(tplSNRow, C.accent); else noFill(tplSNRow);
        place(tplSNav, tplSNRow, 0, 60 + tsni2 * 44);
        place(tplSNRow, iconInst(tplSNItems[tsni2][0], tplSNItems[tsni2][2] ? C.primary : C.mutedFg, 16), 16, 12);
        place(tplSNRow, tx(tplSNItems[tsni2][1], tplSNItems[tsni2][2] ? 'Medium' : 'Regular', 14, tplSNItems[tsni2][2] ? C.primary : C.fg), 40, 12);
      }
      // Main content area
      var tplSMain = figma.createFrame(); tplSMain.resize(1040, 720); fill(tplSMain, C.muted); place(tplSet, tplSMain, 240, 0);
      place(tplSMain, tx('Profile Settings', 'Bold', 24, C.fg), 40, 40);
      place(tplSMain, tx('Manage your personal account details', 'Regular', 14, C.mutedFg), 40, 76);
      var tplSCard = figma.createFrame(); tplSCard.resize(960, 340); fill(tplSCard, C.card); stroke(tplSCard, C.border); tplSCard.cornerRadius = 12;
      place(tplSMain, tplSCard, 40, 116);
      var tplSFNames = [['Full Name', 'Ana García', 0], ['Email', 'ana@cesionbnk.com', 240], ['Phone', '+34 600 123 456', 0], ['Company', 'CESIONBNK SA', 240]];
      for (var tsfi = 0; tsfi < tplSFNames.length; tsfi++) {
        var tplSFRow = Math.floor(tsfi / 2);
        place(tplSCard, tx(tplSFNames[tsfi][0], 'Medium', 13, C.fg), 24 + tplSFNames[tsfi][2], 24 + tplSFRow * 100);
        var tplSFInp = figma.createFrame(); tplSFInp.resize(200, 36); fill(tplSFInp, C.bg); stroke(tplSFInp, C.input); tplSFInp.cornerRadius = RAD;
        place(tplSCard, tplSFInp, 24 + tplSFNames[tsfi][2], 46 + tplSFRow * 100);
        place(tplSFInp, tx(tplSFNames[tsfi][1], 'Regular', 13, C.fg), 12, 10);
      }
      var tplSSave = figma.createFrame(); tplSSave.resize(140, 36); fill(tplSSave, C.primary); tplSSave.cornerRadius = RAD;
      place(tplSCard, tplSSave, 24, 280);
      place(tplSSave, tx('Save changes', 'Medium', 13, C.primaryFg), 20, 9);
      console.log('[OK] Template: Settings Page');
    } catch (e) { console.error('[FAIL] Template Settings: ' + e.message); }
    tplY += 800;

    // ── T5: Detail / Form Page (1280×720) ──
    try {
      tplLabel(pTemplates, 'Detail / Form Page', 60, tplY);
      var tplDet = figma.createFrame(); tplDet.name = 'Detail Form Page'; tplDet.resize(1280, 720); fill(tplDet, C.muted);
      pTemplates.appendChild(tplDet); tplDet.x = 60; tplDet.y = tplY + 50;

      // Left sidebar
      var tplDetSide = rect(tplDet, 0, 0, 220, 720, C.bg, C.border);
      place(tplDetSide, tx('Navigation', 'Bold', 12, C.mutedFg), 16, 16);
      var tplDetNavItems = ['Dashboard', 'Invoices', 'Clients', 'Reports', 'Settings'];
      for (var tdi = 0; tdi < tplDetNavItems.length; tdi++) {
        var tplDetNav = rect(tplDetSide, 8, 44 + tdi * 40, 204, 34, tdi === 1 ? C.primary : null, null, 6);
        place(tplDetNav, tx(tplDetNavItems[tdi], 'Medium', 13, tdi === 1 ? C.primaryFg : C.fg), 12, 8);
      }

      // Main content area
      var tplDetMain = rect(tplDet, 240, 0, 1040, 720, C.bg);
      // Header
      var tplDetHdr = rect(tplDetMain, 0, 0, 1040, 56, C.bg, C.border);
      place(tplDetHdr, tx('Invoice #INV-2025-0042', 'Bold', 18, C.fg), 24, 16);
      var tplDetBadge = rect(tplDetHdr, 320, 14, 72, 28, C.successSubtle, null, 14);
      place(tplDetBadge, tx('Paid', 'Medium', 12, C.success), 14, 6);
      var tplDetEditBtn = rect(tplDetHdr, 820, 12, 100, 32, C.bg, C.border, 6);
      place(tplDetEditBtn, tx('Edit', 'Medium', 13, C.fg), 32, 7);
      var tplDetDelBtn = rect(tplDetHdr, 932, 12, 100, 32, C.destructive, null, 6);
      place(tplDetDelBtn, tx('Delete', 'Medium', 13, C.primaryFg), 26, 7);

      // Content columns
      var tplDetLeft = rect(tplDetMain, 24, 80, 620, 540, C.bg, C.border, 8);
      place(tplDetLeft, tx('Invoice Details', 'SemiBold', 15, C.fg), 20, 16);
      // Field rows
      var tplDetFields = [
        ['Client', 'Acme Corporation'],
        ['Issue Date', 'March 1, 2025'],
        ['Due Date', 'March 31, 2025'],
        ['Amount', '$4,850.00'],
        ['Tax (16%)', '$776.00'],
        ['Total', '$5,626.00'],
      ];
      for (var tdfi = 0; tdfi < tplDetFields.length; tdfi++) {
        var tplDFRow = rect(tplDetLeft, 0, 52 + tdfi * 48, 620, 1, C.border);
        place(tplDetLeft, tx(tplDetFields[tdfi][0], 'Regular', 13, C.mutedFg), 20, 60 + tdfi * 48);
        place(tplDetLeft, tx(tplDetFields[tdfi][1], 'Medium', 13, C.fg), 200, 60 + tdfi * 48);
      }

      // Notes area
      var tplDetNotes = rect(tplDetLeft, 20, 350, 580, 100, C.bg, C.border, 6);
      place(tplDetNotes, tx('Notes: Payment via bank transfer. Reference: CBK-2025-Q1.', 'Regular', 12, C.mutedFg), 12, 12);

      // Right panel
      var tplDetRight = rect(tplDetMain, 660, 80, 356, 540, C.bg, C.border, 8);
      place(tplDetRight, tx('Line Items', 'SemiBold', 15, C.fg), 20, 16);
      var tplDetItems = [
        ['Design Services', '$2,400'],
        ['Development (40h)', '$1,600'],
        ['QA Testing (10h)', '$450'],
        ['Project Management', '$400'],
      ];
      for (var tdii = 0; tdii < tplDetItems.length; tdii++) {
        rect(tplDetRight, 0, 52 + tdii * 52, 356, 1, C.border);
        place(tplDetRight, tx(tplDetItems[tdii][0], 'Regular', 13, C.fg), 20, 60 + tdii * 52);
        place(tplDetRight, tx(tplDetItems[tdii][1], 'Medium', 13, C.fg), 280, 60 + tdii * 52);
      }
      // Total row
      var tplDetTotalRow = rect(tplDetRight, 0, 265, 356, 48, C.muted);
      place(tplDetTotalRow, tx('Total', 'Bold', 14, C.fg), 20, 14);
      place(tplDetTotalRow, tx('$5,626.00', 'Bold', 14, C.fg), 272, 14);

      // Activity feed
      var tplDetActivity = rect(tplDetRight, 20, 340, 316, 160, C.bg, C.border, 6);
      place(tplDetActivity, tx('Activity', 'SemiBold', 13, C.fg), 12, 10);
      var tplActItems = ['Invoice created · Mar 1', 'Email sent to client · Mar 2', 'Payment received · Mar 15'];
      for (var tai = 0; tai < tplActItems.length; tai++) {
        var tplActDot = rect(tplDetActivity, 12, 36 + tai * 32, 6, 6, C.primary, null, 3);
        place(tplDetActivity, tx(tplActItems[tai], 'Regular', 11, C.mutedFg), 24, 33 + tai * 32);
      }

      console.log('[OK] Template: Detail Form Page');
    } catch (e) { console.error('[FAIL] Template Detail: ' + e.message); }
    tplY += 800;

    // ── T6: Empty / Error States Page (1280×720) ──
    try {
      tplLabel(pTemplates, 'Empty & Error States', 60, tplY);
      var tplEmp = figma.createFrame(); tplEmp.name = 'Empty Error States'; tplEmp.resize(1280, 720); fill(tplEmp, C.muted);
      pTemplates.appendChild(tplEmp); tplEmp.x = 60; tplEmp.y = tplY + 50;

      // Header bar
      var tplEmpHdr = rect(tplEmp, 0, 0, 1280, 56, C.bg, C.border);
      place(tplEmpHdr, tx('Empty & Error States', 'Bold', 18, C.fg), 24, 16);

      // ── Card 1: Empty List ──
      var tplEc1 = rect(tplEmp, 24, 72, 380, 280, C.bg, C.border, 8);
      place(tplEc1, tx('Empty List', 'SemiBold', 13, C.mutedFg), 20, 16);
      // Icon circle
      var tplEc1Ico = rect(tplEc1, 130, 60, 120, 120, C.muted, null, 60);
      place(tplEc1Ico, tx('☁', 'Regular', 40, C.mutedFg), 36, 36);
      place(tplEc1, tx('No items yet', 'Bold', 16, C.fg), 130, 192);
      place(tplEc1, tx('Add your first item to get started.', 'Regular', 12, C.mutedFg), 75, 216);
      var tplEc1Btn = rect(tplEc1, 120, 244, 140, 32, C.primary, null, 6);
      place(tplEc1Btn, tx('+ Add Item', 'Medium', 13, C.primaryFg), 24, 7);

      // ── Card 2: No Results (Search) ──
      var tplEc2 = rect(tplEmp, 428, 72, 380, 280, C.bg, C.border, 8);
      place(tplEc2, tx('No Search Results', 'SemiBold', 13, C.mutedFg), 20, 16);
      var tplEc2Ico = rect(tplEc2, 130, 60, 120, 120, C.muted, null, 60);
      place(tplEc2Ico, tx('🔍', 'Regular', 40, C.mutedFg), 36, 36);
      place(tplEc2, tx('No results found', 'Bold', 16, C.fg), 120, 192);
      place(tplEc2, tx('Try adjusting your search criteria.', 'Regular', 12, C.mutedFg), 83, 216);
      var tplEc2Btn = rect(tplEc2, 110, 244, 160, 32, C.bg, C.border, 6);
      place(tplEc2Btn, tx('Clear search', 'Medium', 13, C.fg), 30, 7);

      // ── Card 3: 404 Not Found ──
      var tplEc3 = rect(tplEmp, 832, 72, 380, 280, C.bg, C.border, 8);
      place(tplEc3, tx('404 Not Found', 'SemiBold', 13, C.mutedFg), 20, 16);
      place(tplEc3, tx('404', 'Bold', 56, C.border), 138, 44);
      place(tplEc3, tx('Page not found', 'Bold', 16, C.fg), 122, 120);
      place(tplEc3, tx("The page you're looking for doesn't exist.", 'Regular', 12, C.mutedFg), 50, 146);
      var tplEc3Btn = rect(tplEc3, 100, 200, 180, 32, C.primary, null, 6);
      place(tplEc3Btn, tx('Go to Dashboard', 'Medium', 13, C.primaryFg), 22, 7);

      // ── Card 4: 500 Server Error ──
      var tplEc4 = rect(tplEmp, 24, 380, 380, 280, C.bg, C.border, 8);
      place(tplEc4, tx('500 Server Error', 'SemiBold', 13, C.mutedFg), 20, 16);
      place(tplEc4, tx('500', 'Bold', 56, C.destructiveSubtle), 138, 44);
      place(tplEc4, tx('Something went wrong', 'Bold', 16, C.fg), 102, 120);
      place(tplEc4, tx('Our servers are having issues. Try again.', 'Regular', 12, C.mutedFg), 56, 146);
      var tplEc4Btn = rect(tplEc4, 115, 200, 150, 32, C.bg, C.border, 6);
      place(tplEc4Btn, tx('Retry', 'Medium', 13, C.fg), 52, 7);

      // ── Card 5: Network Error ──
      var tplEc5 = rect(tplEmp, 428, 380, 380, 280, C.bg, C.border, 8);
      place(tplEc5, tx('Network Error', 'SemiBold', 13, C.mutedFg), 20, 16);
      var tplEc5Ico = rect(tplEc5, 130, 60, 120, 120, C.destructiveSubtle, null, 60);
      place(tplEc5Ico, tx('⚠', 'Regular', 44, C.destructive), 38, 34);
      place(tplEc5, tx('Connection failed', 'Bold', 16, C.fg), 112, 192);
      place(tplEc5, tx('Check your connection and retry.', 'Regular', 12, C.mutedFg), 92, 216);
      var tplEc5Btn = rect(tplEc5, 120, 244, 140, 32, C.destructive, null, 6);
      place(tplEc5Btn, tx('Try again', 'Medium', 13, C.primaryFg), 28, 7);

      // ── Card 6: Permission Denied ──
      var tplEc6 = rect(tplEmp, 832, 380, 380, 280, C.bg, C.border, 8);
      place(tplEc6, tx('Permission Denied', 'SemiBold', 13, C.mutedFg), 20, 16);
      var tplEc6Ico = rect(tplEc6, 130, 60, 120, 120, C.warningSubtle, null, 60);
      place(tplEc6Ico, tx('🔒', 'Regular', 44, C.warning), 38, 34);
      place(tplEc6, tx('Access restricted', 'Bold', 16, C.fg), 112, 192);
      place(tplEc6, tx("You don't have permission to view this.", 'Regular', 12, C.mutedFg), 50, 216);
      var tplEc6Btn = rect(tplEc6, 115, 244, 150, 32, C.bg, C.border, 6);
      place(tplEc6Btn, tx('Request access', 'Medium', 13, C.fg), 22, 7);

      console.log('[OK] Template: Empty Error States');
    } catch (e) { console.error('[FAIL] Template Empty Error: ' + e.message); }
    tplY += 800;

    // ── T7: App Layout (1280×800) ──
    try {
      tplLabel(pTemplates, 'App Layout', 60, tplY);
      var tplApp = figma.createFrame(); tplApp.name = 'App Layout'; tplApp.resize(1280, 800); fill(tplApp, C.muted);
      pTemplates.appendChild(tplApp); tplApp.x = 60; tplApp.y = tplY + 50;
      // Top nav bar
      var tplAppNav = rect(tplApp, 0, 0, 1280, 56, C.bg, C.border);
      place(tplAppNav, tx('CESIONBNK', 'Bold', 16, C.primary), 24, 16);
      var tplAppNavLinks = ['Dashboard', 'Invoices', 'Clients', 'Reports'];
      for (var tali = 0; tali < tplAppNavLinks.length; tali++) {
        var tplANL = rect(tplAppNav, 200 + tali * 100, 12, 90, 32, tali === 0 ? C.accent : null, null, 6);
        place(tplANL, tx(tplAppNavLinks[tali], 'Medium', 13, tali === 0 ? C.fg : C.mutedFg), tali === 0 ? 12 : 12, 7);
      }
      var tplAppUser = rect(tplAppNav, 1180, 8, 80, 40, C.muted, C.border, 20);
      place(tplAppUser, tx('JD ▾', 'Medium', 13, C.fg), 16, 11);
      // Left sidebar
      var tplAppSide = rect(tplApp, 0, 56, 220, 744, C.bg, C.border);
      var tplAppSideItems = ['Overview', 'Invoices', 'Clients', 'Analytics', 'Settings'];
      for (var tasi = 0; tasi < tplAppSideItems.length; tasi++) {
        var tplASI = rect(tplAppSide, 12, 16 + tasi * 44, 196, 36, tasi === 0 ? C.primary : null, null, 6);
        place(tplASI, tx(tplAppSideItems[tasi], 'Medium', 13, tasi === 0 ? C.primaryFg : C.fg), 14, 8);
      }
      // Main content
      var tplAppMain = rect(tplApp, 220, 56, 1060, 744, C.muted);
      // Content header
      var tplAppCHdr = rect(tplAppMain, 0, 0, 1060, 64, C.bg, C.border);
      place(tplAppCHdr, tx('Dashboard Overview', 'Bold', 20, C.fg), 28, 18);
      var tplAppCBtn = rect(tplAppCHdr, 920, 16, 120, 32, C.primary, null, RAD);
      place(tplAppCBtn, tx('+ New Invoice', 'Medium', 12, C.primaryFg), 12, 8);
      // KPI cards
      var tplKpiW = 230; var tplKpiColors = [C.primary, C.success, C.warning, C.destructive];
      var tplKpiLabels = ['Revenue', 'Paid', 'Pending', 'Overdue'];
      var tplKpiVals = ['$48,295', '$32,140', '$12,800', '$3,355'];
      for (var tki = 0; tki < 4; tki++) {
        var tplKCard = rect(tplAppMain, 24 + tki * (tplKpiW + 16), 84, tplKpiW, 100, C.bg, C.border, 8);
        var tplKAccent = rect(tplKCard, 0, 0, 4, 100, tplKpiColors[tki], null);
        place(tplKCard, tx(tplKpiLabels[tki], 'Regular', 12, C.mutedFg), 16, 16);
        place(tplKCard, tx(tplKpiVals[tki], 'Bold', 22, C.fg), 16, 38);
      }
      // Table area
      var tplAppTbl = rect(tplAppMain, 24, 204, 1012, 320, C.bg, C.border, 8);
      place(tplAppTbl, tx('Recent Invoices', 'SemiBold', 15, C.fg), 20, 16);
      var tplATCols = ['#', 'Client', 'Date', 'Amount', 'Status'];
      var tplATColX = [20, 80, 300, 480, 620];
      for (var tatc = 0; tatc < tplATCols.length; tatc++) {
        place(tplAppTbl, tx(tplATCols[tatc], 'Medium', 11, C.mutedFg), tplATColX[tatc], 52);
      }
      rect(tplAppTbl, 0, 68, 1012, 1, C.border);
      var tplATRows = [['#042', 'Acme Corp', 'Mar 1', '$5,626', 'Paid'], ['#041', 'TechCo', 'Feb 28', '$2,100', 'Pending'], ['#040', 'StartupX', 'Feb 25', '$890', 'Overdue']];
      var tplATStatusColors = { 'Paid': C.success, 'Pending': C.warning, 'Overdue': C.destructive };
      for (var tatr = 0; tatr < tplATRows.length; tatr++) {
        for (var tatcv = 0; tatcv < tplATRows[tatr].length; tatcv++) {
          var isStatus = tatcv === 4;
          place(tplAppTbl, tx(tplATRows[tatr][tatcv], 'Regular', 13, isStatus ? (tplATStatusColors[tplATRows[tatr][tatcv]] || C.fg) : C.fg), tplATColX[tatcv], 80 + tatr * 44);
        }
        if (tatr < tplATRows.length - 1) rect(tplAppTbl, 0, 112 + tatr * 44, 1012, 1, C.border);
      }
      // Right panel
      var tplAppRight = rect(tplAppMain, 760, 540, 276, 180, C.bg, C.border, 8);
      place(tplAppRight, tx('Notifications', 'SemiBold', 13, C.fg), 16, 12);
      var tplNotifData = ['Invoice #042 paid', 'New client: TechCo', 'Report ready'];
      for (var tni = 0; tni < tplNotifData.length; tni++) {
        var tplNotifDot = rect(tplAppRight, 16, 42 + tni * 36, 8, 8, C.primary, null, 4);
        place(tplAppRight, tx(tplNotifData[tni], 'Regular', 12, C.fg), 32, 40 + tni * 36);
      }
      console.log('[OK] Template: App Layout');
    } catch (e) { console.error('[FAIL] Template App Layout: ' + e.message); }
    tplY += 880;

    // ── T8: Grid Showcase (1280×720) ──
    try {
      tplLabel(pTemplates, 'Grid Showcase', 60, tplY);
      var tplGrid = figma.createFrame(); tplGrid.name = 'Grid Showcase'; tplGrid.resize(1280, 720); fill(tplGrid, C.muted);
      pTemplates.appendChild(tplGrid); tplGrid.x = 60; tplGrid.y = tplY + 50;
      // Title
      place(tplGrid, tx('Grid System — 12 Columns', 'Bold', 22, C.fg), 40, 24);
      place(tplGrid, tx('Responsive grid with gutter: 16px, margin: 40px', 'Regular', 13, C.mutedFg), 40, 56);
      // 12-col grid guide at top
      var tplGridColW = 80; var tplGridGut = 16; var tplGridMargin = 40;
      for (var tgc = 0; tgc < 12; tgc++) {
        var tplGCol = rect(tplGrid, tplGridMargin + tgc * (tplGridColW + tplGridGut), 90, tplGridColW, 24, C.infoSubtle);
        place(tplGCol, tx(String(tgc + 1), 'Regular', 9, C.info), tplGridColW / 2 - 4, 5);
      }
      // Layout examples
      place(tplGrid, tx('Full Width (12 cols)', 'Medium', 12, C.mutedFg), 40, 130);
      rect(tplGrid, 40, 150, 1200, 60, C.bg, C.border, 6);
      place(tplGrid, tx('col-span-12', 'Regular', 12, C.mutedFg), 540, 172);

      place(tplGrid, tx('Half + Half (6 + 6)', 'Medium', 12, C.mutedFg), 40, 228);
      rect(tplGrid, 40, 248, 584, 60, C.bg, C.border, 6);
      place(tplGrid, tx('col-span-6', 'Regular', 12, C.mutedFg), 264, 270);
      rect(tplGrid, 640, 248, 600, 60, C.bg, C.border, 6);
      place(tplGrid, tx('col-span-6', 'Regular', 12, C.mutedFg), 880, 270);

      place(tplGrid, tx('Sidebar + Content (3 + 9)', 'Medium', 12, C.mutedFg), 40, 326);
      rect(tplGrid, 40, 346, 280, 60, C.bg, C.border, 6);
      place(tplGrid, tx('col-span-3', 'Regular', 12, C.mutedFg), 106, 368);
      rect(tplGrid, 336, 346, 904, 60, C.bg, C.border, 6);
      place(tplGrid, tx('col-span-9', 'Regular', 12, C.mutedFg), 762, 368);

      place(tplGrid, tx('3-Column (4 + 4 + 4)', 'Medium', 12, C.mutedFg), 40, 424);
      for (var tgc3 = 0; tgc3 < 3; tgc3++) {
        rect(tplGrid, 40 + tgc3 * 408, 444, 392, 60, C.bg, C.border, 6);
        place(tplGrid, tx('col-span-4', 'Regular', 12, C.mutedFg), 40 + tgc3 * 408 + 138, 466);
      }

      place(tplGrid, tx('4-Column (3 + 3 + 3 + 3)', 'Medium', 12, C.mutedFg), 40, 522);
      for (var tgc4 = 0; tgc4 < 4; tgc4++) {
        rect(tplGrid, 40 + tgc4 * 306, 542, 290, 60, C.bg, C.border, 6);
        place(tplGrid, tx('col-3', 'Regular', 12, C.mutedFg), 40 + tgc4 * 306 + 104, 564);
      }

      place(tplGrid, tx('Auto-fit Cards (minmax 240px)', 'Medium', 12, C.mutedFg), 40, 620);
      var tplAutoWidths = [248, 248, 248, 248];
      for (var tac = 0; tac < 4; tac++) {
        var tplACard = rect(tplGrid, 40 + tac * 304, 642, 288, 64, C.bg, C.border, 8);
        place(tplACard, tx('Card ' + (tac + 1), 'SemiBold', 14, C.fg), 20, 20);
        place(tplACard, tx('auto-fit · minmax(240px, 1fr)', 'Regular', 11, C.mutedFg), 20, 40);
      }
      console.log('[OK] Template: Grid Showcase');
    } catch (e) { console.error('[FAIL] Template Grid Showcase: ' + e.message); }
    tplY += 800;

    // ── T9: Layout Showcase (1280×800) ──
    try {
      tplLabel(pTemplates, 'Layout Showcase', 60, tplY);
      var tplLay = figma.createFrame(); tplLay.name = 'Layout Showcase'; tplLay.resize(1280, 800); fill(tplLay, C.muted);
      pTemplates.appendChild(tplLay); tplLay.x = 60; tplLay.y = tplY + 50;
      place(tplLay, tx('Layout Patterns', 'Bold', 22, C.fg), 40, 24);
      place(tplLay, tx('Common layout compositions for web applications', 'Regular', 13, C.mutedFg), 40, 56);
      // Layout 1: Classic Admin (top nav + sidebar + content)
      place(tplLay, tx('Classic Admin Layout', 'SemiBold', 13, C.fg), 40, 88);
      var tplLayA = rect(tplLay, 40, 110, 580, 280, C.border, C.border, 8);
      rect(tplLayA, 0, 0, 580, 40, C.primary);
      place(tplLayA, tx('Top Nav', 'Regular', 10, C.primaryFg), 240, 12);
      rect(tplLayA, 0, 40, 120, 240, C.fg);
      place(tplLayA, tx('Sidebar', 'Regular', 10, C.mutedFg), 42, 108);
      rect(tplLayA, 120, 40, 460, 240, C.bg);
      place(tplLayA, tx('Main Content Area', 'Regular', 12, C.mutedFg), 170, 108);
      // Layout 2: Centered Content
      place(tplLay, tx('Centered Content Layout', 'SemiBold', 13, C.fg), 660, 88);
      var tplLayB = rect(tplLay, 660, 110, 580, 280, C.border, C.border, 8);
      rect(tplLayB, 0, 0, 580, 40, C.primary);
      place(tplLayB, tx('Nav', 'Regular', 10, C.primaryFg), 270, 12);
      rect(tplLayB, 120, 56, 340, 212, C.primaryFg, C.border, 6);
      place(tplLayB, tx('max-w-3xl · centered', 'Regular', 11, C.mutedFg), 158, 145);
      // Layout 3: Full Bleed / Landing
      place(tplLay, tx('Full Bleed / Landing', 'SemiBold', 13, C.fg), 40, 408);
      var tplLayC = rect(tplLay, 40, 428, 580, 280, C.border, C.border, 8);
      rect(tplLayC, 0, 0, 580, 40, C.primary);
      place(tplLayC, tx('Nav', 'Regular', 10, C.primaryFg), 270, 12);
      rect(tplLayC, 0, 40, 580, 140, C.secondary);
      place(tplLayC, tx('Hero Section (full width)', 'Regular', 12, C.primaryFg), 188, 103);
      rect(tplLayC, 0, 180, 580, 100, C.bg);
      place(tplLayC, tx('Content · Content · Content', 'Regular', 11, C.mutedFg), 172, 223);
      // Layout 4: Dashboard mosaic
      place(tplLay, tx('Dashboard Mosaic', 'SemiBold', 13, C.fg), 660, 408);
      var tplLayD = rect(tplLay, 660, 428, 580, 280, C.border, C.border, 8);
      rect(tplLayD, 0, 0, 580, 40, C.primary);
      place(tplLayD, tx('Nav', 'Regular', 10, C.primaryFg), 270, 12);
      // KPI row
      for (var tlki = 0; tlki < 3; tlki++) {
        rect(tplLayD, 8 + tlki * 192, 48, 180, 60, C.primaryFg, C.border, 4);
        place(tplLayD, tx('KPI ' + (tlki + 1), 'Regular', 11, C.mutedFg), 8 + tlki * 192 + 64, 72);
      }
      // Main + side
      rect(tplLayD, 8, 116, 380, 156, C.primaryFg, C.border, 4);
      place(tplLayD, tx('Chart / Table', 'Regular', 11, C.mutedFg), 148, 186);
      rect(tplLayD, 396, 116, 176, 156, C.primaryFg, C.border, 4);
      place(tplLayD, tx('Widget', 'Regular', 11, C.mutedFg), 460, 186);
      console.log('[OK] Template: Layout Showcase');
    } catch (e) { console.error('[FAIL] Template Layout Showcase: ' + e.message); }
    tplY += 880;

    console.log('[OK] Templates (9 wireframes with absolute layout)');
  }

  // ══════════════════════════════════════════════════════════════════════
  // DOCUMENTACION PAGE — removed
  // ══════════════════════════════════════════════════════════════════════
  if (false) {
    console.log('Building Documentacion...');
    var docRoot = col(24);
    docRoot.name = 'Documentacion'; docRoot.paddingLeft = docRoot.paddingRight = 60;
    docRoot.paddingTop = docRoot.paddingBottom = 60; fill(docRoot, C.bg);

    docRoot.appendChild(tx('DOCUMENTACION', 'Bold', 48, C.fg));
    docRoot.appendChild(tx('Design System usage guide and specifications — CESIONBNK', 'Regular', 16, C.mutedFg));

    // Section: Color System
    var docColor = col(12);
    docColor.paddingLeft = docColor.paddingRight = 24; docColor.paddingTop = docColor.paddingBottom = 20;
    fill(docColor, C.card); stroke(docColor, C.border); docColor.cornerRadius = 12;
    docColor.appendChild(tx('Color System', 'Bold', 20, C.cardFg));
    docColor.appendChild(tx('Primary: #374151 (Gray 700) — used for main actions, headers, and emphasis.', 'Regular', 14, C.fg));
    docColor.appendChild(tx('Secondary: #796eff (Purple) — used for accents, links, and secondary actions.', 'Regular', 14, C.fg));
    docColor.appendChild(tx('Semantic: Success (#22c55e), Warning (#f59e0b), Destructive (#ef4444), Info (#3b82f6).', 'Regular', 14, C.fg));
    docRoot.appendChild(docColor);

    // Section: Typography
    var docType = col(12);
    docType.paddingLeft = docType.paddingRight = 24; docType.paddingTop = docType.paddingBottom = 20;
    fill(docType, C.card); stroke(docType, C.border); docType.cornerRadius = 12;
    docType.appendChild(tx('Typography', 'Bold', 20, C.cardFg));
    docType.appendChild(tx('Primary font: Gotham (fallback: Inter, system-ui).', 'Regular', 14, C.fg));
    docType.appendChild(tx('Scale: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (32px).', 'Regular', 14, C.fg));
    docType.appendChild(tx('Weights: Regular (400), Medium (500), SemiBold (600), Bold (700).', 'Regular', 14, C.fg));
    docRoot.appendChild(docType);

    // Section: Spacing & Radius
    var docSpace = col(12);
    docSpace.paddingLeft = docSpace.paddingRight = 24; docSpace.paddingTop = docSpace.paddingBottom = 20;
    fill(docSpace, C.card); stroke(docSpace, C.border); docSpace.cornerRadius = 12;
    docSpace.appendChild(tx('Spacing & Radius', 'Bold', 20, C.cardFg));
    docSpace.appendChild(tx('Border radius: 10px (0.625rem) — applied to buttons, inputs, cards, dialogs.', 'Regular', 14, C.fg));
    docSpace.appendChild(tx('Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.', 'Regular', 14, C.fg));
    docSpace.appendChild(tx('Elevation: 4 levels (shadow-elevation-1 to shadow-elevation-4).', 'Regular', 14, C.fg));
    docRoot.appendChild(docSpace);

    // Section: Component Usage
    var docUsage = col(12);
    docUsage.paddingLeft = docUsage.paddingRight = 24; docUsage.paddingTop = docUsage.paddingBottom = 20;
    fill(docUsage, C.card); stroke(docUsage, C.border); docUsage.cornerRadius = 12;
    docUsage.appendChild(tx('Component Usage', 'Bold', 20, C.cardFg));
    docUsage.appendChild(tx('Buttons: 5 variants (default, secondary, outline, ghost, destructive) x 4 sizes x 3 states.', 'Regular', 14, C.fg));
    docUsage.appendChild(tx('Icons: Lucide icon library. Import externally or use built-in ComponentSet.', 'Regular', 14, C.fg));
    docUsage.appendChild(tx('Instance Swap: Select icon instance → Properties panel → dropdown to pick icon.', 'Regular', 14, C.fg));
    docUsage.appendChild(tx('Boolean switches: Toggle "Show left/right icon" to control icon visibility.', 'Regular', 14, C.fg));
    docRoot.appendChild(docUsage);

    // Section: Naming Convention
    var docNaming = col(12);
    docNaming.paddingLeft = docNaming.paddingRight = 24; docNaming.paddingTop = docNaming.paddingBottom = 20;
    fill(docNaming, C.card); stroke(docNaming, C.border); docNaming.cornerRadius = 12;
    docNaming.appendChild(tx('Naming Convention', 'Bold', 20, C.cardFg));
    docNaming.appendChild(tx('Files: kebab-case (button.tsx, stat-card.tsx).', 'Regular', 14, C.fg));
    docNaming.appendChild(tx('React exports: PascalCase (Button, StatCard).', 'Regular', 14, C.fg));
    docNaming.appendChild(tx('Figma layers: ComponentName/Variant=value, Size=value, State=value.', 'Regular', 14, C.fg));
    docRoot.appendChild(docNaming);

    pDocs.appendChild(docRoot);
    console.log('[OK] Documentacion');
  }

  // ══════════════════════════════════════════════════════════════════════
  // ARCHIVE PAGE — removed
  // ══════════════════════════════════════════════════════════════════════
  if (false) {
    console.log('Building Archive...');
    var archRoot = col(24);
    archRoot.name = 'Archive'; archRoot.paddingLeft = archRoot.paddingRight = 60;
    archRoot.paddingTop = archRoot.paddingBottom = 60; fill(archRoot, C.bg);

    archRoot.appendChild(tx('ARCHIVE', 'Bold', 48, C.fg));
    archRoot.appendChild(tx('Deprecated and archived components — do not use in new designs', 'Regular', 16, C.mutedFg));

    // Info card
    var archInfo = col(12);
    archInfo.paddingLeft = archInfo.paddingRight = 24; archInfo.paddingTop = archInfo.paddingBottom = 20;
    fill(archInfo, C.warningSubtle); stroke(archInfo, C.warning); archInfo.cornerRadius = 12;
    archInfo.appendChild(tx('This page is for archived components', 'Bold', 16, C.warning));
    var archDesc = tx('Components moved here are deprecated and should not be used in new designs. They are kept for reference and backwards compatibility. If you need to use a component from this page, check with the design team first.', 'Regular', 14, C.warning);
    archDesc.resize(500, 1); archDesc.textAutoResize = 'HEIGHT';
    archInfo.appendChild(archDesc);
    archRoot.appendChild(archInfo);

    pArchive.appendChild(archRoot);
    console.log('[OK] Archive');
  }

  // ══════════════════════════════════════════════════════════════════════
  // VARIABLE BINDING — Bind component fills/strokes to Figma Variables
  // This enables Light/Dark mode switching via Variables panel → Edit mode
  // ══════════════════════════════════════════════════════════════════════
  try {
    if (Object.keys(figmaVars).length > 0) {
      console.log('Binding Figma Variables to component colors...');
      function _toHex2(n) { var h = Math.round(n * 255).toString(16); return h.length < 2 ? '0' + h : h; }
      function _rgbHex(r, g, b) { return '#' + _toHex2(r) + _toHex2(g) + _toHex2(b); }

      // Map hex colors to Figma Variables for light/dark mode switching
      var _hv = {};
      _hv[C.primaryFg]     = figmaVars['Color/Surface/Background'];
      _hv[C.primary]     = figmaVars['Color/Brand/Primary'];
      _hv[C.secondary]   = figmaVars['Color/Brand/Secondary'];
      _hv[C.muted]       = figmaVars['Color/Surface/Muted'];
      _hv[C.mutedFg]     = figmaVars['Color/Surface/Muted FG'];
      _hv[C.border]      = figmaVars['Color/Surface/Border'];
      _hv[C.fg]          = figmaVars['Color/Surface/Foreground'];
      _hv[C.destructive] = figmaVars['Color/Semantic/Destructive'];
      _hv[C.success]     = figmaVars['Color/Semantic/Success'];
      _hv[C.warning]     = figmaVars['Color/Semantic/Warning'];
      _hv[C.info]        = figmaVars['Color/Semantic/Info'];

      function _bindNode(node) {
        if (!node || node.type === 'DOCUMENT' || node.type === 'PAGE') return;
        // Bind fills
        if (node.fills && node.fills.length) {
          try {
            var nf = []; var fc = false;
            for (var _fi = 0; _fi < node.fills.length; _fi++) {
              var _p = node.fills[_fi];
              if (_p.type === 'SOLID' && _p.color) {
                var _h = _rgbHex(_p.color.r, _p.color.g, _p.color.b);
                if (_hv[_h]) { nf.push(figma.variables.setBoundVariableForPaint(_p, 'color', _hv[_h])); fc = true; continue; }
              }
              nf.push(_p);
            }
            if (fc) node.fills = nf;
          } catch (e) {}
        }
        // Bind strokes
        if (node.strokes && node.strokes.length) {
          try {
            var ns = []; var sc = false;
            for (var _si = 0; _si < node.strokes.length; _si++) {
              var _ps = node.strokes[_si];
              if (_ps.type === 'SOLID' && _ps.color) {
                var _hs = _rgbHex(_ps.color.r, _ps.color.g, _ps.color.b);
                if (_hv[_hs]) { ns.push(figma.variables.setBoundVariableForPaint(_ps, 'color', _hv[_hs])); sc = true; continue; }
              }
              ns.push(_ps);
            }
            if (sc) node.strokes = ns;
          } catch (e) {}
        }
        if ('children' in node) {
          for (var _ci = 0; _ci < node.children.length; _ci++) _bindNode(node.children[_ci]);
        }
      }

      // Apply to Primitives, Components, Advanced (skip Foundation/Cover/Docs which have intentional raw colors)
      var _bindTargets = [p1, p2, p5];
      var _boundCount = 0;
      for (var _bpi = 0; _bpi < _bindTargets.length; _bpi++) {
        for (var _bni = 0; _bni < _bindTargets[_bpi].children.length; _bni++) {
          _bindNode(_bindTargets[_bpi].children[_bni]);
          _boundCount++;
        }
      }
      console.log('[OK] Variable bindings applied — ' + _boundCount + ' top-level nodes traversed');
    }
  } catch (e) { console.error('[FAIL] Variable binding: ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // CLEANUP — Remove orphan nodes created during build from currentPage
  // Only removes nodes NOT in the pre-existing snapshot (safe for user content)
  // ══════════════════════════════════════════════════════════════════════
  try {
    var orphans = figma.currentPage.children.slice(); // snapshot to avoid mutation
    var removed = 0;
    for (var oi = 0; oi < orphans.length; oi++) {
      if (!_preExistingIds[orphans[oi].id]) {
        try { orphans[oi].remove(); removed++; } catch (e) {}
      }
    }
    if (removed > 0) console.log('[CLEANUP] Removed ' + removed + ' orphan node(s) from currentPage');
  } catch (e) { console.error('[CLEANUP FAIL] ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // GUARD — Remove empty frames stuck at height ≤ 1 (left by mid-build errors)
  // Skips intentional separators (frames with a fill = they are border lines)
  // ══════════════════════════════════════════════════════════════════════
  try {
    var _guardRemoved = 0;
    function _guardHeight(node) {
      if (
        (node.type === 'FRAME' || node.type === 'COMPONENT') &&
        node.height <= 1 &&
        node.children.length === 0
      ) {
        var hasFill = node.fills && node.fills.length > 0 &&
          node.fills.some(function(f) { return f.visible !== false; });
        if (!hasFill) {
          try { node.remove(); _guardRemoved++; return; } catch (e) {}
        }
      }
      if ('children' in node) {
        var _gc = node.children.slice();
        for (var _gi = 0; _gi < _gc.length; _gi++) _guardHeight(_gc[_gi]);
      }
    }
    var _guardRoots = [p1, p2, p3, p5];
    for (var _gri = 0; _gri < _guardRoots.length; _gri++) {
      try { _guardHeight(_guardRoots[_gri]); } catch (e) {}
    }
    if (_guardRemoved > 0) console.log('[GUARD] Removed ' + _guardRemoved + ' empty frame(s) with height ≤ 1');
  } catch (e) { console.error('[GUARD FAIL] ' + e.message); }

  // ══════════════════════════════════════════════════════════════════════
  // DONE
  // ══════════════════════════════════════════════════════════════════════
  var msg = 'DSM v8.0.0 | 7 pages (Cover · Design System · Primitives · Components · Patterns · Advanced · Icons) | ' + nSets + ' sets | ' + nVars + ' variants | ' + iconNames.length + ' icons | Figma Variables (Light+Dark) | Tokens: caution, primary-soft, Spacing/24, Typography/2xs';
  console.log(msg);
  figma.closePlugin(msg);

})();

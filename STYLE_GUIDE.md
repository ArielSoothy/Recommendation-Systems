# UI Style Guide — Recommendation Systems Explorer

This document defines the visual and interaction guidelines to keep the site consistent with a minimal, Apple-like style.

## Design Principles
- Clarity over decoration. Minimal gradients, soft shadows, generous whitespace.
- Neutral palette with a single primary accent color.
- System typography and native controls feel.
- Smooth but subtle motion; respect reduced motion preferences.

## Color System (CSS Variables)
Use the variables below. Do not hardcode colors.

```css
:root {
  --bg: #f5f5f7;
  --text: #1d1d1f;
  --secondary-text: #3a3a3c;
  --card-bg: #ffffff;
  --border: #e5e5ea;
  --header-bg: #f2f2f7;
  --code-bg: #f5f5f7;
  --accent: #0a84ff;
  --accent-hover: #0071e3;
  --shadow: rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg: #1c1c1e;
  --text: #f5f5f7;
  --secondary-text: #d1d1d6;
  --card-bg: #2c2c2e;
  --border: #3a3a3c;
  --header-bg: #2c2c2e;
  --code-bg: #2c2c2e;
  --accent: #0a84ff;
  --accent-hover: #4aa3ff;
  --shadow: rgba(0,0,0,0.35);
}
```

## Typography
- Font stack: `-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
- Headings: medium weight, tight letter-spacing (-0.02em).
- Body: 16px-18px base; use `line-height: 1.6` or above for legibility.

## Components

### Navigation Pills (Tabs)
- Background: `var(--card-bg)`; Text: `var(--text)`; Border: `var(--border)`.
- Active: Background and border `var(--accent)`, Text: `#fff`.
- Hover: Background `var(--header-bg)` only, no color shifts.
- Keyboard accessible (role=tab, arrow key navigation, Enter/Space activation).

### Cards / Cells
- Background: `var(--card-bg)`; Border: `1px solid var(--border)`.
- Radius: 12-14px. Shadow: `0 1px 3px var(--shadow)`.
- Hover: subtle translateY(-2px) only.

### Code Blocks
- Container background: `var(--code-bg)` with border `var(--border)`.
- Header background: `var(--header-bg)` with bottom border.
- Syntax accent color: `var(--accent)` for keywords/functions.

### Buttons
- Primary: background `var(--accent)`, hover `var(--accent-hover)`, white text.
- Quiet buttons: background `var(--card-bg)`, border `var(--border)`, hover `var(--header-bg)`.
- Border radius: 10px.

### Term/Info Boxes
- Background: `var(--card-bg)`; Left border `4px solid var(--accent)`; Border `var(--border)`.

## Dark Mode
- Toggle is in the header with id `theme-toggle`. It updates `data-theme` on `<html>` and persists to `localStorage` under key `theme`.
- Respect variables; do not override with hard-coded dark colors.

## Motion & Accessibility
- Transitions no longer than 200ms; reduce effects under `prefers-reduced-motion: reduce`.
- All interactive elements must have focus states and appropriate ARIA attributes.
- Tabs: `role=tablist`, tabs `role=tab` with `aria-selected`, panels `role=tabpanel` with `aria-labelledby`.

## Do / Don’t
- Do: Use CSS variables; keep copy concise; ensure WCAG AA contrast.
- Don’t: Introduce bright gradients; add heavy drop shadows; rely solely on color to convey state.

## Implementation Notes
- All new styles must refer to variables from `:root` / `[data-theme="dark"]`.
- When adding components, mirror the structure already used in `index.html` (cards, tabs, code blocks) for consistency.
- If new libraries are introduced, ensure they inherit colors and fonts via CSS variables.



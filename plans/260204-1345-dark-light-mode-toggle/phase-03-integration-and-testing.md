# Phase 3: Integration and Testing

## Context
- Parent: [plan.md](./plan.md)
- Depends on: [Phase 1](./phase-01-css-light-mode-variables.md), [Phase 2](./phase-02-theme-toggle-component.md)

## Overview
- **Priority:** High
- **Status:** pending
- **Description:** Integrate toggle into Header and fix layout.tsx

## Key Insights

1. `app/layout.tsx` has `className="dark"` hardcoded - must remove
2. Header has desktop nav and mobile bottom sheet - add toggle to both
3. Need script in `<head>` to prevent flash of wrong theme

## Requirements

1. Remove hardcoded `dark` class from html
2. Add inline script to set theme before render
3. Add ThemeToggle to Header (desktop + mobile)
4. Update ambient background for light mode
5. Test all pages in both modes

## Architecture

**Anti-flash script** (in layout.tsx head):
```js
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();
```

## Related Code Files
- `app/layout.tsx` - Remove dark class, add script
- `components/Header.tsx` - Add ThemeToggle
- `app/page.tsx` - Verify light mode appearance
- `app/list/[id]/page.tsx` - Verify light mode
- `app/about/page.tsx` - Verify light mode

## Implementation Steps

### 1. Update layout.tsx
- Remove `className="dark"` from `<html>`
- Add `suppressHydrationWarning` to html (already present)
- Add inline script in `<head>` to prevent flash

### 2. Update Header.tsx
- Import ThemeToggle
- Add to desktop nav (after nav items)
- Add to mobile bottom sheet

### 3. Update Background Gradients
- Current: hardcoded `bg-indigo-500/20` orbs
- Light mode: use darker opacity or different colors

### 4. Component Adjustments (if needed)
- Check zinc-900 backgrounds → may need `dark:bg-zinc-900 bg-white`
- Check text colors → `dark:text-white text-zinc-900`

## Todo

- [ ] Remove hardcoded dark class from layout.tsx
- [ ] Add anti-flash inline script
- [ ] Import ThemeToggle in Header
- [ ] Add toggle to desktop nav
- [ ] Add toggle to mobile menu
- [ ] Update ambient background for light mode
- [ ] Test home page in light mode
- [ ] Test list page in light mode
- [ ] Test about page in light mode
- [ ] Run build to verify no errors

## Success Criteria
- No flash of wrong theme on page load
- Toggle visible in header (desktop + mobile)
- All pages look good in both modes
- Build passes

## Risk Assessment
- **Medium risk** - May need to adjust multiple components
- **Mitigation** - Use Tailwind dark: prefix for conditional styles

## Security Considerations
- Inline script uses only localStorage, no external data

# Phase 1: Add Light Mode CSS Variables

## Context
- Parent: [plan.md](./plan.md)
- File: `styles/index.css`

## Overview
- **Priority:** High
- **Status:** pending
- **Description:** Define CSS variables for light mode theme

## Key Insights

Current dark mode variables in `:root`:
```css
--bg-primary: #09090B;
--bg-secondary: #18181B;
--bg-elevated: #27272A;
--text-primary: #FAFAFA;
--text-secondary: #A1A1AA;
--text-muted: #52525B;
--border: rgba(255, 255, 255, 0.08);
```

Need light mode equivalents with proper contrast (WCAG AA 4.5:1).

## Requirements

1. Add `:root` (light mode default) variables
2. Move current dark values to `.dark` selector
3. Ensure body uses CSS variables
4. Add transition for smooth theme switch

## Architecture

```
:root {
  /* Light mode (default) */
  --bg-primary: #FFFFFF;
  --text-primary: #09090B;
  ...
}

.dark {
  /* Dark mode */
  --bg-primary: #09090B;
  --text-primary: #FAFAFA;
  ...
}
```

## Related Code Files
- `styles/index.css` - Main stylesheet

## Implementation Steps

1. Rename current `:root` variables to `.dark` selector
2. Create new `:root` with light mode colors:
   - `--bg-primary`: #FFFFFF (white)
   - `--bg-secondary`: #F4F4F5 (zinc-100)
   - `--bg-elevated`: #FAFAFA (zinc-50)
   - `--text-primary`: #09090B (zinc-950)
   - `--text-secondary`: #52525B (zinc-600)
   - `--text-muted`: #A1A1AA (zinc-400)
   - `--border`: rgba(0, 0, 0, 0.08)
3. Add `transition: background-color 0.3s, color 0.3s` to body
4. Update scrollbar colors for light mode

## Todo

- [ ] Create light mode CSS variables
- [ ] Move dark mode variables to `.dark` selector
- [ ] Add theme transition to body
- [ ] Update scrollbar styling

## Success Criteria
- Light mode colors defined
- Dark mode preserved under `.dark` class
- Smooth 300ms transition between themes

## Risk Assessment
- **Low risk** - CSS-only changes, no logic changes

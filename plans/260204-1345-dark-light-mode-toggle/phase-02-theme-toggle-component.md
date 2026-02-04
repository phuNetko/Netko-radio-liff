# Phase 2: Create ThemeToggle Component

## Context
- Parent: [plan.md](./plan.md)
- Depends on: [Phase 1](./phase-01-css-light-mode-variables.md)
- File: `components/Form/ThemeToggle.tsx`

## Overview
- **Priority:** High
- **Status:** pending
- **Description:** Recreate ThemeToggle component with Sun/Moon icons

## Key Insights

Existing `useTheme` hook provides:
- `theme`: current theme ("light" | "dark")
- `toggle`: function to switch theme
- `mounted`: boolean for hydration safety

## Requirements

1. Use Lucide icons (Sun, Moon)
2. Animate icon transition
3. Touch-friendly (44px target)
4. Match header nav button styling
5. Prevent hydration mismatch

## Architecture

```tsx
export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  if (!mounted) return <Skeleton />;
  return <button onClick={toggle}>...</button>;
}
```

## Related Code Files
- `components/Form/ThemeToggle.tsx` - Component to create
- `hooks/useTheme.ts` - Hook to use (no changes)

## Implementation Steps

1. Create `components/Form/ThemeToggle.tsx`
2. Import `useTheme` hook and Lucide icons
3. Return null or skeleton before mounted
4. Render button with Sun (light) / Moon (dark) icon
5. Add hover/focus states matching Header style
6. Add aria-label for accessibility

## Component Code

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder
  }

  return (
    <button
      onClick={toggle}
      className="p-2.5 rounded-xl text-zinc-400 hover:text-white
                 hover:bg-white/5 transition-all cursor-pointer"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
```

## Todo

- [ ] Create ThemeToggle component file
- [ ] Import useTheme hook
- [ ] Add Sun/Moon icons from Lucide
- [ ] Style to match header buttons
- [ ] Add aria-label

## Success Criteria
- Component renders without hydration error
- Icons switch on toggle
- Touch target >= 44px
- Accessible via keyboard

## Risk Assessment
- **Low risk** - Simple component, existing hook

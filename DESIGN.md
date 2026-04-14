# DESIGN.md - 赏金之路

> Design system for 赏金之路 (Bounty Road) - AI Job Intelligence Platform
> Inspired by Linear's ultra-minimal, precise aesthetic
> Version: 1.0 | 2026-04-14

---

## 1. Visual Theme & Atmosphere

**Mood:** Precise, professional, trustworthy. Like having a knowledgeable friend who shows you exactly where to look.

**Density:** Light and breathable. Information-rich but never cluttered. Every element earns its space.

**Philosophy:** "The best interface is one that gets out of the way." Users should find what they need without thinking about the UI.

---

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #fafafa;
  --bg-tertiary: #f5f5f5;
  
  /* Text */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  
  /* Accent - Linear Purple */
  --accent: #8b5cf6;
  --accent-hover: #7c3aed;
  --accent-light: #f5f3ff;
  
  /* Semantic */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* Borders */
  --border: #e5e5e5;
  --border-hover: #d4d4d4;
}
```

---

## 3. Typography Rules

**Font:** Inter (Google Fonts) - clean, modern, excellent readability

**Hierarchy:**
| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| H1 | 32px | 600 | 1.2 |
| H2 | 24px | 600 | 1.3 |
| H3 | 18px | 500 | 1.4 |
| Body | 14px | 400 | 1.5 |
| Small | 12px | 400 | 1.5 |
| Caption | 11px | 500 | 1.4 |

---

## 4. Component Stylings

### Buttons
- **Primary:** Purple bg, white text, 6px radius, 500 weight
- **Secondary:** White bg, gray border, dark text
- **Ghost:** No bg, purple text on hover

### Cards
- White background
- 1px border (#e5e5e5)
- 8px border-radius
- Subtle shadow on hover: `0 4px 12px rgba(0,0,0,0.08)`
- 24px padding

### Tags/Badges
- Small rounded pills
- Gray bg for neutral, purple bg for active
- 4px vertical padding, 8px horizontal

### Input Fields
- 40px height
- 6px border-radius
- 1px border
- Focus: purple border, light purple shadow

---

## 5. Layout Principles

**Grid:** 12-column with 24px gutters
**Max-width:** 1200px container
**Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64px

**Page rhythm:**
- Hero/Search: Generous 80px+ vertical padding
- List sections: 48px between sections
- Cards: 16px gap between items

---

## 6. Depth & Elevation

- **Cards:** `box-shadow: 0 1px 3px rgba(0,0,0,0.06)`
- **Hover cards:** `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`
- **Modals:** `box-shadow: 0 20px 40px rgba(0,0,0,0.15)`

No gradients except accent elements.

---

## 7. Do's and Don'ts

**Do:**
- Use Inter font exclusively
- Keep purple accent for interactive elements only
- Maintain 24px+ padding inside cards
- Use subtle shadows, not harsh ones

**Don't:**
- Use more than 2 font weights on a single element
- Add decorative elements without purpose
- Use black (#000) - use #111 instead
- Crowd information - when in doubt, whitespace

---

## 8. Responsive Behavior

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Strategy:**
- Mobile: Single column, stacked cards
- Tablet: 2-column grid
- Desktop: 3-column grid with sidebar filters

---

## 9. Agent Prompt Guide

```
When building UI for 赏金之路:
- Use Inter font from Google Fonts
- Primary accent color: #8b5cf6
- Card-based layout with 8px border-radius
- Generous whitespace (24px+ padding in cards)
- Subtle shadows, no harsh edges
- Clean, minimal, professional aesthetic
```

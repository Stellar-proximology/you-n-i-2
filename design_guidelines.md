# YOUNIVERSE Browser - Design Guidelines

## Design Approach

**Framework**: Modern Design System with Cosmic Consciousness Aesthetic
- Balances **technical functionality** with **spiritual/consciousness themes**
- Prioritizes **clarity and usability** for developer tools while maintaining **visual intrigue**
- Uses **design system principles** (consistent spacing, clear hierarchy) with **custom cosmic styling**

**Core Design Principles**:
1. **Conscious Clarity**: Every element serves a clear purpose in the consciousness exploration journey
2. **Cosmic Depth**: Layered visual depth reflects multi-dimensional field states
3. **Functional Flow**: Developer tools remain clean and efficient despite rich theming
4. **Living System**: Visual feedback shows real-time system state and coherence

---

## Color Palette

### Dark Mode Foundation (Primary Theme)
**Background Layers**:
- Base: 17 7% 8% (deep space black)
- Secondary: 250 30% 15% (dark purple-gray)
- Tertiary: 0 0% 12% (charcoal)
- Surface: 240 10% 3% with 40% opacity backdrop blur (glassmorphic panels)

**Accent Colors**:
- Primary Cyan: 189 85% 55% (consciousness/water element)
- Secondary Purple: 270 70% 65% (mind/spiritual element)
- Tertiary Gradient: Cyan to Purple (primary CTAs, active states)

**Field-Specific Colors** (for 6-field system):
- Zer: 0 0% 45% (neutral gray - the void)
- Mind: 270 60% 70% (purple - thought)
- Body: 0 70% 60% (red - physical)
- Heart: 150 60% 55% (green - emotion)
- Soul: 215 70% 60% (blue - depth)
- Spirit: 45 85% 60% (yellow/gold - transcendence)

**Semantic Colors**:
- Success: 150 70% 50%
- Warning: 45 90% 55%
- Error: 0 75% 55%
- Info: 189 80% 55%

### Light Mode (Future Consideration)
Not primary for this version - system defaults to dark consciousness theme

---

## Typography

**Font Stack**:
- **Primary**: System UI fonts for performance (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`)
- **Code/Mono**: `"JetBrains Mono", "Fira Code", monospace` for developer tools

**Type Scale** (Tailwind-based):
- Display: text-4xl (2.25rem) - Hero headings, major sections
- H1: text-3xl (1.875rem) - Page titles
- H2: text-2xl (1.5rem) - Section headers
- H3: text-xl (1.25rem) - Subsection headers
- Body: text-base (1rem) - Primary content
- Small: text-sm (0.875rem) - Secondary content, labels
- Tiny: text-xs (0.75rem) - Status indicators, metadata

**Font Weights**:
- Bold: 700 (headings, emphasis)
- Semibold: 600 (subheadings, buttons)
- Medium: 500 (navigation, tabs)
- Regular: 400 (body text)

---

## Layout System

**Spacing Primitives** (Tailwind units):
- Use primarily: **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 or p-6 (standard), p-8 (spacious)
- Section spacing: gap-4 or gap-6 (related items), gap-8 (distinct sections)
- Page margins: px-4 (mobile), px-6 (tablet), px-8 (desktop)

**Container Widths**:
- Full browser: w-screen (100vw)
- Content panels: max-w-7xl (1280px)
- Reading content: max-w-4xl (896px)
- Code/text: max-w-prose (65ch)

**Grid Structure**:
- Sidebar: 256px fixed width (can collapse)
- Main content: flex-1 (remaining space)
- Status bar: h-8 (32px) fixed
- Top nav: h-16 (64px) fixed

---

## Component Library

### Navigation & Controls
**Universal Search Bar**:
- Prominent center position in top nav
- Glassmorphic background with subtle border
- Focus state: 2px cyan ring
- Icon: Search/Sparkles (consciousness routing)
- Placeholder: "Ask anything, go anywhere..."

**Mode Switcher**:
- Pill-style toggle (Dashboard/Developer)
- Active state: solid gradient background
- Inactive state: transparent with hover
- Icons: Home (Dashboard), Code (Developer)

**Browser Controls**:
- Back/Forward: Ghost buttons with arrow icons
- Sidebar toggle: Menu icon, hover state
- All controls: p-2 with hover:bg-white/10 transition

### Field State Visualization
**Coherence Indicators**:
- Circular progress rings for each field
- Color: Field-specific hues
- Size: w-12 h-12 (compact), w-24 h-24 (detailed)
- Animation: Pulse on state changes

**Field Cards**:
- Glassmorphic container (bg-white/5 backdrop-blur)
- Border: 1px field-color at 30% opacity
- Padding: p-6
- Header: Field icon + name + coherence %
- Body: Current state, energy level, active gates

### Developer Tools
**Module Builder Wizard**:
- Stepped progression (1. Select → 2. Configure → 3. Code → 4. Test → 5. Deploy)
- Progress bar: Gradient fill matching completion
- Cards: Template selection with hover elevation
- Form inputs: Dark bg with cyan focus rings

**Code Editor**:
- Background: Pure black (bg-gray-950)
- Syntax colors: Cyan (keywords), Purple (types), Green (strings)
- Line numbers: Gray-600, non-selectable
- Tab bar: Border-b with active indicator
- Actions: Ghost buttons for copy/download/format

**Testing Panel**:
- Split view: Controls left, Preview right
- Test results: Success (green) / Failure (red) badges
- Console output: Monospace font, scrollable
- Preview: Iframe or isolated component render

### Buttons & Actions
**Primary CTA**:
- Background: Gradient cyan-to-purple
- Hover: Lighter gradient shift
- Text: White, font-semibold
- Padding: px-6 py-3
- Border radius: rounded-lg

**Secondary Actions**:
- Background: bg-white/5
- Border: 1px gray-700
- Hover: bg-white/10
- Text: White or gray-300

**Ghost/Minimal**:
- No background default
- Hover: bg-white/10
- Icon-only: p-2 square

### Overlays & Modals
**Modal Structure**:
- Backdrop: bg-black/60 backdrop-blur-sm
- Panel: bg-gray-900 border-gray-700
- Max width: max-w-2xl
- Padding: p-8
- Close: X icon top-right

**Toasts/Notifications**:
- Position: Top-right, stacked
- Style: Glassmorphic with status color border-l-4
- Duration: Auto-dismiss 5s (success), persist (error)

---

## Visual Effects & Interactions

**Glassmorphism**:
- Panel backgrounds: bg-black/40 backdrop-blur-lg
- Borders: 1px at 50% opacity
- Use for: Navigation bars, sidebars, floating panels

**Gradients**:
- Primary: from-cyan-600 to-purple-600 (CTAs, active states)
- Background: from-gray-900 via-purple-900 to-black (page backgrounds)
- Field states: Subtle gradients matching field colors

**Animations** (Minimal, purposeful):
- State changes: 300ms ease transitions
- Coherence rings: Pulse animation at 3s intervals
- Loading: Spin animation for test execution
- Page transitions: Fade 200ms
- **No excessive motion** - system stability priority

**Hover States**:
- Interactive elements: brightness or background shift
- Cards: Subtle elevation (shadow-lg)
- Buttons: Gradient shift or opacity change
- No animated transforms (scale/rotate) unless critical feedback

---

## Images & Visual Assets

### Icon System
- **Library**: Lucide React (modern, consistent)
- **Sizes**: w-4 h-4 (inline), w-5 h-5 (buttons), w-6 h-6 (headers)
- **Style**: Stroke-based, 2px stroke width
- **Colors**: Match semantic context (field colors, semantic states)

### No Hero Images Required
This is a **utility-focused application** - no marketing hero needed. Instead:
- **Dashboard landing**: Field state overview grid
- **Developer center**: Template gallery cards
- Visual interest comes from **data visualization** and **field coherence displays**

### Iconography Mapping
- **Zer**: Circle (void/source)
- **Mind**: Brain (thought)
- **Body**: Zap (energy/physical)
- **Heart**: Heart (emotion)
- **Soul**: Eye (witness/depth)
- **Spirit**: Star (cosmic/transcendence)

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px - Single column, collapsed sidebar
- Tablet: 768px - 1024px - Two columns where appropriate
- Desktop: > 1024px - Full layout with sidebar

**Mobile Adaptations**:
- Sidebar: Drawer overlay (not persistent)
- Search: Full width below nav
- Field states: Vertical stack
- Code editor: Full height, tabs collapse to dropdown

---

## Accessibility

**Dark Mode Optimizations**:
- Maintain 4.5:1 contrast minimum
- Form inputs: Dark bg with clear borders
- Focus indicators: 2px cyan ring (never hidden)
- Text on glass: Ensure readable contrast

**Keyboard Navigation**:
- All shortcuts visible in status bar hint
- Tab order: Logical flow (nav → search → sidebar → content)
- Escape: Close modals/overlays
- Enter: Submit forms/search

---

## Key Design Patterns

1. **Coherence-Driven UI**: Visual feedback always reflects system state (field coherence, active modules, voting weight)

2. **Layered Depth**: Background gradients → glassmorphic panels → content creates spatial hierarchy

3. **Developer-First Clarity**: Despite cosmic theming, code and tools remain clean, readable, and functional

4. **Living System Indicators**: Real-time animations and state updates show the system is "alive" and processing

5. **Modular Plugin Architecture**: Every module follows consistent card-based layout for visual cohesion
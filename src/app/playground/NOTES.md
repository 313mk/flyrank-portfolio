# NOTES.md - Accessible Component Fundamentals (FE-05)

This document provides a technical comparison of our custom hand-built accessible components against **shadcn/ui** (Radix UI) specifications.

## Gaps Analyzed: Custom Components vs. Radix UI (shadcn)

During code inspections of shadcn's Dialog and Tabs components, I identified three major engineering gaps that Radix UI handles under the hood which were absent in my custom React implementation:

### Gap 1: Portal Rendering (DOM Clipping Prevention)
- **My Implementation:** Renders the Modal Dialog directly inline as a child of the component tree hierarchy. If a parent container has `overflow: hidden` or `position: relative` with clipping z-index layers, the modal's container can clip or render distorted.
- **shadcn/ui (Radix):** Renders dialog elements into a React Portal (`Radix.Portal`). This removes the dialog entirely from its inline DOM tree location and mounts it directly at the root of `document.body`, eliminating any parent styling constraints.

### Gap 2: Body Scroll Lock and Pointer Events
- **My Implementation:** Implemented a basic `document.body.style.overflow = "hidden"` on mount. This locks viewport scrolling, but doesn't prevent touch-scrolling bugs on mobile Safari or block mouse-pointer clicks outside the modal if some containers have custom overlays.
- **shadcn/ui (Radix):** Employs robust layout locking (`react-remove-scroll`). It disables viewport scrolling globally, removes the scrollbar width dynamically to prevent layout shifting, and applies `pointer-events: none` strictly on all background elements outside the portal boundary.

### Gap 3: Advanced Focus Guards & Screen-Reader Virtual Cursors
- **My Implementation:** Used a standard Tab key listener loop. This successfully traps keyboard focus, but virtual keyboard cursors on assistive screen readers (like VoiceOver or NVDA) can bypass raw keyboard traps using swipe gestures, escaping to background content.
- **shadcn/ui (Radix):** Inserts hidden "Focus Guards" (invisible spans with `aria-hidden="true"` and `tabIndex={0}`) at the start and end of the document portal. These trigger focus callbacks when a virtual cursor attempts to navigate past the modal boundaries, forcing the focus back inside.
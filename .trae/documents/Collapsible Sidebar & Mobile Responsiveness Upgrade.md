# Implementation Plan: Collapsible Sidebar & Mobile Responsiveness

I will upgrade the system layout to support a collapsible sidebar on desktop and a responsive drawer menu on mobile devices.

## 1. Modify `src/index.css`
-   Define a new CSS variable `--sidebar-collapsed-width: 88px`.
-   Add media queries for mobile devices (`max-width: 768px`) to reset layout defaults.
-   Add utility classes for sidebar transitions and mobile overlays.

## 2. Modify `src/components/Layout/Sidebar.css`
-   Add `.sidebar.collapsed` styles:
    -   Reduce width to `--sidebar-collapsed-width`.
    -   Hide text elements (`.logo-text`, `.logo-subtitle`, `.nav-label`, `.user-info`).
    -   Center align icons.
    -   Adjust padding.
-   Add Mobile styles:
    -   Position fixed with full height.
    -   Transform/Transition for sliding effect (Drawer).
    -   Z-index management.

## 3. Modify `src/components/Layout/Sidebar.tsx`
-   Update component to accept props: `isCollapsed`, `isMobile`, `isOpen`, `onToggle`, `onClose`.
-   **Desktop**:
    -   Add a "Collapse/Expand" toggle button (`ChevronLeft`/`ChevronRight`) at the bottom or top.
    -   Conditionally render/hide text labels based on `isCollapsed` state.
-   **Mobile**:
    -   Render as a drawer (slide-in menu).
    -   Add a backdrop overlay when open.
    -   Close sidebar on navigation item click.

## 4. Modify `src/components/Layout/MainLayout.tsx`
-   **State Management**:
    -   `isSidebarCollapsed`: Boolean for desktop state.
    -   `isMobile`: Boolean detected via `window.innerWidth`.
    -   `isMobileMenuOpen`: Boolean for mobile drawer state.
-   **Mobile Header**:
    -   Create a top header visible only on mobile (`md:hidden`).
    -   Include a "Hamburger Menu" button to open the sidebar.
    -   Show the Logo/Brand name.
-   **Main Content Area**:
    -   Dynamically calculate `margin-left` based on:
        -   Mobile: `0`
        -   Desktop Collapsed: `calc(var(--sidebar-collapsed-width) + 4vh)`
        -   Desktop Expanded: `calc(var(--sidebar-width) + 4vh)`
-   **Event Listeners**:
    -   Add window resize listener to update `isMobile` state.

## 5. Verification
-   Verify desktop toggle functionality (collapse/expand).
-   Verify mobile view (hamburger menu, drawer slide-in, overlay click to close).
-   Check layout stability during transitions.

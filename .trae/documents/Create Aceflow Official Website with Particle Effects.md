# Implementation Plan: Create Aceflow Official Website

I will create a new dedicated website section within the project to serve as the GEO service landing page, featuring a high-performance particle system and content based on the provided reference.

## 1. Directory Structure
I will create a new directory `src/website` to keep the website logic isolated from the dashboard app.
-   `src/website/pages/`
    -   `Home.tsx`: The main landing page container.
-   `src/website/components/`
    -   `ParticleBackground.tsx`: A custom Canvas-based interactive particle system (Cool Visual Effect).
    -   `Navbar.tsx`: Transparent/Glassmorphism navigation.
    -   `Hero.tsx`: First screen with the particle background and core value proposition.
    -   `MarketAnalysis.tsx`: Visualizing the market growth data (using Recharts).
    -   `Solutions.tsx`: Displaying the 6-step GEO marketing node (Diagnosis -> Conversion).
    -   `GlobalStrategy.tsx`: Content for "GEO Outbound" and global AI platform matrix.
    -   `CaseStudies.tsx`: Showcasing the "Education" and "Yogurt" success stories.
    -   `Footer.tsx`: Simple footer.

## 2. Component Details

### Particle System (`ParticleBackground.tsx`)
-   **Tech**: Native HTML5 Canvas + React `useRef` + `requestAnimationFrame`.
-   **Effect**: Network nodes style (dots connected by lines when close), reacting to mouse movement (repulsion or attraction) to create a "cool" and interactive feel suitable for an AI/Tech theme.

### Content Integration (Ref: Aceflow)
-   **Hero**: "Aceflow - 让品牌被AI看见" (Make brands visible to AI).
-   **Market**: Charts showing the 215% growth prediction and the shift from Search to AI.
-   **Solutions**: Cards for "Diagnosis", "Intent", "Content", "Monitoring", "Conversion", "Knowledge Base".
-   **Cases**: Before/After metrics comparison for the case studies.

## 3. Routing
-   Modify `src/App.tsx` to add a new route:
    -   Path: `/website` (or `/official`).
    -   This route will render the `Home` page without the Dashboard Sidebar, providing a full-screen immersive experience.

## 4. Execution Steps
1.  Create the `src/website` directory structure.
2.  Implement `ParticleBackground` and `Hero` components.
3.  Implement the content sections (`MarketAnalysis`, `Solutions`, `GlobalStrategy`, `CaseStudies`).
4.  Assemble everything in `Home.tsx`.
5.  Update `App.tsx` to expose the new page.

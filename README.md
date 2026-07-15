# FIFA Pulse AI: Operational Command Center

## Project Overview

FIFA Pulse AI is a sophisticated operational command center application, meticulously converted from an original Stitch-generated static HTML page into a modern React, Vite, and Tailwind CSS project. This application is designed to provide comprehensive insights and control for managing large-scale events, such as FIFA matches, by integrating various analytical and operational modules.

The conversion prioritizes pixel-perfect preservation of the original UI, layout, spacing, typography, and color system, ensuring a seamless transition to a dynamic and maintainable codebase.

## Features

The application integrates several key modules to offer a holistic view and control over event operations:

*   **Header & Footer**: Consistent navigation and branding elements across the application.
*   **Hero Section**: A prominent introductory section, likely showcasing key real-time metrics or an overview of the event.
*   **Operations**: Manages and displays critical operational data and controls.
*   **Stadium Hub**: Provides a centralized interface for stadium-specific information and management.
*   **Broadcast**: Offers insights and controls related to event broadcasting.
*   **Crowd Analytics**: Visualizes and analyzes crowd movement and density for safety and management.
*   **Simulation**: Enables running simulations for various scenarios, such as emergency responses or crowd flow.
*   **Emergency**: Dedicated module for managing and responding to emergency situations.
*   **Gemini Core**: Integrates AI-powered reasoning and analytical capabilities, likely leveraging Google Gemini for advanced insights.

## Technologies Used

This project is built with a modern web development stack:

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **PostCSS**: A tool for transforming CSS with JavaScript plugins.
*   **Autoprefixer**: A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
*   **@tailwindcss/forms**: A Tailwind CSS plugin that provides a basic reset for form styles.
*   **@tailwindcss/container-queries**: A Tailwind CSS plugin for container queries.
*   **JavaScript Hooks**: Custom hooks (`useReveal`, `useGlassPanelMouse`) re-implementing original interactive effects like scroll-reveal and mousemove tilt.

## Getting Started

To set up and run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sanskriti45-tech/fifa-pulse-ai.git
    cd fifa-pulse-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

4.  **Build for production**:
    ```bash
    npm run build
    npm run preview
    ```

## Project Structure

The project follows a standard React application structure:

```
fifa-pulse-ai/
├── public/
│   ├── images/                 # Static images and assets
│   └── index.html              # Main HTML file (Vite entry point)
├── src/
│   ├── components/             # Reusable React components for UI sections
│   │   ├── Broadcast.jsx
│   │   ├── CrowdAnalytics.jsx
│   │   ├── Emergency.jsx
│   │   ├── Footer.jsx
│   │   ├── GeminiCore.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Operations.jsx
│   │   ├── Simulation.jsx
│   │   └── StadiumHub.jsx
│   ├── hooks/                  # Custom React hooks for shared logic and effects
│   │   ├── useGlassPanelMouse.js
│   │   └── useReveal.js
│   ├── App.jsx                 # Main application component, orchestrates sections
│   ├── index.css               # Global styles, Tailwind directives, and custom CSS
│   └── main.jsx                # React entry point
├── tailwind.config.js          # Tailwind CSS configuration with custom theme
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite build tool configuration
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Dependency lock file
└── README.md                   # Project README file
```

## Notes and Considerations

*   **Tailwind CSS**: All original Tailwind utility classes (`class` attributes) have been preserved and converted to `className` for React compatibility.
*   **Custom Design Tokens**: Custom colors (e.g., `neon-green`, `surface`), spacing (e.g., `margin-desktop`, `gutter`), and font sizes (e.g., `display-lg`, `data-label`) are defined in `tailwind.config.js` under `theme.extend`, mirroring the original inline Tailwind configuration.
*   **Tailwind Plugins**: The `@tailwindcss/forms` and `@tailwindcss/container-queries` plugins are included, consistent with their usage in the original Tailwind CDN script.
*   **Google Fonts**: Material Symbols Outlined font is loaded via a Google Fonts link in `index.html`, maintaining the original typography.
*   **Image Placeholders**: Images depicting the stadium (hero background, tactical overview, etc.) now point to a generic `/images/screen.png` placeholder. The Gemini AI reasoning engine graphic (`/images/gemini.png`) retains its original source. Users should replace `/images/screen.png` with their specific stadium imagery.
*   **Section Integrity**: All original sections and their order (`hero`, `operations`, `stadium-hub`, `broadcast`, `crowd-analytics`, `simulation`, `emergency`, `gemini-core`) and IDs have been maintained.

# FIFA Pulse AI – Stadium Operations Command Center

## Project Overview

**FIFA Pulse AI** is an advanced operational command center application meticulously developed for the OpenAI Build Week. This project transforms a static HTML page into a dynamic, real-time monitoring and control platform for large-scale events, such as FIFA matches. Leveraging a modern web stack and integrated AI capabilities, it provides comprehensive insights and operational oversight to ensure seamless event management.

The core objective of this project is to deliver a pixel-perfect conversion of the original user interface while enhancing functionality through a robust backend and intelligent AI integration. The application is designed to be intuitive, responsive, and capable of handling the complex demands of stadium operations.

## Problem Statement

Managing large-scale events like FIFA matches presents significant operational challenges, including real-time crowd control, emergency response coordination, broadcast management, and overall stadium logistics. Traditional systems often lack the real-time data processing, predictive analytics, and integrated command capabilities necessary to respond effectively to dynamic situations. This can lead to inefficiencies, delayed responses, and potential safety concerns.

## Our Solution

FIFA Pulse AI addresses these challenges by providing a unified, intelligent platform that integrates real-time stadium telemetry with AI-powered operational command. Our solution offers:

*   **Real-time Monitoring**: A dynamic dashboard displaying critical operational data and event metrics.
*   **AI-Powered Insights**: Google Gemini integration for advanced analytics, predictive modeling, and intelligent recommendations.
*   **Streamlined Operations**: Centralized control for various stadium functions, from crowd analytics to emergency management.
*   **Scalable Architecture**: A robust frontend and backend designed for performance and extensibility.

## Key Features

*   **Interactive Dashboard**: A comprehensive user interface featuring dedicated sections for Hero, Operations, Stadium Hub, Broadcast, Crowd Analytics, Simulation, Emergency, and Gemini Core.
*   **Real-time Telemetry Simulation**: The backend simulates live stadium data, providing a dynamic environment for monitoring and decision-making.
*   **AI Operations Commander**: Powered by Google Gemini, this module offers intelligent insights and assists in critical operational decisions.
*   **Responsive Design**: Built with React and Tailwind CSS, ensuring optimal viewing and interaction across various devices.
*   **Dynamic Visual Effects**: Custom JavaScript hooks (`useReveal`, `useGlassPanelMouse`) re-implement original interactive elements like scroll-reveal animations and mousemove tilt effects, enhancing user engagement.
*   **Modular Component Architecture**: A well-organized frontend with reusable React components for maintainability and scalability.

## AI Capabilities (Google Gemini Integration)

The FIFA Pulse AI backend integrates with Google Gemini to provide advanced artificial intelligence capabilities, transforming raw data into actionable insights. Key AI functionalities include:

*   **Predictive Analytics**: Analyzing real-time and historical data to forecast potential issues, such as crowd congestion or resource shortages.
*   **Intelligent Recommendations**: Offering data-driven suggestions for optimizing operations, improving safety, and enhancing the fan experience.
*   **Automated Anomaly Detection**: Identifying unusual patterns or events that require immediate attention, reducing response times.
*   **Natural Language Processing**: Potentially enabling natural language queries for operational data and AI-driven insights (future enhancement).

The integration utilizes the `@google/genai` library, allowing the backend to interact seamlessly with Gemini models, such as `gemini-2.0-flash`, for efficient and powerful AI processing.

## Technology Stack

### Frontend
*   **Framework**: React.js
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
*   **3D Graphics**: `@react-three/drei`, `@react-three/fiber`, `three`
*   **HTTP Client**: Axios
*   **Plugins**: `@tailwindcss/forms`, `@tailwindcss/container-queries`

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Middleware**: CORS, Helmet, Morgan
*   **Environment Management**: Dotenv

### AI
*   **Platform**: Google Gemini
*   **Library**: `@google/genai`

### Deployment
*   Standard Node.js and React application deployment practices apply. The frontend can be built as static assets and served, while the backend runs as a Node.js service.

## System Architecture

The FIFA Pulse AI system follows a client-server architecture:

1.  **Frontend (Client-side)**: Developed with React and Vite, the frontend provides a rich, interactive user interface. It consumes data and services from the backend API to display real-time information and operational controls. The UI is designed for responsiveness and visual appeal, utilizing Tailwind CSS for styling and custom hooks for dynamic effects.

2.  **Backend (Server-side)**: Built with Node.js and Express.js, the backend serves as the central hub for data processing, business logic, and AI integration. It handles API requests from the frontend, manages real-time stadium telemetry simulations, and communicates with the Google Gemini API for AI-powered insights. The backend is designed to be robust, secure (using Helmet), and observable (using Morgan for logging).

3.  **Data Flow**: The frontend makes asynchronous requests to the backend API to fetch operational data, send commands, and retrieve AI-generated insights. The backend processes these requests, interacts with the simulation service, and queries the Gemini API as needed, returning structured responses to the frontend for display.

## Folder Structure

```
fifa-pulse-ai/
├── public/
│   ├── images/                 # Static images and assets (e.g., screen.png, gemini.png)
│   └── index.html              # Main HTML file, Vite entry point, Google Fonts links
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
│   ├── hooks/                  # Custom React hooks for shared logic and interactive effects
│   │   ├── useGlassPanelMouse.js
│   │   └── useReveal.js
│   ├── App.jsx                 # Main application component, orchestrates all sections
│   ├── index.css               # Global styles, Tailwind directives, and custom CSS
│   └── main.jsx                # React application entry point
├── backend/
│   └── backend/                # Node.js Express backend application
│       ├── src/
│       │   ├── config/         # Environment configuration
│       │   ├── middleware/     # Express middleware (e.g., error handling, logging)
│       │   ├── routes/         # API route definitions
│       │   ├── services/       # Core services (e.g., simulation.service)
│       │   └── utils/          # Utility functions (e.g., logger)
│       │   └── index.js        # Backend application entry point
│       ├── package.json        # Backend dependencies and scripts
│       └── .env.example        # Example environment variables for backend
├── tailwind.config.js          # Tailwind CSS configuration with custom theme
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite build tool configuration
├── package.json                # Frontend dependencies and scripts
├── package-lock.json           # Frontend dependency lock file
└── README.md                   # Project README file
```

## Installation Guide

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sanskriti45-tech/fifa-pulse-ai.git
    cd fifa-pulse-ai
    ```

2.  **Install Frontend Dependencies**:
    Navigate to the project root directory and install the necessary packages:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**:
    Navigate into the `backend/backend` directory and install its dependencies:
    ```bash
    cd backend/backend
    npm install
    cd ../..
    ```

## Environment Variables

The backend requires specific environment variables to function correctly. Create a `.env` file in the `backend/backend` directory based on the `.env.example` provided:

```env
# Node.js environment (e.g., development, production)
NODE_ENV=development

# Port for the backend server
PORT=8080

# CORS origin(s) for frontend access (e.g., http://localhost:5173 or *)
CORS_ORIGIN=*

# Google Gemini API Key (required for AI capabilities)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# Gemini model to use (e.g., gemini-2.0-flash)
GEMINI_MODEL=gemini-2.0-flash

# Simulation tick interval in milliseconds
SIM_TICK_INTERVAL_MS=4000

# Number of stadiums to simulate
SIM_STADIUM_COUNT=6
```

**Note**: Replace `YOUR_GEMINI_API_KEY` with your actual Google Gemini API key. Obtain one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

## Running the Project Locally

After installing dependencies and configuring environment variables, you can run the frontend and backend concurrently:

1.  **Start the Backend Server**:
    Open a new terminal, navigate to the `backend/backend` directory, and start the server:
    ```bash
    cd backend/backend
    npm run dev
    ```
    The backend will typically run on `http://localhost:8080`.

2.  **Start the Frontend Development Server**:
    Open another terminal, navigate to the project root directory, and start the frontend:
    ```bash
    npm run dev
    ```
    The frontend application will usually be available at `http://localhost:5173`.

Your FIFA Pulse AI application should now be running locally, accessible through your web browser.

## Deployment Instructions

Deploying the FIFA Pulse AI project involves building the frontend for production and hosting the backend as a Node.js service. Below are general guidelines:

### Frontend Deployment

1.  **Build the Frontend**: In the project root directory, run:
    ```bash
    npm run build
    ```
    This will create a `dist` directory containing the optimized static assets for your frontend.

2.  **Host Static Assets**: The contents of the `dist` folder can be deployed to any static site hosting service (e.g., Netlify, Vercel, GitHub Pages, AWS S3).

### Backend Deployment

1.  **Prepare for Production**: Ensure your `.env` file in `backend/backend` is configured with production-ready values, especially `NODE_ENV=production` and `CORS_ORIGIN` set to your frontend's production URL.

2.  **Deploy Node.js Application**: The `backend/backend` directory contains a standard Node.js Express application. It can be deployed to various cloud platforms that support Node.js (e.g., Heroku, AWS EC2, Google Cloud Run, DigitalOcean App Platform). Ensure that your `GEMINI_API_KEY` and other sensitive environment variables are securely configured in your deployment environment.

## Future Enhancements

*   **Advanced Data Visualization**: Implement more sophisticated charts and graphs for crowd analytics and simulation data.
*   **Real-time Communication**: Integrate WebSockets for true real-time data push from the backend to the frontend, reducing polling.
*   **User Authentication**: Add user login and role-based access control for different operational personnel.
*   **Database Integration**: Persist operational data and event logs in a database for historical analysis and reporting.
*   **External API Integrations**: Connect with actual stadium sensor data, ticketing systems, or weather APIs for richer insights.
*   **Mobile Companion App**: Develop a native mobile application for on-the-go monitoring and critical alerts.
*   **AI-driven Incident Management**: Enhance Gemini integration to proactively suggest incident response protocols and automate certain actions.

## Team

This project was developed by **Manus AI** for the OpenAI Build Week.

## License

This project is licensed under the MIT License. See the `LICENSE` file (if available) for details.

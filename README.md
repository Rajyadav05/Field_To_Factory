# FROM FIELD TO FACTORY: Maharashtra Biomass Intelligence Platform 🌾🏭

An enterprise-grade, AI-driven climate-tech platform designed to eliminate crop residue burning by connecting agricultural supply chains directly to industrial biomass buyers (Bio-CNG, Biopower, SAF). Built with a premium, command-center aesthetic inspired by modern industrial intelligence systems.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Core Features

- **Frontend-First Simulation Architecture:** Fully functional without an external backend. Uses `localStorage` and a simulated service layer to mimic latency, transactions, and real-time database interactions.
- **Role-Based Workflows:**
  - **Farmer Dashboard:** Multilingual, responsive interface for uploading crop residue listings, tracking AI-verified moisture/NDVI metrics, and managing bookings.
  - **Industry Command Center:** High-fidelity GIS map overlay utilizing `react-leaflet`. Features live anomaly detection, procurement targeting, and animated logistics tracing.
- **Global Multilingual Support:** Comprehensive `i18next` integration providing instant, zero-refresh translations across English, Marathi, and Hindi.
- **Simulated Smart Contracts:** Dedicated procurement gateway for B2B transactions, featuring mock payment processing, ledger valuation, and invoice generation.
- **Impact Analytics:** Dynamic visualizations utilizing `recharts` to track carbon mitigation metrics, district heatmaps, and supply forecasting. Includes a simulated sustainability report generator.
- **Premium UI/UX:** Cinematic framer-motion animations, dark-mode glassmorphism, responsive data-grids, and high-contrast neon accents.

## 🛠 Technologies Used

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Vanilla CSS Variables
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Mapping:** React-Leaflet + Leaflet
- **Localization:** react-i18next
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 🚀 Getting Started

Follow these steps to run the complete project locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository (or navigate to the project folder) and install the required dependencies:
```bash
cd Field_To_Factory
npm install
```

### 3. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
The application will typically be available at `http://localhost:5173`.

## 🔐 Testing Credentials

The platform uses a simulated authentication system. Use the following credentials to explore the different role-based dashboards:

**Farmer Access:**
- **Phone:** `9876543210`
- **Password:** `password123`
*(Provides access to residue listing workflows and localized content)*

**Industry Access:**
- **Phone:** `1234567890`
- **Password:** `password123`
*(Provides access to the interactive GIS command center and procurement gateway)*

## 📂 Project Structure

```
src/
├── components/       # Reusable UI elements, Layouts, and Modals
├── context/          # Global State (AuthContext)
├── locales/          # i18n JSON translation files (en, mr, hi)
├── pages/            # Core dashboard views and routing pages
├── services/         # Simulated API layer and localStorage DB logic
├── App.jsx           # Application router and layout wrapper
└── main.jsx          # Entry point and i18n initialization
```

## 📝 Note on Data Persistence
All data (user accounts, biomass listings, transactions) is stored entirely in your browser's `localStorage` under the key `maharashtra_biomass_db`. If you need to reset the platform to its default factory state, simply clear your browser's local storage or delete that specific key.

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout, ErrorBoundary } from './components/layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy loading the pages to improve initial load time and enable Suspense fallbacks
const LandingPage = lazy(() => import('./pages').then(m => ({ default: m.LandingPage })));
const Platform = lazy(() => import('./pages').then(m => ({ default: m.Platform })));
const FarmerApp = lazy(() => import('./pages').then(m => ({ default: m.FarmerApp })));
const IndustryDashboard = lazy(() => import('./pages').then(m => ({ default: m.IndustryDashboard })));
const SatelliteVerification = lazy(() => import('./pages').then(m => ({ default: m.SatelliteVerification })));
const ImpactDashboard = lazy(() => import('./pages').then(m => ({ default: m.ImpactDashboard })));
const Roadmap = lazy(() => import('./pages').then(m => ({ default: m.Roadmap })));
const Login = lazy(() => import('./pages').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages').then(m => ({ default: m.Register })));
const TransactionPage = lazy(() => import('./pages').then(m => ({ default: m.TransactionPage })));

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-[#0D0D0D]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-t-2 border-[#1DB97A] border-solid rounded-full animate-spin"></div>
      <span className="text-[#A0A0A0] text-sm uppercase tracking-widest font-bold">Initializing Subsystems...</span>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/farmer" element={<ProtectedRoute allowedRoles={['farmer', 'admin']}><FarmerApp /></ProtectedRoute>} />
        <Route path="/industry" element={<ProtectedRoute allowedRoles={['industry', 'admin']}><IndustryDashboard /></ProtectedRoute>} />
        <Route path="/transaction/:listingId" element={<ProtectedRoute allowedRoles={['industry', 'admin']}><TransactionPage /></ProtectedRoute>} />
        <Route path="/satellite" element={<ProtectedRoute><SatelliteVerification /></ProtectedRoute>} />
        <Route path="/impact" element={<ImpactDashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

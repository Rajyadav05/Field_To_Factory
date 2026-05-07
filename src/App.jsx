import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './components/layout';
import { 
  LandingPage, 
  FarmerApp, 
  IndustryDashboard, 
  SatelliteVerification, 
  ImpactDashboard, 
  Roadmap 
} from './pages';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/farmer" element={<FarmerApp />} />
        <Route path="/industry" element={<IndustryDashboard />} />
        <Route path="/satellite" element={<SatelliteVerification />} />
        <Route path="/impact" element={<ImpactDashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

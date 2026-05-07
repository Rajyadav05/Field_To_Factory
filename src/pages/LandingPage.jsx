import React from 'react';
import { PageTransition } from '../components/layout';
import { Hero, StatsStrip, LiveMap, TheProblem, HowItWorks, DualEcosystem, SDGAlignment, FinalCTA } from '../components/sections';

export const LandingPage = () => {
  return (
    <PageTransition className="p-0 m-0 w-full max-w-none">
      <Hero />
      <StatsStrip />
      <TheProblem />
      <HowItWorks />
      <LiveMap />
      <DualEcosystem />
      <SDGAlignment />
      <FinalCTA />
    </PageTransition>
  );
};

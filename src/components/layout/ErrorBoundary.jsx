import React from 'react';
import { GhostButton } from '../ui';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#E5243B]/20 flex items-center justify-center text-[#E5243B] mb-6 text-2xl font-bold">!</div>
          <h1 className="text-3xl font-bold text-white mb-4">Platform Error</h1>
          <p className="text-[#A0A0A0] max-w-md mb-8">An unexpected error occurred in the intelligence dashboard. We've logged this event.</p>
          <GhostButton onClick={() => window.location.href = '/'} className="border-[#0B6E4F] text-[#0B6E4F]">
            Reboot Platform
          </GhostButton>
        </div>
      );
    }

    return this.props.children; 
  }
}

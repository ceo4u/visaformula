import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { DesktopHomeSection } from './DesktopHomeSection';
import { MobileHomeSection } from './MobileHomeSection';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in LandingPage section:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-8 bg-white text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Loading Landing Page...</h2>
            <p className="text-sm text-gray-500">Refreshing components to display optimal view.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#00a896] text-white rounded-xl text-xs font-bold shadow hover:bg-[#008f80]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function LandingPage() {
  return (
    <ErrorBoundary>
      <div className="w-full bg-[#f3f4f6] text-black font-sans antialiased selection:bg-[#00a896]/20 selection:text-[#00a896]">
        {/* Desktop: shown on lg+ screens */}
        <div className="hidden lg:block">
          <DesktopHomeSection />
        </div>
        {/* Mobile: shown on screens smaller than lg */}
        <div className="block lg:hidden">
          <MobileHomeSection />
        </div>
      </div>
    </ErrorBoundary>
  );
}

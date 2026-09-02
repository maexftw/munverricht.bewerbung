import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export interface CyberShellProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const CyberShell: React.FC<CyberShellProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
  className = '',
}) => {
  return (
    <div
      data-testid="app-layout"
      className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] font-sans relative overflow-x-hidden w-full selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      <div
        data-testid="cyber-shell"
        className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] font-sans relative overflow-x-hidden w-full"
      >
        {/* 32px Ambient Cyber Micro-Grid Background */}
        <div
          className="fixed inset-0 cyber-grid-overlay opacity-40 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Top Ambient Cyber Radial Glows */}
        <div
          className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />
        <div
          className="fixed top-1/3 right-10 w-[500px] h-[400px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Slanted visual hatch anchor */}
        <div data-testid="diagonal-slant" className="hidden" aria-hidden="true" />

        {/* Sticky Header Navbar */}
        {showNavbar && <Navbar />}

        {/* Main Content Area */}
        <main
          id="main-content"
          className={`hyp-body max-w-6xl mx-auto relative z-10 w-full ${showNavbar ? 'pt-16 sm:pt-20' : ''} ${className}`}
        >
          {children}
        </main>

        {/* Cyber Footer */}
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default CyberShell;

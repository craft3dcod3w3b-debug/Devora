import React from 'react';

interface ToolLayoutProps {
  children: React.ReactNode;
  minHeight?: string;
}

export function SinglePanelLayout({ children, minHeight = '600px' }: ToolLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        minHeight,
      }}
    >
      {children}
    </div>
  );
}

export function TwoPanelLayout({ children, minHeight = '600px' }: ToolLayoutProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1rem',
        width: '100%',
        minHeight,
      }}
      className="two-panel-layout"
    >
      {children}
      <style>{`
        @media (min-width: 768px) {
          .two-panel-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

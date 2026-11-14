import React, { useState } from 'react';

interface ToolLayoutProps {
  children: React.ReactNode;
  minHeight?: string;
}

export function SinglePanelLayout({ children, minHeight = '550px' }: ToolLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        width: '100%',
        minHeight,
      }}
    >
      {children}
    </div>
  );
}

export function TwoPanelLayout({ children, minHeight = '550px' }: ToolLayoutProps) {
  const [mobileTab, setMobileTab] = useState<'both' | 'input' | 'output'>('both');
  const childArray = React.Children.toArray(children);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', width: '100%' }}>
      {/* Mobile-Only Ergonomic Segmented Control */}
      {childArray.length === 2 && (
        <div
          className="mobile-panel-tabs"
          style={{
            display: 'none',
            padding: '0.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            gap: '0.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => setMobileTab('both')}
            className={`btn btn-sm ${mobileTab === 'both' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}
          >
            Split View
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('input')}
            className={`btn btn-sm ${mobileTab === 'input' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}
          >
            Input
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('output')}
            className={`btn btn-sm ${mobileTab === 'output' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}
          >
            Output
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          minHeight,
        }}
        className={`two-panel-grid tab-mode-${mobileTab}`}
      >
        {childArray.map((child, index) => {
          const isInput = index === 0;
          const isOutput = index === 1;
          const isHiddenOnMobile =
            (mobileTab === 'input' && isOutput) || (mobileTab === 'output' && isInput);

          return (
            <div
              key={index}
              className={`panel-item ${isHiddenOnMobile ? 'mobile-hidden' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: '400px',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .two-panel-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .mobile-panel-tabs {
            display: none !important;
          }
          .panel-item {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-panel-tabs {
            display: flex !important;
          }
          .two-panel-grid {
            grid-template-columns: 1fr !important;
          }
          .panel-item.mobile-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

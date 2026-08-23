import React from 'react';

export type AdType = 'leaderboard' | 'rectangle';

interface AdUnitProps {
  type: AdType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AdUnit component that displays a placeholder during development,
 * and will eventually host the actual ad scripts in production.
 */
export const AdUnit: React.FC<AdUnitProps> = ({ type, className = '', style = {} }) => {
  // Config for placeholders
  const dimensions = type === 'leaderboard' 
    ? { width: '728px', height: '90px' } 
    : { width: '300px', height: '250px' };
    
  const label = type === 'leaderboard' ? '728x90 Leaderboard Ad' : '300x250 Rectangle Ad';

  // In development, show a stylish placeholder.
  // In production, this can check process.env.NODE_ENV and render <script> tags for AdSense/Carbon.
  const isDevelopment = import.meta.env.DEV;

  if (isDevelopment) {
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px dashed var(--color-border-strong)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-fg-muted)',
          fontSize: '0.875rem',
          fontWeight: 500,
          margin: '2rem auto',
          maxWidth: '100%', // Prevent overflow on small screens
          width: dimensions.width,
          height: dimensions.height,
          ...style,
        }}
        title="Advertisement Placeholder"
      >
        <span>{label}</span>
      </div>
    );
  }

  // TODO: Implement actual production ad tag logic here (e.g., Google AdSense, Carbon Ads)
  // For now, render nothing or the same placeholder in prod until an ad network is configured.
  return null;
};

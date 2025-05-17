'use client';

import React from 'react';

interface LavaBackgroundProps {
  className?: string;
}

const LavaBackground: React.FC<LavaBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 lava-bg ${className}`}>
      {/* This div uses the lava-bg class defined in globals.css */}
    </div>
  );
};

export default LavaBackground;

'use client';

import React, { useEffect, useRef } from 'react';

interface EmberParticlesProps {
  count?: number;
}

const EmberParticles: React.FC<EmberParticlesProps> = ({ count = 10 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    
    // Create ember particles
    for (let i = 0; i < count; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember-particle';
      
      // Random position
      const left = Math.random() * containerWidth;
      ember.style.left = `${left}px`;
      ember.style.bottom = '0';
      
      // Random size
      const size = 4 + Math.random() * 8;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      
      // Random animation duration and delay
      const duration = 6 + Math.random() * 6;
      const delay = Math.random() * 10;
      ember.style.setProperty('--rise-duration', `${duration}s`);
      ember.style.setProperty('--rise-delay', `${delay}s`);
      
      container.appendChild(ember);
    }
    
    return () => {
      // Clean up particles when component unmounts
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [count]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default EmberParticles;

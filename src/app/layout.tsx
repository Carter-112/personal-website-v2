import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fire Portfolio - Editable Portfolio Website',
  description: 'A stunning lava/fire themed portfolio website with easy editing capabilities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#600000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Poppins',sans-serif] antialiased">
        {children}
        
        {/* Accessibility features */}
        <div id="a11y-announcer" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      </body>
    </html>
  );
}

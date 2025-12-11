import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo = ({ to = '/', variant = 'full', size = 'md', showTagline = false, className = '' }) => {
  // size presets
  const sizes = {
    sm: { box: 'w-8 h-8', mono: 'text-base', title: 'text-lg', tagline: 'text-[10px]' },
    md: { box: 'w-10 h-10', mono: 'text-lg', title: 'text-xl', tagline: 'text-xs' },
    lg: { box: 'w-12 h-12', mono: 'text-xl', title: 'text-2xl', tagline: 'text-sm' },
  };
  const s = sizes[size] || sizes.md;

  const Monogram = (
    <div className={`${s.box} rounded-lg bg-blue-600 flex items-center justify-center`}> 
      <span className={`text-white font-bold ${s.mono}`}>S</span>
    </div>
  );

  if (variant === 'compact') {
    return (
      <Link to={to} className={`flex items-center gap-3 ${className}`}> 
        {Monogram}
      </Link>
    );
  }

  return (
    <Link to={to} className={`flex items-center gap-3 ${className}`}> 
      {Monogram}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold text-gray-900 ${s.title}`}>ScholarStream</span>
        {showTagline && <span className={`text-gray-500 ${s.tagline}`}>Connecting Futures</span>}
      </div>
    </Link>
  );
};

export default BrandLogo;

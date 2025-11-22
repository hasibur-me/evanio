import { useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export const PageTransition = ({ children }) => {
  const location = useLocation();

  // Simple wrapper - remove transition for now to prevent blank page issues
  // The transition was causing navigation problems
  return (
    <div key={location.pathname} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export const FadeIn = ({ children, delay = 0, className = '' }) => {
  return (
    <div
      className={cn('animate-fade-in', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => {
  const animations = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    up: 'animate-slide-in-up',
    down: 'animate-slide-in-down',
  };

  return (
    <div
      className={cn(animations[direction], className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ children, delay = 0, className = '' }) => {
  return (
    <div
      className={cn('animate-scale-in', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};


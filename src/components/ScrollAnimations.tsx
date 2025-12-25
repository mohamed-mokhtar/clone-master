import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollAnimation = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  duration = 600,
  className = ''
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationStyles = () => {
    const baseTransition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { opacity: 0, transform: 'translateY(40px)', transition: baseTransition };
        case 'fade-left':
          return { opacity: 0, transform: 'translateX(-40px)', transition: baseTransition };
        case 'fade-right':
          return { opacity: 0, transform: 'translateX(40px)', transition: baseTransition };
        case 'scale':
          return { opacity: 0, transform: 'scale(0.9)', transition: baseTransition };
        case 'blur':
          return { opacity: 0, filter: 'blur(10px)', transition: baseTransition };
        default:
          return { opacity: 0, transition: baseTransition };
      }
    }
    
    return { 
      opacity: 1, 
      transform: 'translate(0) scale(1)', 
      filter: 'blur(0)',
      transition: baseTransition 
    };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
};

export const StaggeredContainer = ({ 
  children, 
  staggerDelay = 100,
  className = ''
}: { 
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation key={index} delay={index * staggerDelay}>
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
};

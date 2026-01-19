import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm" />
      
      {/* Progress bar */}
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden"
        style={{ scaleX, transformOrigin: '0%' }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute top-0 h-2 w-20 bg-primary/50 blur-md"
        style={{ 
          left: '0%',
          x: scaleX.get() * 100 + '%',
        }}
      />
    </motion.div>
  );
};
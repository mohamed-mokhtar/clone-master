import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  duration?: number;
  stagger?: boolean;
}

const getVariants = (direction: string): Variants => {
  const hidden: Record<string, { opacity: number; x?: number; y?: number; scale?: number }> = {
    up: { opacity: 0, y: 60 },
    down: { opacity: 0, y: -60 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
    scale: { opacity: 0, scale: 0.8 },
    fade: { opacity: 0 }
  };

  return {
    hidden: hidden[direction] || hidden.up,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1
    }
  };
};

export const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  stagger = false
}: AnimatedSectionProps) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedContainer = ({
  children,
  className = '',
  staggerDelay = 0.1
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: speed * 50 }}
      viewport={{ once: false }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
};

import { motion, Variants } from 'framer-motion';

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export const LetterReveal = ({ 
  text, 
  className = '', 
  delay = 0, 
  staggerDelay = 0.03,
  as: Component = 'span' 
}: LetterRevealProps) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex me-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={child}
              className="inline-block"
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// Gradient version with shimmer effect
interface GradientLetterRevealProps extends LetterRevealProps {
  gradientColors?: string;
}

export const GradientLetterReveal = ({ 
  text, 
  className = '', 
  delay = 0, 
  staggerDelay = 0.04,
  gradientColors = 'from-primary via-secondary to-accent'
}: GradientLetterRevealProps) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -45,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent animate-gradient-shift ${className}`}
      style={{ backgroundSize: '200% 200%' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex me-[0.25em]" style={{ perspective: '1000px' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={child}
              className="inline-block"
              style={{ 
                display: 'inline-block', 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};
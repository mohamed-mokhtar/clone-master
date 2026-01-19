import { motion, Variants } from 'framer-motion';

// Helper to detect if text contains Arabic characters
const isArabic = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
};

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
}: LetterRevealProps) => {
  const words = text.split(' ');
  const isRTL = isArabic(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: isRTL ? 0.1 : staggerDelay, delayChildren: delay * i },
    }),
  };

  const wordVariant: Variants = {
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

  const letterVariant: Variants = {
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

  // For Arabic text, animate whole words to preserve letter connections
  if (isRTL) {
    return (
      <motion.span
        className={`inline-flex flex-wrap ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={wordVariant}
            className="inline-block ms-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // For non-Arabic text, animate individual letters
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
              variants={letterVariant}
              className="inline-block"
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
  const isRTL = isArabic(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isRTL ? 0.12 : staggerDelay, delayChildren: delay },
    },
  };

  const wordVariant: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  const letterVariant: Variants = {
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

  // For Arabic text, animate whole words to preserve letter connections
  if (isRTL) {
    return (
      <motion.span
        className={`inline-flex flex-wrap bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent animate-gradient-shift ${className}`}
        style={{ backgroundSize: '200% 200%' }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={wordVariant}
            className="inline-block ms-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // For non-Arabic text, animate individual letters
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
              variants={letterVariant}
              className="inline-block"
              style={{ 
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
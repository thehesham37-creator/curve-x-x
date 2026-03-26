import { motion } from "motion/react";

interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: string;
  opacity?: number;
  animate?: boolean;
}

export const GlowEffect = ({ 
  className = "", 
  color = "#E50914", 
  size = "400px", 
  opacity = 0.15,
  animate = true 
}: GlowEffectProps) => {
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full blur-[120px] z-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: `var(--glow-opacity, ${opacity})`,
      }}
      animate={animate ? {
        scale: [1, 1.2, 1],
      } : {}}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

import React from "react";
import { motion } from "motion/react";

export const Logo = ({ className = "", isArabic = false }: { className?: string; isArabic?: boolean }) => {
  return (
    <motion.div 
      className={`flex items-center gap-2 select-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={`relative flex items-center ${isArabic ? 'font-arabic' : 'font-display'}`}>
        <span className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
          CURVE
        </span>
        <span className="text-4xl md:text-6xl font-black text-brand-red ml-2 rtl:ml-0 rtl:mr-2">
          X
        </span>
        
        {/* Sharp accent line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-2 left-0 h-[2px] bg-brand-red opacity-50"
        />
      </div>
    </motion.div>
  );
};


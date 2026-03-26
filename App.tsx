import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useTransform, useMotionValue } from "motion/react";
import { Logo } from "./components/Logo";
import { GlowEffect } from "./components/GlowEffect";
import { ArrowRight, Instagram, Facebook, Zap, Target, Layers, TrendingUp, Globe, Sun, Moon, MessageSquare } from "lucide-react";

type Language = "en" | "ar";
type Theme = "dark" | "light";

const translations = {
  en: {
    hero: {
      headline: "Where Performance Meets Automation",
      subheadline: "We build scalable growth systems powered by data and AI.",
      cta: "Work With Us",
    },
    about: {
      subtitle: "Vision",
      title: "Who We Are",
      text1: "CURVE X is a performance-driven agency that builds scalable acquisition systems using data, creativity, and automation.",
      text2: "We don’t run ads — we engineer growth machines.",
    },
    services: {
      subtitle: "Expertise",
      title: "What We Do",
      items: [
        {
          title: "Performance Marketing",
          desc: "We create, test, and scale high-converting ad campaigns focused on ROI.",
        },
        {
          title: "AI Automation Systems",
          desc: "We build automated systems that capture, qualify, and convert leads.",
        },
        {
          title: "Creative Strategy",
          desc: "We design high-converting creatives that turn attention into revenue.",
        },
      ],
    },
    automation: {
      subtitle: "Efficiency",
      title: "Automation That Prints Results",
      text: "We design intelligent systems that convert leads into customers automatically.",
    },
    mediaBuying: {
      subtitle: "Growth",
      title: "Performance at Scale",
      text: "Our strategy is built on testing, data, and aggressive scaling focused on revenue.",
    },
    ctaSection: {
      title: "Start Your Growth Engine",
      text: "Let’s build a system that scales your business using performance marketing and AI automation.",
      messageCta: "Message Us on Instagram",
    },
    contact: {
      subtitle: "Connect",
      title: "Let’s Work Together",
      text: "Ready to scale? Let’s build your system.",
    },
  },
  ar: {
    hero: {
      headline: "حيث يلتقي الأداء مع الأتمتة",
      subheadline: "نحن نبني أنظمة نمو قابلة للتوسع مدعومة بالبيانات والذكاء الاصطناعي.",
      cta: "اعمل معنا",
    },
    about: {
      subtitle: "الرؤية",
      title: "من نحن",
      text1: "Curve X هي وكالة تعتمد على الأداء تبني أنظمة استحواذ قابلة للتوسع باستخدام البيانات والإبداع والأتمتة.",
      text2: "نحن لا ندير الإعلانات فحسب - بل نصمم آلات نمو.",
    },
    services: {
      subtitle: "الخبرة",
      title: "ماذا نفعل",
      items: [
        {
          title: "الميديا باينج",
          desc: "نقوم بإنشاء واختبار وتوسيع حملات إعلانية عالية التحويل تركز على العائد على الاستثمار.",
        },
        {
          title: "أنظمة الأتمتة بالذكاء الاصطناعي",
          desc: "نبني أنظمة مؤتمتة تلتقط وتؤهل وتحول العملاء المحتملين.",
        },
        {
          title: "استراتيجيات الكريتيف",
          desc: "نصمم كريتيف عالي التحويل يحول الانتباه إلى إيرادات.",
        },
      ],
    },
    automation: {
      subtitle: "الكفاءة",
      title: "أتمتة تحقق نتائج فعلية",
      text: "نصمم أنظمة ذكية تحول العملاء المحتملين إلى عملاء بشكل تلقائي.",
    },
    mediaBuying: {
      subtitle: "النمو",
      title: "أداء على نطاق واسع",
      text: "نعتمد على البيانات والتجربة والتوسع الذكي لتحقيق أعلى عائد.",
    },
    ctaSection: {
      title: "ابدأ محرك نموك",
      text: "دعنا نبني نظاماً يوسع نطاق عملك باستخدام الميديا باينج وأتمتة الذكاء الاصطناعي.",
      messageCta: "راسلنا على إنستغرام",
    },
    contact: {
      subtitle: "تواصل",
      title: "تواصل معنا",
      text: "جاهز تكبر البيزنس؟ خلينا نبني لك سيستم نمو متكامل.",
    },
  },
};

// --- Magnetic Wrapper Component ---
const MagneticWrapper = ({ children, className = "", strength = 0.35 }: { children: React.ReactNode, className?: string, strength?: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ 
        scale: 1.1,
        filter: "drop-shadow(0 0 15px rgba(229, 9, 20, 0.4))"
      }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Floating Animation Component ---
const FloatingElement = ({ children, delay = 0, duration = 4, yRange = [-15, 0], rotateRange = [-2, 2] }: { children: React.ReactNode, delay?: number, duration?: number, yRange?: [number, number], rotateRange?: [number, number] }) => (
  <motion.div
    animate={{
      y: [0, yRange[0], 0],
      rotate: [0, rotateRange[0], 0, rotateRange[1], 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string, isArabic: boolean, key?: React.Key }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="preserve-3d transition-transform duration-200 ease-out h-full">
        {children}
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ children, subtitle, isArabic }: { children: React.ReactNode, subtitle?: string, isArabic: boolean }) => (
  <div className="mb-12 md:mb-20">
    {subtitle && (
      <FloatingElement duration={4}>
        <motion.span 
          initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-brand-red font-display text-sm uppercase tracking-[0.4em] mb-4 block font-bold"
        >
          {subtitle}
        </motion.span>
      </FloatingElement>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className={`h-1.5 bg-brand-red mt-8 ${isArabic ? 'mr-0 ml-auto' : ''}`}
    />
  </div>
);

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        className="w-2 h-2 bg-brand-red rounded-full absolute"
      />
      
      {/* Outer Ring */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          borderWidth: isHovering ? "1px" : "2px",
          borderColor: isHovering ? "rgba(229, 9, 20, 0.5)" : "var(--text-color)",
          opacity: isHovering ? 0.8 : 0.3
        }}
        className="w-10 h-10 border-2 rounded-full absolute transition-colors duration-300"
      />

      {/* Trailing Glow */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 4 : 2,
          opacity: isHovering ? 0.15 : 0.05
        }}
        className="w-12 h-12 bg-brand-red rounded-full absolute blur-xl"
      />
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const t = translations[lang];
  const isArabic = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleLang = () => setLang(prev => prev === "en" ? "ar" : "en");
  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/curve__x/", "_blank");
  };

  return (
    <div ref={containerRef} className="relative min-h-screen transition-colors duration-700 ease-in-out overflow-hidden selection:bg-brand-red selection:text-white">
      <CustomCursor />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-red z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingElement duration={10} yRange={[-30, 0]}>
          <GlowEffect className="-top-40 -left-40" size="800px" opacity={0.12} />
        </FloatingElement>
        <FloatingElement duration={12} delay={1} yRange={[-40, 0]}>
          <GlowEffect className="top-1/4 -right-60" size="1000px" opacity={0.1} />
        </FloatingElement>
        <FloatingElement duration={15} delay={2} yRange={[-25, 0]}>
          <GlowEffect className="-bottom-60 left-1/3" size="700px" opacity={0.15} />
        </FloatingElement>
        
        {/* Subtle Grid Lines with Parallax */}
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            backgroundImage: `linear-gradient(var(--text-color) 1px, transparent 1px), linear-gradient(90deg, var(--text-color) 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }}
          className="absolute inset-0 opacity-[0.04]" 
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-8 md:px-12 flex justify-between items-center backdrop-blur-md bg-opacity-10">
        <MagneticWrapper strength={0.2}>
          <Logo className="scale-75 md:scale-100 origin-left rtl:origin-right" isArabic={isArabic} />
        </MagneticWrapper>
        
        <div className="flex items-center gap-3 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-full border border-current border-opacity-20 hover:border-opacity-100 transition-all"
          >
            <MagneticWrapper strength={0.5}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </MagneticWrapper>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLang}
            className="flex items-center gap-2 px-5 py-2.5 rounded-none border border-current border-opacity-20 hover:border-opacity-100 transition-all font-display text-xs font-bold uppercase tracking-widest overflow-hidden group"
          >
            <MagneticWrapper strength={0.3} className="flex items-center gap-2">
              <Globe size={14} /> {lang === "en" ? "AR" : "EN"}
            </MagneticWrapper>
            <motion.div className="absolute inset-0 bg-brand-red -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "var(--text-color)", color: "var(--bg-color)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="hidden md:flex items-center gap-2 text-xs font-display font-bold tracking-[0.2em] uppercase border border-current px-8 py-3 transition-all"
          >
            <MagneticWrapper strength={0.2} className="flex items-center gap-2">
              {isArabic ? "اتصل بنا" : "Contact"} <ArrowRight size={14} className="rtl:rotate-180" />
            </MagneticWrapper>
          </motion.button>
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
              <div className="relative z-10 text-center max-w-6xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-16 flex justify-center"
                  >
                    <FloatingElement duration={6} yRange={[-20, 0]}>
                      <MagneticWrapper strength={0.4}>
                        <Logo isArabic={isArabic} className="scale-125 md:scale-150" />
                      </MagneticWrapper>
                    </FloatingElement>
                  </motion.div>

                <div className="relative">
                  <FloatingElement duration={8} yRange={[-30, 0]}>
                    <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="600px" opacity={0.25} />
                  </FloatingElement>
                  <motion.h1 
                    style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -50]) }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`text-5xl md:text-9xl font-extrabold tracking-tighter mb-10 leading-[0.95] text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}
                  >
                    {t.hero.headline}
                  </motion.h1>
                </div>

                <motion.p 
                  style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -30]) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl md:text-3xl opacity-50 font-light max-w-3xl mx-auto mb-16 leading-tight tracking-tight"
                >
                  {t.hero.subheadline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(229, 9, 20, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className="bg-brand-red text-white px-12 py-6 rounded-none font-bold uppercase tracking-[0.3em] text-sm flex items-center gap-4 mx-auto transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {t.hero.cta} 
                      <motion.span animate={{ x: isArabic ? [0, -8, 0] : [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <MagneticWrapper strength={0.8}>
                          <ArrowRight size={20} className="rtl:rotate-180" />
                        </MagneticWrapper>
                      </motion.span>
                    </span>
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  </motion.button>
                </motion.div>
              </div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
              >
                <div className="w-[1.5px] h-24 bg-gradient-to-b from-brand-red to-transparent" />
              </motion.div>
            </section>

            {/* About Section */}
            <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
              <SectionTitle subtitle={t.about.subtitle} isArabic={isArabic}>{t.about.title}</SectionTitle>
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: isArabic ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  <p className={`text-3xl md:text-5xl font-light leading-[1.1] tracking-tight text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}>
                    {t.about.text1.split(' ').map((word, i) => (
                      <span key={i} className={word.toLowerCase().includes('data') || word.includes('بيانات') || word.includes('إبداع') || word.includes('أتمتة') || word.includes('automation') ? "text-brand-red font-bold" : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: isArabic ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="space-y-8 opacity-40 text-xl md:text-2xl font-light leading-relaxed"
                >
                  <p>{t.about.text2}</p>
                </motion.div>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-40 px-6 md:px-12 bg-current text-bg transition-colors duration-700 relative overflow-hidden" style={{ color: 'var(--text-color)', backgroundColor: 'var(--text-color)' }}>
              <div className="max-w-7xl mx-auto relative z-10" style={{ color: 'var(--bg-color)' }}>
                <div className="mb-24">
                  <motion.span 
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-red font-display text-sm uppercase tracking-[0.4em] mb-6 block font-bold"
                  >
                    {t.services.subtitle}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}
                  >
                    {t.services.title}
                  </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {t.services.items.map((service, i) => (
                    <TiltCard key={i} isArabic={isArabic}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="p-12 border border-current border-opacity-10 hover:border-brand-red transition-all group relative h-full flex flex-col justify-between"
                        style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                      >
                        <div>
                          <div className="mb-10">
                            <MagneticWrapper strength={0.6}>
                              {i === 0 ? <Target className="text-brand-red" size={40} /> : i === 1 ? <Zap className="text-brand-red" size={40} /> : <Layers className="text-brand-red" size={40} />}
                            </MagneticWrapper>
                          </div>
                          <h3 className={`text-3xl font-bold mb-6 leading-tight ${isArabic ? 'font-arabic' : 'font-display'}`}>{service.title}</h3>
                          <p className="opacity-50 text-lg leading-relaxed font-light">{service.desc}</p>
                        </div>
                        <motion.div 
                          className="absolute bottom-0 left-0 h-1.5 bg-brand-red w-0 group-hover:w-full transition-all duration-500"
                        />
                        
                        {/* 3D Depth Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-brand-red blur-3xl" />
                      </motion.div>
                    </TiltCard>
                  ))}
                </div>
              </div>
              
              {/* Subtle background text */}
              <div className="absolute -bottom-32 -right-32 text-[30rem] font-display font-black opacity-[0.03] select-none pointer-events-none" style={{ color: 'var(--bg-color)' }}>
                CURVE
              </div>
            </section>

            {/* Automation Highlight */}
            <section className="py-40 px-6 md:px-12 relative">
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <SectionTitle subtitle={t.automation.subtitle} isArabic={isArabic}>{t.automation.title}</SectionTitle>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={`text-2xl md:text-5xl font-light opacity-80 leading-[1.1] tracking-tight mb-16 text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}
                >
                  "{t.automation.text}"
                </motion.p>
                
                <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent my-24">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-40 h-full bg-brand-red shadow-[0_0_30px_#E50914]"
                  />
                </div>
              </div>
              
              <FloatingElement duration={8}>
                <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="800px" opacity={0.12} />
              </FloatingElement>
            </section>

            {/* Media Buying Section */}
            <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-20 items-end justify-between">
                <div className="max-w-3xl">
                  <SectionTitle subtitle={t.mediaBuying.subtitle} isArabic={isArabic}>{t.mediaBuying.title}</SectionTitle>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl opacity-50 leading-relaxed font-light"
                  >
                    {t.mediaBuying.text}
                  </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 text-brand-red"
                >
                  <MagneticWrapper strength={0.4}>
                    <TrendingUp size={64} />
                  </MagneticWrapper>
                  <FloatingElement duration={3} yRange={[-20, 0]}>
                    <span className="text-7xl md:text-[10rem] font-display font-black tracking-tighter leading-none inline-block">10X</span>
                  </FloatingElement>
                </motion.div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6 md:px-12 relative overflow-hidden">
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`text-5xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-sharp ${isArabic ? 'font-arabic' : 'font-display'}`}
                >
                  {t.ctaSection.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xl md:text-3xl opacity-50 font-light max-w-3xl mx-auto mb-20 leading-tight"
                >
                  {t.ctaSection.text}
                </motion.p>

                <div className="flex flex-col items-center justify-center gap-8">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(229, 9, 20, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openInstagram}
                    className="bg-brand-red text-white px-14 py-7 rounded-none font-bold uppercase tracking-[0.3em] text-sm flex items-center gap-4 transition-all"
                  >
                    {t.ctaSection.messageCta} <Instagram size={20} />
                  </motion.button>
                </div>
              </div>
              
              <FloatingElement duration={10}>
                <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="1000px" opacity={0.2} />
              </FloatingElement>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="py-40 px-6 md:px-12 bg-current text-bg transition-colors duration-700" style={{ color: 'var(--text-color)', backgroundColor: 'var(--text-color)' }}>
              <div className="max-w-7xl mx-auto" style={{ color: 'var(--bg-color)' }}>
                <div className="grid md:grid-cols-2 gap-32">
                  <div>
                    <SectionTitle subtitle={t.contact.subtitle} isArabic={isArabic}>{t.contact.title}</SectionTitle>
                    <p className={`text-3xl font-light mb-16 leading-tight ${isArabic ? 'font-arabic' : 'font-display'}`}>
                      {t.contact.text}
                    </p>
                    
                    <div className="flex flex-col gap-10">
                      <motion.a 
                        href="https://www.instagram.com/curve__x/" 
                        target="_blank"
                        whileHover={{ x: 10, color: "#E50914" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-6 group transition-all"
                      >
                        <div className="p-4 border border-current border-opacity-10 group-hover:border-brand-red rounded-full transition-all">
                          <MagneticWrapper strength={0.5}>
                            <Instagram size={32} />
                          </MagneticWrapper>
                        </div>
                        <span className="text-3xl font-bold tracking-tighter uppercase italic">@curve__x</span>
                      </motion.a>
                      
                      <motion.a 
                        href="https://www.facebook.com/TheCURVEX/directory_specialties" 
                        target="_blank"
                        whileHover={{ x: 10, color: "#E50914" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-6 group transition-all"
                      >
                        <div className="p-4 border border-current border-opacity-10 group-hover:border-brand-red rounded-full transition-all">
                          <MagneticWrapper strength={0.5}>
                            <Facebook size={32} />
                          </MagneticWrapper>
                        </div>
                        <span className="text-3xl font-bold tracking-tighter uppercase italic">Curve X</span>
                      </motion.a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center md:items-end">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="text-right rtl:text-left"
                    >
                      <MagneticWrapper strength={0.2}>
                        <Logo className="scale-150 mb-8 opacity-20" isArabic={isArabic} />
                      </MagneticWrapper>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 border-t border-current border-opacity-5 flex flex-col md:flex-row justify-between items-center gap-10">
        <MagneticWrapper strength={0.2}>
          <Logo className="scale-90 opacity-40" isArabic={isArabic} />
        </MagneticWrapper>
        <p className="opacity-30 text-xs font-display font-bold tracking-[0.4em] uppercase">
          © 2026 CURVE X. {isArabic ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
        </p>
        <div className="flex gap-10 opacity-30 text-xs font-bold uppercase tracking-[0.4em]">
          <MagneticWrapper strength={0.4}>
            <a href="#" className="hover:text-brand-red transition-colors">{isArabic ? "الخصوصية" : "Privacy"}</a>
          </MagneticWrapper>
          <MagneticWrapper strength={0.4}>
            <a href="#" className="hover:text-brand-red transition-colors">{isArabic ? "الشروط" : "Terms"}</a>
          </MagneticWrapper>
        </div>
      </footer>
    </div>
  );
}

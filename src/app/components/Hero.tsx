import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Video IDs & Layout Configuration
const CARD_VIDEOS = [
  // 1. Top Left Start
  // Duration: 0.35
  { 
    id: "Zo_sCr3fXcg", 
    initialX: "-150vw", 
    initialY: "-100vh",
    start: 0.0,
    end: 0.35
  },
  // 2. Top Right Start
  // Starts when #1 is at 45% (0.16)
  { 
    id: "sg-n6nxuGro", 
    initialX: "150vw", 
    initialY: "-100vh",
    start: 0.16,
    end: 0.51
  },
  // 3. Bottom Right Start
  // Starts when #2 is at 45% progress relative to its duration (0.16 + 0.16 = 0.32)
  { 
    id: "J0XqiR-8gck", 
    initialX: "150vw", 
    initialY: "100vh",
    start: 0.32,
    end: 0.67
  },
  // 4. Bottom Left Start
  // Starts when #3 is at 45% progress relative to its duration (0.32 + 0.16 = 0.48)
  { 
    id: "ldhdsX7zFNE", 
    initialX: "-150vw", 
    initialY: "100vh",
    start: 0.48,
    end: 0.83
  },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Main Video Animation Timing
  const mainScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]); 
  const mainRadius = useTransform(scrollYProgress, [0, 0.8], ["0px", "24px"]);
  
  // Dynamic Dim Overlay Opacity
  const dimOpacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.75, 0.85, 1.0], 
    [0.5, 0, 0, 0.5, 0.5]
  );

  // First Text: Fades out earlier
  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const firstTextY = useTransform(scrollYProgress, [0, 0.12], [0, -100]);

  // Second Text: Fades in earlier to give button more time
  const secondTextOpacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
  const secondTextY = useTransform(scrollYProgress, [0.75, 0.82], [20, 0]);

  // CTA Button: Fades in at 0.82 and STAYS until 1.0
  const buttonOpacity = useTransform(scrollYProgress, [0.82, 0.88], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.82, 0.88], [30, 0]);

  // Section Exit: Significantly delayed to keep button clickable
  // Fades out only in the very last 5% of the scroll
  const sectionScale = useTransform(scrollYProgress, [0.95, 1.0], [1, 0.9]);
  const sectionOpacity = useTransform(scrollYProgress, [0.95, 1.0], [1, 0]);
  const sectionBlur = useTransform(scrollYProgress, [0.95, 1.0], ["0px", "10px"]);

  return (
    <motion.div 
        ref={containerRef} 
        // Increased to 400vh to provide a "hold" area at the end
        className="relative w-full h-[400vh] bg-black"
        style={{ 
            scale: sectionScale, 
            opacity: sectionOpacity,
            filter: sectionBlur,
            willChange: "transform, opacity, filter"
        }} 
    >
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Dynamic Dim Layer - z-index higher than cards (z-10) but lower than text (z-30) */}
        <motion.div 
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black z-20 pointer-events-none"
        />

        {/* First Intro Text */}
        <motion.div 
            style={{ opacity: firstTextOpacity, y: firstTextY }}
            className="absolute z-30 text-center px-6 pointer-events-none"
        >
            <h1 
                className="text-[32px] md:text-[64px] font-[800] leading-[1.3] text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap"
            >
                영상 제작의 시대가 바뀝니다.<br />
                1/10의 비용, 10배 빠른 속도
            </h1>
            <p 
                className="text-[18px] md:text-[20px] font-[400] leading-[1.5] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
                고가의 장비와 인력 없이 AI로 구현하는 압도적 영상 퀄리티
            </p>
        </motion.div>

        {/* Main Background Video */}
        <motion.div 
            style={{ 
                scale: mainScale, 
                borderRadius: mainRadius,
            }}
            className="relative z-0 w-full h-full overflow-hidden shadow-2xl origin-center will-change-transform bg-black"
        >
            <div className="relative w-full h-full overflow-hidden pointer-events-none">
                <iframe 
                    // Use wide width on mobile to cover 9:16 screen with 16:9 video
                    className="absolute top-1/2 left-1/2 w-[320%] sm:w-[150vw] h-full sm:h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover"
                    src="https://www.youtube.com/embed/dfGCYs-gF1o?autoplay=1&mute=1&loop=1&playlist=dfGCYs-gF1o&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1" 
                    title="Main Showreel" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>
        </motion.div>

        {/* Floating Cards - Animated Entrance to Center */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {CARD_VIDEOS.map((card) => (
                <FloatingCard 
                    key={card.id} 
                    card={card} 
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>

        {/* Second Intro Text (Before Button) */}
        <motion.div 
            style={{ opacity: secondTextOpacity, y: secondTextY }}
            className="absolute z-30 text-center px-6 w-full max-w-5xl pointer-events-none mb-32"
        >
            <h2 
                className="text-[32px] md:text-[64px] font-[800] leading-[1.3] text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
                낮은 퀄리티와 비싼 견적,<br />
                그 실망을 확신으로 바꿉니다.
            </h2>
            <p 
                className="text-[18px] md:text-[20px] font-[400] leading-[1.5] text-white/90 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
                AI STUDIO48은 기술을 넘어 영상의 본질과 압도적 효율을 증명합니다.<br className="hidden md:block" />
                가치를 아는 창의적인 브랜드와 함께, 영상 제작의 기준을 다시 씁니다.
            </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
            style={{ opacity: buttonOpacity, y: buttonY }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center px-4 pointer-events-auto"
        >
            <a 
            href="#apply"
            className="flex items-center gap-2 bg-[#FF7C2B] text-white text-[18px] md:text-xl font-semibold leading-[1.5] px-8 py-4 rounded-full hover:bg-[#E0651A] hover:scale-105 transition-all shadow-xl shadow-orange-900/50"
            >
            협업 진행하러 가기
            <ArrowRight className="w-5 h-5" />
            </a>
        </motion.div>
      </div>

    </motion.div>
  );
};

// Extracted for cleaner transform logic
const FloatingCard = ({ card, scrollYProgress }: { card: any, scrollYProgress: any }) => {
    // Movement: Starts at 'start', finishes at 'end'
    // Moves from off-screen (initialX/Y) to Center (-50%, -50%)
    const x = useTransform(scrollYProgress, [card.start, card.end], [card.initialX, "-50%"]);
    const y = useTransform(scrollYProgress, [card.start, card.end], [card.initialY, "-50%"]);
    
    // Opacity: Fades in
    const fadeEnd = card.start + (card.end - card.start) * 0.8;
    const opacity = useTransform(scrollYProgress, [card.start, fadeEnd], [0, 1]);

    return (
        <motion.div
            initial={{ x: card.initialX, y: card.initialY, opacity: 0 }}
            style={{ x, y, opacity }}
            // CSS positions at top-1/2 left-1/2. 
            // The transform 'x: -50%, y: -50%' will center it perfectly at the end.
            // Responsive width and aspect ratio for mobile cropping (9:16 on mobile, 16:9 on desktop)
            className="absolute top-1/2 left-1/2 w-[85%] sm:w-[50%] aspect-[9/16] sm:aspect-video rounded-2xl sm:rounded-xl overflow-hidden shadow-2xl block pointer-events-auto bg-black will-change-transform"
        >
            <div className="relative w-full h-full">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${card.id}?autoplay=1&mute=1&loop=1&playlist=${card.id}&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
                    title="Floating Video"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    // Fill the container height and scale width to cover the aspect ratio (9:16 container vs 16:9 video)
                    // Mobile: wide width centered to cover. Desktop: normal fit.
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320%] sm:w-full h-full sm:h-full object-cover pointer-events-none sm:scale-[1.1]" 
                />
                <div className="absolute inset-0 bg-transparent z-10" />
            </div>
        </motion.div>
    );
}
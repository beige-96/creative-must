import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'motion/react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  { id: "pxnqUffbFW0", title: "Creating a better world | MSQ Global" },
  { id: "dfGCYs-gF1o", title: "[AI STUDIO 48] SHOWREEL 2026" },
  { id: "ldhdsX7zFNE", title: "Global HR Forum 2025 | AI Cinematic Flim ㅣ AI 프로모션 영상" },
  { id: "Zo_sCr3fXcg", title: "Sejong Conference 2025ㅣ AI Cinematic Flim ㅣ AI 프로모션 영상" },
  { id: "sg-n6nxuGro", title: "M BlackLabel Premium Water ㅣ AI Cinematic Flim ㅣ AI 프로모션 영상" },
  { id: "sKayYaGc3Sw", title: "ZEROPLUS Official Synopsis Promo ㅣ AI Cinematic Flim ㅣ AI 프로모션 영상" },
  { id: "J0XqiR-8gck", title: "BMW 7 Series Commercial l AI Cinematic Flim l AI 프로모션 영상" },
  { id: "u-KFJGFEblM", title: "MOAD Premium Urea Solutionㅣ AI Cinematic Flim ㅣ AI 프로모션 영상" },
];

export const Portfolio = () => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Scroll Animation Logic
  const containerRef = useRef<HTMLElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateDimensions = () => {
        if (containerRef.current) {
            setElementTop(containerRef.current.offsetTop);
            setClientHeight(window.innerHeight);
        }
    };
    
    // Update initially and on resize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate range to last longer (1.5x viewport height)
  const range = [elementTop, elementTop + clientHeight * 1.5];

  // Delay the exit animations to let the user browse the portfolio
  const scale = useTransform(scrollY, [elementTop + clientHeight * 0.4, elementTop + clientHeight * 0.8], [1, 0.75]);
  const opacity = useTransform(scrollY, [elementTop + clientHeight * 0.5, elementTop + clientHeight * 0.8], [1, 0]);
  const blur = useTransform(scrollY, [elementTop + clientHeight * 0.4, elementTop + clientHeight * 0.8], ["0px", "20px"]);

  // Transform x position to indicator position (0 to 40px)
  const indicatorX = useTransform(x, [0, -width || -1], [0, 40]);

  const handlePrev = () => {
    const currentX = x.get();
    const itemWidth = 624; // 600px width + 24px gap
    const nextX = Math.min(0, currentX + itemWidth);
    animate(x, nextX, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleNext = () => {
    const currentX = x.get();
    const itemWidth = 624; // 600px width + 24px gap
    const nextX = Math.max(-width, currentX - itemWidth);
    animate(x, nextX, { type: "spring", stiffness: 300, damping: 30 });
  };

  // Width calculation for carousel
  useEffect(() => {
    const updateWidth = () => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    const timeoutId = setTimeout(updateWidth, 500);

    return () => {
        window.removeEventListener('resize', updateWidth);
        clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section 
        ref={containerRef}
        id="portfolio" 
        className="relative h-[150vh] bg-black shadow-[0_-50px_100px_rgba(0,0,0,0.9)]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-24 z-30 overflow-hidden">
        <motion.div
            style={{ scale, opacity, filter: blur }}
            className="w-full origin-center"
        >
        <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="max-w-3xl">
                <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 leading-[1.3]">
                이 모든 작품은<br /> <span className="text-[#FF7C2B]">100% AI로</span> 제작되었습니다.
                </h2>
                <p className="text-[18px] md:text-xl font-normal text-gray-400 mb-8 leading-[1.5]">
                브랜드의 가치를 높이는 시네마틱 광고부터 실무 숏폼까지
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xl font-normal leading-[1.5] backdrop-blur-sm border border-white/5">
                Portfolio
                </span>
            </div>
        </div>

        {/* Draggable Carousel Container */}
        <motion.div 
            className="cursor-grab active:cursor-grabbing"
        >
            <motion.div 
                ref={carouselRef}
                style={{ x }}
                className="flex space-x-6 px-6 md:px-[max(1.5rem,calc((100%-80rem)/2+1.5rem))]"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                whileTap={{ cursor: "grabbing" }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            >
                {PORTFOLIO_ITEMS.map((item, index) => (
                <motion.div 
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-none w-[85vw] md:w-[600px] aspect-video relative rounded-2xl overflow-hidden group bg-gray-900 select-none"
                >
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <iframe 
                            className="w-full h-full object-cover scale-[1.35] pointer-events-none"
                            src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&loop=1&playlist=${item.id}&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1`}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            tabIndex={-1}
                        />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                        <h3 className="text-xl font-normal text-white max-w-[80%] leading-[1.5] drop-shadow-lg">
                            {item.title}
                        </h3>
                        
                        <a 
                            href={`https://www.youtube.com/watch?v=${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-[#FF7C2B] hover:border-[#FF7C2B] transition-all duration-300 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Plus size={24} />
                        </a>
                    </div>
                </motion.div>
                ))}
            </motion.div>
        </motion.div>
        
        {/* Navigation & Scroll indicator */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
            <div className="flex items-center gap-6">
                <div className="flex gap-3">
                    <button 
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
                
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        className="w-1/3 h-full bg-[#FF7C2B] rounded-full" 
                        style={{ x: indicatorX }}
                    />
                </div>
            </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

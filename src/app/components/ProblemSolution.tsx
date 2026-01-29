import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { X } from 'lucide-react';

export const ProblemSolution = () => {
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
    
    // Initial measure
    updateDimensions();
    
    // Remeasure on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate the animation range based on absolute scroll position
  // Start: When the element hits the top of the viewport (scrollY == elementTop)
  // End: After scrolling 60% of viewport height
  const rangeEnd = elementTop + clientHeight * 0.6;

  // Scale down to create depth - starts scaling later
  const scale = useTransform(scrollY, [elementTop + clientHeight * 0.2, rangeEnd], [1, 0.75]);
  // Fade out - starts later to stay fully visible longer
  const opacity = useTransform(scrollY, [elementTop + clientHeight * 0.3, rangeEnd], [1, 0]);
  // Increase blur
  const blur = useTransform(scrollY, [elementTop + clientHeight * 0.2, rangeEnd], ["0px", "20px"]);

  return (
    <section 
        ref={containerRef} 
        id="solutions" 
        className="relative h-[160vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-12 md:py-24 px-6 overflow-hidden">
        <motion.div 
            style={{ scale, opacity, filter: blur }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center w-full origin-center"
        >
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-5xl font-extrabold mb-4 md:mb-6 leading-[1.3] text-white">
                촬영 한 번에 수 천만원,<br />
                언제까지 감당하시겠습니까?
            </h2>
            <p className="text-lg font-normal text-gray-400 mb-6 md:mb-8 leading-[1.5]">
                스튜디오 대관, 배우 섭외, 촬영팀 인건비...<br />
                부담스러운 제작 비용 때문에 마케팅을 망설이셨나요?
            </p>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4 text-[#FF7C2B]">
                    <X className="w-6 h-6" />
                    <span>복잡한 스케줄링과 인력 관리</span>
                </div>
                <div className="flex items-center gap-4 text-[#FF7C2B]">
                    <X className="w-6 h-6" />
                    <span>예상을 뛰어넘는 추가 비용</span>
                </div>
                <div className="flex items-center gap-4 text-[#FF7C2B]">
                    <X className="w-6 h-6" />
                    <span>최소 한달 이상의 제작 기간</span>
                </div>
            </div>
        </motion.div>

        <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative bg-zinc-900/50 rounded-3xl p-6 md:p-10 h-[380px] md:h-[500px] flex flex-col items-center justify-center border border-white/10"
        >
            {/* Graph Header */}
            <div className="absolute top-10 text-center">
                <span className="text-2xl font-semibold text-[#99a1af]">
                    촬영비용
                </span>
            </div>

            {/* Conceptual Graph Container */}
            <div className="relative w-full h-full flex items-end justify-center gap-4 pb-4 md:pb-10 mt-20">
                
                {/* Traditional Cost Bar */}
                <div className="w-28 md:w-32 h-[80%] bg-zinc-800 rounded-t-2xl flex flex-col items-center justify-end pb-4 border border-white/5">
                     <span className="text-xs font-normal text-gray-500 mb-2">기존 방식</span>
                     <span className="text-2xl font-semibold text-gray-400">High</span>
                </div>

                {/* AI Cost Bar - Animated */}
                <motion.div 
                    initial={{ height: "80%" }}
                    whileInView={{ height: "25%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="w-28 md:w-32 bg-[#FF7C2B] rounded-t-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,124,43,0.3)]"
                >
                     <span className="text-[10px] md:text-xs font-normal text-white/80 mb-1">AI STUDIO 48</span>
                     <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="text-xl md:text-2xl font-normal md:font-semibold text-white"
                    >
                        0 KRW
                     </motion.span>
                </motion.div>
            </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};
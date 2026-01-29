import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Minus, X, Clock, Video, Wallet } from 'lucide-react';

export const USP = () => {
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
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Unified range: Reduced for faster transition
  // elementTop is the start of the section
  
  // Exit animation ends at 0.8vh to ensure it stays fixed while being covered by next section
  const scale = useTransform(scrollY, [elementTop + clientHeight * 0.4, elementTop + clientHeight * 0.8], [1, 0.8]);
  const opacity = useTransform(scrollY, [elementTop + clientHeight * 0.5, elementTop + clientHeight * 0.8], [1, 0]);
  const blur = useTransform(scrollY, [elementTop + clientHeight * 0.4, elementTop + clientHeight * 0.8], ["0px", "10px"]);

  const comparisonData = [
    {
      icon: <Wallet className="w-5 h-5" />,
      label: "비용 (Cost)",
      traditional: {
        text: "높은 제작비",
        subtext: "장비, 스튜디오, 배우 섭외비 발생"
      },
      us: {
        text: "촬영 비용 0원",
        subtext: "100% 기술로 대체하여 거품 제거"
      }
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: "제작 방식 (Method)",
      traditional: {
        text: "실사 촬영 필수",
        subtext: "날씨, 장소 등 물리적 제약 존재"
      },
      us: {
        text: "100% 생성형 AI",
        subtext: "시공간 제약 없는 무한한 연출"
      }
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "소요 기간 (Speed)",
      traditional: {
        text: "평균 한달 이상",
        subtext: "복잡한 커뮤니케이션과 후반 작업"
      },
      us: {
        text: "최소 2주 내 작업 가능",
        subtext: "기획부터 납품까지 초고속 프로세스"
      }
    }
  ];

  return (
    <section 
        ref={containerRef}
        id="features" 
        className="relative h-[180vh] bg-black z-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-8 md:py-24 px-4 md:px-6">
        <motion.div 
            style={{ scale, opacity, filter: blur }}
            className="max-w-6xl mx-auto w-full origin-center"
        >
        <div className="text-center mb-8 md:mb-16">
            <h2 className="text-5xl font-extrabold mb-2 md:mb-4 leading-[1.3]">
                품질은 타협 없이,<br/>
                속도와 비용만 혁신합니다.
            </h2>
        </div>

        {/* Comparison Container */}
        <div className="relative bg-zinc-900/30 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm scale-[0.9] md:scale-100 origin-top md:origin-center">
            
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 p-0 border-b border-white/10 text-[10px] md:text-sm font-normal uppercase">
                <div className="hidden md:block md:col-span-3 py-6 pl-10 text-gray-500">Criteria</div>
                <div className="hidden md:block md:col-span-4 py-6 text-center text-gray-500 border-l border-white/5">Traditional / Hybrid</div>
                <div className="hidden md:block md:col-span-5 py-6 text-center text-[#FF7C2B] font-semibold border-l border-[#FF7C2B]/20 bg-gradient-to-b from-[#FF7C2B]/10 to-transparent">AI STUDIO 48</div>
                
                {/* Mobile Header */}
                <div className="md:hidden text-center text-gray-500 py-4">Comparison</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
                {comparisonData.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 relative transition-colors duration-300 overflow-hidden">
                        
                        {/* Column 1: Criteria */}
                        <div className="p-4 md:p-8 md:col-span-3 flex items-center gap-4 text-gray-400 font-medium">
                            <div className="p-2 bg-zinc-800 rounded-lg text-gray-300">
                                {item.icon}
                            </div>
                            <span className="text-base md:text-lg">{item.label}</span>
                        </div>

                        {/* Column 2: Others */}
                        <div className="p-4 md:p-8 md:col-span-4 flex flex-col justify-center items-center text-center bg-transparent transition-opacity border-l border-white/5">
                            <div className="flex items-center gap-2 mb-1 text-gray-300">
                                <span className="text-lg font-normal leading-[1.5]">{item.traditional.text}</span>
                            </div>
                            <span className="text-lg text-gray-500 leading-[1.5]">{item.traditional.subtext}</span>
                        </div>

                        {/* Column 3: AI Studio 48 (Winner) */}
                        <div className="p-4 md:p-8 md:col-span-5 flex flex-col justify-center items-center text-center relative border-l border-[#FF7C2B]/20 bg-[#FF7C2B]/5">
                            <div className="relative z-10">
                                <div className="flex items-center justify-center gap-2 mb-0.5 md:mb-1 text-white">
                                    <div className="bg-[#FF7C2B] rounded-full p-0.5">
                                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-xl font-normal text-white shadow-[#FF7C2B] drop-shadow-sm leading-[1.5]">
                                        {item.us.text}
                                    </span>
                                </div>
                                <span className="text-lg text-[#FF7C2B]/90 font-normal leading-[1.5]">
                                    {item.us.subtext}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

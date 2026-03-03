import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const USP = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Unified range for smooth entry and exit - Only for Desktop
  const desktopScale = useTransform(scrollY, 
    [elementTop - clientHeight * 0.2, elementTop, elementTop + clientHeight * 0.3, elementTop + clientHeight * 0.7], 
    [0.9, 1, 1, 0.85]
  );
  const desktopOpacity = useTransform(scrollY, 
    [elementTop - clientHeight * 0.2, elementTop, elementTop + clientHeight * 0.4, elementTop + clientHeight * 0.7], 
    [0, 1, 1, 0]
  );
  const desktopBlur = useTransform(scrollY, 
    [elementTop - clientHeight * 0.2, elementTop, elementTop + clientHeight * 0.3, elementTop + clientHeight * 0.7], 
    ["10px", "0px", "0px", "20px"]
  );

  const scale = isMobile ? 1 : desktopScale;
  const opacity = isMobile ? 1 : desktopOpacity;
  const blur = isMobile ? "0px" : desktopBlur;

  const comparisonData = [
    {
      label: t('usp.row1_label'),
      traditional: t('usp.row1_traditional'),
      us: t('usp.row1_us')
    },
    {
      label: t('usp.row2_label'),
      traditional: t('usp.row2_traditional'),
      us: t('usp.row2_us')
    },
    {
      label: t('usp.row3_label'),
      traditional: t('usp.row3_traditional'),
      us: t('usp.row3_us')
    }
  ];

  return (
    <section 
        ref={containerRef}
        id="features" 
        className="relative h-auto md:h-[140vh] bg-black z-20"
    >
      <div className="relative md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-start md:justify-center py-20 md:py-24 px-4 md:px-6">
        <motion.div 
            style={{ scale, opacity, filter: blur }}
            className="max-w-7xl mx-auto w-full origin-top md:origin-center"
        >
        <div className="text-left mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-extrabold mb-3 md:mb-4 leading-[1.3]">
                {t('usp.title1')}<br/>
                {t('usp.title2')}<span className="text-[#FF7C2B]">{t('usp.title3')}</span>{t('usp.title4')}
            </h2>
            <p className="text-[18px] md:text-xl font-normal text-gray-400 leading-[1.6] max-w-4xl">
                <span className="text-[#FF7C2B]">{t('usp.description1')}</span>{t('usp.description2')}<br className="hidden md:block" />
                {t('usp.description3')}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] gap-10 items-stretch">
            {/* Left: Graph Section (30%) */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-zinc-900/50 rounded-3xl p-8 md:p-10 h-[340px] md:h-[400px] min-h-[340px] md:min-h-[400px] flex flex-col border border-white/10 overflow-hidden"
            >
                {/* Graph Header */}
                <div className="text-center mb-10">
                    <span className="text-xl md:text-2xl font-semibold text-[#99a1af]">
                        {t('usp.cost_title')}
                    </span>
                </div>

                {/* Conceptual Graph Container - Strictly staying within padding */}
                <div className="relative flex-1 w-full flex items-end gap-4">
                    
                    {/* Traditional Cost Bar */}
                    <div className="flex-1 h-full bg-zinc-800 border border-white/5 rounded-t-[12px] flex flex-col items-center justify-end pb-3">
                        <span className="text-[16px] font-normal text-gray-500 mb-1">{t('usp.traditional_method')}</span>
                        <span className="text-3xl font-bold text-gray-400">{t('usp.high')}</span>
                    </div>

                    {/* AI Cost Bar - Animated */}
                    <motion.div 
                        initial={{ height: "100%" }}
                        whileInView={{ height: "42%" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                        className="flex-1 bg-[#FF7C2B] flex flex-col items-center justify-end shadow-[0_0_50px_rgba(255,124,43,0.2)] rounded-t-[12px] pb-3"
                    >
                        <span className="text-[16px] font-normal text-white/80 mb-1">{t('usp.company_name')}</span>
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="text-3xl font-bold text-white"
                        >
                            {t('usp.zero_krw')}
                        </motion.span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right: Comparison Table (70%) */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-zinc-900/30 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm flex flex-col"
            >
                <table className="w-full border-collapse flex-1">
                    <thead>
                        <tr className="border-b border-white/10 text-[18px] font-semibold text-gray-500">
                            <th className="py-6 px-6 text-left border-r border-white/10">{t('usp.table_header_category')}</th>
                            <th className="py-6 px-6 text-center border-r border-white/10">{t('usp.table_header_agency')}</th>
                            <th className="py-6 px-6 text-center text-[#FF7C2B] bg-[#FF7C2B]/5">{t('usp.table_header_us')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {comparisonData.map((item, index) => (
                            <tr key={index} className="text-gray-300 text-[16px] md:text-[18px]">
                                <td className="py-6 md:py-8 px-4 md:px-6 font-semibold border-r border-white/10 bg-zinc-900/20">{item.label}</td>
                                <td className="py-6 md:py-8 px-4 md:px-6 text-center border-r border-white/10 text-gray-500">{item.traditional}</td>
                                <td className="py-6 md:py-8 px-4 md:px-6 text-center text-white font-medium bg-[#FF7C2B]/5">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="bg-[#FF7C2B] rounded-full p-0.5">
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
                                        </div>
                                        {item.us}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};
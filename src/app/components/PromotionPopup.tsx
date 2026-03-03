import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PromotionPopup = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showCount, setShowCount] = useState(false); // Design ready, hidden for now

  useEffect(() => {
    // Check for specific URL parameter (e.g., ?utm_source=sns or ?ad=true)
    const urlParams = new URLSearchParams(window.location.search);
    const hasTargetParam = urlParams.get('utm_source') === 'sns' || urlParams.get('ad') === 'true';
    
    // Check session storage to not show again in same session if closed
    const isDismissed = sessionStorage.getItem('promo_dismissed');

    if (hasTargetParam && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  const handleJoin = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Content Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
          >
            <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
                <X size={24} />
            </button>

            <div className="p-8 md:p-10 text-center">
                <div className="w-16 h-16 bg-[#FF7C2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Gift className="text-[#FF7C2B] w-8 h-8" />
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                    {t('promotion.title')}<br />
                    {t('promotion.subtitle')}
                </h2>
                
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    {t('promotion.description1')}<br />{t('promotion.description2')}
                </p>

                {/* Status Counting (Conditional Visibility) */}
                {showCount && (
                    <div className="bg-black/40 rounded-2xl p-4 mb-8 border border-white/5 flex items-center justify-center gap-3">
                        <Users className="w-5 h-5 text-[#FF7C2B]" />
                        <span className="text-white font-medium">
                            {t('promotion.count_message_1')} <span className="text-[#FF7C2B]">74{t('promotion.count_unit')}</span> {t('promotion.count_message_2')} / {t('promotion.count_message_3')} <span className="text-[#FF7C2B]">26{t('promotion.count_unit')}</span>
                        </span>
                    </div>
                )}

                <button 
                    onClick={handleJoin}
                    className="w-full py-4 bg-[#FF7C2B] text-white text-xl font-bold rounded-2xl hover:bg-[#E0651A] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-900/40 cursor-pointer"
                >
                    {t('promotion.join_button')}
                </button>
                
                <button 
                    onClick={handleClose}
                    className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4 cursor-pointer"
                >
                    {t('promotion.later_button')}
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
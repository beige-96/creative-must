import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative z-50 bg-black py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          <h4 className="font-bold text-white mb-2">{t('footer.company_name')}</h4>
          <p>{t('footer.copyright')}</p>
        </div>
        <div className="flex space-x-6">
          <a 
            href="https://www.youtube.com/@AiStudio48" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            YouTube
          </a>
          <a 
            href="https://www.instagram.com/ai_studio48/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

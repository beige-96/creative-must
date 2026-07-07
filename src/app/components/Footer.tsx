import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative z-50 bg-black py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-gray-500 text-sm">
        {/* Company Info */}
        <div className="flex-1">
          <h4 className="font-bold text-white mb-2">{t('footer.company_name')}</h4>
          <p className="text-gray-400 mb-4">{t('footer.company_legal_name')}</p>
          <div className="grid grid-cols-1 gap-1.5 text-xs leading-relaxed">
            <p>
              <span className="text-gray-400">{t('footer.ceo')} : </span>
              <span>{t('footer.ceo_name')}</span>
            </p>
            <p>
              <span className="text-gray-400">{t('footer.phone')} : </span>
              <span>{t('footer.phone_number')}</span>
            </p>
            <p>
              <span className="text-gray-400">{t('footer.address')} : </span>
              <span>{t('footer.address_value')}</span>
            </p>
            <p>
              <span className="text-gray-400">{t('footer.business_number')} : </span>
              <span>{t('footer.business_number_value')}</span>
            </p>
            <p>
              <span>{t('footer.business_hours')}</span>
              <span className="mx-1">|</span>
              <span>{t('footer.off_days')}</span>
            </p>
            <p>
              <span className="text-gray-400">{t('footer.email')} : </span>
              <a
                href={`mailto:${t('footer.email_value')}`}
                className="hover:text-white transition-colors"
              >
                {t('footer.email_value')}
              </a>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start md:items-end justify-start">
          <div className="flex space-x-6 mb-4">
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
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-600 text-xs">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};
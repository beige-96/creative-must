import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  company: string;
  url: string;
  contact: string;
  email: string;
  purpose: string[];
  otherPurpose?: string;
  privacyAgreement: boolean;
  isAdEntry?: boolean;
}

export const CTA = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ad') === 'true') {
      setValue('isAdEntry', true);
    }
  }, [setValue]);

  const selectedPurposes = watch("purpose") || [];
  const showOtherInput = selectedPurposes.includes("기타") || selectedPurposes.includes("Others") || selectedPurposes.includes("其他") || selectedPurposes.includes("その他");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Notion');
      }

      toast.success(t('cta.success_message'));
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error(t('cta.error_message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
        id="apply" 
        className="relative z-10 min-h-screen flex flex-col justify-center py-24 md:py-32 bg-black px-6 shadow-[0_-50px_100px_rgba(0,0,0,0.9)]"
    >
      <div className="max-w-4xl mx-auto text-center w-full origin-center">
        <h2 className="text-2xl md:text-5xl font-extrabold mb-3 md:mb-6 text-white leading-[1.3]">
          {t('cta.title1')}<br />{t('cta.title2')}
        </h2>
        <p className="text-[18px] md:text-xl font-normal text-gray-400 mb-12 leading-[1.5]">
          {t('cta.subtitle')}
        </p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl shadow-orange-900/10 border border-white/10 text-left"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">{t('cta.form_company')}</label>
                        <input 
                            {...register("company", { required: t('cta.form_company_required') })}
                            type="text" 
                            placeholder={t('cta.form_company_placeholder')}
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.company && <span className="text-red-500 text-sm mt-1">{errors.company.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">{t('cta.form_name')}</label>
                        <input 
                            {...register("name", { required: t('cta.form_name_required') })}
                            type="text" 
                            placeholder={t('cta.form_name_placeholder')}
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">{t('cta.form_email')}</label>
                        <input 
                            {...register("email", { 
                                required: t('cta.form_email_required'),
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: t('cta.form_email_invalid')
                                }
                            })}
                            type="email" 
                            placeholder={t('cta.form_email_placeholder')}
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">{t('cta.form_contact')}</label>
                        <input 
                            {...register("contact", { required: t('cta.form_contact_required') })}
                            type="tel" 
                            placeholder={t('cta.form_contact_placeholder')}
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.contact && <span className="text-red-500 text-sm mt-1">{errors.contact.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">{t('cta.form_url')}</label>
                        <input 
                            {...register("url")}
                            type="url" 
                            placeholder={t('cta.form_url_placeholder')}
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-lg font-normal text-gray-300 mb-4 leading-[1.5]">{t('cta.form_purpose')}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {[
                          t('cta.purpose_options.shortform'),
                          t('cta.purpose_options.manual'),
                          t('cta.purpose_options.pr'),
                          t('cta.purpose_options.content'),
                          t('cta.purpose_options.etc')
                        ].map((item) => (
                            <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        {...register("purpose")}
                                        type="checkbox" 
                                        value={item}
                                        className="peer appearance-none w-6 h-6 rounded-lg bg-black border border-white/10 checked:bg-[#FF7C2B] checked:border-[#FF7C2B] transition-all cursor-pointer"
                                    />
                                    <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 5L5 9L13 1" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-gray-400 group-hover:text-white transition-colors text-base font-normal">{item}</span>
                            </label>
                        ))}
                    </div>

                    {showOtherInput && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <textarea
                                {...register("otherPurpose", { required: showOtherInput ? t('cta.form_other_required') : false })}
                                placeholder={t('cta.form_other_placeholder')}
                                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 min-h-[120px] resize-none"
                            />
                            {errors.otherPurpose && <span className="text-red-500 text-sm mt-1">{errors.otherPurpose.message}</span>}
                        </motion.div>
                    )}
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-900/10 border border-orange-900/20 text-orange-200/60 text-[16px] leading-[1.6]">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500/50" />
                    <p>
                        {t('cta.alert_message')}
                    </p>
                </div>
                
                <div className="rounded-xl bg-zinc-800/50 border border-white/5 text-[14px] text-gray-400 overflow-hidden transition-all">
                    <div className="flex items-center justify-between p-4 gap-3 group">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    {...register("privacyAgreement", { required: t('cta.privacy_agreement_required') })}
                                    type="checkbox" 
                                    className="peer appearance-none w-5 h-5 rounded-md bg-black border border-white/10 checked:bg-[#FF7C2B] checked:border-[#FF7C2B] transition-all cursor-pointer"
                                />
                                <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                    <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 5L5 9L13 1" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-gray-200 font-semibold group-hover:text-[#FF7C2B] transition-colors">{t('cta.privacy_agreement')}</span>
                        </label>
                        
                        <button 
                            type="button"
                            onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                            className="p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                        >
                            <motion.div
                                animate={{ rotate: showPrivacyDetails ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={20} className="text-gray-500" />
                            </motion.div>
                        </button>
                    </div>
                    
                    <AnimatePresence>
                        {showPrivacyDetails && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-black/20"
                            >
                                <div className="p-4 pt-0 space-y-4 leading-relaxed border-t border-white/5 mt-0">
                                    <p className="font-bold text-gray-300 mt-4">{t('cta.privacy_details_title')}</p>
                                    <div className="space-y-1">
                                        <p>{t('cta.privacy_details_1')}</p>
                                        <p>{t('cta.privacy_details_2')}</p>
                                        <p>{t('cta.privacy_details_3')}</p>
                                        <p>{t('cta.privacy_details_4')}</p>
                                        <p>{t('cta.privacy_details_5')}</p>
                                    </div>
                                    <p className="text-gray-500 italic">
                                        {t('cta.privacy_disclaimer')}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {errors.privacyAgreement && <div className="px-4 pb-4"><span className="text-red-500 text-sm">{errors.privacyAgreement.message}</span></div>}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FF7C2B] text-white text-[18px] md:text-xl font-semibold leading-[1.5] rounded-xl hover:bg-[#E0651A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-orange-900/40"
                >
                    {isSubmitting ? t('cta.submitting') : t('cta.submit_button')}
                </button>
            </form>
        </motion.div>
      </div>
    </section>
  );
};

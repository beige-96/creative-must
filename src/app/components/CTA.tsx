import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface FormData {
  company: string;
  url: string;
  contact: string;
  email: string;
  purpose: string[];
  otherPurpose?: string;
  privacyAgreement: boolean;
}

export const CTA = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = React.useState(false);

  const selectedPurposes = watch("purpose") || [];
  const showOtherInput = selectedPurposes.includes("기타");

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

      toast.success("신청이 완료되었습니다! 24시간 내로 연락드리겠습니다.");
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
          귀사의 브랜드가 AI와 만났을 때의<br />시너지를 확인하세요.
        </h2>
        <p className="text-[18px] md:text-xl font-normal text-gray-400 mb-12 leading-[1.5]">
          지금 당신의 상상을 눈 앞에 구현해 보세요.
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
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">업체명 (담당자명)</label>
                        <input 
                            {...register("company", { required: "업체명과 담당자명을 입력해주세요." })}
                            type="text" 
                            placeholder="주식회사 AI STUDIO (홍길동)"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.company && <span className="text-red-500 text-sm mt-1">{errors.company.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">이메일 주소</label>
                        <input 
                            {...register("email", { 
                                required: "이메일을 입력해주세요.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "유효한 이메일 형식이 아닙니다."
                                }
                            })}
                            type="email" 
                            placeholder="contact@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">연락처</label>
                        <input 
                            {...register("contact", { required: "연락처를 입력해주세요." })}
                            type="tel" 
                            placeholder="010-1234-5678"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                        {errors.contact && <span className="text-red-500 text-sm mt-1">{errors.contact.message}</span>}
                    </div>

                    <div>
                        <label className="block text-base md:text-lg font-normal text-gray-300 mb-2 leading-[1.5]">브랜드 URL (선택)</label>
                        <input 
                            {...register("url")}
                            type="url" 
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 text-[16px] md:text-base"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-lg font-normal text-gray-300 mb-4 leading-[1.5]">제작 목적 (중복 선택 가능)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {["숏폼광고", "제품사용설명", "기업홍보", "콘텐츠제작", "기타"].map((item) => (
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
                                {...register("otherPurpose", { required: showOtherInput ? "기타 내용을 입력해주세요." : false })}
                                placeholder="기타 사용 목적을 자유롭게 입력해주세요."
                                className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700 min-h-[120px] resize-none"
                            />
                            {errors.otherPurpose && <span className="text-red-500 text-sm mt-1">{errors.otherPurpose.message}</span>}
                        </motion.div>
                    )}
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-900/10 border border-orange-900/20 text-orange-200/60 text-[16px] leading-[1.6]">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500/50" />
                    <p>
                        모든 업체와 함께할 순 없습니다. <br className="sm:hidden" />
                        AI 효율을 극대화할 수 있는 브랜드만 선별하여 진행합니다.
                    </p>
                </div>

                <div className="rounded-xl bg-zinc-800/50 border border-white/5 text-[14px] text-gray-400 overflow-hidden transition-all">
                    <div className="flex items-center justify-between p-4 gap-3 group">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    {...register("privacyAgreement", { required: "개인정보 수집 및 이용에 동의해주세요." })}
                                    type="checkbox" 
                                    className="peer appearance-none w-5 h-5 rounded-md bg-black border border-white/10 checked:bg-[#FF7C2B] checked:border-[#FF7C2B] transition-all cursor-pointer"
                                />
                                <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                    <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 5L5 9L13 1" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-gray-200 font-semibold group-hover:text-[#FF7C2B] transition-colors">개인정보 수집 및 이용에 동의합니다. (필수)</span>
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
                                    <p className="font-bold text-gray-300 mt-4">개인정보 수집 및 이용에 대한 상세 안내</p>
                                    <div className="space-y-1">
                                        <p>1. 수집 목적: 신규 마케팅 서비스 홍보, 뉴스레터 발송</p>
                                        <p>2. 수집 항목: 성함, 이메일, 연락처</p>
                                        <p>3. 보유 및 이용 기간: 보유기간 2년, 마케팅 동의 철회 시까지</p>
                                        <p>4. 서비스 제공을 위한 위탁: 회사는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
                                        <p>5. 수탁자: (주)머스트인게이지 / 위탁업무 : 신규 마케팅 서비스 홍보</p>
                                    </div>
                                    <p className="text-gray-500 italic">
                                        “귀하는 위와 같은 개인정보 수집 및 이용에 거부할 권리가 있습니다. 본 동의는 선택 사항이며, 거부 시에도 서비스 이용은 가능하나 뉴스레터 및 이벤트 혜택 안내 등 일부 서비스 제공이제한될 수 있습니다.”
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
                    {isSubmitting ? '제출 중...' : '상상 실현하기'}
                </button>
            </form>
        </motion.div>
      </div>
    </section>
  );
};

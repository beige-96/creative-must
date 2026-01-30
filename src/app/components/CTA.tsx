import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface FormData {
  name: string;
  contact: string;
  company: string;
}

export const CTA = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        <h2 className="text-5xl font-extrabold mb-6 text-white leading-[1.3]">
          선착순 100팀,<br />
          지금 무료로 제작해 드립니다.
        </h2>
        <p className="text-xl font-normal text-gray-400 mb-12 leading-[1.5]">
          고민하는 순간 이벤트는 종료됩니다. 지금 바로 신청하세요.
        </p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl shadow-orange-900/10 border border-white/10 text-left"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-lg font-normal text-gray-300 mb-2 leading-[1.5]">성함</label>
                    <input 
                        {...register("name", { required: "성함을 입력해주세요." })}
                        type="text" 
                        placeholder="홍길동"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block text-lg font-normal text-gray-300 mb-2 leading-[1.5]">연락처</label>
                    <input 
                        {...register("contact", { required: "연락처를 입력해주세요." })}
                        type="tel" 
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700"
                    />
                    {errors.contact && <span className="text-red-500 text-sm mt-1">{errors.contact.message}</span>}
                </div>

                <div>
                    <label className="block text-lg font-normal text-gray-300 mb-2 leading-[1.5]">회사명 (또는 브랜드명)</label>
                    <input 
                        {...register("company", { required: "회사명을 입력해주세요." })}
                        type="text" 
                        placeholder="주식회사 AI STUDIO"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white focus:border-[#FF7C2B] focus:ring-1 focus:ring-[#FF7C2B] outline-none transition-all placeholder:text-gray-700"
                    />
                    {errors.company && <span className="text-red-500 text-sm mt-1">{errors.company.message}</span>}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FF7C2B] text-white text-xl font-semibold leading-[1.5] rounded-xl hover:bg-[#E0651A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-orange-900/40"
                >
                    {isSubmitting ? '제출 중...' : '제출하기 (Submit)'}
                </button>
            </form>
        </motion.div>
      </div>
    </section>
  );
};

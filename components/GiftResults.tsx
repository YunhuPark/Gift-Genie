"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Gift,
  ExternalLink,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { containerVariants, cardVariants } from "@/lib/motion-config";

interface FormData {
  target: string;
  situation: string;
  budget: number;
}

interface GiftRecommendation {
  id: number;
  name: string;
  reason: string;
  price: string;
  cardMessage: string;
  emoji: string;
}

interface GiftResultsProps {
  formData: FormData;
  recommendations: GiftRecommendation[];
  onBack: () => void;
  onRetry: () => void;
  onReset: () => void;
}

export default function GiftResults({
  formData,
  recommendations,
  onBack,
  onRetry,
  onReset,
}: GiftResultsProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    if (!flippedCards.includes(id)) {
      setFlippedCards([...flippedCards, id]);
    }
  };

  const handleNaverSearch = (giftName: string) => {
    const query = encodeURIComponent(giftName);
    window.open(
      `https://search.shopping.naver.com/search/all?query=${query}`,
      "_blank"
    );
  };

  const handleCoupangSearch = (giftName: string) => {
    const query = encodeURIComponent(giftName);
    window.open(
      `https://www.coupang.com/np/search?component=&q=${query}`,
      "_blank"
    );
  };

  const handleCopyMessage = async (id: number, message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="glass p-5 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors"
              title="다시 입력"
            >
              <ArrowLeft className="w-5 h-5 text-white/40 hover:text-white/70 transition-colors" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                추천 선물
              </h2>
              <p className="text-xs text-white/30 mt-0.5">
                {formData.target} · {formData.situation} ·{" "}
                ₩{formData.budget.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onRetry}
              className="flex items-center gap-2 px-3.5 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-xl transition-colors text-sm text-violet-400 hover:text-violet-300"
              title="다시 추천받기"
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">다시 추천</span>
            </motion.button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 rounded-xl transition-colors text-sm text-white/40 hover:text-white/70"
              title="처음으로"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">처음으로</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6 text-sm text-white/25 flex items-center justify-center gap-2"
      >
        <Gift className="w-4 h-4 text-violet-400/50" />
        카드를 클릭해서 선물을 확인하세요
      </motion.p>

      {/* Gift Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {recommendations.map((gift, index) => (
          <motion.div key={gift.id} variants={cardVariants}>
            <div
              className="relative h-[480px] cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => handleCardClick(gift.id)}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: flippedCards.includes(gift.id) ? 180 : 0,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
              >
                {/* Card Back (Hidden Gift) */}
                <div
                  className="absolute w-full h-full"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="glass-card w-full h-full p-8 flex flex-col items-center justify-center space-y-6 border border-violet-500/10 hover:border-violet-500/25 transition-all">
                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                        <Gift className="w-10 h-10 text-violet-400/60" />
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white/70 mb-1">
                        선물 #{gift.id}
                      </h3>
                      <p className="text-xs text-white/25">
                        클릭해서 확인하기
                      </p>
                    </div>
                    <motion.div
                      className="text-3xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </div>

                {/* Card Front (Revealed Gift) */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="glass-card w-full h-full p-6 flex flex-col">
                    {/* Gift Header */}
                    <div className="text-center mb-4 pb-4 border-b border-white/5">
                      <div className="text-4xl mb-3">{gift.emoji}</div>
                      <h3 className="text-base font-bold text-white/90">
                        {gift.name}
                      </h3>
                      <p className="text-lg font-bold text-gradient mt-1.5">
                        {gift.price}
                      </p>
                    </div>

                    {/* Reason */}
                    <div className="flex-1 space-y-3">
                      <div className="bg-white/3 rounded-xl p-3.5">
                        <p className="text-xs text-white/50 leading-relaxed">
                          {gift.reason}
                        </p>
                      </div>

                      {/* Card Message */}
                      <div className="bg-violet-500/5 rounded-xl p-3.5 border border-violet-500/10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Heart className="w-3 h-3 text-fuchsia-400/60" />
                            <span className="text-[10px] text-white/30 font-medium">
                              함께 전할 메시지
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyMessage(gift.id, gift.cardMessage);
                            }}
                            className="flex items-center gap-1 text-[10px] text-violet-400/60 hover:text-violet-400 transition-colors"
                          >
                            {copiedId === gift.id ? (
                              <>
                                <Check className="w-3 h-3" /> 복사됨
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> 복사
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {gift.cardMessage}
                        </p>
                      </div>
                    </div>

                    {/* Search Buttons */}
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNaverSearch(gift.name);
                        }}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white/60 bg-white/3 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                        whileTap={{ scale: 0.97 }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        네이버
                        <ExternalLink className="w-3 h-3 opacity-40" />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCoupangSearch(gift.name);
                        }}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white/60 bg-white/3 hover:bg-red-500/10 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all flex items-center justify-center gap-1.5"
                        whileTap={{ scale: 0.97 }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        쿠팡
                        <ExternalLink className="w-3 h-3 opacity-40" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-10 space-y-5"
      >
        <motion.button
          onClick={onRetry}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          마음에 안 들면? 다시 추천받기
        </motion.button>
        <p className="text-[10px] text-white/10 leading-relaxed max-w-lg mx-auto">
          ⓘ AI 기반 추천 결과로, 상품의 가격 및 재고는 실시간 정보와 다를 수
          있습니다. 구매 전 상세 정보를 확인해주세요.
        </p>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Gift, User, Calendar, Wallet, Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import GiftResults from "./GiftResults";
import { hapticFeedback } from "@/lib/toss";

interface FormData {
  target: string;
  situation: string;
  budget: number;
}

interface GiftInputFormProps {
  onBack: () => void;
}

const TARGET_PRESETS = [
  { label: "👩 여자친구", value: "20~30대 여자친구" },
  { label: "👨 남자친구", value: "20~30대 남자친구" },
  { label: "💑 배우자", value: "아내/남편 (배우자)" },
  { label: "👨‍👩‍👧 부모님", value: "50~60대 부모님" },
  { label: "👫 친구", value: "20~30대 친구" },
  { label: "🤝 직장 동료", value: "직장 동료" },
  { label: "👶 아이", value: "어린이 (초등학생)" },
];

const SITUATION_PRESETS = [
  { label: "🎂 생일", value: "생일 축하" },
  { label: "🎓 졸업", value: "졸업 축하" },
  { label: "💍 기념일", value: "기념일 축하" },
  { label: "📈 승진", value: "승진 축하" },
  { label: "🏠 집들이", value: "집들이" },
  { label: "💝 감사", value: "감사의 마음" },
];

export default function GiftInputForm({ onBack }: GiftInputFormProps) {
  const MIN_BUDGET = Number(process.env.NEXT_PUBLIC_MIN_BUDGET) || 5000;
  const MAX_BUDGET = Number(process.env.NEXT_PUBLIC_MAX_BUDGET) || 300000;
  const DEFAULT_BUDGET = 50000;

  const [formData, setFormData] = useState<FormData>({
    target: "",
    situation: "",
    budget: DEFAULT_BUDGET,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to get recommendations");

      const result = await response.json();
      setRecommendations(result.recommendations);
      setShowResults(true);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("추천을 가져오는 중 문제가 발생했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    hapticFeedback('light'); // 토스 환경에서 클릭 진동 발생
    fetchRecommendations(formData);
  };

  const handleRetry = () => {
    setShowResults(false);
    setRecommendations([]);
    fetchRecommendations(formData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);
  };

  if (showResults) {
    return (
      <GiftResults
        formData={formData}
        recommendations={recommendations}
        onBack={() => setShowResults(false)}
        onRetry={handleRetry}
        onReset={() => {
          setShowResults(false);
          setRecommendations([]);
          setFormData({ target: "", situation: "", budget: DEFAULT_BUDGET });
          onBack();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="glass p-10 md:p-14 rounded-3xl max-w-lg mx-auto">
        <div className="text-center space-y-8">
          {/* Crystal Ball */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 rounded-full border border-violet-500/20"
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 35% 35%, rgba(139,92,246,0.2), rgba(88,28,135,0.1) 50%, rgba(12,12,20,0.8))",
                  boxShadow: "0 0 30px rgba(139,92,246,0.15)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(139,92,246,0.15)",
                    "0 0 50px rgba(192,132,252,0.2)",
                    "0 0 30px rgba(139,92,246,0.15)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-violet-400/60" />
                </motion.div>
              </motion.div>
              {/* Particles */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/60"
                style={{ top: "50%", left: "50%" }}
                animate={{
                  x: [0, 50, 0, -50, 0],
                  y: [-50, 0, 50, 0, -50],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-fuchsia-400/50"
                style={{ top: "50%", left: "50%" }}
                animate={{
                  x: [0, -35, 0, 35, 0],
                  y: [35, 0, -35, 0, 35],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <motion.h2
              className="text-2xl font-bold text-white/90"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              선물을 찾고 있어요
            </motion.h2>
            <p className="text-sm text-white/30">잠시만 기다려주세요</p>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            {[
              { icon: "🔮", text: "상황 분석 중" },
              { icon: "🎁", text: "최적의 선물 검색 중" },
              { icon: "💌", text: "감성 메시지 작성 중" },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 justify-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 1 }}
              >
                <span>{step.icon}</span>
                <span className="text-white/50">{step.text}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 1 + 0.8 }}
                  className="text-emerald-400/70 text-xs"
                >
                  ✓
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500/60 to-fuchsia-500/60"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 md:p-10 rounded-3xl max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white/40 hover:text-white/70" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white/90">선물 정보</h2>
          <p className="text-xs text-white/30 mt-0.5">
            버튼을 누르거나 직접 입력하세요
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/5 border border-red-500/15 rounded-2xl p-4 mb-6"
        >
          <p className="text-red-400/80 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-white/70">
            <User className="w-4 h-4 text-violet-400/70" />
            누구에게 선물하나요?
          </label>
          {/* Target Presets */}
          <div className="flex flex-wrap gap-2">
            {TARGET_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setFormData({ ...formData, target: preset.value })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${formData.target === preset.value
                  ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                  : "bg-white/3 border border-white/8 text-white/50 hover:bg-white/6 hover:text-white/70"
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            placeholder="또는 직접 입력 (예: 30대 여자 친구)"
            className="w-full px-5 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white/90 placeholder-white/20 focus:outline-none focus:border-violet-500/30 focus:bg-white/5 transition-all text-sm"
            required
          />
        </div>

        {/* Situation */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-white/70">
            <Calendar className="w-4 h-4 text-fuchsia-400/70" />
            어떤 상황인가요?
          </label>
          {/* Situation Presets */}
          <div className="flex flex-wrap gap-2">
            {SITUATION_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setFormData({ ...formData, situation: preset.value })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${formData.situation === preset.value
                  ? "bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300"
                  : "bg-white/3 border border-white/8 text-white/50 hover:bg-white/6 hover:text-white/70"
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            placeholder="또는 직접 입력 (예: 승진 축하)"
            className="w-full px-5 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white/90 placeholder-white/20 focus:outline-none focus:border-fuchsia-500/30 focus:bg-white/5 transition-all text-sm"
            required
          />
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-white/70">
            <Wallet className="w-4 h-4 text-amber-400/70" />
            예산
          </label>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-white/25">
                ₩{MIN_BUDGET.toLocaleString()}
              </span>
              <motion.span
                className="text-2xl font-bold text-gradient"
                key={formData.budget}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
              >
                {formatCurrency(formData.budget)}
              </motion.span>
              <span className="text-xs text-white/25">
                ₩{MAX_BUDGET.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step="5000"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: parseInt(e.target.value) })
              }
              className="w-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(139,92,246,0.5) 0%, rgba(192,132,252,0.5) ${((formData.budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100
                  }%, rgba(255,255,255,0.05) ${((formData.budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100
                  }%, rgba(255,255,255,0.05) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/15"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="flex items-center justify-center gap-2.5">
            <Gift className="w-4 h-4" />
            AI 선물 추천 받기
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}

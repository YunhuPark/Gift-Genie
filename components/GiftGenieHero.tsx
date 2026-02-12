"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import GiftInputForm from "./GiftInputForm";
import NavHeader from "./NavHeader";
import { containerVariants, itemVariants } from "@/lib/motion-config";

export default function GiftGenieHero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-main min-h-screen">
      <NavHeader showHome={showForm} onHome={() => setShowForm(false)} />

      <div className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="hero"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="relative z-10 max-w-4xl w-full"
            >
              <div className="text-center space-y-10">
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-medium text-violet-300">
                      AI 기반 선물 추천 서비스
                    </span>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                    센스있는 선물,
                    <br />
                    <span className="text-gradient">AI가 찾아줄게요</span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto leading-relaxed">
                    대상과 상황만 알려주세요.
                    <br className="hidden sm:block" />
                    AI가 완벽한 선물 3가지를 추천해드립니다.
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
                >
                  {[
                    { icon: Gift, label: "맞춤 추천", desc: "상황에 딱 맞는 선물" },
                    { icon: Heart, label: "감성 메시지", desc: "함께 전할 한마디" },
                    { icon: Star, label: "최저가 검색", desc: "네이버 · 쿠팡 연동" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="glass-card px-5 py-5 text-center"
                    >
                      <feature.icon className="w-5 h-5 text-violet-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-white/90 mb-1">
                        {feature.label}
                      </p>
                      <p className="text-xs text-white/35">{feature.desc}</p>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    선물 찾기 시작
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Social proof */}
                <motion.p
                  variants={itemVariants}
                  className="text-xs text-white/25"
                >
                  선물 고민, 이제 30초면 충분해요
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative z-10 max-w-4xl w-full"
            >
              <GiftInputForm onBack={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import { Gift, Home, Sparkles } from "lucide-react";

interface NavHeaderProps {
    showHome?: boolean;
    onHome?: () => void;
}

export default function NavHeader({ showHome = false, onHome }: NavHeaderProps) {
    const handleGoHome = () => {
        if (onHome) {
            onHome();
        } else {
            window.location.href = "/";
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
            <div className="max-w-5xl mx-auto">
                <div className="glass px-5 py-3 rounded-2xl flex items-center justify-between">
                    {/* Logo — always clickable to go home */}
                    <button onClick={handleGoHome} className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-violet-500/20 group-hover:border-violet-500/40 transition-colors">
                            <Gift className="w-4 h-4 text-violet-400" />
                        </div>
                        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                            Gift Genie
                        </span>
                    </button>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {showHome && (
                            <motion.button
                                onClick={handleGoHome}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">홈으로</span>
                            </motion.button>
                        )}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs text-emerald-400/80">AI 준비</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}

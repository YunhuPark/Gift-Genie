"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="bg-main min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="glass p-10 rounded-3xl max-w-md text-center space-y-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7 text-orange-400/70" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white/90 mb-2">
            문제가 생겼어요
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            다시 시도하면 금방 해결될 거예요
          </p>
        </div>

        {error.message && (
          <div className="bg-white/3 rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-white/25 font-mono truncate">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center pt-1">
          <motion.button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw className="w-4 h-4" />
            다시 시도
          </motion.button>
          <motion.a
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white/60 glass rounded-xl hover:bg-white/5 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home className="w-4 h-4" />
            홈으로
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

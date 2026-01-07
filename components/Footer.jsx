"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* Info popover */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 max-w-xs bg-[#1E3A32]/95 backdrop-blur-lg rounded-lg p-3 shadow-xl border border-[#14B8A6]/30"
          >
            <div className="space-y-2 text-sm">
              <div className="text-[#ECFDF5]">
                Built by <span className="font-medium">Animesh Srivastava</span>
              </div>
              <div>
                <a
                  href="mailto:srivastavaanimesh22@gmail.com"
                  className="text-[#14B8A6] hover:text-[#2DD4BF] transition-colors"
                >
                  srivastavaanimesh22@gmail.com
                </a>
              </div>
              {/* <div className="text-xs text-[#6EE7B7] pt-1 border-t border-[#14B8A6]/20">
                Data sources: IEA, Higg MSI, GHG Protocol
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info button */}
      <button
        className="w-10 h-10 rounded-full bg-[#1E3A32]/80 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6] hover:text-[#2DD4BF] hover:bg-[#1E3A32] transition-colors shadow-lg"
        aria-label="Information"
      >
        <span className="text-lg font-serif">ⓘ</span>
      </button>
    </div>
  );
}

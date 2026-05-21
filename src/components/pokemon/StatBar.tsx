import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SEGMENTS = 15;
const MAX_VALUE = 255;

interface StatBarProps {
  label: string;
  value: number;
  isRetro: boolean;
}

export default function StatBar({ label, value, isRetro }: StatBarProps) {
  if (isRetro) {
    const targetSegments = Math.max(1, Math.round((value / MAX_VALUE) * SEGMENTS));
    const [filled, setFilled] = useState(0);

    useEffect(() => {
      setFilled(0);
      if (targetSegments === 0) return;
      const timer = setInterval(() => {
        setFilled((prev) => {
          if (prev >= targetSegments) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }, [targetSegments, value]);

    return (
      <div className="flex items-center gap-2">
        <span className="text-[7px] font-retro text-gb-dark w-12 text-right uppercase">{label}</span>
        <span className="text-[7px] font-retro text-gb-darkest w-8 text-right font-bold">{value}</span>
        <div className="flex-1 flex gap-0.5 h-2 bg-gb-lightest/40 border border-gb-darkest p-[1px]">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-none ${i < filled ? "bg-gb-darkest" : "bg-transparent"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const pct = Math.min((value / MAX_VALUE) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] font-modern text-gray-500 w-14 text-right">{label}</span>
      <span className="text-[13px] font-modern text-gray-800 font-bold w-8 text-right">{value}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

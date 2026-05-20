import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

interface LedIndicatorProps {
  isOn: boolean;
}

export default function LedIndicator({ isOn }: LedIndicatorProps) {
  const { isRetro } = useTheme();

  return (
    <motion.div
      className={`rounded-full border transition-all duration-300 ${
        isRetro ? "w-4 h-4 border-black/20" : "w-3 h-3 border-white/20"
      }`}
      animate={{
        backgroundColor: isOn
          ? (isRetro ? "#DC0A2D" : "#4ade80")
          : (isRetro ? "#374151" : "rgba(255,255,255,0.15)"),
        boxShadow: isOn
          ? (isRetro
              ? "0 0 8px 3px rgba(220, 10, 45, 0.6), 0 0 16px rgba(220, 10, 45, 0.4), inset 0 0 4px rgba(255,255,255,0.3)"
              : "0 0 6px 2px rgba(74, 222, 128, 0.6), 0 0 12px rgba(74, 222, 128, 0.3)")
          : (isRetro
              ? "inset 0 1px 2px rgba(0,0,0,0.4)"
              : "inset 0 1px 2px rgba(0,0,0,0.2)"),
      }}
      transition={{ duration: 0.3 }}
    />
  );
}

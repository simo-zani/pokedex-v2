import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePowerState } from "../../hooks/usePowerState";
import { useTheme } from "../../hooks/useTheme";

export default function ScreenOverlay() {
  const { isBooting, isShuttingDown, onBootComplete, onShutdownComplete } =
    usePowerState();
  const { isRetro } = useTheme();

  const bgDark = isRetro ? "#0F380F" : "#111827";
  const bgLight = isRetro ? "#9BBC0F" : "#ffffff";

  useEffect(() => {
    if (!isBooting) return;
    const timer = setTimeout(onBootComplete, 900);
    return () => clearTimeout(timer);
  }, [isBooting, onBootComplete]);

  useEffect(() => {
    if (!isShuttingDown) return;
    const timer = setTimeout(onShutdownComplete, 900);
    return () => clearTimeout(timer);
  }, [isShuttingDown, onShutdownComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot"
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ backgroundColor: bgDark }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "center", backgroundColor: bgLight }}
          />
        </motion.div>
      )}

      {isShuttingDown && (
        <motion.div
          key="shutdown"
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ backgroundColor: bgDark }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
            style={{ transformOrigin: "center", backgroundColor: bgLight }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

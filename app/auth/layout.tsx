"use client";
import { AnimatePresence, motion } from "framer-motion";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AuthLayout;

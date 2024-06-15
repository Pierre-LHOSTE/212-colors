"use client";
import { AnimatePresence, motion } from "framer-motion";
import MainCard from "../../card/MainCard";
import "./auth-card.scss";

function AuthCard({
  authType,
  children,
  height,
}: {
  authType: string;
  children: React.ReactNode;
  height: number;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        id={`${authType}-card`}
        className="auth-card"
      >
        <MainCard noPadding noScroll>
          <div
            id="block"
            style={{
              height: height ? `${height}px` : "333px",
            }}
          />
          <div
            className="content-card-content"
            style={{
              minWidth: height / 1.5,
              height: height ? `${height}px` : "333px",
            }}
          >
            {children}
          </div>
        </MainCard>
      </motion.div>
    </AnimatePresence>
  );
}

export default AuthCard;

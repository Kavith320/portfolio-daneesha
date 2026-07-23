"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.05 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="mr-[0.25em] overflow-hidden inline-block py-0.5">
          <motion.span variants={child} className="inline-block">
            {word === "" ? "\u00A0" : word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import MediaLoader from "../components/MediaLoader";
import { usePortfolio } from "../components/PortfolioContext";
import { FiAward, FiExternalLink, FiCalendar, FiShield } from "react-icons/fi";

export default function Certificates() {
  const { data } = usePortfolio();
  const certificates = data.certificates;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="certificates"
      className="py-24 bg-zinc-50 dark:bg-[#09090B] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <SectionTitle
          title="Certifications"
          subtitle="// credentials"
          description="Verified industry credentials, professional certifications, and completed specializations."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="group h-full flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 overflow-hidden hover:border-blue-400/40 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                {/* Certificate image using MediaLoader */}
                <div className="relative w-full h-44 overflow-hidden bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <MediaLoader
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full"
                    imageClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-[10px] font-bold tracking-widest font-mono text-blue-600 dark:text-blue-400 uppercase">
                    {cert.issuer}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-2 leading-snug flex-1">
                    {cert.title}
                  </h3>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
                      <FiCalendar size={11} /> {cert.date}
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                    >
                      Verify <FiExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

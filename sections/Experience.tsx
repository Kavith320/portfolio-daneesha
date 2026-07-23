"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { usePortfolio } from "../components/PortfolioContext";
import { FiBriefcase, FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Experience() {
  const [expanded, setExpanded] = useState<number>(0);

  const { data } = usePortfolio();
  const experience = data.experience;

  return (
    <section
      id="experience"
      className="py-24 bg-zinc-50 dark:bg-[#09090B] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <SectionTitle
          title="Work Experience"
          subtitle="// timeline"
          description="My professional journey in software engineering — internships, freelance, and student roles."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/30 to-transparent" />

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative pl-12 sm:pl-14"
              >
                {/* Node */}
                <div
                  className={`absolute left-0 top-5 flex items-center justify-center w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] rounded-full border-2 transition-colors duration-300 ${
                    expanded === idx
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  }`}
                >
                  <FiBriefcase
                    size={16}
                    className={expanded === idx ? "text-blue-600 dark:text-blue-400" : "text-zinc-500"}
                  />
                </div>

                {/* Card */}
                <div
                  onClick={() => setExpanded(expanded === idx ? -1 : idx)}
                  className={`rounded-2xl border transition-all duration-300 cursor-pointer ${
                    expanded === idx
                      ? "border-blue-500/30 bg-white dark:bg-zinc-900/30 shadow-md shadow-blue-500/5"
                      : "border-zinc-200 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/10 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                        {job.role}
                      </h3>
                      <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                        {job.company}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500 mt-2 font-mono">
                        <FiCalendar size={11} /> {job.duration}
                      </div>
                    </div>
                    <button
                      aria-label="Toggle details"
                      className="mt-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0"
                    >
                      {expanded === idx ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                    </button>
                  </div>

                  {/* Expandable description */}
                  <AnimatePresence initial={false}>
                    {expanded === idx && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                          <ul className="space-y-3">
                            {job.description.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

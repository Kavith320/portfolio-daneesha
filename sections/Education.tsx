"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { usePortfolio } from "../components/PortfolioContext";
import { FiBookOpen, FiStar, FiCpu } from "react-icons/fi";

export default function Education() {
  const { data } = usePortfolio();
  const education = data.education;
  return (
    <section
      id="education"
      className="py-24 bg-white dark:bg-[#0C0C0E] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <SectionTitle
          title="Education"
          subtitle="// academics"
          description="My university background, academic milestones, and relevant Computer Science coursework."
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                    <FiBookOpen size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      {edu.degree}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg self-start sm:self-center whitespace-nowrap">
                  {edu.duration}
                </span>
              </div>

              {/* Details + GPA */}
              <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Details text */}
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <FiStar className="text-amber-500" size={14} />
                    <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-mono">
                      Academic Details
                    </h4>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>

                {/* GPA badge */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/30 p-5 text-center">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    3.82
                  </span>
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mt-1 font-mono uppercase tracking-wider">
                    GPA / 4.0
                  </span>
                </div>
              </div>

              {/* Coursework */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FiCpu className="text-violet-500" size={14} />
                  <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-mono">
                    Core Coursework
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-400/40 dark:hover:border-blue-500/30 transition-colors cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

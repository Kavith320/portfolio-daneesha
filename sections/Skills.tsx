"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { usePortfolio } from "../components/PortfolioContext";
import { getSkillIcon } from "../lib/skillIcons";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const { data } = usePortfolio();
  const rawSkills = data.skills;

  const skills = rawSkills.map((cat) => ({
    category: cat.category,
    items: cat.items.map((item) => ({
      ...item,
      icon: ("icon" in item && item.icon) ? (item.icon as any) : getSkillIcon(item.name),
    })),
  }));

  const categories = ["All", ...skills.map((s) => s.category)];

  const filtered =
    activeCategory === "All"
      ? skills.flatMap((s) => s.items.map((item) => ({ ...item, category: s.category })))
      : skills
          .filter((s) => s.category === activeCategory)
          .flatMap((s) => s.items.map((item) => ({ ...item, category: s.category })));

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 15 },
    },
  };

  const levelColor: Record<string, string> = {
    Advanced: "text-green-600 dark:text-green-400",
    Intermediate: "text-blue-600 dark:text-blue-400",
    Beginner: "text-zinc-500 dark:text-zinc-500",
  };

  const levelDot: Record<string, string> = {
    Advanced: "bg-green-500",
    Intermediate: "bg-blue-500",
    Beginner: "bg-zinc-400",
  };

  return (
    <section
      id="skills"
      className="py-24 bg-zinc-50 dark:bg-[#09090B] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Technical Skills"
            subtitle="// expertise"
            description="My full-stack development toolkit — organized by layer, filtered by category."
          />

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer font-mono ${
                  activeCategory === cat
                    ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-700 bg-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill grid */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filtered.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={`${skill.name}-${idx}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/20 hover:border-blue-400/40 dark:hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 cursor-default"
                >
                  <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3">
                    <Icon size={28} />
                  </div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 text-center leading-tight">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${levelDot[skill.level]}`} />
                    <span className={`text-[10px] font-semibold font-mono ${levelColor[skill.level]}`}>
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-8 justify-center">
            {Object.entries(levelDot).map(([level, dot]) => (
              <div key={level} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-500 font-mono">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {level}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

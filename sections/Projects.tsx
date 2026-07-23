"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import MediaLoader from "../components/MediaLoader";
import { usePortfolio } from "../components/PortfolioContext";
import { FiGithub, FiExternalLink, FiCheckCircle, FiTag } from "react-icons/fi";

export default function Projects() {
  const [active, setActive] = useState(0);

  const { data } = usePortfolio();
  const projects = data.projects;

  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-24 bg-white dark:bg-[#0C0C0E] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
      >
        <Container>
          <SectionTitle
            title="Featured Projects"
            subtitle="// portfolio"
            description="A selection of full-stack applications — from real-time collaboration tools to e-commerce platforms."
          />
          <div className="text-center py-16 text-zinc-400 dark:text-zinc-600 font-mono text-sm border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            // No projects configured yet. Log in to the admin panel to add projects.
          </div>
        </Container>
      </section>
    );
  }

  // Clamp the active index to ensure it is always within bounds
  const activeIdx = Math.min(active, Math.max(0, projects.length - 1));

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 16 },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-[#0C0C0E] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Featured Projects"
            subtitle="// portfolio"
            description="A selection of full-stack applications — from real-time collaboration tools to e-commerce platforms."
          />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Project list (left) ── */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {projects.map((project, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActive(idx)}
                whileHover={{ x: 4 }}
                className={`text-left w-full px-5 py-4 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                  activeIdx === idx
                    ? "border-blue-500/40 bg-blue-50/70 dark:bg-blue-500/5"
                    : "border-zinc-200 dark:border-zinc-800/60 bg-white/20 dark:bg-zinc-900/10 hover:border-zinc-350 dark:hover:border-zinc-700"
                }`}
              >
                <span
                  className={`block text-sm font-semibold tracking-wide ${
                    activeIdx === idx
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {project.title.split(" - ")[0]}
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 font-mono">
                  {project.title.split(" - ")[1]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ── Project detail (right) ── */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden bg-white dark:bg-zinc-900/20"
              >
                {/* Project image using MediaLoader */}
                <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <MediaLoader
                    src={projects[activeIdx].image}
                    alt={projects[activeIdx].title}
                    className="w-full h-full"
                    imageClassName="transition-transform duration-700 hover:scale-105"
                  />
                  {/* Action links */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <a
                      href={projects[activeIdx].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all font-mono"
                    >
                      <FiGithub size={13} /> Code
                    </a>
                    <a
                      href={projects[activeIdx].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold backdrop-blur-sm border border-blue-400/30 transition-all font-mono"
                    >
                      <FiExternalLink size={13} /> Live Demo
                    </a>
                  </div>
                </div>

                {/* Project content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {projects[activeIdx].title}
                  </h3>
                  
                  {/* Clean tech-styled tag chips below title */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {projects[activeIdx].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border border-zinc-200/60 dark:border-zinc-700/50 font-mono uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                    {projects[activeIdx].description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
                    <h4 className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-550 mb-4 font-mono">
                      <FiTag size={12} /> Key Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {projects[activeIdx].features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"
                        >
                          <FiCheckCircle
                            className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5"
                            size={15}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Grid view of all projects below */}
        <div className="mt-12">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-500 font-mono uppercase tracking-widest mb-6">
            All Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {projects.map((project, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => {
                  setActive(idx);
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-blue-400/40 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group"
              >
                <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title.split(" - ")[0]}
                </span>
                <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-mono">
                  {project.tags.slice(0, 2).join(" · ")}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        </motion.div>
      </Container>
    </section>
  );
}

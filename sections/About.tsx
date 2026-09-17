"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { usePortfolio } from "../components/PortfolioContext";
import { FiCode, FiAward, FiBookOpen, FiZap } from "react-icons/fi";

const stats = [
  { value: "2+", label: "Years Coding" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
];

export default function About() {
  const { data } = usePortfolio();
  const developerInfo = data.developerInfo;

  const cards = [
    {
      icon: FiCode,
      title: "Clean Code Philosophy",
      desc: "Committed to robust architectural patterns, modular codebases, and strong type safety with TypeScript.",
      color: "blue",
    },
    {
      icon: FiBookOpen,
      title: "Current Studies",
      desc: developerInfo.studies,
      color: "violet",
    },
    {
      icon: FiAward,
      title: "Career Goals",
      desc: "Aiming to build scalable cloud-native systems, lead engineering teams, and ship products that delight users.",
      color: "indigo",
    },
    {
      icon: FiZap,
      title: "What Drives Me",
      desc: "The intersection of beautiful UI and powerful backend architecture — making things that are fast, elegant, and maintainable.",
      color: "blue",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <section
      id="about"
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
            title="About Me"
            subtitle="// biography"
            description="A driven undergrad turning passion for software into production-ready full-stack experiences."
          />

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/10 dark:bg-zinc-900/10"
            >
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 font-mono uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Biography text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Passion-driven Full Stack Development
            </h3>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {developerInfo.bio}
            </p>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {developerInfo.goals}
            </p>

            <blockquote className="border-l-2 border-blue-500 pl-5 py-1 italic text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              &ldquo;Great software isn&apos;t just functional &mdash; it&apos;s architecture that scales,
              interfaces that delight, and code that the next developer is happy to inherit.&rdquo;
            </blockquote>

            {/* Tech affinity chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "Next.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/30 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Info cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            {cards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="flex gap-4 items-start py-5 px-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/40 bg-white dark:bg-zinc-900/20 hover:border-blue-400/40 dark:hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${colorMap[item.color]}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-white font-mono">{item.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
        </motion.div>
      </Container>
    </section>
  );
}

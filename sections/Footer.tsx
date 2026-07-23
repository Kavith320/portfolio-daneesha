"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SocialLinks from "../components/SocialLinks";
import { usePortfolio } from "../components/PortfolioContext";
import { FiArrowUp, FiHeart } from "react-icons/fi";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const { data } = usePortfolio();
  const info = data.developerInfo;

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#09090B] transition-colors duration-300">
      {/* Main footer body */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Brand col */}
            <div className="flex flex-col gap-4">
              <a
                href="#hero"
                onClick={handleScrollTop}
                className="text-xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer w-fit"
              >
                Daneesha<span className="text-blue-500">.</span>
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                Undergraduate Full Stack Developer specializing in MERN stack development and modern web experiences.
              </p>
              <SocialLinks developerInfo={info} />
            </div>

            {/* Nav links col */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4 font-mono">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA col */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4 font-mono">
                Get In Touch
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Available for internships, freelance work, and full-time positions.
              </p>
              <a
                href={`mailto:${info.email}`}
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                {info.email}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-100 dark:border-zinc-900 py-5">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1.5">
              &copy; {year} {info.name}. Made with{" "}
              <FiHeart className="text-red-500" size={11} /> in Sri Lanka.
            </p>

            <motion.button
              onClick={handleScrollTop}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              Back to top
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 group-hover:border-blue-400/40 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/5 transition-all">
                <FiArrowUp size={12} />
              </span>
            </motion.button>
          </div>
        </Container>
      </div>
    </footer>
  );
}


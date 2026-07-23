"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Container from "../components/Container";
import AnimatedText from "../components/AnimatedText";
import MediaLoader from "../components/MediaLoader";
import { usePortfolio } from "../components/PortfolioContext";
import { FiArrowRight, FiDownload, FiMessageSquare, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Hero() {
  const { data } = usePortfolio();
  const developerInfo = data.developerInfo;

  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const lastTimeRef = useRef(0);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Autoplay fallback for background video loop
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.log("Video autoplay blocked:", err));
    }
  }, []);

  // Smooth Loop Fading
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Detect loop wrap-around (when video restarts after completing 1 loop)
    if (video.currentTime < lastTimeRef.current - 0.2) {
      // Loop wrapped around
    }
    lastTimeRef.current = video.currentTime;

    const remainingTime = video.duration - video.currentTime;

    // Smooth fade-out 1 second before loop end
    if (remainingTime < 1) {
      setVideoOpacity(remainingTime);
    } 
    // Smooth fade-in during first 1 second of loop
    else if (video.currentTime < 1) {
      setVideoOpacity(video.currentTime);
    } 
    else {
      setVideoOpacity(1);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-zinc-50 dark:bg-[#09090B] transition-colors duration-300"
    >
      {/* Ambient Background Video */}
      {developerInfo.heroVideoUrl && (
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            ref={videoRef}
            src={developerInfo.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            style={{ opacity: videoOpacity * 0.75 }}
            className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
          />
          {/* Contrast gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950/70 pointer-events-none" />
        </div>
      )}

      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-blue-500/8 dark:bg-blue-500/6 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-500/8 dark:bg-violet-500/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* ── Text Content ── */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-8 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Internships &amp; Full-Time Roles
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Hi, I&apos;m
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight leading-[1.1] mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  {developerInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4"
            >
              <AnimatedText
                text={developerInfo.specialty}
                className="text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-300"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-zinc-650 dark:text-zinc-400 mt-6 leading-relaxed max-w-xl"
            >
              {developerInfo.subTitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                onClick={() => handleScroll("projects")}
                className="w-full sm:w-auto gap-2"
              >
                View Projects <FiArrowRight />
              </Button>
              <Button
                variant="secondary"
                href={developerInfo.resumeUrl}
                download="Daneesha_Disanayake_Resume.pdf"
                className="w-full sm:w-auto gap-2"
              >
                Download Resume <FiDownload />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleScroll("contact")}
                className="w-full sm:w-auto gap-2"
              >
                Contact Me <FiMessageSquare />
              </Button>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 mt-8"
            >
              <a
                href={developerInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <FiGithub size={16} /> GitHub
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href={developerInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <FiLinkedin size={16} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* ── Profile Image ── */}
          <div className="md:col-span-5 flex justify-center order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 18 }}
              className="relative"
            >
              {/* Premium Glow Aura decoration */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-blue-600/10 to-violet-650/10 blur-xl" />
              
              {/* Profile picture container */}
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[380px] md:h-[380px] lg:w-[410px] lg:h-[410px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/10">
                <MediaLoader
                  src={developerInfo.avatarUrl || "/images/profile.png"}
                  alt={`${developerInfo.name} - Full Stack Developer`}
                  className="w-full h-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

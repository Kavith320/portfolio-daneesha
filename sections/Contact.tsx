"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { usePortfolio } from "../components/PortfolioContext";
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

export default function Contact() {
  const { data } = usePortfolio();
  const developerInfo = data.developerInfo;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email address.";
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name as keyof FormData]; return next; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 1600));
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactItems = [
    { icon: FiMail, label: "Email", value: developerInfo.email, href: `mailto:${developerInfo.email}` },
    { icon: FiMapPin, label: "Location", value: "Colombo, Sri Lanka", href: null },
    { icon: FiClock, label: "Response Time", value: "Within 24 hours", href: null },
  ];

  const socialLinks = [
    { icon: FiGithub, label: "GitHub", href: developerInfo.github },
    { icon: FiLinkedin, label: "LinkedIn", href: developerInfo.linkedin },
    { icon: FiTwitter, label: "Twitter", href: developerInfo.twitter },
  ];

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-950/50 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";
  const inputNormal = "border-zinc-200 dark:border-zinc-800 focus:ring-blue-500";
  const inputError = "border-red-400 focus:ring-red-400";

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-[#0C0C0E] transition-colors duration-300 border-t border-zinc-100 dark:border-zinc-900"
    >
      <Container>
        <SectionTitle
          title="Get In Touch"
          subtitle="// contact"
          description="Have a project in mind, want to collaborate, or just say hello? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Left: Contact info ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                Let&apos;s Build Something Great
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you&apos;re looking for a developer to join your team, need a web app built from scratch, or just want to chat about tech — my inbox is always open.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest font-mono">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest font-mono mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/40 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
                      <FiCheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Message Sent!</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
                      Thank you for reaching out. I&apos;ll get back to you within 24 hours!
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      className="mt-6"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-2 font-mono">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                        />
                        {errors.name && (
                          <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-semibold">
                            <FiAlertCircle size={11} /> {errors.name}
                          </p>
                        )}
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-2 font-mono">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                        />
                        {errors.email && (
                          <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-semibold">
                            <FiAlertCircle size={11} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-2 font-mono">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Job opportunity, collaboration, feedback..."
                        className={`${inputBase} ${errors.subject ? inputError : inputNormal}`}
                      />
                      {errors.subject && (
                        <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-semibold">
                          <FiAlertCircle size={11} /> {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-2 font-mono">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={`Hi Daneesha, I'd like to discuss...`}
                        className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                      />
                      {errors.message && (
                        <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1.5 font-semibold">
                          <FiAlertCircle size={11} /> {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === "submitting"}
                      className="w-full gap-2 py-3.5 font-bold"
                    >
                      {status === "submitting" ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>Send Message <FiSend size={15} /></>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

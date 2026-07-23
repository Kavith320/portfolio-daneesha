import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { developerInfo } from "../data/portfolio";

interface SocialLinksProps {
  className?: string;
  developerInfo?: any;
}

export default function SocialLinks({ className = "", developerInfo: customInfo }: SocialLinksProps) {
  const info = customInfo || developerInfo;
  const links = [
    { icon: FiGithub, url: info.github, label: "GitHub" },
    { icon: FiLinkedin, url: info.linkedin, label: "LinkedIn" },
    { icon: FiMail, url: `mailto:${info.email}`, label: "Email" },
    { icon: FiTwitter, url: info.twitter, label: "Twitter" },
  ];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all duration-300 cursor-pointer"
            aria-label={link.label}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}


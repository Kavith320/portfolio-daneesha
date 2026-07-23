// ── Skill Icon Map ────────────────────────────────────────────────────────────
// Maps skill names (stored as plain strings) → React icon components.
// This way icons never need to be serialized to localStorage.

import type { IconType } from "react-icons";
import { BiLogoReact, BiLogoNodejs, BiLogoMongodb, BiLogoTypescript, BiLogoHtml5, BiLogoCss3, BiLogoTailwindCss, BiLogoGit, BiLogoGithub, BiLogoPostgresql } from "react-icons/bi";
import { SiNextdotjs, SiExpress, SiPostman, SiDocker, SiMysql, SiJavascript, SiRedux, SiSocketdotio } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiCode } from "react-icons/fi";

export const SKILL_ICON_MAP: Record<string, IconType> = {
  "HTML5": BiLogoHtml5,
  "CSS3": BiLogoCss3,
  "JavaScript": SiJavascript,
  "TypeScript": BiLogoTypescript,
  "React.js": BiLogoReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": BiLogoTailwindCss,
  "Redux Toolkit": SiRedux,
  "Node.js": BiLogoNodejs,
  "Express.js": SiExpress,
  "REST APIs": SiPostman,
  "Socket.io": SiSocketdotio,
  "MongoDB": BiLogoMongodb,
  "MySQL": SiMysql,
  "PostgreSQL": BiLogoPostgresql,
  "Git": BiLogoGit,
  "GitHub": BiLogoGithub,
  "VS Code": VscVscode,
  "Postman": SiPostman,
  "Docker": SiDocker,
};

export function getSkillIcon(name: string): IconType {
  return SKILL_ICON_MAP[name] ?? FiCode;
}

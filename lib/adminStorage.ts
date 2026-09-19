import { 
  developerInfo, 
  skills as rawSkills, 
  projects, 
  experience, 
  education, 
  certificates 
} from "../data/portfolio";
import { PortfolioData, SkillCategory } from "../types/portfolio";

const STORAGE_KEY = "portfolio_admin_data";

// Helper to convert raw skills with JSX Icon functions into pure serializable JSON skills
export function getSerializableSkills(): SkillCategory[] {
  return rawSkills.map(cat => ({
    category: cat.category,
    items: cat.items.map(item => ({
      name: item.name,
      level: item.level as "Advanced" | "Intermediate" | "Beginner"
    }))
  }));
}

// Full default portfolio data (JSON-serializable)
export const defaultPortfolioData: PortfolioData = {
  developerInfo,
  skills: getSerializableSkills(),
  projects,
  experience,
  education,
  certificates
};

// Check if window is defined (SSR check)
const isBrowser = typeof window !== "undefined";

export function loadPortfolioData(): PortfolioData {
  if (!isBrowser) {
    return defaultPortfolioData;
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Basic merge/fallback check to ensure schema compatibility
      return {
        developerInfo: { 
          ...defaultPortfolioData.developerInfo, 
          ...parsed.developerInfo,
          stats: parsed.developerInfo?.stats || defaultPortfolioData.developerInfo.stats
        },
        skills: parsed.skills || defaultPortfolioData.skills,
        projects: parsed.projects || defaultPortfolioData.projects,
        experience: parsed.experience || defaultPortfolioData.experience,
        education: parsed.education || defaultPortfolioData.education,
        certificates: parsed.certificates || defaultPortfolioData.certificates
      };
    }
  } catch (e) {
    console.error("Failed to parse portfolio data from localStorage:", e);
  }
  
  return defaultPortfolioData;
}

export function savePortfolioData(data: PortfolioData): boolean {
  if (!isBrowser) return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save portfolio data to localStorage:", e);
    return false;
  }
}

export function clearPortfolioData(): void {
  if (!isBrowser) return;
  localStorage.removeItem(STORAGE_KEY);
}

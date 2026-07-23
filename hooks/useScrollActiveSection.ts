"use client";

import { useEffect, useState } from "react";

export function useScrollActiveSection(sectionIds: string[], offset = 160) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Special case for bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to capture default state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

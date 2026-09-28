"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal: sections that start below the fold hide their children,
 * then rise them in (staggered) the first time they scroll into view.
 * Sections already on screen at load are never hidden, so nothing flashes.
 */
export function ScrollFx() {
  const path = usePathname();

  useEffect(() => {
    const below = [...document.querySelectorAll<HTMLElement>("main section[data-screen-label]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.replace("rv-hide", "rv-show");
          // Drop the reveal classes once done so children get their normal transitions back.
          timers.push(setTimeout(() => el.classList.remove("rv-show"), 800 + el.children.length * 90));
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of below) {
      [...el.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--rv-i", String(i)));
      el.classList.add("rv-hide");
      io.observe(el);
    }
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      below.forEach((el) => el.classList.remove("rv-hide", "rv-show"));
    };
  }, [path]);

  return null;
}

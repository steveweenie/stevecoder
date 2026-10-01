"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HIDDEN = { opacity: 0, transform: "translateY(32px)" };
const EASE_OUT = "cubic-bezier(0.2, 0.7, 0.2, 1)";

/**
 * Scroll reveal: sections that start below the fold hide their children,
 * then rise them in (staggered) the first time they scroll into view.
 * Sections already on screen at load are never hidden, so nothing flashes.
 * Uses the Web Animations API rather than classes or inline styles, so it never
 * touches DOM attributes React is still hydrating.
 */
export function ScrollFx() {
  const path = usePathname();

  useEffect(() => {
    const below = [...document.querySelectorAll<HTMLElement>("main section[data-screen-label]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const anims: Animation[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          [...e.target.children].forEach((c, i) => {
            c.getAnimations().forEach((a) => a.cancel());
            anims.push(
              c.animate([HIDDEN, { opacity: 1, transform: "none" }], {
                duration: 800,
                delay: i * 90,
                easing: EASE_OUT,
                fill: "backwards",
              }),
            );
          });
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of below) {
      for (const c of el.children) anims.push(c.animate([HIDDEN, HIDDEN], { fill: "forwards" }));
      io.observe(el);
    }
    return () => {
      io.disconnect();
      anims.forEach((a) => a.cancel());
    };
  }, [path]);

  return null;
}

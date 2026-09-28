"use client";

import { useSyncExternalStore } from "react";

/** Stepped easing for Motion: the only easing allowed on this site. */
export const stepped = (n: number) => (t: number) => Math.floor(t * n) / n;

function media(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

export function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    media(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useIsMobile = () => useMedia("(max-width: 767px)");
/** Hover previews only on devices with a real pointer. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

/** Reads an attribute on <html>, re-rendering when it changes. Server snapshot is null. */
export function useHtmlAttr(name: string) {
  return useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: [name] });
      return () => mo.disconnect();
    },
    () => document.documentElement.getAttribute(name),
    () => null,
  );
}

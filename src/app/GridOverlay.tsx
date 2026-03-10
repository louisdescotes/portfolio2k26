"use client";

import { useEffect } from "react";

const CONFIG = {
  columns: 12,
  margin: "clamp(16px, 2.9167vw, 72px)",
  gutter: "8px",
  color: "rgba(255, 0, 0, 0.08)",
  key: "g",
  zIndex: 9999,
};

export default function GridOverlay() {
  useEffect(() => {
    let overlay: { el: HTMLElement; label: HTMLElement } | null = null;

    function createOverlay() {
      const el = document.createElement("div");
      el.id = "__grid-overlay__";
      Object.assign(el.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: String(CONFIG.zIndex),
        display: "grid",
        gridTemplateColumns: `repeat(${CONFIG.columns}, 1fr)`,
        gap: CONFIG.gutter,
        paddingLeft: CONFIG.margin,
        paddingRight: CONFIG.margin,
        boxSizing: "border-box",
      });

      for (let i = 0; i < CONFIG.columns; i++) {
        const col = document.createElement("div");
        col.style.cssText = `background: ${CONFIG.color}; height: 100%;`;
        el.appendChild(col);
      }

      const label = document.createElement("div");
      Object.assign(label.style, {
        position: "fixed",
        bottom: "12px",
        right: "16px",
        fontSize: "10px",
        fontFamily: "monospace",
        color: "rgba(255,0,0,0.5)",
        letterSpacing: "0.05em",
        pointerEvents: "none",
        zIndex: String(CONFIG.zIndex + 1),
      });
      label.textContent = `${CONFIG.columns} col · ${CONFIG.margin} · ${CONFIG.gutter}`;
      label.id = "__grid-label__";

      return { el, label };
    }

    function toggle() {
      if (overlay) {
        overlay.el.remove();
        overlay.label.remove();
        overlay = null;
      } else {
        overlay = createOverlay();
        document.body.appendChild(overlay.el);
        document.body.appendChild(overlay.label);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA"].includes(tag)) return;
      if (e.key.toLowerCase() === CONFIG.key && !e.metaKey && !e.ctrlKey) {
        toggle();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      overlay?.el.remove();
      overlay?.label.remove();
    };
  }, []);

  return null;
}

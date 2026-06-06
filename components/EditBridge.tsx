"use client";

import { useEffect } from "react";

/**
 * Activates ONLY when the page is loaded with ?edit=1 (i.e. inside the CMS
 * iframe). Makes every [data-edit] element click-to-edit, reports changes to
 * the parent window via postMessage, and toggles edit/preview on request.
 * On the public site (no ?edit) this renders nothing and does nothing.
 */
export default function EditBridge() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("edit") !== "1") return;

    const root = document.documentElement;
    root.setAttribute("data-editing", "edit");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-edit]"));

    const onBlur = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      window.parent.postMessage(
        {
          source: "jis-edit",
          type: "change",
          path: el.getAttribute("data-edit"),
          value: (el.textContent ?? "").trim(),
        },
        "*"
      );
    };

    // Block link navigation while editing so clicking an editable button works.
    const onClickCapture = (e: MouseEvent) => {
      if (root.getAttribute("data-editing") !== "edit") return;
      const t = e.target as HTMLElement;
      if (t.closest("[data-edit]") && t.closest("a")) e.preventDefault();
    };

    const enable = () => {
      root.setAttribute("data-editing", "edit");
      els.forEach((el) => {
        el.setAttribute("contenteditable", "true");
        el.setAttribute("spellcheck", "false");
        el.classList.add("cms-editable");
        el.addEventListener("blur", onBlur);
      });
    };
    const disable = () => {
      root.setAttribute("data-editing", "preview");
      els.forEach((el) => {
        el.removeAttribute("contenteditable");
        el.classList.remove("cms-editable");
        el.removeEventListener("blur", onBlur);
      });
    };

    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.target !== "jis-edit") return;
      if (d.type === "mode") d.mode === "preview" ? disable() : enable();
    };

    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("message", onMessage);
    enable();
    window.parent.postMessage({ source: "jis-edit", type: "ready" }, "*");

    return () => {
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("message", onMessage);
      disable();
    };
  }, []);

  return null;
}

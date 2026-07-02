import { useEffect } from "react";

/**
 * Blocca lo scroll della pagina mentre `active` è true.
 *
 * Il vero contenitore di scroll qui è <html> (documentElement), non <body>:
 * bloccare solo body.overflow non ferma lo scroll. Blocchiamo quindi <html>
 * e compensiamo la larghezza della scrollbar con un padding su <body> per
 * evitare il "salto" del layout quando la scrollbar sparisce (Windows/desktop).
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollbarW = window.innerWidth - html.clientWidth;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [active]);
}

"use client";

import { useEffect } from "react";
import { trackContact } from "@/lib/analytics";

/**
 * Listener centralizzato: intercetta i click su qualsiasi link telefono (`tel:`)
 * o WhatsApp (`wa.me` / `whatsapp`) ovunque nella pagina e li traccia come
 * eventi GA4 di contatto. Delegato sull'intero documento → nessun bisogno di
 * toccare i singoli link, e vale anche per quelli aggiunti in futuro.
 */
export default function ContactTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      const href = anchor?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackContact("phone");
      else if (/wa\.me|whatsapp/i.test(href)) trackContact("whatsapp");
    }
    // fase di cattura: l'evento parte prima dell'eventuale navigazione del link
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

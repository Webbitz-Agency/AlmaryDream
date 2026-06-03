/**
 * Sagoma stilizzata della Sardegna (solo contorno).
 * Il colore si imposta via `text-…` (usa currentColor), la dimensione via `h-…`.
 */
export default function SardiniaShape({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 312 568"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M160 30 L172 18 Q180 8 196 12 L218 16 Q234 20 244 34 L258 52 Q268 66 262 74 L254 86 Q248 94 264 116 L284 146 Q300 168 293 185 L285 209 Q278 226 275 240 L271 258 Q268 272 272 285 L278 301 Q282 314 278 340 L274 376 Q270 402 269 417 L267 437 Q266 452 260 466 L252 486 Q246 500 234 495 L218 489 Q206 484 198 491 L186 499 Q178 506 170 510 L158 516 Q150 520 143 529 L133 541 Q126 550 116 539 L102 525 Q92 514 82 512 L68 510 Q58 508 56 495 L52 479 Q50 466 56 452 L64 434 Q70 420 59 391 L45 351 Q34 322 48 320 L66 318 Q80 316 72 292 L62 260 Q54 236 56 227 L58 215 Q60 206 55 194 L47 178 Q42 166 33 161 L21 155 Q12 150 14 128 L18 98 Q20 76 18 70 L16 62 Q14 56 30 69 L50 87 Q66 100 71 95 L79 89 Q84 84 95 81 L109 77 Q120 74 130 64 L142 50 Q152 40 160 30 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

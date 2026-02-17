import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import "./proyecto-gallery.css";

export type GalleryImage = {
  alt: string;

  thumbSrc: string;
  thumbSrcset: string;
  thumbSizes: string;

  gridSrc: string;
  gridSrcset: string;
  gridSizes: string;

  modalSrc: string;
  modalSrcset: string;
  modalSizes: string;
};

type Props = {
  images: GalleryImage[];
};

export default function ProyectoGallery({ images }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const thumbBtnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const maxVisible = 6;
  const visible = images.slice(0, Math.min(maxVisible, images.length));
  const remaining = Math.max(0, images.length - maxVisible);

  const openAt = useCallback(
    (i: number) => {
      if (!images.length) return;
      const safe = Math.max(0, Math.min(i, images.length - 1));
      setActive(safe);
    },
    [images.length]
  );

  const close = useCallback(() => setActive(null), []);

  const next = useCallback(() => {
    setActive((cur) => {
      if (cur === null) return null;
      return (cur + 1) % images.length;
    });
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((cur) => {
      if (cur === null) return null;
      return (cur - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // ✅ Ventana de thumbs (si hay muchas imágenes, no renderiza todas)
  const THUMBS_WINDOW = 10;

  const { thumbStart, thumbs } = useMemo(() => {
    if (active === null) return { thumbStart: 0, thumbs: [] as GalleryImage[] };

    const half = Math.floor(THUMBS_WINDOW / 2);
    const maxStart = Math.max(0, images.length - THUMBS_WINDOW);
    const start = Math.max(0, Math.min(active - half, maxStart));

    return {
      thumbStart: start,
      thumbs: images.slice(start, start + THUMBS_WINDOW),
    };
  }, [active, images]);

  // ✅ Scroll lock cuando el modal está abierto
  useEffect(() => {
    if (active === null) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const sbw = window.innerWidth - html.clientWidth;
    html.style.setProperty("--sbw", `${sbw}px`);

    html.classList.add("modal-open");
    body.classList.add("modal-open");
    body.style.top = `-${scrollY}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      html.classList.remove("modal-open");
      body.classList.remove("modal-open");
      html.style.removeProperty("--sbw");
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [active, close, next, prev]);

  // ✅ Preload inteligente: cache + ventana alrededor (sin repetir cargas)
  const preloadedRef = useRef<Set<string>>(new Set());

  const preloadSrc = useCallback((src: string) => {
    if (!src) return;
    if (preloadedRef.current.has(src)) return;

    preloadedRef.current.add(src);
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
  }, []);

  const preloadAround = useCallback(
    (index: number, radius = 2) => {
      if (!images.length) return;

      for (let offset = -radius; offset <= radius; offset++) {
        if (offset === 0) continue;

        const i = (index + offset + images.length) % images.length;
        preloadSrc(images[i].modalSrc);
      }
    },
    [images, preloadSrc]
  );

  // ✅ al abrir/cambiar imagen: precarga a los lados (2 adelante/2 atrás)
  useEffect(() => {
    if (active === null) return;
    if (images.length <= 1) return;

    preloadAround(active, 2);
  }, [active, images.length, preloadAround]);


    // ✅ (opcional) precarga baja prioridad del resto cuando el modal está abierto
  useEffect(() => {
    if (active === null) return;
    if (images.length <= 3) return;

    const run = () => {
      // precarga suave: solo modalSrc, no srcset completo
      for (let i = 0; i < images.length; i++) {
        if (i === active) continue;
        preloadSrc(images[i].modalSrc);
      }
    };

    // requestIdleCallback si existe
    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void) => number);
    const cancelRic = (window as any).cancelIdleCallback as undefined | ((id: number) => void);

    if (ric) {
      const id = ric(run);
      return () => cancelRic?.(id);
    } else {
      const id = window.setTimeout(run, 350);
      return () => window.clearTimeout(id);
    }
  }, [active, images, preloadSrc]);

  useEffect(() => {
    if (active === null) return;

    const btn = thumbBtnRefs.current.get(active);
    if (!btn) return;

    // Mantener la miniatura activa visible dentro del rail
    btn.scrollIntoView({
      behavior: "smooth",
      block: "nearest",  // vertical
      inline: "nearest", // horizontal
    });
  }, [active]);

  // índice “oculto” (cuando hay +N)
  const hiddenStartIndex = maxVisible;

  return (
    <>
      {/* GRID */}
      <div className="gallery-grid">
        {visible.map((img, i) => {
          const isLastCell = i === maxVisible - 1;
          const hasOverlay = isLastCell && remaining > 0;

          return (
            <button
              key={i}
              type="button"
              className="gallery-item"
              onClick={() => {
                // si hay overlay, abre en la primera oculta (mejor UX)
                if (hasOverlay) openAt(hiddenStartIndex);
                else openAt(i);
              }}
              aria-label={img.alt || `Foto ${i + 1}`}
            >
              <img
                src={img.gridSrc}
                srcSet={img.gridSrcset}
                sizes={img.gridSizes}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />

              {hasOverlay && <span className="gallery-overlay">+{remaining}</span>}
            </button>
          );
        })}
      </div>

      {/* MODAL */}
      {active !== null && (
        <div className="gallery-modal" onClick={close} role="dialog" aria-modal="true">
          <div className="gallery-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-close"
              onClick={close}
              aria-label="Volver"
              type="button"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="gallery-nav left" onClick={prev} type="button" aria-label="Anterior">
              ‹
            </button>

            <div className="gallery-main">
              <img
                src={images[active].modalSrc}
                srcSet={images[active].modalSrcset}
                sizes={images[active].modalSizes}
                alt={images[active].alt}
                loading="eager"
                decoding="async"
              />
            </div>

            <button className="gallery-nav right" onClick={next} type="button" aria-label="Siguiente">
              ›
            </button>

            <div className="gallery-thumbs" aria-label="Miniaturas">
              {thumbs.map((img, idx) => {
                const realIndex = thumbStart + idx;

                return (
                  <button
                    key={realIndex}
                    type="button"
                    ref={(el) => {
                      if (!el) thumbBtnRefs.current.delete(realIndex);
                      else thumbBtnRefs.current.set(realIndex, el);
                    }}
                    className={`thumb-btn${realIndex === active ? " active" : ""}`}
                    onClick={() => openAt(realIndex)}
                    aria-label={`Ir a foto ${realIndex + 1}`}
                  >
                    <img
                      src={img.thumbSrc}
                      srcSet={img.thumbSrcset}
                      sizes={img.thumbSizes || "140px"}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

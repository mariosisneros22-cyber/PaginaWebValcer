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
  const [isLoading, setIsLoading] = useState(false);
  const [displayed, setDisplayed] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  const thumbBtnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveTriggerRef = useRef<HTMLElement | null>(null);
  
  const mainRef = useRef<HTMLDivElement | null>(null);
  const touchRef = useRef<{ x: number; y: number; t: number; active: boolean }>({
    x: 0,
    y: 0,
    t: 0,
    active: false,
  });
    
  const maxVisible = 6;
  const visible = images.slice(0, Math.min(maxVisible, images.length));
  const remaining = Math.max(0, images.length - maxVisible);

  const SWIPE_MIN_PX = 40;     // distancia mínima
  const SWIPE_MAX_Y = 60;      // si se mueve mucho en vertical, no es swipe
  const SWIPE_MAX_MS = 800;    // si tarda demasiado, no cuenta

  const onPointerDown = (e: React.PointerEvent) => {
    // solo dedo / touch
    if (e.pointerType !== "touch") return;

    touchRef.current = {
      x: e.clientX,
      y: e.clientY,
      t: Date.now(),
      active: true,
    };

    // capturar el puntero para seguir recibiendo eventos
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    if (!touchRef.current.active) return;

    const dx = e.clientX - touchRef.current.x;
    const dy = e.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;

    touchRef.current.active = false;

    // descartar si fue más scroll vertical que swipe
    if (Math.abs(dy) > SWIPE_MAX_Y) return;
    if (dt > SWIPE_MAX_MS) return;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;

    // swipe izquierda => next, derecha => prev
    if (dx < 0) goNext();
    else goPrev();
  };

  const openAt = useCallback((i: number) => {
    if (!images.length) return;

    if (typeof document !== "undefined") {
      lastActiveTriggerRef.current = document.activeElement as HTMLElement | null;
    }

    const safe = Math.max(0, Math.min(i, images.length - 1));

    setActive(safe);

    // si es la primera vez que abres, muestras inmediatamente
    setDisplayed((cur) => (cur === null ? safe : cur));

    // loader solo si vas a cambiar a otra distinta (displayed existente ≠ safe)
    setIsLoading((_) => (displayed !== null && displayed !== safe));
    setIsFading((_) => (displayed !== null && displayed !== safe));
  }, [images.length, displayed]);


  // ✅ helper: cambia índice y enciende loader
  const goTo = useCallback((updater: (cur: number) => number) => {
    setActive((cur) => {
      if (cur === null) return null;
      setIsLoading(true);
      setIsFading(true);
      return updater(cur);
    });
  }, []);

  const goNext = useCallback(() => {
    goTo((cur) => (cur + 1) % images.length);
  }, [goTo, images.length]);

  const goPrev = useCallback(() => {
    goTo((cur) => (cur - 1 + images.length) % images.length);
  }, [goTo, images.length]);

  const close = useCallback(() => {
    setActive(null);
    setIsLoading(false);

    // ✅ restaurar foco al trigger
    const el = lastActiveTriggerRef.current;
    if (el) {
      // pequeño defer para asegurar que el modal ya desmontó
      setTimeout(() => el.focus?.(), 0);
    }
  }, []);

  
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
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
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
  }, [active, close, goNext, goPrev]);

  // ✅ Preload inteligente: cache + ventana alrededor (sin repetir cargas)
  const preloadedRef = useRef<Set<string>>(new Set());

  const preloadModal = useCallback(
    (i: number) => {
      if (typeof window === "undefined") return;

      const item = images[i];
      if (!item) return;

      const key = item.modalSrc + "|" + item.modalSrcset;
      if (preloadedRef.current.has(key)) return;

      preloadedRef.current.add(key);

      const img = new window.Image();
      img.decoding = "async";
      img.src = item.modalSrc;
      (img as any).srcset = item.modalSrcset;
    },
    [images]
  );

  useEffect(() => {
    if (active === null) return;
    if (displayed === null) {
      setDisplayed(active);
      setIsLoading(false);
      setIsFading(false);
      return;
    }

    // si ya está en pantalla, no hay nada que cargar
    if (displayed === active) {
      setIsLoading(false);
      setIsFading(false);
      return;
    }

    // carga "active" en memoria y cuando termine, promuévela a displayed
    let cancelled = false;

    setIsLoading(true);
    setIsFading(true);

    const item = images[active];
    const img = new window.Image();
    img.decoding = "async";
    img.src = item.modalSrc;
    (img as any).srcset = item.modalSrcset;

    img.onload = () => {
      if (cancelled) return;
      setDisplayed(active);
      setIsLoading(false);
      setIsFading(false);
    };

    img.onerror = () => {
      if (cancelled) return;
      // fallback: quita loader para no quedarse colgado
      setIsLoading(false);
      setIsFading(false);
    };

    return () => {
      cancelled = true;
    };
  }, [active, displayed, images]);

  const preloadAround = useCallback(
    (index: number, radius = 2) => {
      if (!images.length) return;

      for (let offset = -radius; offset <= radius; offset++) {
        if (offset === 0) continue;

        const i = (index + offset + images.length) % images.length;
        preloadModal(i);
      }
    },
    [images, preloadModal]
  );

  const prefetchIndex = useCallback(
    (i: number) => {
      if (!images.length) return;
      const safe = Math.max(0, Math.min(i, images.length - 1));
      preloadModal(safe);
      preloadAround(safe, 1);
    },
    [images.length, preloadModal, preloadAround]
  );

  const activeRef = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);


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
        preloadModal(i)
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
  }, [active, images, preloadModal]);

    // ✅ Focus trap + autofocus al abrir
  useEffect(() => {
    if (active === null) return;

    const root = modalRef.current;
    if (!root) return;

    const getFocusable = () => {
      const list = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(list).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    };

    // autofocus: primero (usualmente el botón volver)
    const focusables = getFocusable();
    focusables[0]?.focus?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusablesNow = getFocusable();
      if (!focusablesNow.length) return;

      const first = focusablesNow[0];
      const last = focusablesNow[focusablesNow.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      // Shift+Tab en primero => va al último
      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      }

      // Tab en último => va al primero
      if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [active]);

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
              onMouseEnter={() => prefetchIndex(hasOverlay ? hiddenStartIndex : i)}
              onFocus={() => prefetchIndex(hasOverlay ? hiddenStartIndex : i)}
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
          <div className="gallery-modal-inner" ref={modalRef} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
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

            <button
              className="gallery-nav left"
              type="button"
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              ‹
            </button>

            <div
              className={`gallery-main${isLoading ? " is-loading" : ""}${isFading ? " is-fading" : ""}`}
              ref={mainRef}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              {displayed !== null && (
                <img
                  key={displayed}
                  src={images[displayed].modalSrc}
                  srcSet={images[displayed].modalSrcset}
                  sizes={images[displayed].modalSizes}
                  alt={images[displayed].alt}
                  loading="eager"
                  decoding="async"
                />
              )}

              <div className="gallery-loader" aria-hidden="true">
                <div className="dot" />
              </div>
            </div>



            <button
              className="gallery-nav right"
              type="button"
              aria-label="Siguiente"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
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
                    onMouseEnter={() => prefetchIndex(realIndex)}
                    onFocus={() => prefetchIndex(realIndex)}
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

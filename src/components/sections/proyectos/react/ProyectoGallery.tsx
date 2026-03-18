import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/gallery.css";

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

type Props = { images: GalleryImage[] };

const MAX_VISIBLE = 6;
const THUMBS_WINDOW = 10;

const SWIPE_MIN_PX = 40;
const SWIPE_MAX_Y = 60;
const SWIPE_MAX_MS = 800;

const ZOOM_MS = 650;

export default function ProyectoGallery({ images }: Props) {
  const [active, setActive] = useState<number | null>(null); // índice target
  const [displayed, setDisplayed] = useState<number | null>(null); // índice visible
  const [incoming, setIncoming] = useState<number | null>(null); // índice entrando

  const [isLoading, setIsLoading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const lastActiveTriggerRef = useRef<HTMLElement | null>(null);
  const thumbBtnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const touchRef = useRef({ x: 0, y: 0, t: 0, active: false });

  // control de animaciones cancelables
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  const tRef = useRef<number | null>(null);

  const clearAnimTimers = useCallback(() => {
    if (raf1Ref.current) cancelAnimationFrame(raf1Ref.current);
    if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current);
    if (tRef.current) window.clearTimeout(tRef.current);
    raf1Ref.current = raf2Ref.current = tRef.current = null;
  }, []);

  // ---------- GRID SLICE ----------
  const visible = useMemo(
    () => images.slice(0, Math.min(MAX_VISIBLE, images.length)),
    [images]
  );
  const remaining = Math.max(0, images.length - MAX_VISIBLE);


  // ---------- OPEN ----------
  const openAt = useCallback(
    (i: number) => {
      if (!images.length) return;

      if (typeof document !== "undefined") {
        lastActiveTriggerRef.current = document.activeElement as HTMLElement | null;
      }

      const safe = Math.max(0, Math.min(i, images.length - 1));

      // primera apertura
      if (displayed === null) {
        setDisplayed(safe);
        setActive(safe);
        setIncoming(null);
        setIsLoading(false);
        setIsZooming(false);
        return;
      }

      // si ya es la que está visible, solo actualiza active (thumb highlight)
      if (safe === displayed) {
        setActive(safe);
        return;
      }

      setActive(safe);
      setIsLoading(true);
      setIsZooming(false);
    },
    [images.length, displayed]
  );

  // ---------- NAV ----------
  const goTo = useCallback(
    (updater: (cur: number) => number) => {
      setActive((cur) => {
        if (cur === null) return null;
        setIsLoading(true);
        setIsZooming(false);
        return updater(cur);
      });
    },
    []
  );

  const goNext = useCallback(() => {
    if (!images.length) return;
    goTo((cur) => (cur + 1) % images.length);
  }, [goTo, images.length]);

  const goPrev = useCallback(() => {
    if (!images.length) return;
    goTo((cur) => (cur - 1 + images.length) % images.length);
  }, [goTo, images.length]);

  // ---------- CLOSE ----------
  const close = useCallback(() => {
    setActive(null);
    setIsLoading(false);
    setIsZooming(false);
    setIncoming(null);
    clearAnimTimers();

    const el = lastActiveTriggerRef.current;
    if (el) setTimeout(() => el.focus?.(), 0);
  }, [clearAnimTimers]);

  // ---------- SWIPE ----------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    touchRef.current = { x: e.clientX, y: e.clientY, t: Date.now(), active: true };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    if (!touchRef.current.active) return;

    const dx = e.clientX - touchRef.current.x;
    const dy = e.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;
    touchRef.current.active = false;

    if (Math.abs(dy) > SWIPE_MAX_Y) return;
    if (dt > SWIPE_MAX_MS) return;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;

    if (dx < 0) goNext();
    else goPrev();
  };

  // ---------- THUMBS WINDOW ----------
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

  // ---------- SCROLL LOCK + KEYBOARD ----------
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

  // ---------- IMAGE LOADER (unificado) ----------

  const loadedRef = useRef<Set<string>>(new Set()); // ya cargadas
  const inflightRef = useRef<Map<string, Promise<void>>>(new Map()); // cargas en curso

  const makeKey = useCallback(
    (item: GalleryImage) => `${item.modalSrc}|${item.modalSrcset}`,
    []
  );

  const loadModalImage = useCallback(
    (i: number) => {
      if (typeof window === "undefined") return Promise.resolve();

      const item = images[i];
      if (!item) return Promise.resolve();

      const key = makeKey(item);

      // ya está cargada
      if (loadedRef.current.has(key)) return Promise.resolve();

      // ya está cargándose
      const inflight = inflightRef.current.get(key);
      if (inflight) return inflight;

      // crea promesa de carga
      const p = new Promise<void>((resolve) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = item.modalSrc;
        (img as any).srcset = item.modalSrcset;

        const done = () => {
          loadedRef.current.add(key);
          inflightRef.current.delete(key);
          resolve();
        };

        img.onload = done;
        img.onerror = done; // no bloqueamos UI si falla; resolvemos igual
      });

      inflightRef.current.set(key, p);
      return p;
    },
    [images]
  );

  const preloadAround = useCallback(
    (index: number, radius = 2) => {
      if (!images.length) return;
      for (let offset = -radius; offset <= radius; offset++) {
        if (offset === 0) continue;
        const i = (index + offset + images.length) % images.length;
        void loadModalImage(i);
      }
    },
    [images.length, loadModalImage]
  );

  const prefetchIndex = useCallback(
    (i: number) => {
      if (!images.length) return;
      const safe = Math.max(0, Math.min(i, images.length - 1));
      void loadModalImage(safe);
      preloadAround(safe, 1);
    },
    [images.length, loadModalImage, preloadAround]
  );

    // precarga laterales al cambiar (2 adelante/2 atrás)
  useEffect(() => {
    if (active === null) return;
    if (images.length <= 1) return;
    preloadAround(active, 2);
  }, [active, images.length, preloadAround]);

  // precarga baja prioridad del resto cuando el modal está abierto
  useEffect(() => {
    if (active === null) return;
    if (images.length <= 3) return;

    const run = () => {
      for (let i = 0; i < images.length; i++) {
        if (i === active) continue;
        void loadModalImage(i);
      }
    };

    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void) => number);
    const cancelRic = (window as any).cancelIdleCallback as undefined | ((id: number) => void);

    if (ric) {
      const id = ric(run);
      return () => cancelRic?.(id);
    }

    const id = window.setTimeout(run, 350);
    return () => window.clearTimeout(id);
  }, [active, images.length, loadModalImage]);

  // ---------- TRANSICIÓN (active -> displayed) ----------
  useEffect(() => {
    if (active === null) return;

    if (displayed === null) {
      setDisplayed(active);
      setIncoming(null);
      setIsLoading(false);
      setIsZooming(false);
      return;
    }

    if (displayed === active) {
      setIncoming(null);
      setIsLoading(false);
      setIsZooming(false);
      return;
    }

    let cancelled = false;
    clearAnimTimers();

    setIsLoading(true);
    setIsZooming(false);

    void (async () => {
      await loadModalImage(active);
      if (cancelled) return;

      // 1) monta incoming sin zoom
      setIncoming(active);
      setIsLoading(false);

      // 2) 2 RAF para garantizar paint inicial
      raf1Ref.current = requestAnimationFrame(() => {
        raf2Ref.current = requestAnimationFrame(() => {
          if (cancelled) return;
          setIsZooming(true);

          // 3) al final: promover displayed y limpiar
          tRef.current = window.setTimeout(() => {
            if (cancelled) return;

            setDisplayed(active);

            requestAnimationFrame(() => {
              if (cancelled) return;
              setIncoming(null);

              requestAnimationFrame(() => {
                if (cancelled) return;
                setIsZooming(false);
              });
            });
          }, ZOOM_MS);
        });
      });
    })();

    return () => {
      cancelled = true;
      clearAnimTimers();
    };
  }, [active, displayed, loadModalImage, clearAnimTimers]);


  // ---------- FOCUS TRAP ----------
  useEffect(() => {
    if (active === null) return;
    const root = modalRef.current;
    if (!root) return;

    const getFocusable = () => {
      const list = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(list).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
      );
    };

    getFocusable()[0]?.focus?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // ---------- KEEP ACTIVE THUMB IN VIEW ----------
  useEffect(() => {
    if (active === null) return;
    const btn = thumbBtnRefs.current.get(active);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <>
      {/* GRID */}
      <div className="gallery-grid">
        {visible.map((img, i) => {
          const isLastCell = i === MAX_VISIBLE - 1;
          const hasOverlay = isLastCell && remaining > 0;
          const idxToOpen = hasOverlay ? MAX_VISIBLE : i;

          return (
            <button
              key={i}
              type="button"
              className="gallery-item"
              onMouseEnter={() => prefetchIndex(idxToOpen)}
              onFocus={() => prefetchIndex(idxToOpen)}
              onClick={() => openAt(idxToOpen)}
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
          <div
            className="gallery-modal-inner"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button className="gallery-close" onClick={close} aria-label="Volver" type="button">
              <img src="/icons/back-button.svg" alt="" aria-hidden="true" />
            </button>

            <button
              className="gallery-nav left"
              type="button"
              aria-label="Anterior"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              ‹
            </button>

            <div
              className={`gallery-main${isLoading ? " is-loading" : ""}${isZooming ? " is-zooming" : ""}`}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              {displayed !== null && (
                <div className="slide-layer base">
                  <img
                    src={images[displayed].modalSrc}
                    srcSet={images[displayed].modalSrcset}
                    sizes={images[displayed].modalSizes}
                    alt={images[displayed].alt}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              {incoming !== null && (
                <div className="slide-layer incoming">
                  <img
                    src={images[incoming].modalSrc}
                    srcSet={images[incoming].modalSrcset}
                    sizes={images[incoming].modalSizes}
                    alt={images[incoming].alt}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              <div className="gallery-loader" aria-hidden="true">
                <div className="dot" />
              </div>
            </div>

            <button
              className="gallery-nav right"
              type="button"
              aria-label="Siguiente"
              disabled={isLoading}
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

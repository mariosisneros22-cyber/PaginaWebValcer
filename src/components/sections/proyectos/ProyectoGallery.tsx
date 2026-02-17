import React, { useEffect, useMemo, useState, useCallback } from "react";
import "./proyecto-gallery.css";


type ImageItem = {
  alt: string;

  thumbSrc: string;
  thumbSrcset: string;
  thumbSizes: string;

  fullSrc: string;
  fullSrcset: string;
  fullSizes: string;
};


type Props = {
  images: ImageItem[];
};

export default function ProyectoGallery({ images }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const maxVisible = 6;
  const visible = images.slice(0, maxVisible);
  const remaining = images.length - maxVisible;

  // ✅ Ventana de thumbs calculada para el render (NO dentro del effect)
  const THUMBS_WINDOW = 10;

  const { thumbStart, thumbs } = useMemo(() => {
    if (active === null) return { thumbStart: 0, thumbs: [] as ImageItem[] };

    const start = Math.max(
      0,
      Math.min(active - Math.floor(THUMBS_WINDOW / 2), Math.max(0, images.length - THUMBS_WINDOW))
    );

    return {
      thumbStart: start,
      thumbs: images.slice(start, start + THUMBS_WINDOW),
    };
  }, [active, images]);

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

  // ✅ Lock scroll solo cuando modal está abierto
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
      if (e.key === "Escape") setActive(null);
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
  }, [active, next, prev]);

  return (
    <>
      <div className="gallery-grid">
        {visible.map((img, i) => {
          const isLast = i === maxVisible - 1 && remaining > 0;

          return (
            <div key={i} className="gallery-item" onClick={() => setActive(i)}>
              <img
                src={img.thumbSrc}
                srcSet={img.thumbSrcset}
                sizes={img.thumbSizes}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />


              {isLast && <div className="gallery-overlay">+{remaining}</div>}
            </div>
          );
        })}
      </div>

      {active !== null && (
        <div className="gallery-modal" onClick={() => setActive(null)}>
          {/* ✅ stopPropagation para no cerrar al click dentro */}
          <div className="gallery-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-close"
              onClick={() => setActive(null)}
              aria-label="Cerrar galería"
              type="button"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="gallery-nav left" onClick={prev} type="button">
              ‹
            </button>

            <div className="gallery-main">
              <img
                src={images[active].fullSrc}
                srcSet={images[active].fullSrcset}
                sizes={images[active].fullSizes}
                alt={images[active].alt}
                loading="eager"
                decoding="async"
              />


            </div>

            <button className="gallery-nav right" onClick={next} type="button">
              ›
            </button>

            <div className="gallery-thumbs">
              {thumbs.map((img, idx) => {
                const i = thumbStart + idx;

                return (
                  <img
                    key={i}
                    src={img.thumbSrc}
                    srcSet={img.thumbSrcset}
                    sizes="120px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={i === active ? "active" : ""}
                    onClick={() => setActive(i)}
                  />
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

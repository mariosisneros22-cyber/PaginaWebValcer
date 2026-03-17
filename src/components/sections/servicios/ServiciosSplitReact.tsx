import React, { useEffect, useMemo, useState } from "react";
import "./servicios-split.css"



type Service = {
  id: string;
  title: string;
  tagline: string;
  items: string[];
  imageSrc: string;
  imageAlt: string;
  projectsCtaLabel: string;
};

type ProjectMini = {
  id: string;
  slug: string;
  nombre: string;
  cliente: string;
  estado: string;
  ubicacionText: string;
  coverSrc: string;
};

type Props = {
  services: Service[];
  projectsByService: Record<string, ProjectMini[]>;
  projectsBaseHref: string; // "/proyectos"
};

export default function ServiciosSplitReact({
  services,
  projectsByService,
  projectsBaseHref,
}: Props) {
  const firstId = services?.[0]?.id ?? "";

  const getInitialTab = () => {
    if (typeof window === "undefined") return firstId;
    const tab = new URLSearchParams(window.location.search).get("tab") ?? "";
    return services.some((s) => s.id === tab) ? tab : firstId;
  };

  const [activeId, setActiveId] = useState(getInitialTab);

  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId, services]
  );


  const [animTick, setAnimTick] = useState(0);


  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!activeId) return;

    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeId);
    window.history.replaceState({}, "", url.toString());
  }, [activeId]);

  useEffect(() => {
    setAnimTick((x) => x + 1);
  }, [activeId]);

  useEffect(() => {
  // Preload images once
  const urls = (services ?? []).map((s) => s.imageSrc).filter(Boolean);
  const imgs: HTMLImageElement[] = [];

  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
    imgs.push(img);
  });

  return () => {
    // allow GC
    imgs.length = 0;
  };
}, [services]);


  return (
    <section className="services-folders">
      {/* Tabs tipo archivador */}
      <div className="container cnt-service">
          <h2 className="services-title">Nuestros Servicios</h2>
          <p className="services-subtitle">
            Ingeniería y ejecución especializada para proyectos de alto impacto.
          </p>
      </div>

      <div className="services-folders__tabs" role="tablist" aria-label="Servicios">
        {services.map((s) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              className={`services-folders__tab ${selected ? "is-active" : ""}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`svc-panel-${s.id}`}
              onClick={() => setActiveId(s.id)} // ✅ opcional: toggle (0 o 1 abierto)
            >
              <span className="services-folders__tabTitle">{s.title.replaceAll("\n", " ")}</span>
              <span className="services-folders__tabMeta">
                {(projectsByService[s.id] ?? []).length} proyectos
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="services-folders__panel">
        {activeId ? (
          <>
            <div className="services-folders__media" data-anim={animTick} aria-hidden="true">
              <img
                src={active?.imageSrc ?? ""}
                alt={active?.imageAlt ?? active?.title ?? "Servicio"}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              key={activeId}
              id={`svc-panel-${active?.id ?? ""}`}
              className="services-folders__content"
              data-anim={animTick}
              role="tabpanel"
              aria-label={active?.title ?? "Servicio"}
            >
              <p className="services-folders__tagline">{active?.tagline}</p>

              <ul className="services-folders__list">
                {(active?.items ?? []).slice(0, 6).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>

              {!!(projectsByService[active?.id ?? ""] ?? []).length && (
                <div className="services-folders__related">
                  <span className="services-folders__relatedLabel">Proyectos vinculados</span>
                  <div className="services-folders__relatedList">
                    {(projectsByService[active?.id ?? ""] ?? []).map((project) => (
                      <span key={project.id} className="services-folders__relatedItem">
                        {project.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="services-folders__ctaRow">
                <a
                  className="btn btn-primary btn-sm"
                  href={`${projectsBaseHref}?servicio=${encodeURIComponent(active?.id ?? "")}`}
                >
                  {active?.projectsCtaLabel ?? "Ver proyectos"}
                </a>
                <a className="btn btn-sm services-btn-outline" href="/contacto">
                  Cotizar
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="services-folders__empty">
            <p>Selecciona un servicio para ver el detalle.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useMemo, useState } from "react";
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
  const [activeId, setActiveId] = useState(firstId);

  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId, services]
  );

  const related = projectsByService?.[active?.id ?? ""] ?? [];
  const allHref = `${projectsBaseHref}?servicio=${encodeURIComponent(active?.id ?? "")}`;

  return (
    <div className="services-split__layout">
      {/* LEFT: selector */}
      <div className="services-split__left" role="tablist" aria-label="Servicios">
        {services.map((s) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              className={`services-split__tab ${selected ? "is-active" : ""}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${s.id}`}
              onClick={() => setActiveId(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(s.id);
                }
              }}
            >
              <h3 className="services-split__tabTitle">
                {s.title.split("\n").map((line, i) => (
                    <span key={i} className="services-line">
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
            </button>
          );
        })}
      </div>

      {/* RIGHT: panel */}
      <div
        id={`panel-${active?.id ?? ""}`}
        className="services-split__right"
        role="tabpanel"
        aria-label={active?.title ?? "Servicio"}
      >
        <div className="services-panel">
          <div className="services-panel__media" aria-hidden="true">
            <img
              src={active?.imageSrc ?? ""}
              alt={active?.imageAlt ?? active?.title ?? "Servicio"}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="services-panel__content">
            <div className="services-panel__base">
              <p className="services-panel__tagline">{active?.tagline}</p>
            </div>

            {/* BODY: zona variable (no mueve footer) */}
            <div className="services-panel__body">
              <ul className="services-panel__list">
                {(active?.items ?? []).slice(0, 6).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>

            {/* FOOTER: fijo abajo derecha */}
            <div className="services-panel__footer">
              <div className="services-panel__ctaRow">
                <a className="btn btn-primary" href={allHref}>
                  {active?.projectsCtaLabel ?? "Ver proyectos"}
                </a>
                <a className="btn services-btn-outline" href="/contacto">
                  Cotizar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
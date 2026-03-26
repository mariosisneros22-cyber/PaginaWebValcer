import React, { useState } from "react";

import "../styles/card.css";
import MiniMapProyecto from "./MiniMapProyecto";

import type { Projecto } from "../../../../lib/projects";
import {
  estadoToKey,
  formatEstadoLabel,
  formatMonto,
  formatSimpleLabel,
} from "../../../../lib/projects";

type ProjectWithCover = Projecto & { coverUrl: string };

type Props = {
  project: ProjectWithCover;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  showServicios?: boolean;
  mobileCompact?: boolean;
};

export default function ProyectoCardView({
  project,
  href,
  className,
  children,
  showServicios = true,
  mobileCompact = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cls = `project-card${mobileCompact ? " is-mobile-compact" : ""}${
    className ? ` ${className}` : ""
  }`;

  const estadoKey = estadoToKey(project.estado);
  const extra = Math.max(0, (project.servicios?.length ?? 0) - 2);

  const isFeatured = className?.includes("isFeatured");
  const isSecondary = className?.includes("isSecondary");
  const isCurtain = className?.includes("isCurtain");
  const hasCoords =
    typeof project.ubicacion?.lat === "number" && typeof project.ubicacion?.lng === "number";

  const curtainTitle = project.nombre.toUpperCase();
  const curtainLocation = [
    project.ubicacion?.distrito,
    project.ubicacion?.departamento,
  ]
    .filter(Boolean)
    .join(", ");

  const mediaFallback = hasCoords ? (
    <div className="thumbFallback thumbFallback--map" aria-label={`Ubicacion de ${project.nombre}`}>
      <MiniMapProyecto
        lng={project.ubicacion.lng!}
        lat={project.ubicacion.lat!}
        zoom={9}
        lazy
        initOnIdle
        releaseOnExit
        rootMargin="120px 0px"
        showMarker={false}
        showAttribution={false}
        className="miniMap miniMap--card"
      />
    </div>
  ) : (
    <div className="thumbFallback" />
  );

const Inner = isCurtain ? (
  <>
    <div className="doorBackInfo">
      <div className="doorBackInfoInner">
        {curtainLocation ? (
          <p className="doorBackInfo__eyebrow">{curtainLocation}</p>
        ) : null}

        <h3 className="doorBackInfo__title">{project.nombre}</h3>

        {isFeatured ? (
          <>
            <p className="doorBackInfo__lead">{project.cliente}</p>

            <div className="doorBackInfo__grid">
              <p className="doorBackInfo__meta doorBackInfo__meta--status">
                {formatEstadoLabel(estadoKey)}
              </p>

              {typeof project.monto === "number" ? (
                <p className="doorBackInfo__meta">
                  Monto: {formatMonto(project.monto)}
                </p>
              ) : null}

              {project.fecha_inicio ? (
                <p className="doorBackInfo__meta">
                  Inicio: {project.fecha_inicio}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {isSecondary ? (
          <div className="doorBackInfo__grid doorBackInfo__grid--compact">
            <p className="doorBackInfo__meta doorBackInfo__meta--status">
              {formatEstadoLabel(estadoKey)}
            </p>

            {typeof project.monto === "number" ? (
              <p className="doorBackInfo__meta">
                Monto: {formatMonto(project.monto)}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>

    <div className="doorFront">
      <div className="doorFront__half doorFront__half--left">
        <div className="doorImage">
          {project.coverUrl ? (
            <img
              src={project.coverUrl}
              alt={project.nombre}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ) : (
            mediaFallback
          )}
        </div>

        <div className="doorOverlay" />

        <div className="doorTitleMask">
          <div className="doorTitle doorTitle--left">{curtainTitle}</div>
        </div>
      </div>

      <div className="doorFront__half doorFront__half--right">
        <div className="doorImage">
          {project.coverUrl ? (
            <img
              src={project.coverUrl}
              alt={project.nombre}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ) : (
            mediaFallback
          )}
        </div>

        <div className="doorOverlay" />

        <div className="doorTitleMask">
          <div className="doorTitle doorTitle--right">{curtainTitle}</div>
        </div>
      </div>
    </div>
  </>
) : (
  <>
    <div className="thumb">
      {project.coverUrl ? (
        <img
          src={project.coverUrl}
          alt={project.nombre}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      ) : (
        mediaFallback
      )}
    </div>

    <div className="body">
      <h3 className="title">{project.nombre}</h3>

      <p className="meta metaLocation">
        {project.ubicacion?.distrito ? `${project.ubicacion.distrito}, ` : ""}
        {project.ubicacion?.departamento}
      </p>

      {typeof project.monto === "number" ? (
        <p className="meta metaMonto">Monto: {formatMonto(project.monto)}</p>
      ) : null}

      <div className={`mobileDetails${isExpanded ? " is-expanded" : ""}`}>
        <p className="meta metaClient">{project.cliente}</p>

        <div className="badges">
          <span className={`tech-badge estado-${estadoKey}`}>
            {formatEstadoLabel(estadoKey)}
          </span>

          {showServicios && (
            <>
              {(project.servicios ?? []).slice(0, 2).map((s, i) => (
                <span className="tech-badge" key={`${s}-${i}`}>
                  {formatSimpleLabel(s)}
                </span>
              ))}
              {extra > 0 ? <span className="tag">+{extra}</span> : null}
            </>
          )}
        </div>
      </div>

      {mobileCompact ? (
        <button
          type="button"
          className="mobileExpandBtn"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Ver menos" : "Ver mas"}
        </button>
      ) : null}

      {children ? <div className="cardActions">{children}</div> : null}
    </div>
  </>
);

  if (href) {
    return (
      <a className={cls} href={href}>
        {Inner}
      </a>
    );
  }

  return <article className={cls}>{Inner}</article>;
}

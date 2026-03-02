import React, { useState } from "react";

import "../styles/card.css"

import type { Projecto } from "../../../../lib/projects";
import { estadoToKey,formatEstadoLabel, formatSimpleLabel } from "../../../../lib/projects";
type ProjectWithCover = Projecto & { coverUrl: string };

type Props = {
  project: ProjectWithCover;
  href?: string;              // opcional: si quieres que toda la card navegue
  className?: string;
  children?: React.ReactNode; // acciones
  showServicios?:boolean;
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
  const cls = `project-card${mobileCompact ? " is-mobile-compact" : ""}${className ? ` ${className}` : ""}`;
  const estadoKey = estadoToKey(project.estado);  
  const extra = Math.max(0, (project.servicios?.length ?? 0) - 2);
  const Inner = (
    <>
      <div className="thumb">
        {project.coverUrl ? (
          <img src={project.coverUrl} alt={project.nombre} loading="lazy" />
        ) : (
          <div className="thumbFallback" />
        )}
      </div>

      <div className="body">
        <h3 className="title">{project.nombre}</h3>

        <p className="meta metaLocation">
          {project.ubicacion?.distrito ? `${project.ubicacion.distrito}, ` : ""}
          {project.ubicacion?.departamento}
        </p>

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

import React from "react";
import type { Projecto } from "../../../lib/projects";
import "./proyecto-explorer.css";
import { estadoToKey,formatEstadoLabel } from "../../../lib/projects";
type ProjectWithCover = Projecto & { coverUrl: string };

type Props = {
  project: ProjectWithCover;
  href?: string;              // opcional: si quieres que toda la card navegue
  className?: string;
  children?: React.ReactNode; // acciones
};

export default function ProyectoCardView({ project, href, className, children }: Props) {
  const cls = `project-card${className ? ` ${className}` : ""}`;
  const estadoKey = estadoToKey(project.estado);  
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

        <p className="meta">
          {project.ubicacion?.distrito ? `${project.ubicacion.distrito}, ` : ""}
          {project.ubicacion?.departamento}
        </p>

        <p className="meta">{project.cliente}</p>

        <div className="badges">
          <span className={`tech-badge estado-${estadoKey}`}>
            {formatEstadoLabel(estadoKey)}
          </span>

          {(project.servicios ?? []).slice(0, 2).map((r) => (
            <span className="tag" key={r}>
              {r}
            </span>
          ))}
        </div>

        {project.resumen ? <p className="desc">{project.resumen}</p> : null}

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

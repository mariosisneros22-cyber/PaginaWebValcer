import React from "react";
import type { Projecto } from "../../../lib/projects";
import ProyectoCardView from "./ProyectoCardView";

type ProjectWithCover = Projecto & { coverUrl: string };

export type RelatedProyectoReactProps = {
  title?: string;
  subtitle?: string;
  projects: ProjectWithCover[];
  backQuery?: string;
};

export default function RelatedProyectoReact({
  title = "Proyectos relacionados",
  subtitle,
  projects,
  backQuery = "",
}: RelatedProyectoReactProps) {
  if (!projects?.length) return null;

  const safeQuery =
    backQuery && backQuery !== "?"
      ? backQuery.startsWith("?")
        ? backQuery
        : `?${backQuery}`
      : "";

  return (
    <section className="related">
      <div className="head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="relatedGrid">
        {projects.map((p) => (
          <ProyectoCardView
            key={p.id}
            project={p}
            href={`/proyectos/${p.slug}${safeQuery}`}
          />
        ))}
      </div>
    </section>
  );
}

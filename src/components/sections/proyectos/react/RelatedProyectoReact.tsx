import type { Projecto } from "../../../../lib/projects";
import ProyectoCardView from "../react/ProyectoCardView";

import "../styles/related.css"

type ProjectWithCover = Projecto & { coverUrl: string };

export type RelatedProyectoReactProps = {
  title?: string;
  subtitle?: string;
  projects: ProjectWithCover[];
  backQuery?: string;
  showHeader?: boolean;
  variant?: "grid" | "mag";
};

export default function RelatedProyectoReact({
  title = "Proyectos relacionados",
  subtitle,
  projects,
  backQuery = "",
  showHeader = true,
  variant = "grid", // ✅ por defecto el layout clásico
}: RelatedProyectoReactProps) {
  if (!projects?.length) return null;

  const safeQuery =
    backQuery && backQuery !== "?"
      ? backQuery.startsWith("?")
        ? backQuery
        : `?${backQuery}`
      : "";

  return (
    <section className={`related ${variant === "mag" ? "related--mag" : ""}`}>
      {showHeader && (
        <div className="head">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      )}

      {variant === "mag" ? (
        (() => {
          const featured = projects[0];
          const secondary = projects.slice(1, 4);

          return (
            <div className="magGrid">
              <ProyectoCardView
                className="isFeatured"
                project={featured}
                href={`/proyectos/${featured.slug}${safeQuery}`}
                showServicios={false}
              />
              <div className="magSide">
                {secondary.map((p) => (
                  <ProyectoCardView
                    key={p.id}
                    className="isSecondary"
                    project={p}
                    href={`/proyectos/${p.slug}${safeQuery}`}
                    showServicios={false}
                  />
                ))}
              </div>
            </div>
          );
        })()
      ) : (
        <div className="relatedGrid">
          {projects.map((p) => (
            <ProyectoCardView
              key={p.id}
              project={p}
              href={`/proyectos/${p.slug}${safeQuery}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
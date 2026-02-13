import React, { useEffect, useMemo, useState } from "react";
import type { Projecto, ProjectFilters } from "../../../lib/projects";
import "./proyecto-explorer.css";
import {
  applyProjectFilters,
  parseFiltersFromUrl,
  buildProjectsQueryString,
  getAvailableStates,
  getAvailableRubros,
  getAvailableDepartamentos,
  formatEstadoLabel,
  formatSimpleLabel,
} from "../../../lib/projects";

type ProjectWithCover = Projecto & {
  coverUrl: string; // viene resuelto desde Astro
};

type Props = {
  projects: ProjectWithCover[];
};

export default function ProyectoExplorer({ projects }: Props) {
  const [filters, setFilters] = useState<ProjectFilters>({});

  // Inicializar filtros desde URL
  useEffect(() => {
    const url = new URL(window.location.href);
    setFilters(parseFiltersFromUrl(url));
  }, []);

  // Opciones
  const estados = useMemo(() => getAvailableStates(projects), [projects]);
  const rubros = useMemo(() => getAvailableRubros(projects), [projects]);
  const dptos = useMemo(() => getAvailableDepartamentos(projects), [projects]);

  // Aplicar filtros
  const filtered = useMemo(
    () => applyProjectFilters(projects, filters),
    [projects, filters]
  );

  const totalVisibles = useMemo(
    () => applyProjectFilters(projects, {}).length,
    [projects]
  );

  // Sincronizar URL sin recarga
  useEffect(() => {
    const qs = buildProjectsQueryString(filters);
    const next = `${window.location.pathname}${qs}`;
    window.history.replaceState(null, "", next);
  }, [filters]);

  const onChange = (patch: Partial<ProjectFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const clearAll = () => setFilters({});
  const chips = useMemo(() => {
  const list: { key: string; label: string; next: ProjectFilters }[] = [];

    if (filters.estado) {
      list.push({
        key: "estado",
        label: `Estado: ${formatEstadoLabel(filters.estado)}`,
        next: { ...filters, estado: undefined },
      });
    }
    if (filters.rubro) {
      list.push({
        key: "rubro",
        label: `Rubro: ${formatSimpleLabel(filters.rubro)}`,
        next: { ...filters, rubro: undefined },
      });
    }
    if (filters.dpto) {
      list.push({
        key: "dpto",
        label: `Dpto: ${formatSimpleLabel(filters.dpto)}`,
        next: { ...filters, dpto: undefined },
      });
    }
    if (filters.q) {
      list.push({
        key: "q",
        label: `Búsqueda: "${filters.q}"`,
        next: { ...filters, q: undefined },
      });
    }

    return list;
  }, [filters]);

  return (
    <section className="container">
      {/* FILTROS */}
      <div className="filters">
        <div className="row">
          <label>
            Estado
            <select
              value={filters.estado ?? ""}
              onChange={(e) =>
                onChange({ estado: e.target.value || undefined })
              }
            >
              <option value="">Todos</option>
              {estados.map((e) => (
                <option key={e} value={e}>
                  {formatEstadoLabel(e)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rubro
            <select
              value={filters.rubro ?? ""}
              onChange={(e) =>
                onChange({ rubro: e.target.value || undefined })
              }
            >
              <option value="">Todos</option>
              {rubros.map((r) => (
                <option key={r} value={r}>
                  {formatSimpleLabel(r)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Departamento
            <select
              value={filters.dpto ?? ""}
              onChange={(e) =>
                onChange({ dpto: e.target.value || undefined })
              }
            >
              <option value="">Todos</option>
              {dptos.map((d) => (
                <option key={d} value={d}>
                  {formatSimpleLabel(d)}
                </option>
              ))}
            </select>
          </label>

          <label className="search">
            Buscar
            <input
              type="search"
              placeholder="Nombre, cliente, ubicación, rubro…"
              value={filters.q ?? ""}
              onChange={(e) =>
                onChange({ q: e.target.value || undefined })
              }
            />
          </label>

          <div className="actions">
            <button type="button" onClick={clearAll}>
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="summary">
        <span>
          Mostrando <strong>{filtered.length}</strong> de{" "}
          <strong>{totalVisibles}</strong>
        </span>

        {chips.length > 0 ? (
          <div className="chips">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                className="chip"
                onClick={() => setFilters(c.next)}
                title="Quitar filtro"
              >
                {c.label} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>


      {/* GRID */}
      {filtered.length > 0 ? (
        <div className="projects-grid">
          {filtered.map((p) => (
            <a
              className="project-card"
              key={p.id}
              href={`/proyectos/${p.slug}`}
            >
              <div className="thumb">
                {p.coverUrl ? (
                  <img
                    src={p.coverUrl}
                    alt={p.nombre}
                    loading="lazy"
                  />
                ) : (
                  <div className="thumbFallback" />
                )}
              </div>

              <div className="body">
                <h3 className="title">{p.nombre}</h3>

                <p className="meta">
                  {p.ubicacion?.distrito
                    ? `${p.ubicacion.distrito}, `
                    : ""}
                  {formatSimpleLabel(
                    p.ubicacion?.departamento ?? ""
                  )}
                </p>

                <div className="badges">
                  <span className="badge">
                    {formatEstadoLabel(p.estado)}
                  </span>
                  {(p.rubros ?? []).slice(0, 2).map((r) => (
                    <span className="tag" key={r}>
                      {formatSimpleLabel(r)}
                    </span>
                  ))}
                </div>

                <p className="desc">{p.resumen}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No se encontraron proyectos</h3>
          <p>Prueba quitando filtros o cambiando la búsqueda.</p>
          <button type="button" className="clearBig" onClick={clearAll}>
            Limpiar filtros
          </button>
        </div>

      )}
    </section>
  );
}

export type Projecto = {
  id: string;
  slug: string;
  nombre: string;
  estado: string;
  rubros?: string[];
  ubicacion: {
    departamento: string;
    provincia?: string;
    distrito?: string;
    lat?: number;
    lng?: number;
  };
  fecha_inicio?: number | string;
  fecha_fin?: number | string | null;
  resumen?: string;
  portada: string;
  galeria?: { src: string; alt?: string }[];
  visible?: boolean;
};

export const isVisibleProject = (p: Projecto) => {
  // default: visible si no está definido
  const visible = p.visible ?? true;

  // hard block por estado (por si se olvidan el flag)
  const estado = (p.estado || "").toLowerCase().trim();
  const blockedByEstado =
    estado === "arbitraje" ||
    estado === "arbitrraje" ||
    estado === "arbitrrajes" ||
    estado === "arbitrajes";

  return visible && !blockedByEstado;
};

const normalize = (s: string) => (s ?? "").toString().trim().toLowerCase();

export function getVisibleProjects(projects: Projecto[]): Projecto[] {
  return projects.filter(isVisibleProject);
}

export function getAvailableStates(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const p of getVisibleProjects(projects)) {
    if (!p.estado) continue;
    set.add(normalize(p.estado));
  }
  // Orden preferido:
  const order = ["en_ejecucion", "finalizado"];
  return [
    ...order.filter((x) => set.has(x)),
    ...[...set].filter((x) => !order.includes(x)).sort(),
  ];
}

export function getAvailableRubros(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const p of getVisibleProjects(projects)) {
    for (const r of p.rubros ?? []) {
      const v = normalize(r);
      if (v) set.add(v);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getAvailableDepartamentos(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const p of getVisibleProjects(projects)) {
    const d = normalize(p.ubicacion?.departamento ?? "");
    if (d) set.add(d);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
export type ProjectFilters = {
  estado?: string; // en_ejecucion | finalizado
  rubro?: string;  // ej: infraestructura
  dpto?: string;   // ej: lima
  q?: string;      // búsqueda libre
};

const norm = (s: string) => (s ?? "").toString().trim().toLowerCase();

const allowedEstados = new Set(["en_ejecucion", "finalizado"]);

export function parseFiltersFromUrl(url: URL): ProjectFilters {
  const sp = url.searchParams;

  const estado = norm(sp.get("estado") ?? "");
  const rubro = norm(sp.get("rubro") ?? "");
  const dpto = norm(sp.get("dpto") ?? "");
  const q = (sp.get("q") ?? "").toString().trim();

  return {
    estado: allowedEstados.has(estado) ? estado : undefined,
    rubro: rubro || undefined,
    dpto: dpto || undefined,
    q: q || undefined,
  };
}

export function applyProjectFilters(projects: Projecto[], filters: ProjectFilters): Projecto[] {
  const base = getVisibleProjects(projects);

  const estado = filters.estado ? norm(filters.estado) : "";
  const rubro = filters.rubro ? norm(filters.rubro) : "";
  const dpto = filters.dpto ? norm(filters.dpto) : "";
  const q = filters.q ? norm(filters.q) : "";

  return base.filter((p) => {
    // estado
    if (estado && norm(p.estado) !== estado) return false;

    // rubro
    if (rubro) {
      const has = (p.rubros ?? []).some((r) => norm(r) === rubro);
      if (!has) return false;
    }

    // departamento
    if (dpto) {
      const pd = norm(p.ubicacion?.departamento ?? "");
      if (pd !== dpto) return false;
    }

    // búsqueda libre (nombre, resumen, ubicación)
    if (q) {
      const haystack = [
        p.nombre,
        p.resumen,
        p.ubicacion?.departamento,
        p.ubicacion?.provincia,
        p.ubicacion?.distrito,
        ...(p.rubros ?? []),
        p.estado,
      ]
        .filter(Boolean)
        .map((x) => String(x))
        .join(" ");

      if (!norm(haystack).includes(q)) return false;
    }

    return true;
  });
}

export function buildProjectsQueryString(filters: ProjectFilters): string {
  const sp = new URLSearchParams();

  if (filters.estado) sp.set("estado", norm(filters.estado));
  if (filters.rubro) sp.set("rubro", norm(filters.rubro));
  if (filters.dpto) sp.set("dpto", norm(filters.dpto));
  if (filters.q) sp.set("q", filters.q.trim());

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function titleCase(s: string): string {
  const v = (s ?? "").toString().trim();
  if (!v) return "";
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export function formatEstadoLabel(estado: string): string {
  const v = (estado ?? "").toString().trim().toLowerCase();
  if (v === "en_ejecucion") return "En ejecución";
  if (v === "finalizado") return "Finalizado";
  return titleCase(v.replaceAll("_", " "));
}

export function formatSimpleLabel(v: string): string {
  // Para rubros/departamentos normalizados (lima -> Lima)
  return titleCase((v ?? "").toString().trim().toLowerCase());
}
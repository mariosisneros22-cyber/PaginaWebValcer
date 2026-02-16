export type Projecto = {
  id: string;
  slug: string;
  nombre: string;
  cliente: string;
  estado: string;
  servicios?: string[];
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


export const isVisibleProject = <T extends Projecto>(p: T) => {
  const visible = p.visible ?? true;

  const estado = (p.estado || "").toLowerCase().trim();
  const blockedByEstado =
    estado === "arbitraje" ||
    estado === "arbitrraje" ||
    estado === "arbitrrajes" ||
    estado === "arbitrajes";

  return visible && !blockedByEstado;
};

const normalize = (s: string) => (s ?? "").toString().trim().toLowerCase();

export function getVisibleProjects<T extends Projecto>(projects: T[]): T[] {
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

export function getAvailableServicios(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const p of getVisibleProjects(projects)) {
    for (const r of p.servicios ?? []) {
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
  servicio?: string;  // ej: infraestructura
  dpto?: string;   // ej: lima
  q?: string;      // búsqueda libre
};

const norm = (s: string) => (s ?? "").toString().trim().toLowerCase();

const allowedEstados = new Set(["en_ejecucion", "finalizado"]);

export function parseFiltersFromUrl(url: URL): ProjectFilters {
  const sp = url.searchParams;

  const estado = norm(sp.get("estado") ?? "");
  const servicio = norm(sp.get("servicio") ?? "");
  const dpto = norm(sp.get("dpto") ?? "");
  const q = (sp.get("q") ?? "").toString().trim();

  return {
    estado: allowedEstados.has(estado) ? estado : undefined,
    servicio: servicio || undefined,
    dpto: dpto || undefined,
    q: q || undefined,
  };
}

export function applyProjectFilters<T extends Projecto>(
  projects: T[],
  filters: ProjectFilters
): T[] {
  const base = getVisibleProjects(projects);

  const estado = filters.estado ? norm(filters.estado) : "";
  const servicio = filters.servicio ? norm(filters.servicio) : "";
  const dpto = filters.dpto ? norm(filters.dpto) : "";
  const q = filters.q ? norm(filters.q) : "";

  return base.filter((p) => {
    if (estado && norm(p.estado) !== estado) return false;

    if (servicio) {
      const has = (p.servicios ?? []).some((r) => norm(r) === servicio);
      if (!has) return false;
    }

    if (dpto) {
      const pd = norm(p.ubicacion?.departamento ?? "");
      if (pd !== dpto) return false;
    }

    if (q) {
      const haystack = [
        p.nombre,
        p.cliente, // ✅ si ya lo agregaste en el type como obligatorio
        p.resumen,
        p.ubicacion?.departamento,
        p.ubicacion?.provincia,
        p.ubicacion?.distrito,
        ...(p.servicios ?? []),
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
  if (filters.servicio) sp.set("servicio", norm(filters.servicio));
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
  // Para servicios/departamentos normalizados (lima -> Lima)
  return titleCase((v ?? "").toString().trim().toLowerCase());
}

export function assertValidProjects(projects: Projecto[]): void {
  const errors: string[] = [];

  for (const p of projects) {
    if (!p.cliente || !p.cliente.trim()) errors.push(`${p.slug}: falta cliente`);
    if (!p.nombre || !p.nombre.trim()) errors.push(`${p.slug}: falta nombre`);
    if (!p.slug || !p.slug.trim()) errors.push(`${p.id}: falta slug`);
  }

  if (errors.length) {
    throw new Error(`Datos inválidos en proyectos.json:\n- ${errors.join("\n- ")}`);
  }
}

export function estadoToKey(estado: string): string {
  return (estado ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}

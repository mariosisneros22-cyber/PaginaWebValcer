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
    lat?: number | null;
    lng?: number | null;
  };
  fecha_inicio?: number | string;
  fecha_fin?: number | string | null;
  resumen?: string;
  portada: string;
  galeria?: { src: string; alt?: string }[];
  visible?: boolean;
  monto?: number;
};

export type ProjectFilters = {
  estado?: string;
  servicio?: string;
  dpto?: string;
  q?: string;
};

const normalizeText = (value: string | number | null | undefined) =>
  (value ?? "").toString().trim().toLowerCase();

const blockedEstados = new Set([
  "arbitraje",
  "arbitrraje",
  "arbitrrajes",
  "arbitrajes",
]);

const allowedEstados = new Set(["en_ejecucion", "finalizado"]);

const getProjectSearchText = (project: Projecto) =>
  [
    project.nombre,
    project.cliente,
    project.resumen,
    project.ubicacion?.departamento,
    project.ubicacion?.provincia,
    project.ubicacion?.distrito,
    ...(project.servicios ?? []),
    project.estado,
  ]
    .filter(Boolean)
    .map((value) => String(value))
    .join(" ");

export const isVisibleProject = <T extends Projecto>(project: T) => {
  const visible = project.visible ?? true;
  return visible && !blockedEstados.has(normalizeText(project.estado));
};

export function getVisibleProjects<T extends Projecto>(projects: T[]): T[] {
  return projects.filter(isVisibleProject);
}

export function getAvailableStates(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const project of getVisibleProjects(projects)) {
    const estado = normalizeText(project.estado);
    if (estado) set.add(estado);
  }

  const order = ["en_ejecucion", "finalizado"];
  return [
    ...order.filter((value) => set.has(value)),
    ...[...set].filter((value) => !order.includes(value)).sort(),
  ];
}

export function getAvailableServicios(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const project of getVisibleProjects(projects)) {
    for (const servicio of project.servicios ?? []) {
      const value = normalizeText(servicio);
      if (value) set.add(value);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getAvailableDepartamentos(projects: Projecto[]): string[] {
  const set = new Set<string>();
  for (const project of getVisibleProjects(projects)) {
    const departamento = normalizeText(project.ubicacion?.departamento);
    if (departamento) set.add(departamento);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function parseFiltersFromUrl(url: URL): ProjectFilters {
  const sp = url.searchParams;

  const estado = normalizeText(sp.get("estado"));
  const servicio = normalizeText(sp.get("servicio"));
  const dpto = normalizeText(sp.get("dpto"));
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
  const estado = normalizeText(filters.estado);
  const servicio = normalizeText(filters.servicio);
  const dpto = normalizeText(filters.dpto);
  const q = normalizeText(filters.q);

  return base.filter((project) => {
    if (estado && normalizeText(project.estado) !== estado) return false;

    if (servicio) {
      const hasService = (project.servicios ?? []).some(
        (value) => normalizeText(value) === servicio
      );
      if (!hasService) return false;
    }

    if (dpto && normalizeText(project.ubicacion?.departamento) !== dpto) {
      return false;
    }

    if (q && !normalizeText(getProjectSearchText(project)).includes(q)) {
      return false;
    }

    return true;
  });
}

export function buildProjectsQueryString(filters: ProjectFilters): string {
  const sp = new URLSearchParams();

  if (filters.estado) sp.set("estado", normalizeText(filters.estado));
  if (filters.servicio) sp.set("servicio", normalizeText(filters.servicio));
  if (filters.dpto) sp.set("dpto", normalizeText(filters.dpto));
  if (filters.q) sp.set("q", filters.q.trim());

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function titleCase(value: string): string {
  const normalized = (value ?? "").toString().trim();
  if (!normalized) return "";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function formatEstadoLabel(estado: string): string {
  const value = normalizeText(estado);
  if (value === "en_ejecucion") return "En ejecucion";
  if (value === "finalizado") return "Finalizado";
  return titleCase(value.replaceAll("_", " "));
}

export function formatSimpleLabel(value: string): string {
  return titleCase(normalizeText(value));
}

const montoFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMonto(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return montoFormatter.format(value);
}

export function assertValidProjects(projects: Projecto[]): void {
  const errors: string[] = [];

  for (const project of projects) {
    if (!project.cliente || !project.cliente.trim()) {
      errors.push(`${project.slug}: falta cliente`);
    }
    if (!project.nombre || !project.nombre.trim()) {
      errors.push(`${project.slug}: falta nombre`);
    }
    if (!project.slug || !project.slug.trim()) {
      errors.push(`${project.id}: falta slug`);
    }
  }

  if (errors.length) {
    throw new Error(`Datos invalidos en proyectos.json:\n- ${errors.join("\n- ")}`);
  }
}

export function getUniqueProjectsBySlug<T extends Projecto>(projects: T[]): T[] {
  const seen = new Set<string>();

  return projects.filter((project) => {
    const slug = (project.slug ?? "").trim();
    if (!slug || seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export function estadoToKey(estado: string): string {
  return normalizeText(estado)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}

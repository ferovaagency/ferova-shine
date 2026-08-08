/**
 * ============================================================================
 *  scripts/validate-routes.ts
 * ============================================================================
 *  Guardarraíl de build (Paso 18). Se ejecuta dentro de `vite build` mediante
 *  el plugin `seoBuildPlugin` (ver vite.config.ts) — NO necesita un runner de
 *  TypeScript ni dependencias nuevas.
 *
 *  ERRORES (rompen el build):
 *    - Paths duplicados entre rutas distintas.
 *    - Ids duplicados.
 *    - Una ruta sin ningún idioma o un path que no empieza con "/".
 *    - priority fuera de [0,1].
 *
 *  ADVERTENCIAS (no rompen el build):
 *    - Un path del registro que no aparece en src/App.tsx (posible <Route>
 *      olvidada → esa ruta prerenderizada caería en NotFound / 404).
 * ============================================================================
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { ROUTES, LANGS, PRERENDER_ROUTES } from "../src/config/routes";

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export function validateRoutes(appTsxPath?: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const seenIds = new Set<string>();
  const pathOwner = new Map<string, string>();

  for (const route of ROUTES) {
    if (seenIds.has(route.id)) errors.push(`Id duplicado: "${route.id}"`);
    seenIds.add(route.id);

    if (route.priority !== undefined && (route.priority < 0 || route.priority > 1)) {
      errors.push(`Prioridad fuera de rango en "${route.id}": ${route.priority}`);
    }

    const configuredPaths = LANGS.map((lang) => route.paths[lang]).filter(
      (path): path is string => Boolean(path),
    );
    if (configuredPaths.length === 0) {
      errors.push(`La ruta "${route.id}" no tiene ningún path configurado.`);
    }

    for (const lang of LANGS) {
      const p = route.paths[lang];
      if (!p) continue;
      if (!p.startsWith("/")) {
        errors.push(`Path no empieza con "/" en "${route.id}" (${lang}): "${p}"`);
      }
      const prev = pathOwner.get(p);
      if (prev && prev !== route.id) {
        errors.push(`Path duplicado "${p}" en "${route.id}" y "${prev}"`);
      }
      pathOwner.set(p, route.id);
    }
  }

  // Cada path del registro debe existir como <Route> literal en App.tsx.
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const appPath = appTsxPath ?? resolve(__dirname, "../src/App.tsx");
    const appSrc = readFileSync(appPath, "utf8");
    for (const p of PRERENDER_ROUTES) {
      if (p === "/" || p === "/en" || p === "/pt") continue;
      if (!appSrc.includes(`"${p}"`)) {
        warnings.push(`Path prerenderizado sin <Route> literal en App.tsx: ${p}`);
      }
    }
  } catch {
    warnings.push("No se pudo leer src/App.tsx para verificar rutas.");
  }

  return { errors, warnings };
}

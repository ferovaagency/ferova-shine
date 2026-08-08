import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strategy = JSON.parse(await readFile(join(root, "reconstruction", "strategy.json"), "utf8"));
const sitemap = await readFile(join(root, "public", "sitemap.xml"), "utf8");
const app = await readFile(join(root, "src", "App.tsx"), "utf8");
const routeRegistry = await readFile(join(root, "src", "config", "routes.ts"), "utf8");
const supabaseTypes = await readFile(join(root, "src", "integrations", "supabase", "types.ts"), "utf8");

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
const targetByPath = new Map(strategy.targetSeoArchitecture.map((entry) => [entry.path, entry]));

function languageOf(path) {
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/pt" || path.startsWith("/pt/")) return "pt";
  return "es";
}

function groupOf(path) {
  if (path === "/" || path === "/en" || path === "/pt") return "home";
  if (path.includes("/blog")) return "blog";
  if (path.includes("casos-de-exito") || path.includes("case-studies") || path.includes("casos-de-sucesso")) return "case_study";
  if (path.includes("/recursos") || path.includes("/resources")) return "resource";
  if (path.includes("newsletter")) return "newsletter";
  if (path.includes("/servicios") || path.includes("/services") || path.includes("/servicos")) return "service";
  if (path.includes("/productos") || path.includes("/products") || path.includes("/produtos")) return "product";
  if (path.includes("/terminos") || path.includes("/terms") || path.includes("/termos") || path.includes("/privacidad") || path.includes("/privacy") || path.includes("/cookies")) return "legal";
  return "page";
}

function ruleFor(path) {
  return strategy.transferRules.find((rule) =>
    rule.paths.some((candidate) => rule.match === "exact" ? path === candidate : path === candidate || path.startsWith(`${candidate}/`)),
  );
}

function decisionFor(path) {
  const target = targetByPath.get(path);
  if (target) {
    return {
      decision: target.status === "create" ? "target_create" : "keep_and_rebuild",
      destination: path,
      condition: "preserve_current_url_when_equivalent",
    };
  }

  const rule = ruleFor(path);
  if (rule) return { decision: rule.decision, destination: rule.destination, condition: rule.condition };

  if (languageOf(path) === "pt") {
    return { decision: "language_scope_review", destination: "", condition: "portuguese_not_in_target_architecture" };
  }

  if (languageOf(path) === "en") {
    return { decision: "language_scope_review", destination: "", condition: "english_requires_selective_equivalent" };
  }

  return { decision: "manual_seo_review", destination: "", condition: "needs_search_console_analytics_backlinks_and_conversion_data" };
}

const rows = urls.map((url) => {
  const parsed = new URL(url);
  const path = parsed.pathname.length > 1 ? parsed.pathname.replace(/\/$/, "") : "/";
  const decision = decisionFor(path);
  return {
    url,
    path,
    language: languageOf(path),
    content_group: groupOf(path),
    decision: decision.decision,
    proposed_destination: decision.destination,
    validation_condition: decision.condition,
    production_change_authorized: "false",
  };
});

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
const headers = Object.keys(rows[0]);
const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => quote(row[header])).join(","))].join("\n") + "\n";

const tableNames = [...supabaseTypes.matchAll(/^\s{6}([a-z][a-z0-9_]*): \{/gm)].map((match) => match[1]);
const requiredCaseTables = [
  "case_studies",
  "case_metrics",
  "metric_snapshots",
  "case_timeline_events",
  "evidence_assets",
  "case_change_log",
  "consents",
];

const baseline = {
  strategyVersion: strategy.version,
  productionChangesAuthorized: strategy.productionChangesAuthorized,
  sitemapUrlCount: rows.length,
  languages: Object.fromEntries([...new Set(rows.map((row) => row.language))].map((language) => [language, rows.filter((row) => row.language === language).length])),
  decisions: Object.fromEntries([...new Set(rows.map((row) => row.decision))].map((decision) => [decision, rows.filter((row) => row.decision === decision).length])),
  appRouteDeclarations: [...app.matchAll(/<Route\s+path="/g)].length,
  routeRegistryEntries: [...routeRegistry.matchAll(/^\s*\{ id: "/gm)].length,
  targetSeoPages: strategy.targetSeoArchitecture.length,
  targetCorporatePages: strategy.targetCorporateArchitecture.length,
  targetSeoPagesNotPresentInCurrentSitemap: strategy.targetSeoArchitecture
    .map((entry) => entry.path)
    .filter((path) => !rows.some((row) => row.path === path)),
  currentSupabaseObjects: tableNames,
  missingCaseStudyObjects: requiredCaseTables.filter((table) => !tableNames.includes(table)),
  knownFrontendBackendMismatch: tableNames.includes("admin_inbox") ? [] : ["admin_inbox is referenced by the frontend but absent from generated database types"],
};

const generatedDir = join(root, "reconstruction", "generated");
await mkdir(generatedDir, { recursive: true });
await writeFile(join(generatedDir, "current-url-inventory.csv"), csv, "utf8");
await writeFile(join(generatedDir, "baseline.json"), `${JSON.stringify(baseline, null, 2)}\n`, "utf8");

console.log(JSON.stringify(baseline, null, 2));

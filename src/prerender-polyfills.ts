/**
 * Polyfills SSR — DEBE ser el primer import de prerender.tsx.
 * Los ES imports se hoistean; si el polyfill vive en el mismo archivo
 * no llega a ejecutarse antes de que Supabase client toque `localStorage`.
 */
const memStore = new Map<string, string>();
const noopStorage = {
  getItem: (k: string) => memStore.get(k) ?? null,
  setItem: (k: string, v: string) => {
    memStore.set(k, String(v));
  },
  removeItem: (k: string) => {
    memStore.delete(k);
  },
  clear: () => memStore.clear(),
  key: (i: number) => Array.from(memStore.keys())[i] ?? null,
  get length() {
    return memStore.size;
  },
};

const g = globalThis as unknown as Record<string, unknown>;
if (typeof g.window === "undefined") g.window = g;
if (typeof g.localStorage === "undefined") g.localStorage = noopStorage;
if (typeof g.sessionStorage === "undefined") g.sessionStorage = noopStorage;
if (typeof g.document === "undefined") {
  g.document = {
    addEventListener: () => {},
    removeEventListener: () => {},
    createElement: () => ({ setAttribute: () => {}, style: {}, appendChild: () => {} }),
    documentElement: { style: {}, scrollHeight: 0, clientHeight: 0 },
    body: { appendChild: () => {}, scrollHeight: 0 },
    head: { appendChild: () => {} },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
  };
}
if (typeof g.navigator === "undefined") g.navigator = { userAgent: "node" };
if (typeof g.location === "undefined") g.location = { hostname: "seoparaecommerce.co", href: "https://seoparaecommerce.co/", pathname: "/", search: "", hash: "" };

export {};

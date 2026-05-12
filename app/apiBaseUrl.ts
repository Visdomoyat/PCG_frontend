/**
 * Django API origin for client + SSR. Vite only injects `import.meta.env.VITE_*`
 * into the browser bundle (`process.env` is not available in the client).
 */
export function apiBaseUrl(): string {
  const fromEnv =
    import.meta.env.VITE_API_BASE_URL?.trim() ||
    import.meta.env.VITE_API_URL?.trim() ||
    "";
  const raw = fromEnv || "http://127.0.0.1:8000";
  return raw.replace(/\/+$/, "");
}

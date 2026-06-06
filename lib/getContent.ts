import { content, type SiteContent } from "@/content";

// The platform (CMS) is the source of truth for editable content.
// We fetch its overrides and deep-merge them over the local defaults, so an edit
// published in the CMS shows up here on the next request. If the CMS is
// unreachable, we fall back to the built-in content — the site never breaks.
const CMS_URL =
  process.env.CMS_URL || "http://localhost:3010/api/content";

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isObj(base) || !isObj(override)) {
    return (override === undefined ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const o = (override as Record<string, unknown>)[key];
    if (o === undefined) continue;
    const b = (base as Record<string, unknown>)[key];
    // Arrays and primitives replace; nested objects merge.
    out[key] = isObj(o) && isObj(b) ? deepMerge(b, o) : o;
  }
  return out as T;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const res = await fetch(CMS_URL, { cache: "no-store" });
    if (!res.ok) return content;
    const overrides = await res.json();
    return deepMerge(content, overrides);
  } catch {
    return content;
  }
}

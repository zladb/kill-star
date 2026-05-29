import type { MetadataRoute } from "next";

const BASE = "https://killstar.app";

const paths = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/faq",
  "/guides",
  "/guides/why-asterisks",
  "/guides/clean-ai-text",
  "/guides/markdown-basics",
  "/guides/notion-paste-tips",
];

const locales = ["en", "ko"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1.0 : 0.7,
    }))
  );
}

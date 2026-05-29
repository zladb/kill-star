import { useTranslations } from "next-intl";
import Link from "next/link";

const guides = [
  { slug: "why-asterisks", icon: "?" },
  { slug: "clean-ai-text", icon: ">" },
  { slug: "markdown-basics", icon: "#" },
  { slug: "notion-paste-tips", icon: "N" },
] as const;

export default function Guides() {
  const t = useTranslations("guides");

  return (
    <div className="max-w-2xl mx-auto w-full py-8">
      <Link
        href="/"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {t("back")}
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-3">{t("title")}</h1>
      <p className="text-muted mb-8">{t("subtitle")}</p>

      <div className="grid gap-4">
        {guides.map(({ slug, icon }) => (
          <Link
            key={slug}
            href={`/guides/${slug}`}
            className="block p-5 rounded-lg border border-surface-border bg-surface hover:border-primary transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl font-mono text-primary shrink-0 w-8 text-center">
                {icon}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  {t(`${slug}.title`)}
                </h2>
                <p className="text-muted text-sm">{t(`${slug}.summary`)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

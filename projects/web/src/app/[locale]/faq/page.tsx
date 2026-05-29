import { useTranslations } from "next-intl";
import LocaleLink from "@/components/LocaleLink";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default function FAQ() {
  const t = useTranslations("faq");

  return (
    <article className="max-w-2xl mx-auto w-full py-8">
      <LocaleLink
        href="/"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {t("back")}
      </LocaleLink>

      <h1 className="text-3xl font-bold text-foreground mb-3">{t("title")}</h1>
      <p className="text-muted mb-8">{t("subtitle")}</p>

      <div className="space-y-6">
        {faqKeys.map((key) => (
          <details
            key={key}
            className="group border border-surface-border rounded-lg bg-surface"
          >
            <summary className="cursor-pointer p-4 font-semibold text-foreground select-none list-none flex items-center justify-between">
              {t(`${key}.q`)}
              <span className="text-muted group-open:rotate-45 transition-transform text-xl leading-none">
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-muted leading-relaxed">
              {t(`${key}.a`)}
            </p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqKeys.map((key) => ({
              "@type": "Question",
              name: t(`${key}.q`),
              acceptedAnswer: {
                "@type": "Answer",
                text: t(`${key}.a`),
              },
            })),
          }),
        }}
      />
    </article>
  );
}

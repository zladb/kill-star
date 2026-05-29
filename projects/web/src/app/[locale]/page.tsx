import { useTranslations } from "next-intl";
import Link from "next/link";
import HeroAnimation from "@/components/HeroAnimation";
import Converter from "@/components/Converter";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="text-center mt-6 mb-8">
        <HeroAnimation />
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
          {t("hero.title")}
        </h1>
        <p className="text-muted mt-2 text-lg">{t("hero.subtitle")}</p>
      </section>

      {/* Converter */}
      <Converter />

      {/* How-to */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
          {t("howto.title")}
        </h2>
        <ol className="space-y-3 text-muted text-left list-decimal list-inside">
          <li>{t("howto.step1")}</li>
          <li>{t("howto.step2")}</li>
          <li>{t("howto.step3")}</li>
        </ol>
      </section>

      {/* Why section */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-3 text-center">
          {t("why.title")}
        </h2>
        <p className="text-muted leading-relaxed">{t("why.body")}</p>
      </section>

      {/* Features */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          {t("features.title")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {(["f1", "f2", "f3", "f4"] as const).map((key) => (
            <div
              key={key}
              className="p-4 rounded-lg border border-surface-border bg-surface"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {t(`features.${key}.heading`)}
              </h3>
              <p className="text-muted text-sm">
                {t(`features.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          {t("faqPreview.title")}
        </h2>
        <p className="text-muted mb-4">{t("faqPreview.body")}</p>
        <Link
          href="/faq"
          className="inline-block text-primary hover:text-primary-hover font-medium transition-colors"
        >
          {t("faqPreview.link")} &rarr;
        </Link>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kill Star",
            url: "https://killstar.app",
            description:
              "Free online tool to remove markdown bold syntax (**) from text",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0" },
          }),
        }}
      />
    </>
  );
}

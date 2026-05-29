import { useTranslations } from "next-intl";
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
      <section className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {t("howto.title")}
        </h2>
        <ol className="space-y-3 text-muted text-left list-decimal list-inside">
          <li>{t("howto.step1")}</li>
          <li>{t("howto.step2")}</li>
          <li>{t("howto.step3")}</li>
        </ol>
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

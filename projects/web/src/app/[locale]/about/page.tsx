import { getTranslations, setRequestLocale } from "next-intl/server";
import LocaleLink from "@/components/LocaleLink";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <article className="max-w-2xl mx-auto w-full py-8">
      <LocaleLink
        href="/"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {t("back")}
      </LocaleLink>

      <h1 className="text-3xl font-bold text-foreground mb-6">{t("title")}</h1>

      <div className="space-y-6 text-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("whatIs.heading")}
          </h2>
          <p className="text-muted">{t("whatIs.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("why.heading")}</h2>
          <p className="text-muted">{t("why.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("features.heading")}
          </h2>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>{t("features.item1")}</li>
            <li>{t("features.item2")}</li>
            <li>{t("features.item3")}</li>
            <li>{t("features.item4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("contact.heading")}
          </h2>
          <p className="text-muted">{t("contact.body")}</p>
        </section>
      </div>
    </article>
  );
}

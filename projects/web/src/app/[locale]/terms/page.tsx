import { getTranslations, setRequestLocale } from "next-intl/server";
import LocaleLink from "@/components/LocaleLink";

export default async function TermsOfService({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <article className="max-w-2xl mx-auto w-full py-8">
      <LocaleLink
        href="/"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {t("back")}
      </LocaleLink>

      <h1 className="text-3xl font-bold text-foreground mb-6">{t("title")}</h1>
      <p className="text-muted text-sm mb-8">{t("lastUpdated")}</p>

      <div className="space-y-6 text-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("acceptance.heading")}
          </h2>
          <p className="text-muted">{t("acceptance.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("service.heading")}
          </h2>
          <p className="text-muted">{t("service.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t("usage.heading")}</h2>
          <p className="text-muted">{t("usage.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("disclaimer.heading")}
          </h2>
          <p className="text-muted">{t("disclaimer.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("liability.heading")}
          </h2>
          <p className="text-muted">{t("liability.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("changes.heading")}
          </h2>
          <p className="text-muted">{t("changes.body")}</p>
        </section>
      </div>
    </article>
  );
}

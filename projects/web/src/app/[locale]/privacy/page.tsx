import { getTranslations, setRequestLocale } from "next-intl/server";
import LocaleLink from "@/components/LocaleLink";

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

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
          <h2 className="text-xl font-semibold mb-2">{t("intro.heading")}</h2>
          <p className="text-muted">{t("intro.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("dataCollection.heading")}
          </h2>
          <p className="text-muted">{t("dataCollection.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("localStorage.heading")}
          </h2>
          <p className="text-muted">{t("localStorage.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("thirdParty.heading")}
          </h2>
          <p className="text-muted">{t("thirdParty.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("cookies.heading")}
          </h2>
          <p className="text-muted">{t("cookies.body")}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            {t("changes.heading")}
          </h2>
          <p className="text-muted">{t("changes.body")}</p>
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

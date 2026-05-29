import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");

  return (
    <article className="max-w-2xl mx-auto w-full py-8">
      <Link
        href="/"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {t("back")}
      </Link>

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

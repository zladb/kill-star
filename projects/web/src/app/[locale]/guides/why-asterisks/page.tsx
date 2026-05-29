import { useTranslations } from "next-intl";
import GuideLayout from "@/components/GuideLayout";

export default function WhyAsterisks() {
  const t = useTranslations("guideWhyAsterisks");

  return (
    <GuideLayout back={t("back")} title={t("title")}>
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("what.heading")}</h2>
        <p className="text-muted">{t("what.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("why.heading")}</h2>
        <p className="text-muted">{t("why.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("training.heading")}</h2>
        <p className="text-muted">{t("training.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("when.heading")}</h2>
        <p className="text-muted">{t("when.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          {t("solution.heading")}
        </h2>
        <p className="text-muted">{t("solution.body")}</p>
      </section>
    </GuideLayout>
  );
}

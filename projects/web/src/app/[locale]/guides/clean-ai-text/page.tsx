import { useTranslations } from "next-intl";
import GuideLayout from "@/components/GuideLayout";

export default function CleanAiText() {
  const t = useTranslations("guideCleanAiText");

  return (
    <GuideLayout back={t("back")} title={t("title")}>
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("intro.heading")}</h2>
        <p className="text-muted">{t("intro.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("step1.heading")}</h2>
        <p className="text-muted">{t("step1.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("step2.heading")}</h2>
        <p className="text-muted">{t("step2.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("step3.heading")}</h2>
        <p className="text-muted">{t("step3.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("tips.heading")}</h2>
        <ul className="list-disc list-inside text-muted space-y-2">
          <li>{t("tips.tip1")}</li>
          <li>{t("tips.tip2")}</li>
          <li>{t("tips.tip3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          {t("conclusion.heading")}
        </h2>
        <p className="text-muted">{t("conclusion.body")}</p>
      </section>
    </GuideLayout>
  );
}

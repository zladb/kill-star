import { useTranslations } from "next-intl";
import GuideLayout from "@/components/GuideLayout";

export default function NotionPasteTips() {
  const t = useTranslations("guideNotionPaste");

  return (
    <GuideLayout back={t("back")} title={t("title")}>
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("problem.heading")}</h2>
        <p className="text-muted">{t("problem.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("option1.heading")}</h2>
        <p className="text-muted">{t("option1.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("option2.heading")}</h2>
        <p className="text-muted">{t("option2.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("option3.heading")}</h2>
        <p className="text-muted">{t("option3.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("gdocs.heading")}</h2>
        <p className="text-muted">{t("gdocs.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          {t("bestPractice.heading")}
        </h2>
        <p className="text-muted">{t("bestPractice.body")}</p>
      </section>
    </GuideLayout>
  );
}

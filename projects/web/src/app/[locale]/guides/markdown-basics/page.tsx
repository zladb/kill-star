import { useTranslations } from "next-intl";
import GuideLayout from "@/components/GuideLayout";

export default function MarkdownBasics() {
  const t = useTranslations("guideMarkdownBasics");

  return (
    <GuideLayout back={t("back")} title={t("title")}>
      <section>
        <h2 className="text-xl font-semibold mb-2">{t("what.heading")}</h2>
        <p className="text-muted">{t("what.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("bold.heading")}</h2>
        <p className="text-muted mb-3">{t("bold.body")}</p>
        <div className="bg-accent rounded-lg p-4 font-mono text-sm">
          <p className="text-muted">**bold text** &rarr; <strong>bold text</strong></p>
          <p className="text-muted mt-1">*italic text* &rarr; <em>italic text</em></p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("headings.heading")}</h2>
        <p className="text-muted mb-3">{t("headings.body")}</p>
        <div className="bg-accent rounded-lg p-4 font-mono text-sm text-muted">
          <p># Heading 1</p>
          <p>## Heading 2</p>
          <p>### Heading 3</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("lists.heading")}</h2>
        <p className="text-muted mb-3">{t("lists.body")}</p>
        <div className="bg-accent rounded-lg p-4 font-mono text-sm text-muted">
          <p>- Item one</p>
          <p>- Item two</p>
          <p>1. First</p>
          <p>2. Second</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("problem.heading")}</h2>
        <p className="text-muted">{t("problem.body")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("fix.heading")}</h2>
        <p className="text-muted">{t("fix.body")}</p>
      </section>
    </GuideLayout>
  );
}

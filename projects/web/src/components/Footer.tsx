"use client";

import { useTranslations } from "next-intl";
import LocaleLink from "@/components/LocaleLink";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="text-center text-sm text-muted py-6 px-4 border-t border-surface-border">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
        <LocaleLink href="/about" className="hover:text-primary transition-colors">
          {t("about")}
        </LocaleLink>
        <LocaleLink href="/guides" className="hover:text-primary transition-colors">
          {t("guides")}
        </LocaleLink>
        <LocaleLink href="/faq" className="hover:text-primary transition-colors">
          {t("faq")}
        </LocaleLink>
        <LocaleLink href="/privacy" className="hover:text-primary transition-colors">
          {t("privacy")}
        </LocaleLink>
        <LocaleLink href="/terms" className="hover:text-primary transition-colors">
          {t("terms")}
        </LocaleLink>
      </nav>
      <p>{t("description")}</p>
    </footer>
  );
}

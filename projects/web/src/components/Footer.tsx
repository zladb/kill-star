"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="text-center text-sm text-muted py-6 px-4 border-t border-surface-border">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
        <Link href="/about" className="hover:text-primary transition-colors">
          {t("about")}
        </Link>
        <Link href="/guides" className="hover:text-primary transition-colors">
          {t("guides")}
        </Link>
        <Link href="/faq" className="hover:text-primary transition-colors">
          {t("faq")}
        </Link>
        <Link href="/privacy" className="hover:text-primary transition-colors">
          {t("privacy")}
        </Link>
        <Link href="/terms" className="hover:text-primary transition-colors">
          {t("terms")}
        </Link>
      </nav>
      <p>{t("description")}</p>
    </footer>
  );
}

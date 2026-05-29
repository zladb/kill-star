"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "ko" : "en";

  const segments = pathname.split("/");
  if (routing.locales.includes(segments[1] as "en" | "ko")) {
    segments[1] = nextLocale;
  } else {
    segments.splice(1, 0, nextLocale);
  }
  const href = segments.join("/") || "/";

  return (
    <a
      href={href}
      className="px-2 py-1 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground"
      aria-label="Switch language"
    >
      {locale === "en" ? "KO" : "EN"}
    </a>
  );
}

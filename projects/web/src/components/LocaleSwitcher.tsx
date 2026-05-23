"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as "en" | "ko")) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={() => switchLocale(locale === "en" ? "ko" : "en")}
      className="px-2 py-1 rounded-lg hover:bg-accent transition-colors text-sm font-medium text-foreground"
      aria-label="Switch language"
    >
      {locale === "en" ? "KO" : "EN"}
    </button>
  );
}

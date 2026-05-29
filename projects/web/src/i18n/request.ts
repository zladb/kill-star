import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "../../messages/en.json";
import ko from "../../messages/ko.json";

const messages: Record<string, typeof en> = { en, ko };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = routing.defaultLocale;

  try {
    const requested = await requestLocale;
    if (hasLocale(routing.locales, requested)) {
      locale = requested;
    }
  } catch {
    // Static export: requestLocale may not be available
  }

  return {
    locale,
    messages: messages[locale],
  };
});

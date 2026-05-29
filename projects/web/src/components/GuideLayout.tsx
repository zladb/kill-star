import LocaleLink from "@/components/LocaleLink";

export default function GuideLayout({
  back,
  title,
  children,
}: {
  back: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-2xl mx-auto w-full py-8">
      <LocaleLink
        href="/guides"
        className="text-primary hover:text-primary-hover text-sm mb-6 inline-block"
      >
        &larr; {back}
      </LocaleLink>

      <h1 className="text-3xl font-bold text-foreground mb-8">{title}</h1>

      <div className="space-y-6 text-foreground leading-relaxed">
        {children}
      </div>
    </article>
  );
}

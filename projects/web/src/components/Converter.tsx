"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

type OutputMode = "plain" | "bold";

function stripStars(text: string): string {
  return text.replace(/\*\*/g, "");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function applyBold(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function markdownToClipboardHtml(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let i = 0;

  const processInline = (s: string) => applyBold(escapeHtml(s));

  const flushList = (tag: string, items: string[]) => {
    result.push(`<${tag}>${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    const h3 = line.match(/^### (.+)/);
    if (h3) { result.push(`<h3>${processInline(h3[1])}</h3>`); i++; continue; }

    const h2 = line.match(/^## (.+)/);
    if (h2) { result.push(`<h2>${processInline(h2[1])}</h2>`); i++; continue; }

    const h1 = line.match(/^# (.+)/);
    if (h1) { result.push(`<h1>${processInline(h1[1])}</h1>`); i++; continue; }

    // Unordered list: collect consecutive items
    if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i])) {
        items.push(processInline(lines[i].replace(/^- /, "")));
        i++;
      }
      flushList("ul", items);
      continue;
    }

    // Ordered list: collect consecutive items
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(processInline(lines[i].replace(/^\d+\. /, "")));
        i++;
      }
      flushList("ol", items);
      continue;
    }

    // Blockquote
    const bq = line.match(/^> (.+)/);
    if (bq) { result.push(`<blockquote>${processInline(bq[1])}</blockquote>`); i++; continue; }

    // Empty line
    if (line.trim() === "") { i++; continue; }

    // Regular paragraph
    result.push(`<p>${processInline(line)}</p>`);
    i++;
  }

  return result.join("");
}

export default function Converter() {
  const t = useTranslations("converter");
  const [input, setInput] = useState("");
  const [plainText, setPlainText] = useState("");
  const [boldHtml, setBoldHtml] = useState("");
  const [mode, setMode] = useState<OutputMode>("plain");
  const [copied, setCopied] = useState(false);
  const boldRef = useRef<HTMLDivElement>(null);

  const converted = plainText || boldHtml;

  const convert = () => {
    setPlainText(stripStars(input));
    setBoldHtml(markdownToHtml(input));
    setCopied(false);
  };

  const clear = () => {
    setInput("");
    setPlainText("");
    setBoldHtml("");
    setCopied(false);
  };

  const copy = async () => {
    setCopied(false);

    if (mode === "bold") {
      const clipboardHtml = markdownToClipboardHtml(input);
      const text = stripStars(input);
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([clipboardHtml], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
      } catch {
        await navigator.clipboard.writeText(text);
      }
    } else {
      await navigator.clipboard.writeText(plainText);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Input */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("inputPlaceholder")}
          rows={8}
          className="w-full p-4 rounded-xl border border-surface-border bg-surface text-foreground placeholder:text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {t("convert")}
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 rounded-xl border border-surface-border text-foreground hover:bg-accent transition-colors"
        >
          {t("clear")}
        </button>
      </div>

      {/* Output */}
      {converted && (
        <div className="relative rounded-xl border border-surface-border bg-accent">
          {/* Toolbar: top-right corner */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <div className="flex gap-1 bg-background/60 rounded-lg p-1">
              <button
                onClick={() => { setMode("plain"); setCopied(false); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  mode === "plain"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t("tabPlain")}
              </button>
              <button
                onClick={() => { setMode("bold"); setCopied(false); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  mode === "bold"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t("tabBold")}
              </button>
            </div>
            <button
              onClick={copy}
              className="px-3 py-1 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              {copied ? t("copied") : t("copy")}
            </button>
          </div>

          {/* Content */}
          {mode === "plain" ? (
            <textarea
              value={plainText}
              readOnly
              rows={8}
              className="w-full px-4 pt-12 pb-4 bg-transparent text-foreground resize-y focus:outline-none font-mono text-sm border-none"
            />
          ) : (
            <div
              ref={boldRef}
              className="w-full min-h-[200px] px-4 pt-12 pb-4 text-foreground text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: boldHtml }}
            />
          )}
        </div>
      )}
    </div>
  );
}

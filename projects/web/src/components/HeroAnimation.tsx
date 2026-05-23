"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_STARS = 8;
const CELEBRATIONS = ["Nice!", "Great!", "Clean!", "Perfect!", "Awesome!"];
const IDLE_TIMEOUT = 8000;

type ClawdState = "idle" | "sweeping" | "happy" | "sleeping";

const GIF_MAP: Record<ClawdState, string> = {
  idle: "/clawd/clawd-idle.gif",
  sweeping: "/clawd/clawd-sweeping.gif",
  happy: "/clawd/clawd-happy.gif",
  sleeping: "/clawd/clawd-sleeping.gif",
};

export default function HeroAnimation() {
  const [stars, setStars] = useState(TOTAL_STARS);
  const [celebration, setCelebration] = useState<string | null>(null);
  const [pressing, setPressing] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [clawdState, setClawdState] = useState<ClawdState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const sweepTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setClawdState((prev) => (prev === "idle" ? "sleeping" : prev));
    }, IDLE_TIMEOUT);
  }, []);

  const wakeUp = useCallback(() => {
    setClawdState((prev) => {
      if (prev === "sleeping") return "idle";
      return prev;
    });
    resetIdleTimer();
  }, [resetIdleTimer]);

  const deleteStar = useCallback(() => {
    if (celebration || dropping) return;

    wakeUp();
    setPressing(true);
    setTimeout(() => setPressing(false), 120);

    setClawdState("sweeping");
    if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
    sweepTimerRef.current = setTimeout(() => {
      setClawdState((prev) => (prev === "sweeping" ? "idle" : prev));
    }, 600);

    setStars((prev) => {
      if (prev <= 1) {
        const msg =
          CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)];
        setCelebration(msg);
        setClawdState("happy");
        timeoutRef.current = setTimeout(() => {
          setCelebration(null);
          setDropping(true);
          setTimeout(() => {
            setDropping(false);
            setClawdState("idle");
            resetIdleTimer();
          }, 600);
        }, 1200);
        return 0;
      }
      return prev - 1;
    });
  }, [celebration, dropping, wakeUp, resetIdleTimer]);

  // Start idle timer on mount
  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === " " ||
        e.key === "Enter"
      ) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "TEXTAREA" && tag !== "INPUT") {
          e.preventDefault();
        }
        deleteStar();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deleteStar]);

  // Reset stars after drop animation
  useEffect(() => {
    if (dropping) {
      const t = setTimeout(() => setStars(TOTAL_STARS), 100);
      return () => clearTimeout(t);
    }
  }, [dropping]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
    };
  }, []);

  const currentGif = GIF_MAP[clawdState];

  return (
    <div className="flex flex-col items-center gap-5 select-none py-4">
      {/* Clawd character */}
      <div
        className="relative cursor-pointer"
        onClick={wakeUp}
        title={clawdState === "sleeping" ? "Click to wake up!" : "Clawd"}
      >
        <Image
          src={currentGif}
          alt="Clawd character"
          width={140}
          height={140}
          unoptimized
          className="transition-transform duration-200"
          style={{
            filter: clawdState === "sleeping" ? "brightness(0.85)" : "none",
          }}
        />
        {clawdState === "sleeping" && (
          <span
            className="absolute -top-1 -right-1 text-lg"
            style={{ animation: "zzz 2s ease-in-out infinite" }}
          >
            z
          </span>
        )}
      </div>

      {/* Star display area */}
      <div className="relative h-[40px] flex items-center justify-center">
        {celebration ? (
          <span
            className="text-2xl sm:text-3xl font-bold text-primary"
            style={{ animation: "celebPop 0.4s ease-out" }}
          >
            {celebration}
          </span>
        ) : (
          <div className="flex gap-1 justify-center">
            {Array.from({ length: TOTAL_STARS }).map((_, i) => {
              const visible = i < stars;
              return (
                <span
                  key={i}
                  className="text-xl sm:text-2xl font-mono font-black text-foreground inline-block"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? dropping
                          ? "translateY(-40px)"
                          : "translateY(0)"
                        : "translateY(10px) scale(0.5)",
                      transition: dropping
                        ? `transform 0.4s ease-out ${i * 0.06}s, opacity 0.3s ease-out ${i * 0.06}s`
                        : "opacity 0.2s ease-out, transform 0.2s ease-out",
                    }}
                  >
                    *
                  </span>
                );
              })}
            </div>
          )}
        </div>

      {/* Delete button */}
      <button
        onClick={deleteStar}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        disabled={celebration !== null || dropping}
        className="group relative disabled:opacity-40"
        aria-label="Delete a star"
      >
        <div
          className="px-5 py-2.5 rounded-lg border-2 border-surface-border bg-surface font-mono text-sm font-semibold text-foreground transition-all duration-100"
          style={{
            transform: pressing ? "translateY(2px)" : "translateY(0)",
            boxShadow: pressing
              ? "0 1px 0 0 var(--surface-border)"
              : "0 3px 0 0 var(--surface-border)",
          }}
        >
          <span className="flex items-center gap-2">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="text-muted">
              <path
                d="M6 1L1 7L6 13H17V1H6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 4.5L14 9.5M14 4.5L10 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Delete
          </span>
        </div>
      </button>

      {/* Hint */}
      <p className="text-xs text-muted opacity-60">
        click or press <kbd className="px-1.5 py-0.5 rounded border border-surface-border bg-surface text-[10px] font-mono">Backspace</kbd>
      </p>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes celebPop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes zzz {
          0%, 100% { opacity: 0.3; transform: translateY(0) scale(0.8); }
          50% { opacity: 1; transform: translateY(-6px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

"use client";
import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components/Modal";
import { tv } from "tailwind-variants";

const overlayStyles = tv({
  base:
    "absolute top-0 left-0 w-full h-(--page-height) isolate z-20 text-center " +
    "bg-glass-950/30 dark:bg-black/55 backdrop-blur-xl backdrop-saturate-[1.4]",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in",
    },
  },
});

const modalStyles = tv({
  base:
    "font-sans w-full max-w-[min(90vw,480px)] max-h-[calc(var(--visual-viewport-height)*.9)] text-left align-middle will-change-transform bg-clip-padding " +
    "text-glass-900 dark:text-glass-50 " +
    "rounded-[2rem] [corner-shape:squircle] " +
    "ring-1 ring-black/8 dark:ring-white/12 " +
    "shadow-[0_2px_8px_-2px_rgba(15,23,42,0.1),0_20px_44px_-12px_rgba(15,23,42,0.2),0_48px_96px_-28px_rgba(15,23,42,0.32),inset_0_1px_0_rgba(255,255,255,0.82),inset_1px_0_0_rgba(255,255,255,0.46),inset_-1px_0_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(15,23,42,0.07)] " +
    "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5),0_20px_44px_-12px_rgba(0,0,0,0.6),0_52px_100px_-30px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(255,255,255,0.24),inset_1px_0_0_rgba(255,255,255,0.1),inset_-1px_0_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.35)] " +
    "bg-linear-to-br from-white/94 via-white/88 to-white/82 backdrop-blur-2xl backdrop-saturate-150 " +
    "dark:bg-linear-to-br dark:from-glass-800/92 dark:via-glass-900/86 dark:to-glass-950/82 " +
    "forced-colors:bg-[Canvas] forced-colors:ring-1 forced-colors:ring-[ButtonBorder]",
  variants: {
    isEntering: {
      true: "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 ease-out duration-300",
    },
    isExiting: {
      true: "animate-out fade-out zoom-out-95 ease-in duration-200",
    },
  },
});

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <div className="sticky top-0 left-0 w-full h-(--visual-viewport-height) flex items-center justify-center box-border">
        <RACModal {...props} className={modalStyles} />
      </div>
    </ModalOverlay>
  );
}

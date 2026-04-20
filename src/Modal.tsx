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
    "bg-glass-150/30 dark:bg-black/55 backdrop-blur-sm backdrop-saturate-50",
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
    "font-sans w-full max-w-[min(90vw,480px)] max-h-[calc(var(--visual-viewport-height)*.9)] text-left align-middle will-change-transform " +
    "text-glass-900 dark:text-glass-50 " +
    "rounded-[1.75rem] [corner-shape:squircle] " +
    "border border-transparent [background-origin:border-box] [background-clip:padding-box,border-box] " +
    "[background-image:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,.55)),linear-gradient(135deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.4)_45%,rgba(255,255,255,.3)_55%,rgba(255,255,255,.8)_100%)] " +
    "backdrop-blur-[30px] backdrop-saturate-[1.8] " +
    "shadow-[inset_2px_2px_2px_rgba(255,255,255,.95),inset_-2px_-2px_3px_rgba(255,255,255,.55),inset_4px_4px_8px_rgba(255,255,255,.3),6px_8px_20px_rgba(0,0,0,.08),14px_20px_50px_rgba(0,0,0,.1),24px_36px_80px_rgba(0,0,0,.06)] " +
    "dark:[background-image:linear-gradient(rgba(45,45,50,.78),rgba(45,45,50,.78)),linear-gradient(135deg,rgba(255,255,255,.35)_0%,rgba(255,255,255,.1)_45%,rgba(255,255,255,.08)_55%,rgba(255,255,255,.28)_100%)] " +
    "dark:shadow-[inset_2px_2px_2px_rgba(255,255,255,.25),inset_-2px_-2px_3px_rgba(255,255,255,.12),inset_4px_4px_8px_rgba(255,255,255,.06),6px_8px_22px_rgba(0,0,0,.5),14px_20px_52px_rgba(0,0,0,.58),24px_36px_80px_rgba(0,0,0,.4)] " +
    "forced-colors:bg-[Canvas] forced-colors:border-[ButtonBorder]",
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

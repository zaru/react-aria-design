"use client";
import { XIcon } from "lucide-react";
import type { CSSProperties } from "react";
import {
  Button,
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components/Toast";
import { flushSync } from "react-dom";
import { composeTailwindRenderProps } from "./utils";
import "./Toast.css";

// Define the type for your toast content. This interface defines the properties of your toast content, affecting what you
// pass to the queue calls as arguments.
interface MyToastContent {
  title: string;
  description?: string;
}

// This is a global toast queue, to be imported and called where ever you want to queue a toast via queue.add().
export const queue = new ToastQueue<MyToastContent>({
  // Wrap state updates in a CSS view transition.
  wrapUpdate(fn) {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

export function MyToastRegion() {
  return (
    // The ToastRegion should be rendered at the root of your app.
    <ToastRegion
      queue={queue}
      className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 rounded-2xl outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-glow-500 focus-visible:outline-offset-2"
    >
      {({ toast }) => (
        <MyToast toast={toast}>
          <ToastContent className="flex flex-col flex-1 min-w-0">
            <Text slot="title" className="font-semibold text-white text-sm">
              {toast.content.title}
            </Text>
            {toast.content.description && (
              <Text slot="description" className="text-xs text-white">
                {toast.content.description}
              </Text>
            )}
          </ToastContent>
          <Button
            slot="close"
            aria-label="Close"
            className="flex flex-none appearance-none w-8 h-8 rounded-sm bg-transparent border-none text-white p-0 outline-none hover:bg-white/10 pressed:bg-white/15 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 items-center justify-center [-webkit-tap-highlight-color:transparent]"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </MyToast>
      )}
    </ToastRegion>
  );
}

export function MyToast(props: ToastProps<MyToastContent>) {
  return (
    <Toast
      {...props}
      style={{ viewTransitionName: props.toast.key } as CSSProperties}
      className={composeTailwindRenderProps(
        props.className,
        "flex items-center gap-4 px-4 py-3 rounded-2xl [corner-shape:squircle] outline-none forced-colors:outline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-glow-500 focus-visible:outline-offset-2 [view-transition-class:toast] font-sans w-[240px] " +
          "bg-linear-to-b from-glow-400/94 to-glow-500/96 ring-1 ring-white/22 " +
          "shadow-[0_10px_28px_-8px_rgba(13,148,136,0.45),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(0,0,0,0.12)] " +
          "backdrop-blur-md backdrop-saturate-125",
      )}
    />
  );
}

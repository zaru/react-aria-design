import type { Decorator } from "@storybook/react-vite";

/**
 * ColorPalette（`GlassmorphismPalette`）と同系統のグラデ背景。
 * 横幅いっぱい・縦だけコンパクト（単品コンポーネント向け）。
 * ストーリー側は `parameters.layout: "fullscreen"` と組み合わせること。
 */
export const glassBackdrop: Decorator = (Story) => (
  <div className="box-border flex min-h-[12rem] w-full max-w-none items-center justify-center bg-linear-to-br from-glass-100 via-frost-50 to-glow-50 py-7 sm:py-8 dark:from-glass-950 dark:via-glass-900 dark:to-frost-950">
    <Story />
  </div>
);

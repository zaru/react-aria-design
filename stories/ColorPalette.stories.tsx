const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const SCALES = [
  {
    id: "glass",
    title: "Glass",
    description: "主力のニュートラル。曇りガラスやテキスト階層のベースに。",
  },
  {
    id: "frost",
    title: "Frost",
    description: "シアン寄りのニュートラル。重ねるパネルや奥行きの差に。",
  },
  {
    id: "glow",
    title: "Glow",
    description: "ティール系アクセント。CTA・リンク・光彩の主役。",
  },
  {
    id: "aurora",
    title: "Aurora",
    description: "バイオレット系アクセント。背景グラデや装飾の差し色。",
  },
  {
    id: "mint",
    title: "Mint",
    description: "成功・安全・ポジティブな状態。彩度を抑えたミント。",
  },
  {
    id: "coral",
    title: "Coral",
    description: "注意・警告。オレンジ寄りで目立ちすぎないトーン。",
  },
  {
    id: "roseglass",
    title: "Roseglass",
    description: "危険・エラー。赤の刺さりを和らげたローズ。",
  },
] as const;

const SEMANTIC_SWATCHES = [
  {
    name: "glass-edge",
    label: "glass-edge",
    description: "ガラス面の上端ハイライトや淡い境界線に。",
  },
  {
    name: "glass-rim",
    label: "glass-rim",
    description: "強めのハイライト（縁の光彩）。",
  },
  {
    name: "glass-depth",
    label: "glass-depth",
    description: "シャドウ側・奥の輪郭のニュアンス。",
  },
  {
    name: "backdrop-mist",
    label: "backdrop-mist",
    description: "ぼかし背後の色味づけ（オーバーレイの下層イメージ）。",
  },
] as const;

function isLightStep(step: (typeof SHADES)[number]) {
  return step < 500;
}

function SwatchRow({
  title,
  description,
  scaleId,
}: {
  title: string;
  description: string;
  scaleId: (typeof SCALES)[number]["id"];
}) {
  return (
    <section className="mb-14">
      <header className="mb-4">
        <h2 className="font-semibold text-lg text-glass-950 tracking-tight dark:text-glass-50">
          {title}
        </h2>
        <p className="max-w-3xl text-glass-600 text-sm dark:text-glass-400">
          {description}
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        {SHADES.map((step) => (
          <div
            key={step}
            className="flex flex-col overflow-hidden rounded-xl border border-white/40 shadow-sm dark:border-white/10"
          >
            <div
              className="h-16 w-[5.25rem] sm:w-[5.75rem]"
              style={{
                backgroundColor: `var(--color-${scaleId}-${step})`,
              }}
            />
            <div
              className={`flex flex-col gap-0.5 px-2 py-2 font-mono text-[10px] leading-tight ${
                isLightStep(step)
                  ? "bg-white/90 text-glass-900 dark:bg-glass-900/90 dark:text-glass-100"
                  : "bg-glass-900 text-glass-50 dark:bg-glass-950 dark:text-glass-100"
              }`}
            >
              <span>{step}</span>
              <span className="opacity-80">{`${scaleId}-${step}`}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default {
  title: "Design System / Color Palette",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
};

export const GlassmorphismPalette = () => (
  <div className="min-h-screen bg-linear-to-br from-glass-100 via-frost-50 to-glow-50 dark:from-glass-950 dark:via-glass-900 dark:to-frost-950">
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
      <header className="mb-12">
        <p className="mb-2 font-medium text-glow-700 text-sm uppercase tracking-widest dark:text-glow-400">
          Glassmorphism
        </p>
        <h1 className="font-semibold text-3xl text-glass-950 tracking-tight sm:text-4xl dark:text-glass-50">
          カラーパレット
        </h1>
        <p className="mt-3 max-w-2xl text-glass-700 text-base leading-relaxed dark:text-glass-300">
          Tailwind の{" "}
          <code className="rounded-md bg-white/70 px-1.5 py-0.5 font-mono text-sm dark:bg-glass-800 dark:text-glass-100">
            bg-* / text-* / border-*
          </code>{" "}
          からそのまま利用できる OKLCH ベースのトークンです。スウォッチは CSS
          変数参照で表示しています。
        </p>
      </header>

      <div className="mb-14 rounded-3xl border border-white/50 bg-white/35 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-glass-900/40">
        <p className="mb-4 font-medium text-glass-900 text-sm dark:text-glass-100">
          ガラスパネルのイメージ
        </p>
        <div className="rounded-2xl border border-white/60 bg-linear-to-br from-white/55 via-white/25 to-glow-100/40 p-6 shadow-inner backdrop-blur-md dark:border-white/15 dark:from-glass-800/50 dark:via-glass-900/35 dark:to-aurora-950/35">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-glass-950 dark:text-glass-50">
                frost / glow / aurora を重ねたグラデーション
              </p>
              <p className="mt-1 text-glass-600 text-sm dark:text-glass-400">
                実際のコンポーネントでは{" "}
                <code className="font-mono text-xs">backdrop-blur</code> と
                半透明の <code className="font-mono text-xs">bg-white/…</code>{" "}
                を組み合わせると、このパレットが映えます。
              </p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-glow-500/90 px-4 py-2 font-medium text-sm text-white shadow-lg">
                Primary
              </span>
              <span className="rounded-full border border-glass-edge bg-white/40 px-4 py-2 font-medium text-glass-800 text-sm backdrop-blur-sm dark:border-white/20 dark:bg-glass-800/50 dark:text-glass-100">
                Secondary
              </span>
            </div>
          </div>
        </div>
      </div>

      {SCALES.map((s) => (
        <SwatchRow
          description={s.description}
          key={s.id}
          scaleId={s.id}
          title={s.title}
        />
      ))}

      <section className="mb-6">
        <h2 className="mb-4 font-semibold text-lg text-glass-950 tracking-tight dark:text-glass-50">
          セマンティック（単色）
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SEMANTIC_SWATCHES.map((sw) => (
            <article
              className="flex gap-4 rounded-2xl border border-white/50 bg-white/30 p-4 backdrop-blur-md dark:border-white/10 dark:bg-glass-900/35"
              key={sw.name}
            >
              <div
                className="h-20 w-20 shrink-0 rounded-xl border border-white/40 shadow-inner dark:border-white/10"
                style={{ backgroundColor: `var(--color-${sw.name})` }}
              />
              <div>
                <p className="font-mono text-glass-900 text-sm dark:text-glass-100">
                  {sw.label}
                </p>
                <p className="mt-1 text-glass-600 text-sm dark:text-glass-400">
                  {sw.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  </div>
);

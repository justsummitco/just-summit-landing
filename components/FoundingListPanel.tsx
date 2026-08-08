import FoundingListForm from "@/components/FoundingListForm";
import type { FoundingListSource } from "@/lib/founding-list";

type FoundingListPanelProps = {
  source: FoundingListSource;
  tone?: "dark" | "light";
  title?: string;
  description?: string;
};

export default function FoundingListPanel({
  source,
  tone = "light",
  title = "See the build before the launch.",
  description = "Join the Founding List for honest prototype updates, early testing opportunities and first access to preorder news.",
}: FoundingListPanelProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`grid gap-8 rounded-xl border p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center ${
        isDark
          ? "border-white/12 bg-white/[0.05]"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div>
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-teal-300" : "text-teal-700"}`}>
          Founding List
        </p>
        <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${isDark ? "text-white" : "text-gray-950"}`}>
          {title}
        </h2>
        <p className={`mt-4 leading-7 ${isDark ? "text-white/70" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
      <FoundingListForm source={source} tone={tone} />
    </div>
  );
}

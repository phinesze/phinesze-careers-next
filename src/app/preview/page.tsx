import CareerSection from "@/components/organisms/CareerSection";
import LayoutButtons from "@/components/layoutButtons";

// プレビュー用ページ
export default function PreviewPage() {
  return (
    <div className=" h-full w-full bg-white p-[5mm]">
      <CareerSection />
      <LayoutButtons />
    </div>
  );
}

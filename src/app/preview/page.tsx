import CareerSection from "@/components/organisms/CareerSection";
import LayoutButtons from "@/components/layoutButtons";

// プレビュー用ページ
export default function PreviewPage() {
  return (
    <div className=" w-full h-full bg-white p-[5mm]">
      <CareerSection />
      <LayoutButtons />
    </div>
  );
}

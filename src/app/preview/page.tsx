import CareerSection from "@/components/organisms/CareerSection";
import LayoutButtons from "@/components/layoutButtons";

// プレビュー用ページ
export default function PreviewPage() {
  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 w-full">
        <LayoutButtons />
      </div>
      <div className="mt-16 p-[5mm]">
        <CareerSection />
      </div>
    </div>
  );
}

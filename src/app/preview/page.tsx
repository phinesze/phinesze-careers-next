import CareerSection from "@/components/organisms/CareerSection";
import PreviewMenuHeader from "@/components/PreviewMenuHeader";

// プレビュー用ページ
export default function PreviewPage() {
  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 w-full">
        <PreviewMenuHeader />
      </div>
      <div className="mt-16">
        <CareerSection />
      </div>
    </div>
  );
}

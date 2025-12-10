import HistoryFilterSection from "@/components/history/HistoryFilterSection";
import HistoryTable from "@/components/history/HistoryTable";

export default function History() {
  return (
    <div className="flex flex-col gap-4 pb-[116px]">
      <HistoryFilterSection />
      <HistoryTable />
    </div>
  );
}

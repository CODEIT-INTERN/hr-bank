import { TableTestPage } from "@/components/dashboard/TableTestPage";
import TestPage from "@/components/dashboard/TestPage";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard page</h1>
      <div className="p-4">
        <TableTestPage />
      </div>

      {/* <TestPage /> */}
    </div>
  );
}

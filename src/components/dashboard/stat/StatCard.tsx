import type { FC } from "react";

interface StatCardProps {
  icon: FC<{ className?: string }>;
  label: string;
  value: string;
  isLoading: boolean;
}

export function StatCard({ icon: Icon, label, value, isLoading = true }: StatCardProps) {
  return (
    <div className="flex gap-4 bg-white border border-secondary shadow-xs rounded-xl p-5 min-w-0">
      <Icon className="shrink-0 size-10 rounded-md border border-secondary p-2.5 shadow-xs" />
      <div className="min-w-0 flex-1">
        <div className="font-medium leading-6 text-md text-tertiary">{label}</div>
        <p className="font-semibold text-gray-900 text-display-sm truncate">{isLoading ? "-" : value}</p>
      </div>
    </div>
  );
}

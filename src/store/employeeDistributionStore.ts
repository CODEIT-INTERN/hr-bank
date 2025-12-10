import { create } from "zustand";
import { getEmployeeDistribution } from "@/api/employee/employeeApi";
import type { EmployeeDistributionDto, EmployeeDistributionQuery } from "@/model/employee";

interface EmployeeDistributionStore {
  items: EmployeeDistributionDto[];
  filters: EmployeeDistributionQuery;
  isLoading: boolean;
  errorMessage: string | null;
  setFilters: (filters: Partial<EmployeeDistributionQuery>) => void;
  resetFilters: () => void;
  getDistribution: () => Promise<void>;
}

const initialFilters: EmployeeDistributionQuery = {
  groupBy: "department", // 기본: 부서별
  status: "ACTIVE", // 기본: 재직중
};

export const useEmployeeDistributionStore = create<EmployeeDistributionStore>((set, get) => ({
  items: [],
  filters: initialFilters,
  isLoading: false,
  errorMessage: null,

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
    }),

  getDistribution: async () => {
    const { filters } = get();
    set({ isLoading: true, errorMessage: null });

    try {
      const data = await getEmployeeDistribution(filters);
      set({ items: data, isLoading: false });
    } catch (error) {
      console.error(error);
      set({
        errorMessage: "직원 분포를 불러오지 못했어요.",
        isLoading: false,
      });
    }
  },
}));

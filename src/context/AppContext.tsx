import { createContext, useState } from "react";
import { Operation } from "../hooks/useOperations";
import { Targets } from "../hooks/useSuspects";
import { ChartFilters } from "../interface/dashboard/chartInterface";
import { FilterType } from "../enum/ViewSelectionFilterEnum";
import { WorkSheet } from "../hooks/useWorksheets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  cpf: string;
  setCpf: (cpf: string) => void;

  operations: Operation[];
  setOperations: (operations: Operation[]) => void;
  targets: Targets[];
  setTargets: (targets: Targets[]) => void;
  worksheets: WorkSheet[];
  setWorksheets: (worksheets: WorkSheet[]) => void;

  dashboardFilters: ChartFilters;
  setDashboardFilters: (chartFilters: ChartFilters) => void;
  webChartFilters: ChartFilters;
  setWebChartFilters: (chartFilters: ChartFilters) => void;
}

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cpf, setCpf] = useState<string>("");
  const [operations, setOperations] = useState<Operation[]>([]);
  const [targets, setTargets] = useState<Targets[]>([]);
  const [worksheets, setWorksheets] = useState<WorkSheet[]>([]);
  const [dashboardFilters, setDashboardFilters] = useState<ChartFilters>({
    filterType: FilterType.UNION,
    chart: FilterType.ALL,
    type: "Texto",
    group: "Ambos",
    options: [] as string[],
    symmetry: "Ambos",
  });
  const [webChartFilters, setWebChartFilters] = useState<ChartFilters>({
    type: "Texto",
    group: "Ambos",
    options: [] as string[],
  });

  return (
    <AppContext.Provider
      value={{
        cpf,
        setCpf,
        operations,
        setOperations,
        targets,
        setTargets,
        worksheets,
        setWorksheets,
        dashboardFilters,
        setDashboardFilters,
        webChartFilters,
        setWebChartFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

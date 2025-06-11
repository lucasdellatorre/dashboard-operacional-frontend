import { createContext, useEffect, useState } from "react";
import { Operation } from "../hooks/useOperations";
import { Suspect, Numbers } from "../hooks/useSuspects";
import { WorkSheet } from "../hooks/useWorksheets";
import {
  ChartFilters,
  MessageFilterGroup,
  MessageFilterType,
} from "../interface/dashboard/chartInterface";
import { FilterType } from "../enum/ViewSelectionFilterEnum";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  cpf: string;
  setCpf: (cpf: string) => void;

  operations: Operation[];
  setOperations: (operations: Operation[]) => void;

  suspects: Suspect[];
  setSuspects: (suspects: Suspect[]) => void;

  numbers: Numbers[]; // targets
  setNumbers: (numbers: Numbers[]) => void;

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
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [numbers, setNumbers] = useState<Numbers[]>([]);
  const [worksheets, setWorksheets] = useState<WorkSheet[]>([]);

  const [dashboardFilters, setDashboardFilters] = useState<ChartFilters>({
    filterType: FilterType.UNION,
    chart: FilterType.ALL,
    type: MessageFilterType.Texto,
    group: MessageFilterGroup.Ambos,
    options: [] as string[],
    dateInitial: "",
    dateFinal: "",
    timeInitial: "",
    timeFinal: "",
  });

  const [webChartFilters, setWebChartFilters] = useState<ChartFilters>({
    type: MessageFilterType.Todos,
    group: MessageFilterGroup.Ambos,
    options: [] as string[],
    dateInitial: "",
    dateFinal: "",
    timeInitial: "",
    timeFinal: "",
  });

  useEffect(() => {
    setCpf(localStorage.getItem("cpf") ?? "")
  }, []);

  return (
    <AppContext.Provider
      value={{
        cpf,
        setCpf,
        operations,
        setOperations,
        suspects,
        setSuspects,
        numbers,
        setNumbers,
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

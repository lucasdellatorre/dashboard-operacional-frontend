import { FilterType } from "../../enum/ViewSelectionFilterEnum";

export interface ChartInformation {
  name: string;
}

export interface ChartFilters {
  filterType?: FilterType;
  chart?: FilterType;
  type: string;
  group: string;
  options: string[];
  symmetry?: string;
}

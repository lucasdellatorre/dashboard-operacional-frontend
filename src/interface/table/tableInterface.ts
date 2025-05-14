export interface IconAction {
  icon: React.ReactNode;
  onClick: (id: number, row: GenericData) => void;
}

export interface GenericData {
  id: number;
  [key: string]: string | number | string[];
}

export interface HeadCell<T extends GenericData> {
  id: keyof T;
  label: string;
  iconAction?: IconAction;
  sortable?: boolean;
}

export type Order = "asc" | "desc";

export interface GenericTableProps<T extends GenericData> {
  rows: T[];
  noDataMessage?: string;
  headCells: readonly HeadCell<T>[];
  title: string;
  singleSelect: boolean;
  defaultOrderBy: keyof T;
  initialSelected?: readonly number[];
  onSelectionChange?: (
    selectedIds: readonly number[],
    selectedItems: T[]
  ) => void;
  onDelete?: (selectedIds: readonly number[], selectedItems: T[]) => void;
}

export interface EnhancedTableHeadProps<T extends GenericData> {
  headCells: readonly HeadCell<T>[];
  numSelected: number;
  singleSelect: boolean;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

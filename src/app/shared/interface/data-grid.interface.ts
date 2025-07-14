export interface DataGridButtons {
  id: string | number;
  label: string;
  type: string;
  action: (row: any) => void;
  icon?: string;
}

export interface ColumnDef {
  id: string | number;
  field: string;
  header: string;
}

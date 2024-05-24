
export interface ITableHeader {
  title: string;
  result: number;
  searchPlaceholder: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columnMode?: boolean;
  limpar?: boolean;
}

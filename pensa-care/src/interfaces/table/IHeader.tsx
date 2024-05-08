import { IClient } from './IClient';
import { IService } from './IService';

export interface ITableHeader {
  title: string;
  result: number;
  searchPlaceholder: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columnMode?: boolean;
  data: IClient[] | IService[];
  setData: React.Dispatch<React.SetStateAction<IClient[] | IService[]>>;
}

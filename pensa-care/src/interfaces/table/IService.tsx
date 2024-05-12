export interface IItem {
  code: string;
  serial_number: string;
  model: string;
  description: string;
  item?: string;
  date: string;
}

export interface IService extends IItem {
  cnpj: string;
  name: string;
  city: string;
  state: string;
  items?: IItem[];
  order_number: string;
  description: string;
  technician?: string;
  date: string;
  type: string;
  }
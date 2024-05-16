export interface IItem {
  code: string;
  serial_number: string;
  model: string;
  description: string;
  last_service?: string;
  next_service?: string;
  icon: string;
}

export interface IEquipment extends IItem {
  cnpj: string;
  name: string;
  city: string;
  state: string;
  date: string;
  items: IItem[];
  order_number: string;
  technician?: string;
  type?: string;
}
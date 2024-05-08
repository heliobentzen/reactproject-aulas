export interface IPark {
  name: string;
  icon: string;
  serialNumber: string | number;
}

export interface IService extends IPark {
  description: string;
  item_code: string;
  item_serial_number: string;
  item_description: string;
  client_cnpj: string;
  order_number: string;
  date: string;
  modality: string;
  parks?: IPark[];
  preventiveDate?: string;
  }


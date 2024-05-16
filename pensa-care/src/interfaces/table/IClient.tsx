export interface IPreventiveDate {
  preventiveDate?: string;
  preventiveHour?: string;
  done?: boolean
}

export interface IStatus {
  status?: string;
  isFulfilled?: boolean;
  clientName?: string;
}

export interface IPark {
  name: string;
  icon: string;
  serialNumber: string | number;
}

export interface IEquipments {
  code: string;
  serial_number: string;
  model: string;
  description: string;
  last_service: Date;
  next_service: Date;
  icon: string;
}

export interface IClient extends IEquipments, IPreventiveDate, IStatus{
  name: string;
  code: string;
  cnpj: string;
  store?: string;
  city: string;
  uf: string;
  item?: string;
  modality?: string;
  parks?: IPark[];
  equipments?: IEquipments[];
}
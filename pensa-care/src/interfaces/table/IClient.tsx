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

export interface IClient extends IPreventiveDate, IStatus {
  name: string;
  code: string;
  cnpj: string;
  city: string;
  uf: string;
  item?: string;
  modality?: string;
  parks?: IPark[];
  }
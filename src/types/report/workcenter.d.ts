export interface Max {
  PDO_ITEM_ID?: number;
}

export interface ITotalByWorkcenter {
  [key: string]: {
    total: number;
    qty: string;
  };
}

export interface IWorkcenterReport {
  GREIGE_IN_DATE?: Date;
  PDO_DYE?: string;
  PDO_DETAIL?: string;
  PDO_SAP?: number;
  CUST?: string;
  SO_SAP?: number;
  SO_REF?: string;
  ITEM_NAME?: string;
  ITEM_COLOR?: string;
  TANGGAL_MASUK_WORKCENTER?: Date;
  TIME_PROCESS?: number;
  CONTAINER?: string;
  MACHINE?: null;
  WORKCENTER?: string;
  TOTAL_ROLL?: number;
  TOTAL_QTY?: number;
  LOT?: string;
}

export interface IWorkcenterResponse {
  total?: number;
  totalByWorkcenter?: ITotalByWorkcenter;
}

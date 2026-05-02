export type FactoringStatus =
  | "aprobado"
  | "desembolsado"
  | "en-cobro"
  | "cobrado"
  | "vencido"
  | "rechazada"
  | "rechazado"
  | "pendiente"
  | "aprobada"
  | "en_mora"
  | "vigente"
  | "cobrada";

export type FactoringUrgency = "vencido" | "critico" | "proximo" | "vigilar";
export type FactoringPriority = "alta" | "media" | "baja";
export type FactoringRiskLevel = "bajo" | "medio" | "alto";

export interface FactoringRecord {
  id: string;
  folio?: string;
  cedente: string;
  deudor: string;
  sector?: string;
  fechaDesembolso?: string;
  fechaInicio?: string;
  fechaVencimiento: string;
  nominal?: number;
  valorNominal?: number;
  desembolso?: number;
  valorDesembolsado?: number;
  tasa?: number;
  tasaDescuento?: number;
  plazo?: number;
  descuento?: number;
  status: FactoringStatus;
  diasMora?: number;
  diasRestantes?: number;
  _cobradoPct?: number;
  cobradoPct?: number;
}

export interface FactoringAlert {
  id: string;
  operacionId: string;
  cedente: string;
  deudor: string;
  valorNominal: number;
  cobradoPct: number;
  fechaVencimiento: string;
  fechaInicio: string;
  diasRestantes: number;
  urgency: FactoringUrgency;
  recordatoriosEnviados: number;
  ultimoContacto: string | null;
  analista: string;
  muted: boolean;
}

export interface FactoringQueueRecord {
  id: string;
  cedente: string;
  nitCedente: string;
  deudor: string;
  valorNominal: number;
  tasaSugerida: number;
  plazo: number;
  fechaRadicacion: string;
  diasEnCola: number;
  priority: FactoringPriority;
  riesgo: FactoringRiskLevel;
  scoreCredito: number;
  analista: string;
}

export interface MonthlyFactoringData {
  mes: string;
  desembolsos: number;
  cobros: number;
  operaciones: number;
}

import { FactoringRecord, MonthlyFactoringData } from "../types/factoring.types";

export const MOCK_RECORDS: FactoringRecord[] = [
  { id: "1",  folio: "FCT-2024-001", cedente: "Textiles del Norte S.A.S", deudor: "Almacenes Éxito",        sector: "Retail",        fechaDesembolso: "2024-01-10", fechaVencimiento: "2024-04-10", nominal: 48000000,  desembolso: 45120000,  tasa: 2.0, plazo: 90,  descuento: 2880000,  status: "cobrada" },
  { id: "2",  folio: "FCT-2024-002", cedente: "Industrias Metálicas JR",  deudor: "Grupo Argos",           sector: "Construcción",  fechaDesembolso: "2024-01-18", fechaVencimiento: "2024-03-18", nominal: 95000000,  desembolso: 89775000,  tasa: 1.8, plazo: 60,  descuento: 5225000,  status: "cobrada" },
  { id: "3",  folio: "FCT-2024-003", cedente: "Agro Pacífico Ltda.",       deudor: "Carrefour Colombia",   sector: "Agro",          fechaDesembolso: "2024-02-05", fechaVencimiento: "2024-05-05", nominal: 32000000,  desembolso: 30240000,  tasa: 1.9, plazo: 90,  descuento: 1760000,  status: "cobrada" },
  { id: "4",  folio: "FCT-2024-004", cedente: "Tech Solutions S.A.S",      deudor: "Bancolombia",          sector: "Tecnología",    fechaDesembolso: "2024-02-20", fechaVencimiento: "2024-05-20", nominal: 120000000, desembolso: 114720000, tasa: 1.5, plazo: 90,  descuento: 5280000,  status: "cobrada" },
  { id: "5",  folio: "FCT-2024-005", cedente: "Constructora Andina",       deudor: "Cemex Colombia",       sector: "Construcción",  fechaDesembolso: "2024-03-01", fechaVencimiento: "2024-05-30", nominal: 75000000,  desembolso: 70875000,  tasa: 1.8, plazo: 90,  descuento: 4125000,  status: "cobrada" },
  { id: "6",  folio: "FCT-2024-006", cedente: "Textiles del Norte S.A.S", deudor: "Falabella Colombia",    sector: "Retail",        fechaDesembolso: "2024-03-15", fechaVencimiento: "2024-06-13", nominal: 56000000,  desembolso: 52640000,  tasa: 2.1, plazo: 90,  descuento: 3360000,  status: "cobrada" },
  { id: "7",  folio: "FCT-2024-007", cedente: "Logística Rápida S.A.",     deudor: "DHL Colombia",         sector: "Logística",     fechaDesembolso: "2024-04-02", fechaVencimiento: "2024-07-01", nominal: 41000000,  desembolso: 38745000,  tasa: 1.8, plazo: 90,  descuento: 2255000,  status: "cobrada" },
  { id: "8",  folio: "FCT-2024-008", cedente: "Pharma Norte S.A.S",        deudor: "Audifarma",            sector: "Salud",         fechaDesembolso: "2024-04-10", fechaVencimiento: "2024-07-09", nominal: 88000000,  desembolso: 84480000,  tasa: 1.6, plazo: 90,  descuento: 3520000,  status: "cobrada" },
  { id: "9",  folio: "FCT-2024-009", cedente: "Industrias Metálicas JR",  deudor: "Pacific Rubiales",     sector: "Energía",       fechaDesembolso: "2024-05-05", fechaVencimiento: "2024-08-03", nominal: 145000000, desembolso: 138850000, tasa: 1.7, plazo: 90,  descuento: 6150000,  status: "cobrada" },
  { id: "10", folio: "FCT-2024-010", cedente: "Agro Pacífico Ltda.",       deudor: "Corabastos",           sector: "Agro",          fechaDesembolso: "2024-05-20", fechaVencimiento: "2024-08-18", nominal: 29000000,  desembolso: 27695000,  tasa: 1.5, plazo: 90,  descuento: 1305000,  status: "cobrada" },
  { id: "11", folio: "FCT-2024-011", cedente: "Constructora Andina",       deudor: "Ecopetrol",            sector: "Energía",       fechaDesembolso: "2024-06-03", fechaVencimiento: "2024-09-01", nominal: 210000000, desembolso: 203175000, tasa: 1.1, plazo: 90,  descuento: 6825000,  status: "vigente" },
  { id: "12", folio: "FCT-2024-012", cedente: "Tech Solutions S.A.S",      deudor: "Claro Colombia",       sector: "Tecnología",    fechaDesembolso: "2024-06-12", fechaVencimiento: "2024-09-10", nominal: 67000000,  desembolso: 64320000,  tasa: 1.6, plazo: 90,  descuento: 2680000,  status: "vigente" },
  { id: "13", folio: "FCT-2024-013", cedente: "Logística Rápida S.A.",     deudor: "Avianca",              sector: "Transporte",    fechaDesembolso: "2024-06-20", fechaVencimiento: "2024-09-18", nominal: 38000000,  desembolso: 36480000,  tasa: 1.6, plazo: 90,  descuento: 1520000,  status: "vigente" },
  { id: "14", folio: "FCT-2024-014", cedente: "Pharma Norte S.A.S",        deudor: "Sanitas",              sector: "Salud",         fechaDesembolso: "2024-07-01", fechaVencimiento: "2024-09-29", nominal: 54000000,  desembolso: 52380000,  tasa: 1.0, plazo: 90,  descuento: 1620000,  status: "vigente" },
  { id: "15", folio: "FCT-2024-015", cedente: "Textiles del Norte S.A.S", deudor: "Homecenter",            sector: "Retail",        fechaDesembolso: "2024-05-15", fechaVencimiento: "2024-07-14", nominal: 42000000,  desembolso: 39690000,  tasa: 1.8, plazo: 60,  descuento: 2310000,  status: "vencido", diasMora: 8  },
  { id: "16", folio: "FCT-2024-016", cedente: "Industrias Metálicas JR",  deudor: "Acerías Paz del Río",  sector: "Construcción",  fechaDesembolso: "2024-04-20", fechaVencimiento: "2024-06-19", nominal: 78000000,  desembolso: 74100000,  tasa: 1.5, plazo: 60,  descuento: 3900000,  status: "en_mora", diasMora: 42 },
  { id: "17", folio: "FCT-2024-017", cedente: "Agro Pacífico Ltda.",       deudor: "Supertiendas Olímpica",sector: "Retail",        fechaDesembolso: "2024-03-10", fechaVencimiento: "2024-05-09", nominal: 31000000,  desembolso: 29760000,  tasa: 1.6, plazo: 60,  descuento: 1240000,  status: "en_mora", diasMora: 78 },
];

export const MONTHLY_DATA: MonthlyFactoringData[] = [
  { mes: "Ene", desembolsos: 143120000, cobros: 0,         operaciones: 2 },
  { mes: "Feb", desembolsos: 144960000, cobros: 143120000, operaciones: 2 },
  { mes: "Mar", desembolsos: 91385000,  cobros: 144960000, operaciones: 2 },
  { mes: "Abr", desembolsos: 123225000, cobros: 91385000,  operaciones: 2 },
  { mes: "May", desembolsos: 166545000, cobros: 123225000, operaciones: 2 },
  { mes: "Jun", desembolsos: 304175000, cobros: 166545000, operaciones: 3 },
  { mes: "Jul", desembolsos: 52380000,  cobros: 304175000, operaciones: 1 },
];

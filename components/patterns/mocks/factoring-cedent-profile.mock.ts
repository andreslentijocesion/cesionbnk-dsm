export const cedent = {
  id: "CED-001",
  nombre: "Servicios TI Colombia S.A.S.",
  nit: "900.123.456-1",
  razonSocial: "Servicios de Tecnología e Innovación Colombia S.A.S.",
  sector: "Tecnología de la Información",
  ciudad: "Bogotá D.C.",
  direccion: "Cra 7 # 72-41, Piso 8, Torre Norte",
  telefono: "+57 601 345 6789",
  email: "tesoreria@serviciosticolombia.com",
  contacto: "Laura Martínez — Directora Financiera",
  fechaVinculacion: "2022-03-15",
  analista: "C. Vargas",
  scoreCredito: 87,
  limiteCredito: 800_000_000,
  creditoUsado: 65,
  status: "activo" as const,
  operacionesActivas: 12,
  operacionesTotales: 34,
  valorPortafolio: 520_000_000,
  tasaCobro: 96.4,
  facturasVencidas: 0,
  tasaDescuentoPromedio: 1.75,
};

export const historialMensual = [
  { mes: "Sep", desembolsado: 38, cobrado: 35 },
  { mes: "Oct", desembolsado: 45, cobrado: 42 },
  { mes: "Nov", desembolsado: 52, cobrado: 48 },
  { mes: "Dic", desembolsado: 61, cobrado: 58 },
  { mes: "Ene", desembolsado: 74, cobrado: 70 },
  { mes: "Feb", desembolsado: 88, cobrado: 83 },
  { mes: "Mar", desembolsado: 95, cobrado: 87 },
];

export const scoreHistory = [
  { mes: "Sep", score: 79 },
  { mes: "Oct", score: 81 },
  { mes: "Nov", score: 82 },
  { mes: "Dic", score: 84 },
  { mes: "Ene", score: 83 },
  { mes: "Feb", score: 86 },
  { mes: "Mar", score: 87 },
];

export const operaciones = [
  { id: "FCT-2025-001", deudor: "Banco de Bogotá S.A.",  valor: 185_000_000, tasa: 1.8, fechaInicio: "2025-01-15", fechaVenc: "2025-03-15", cobrado: 82,  status: "en-cobro" as const },
  { id: "FCT-2025-005", deudor: "Ecopetrol S.A.",         valor: 520_000_000, tasa: 1.6, fechaInicio: "2025-02-01", fechaVenc: "2025-05-01", cobrado: 20,  status: "desembolsado" as const },
  { id: "FCT-2024-088", deudor: "Avianca S.A.",            valor: 210_000_000, tasa: 1.9, fechaInicio: "2024-11-01", fechaVenc: "2025-01-30", cobrado: 100, status: "cobrado" as const },
  { id: "FCT-2024-071", deudor: "Claro Colombia S.A.",     valor: 95_000_000,  tasa: 2.1, fechaInicio: "2024-09-15", fechaVenc: "2024-12-15", cobrado: 100, status: "cobrado" as const },
  { id: "FCT-2024-055", deudor: "Grupo Nutresa S.A.",      valor: 145_000_000, tasa: 1.7, fechaInicio: "2024-07-01", fechaVenc: "2024-10-01", cobrado: 100, status: "cobrado" as const },
];

export const documentos = [
  { nombre: "NIT actualizado",               tipo: "PDF", fecha: "2025-01-10", vigente: true  },
  { nombre: "Cámara de Comercio",            tipo: "PDF", fecha: "2025-01-10", vigente: true  },
  { nombre: "Estados financieros 2024",      tipo: "PDF", fecha: "2025-02-28", vigente: true  },
  { nombre: "Declaración de renta 2023",     tipo: "PDF", fecha: "2024-09-15", vigente: true  },
  { nombre: "Certificado bancario",          tipo: "PDF", fecha: "2025-01-14", vigente: true  },
  { nombre: "Pagaré marco vigente",          tipo: "PDF", fecha: "2024-06-01", vigente: false },
  { nombre: "Carta de instrucción irrevocable", tipo: "PDF", fecha: "2024-06-01", vigente: false },
];

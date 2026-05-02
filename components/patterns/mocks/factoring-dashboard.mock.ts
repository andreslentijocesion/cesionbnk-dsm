export const portfolioEvolution = [
  { mes: "Sep", desembolsado: 1_820, cobrado: 1_650, vencido: 120 },
  { mes: "Oct", desembolsado: 2_100, cobrado: 1_900, vencido: 95  },
  { mes: "Nov", desembolsado: 1_950, cobrado: 1_820, vencido: 140 },
  { mes: "Dic", desembolsado: 2_380, cobrado: 2_100, vencido: 80  },
  { mes: "Ene", desembolsado: 2_750, cobrado: 2_400, vencido: 110 },
  { mes: "Feb", desembolsado: 3_120, cobrado: 2_750, vencido: 90  },
  { mes: "Mar", desembolsado: 3_480, cobrado: 2_980, vencido: 78  },
];

export const operacionesPorEstado = [
  { name: "Cobrado",      value: 38, color: "var(--success)" },
  { name: "En cobro",     value: 27, color: "var(--warning)" },
  { name: "Desembolsado", value: 20, color: "var(--secondary)" },
  { name: "Aprobado",     value: 9,  color: "var(--primary)" },
  { name: "Vencido",      value: 6,  color: "var(--destructive)" },
];

export const topCedentes = [
  { nombre: "Servicios TI Colombia S.A.S.", nit: "900.123.456-1", operaciones: 12, valor: 520_000_000, cobradoPct: 68, tendencia: +14 },
  { nombre: "Construcciones Andina S.A.",   nit: "800.234.567-2", operaciones: 9,  valor: 370_000_000, cobradoPct: 82, tendencia: +6  },
  { nombre: "Industrias Cóndor S.A.S.",     nit: "890.345.678-3", operaciones: 7,  valor: 340_000_000, cobradoPct: 100, tendencia: +2 },
  { nombre: "Textiles del Valle Ltda.",      nit: "800.456.789-4", operaciones: 5,  valor: 185_000_000, cobradoPct: 45, tendencia: -3  },
];

export const topDeudores = [
  { nombre: "Ecopetrol S.A.",        sector: "Energía",    valor: 520_000_000, riesgo: "bajo" },
  { nombre: "Avianca S.A.",          sector: "Transporte", valor: 340_000_000, riesgo: "bajo" },
  { nombre: "Almacenes Éxito S.A.",  sector: "Retail",     valor: 185_000_000, riesgo: "medio" },
  { nombre: "Compensar EPS",         sector: "Salud",      valor: 145_000_000, riesgo: "bajo" },
  { nombre: "Banco de Bogotá S.A.",  sector: "Financiero", valor: 92_500_000,  riesgo: "bajo" },
];

export const actividadReciente = [
  { tipo: "cobro",       desc: "FCT-2025-003 cobrado en su totalidad",              tiempo: "hace 2h",   monto: 340_000_000 },
  { tipo: "desembolso",  desc: "FCT-2025-005 desembolsado a Servicios TI Colombia", tiempo: "hace 5h",   monto: 494_000_000 },
  { tipo: "aprobacion",  desc: "FCT-2025-006 aprobado por comité de crédito",       tiempo: "hace 1d",   monto: 145_000_000 },
  { tipo: "vencimiento", desc: "FCT-2025-004 entró en estado vencido",              tiempo: "hace 2d",   monto: 78_000_000  },
  { tipo: "nueva",       desc: "FCT-2025-008 radicado por Pharma Colombia Ltda.",   tiempo: "hace 3d",   monto: 210_000_000 },
];

export const agingData = [
  { rango: "Al día",     dias: "0d",    operaciones: 27, valor: 1_970_000_000, color: "bg-success" },
  { rango: "1–15 días",  dias: "1–15",  operaciones: 8,  valor: 490_000_000,   color: "bg-primary" },
  { rango: "16–30 días", dias: "16–30", operaciones: 4,  valor: 210_000_000,   color: "bg-warning" },
  { rango: "31–60 días", dias: "31–60", operaciones: 3,  valor: 145_000_000,   color: "bg-warning" },
  { rango: ">60 días",   dias: ">60",   operaciones: 2,  valor: 78_000_000,    color: "bg-destructive" },
];

export const riesgoConfig: Record<string, string> = {
  bajo:  "text-success",
  medio: "text-warning",
  alto:  "text-destructive",
};

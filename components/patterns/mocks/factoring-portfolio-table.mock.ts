import { FactoringRecord } from "../types/factoring.types";

export const mockPortfolioData: FactoringRecord[] = [
  {
    id: "FCT-2025-001", cedente: "Construcciones Andina S.A.", deudor: "Banco de Bogotá S.A.",
    valorNominal: 185_000_000, valorDesembolsado: 175_750_000, tasaDescuento: 1.8,
    fechaInicio: "2025-01-15", fechaVencimiento: "2025-03-15", diasRestantes: 8,
    _cobradoPct: 82, status: "en-cobro",
  },
  {
    id: "FCT-2025-002", cedente: "Textiles del Valle Ltda.", deudor: "Almacenes Éxito S.A.",
    valorNominal: 92_500_000, valorDesembolsado: 87_875_000, tasaDescuento: 2.1,
    fechaInicio: "2025-01-20", fechaVencimiento: "2025-04-20", diasRestantes: 44,
    _cobradoPct: 45, status: "desembolsado",
  },
  {
    id: "FCT-2025-003", cedente: "Industrias Cóndor S.A.S.", deudor: "Avianca S.A.",
    valorNominal: 340_000_000, valorDesembolsado: 323_000_000, tasaDescuento: 1.5,
    fechaInicio: "2024-12-01", fechaVencimiento: "2025-03-01", diasRestantes: -6,
    _cobradoPct: 100, status: "cobrado",
  },
  {
    id: "FCT-2025-004", cedente: "Agropecuaria Los Llanos S.A.", deudor: "Grupo Nutresa S.A.",
    valorNominal: 78_000_000, valorDesembolsado: 74_100_000, tasaDescuento: 2.4,
    fechaInicio: "2025-01-08", fechaVencimiento: "2025-02-28", diasRestantes: -8,
    _cobradoPct: 0, status: "vencido",
  },
  {
    id: "FCT-2025-005", cedente: "Servicios TI Colombia S.A.S.", deudor: "Ecopetrol S.A.",
    valorNominal: 520_000_000, valorDesembolsado: 494_000_000, tasaDescuento: 1.6,
    fechaInicio: "2025-02-01", fechaVencimiento: "2025-05-01", diasRestantes: 55,
    _cobradoPct: 20, status: "desembolsado",
  },
  {
    id: "FCT-2025-006", cedente: "Distribuidora Norte S.A.", deudor: "Terpel S.A.",
    valorNominal: 145_000_000, valorDesembolsado: 0, tasaDescuento: 2.0,
    fechaInicio: "2025-03-01", fechaVencimiento: "2025-06-01", diasRestantes: 86,
    _cobradoPct: 0, status: "aprobado",
  },
  {
    id: "FCT-2025-007", cedente: "Muebles Roble S.A.S.", deudor: "Ikea Colombia S.A.",
    valorNominal: 55_000_000, valorDesembolsado: 52_250_000, tasaDescuento: 2.8,
    fechaInicio: "2025-01-10", fechaVencimiento: "2025-03-10", diasRestantes: 3,
    _cobradoPct: 95, status: "en-cobro",
  },
  {
    id: "FCT-2025-008", cedente: "Pharma Colombia Ltda.", deudor: "Compensar EPS",
    valorNominal: 210_000_000, valorDesembolsado: 0, tasaDescuento: 0,
    fechaInicio: "2025-02-15", fechaVencimiento: "2025-05-15", diasRestantes: 69,
    _cobradoPct: 0, status: "rechazado",
  },
];

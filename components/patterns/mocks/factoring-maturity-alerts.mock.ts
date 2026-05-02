import { FactoringAlert } from "../types/factoring.types";

export const mockMaturityAlerts: FactoringAlert[] = [
  {
    id: "ALT-001", operacionId: "FCT-2025-004",
    cedente: "Agropecuaria Los Llanos S.A.", deudor: "Grupo Nutresa S.A.",
    valorNominal: 78_000_000, cobradoPct: 0,
    fechaInicio: "2025-01-08", fechaVencimiento: "2025-02-28",
    diasRestantes: -8, urgency: "vencido", recordatoriosEnviados: 4,
    ultimoContacto: "2025-03-04", analista: "M. Rodríguez", muted: false,
  },
  {
    id: "ALT-002", operacionId: "FCT-2025-007",
    cedente: "Muebles Roble S.A.S.", deudor: "Ikea Colombia S.A.",
    valorNominal: 55_000_000, cobradoPct: 95,
    fechaInicio: "2025-01-10", fechaVencimiento: "2025-03-10",
    diasRestantes: 3, urgency: "critico", recordatoriosEnviados: 2,
    ultimoContacto: "2025-03-05", analista: "A. Torres", muted: false,
  },
  {
    id: "ALT-003", operacionId: "FCT-2025-001",
    cedente: "Construcciones Andina S.A.", deudor: "Banco de Bogotá S.A.",
    valorNominal: 185_000_000, cobradoPct: 82,
    fechaInicio: "2025-01-15", fechaVencimiento: "2025-03-15",
    diasRestantes: 8, urgency: "proximo", recordatoriosEnviados: 1,
    ultimoContacto: "2025-03-03", analista: "C. Vargas", muted: false,
  },
  {
    id: "ALT-004", operacionId: "FCT-2025-011",
    cedente: "Distribuidora Centro S.A.", deudor: "Almacenes La 14 S.A.",
    valorNominal: 95_000_000, cobradoPct: 45,
    fechaInicio: "2025-01-22", fechaVencimiento: "2025-03-22",
    diasRestantes: 15, urgency: "proximo", recordatoriosEnviados: 0,
    ultimoContacto: null, analista: "M. Rodríguez", muted: false,
  },
  {
    id: "ALT-005", operacionId: "FCT-2025-002",
    cedente: "Textiles del Valle Ltda.", deudor: "Almacenes Éxito S.A.",
    valorNominal: 92_500_000, cobradoPct: 45,
    fechaInicio: "2025-01-20", fechaVencimiento: "2025-04-20",
    diasRestantes: 44, urgency: "vigilar", recordatoriosEnviados: 0,
    ultimoContacto: null, analista: "A. Torres", muted: true,
  },
];

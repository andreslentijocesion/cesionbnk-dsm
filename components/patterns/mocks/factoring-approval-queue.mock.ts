import { FactoringQueueRecord } from "../types/factoring.types";

export const mockApprovalQueue: FactoringQueueRecord[] = [
  {
    id: "FCT-2025-009", cedente: "Alimentos del Pacífico S.A.", nitCedente: "900.871.234-5",
    deudor: "Grupo Éxito S.A.", valorNominal: 320_000_000, tasaSugerida: 1.9, plazo: 60,
    fechaRadicacion: "2025-03-04", diasEnCola: 3, priority: "alta", riesgo: "bajo",
    scoreCredito: 87, analista: "M. Rodríguez",
  },
  {
    id: "FCT-2025-010", cedente: "Tecnología Andes S.A.S.", nitCedente: "901.234.567-8",
    deudor: "Ecopetrol S.A.", valorNominal: 480_000_000, tasaSugerida: 1.7, plazo: 90,
    fechaRadicacion: "2025-03-03", diasEnCola: 4, priority: "alta", riesgo: "bajo",
    scoreCredito: 92, analista: "C. Vargas",
  },
  {
    id: "FCT-2025-011", cedente: "Distribuidora Centro S.A.", nitCedente: "800.345.678-9",
    deudor: "Almacenes La 14 S.A.", valorNominal: 95_000_000, tasaSugerida: 2.3, plazo: 45,
    fechaRadicacion: "2025-03-05", diasEnCola: 2, priority: "media", riesgo: "medio",
    scoreCredito: 71, analista: "M. Rodríguez",
  },
  {
    id: "FCT-2025-012", cedente: "Confecciones Bogotá Ltda.", nitCedente: "830.456.789-0",
    deudor: "Arturo Calle S.A.S.", valorNominal: 58_000_000, tasaSugerida: 2.6, plazo: 30,
    fechaRadicacion: "2025-03-06", diasEnCola: 1, priority: "baja", riesgo: "medio",
    scoreCredito: 68, analista: "A. Torres",
  },
  {
    id: "FCT-2025-013", cedente: "Logística Express S.A.S.", nitCedente: "901.567.890-1",
    deudor: "Rappi Colombia S.A.S.", valorNominal: 143_000_000, tasaSugerida: 2.1, plazo: 60,
    fechaRadicacion: "2025-03-02", diasEnCola: 5, priority: "alta", riesgo: "bajo",
    scoreCredito: 79, analista: "C. Vargas",
  },
];

import { OnboardingDocument } from "../types/onboarding.types";

export const INITIAL_ONBOARDING_DOCUMENTS: OnboardingDocument[] = [
  // Company Information
  { id: "1", nombre: "RUT (Tax Registration)", categoria: "empresa", archivo: null, requerido: true, tipo: "PDF", maxSize: 5, progress: 0, uploaded: false },
  { id: "2", nombre: "Chamber of Commerce Certificate", categoria: "empresa", archivo: null, requerido: true, tipo: "PDF", maxSize: 5, progress: 0, uploaded: false, ayuda: "Not older than 30 days" },
  { id: "3", nombre: "Legal Representative ID", categoria: "empresa", archivo: null, requerido: true, tipo: "PDF/JPG", maxSize: 5, progress: 0, uploaded: false },
  
  // Banking Information
  { id: "4", nombre: "Bank Account Statement", categoria: "bancaria", archivo: null, requerido: true, tipo: "PDF", maxSize: 5, progress: 0, uploaded: false, ayuda: "May be password-protected." },
  
  // Financial Information
  { id: "5", nombre: "DIAN Account Statement", categoria: "financiera", archivo: null, requerido: true, tipo: "PDF", maxSize: 5, progress: 0, uploaded: false },
  { id: "6", nombre: "2024 Financial Statements", categoria: "financiera", archivo: null, requerido: true, tipo: "PDF/Excel", maxSize: 10, progress: 0, uploaded: false },
  { id: "7", nombre: "2025 Financial Statements", categoria: "financiera", archivo: null, requerido: false, tipo: "PDF/Excel", maxSize: 10, progress: 0, uploaded: false, ayuda: "Optional" },
  
  // Optional Documents
  { id: "8", nombre: "Shareholder Composition", categoria: "opcional", archivo: null, requerido: false, tipo: "PDF", maxSize: 5, progress: 0, uploaded: false, ayuda: "You can upload it later if you don't have it" },
];

export const MOCK_EXTRACTED_DATA = {
  razonSocial: "Acme Corporation SAS",
  nit: "900123456-7",
  fechaConstitucion: "15/03/2020",
  direccion: "Carrera 7 #100-50, Bogota",
  actividadEconomica: "Financial Services",
  municipio: "Bogota",
  nombreRepresentante: "Juan Carlos Garcia Lopez",
  cedulaRepresentante: "1234567890",
  cargoRepresentante: "General Manager",
  nombreBanco: "Bancolombia",
  tipoCuenta: "Savings",
  numeroCuenta: "1234567890",
};

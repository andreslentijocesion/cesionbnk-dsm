export interface OnboardingClient {
  id: string;
  nombre: string;
  nit: string;
  contacto: string;
  email: string;
  telefono: string;
}

export interface OnboardingDocument {
  id: string;
  nombre: string;
  categoria: string;
  archivo: File | null;
  requerido: boolean;
  tipo: string;
  maxSize: number;
  progress: number;
  uploaded: boolean;
  ayuda?: string;
}

export interface OnboardingFormData {
  // Documents
  documentos: OnboardingDocument[];
  passwordPDF?: string;
  
  // Automatically extracted data
  razonSocial: string;
  nit: string;
  fechaConstitucion: string;
  direccion: string;
  actividadEconomica: string;
  municipio: string;
  nombreRepresentante: string;
  cedulaRepresentante: string;
  cargoRepresentante: string;
  nombreBanco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  
  // Contact details
  telefonoContacto: string;
  correoContacto: string;
  
  // Clients
  clientes: OnboardingClient[];
  
  // Declarations
  obligacionesVencidas: boolean;
  insolvencia: boolean;
  registradaPais: boolean;
  cumpleRegulaciones: boolean;
  actividadesIlegales: boolean;
  esPEP: boolean;
  investigacionesJudiciales: boolean;
  sancionada: boolean;
  politicasSarlaft: boolean;
  infoVeraz: boolean;
  actualizarInfo: boolean;
  aceptaPolitica: boolean;
  autorizaConsulta: boolean;
}

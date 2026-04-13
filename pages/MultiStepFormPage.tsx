import React, { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Upload, FileText, Pencil, Trash2, Plus, CheckCircle2, AlertCircle, Search, Building2, FileCheck, Users, Lock, Loader2, Info, Eye, HelpCircle, Wallet, ShieldAlert } from "lucide-react";
import { StepIndicator, Step } from "../components/advanced/step-indicator";
import { Switch } from "../components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

// Types
interface Cliente {
  id: string;
  nombre: string;
  nit: string;
  contacto: string;
  email: string;
  telefono: string;
}

interface Documento {
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

interface FormData {
  // Documents
  documentos: Documento[];
  passwordPDF?: string;
  
  // Automatically extracted data (Step 2)
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
  
  // Contact details (to complete in Step 2)
  telefonoContacto: string;
  correoContacto: string;
  
  // Clients (Step 3)
  clientes: Cliente[];
  
  // Declarations (Step 3)
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

function MultiStepFormDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setDataExtracted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  
  const [formData, setFormData] = useState<Partial<FormData>>({
    documentos: [
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
    ],
    clientes: [],
    // Default declarations
    obligacionesVencidas: false,
    insolvencia: false,
    registradaPais: true,
    cumpleRegulaciones: true,
    actividadesIlegales: false,
    esPEP: false,
    investigacionesJudiciales: false,
    sancionada: false,
    politicasSarlaft: true,
    infoVeraz: false,
    actualizarInfo: false,
    aceptaPolitica: false,
    autorizaConsulta: false,
  });

  // Current client (for add/edit)
  const [clienteActual, setClienteActual] = useState<Cliente | null>(null);
  const [mostrarFormCliente, setMostrarFormCliente] = useState(false);

  const totalSteps = 3;

  const steps: Step[] = [
    { 
      id: "carga-documentos",
      title: "Document Upload", 
      description: "Upload all documents",
      icon: <Upload className="h-5 w-5" />
    },
    { 
      id: "validacion-datos",
      title: "Data Validation", 
      description: "Review and complete information",
      icon: <FileCheck className="h-5 w-5" />
    },
    { 
      id: "clientes-declaraciones",
      title: "Clients", 
      description: "Add clients and declarations",
      icon: <Users className="h-5 w-5" />
    },
  ];

  const handleNext = async () => {
    // If on step 1 and required documents are uploaded, process
    if (currentStep === 1) {
      const docsObligatorios = formData.documentos?.filter(d => d.requerido) || [];
      const todosSubidos = docsObligatorios.every(d => d.uploaded);
      
      if (!todosSubidos) {
        alert("Please upload all required documents before continuing.");
        return;
      }
      
      // Simulate document processing
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Simulate data extraction
      setFormData({
        ...formData,
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
      });
      
      setDataExtracted(true);
      setIsProcessing(false);
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (documentoId: string, file: File) => {
    const doc = formData.documentos?.find(d => d.id === documentoId);
    if (!doc) return;

    // Validate size
    if (file.size > doc.maxSize * 1024 * 1024) {
      alert(`File exceeds the maximum size of ${doc.maxSize}MB`);
      return;
    }

    // Simulate upload with progress
    setFormData({
      ...formData,
      documentos: formData.documentos?.map(d =>
        d.id === documentoId
          ? { ...d, archivo: file, progress: 0 }
          : d
      ) || [],
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        setFormData(prev => ({
          ...prev,
          documentos: prev.documentos?.map(d =>
            d.id === documentoId
              ? { ...d, progress: 100, uploaded: true }
              : d
          ) || [],
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          documentos: prev.documentos?.map(d =>
            d.id === documentoId
              ? { ...d, progress }
              : d
          ) || [],
        }));
      }
    }, 150);
  };

  const handleEliminarDocumento = (documentoId: string) => {
    setFormData({
      ...formData,
      documentos: formData.documentos?.map(d =>
        d.id === documentoId
          ? { ...d, archivo: null, progress: 0, uploaded: false }
          : d
      ) || [],
    });
  };

  const handleAgregarCliente = (cliente: Omit<Cliente, "id">) => {
    const nuevoCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
    };
    setFormData({
      ...formData,
      clientes: [...(formData.clientes || []), nuevoCliente],
    });
    setMostrarFormCliente(false);
    setClienteActual(null);
  };

  const handleEditarCliente = (id: string) => {
    const cliente = formData.clientes?.find(c => c.id === id);
    if (cliente) {
      setClienteActual(cliente);
      setMostrarFormCliente(true);
    }
  };

  const handleEliminarCliente = (id: string) => {
    setFormData({
      ...formData,
      clientes: formData.clientes?.filter(c => c.id !== id) || [],
    });
  };

  const handleSubmit = () => {
    // Validate required declarations
    if (!formData.infoVeraz || !formData.actualizarInfo || !formData.aceptaPolitica || !formData.autorizaConsulta) {
      alert("Please accept all required declarations.");
      return;
    }

    // Generate transaction ID
    const txId = `CFN-${Date.now().toString().slice(-8)}`;
    setTransactionId(txId);
    
    // Simulate submission
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setDataExtracted(false);
    setFormData({
      documentos: formData.documentos?.map(d => ({ ...d, archivo: null, progress: 0, uploaded: false })),
      clientes: [],
      obligacionesVencidas: false,
      insolvencia: false,
      registradaPais: true,
      cumpleRegulaciones: true,
      actividadesIlegales: false,
      esPEP: false,
      investigacionesJudiciales: false,
      sancionada: false,
      politicasSarlaft: true,
      infoVeraz: false,
      actualizarInfo: false,
      aceptaPolitica: false,
      autorizaConsulta: false,
    });
  };

  const docsObligatorios = formData.documentos?.filter(d => d.requerido) || [];
  const docsObligatoriosSubidos = docsObligatorios.filter(d => d.uploaded).length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
        </div>

        {/* Stepper - Componente oficial del DSM */}
        <div className="mb-8">
          <StepIndicator
            steps={steps}
            currentStep={currentStep - 1}
            orientation="horizontal"
            variant="default"
            showProgress={true}
            showLabels={true}
            clickable={true}
            onStepClick={(index) => setCurrentStep(index + 1)}
          />
        </div>

        {/* Processing Documents */}
        {isProcessing && (
          <Card className="p-8 mb-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Processing Documents...</h3>
                <p className="text-sm text-muted-foreground">
                  We are extracting information from your documents
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated time: 30-45 seconds
                </p>
              </div>
              <Progress value={66} className="w-full max-w-md" />
            </div>
          </Card>
        )}

        {/* Form Card */}
        {!isProcessing && (
          <Card className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl mb-2 font-semibold">{steps[currentStep - 1].title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentStep === 1 && "Please attach the required documents to begin your application review."}
                {currentStep === 2 && "Verify that the extracted information is correct and complete the missing fields."}
                {currentStep === 3 && "Register your clients' information and confirm the final declarations."}
              </p>
            </div>

            <div className="transition-all duration-250">
              {/* STEP 1: Document Upload */}
              {currentStep === 1 && (
                <Paso1
                  formData={formData}
                  setFormData={setFormData}
                  onFileUpload={handleFileUpload}
                  onEliminarDocumento={handleEliminarDocumento}
                  docsObligatoriosSubidos={docsObligatoriosSubidos}
                  totalDocsObligatorios={docsObligatorios.length}
                />
              )}

              {/* STEP 2: Data Validation */}
              {currentStep === 2 && (
                <Paso2
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {/* STEP 3: Clients & Declarations */}
              {currentStep === 3 && (
                <Paso3
                  formData={formData}
                  setFormData={setFormData}
                  mostrarFormCliente={mostrarFormCliente}
                  setMostrarFormCliente={setMostrarFormCliente}
                  clienteActual={clienteActual}
                  setClienteActual={setClienteActual}
                  onAgregarCliente={handleAgregarCliente}
                  onEditarCliente={handleEditarCliente}
                  onEliminarCliente={handleEliminarCliente}
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-border">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm("Are you sure you want to cancel the form?")) {
                    handleCloseSuccessModal();
                  }
                }}
              >
                Cancel
              </Button>

              <div className="flex-1" />

              {currentStep < totalSteps ? (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleNext}
                >
                  {currentStep === 1 ? "Process Documents & Continue" : "Continue"}
                </Button>
              ) : (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSubmit}
                >
                  Submit Form
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Success Modal */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">
                Process Completed Successfully!
              </DialogTitle>
              <DialogDescription className="text-center space-y-4 pt-4" asChild>
                <div>
                  <p className="text-muted-foreground">
                    Your application has been received successfully and is being processed.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Reference number:</p>
                    <p className="font-semibold text-primary">{transactionId}</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-left dark:bg-yellow-950 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                      <strong>Next steps:</strong>
                    </p>
                    <ul className="text-xs text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
                      <li>You will receive a confirmation email within the next few hours</li>
                      <li>Our team will review your application in 2-3 business days</li>
                      <li>You will be contacted to confirm your account activation</li>
                      <li>We will notify you of any additional required documents</li>
                    </ul>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    If you have any questions, feel free to contact us.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleCloseSuccessModal}
              >
                Got It
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="w-full"
              >
                Download Receipt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// ========== STEP 1: DOCUMENT UPLOAD ==========
function Paso1({
  formData,
  setFormData,
  onFileUpload,
  onEliminarDocumento,
  docsObligatoriosSubidos,
  totalDocsObligatorios,
}: {
  formData: Partial<FormData>;
  setFormData: (data: Partial<FormData>) => void;
  onFileUpload: (documentoId: string, file: File) => void;
  onEliminarDocumento: (documentoId: string) => void;
  docsObligatoriosSubidos: number;
  totalDocsObligatorios: number;
}) {
  const docsEmpresa = formData.documentos?.filter(d => d.categoria === "empresa") || [];
  const docsBancaria = formData.documentos?.filter(d => d.categoria === "bancaria") || [];
  const docsFinanciera = formData.documentos?.filter(d => d.categoria === "financiera") || [];
  const docsOpcional = formData.documentos?.filter(d => d.categoria === "opcional") || [];

  return (
    <div className="space-y-4">
      {/* Company Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 pb-2 border-b border-border">
          <Building2 className="h-4 w-4" />
          Company Information
        </h3>
        <div className="space-y-2">
          {docsEmpresa.map((doc, index) => (
            <DocumentoUpload
              key={doc.id}
              documento={doc}
              index={index + 1}
              onUpload={onFileUpload}
              onEliminar={onEliminarDocumento}
            />
          ))}
        </div>
      </div>

      {/* Banking Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 pb-2 border-b border-border">
          <FileCheck className="h-4 w-4" />
          Banking Information
        </h3>
        <div className="space-y-2">
          {docsBancaria.map((doc, index) => (
            <DocumentoUpload
              key={doc.id}
              documento={doc}
              index={docsEmpresa.length + index + 1}
              onUpload={onFileUpload}
              onEliminar={onEliminarDocumento}
              headerContent={doc.id === "4" ? (
                <div className="relative w-56 ml-2">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="PDF Password"
                    value={formData.passwordPDF || ""}
                    onChange={(e) => setFormData({ ...formData, passwordPDF: e.target.value })}
                    className="h-8 pl-8 text-xs"
                  />
                </div>
              ) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Financial Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 pb-2 border-b border-border">
          <FileText className="h-4 w-4" />
          Financial Information
        </h3>
        <div className="space-y-2">
          {docsFinanciera.map((doc, index) => (
            <DocumentoUpload
              key={doc.id}
              documento={doc}
              index={docsEmpresa.length + docsBancaria.length + index + 1}
              onUpload={onFileUpload}
              onEliminar={onEliminarDocumento}
            />
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2 pb-2 border-b border-border">
          <FileText className="h-4 w-4" />
          Optional Documents
        </h3>
        <div className="space-y-2">
          {docsOpcional.map((doc, index) => (
            <DocumentoUpload
              key={doc.id}
              documento={doc}
              index={docsEmpresa.length + docsBancaria.length + docsFinanciera.length + index + 1}
              onUpload={onFileUpload}
              onEliminar={onEliminarDocumento}
            />
          ))}
        </div>
      </div>

      {/* Progress counter */}
      <Alert className={`${docsObligatoriosSubidos === totalDocsObligatorios ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : 'bg-muted border-border'}`}>
        <CheckCircle2 className={`h-4 w-4 ${docsObligatoriosSubidos === totalDocsObligatorios ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
        <AlertDescription className="text-sm">
          <strong>{docsObligatoriosSubidos} of {totalDocsObligatorios} required documents uploaded</strong>
          {docsObligatoriosSubidos === totalDocsObligatorios && (
            <span className="text-xs ml-2 text-muted-foreground">
              Estimated processing: 30-45 seconds
            </span>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Component for individual document upload
function DocumentoUpload({
  documento,
  index,
  onUpload,
  onEliminar,
  children,
  headerContent,
}: {
  documento: Documento;
  index: number;
  onUpload: (docId: string, file: File) => void;
  onEliminar: (docId: string) => void;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(documento.id, file);
    }
  };

  const handleViewFile = () => {
    if (documento.archivo) {
      const url = URL.createObjectURL(documento.archivo);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">
              {index}. {documento.nombre} {documento.requerido && <span className="text-destructive">*</span>}
            </span>
            {documento.uploaded && (
              <Badge variant="success">
                Uploaded
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              • {documento.tipo} • Max. {documento.maxSize}MB
              {documento.ayuda && ` • ${documento.ayuda}`}
            </span>
            {headerContent}
          </div>
          
          {documento.progress > 0 && documento.progress < 100 && (
            <div className="mt-2">
              <Progress value={documento.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{documento.progress}%</p>
            </div>
          )}
          
          {documento.uploaded && documento.archivo && (
            <div className="flex items-center gap-2 mt-2">
              <FileText className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">{documento.archivo.name}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          {!documento.uploaded ? (
            <label>
              <input
                type="file"
                accept={documento.tipo === "PDF" ? ".pdf" : documento.tipo === "PDF/JPG" ? ".pdf,.jpg,.jpeg" : documento.tipo === "PDF/Excel" ? ".pdf,.xlsx,.xls" : "*"}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button size="sm" variant="outline" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </span>
              </Button>
            </label>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewFile}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEliminar(documento.id)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

// ========== STEP 2: VALIDATION & COMPLETE DATA ==========
function Paso2({
  formData,
  setFormData,
}: {
  formData: Partial<FormData>;
  setFormData: (data: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-sm text-green-800 dark:text-green-200">
          <strong>Data Extracted Automatically</strong> - Verify the information. Click any field to edit it.
        </AlertDescription>
      </Alert>

      {/* Company Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold pb-2 border-b border-border flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DatoExtraido
            label="Company Name"
            value={formData.razonSocial || ""}
            onChange={(val) => setFormData({ ...formData, razonSocial: val })}
          />
          <DatoExtraido
            label="NIT"
            value={formData.nit || ""}
            onChange={(val) => setFormData({ ...formData, nit: val })}
          />
          <DatoExtraido
            label="Date of Incorporation"
            value={formData.fechaConstitucion || ""}
            onChange={(val) => setFormData({ ...formData, fechaConstitucion: val })}
          />
          <DatoExtraido
            label="City"
            value={formData.municipio || ""}
            onChange={(val) => setFormData({ ...formData, municipio: val })}
          />
          <div className="md:col-span-2">
            <DatoExtraido
              label="Address"
              value={formData.direccion || ""}
              onChange={(val) => setFormData({ ...formData, direccion: val })}
            />
          </div>
          <div className="md:col-span-2">
            <DatoExtraido
              label="Economic Activity"
              value={formData.actividadEconomica || ""}
              onChange={(val) => setFormData({ ...formData, actividadEconomica: val })}
            />
          </div>
        </div>
      </div>

      {/* Legal Representative */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold pb-2 border-b border-border flex items-center gap-2">
          <Users className="h-4 w-4" />
          Legal Representative
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <DatoExtraido
              label="Full Name"
              value={formData.nombreRepresentante || ""}
              onChange={(val) => setFormData({ ...formData, nombreRepresentante: val })}
            />
          </div>
          <DatoExtraido
            label="ID Number"
            value={formData.cedulaRepresentante || ""}
            onChange={(val) => setFormData({ ...formData, cedulaRepresentante: val })}
          />
          <DatoExtraido
            label="Position"
            value={formData.cargoRepresentante || ""}
            onChange={(val) => setFormData({ ...formData, cargoRepresentante: val })}
          />
        </div>
      </div>

      {/* Banking Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold pb-2 border-b border-border flex items-center gap-2">
          <FileCheck className="h-4 w-4" />
          Banking Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <DatoExtraido
            label="Bank"
            value={formData.nombreBanco || ""}
            onChange={(val) => setFormData({ ...formData, nombreBanco: val })}
          />
          <DatoExtraido
            label="Account Type"
            value={formData.tipoCuenta || ""}
            onChange={(val) => setFormData({ ...formData, tipoCuenta: val })}
          />
          <DatoExtraido
            label="Account Number"
            value={formData.numeroCuenta || ""}
            onChange={(val) => setFormData({ ...formData, numeroCuenta: val })}
          />
        </div>
      </div>

      {/* Required Information */}
      <div className="space-y-3">
        
        
        <h3 className="text-sm font-semibold pb-2 border-b border-border flex items-center gap-2">
          <Info className="h-4 w-4" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">
              Phone/Mobile <span className="text-destructive">*</span>
            </Label>
            <Input
              type="tel"
              placeholder="+57 301 234 5678"
              value={formData.telefonoContacto || ""}
              onChange={(e) => setFormData({ ...formData, telefonoContacto: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              placeholder="contact@company.com"
              value={formData.correoContacto || ""}
              onChange={(e) => setFormData({ ...formData, correoContacto: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for displaying extracted data with read/edit mode
function DatoExtraido({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
          {label}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Badge variant="success-soft-outline" className="cursor-default">
                    Auto
                  </Badge>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Automatically extracted data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditing(true)}
            title="Edit field"
          >
            <Pencil className="h-3 w-3 text-muted-foreground hover:text-primary" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 border-primary focus:ring-1 focus:ring-primary bg-background"
            autoFocus
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false);
            }}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 hover:bg-green-50 hover:text-green-600"
            onClick={() => setIsEditing(false)}
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className="h-9 px-3 py-1 flex items-center bg-card border border-border rounded-md text-sm cursor-pointer hover:bg-muted hover:border-border transition-all truncate"
          onClick={() => setIsEditing(true)}
          title="Click to edit"
        >
          {value || <span className="text-muted-foreground italic text-xs">No data</span>}
        </div>
      )}
    </div>
  );
}

// ========== STEP 3: CLIENTS & DECLARATIONS ==========
function Paso3({
  formData,
  setFormData,
  mostrarFormCliente,
  setMostrarFormCliente,
  clienteActual,
  setClienteActual,
  onAgregarCliente,
  onEditarCliente,
  onEliminarCliente,
}: {
  formData: Partial<FormData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  mostrarFormCliente: boolean;
  setMostrarFormCliente: (show: boolean) => void;
  clienteActual: Cliente | null;
  setClienteActual: (cliente: Cliente | null) => void;
  onAgregarCliente: (cliente: Omit<Cliente, "id">) => void;
  onEditarCliente: (id: string) => void;
  onEliminarCliente: (id: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const clientesFiltrados = formData.clientes?.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nit.includes(searchTerm)
  ) || [];

  return (
    <div className="space-y-6">


      {/* Search bar and add button */}
      <div className="flex gap-3 items-start relative z-10">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, NIT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {/* Autocomplete Dropdown */}
          {(() => {
            const mockClientes = [
              { nombre: "Tech Solutions SAS", nit: "900.123.456-1", contacto: "Carlos Rodriguez", email: "carlos@techsolutions.com", telefono: "3101234567" },
              { nombre: "Global Investments Ltd", nit: "800.987.654-3", contacto: "Ana Maria Perez", email: "ana@inversiones.com", telefono: "3119876543" },
              { nombre: "Northern Distributors", nit: "901.555.444-8", contacto: "Jorge Ramirez", email: "jorge@distnorte.com", telefono: "3125554448" },
              { nombre: "Andes Construction", nit: "890.333.222-5", contacto: "Luisa Fernandez", email: "luisa@andes.com", telefono: "3133332225" },
              { nombre: "Quick Logistics", nit: "900.777.888-9", contacto: "Mario Gomez", email: "mario@logistica.com", telefono: "3147778889" },
            ];
            
            const filtered = mockClientes.filter(c => 
              c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
              c.nit.includes(searchTerm)
            );

            if (!searchTerm || filtered.length === 0) return null;

            return (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover text-popover-foreground border rounded-md shadow-lg max-h-60 overflow-auto hidden group-focus-within:block animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-1">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    Suggestions found
                  </div>
                  {filtered.map((cliente, i) => (
                    <div
                      key={i}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent losing focus before click
                        onAgregarCliente(cliente);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{cliente.nombre}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>NIT: {cliente.nit}</span>
                          <span>•</span>
                          <span>{cliente.contacto}</span>
                        </div>
                      </div>
                      <Plus className="ml-auto h-4 w-4 opacity-50" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
        <Button
          onClick={() => {
            setClienteActual(null);
            setMostrarFormCliente(true);
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Client table */}
      {formData.clientes && formData.clientes.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-2">
            <p className="text-sm font-medium">{formData.clientes.length} clients added</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>NIT</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nombre}</TableCell>
                  <TableCell>{cliente.nit}</TableCell>
                  <TableCell>{cliente.contacto}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditarCliente(cliente.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm("Remove this client?")) {
                            onEliminarCliente(cliente.id);
                          }
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No clients added yet. Click "Add Client" to get started.
          </AlertDescription>
        </Alert>
      )}

      {/* Client form */}
      {mostrarFormCliente && (
        <FormCliente
          cliente={clienteActual}
          onGuardar={onAgregarCliente}
          onCancelar={() => {
            setMostrarFormCliente(false);
            setClienteActual(null);
          }}
        />
      )}

      {/* Declarations */}
      <DeclaracionesSection formData={formData} setFormData={setFormData} />
    </div>
  );
}

// Form for adding/editing client
function FormCliente({
  cliente,
  onGuardar,
  onCancelar,
}: {
  cliente: Cliente | null;
  onGuardar: (cliente: Omit<Cliente, "id">) => void;
  onCancelar: () => void;
}) {
  const [form, setForm] = useState<Omit<Cliente, "id">>({
    nombre: cliente?.nombre || "",
    nit: cliente?.nit || "",
    contacto: cliente?.contacto || "",
    email: cliente?.email || "",
    telefono: cliente?.telefono || "",
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.nit || !form.contacto) {
      alert("Please complete the required fields");
      return;
    }
    onGuardar(form);
  };

  return (
    <Card className="p-6 border-primary/50">
      <h3 className="text-lg font-semibold mb-4">
        {cliente ? "Edit Client" : "New Client"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label className="text-xs text-muted-foreground">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="ABC SAS"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">
            NIT <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="578531900-1"
            value={form.nit}
            onChange={(e) => setForm({ ...form, nit: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">
            Contact <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="John Smith"
            value={form.contacto}
            onChange={(e) => setForm({ ...form, contacto: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Email</Label>
          <Input
            type="email"
            placeholder="contact@client.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Phone</Label>
          <Input
            type="tel"
            placeholder="+57 301 234 5678"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={onCancelar}>
          Cancel
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleSubmit}
        >
          {cliente ? "Update" : "Add"}
        </Button>
      </div>
    </Card>
  );
}

// Declarations section
function DeclaracionesSection({ formData, setFormData }: { formData: Partial<FormData>, setFormData: React.Dispatch<React.SetStateAction<Partial<FormData>>> }) {
  return (
    <div className="space-y-8 pt-6 border-t border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Compliance & Declarations</h3>
        <Badge variant="outline" className="gap-1 bg-muted">
          <Info className="h-3 w-3" />
          <span>Required Information</span>
        </Badge>
      </div>

      <TooltipProvider>
        {/* Financial Status */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-primary flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Financial Status
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="obligaciones" className="text-base font-medium">Overdue Obligations</Label>
                <p className="text-xs text-muted-foreground">
                  Any overdue financial obligations?
                </p>
              </div>
              <Switch
                id="obligaciones"
                checked={formData.obligacionesVencidas || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, obligacionesVencidas: checked }))}
              />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="insolvencia" className="text-base font-medium">Insolvency</Label>
                <p className="text-xs text-muted-foreground">
                  Any insolvency or reorganization proceedings?
                </p>
              </div>
              <Switch
                id="insolvencia"
                checked={formData.insolvencia || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, insolvencia: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-primary flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Legal Compliance
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Registered Company */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="registrada" className="font-medium">Registered Company</Label>
                <p className="text-xs text-muted-foreground">Active commercial registration</p>
              </div>
              <Switch
                id="registrada"
                checked={formData.registradaPais || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, registradaPais: checked }))}
              />
            </div>

            {/* Regulations */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="regulaciones" className="font-medium">Regulatory Compliance</Label>
                <p className="text-xs text-muted-foreground">Complies with local regulations</p>
              </div>
              <Switch
                id="regulaciones"
                checked={formData.cumpleRegulaciones || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cumpleRegulaciones: checked }))}
              />
            </div>

            {/* Illegal Activities */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="ilegales" className="font-medium text-destructive">Illicit Activities</Label>
                <p className="text-xs text-muted-foreground">Any illegal business activities?</p>
              </div>
              <Switch
                id="ilegales"
                checked={formData.actividadesIlegales || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, actividadesIlegales: checked }))}
              />
            </div>

            {/* PEP */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="pep" className="font-medium">PEP Status</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">Politically Exposed Persons (Decree 1674 of 2016)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground">Any politically exposed officers?</p>
              </div>
              <Switch
                id="pep"
                checked={formData.esPEP || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, esPEP: checked }))}
              />
            </div>

            {/* Judicial Proceedings */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="judiciales" className="font-medium">Legal Proceedings</Label>
                <p className="text-xs text-muted-foreground">Any active investigations?</p>
              </div>
              <Switch
                id="judiciales"
                checked={formData.investigacionesJudiciales || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, investigacionesJudiciales: checked }))}
              />
            </div>

            {/* Sanctions */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="sancionada" className="font-medium">Sanctions</Label>
                <p className="text-xs text-muted-foreground">Tax or labor sanctions</p>
              </div>
              <Switch
                id="sancionada"
                checked={formData.sancionada || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sancionada: checked }))}
              />
            </div>

            {/* SARLAFT */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted transition-colors md:col-span-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="sarlaft" className="font-medium">SARLAFT / SAGRLAFT Policies</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">Anti-Money Laundering and Counter-Terrorism Financing Risk Management System</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground">Do you have anti-money laundering prevention policies?</p>
              </div>
              <Switch
                id="sarlaft"
                checked={formData.politicasSarlaft || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, politicasSarlaft: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Authorizations */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-primary flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Authorizations & Consent <span className="text-destructive">*</span>
          </h4>
          <div className="grid gap-3 rounded-lg border bg-muted p-5">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="infoVeraz" 
                checked={formData.infoVeraz || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, infoVeraz: checked === true }))}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="infoVeraz" className="font-medium cursor-pointer">
                  Truthfulness Declaration
                </Label>
                <p className="text-xs text-muted-foreground">
                  I declare that the information provided is truthful and verifiable.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="actualizar" 
                checked={formData.actualizarInfo || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, actualizarInfo: checked === true }))}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="actualizar" className="font-medium cursor-pointer">
                  Update Commitment
                </Label>
                <p className="text-xs text-muted-foreground">
                  I commit to updating any changes to the information provided.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="privacidad" 
                checked={formData.aceptaPolitica || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aceptaPolitica: checked === true }))}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="privacidad" className="font-medium cursor-pointer">
                  Privacy Policy
                </Label>
                <p className="text-xs text-muted-foreground">
                  I accept the Privacy Policy and Data Processing Terms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="riesgo" 
                checked={formData.autorizaConsulta || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autorizaConsulta: checked === true }))}
              />
              <div className="grid gap-1.5 leading-none">
                <div className="flex items-center gap-2">
                   <Label htmlFor="riesgo" className="font-medium cursor-pointer">
                    Credit Bureaus
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">Authorizes credit bureau queries and reports (e.g., Datacredito and Cifin).</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground">
                  I authorize credit bureau queries and financial risk reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

export function MultiStepFormPage() {
  return (
    <ComponentShowcase
      title="Multi-Step Application Form"
      description="Complete 5-step application form with document upload, OCR data extraction simulation, client management, compliance declarations, and final review. Features StepIndicator progress, file upload with validation, editable extracted fields, client CRUD with search, SARLAFT/PEP compliance toggles, and a detailed review step."
      category="Patterns"
      preview={<MultiStepFormDemo />}
      code={`import { StepIndicator, Step } from "@/components/advanced/StepIndicator";

// 5-step application:
// Step 1: Document Upload (RUT, Chamber of Commerce, Bank Certificate)
// Step 2: Extracted Data Review (OCR simulation + manual fields)
// Step 3: Client Management + Compliance Declarations
// Step 4: Legal Terms & Authorization
// Step 5: Final Review & Submit

<StepIndicator steps={steps} currentStep={currentStep} />`}
      props={[
        { name: "(self-contained)", type: "—", description: "Full internal state management for an onboarding flow. No external props." },
      ]}
      examples={[]}
    />
  );
}

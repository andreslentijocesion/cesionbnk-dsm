import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { 
  Upload, FileText, Trash2, 
  FileCheck, Users, Lock, Loader2 
} from "lucide-react";
import { StepIndicator, Step } from "../advanced/step-indicator";
import { 
  
  OnboardingFormData 
} from "./types/onboarding.types";
import { 
  INITIAL_ONBOARDING_DOCUMENTS, 
  MOCK_EXTRACTED_DATA 
} from "./mocks/onboarding.mock";

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    documentos: INITIAL_ONBOARDING_DOCUMENTS,
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

  const totalSteps = 3;

  const steps: Step[] = [
    { 
      id: "carga-documentos",
      title: "Document Upload", 
      description: "Upload all documents",
      icon: <Upload className="size-5" />
    },
    { 
      id: "validacion-datos",
      title: "Data Validation", 
      description: "Review and complete information",
      icon: <FileCheck className="size-5" />
    },
    { 
      id: "clientes-declaraciones",
      title: "Clients", 
      description: "Add clients and declarations",
      icon: <Users className="size-5" />
    },
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      const docsObligatorios = formData.documentos?.filter(d => d.requerido) || [];
      const todosSubidos = docsObligatorios.every(d => d.uploaded);
      
      if (!todosSubidos) {
        return;
      }
      
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        ...formData,
        ...MOCK_EXTRACTED_DATA,
      });
      
      setIsProcessing(false);
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (documentoId: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos?.map(d =>
        d.id === documentoId ? { ...d, archivo: file, progress: 100, uploaded: true } : d
      ) || [],
    }));
  };

  const handleEliminarDocumento = (documentoId: string) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos?.map(d =>
        d.id === documentoId ? { ...d, archivo: null, progress: 0, uploaded: false } : d
      ) || [],
    }));
  };

  const handleSubmit = () => {
    const txId = `CFN-${Date.now().toString().slice(-8)}`;
    setTransactionId(txId);
    setTimeout(() => setShowSuccess(true), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Card className="border shadow-elevation-3 overflow-hidden">
        <div className="bg-primary/5 border-b p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Digital Onboarding</h2>
              <p className="text-muted-foreground mt-1">Complete your company profile to start operating with CESIONBNK.</p>
            </div>
            <div className="flex items-center gap-3 bg-background/50 p-2 rounded-lg border border-border/50">
              <div className="p-2 bg-primary/10 rounded-md">
                <Lock className="size-5 text-primary" />
              </div>
              <div className="text-right pr-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Security Protocol</p>
                <p className="text-xs font-semibold text-success">AES-256 Encrypted</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <StepIndicator 
              steps={steps} 
              currentStep={currentStep} 
              className="max-w-3xl"
            />
          </div>
        </div>

        <div className="p-8">
           {currentStep === 1 && (
             <div className="space-y-6">
               <h3 className="text-lg font-semibold">Step 1: Company Documents</h3>
               <p className="text-sm text-muted-foreground">Please upload the required documents. Our IA will automatically extract the information.</p>
               <div className="grid gap-4 md:grid-cols-2">
                 {formData.documentos?.map(doc => (
                   <div key={doc.id} className="p-4 border rounded-lg flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <FileText className="size-5 text-muted-foreground" />
                       <div>
                         <p className="text-sm font-medium">{doc.nombre}</p>
                         <p className="text-xs text-muted-foreground">{doc.tipo} · Max {doc.maxSize}MB</p>
                       </div>
                     </div>
                     {doc.uploaded ? (
                       <Button variant="ghost" size="icon" onClick={() => handleEliminarDocumento(doc.id)}>
                         <Trash2 className="size-4 text-destructive" />
                       </Button>
                     ) : (
                       <Button variant="outline" size="sm" className="relative">
                         <Upload className="size-4 mr-2" /> Upload
                         <input 
                           type="file" 
                           className="absolute inset-0 opacity-0 cursor-pointer" 
                           onChange={(e) => e.target.files && handleFileUpload(doc.id, e.target.files[0])}
                         />
                       </Button>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           )}

           {currentStep === 2 && (
             <div className="space-y-6">
               <h3 className="text-lg font-semibold">Step 2: Data Validation</h3>
               <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                   <Label>Legal Name</Label>
                   <Input value={formData.razonSocial} readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>Tax ID (NIT)</Label>
                   <Input value={formData.nit} readOnly />
                 </div>
               </div>
             </div>
           )}

           {currentStep === 3 && (
             <div className="space-y-6">
               <h3 className="text-lg font-semibold">Step 3: Final Declarations</h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-2">
                   <Checkbox id="veraz" checked={formData.infoVeraz} onCheckedChange={(v) => setFormData({...formData, infoVeraz: !!v})} />
                   <Label htmlFor="veraz">I declare that the information provided is true.</Label>
                 </div>
               </div>
             </div>
           )}
        </div>

        <div className="bg-muted/30 border-t p-6 flex justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1 || isProcessing}>
            Back
          </Button>
          <div className="flex gap-3">
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="mr-2 size-4 animate-spin" /> Processing...</> : "Next"}
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Application</Button>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogDescription>
              Your onboarding process has started. Transaction ID: {transactionId}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

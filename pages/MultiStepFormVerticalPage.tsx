import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, getTransition } from "../lib/animation-config";
import { cn } from "../lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { User, Briefcase, FileText, Mail, Check, ChevronRight } from "lucide-react";
import { ComponentShowcase } from "../components/ui/component-showcase";

function MultiStepFormVerticalDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombres: "", apellidos: "", email: "", telefono: "",
    empresa: "", cargo: "", antiguedad: "", salario: "",
    documentos: { cedula: false, certificadoLaboral: false, extractoBancario: false },
    aceptaTerminos: false,
  });

  const updateFormData = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));
  const updateDocumento = (doc: string, checked: boolean) => setFormData((prev) => ({ ...prev, documentos: { ...prev.documentos, [doc]: checked } }));
  const handlePrevious = () => { if (currentStep > 1) setCurrentStep((p) => p - 1); };
  const handleNext = () => { if (currentStep < 4) setCurrentStep((p) => p + 1); };
  const handleSubmit = () => { alert("Application submitted successfully"); };

  const steps = [
    { id: 1, title: "Personal Info", icon: <User className="h-5 w-5" />, description: "Basic data" },
    { id: 2, title: "Employment Info", icon: <Briefcase className="h-5 w-5" />, description: "Professional data" },
    { id: 3, title: "Documents", icon: <FileText className="h-5 w-5" />, description: "File upload" },
    { id: 4, title: "Confirmation", icon: <Mail className="h-5 w-5" />, description: "Final review" },
  ];
  const isStepCompleted = (stepId: number) => stepId < currentStep;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-6">
          <div className="lg:sticky lg:top-6 h-fit w-full">
            <Card className="w-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Progress</CardTitle>
                  <Badge variant="outline" className="text-xs">{currentStep}/{steps.length}</Badge>
                </div>
                <CardDescription className="mt-1">{Math.round(progress)}% completed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 pb-4">
                <Progress value={progress} className="h-2 mb-4" />
                {steps.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = isStepCompleted(step.id);
                  const isLast = index === steps.length - 1;
                  return (
                    <div key={step.id} className="relative">
                      {!isLast && (<div className={cn("absolute left-5 top-12 w-0.5 h-10 -z-10 transition-colors duration-300", isCompleted ? "bg-primary" : "bg-border")} />)}
                      <button onClick={() => setCurrentStep(step.id)} className={cn("w-full text-left p-3 rounded-lg transition-all duration-300 flex items-start gap-3 group", isActive && "bg-muted border-2 border-primary shadow-sm", !isActive && "hover:bg-muted border-2 border-transparent")}>
                        <div className={cn("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300", isCompleted && "bg-primary text-primary-foreground shadow-md", isActive && !isCompleted && "bg-muted text-primary ring-2 ring-primary", !isActive && !isCompleted && "bg-muted text-muted-foreground group-hover:bg-muted")}>{isCompleted ? <Check className="h-5 w-5" /> : step.icon}</div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-2">
                            <p className={cn("text-sm font-medium truncate transition-colors duration-300", isActive && "text-primary", !isActive && "text-muted-foreground")}>{step.title}</p>
                            {isActive && <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="min-w-0 w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">{steps[currentStep - 1].icon}</div>
                  <div><CardTitle>{steps[currentStep - 1].title}</CardTitle><CardDescription>{steps[currentStep - 1].description}</CardDescription></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentStep} variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={getTransition('normal')}>
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label htmlFor="nombres">First Name *</Label><Input id="nombres" placeholder="John" value={formData.nombres} onChange={(e) => updateFormData("nombres", e.target.value)} /></div>
                            <div className="space-y-2"><Label htmlFor="apellidos">Last Name *</Label><Input id="apellidos" placeholder="Doe" value={formData.apellidos} onChange={(e) => updateFormData("apellidos", e.target.value)} /></div>
                          </div>
                          <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" placeholder="example@mail.com" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} /></div>
                          <div className="space-y-2"><Label htmlFor="telefono">Phone *</Label><Input id="telefono" type="tel" placeholder="+57 300 123 4567" value={formData.telefono} onChange={(e) => updateFormData("telefono", e.target.value)} /></div>
                        </div>
                      )}
                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2"><Label htmlFor="empresa">Company *</Label><Input id="empresa" placeholder="Company name" value={formData.empresa} onChange={(e) => updateFormData("empresa", e.target.value)} /></div>
                          <div className="space-y-2"><Label htmlFor="cargo">Current Position *</Label><Input id="cargo" placeholder="e.g. Sales Manager" value={formData.cargo} onChange={(e) => updateFormData("cargo", e.target.value)} /></div>
                          <div className="space-y-2"><Label htmlFor="antiguedad">Tenure (years) *</Label><Select value={formData.antiguedad} onValueChange={(v) => updateFormData("antiguedad", v)}><SelectTrigger id="antiguedad"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="menos-1">Less than 1 year</SelectItem><SelectItem value="1-3">1 to 3 years</SelectItem><SelectItem value="3-5">3 to 5 years</SelectItem><SelectItem value="5+">More than 5 years</SelectItem></SelectContent></Select></div>
                          <div className="space-y-2"><Label htmlFor="salario">Monthly Salary *</Label><Input id="salario" type="number" placeholder="5000000" value={formData.salario} onChange={(e) => updateFormData("salario", e.target.value)} /></div>
                        </div>
                      )}
                      {currentStep === 3 && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">Select available documents</p>
                          {[{ id: "cedula", label: "National ID Card *", desc: "Copy of both sides", field: "cedula" as const }, { id: "certificado", label: "Employment Certificate *", desc: "Valid for less than 30 days", field: "certificadoLaboral" as const }, { id: "extracto", label: "Bank Statement", desc: "Last 3 months (Optional)", field: "extractoBancario" as const }].map((doc) => (
                            <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg transition-colors hover:bg-muted">
                              <Checkbox id={doc.id} checked={formData.documentos[doc.field]} onCheckedChange={(checked) => updateDocumento(doc.field, checked as boolean)} />
                              <div className="flex-1"><Label htmlFor={doc.id} className="cursor-pointer">{doc.label}</Label><p className="text-xs text-muted-foreground mt-1">{doc.desc}</p></div>
                            </div>
                          ))}
                        </div>
                      )}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <div className="rounded-lg border p-4 space-y-3 bg-muted text-sm">
                            <h4 className="font-medium">Summary</h4>
                            <div><p className="text-muted-foreground">Name</p><p className="font-medium">{formData.nombres} {formData.apellidos}</p></div>
                            <div><p className="text-muted-foreground">Email</p><p className="font-medium">{formData.email}</p></div>
                            <div className="pt-3 border-t"><p className="text-muted-foreground">Company</p><p className="font-medium">{formData.empresa} — {formData.cargo}</p></div>
                            <div className="pt-3 border-t"><p className="text-muted-foreground">Documents</p><div className="flex gap-2 mt-1 flex-wrap">{formData.documentos.cedula && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />ID Card</Badge>}{formData.documentos.certificadoLaboral && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />Certificate</Badge>}{formData.documentos.extractoBancario && <Badge variant="outline"><Check className="h-3 w-3 mr-1" />Statement</Badge>}</div></div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 border rounded-lg bg-card border-primary">
                            <Checkbox id="terminos" checked={formData.aceptaTerminos} onCheckedChange={(checked) => updateFormData("aceptaTerminos", checked)} />
                            <div className="flex-1"><Label htmlFor="terminos" className="cursor-pointer">I accept the terms and conditions *</Label><p className="text-xs text-muted-foreground mt-1">I have read and accept the privacy policy</p></div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} size="lg">Previous</Button>
                  {currentStep < steps.length ? (
                    <Button onClick={handleNext} size="lg"><ChevronRight className="h-4 w-4 ml-1" />Next</Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!formData.aceptaTerminos} size="lg"><Check className="h-4 w-4 mr-2" />Submit Application</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MultiStepFormVerticalPage() {
  return (
    <ComponentShowcase
      title="Multi-Step Form (Vertical)"
      description="4-step vertical form with sticky sidebar stepper, animated transitions, per-step validation, and final review. Steps: Personal Info → Employment → Documents → Confirmation. Features vertical progress indicator with connecting lines, step icons, and completion badges."
      category="Patterns"
      preview={<MultiStepFormVerticalDemo />}
      code={`// Self-contained vertical multi-step form
// Steps: Personal → Employment → Documents → Confirmation
// Layout: [Sidebar Stepper 20%] [Form Content 80%]

<div className="grid lg:grid-cols-[1fr_4fr] gap-6">
  {/* Vertical stepper with progress bar */}
  <Card>
    <Progress value={progress} />
    {steps.map(step => <StepButton />)}
  </Card>

  {/* Form content with AnimatePresence */}
  <Card>
    <AnimatePresence mode="wait">
      <motion.div key={currentStep}>
        {currentStep === 1 && <PersonalInfoFields />}
        {currentStep === 2 && <EmploymentFields />}
        {currentStep === 3 && <DocumentChecklist />}
        {currentStep === 4 && <ReviewSummary />}
      </motion.div>
    </AnimatePresence>
  </Card>
</div>`}
      props={[
        { name: "(self-contained)", type: "—", description: "Internal state management. No external props required." },
      ]}
      examples={[]}
    />
  );
}
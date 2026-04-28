import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Building2, CreditCard, FileCheck, AlertCircle, CheckCircle2, ChevronRight, Lock, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { fadeVariants, getTransition } from "../lib/animation-config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/Select";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import { Alert, AlertDescription } from "../components/ui/Alert";
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup";
import { Textarea } from "../components/ui/Textarea";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";

function MultiStepWizardVerticalDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [wizardData, setWizardData] = useState({
    nombreUsuario: "", emailUsuario: "", passwordUsuario: "", confirmPassword: "", rolUsuario: "",
    nombreEmpresa: "", nitEmpresa: "", sectorEmpresa: "", tamanoEmpresa: "", direccionEmpresa: "", telefonoEmpresa: "",
    volumenMensual: "", plazoPromedio: "", serviceType: "", metodoPago: "",
    verificacionCompleta: false,
  });

  const wizardSteps = [
    { id: 1, title: "Account", subtitle: "Basic information", icon: <User className="size-4" /> },
    { id: 2, title: "Company", subtitle: "Company details", icon: <Building2 className="size-4" /> },
    { id: 3, title: "Billing", subtitle: "Financial setup", icon: <CreditCard className="size-4" /> },
    { id: 4, title: "Verification", subtitle: "Review and confirm", icon: <FileCheck className="size-4" /> },
  ];

  const updateWizardData = (field: string, value: any) => { setWizardData((prev) => ({ ...prev, [field]: value })); setValidationErrors([]); };

  const validateStep = (step: number): boolean => {
    const errors: string[] = [];
    if (step === 1) { if (!wizardData.nombreUsuario) errors.push("Username is required"); if (!wizardData.emailUsuario) errors.push("Email is required"); if (!wizardData.passwordUsuario) errors.push("Password is required"); if (wizardData.passwordUsuario !== wizardData.confirmPassword) errors.push("Passwords do not match"); if (!wizardData.rolUsuario) errors.push("Select a role"); }
    if (step === 2) { if (!wizardData.nombreEmpresa) errors.push("Company name is required"); if (!wizardData.nitEmpresa) errors.push("NIT is required"); if (!wizardData.sectorEmpresa) errors.push("Select a sector"); if (!wizardData.tamanoEmpresa) errors.push("Select a size"); }
    if (step === 3) { if (!wizardData.volumenMensual) errors.push("Monthly volume is required"); if (!wizardData.plazoPromedio) errors.push("Average term is required"); if (!wizardData.serviceType) errors.push("Select service type"); if (!wizardData.metodoPago) errors.push("Select a payment method"); }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep) && currentStep < wizardSteps.length) setCurrentStep(currentStep + 1); };
  const handlePrevious = () => { setValidationErrors([]); if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleFinish = () => { if (validateStep(currentStep)) { updateWizardData("verificacionCompleta", true); alert("Setup completed successfully!"); } };
  const isStepCompleted = (stepId: number) => stepId < currentStep;
  const isStepAccessible = (stepId: number) => stepId <= currentStep;
  const progress = (currentStep / wizardSteps.length) * 100;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <div className="h-fit lg:sticky lg:top-6 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2"><CardTitle className="text-lg">Setup</CardTitle><Badge variant="outline" className="text-xs">{currentStep}/{wizardSteps.length}</Badge></div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="mt-2">{Math.round(progress)}% completed</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-1">
            {wizardSteps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = isStepCompleted(step.id);
              const isAccessible = isStepAccessible(step.id);
              const isLast = index === wizardSteps.length - 1;
              return (
                <div key={step.id} className="relative">
                  {!isLast && <div className={cn("absolute left-5 top-12 w-0.5 h-10 -z-10 transition-colors duration-300", isCompleted ? "bg-primary" : "bg-border")} />}
                  <button onClick={() => isAccessible && setCurrentStep(step.id)} disabled={!isAccessible} className={cn("w-full text-left p-3 rounded-lg transition-all duration-300 flex items-start gap-3 group", isActive && "bg-muted border-2 border-primary shadow-sm", !isActive && isAccessible && "hover:bg-muted border-2 border-transparent", !isAccessible && "opacity-50 cursor-not-allowed border-2 border-transparent")}>
                    <div className={cn("flex-shrink-0 size-10 rounded-full flex items-center justify-center transition-all duration-300 font-medium", isCompleted && "bg-primary text-primary-foreground shadow-md", isActive && !isCompleted && "bg-muted text-primary ring-2 ring-primary", !isActive && !isCompleted && isAccessible && "bg-muted text-muted-foreground", !isAccessible && "bg-muted text-muted-foreground")}>{isCompleted ? <Check className="size-5" /> : step.icon}</div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2"><p className={cn("text-sm font-medium truncate", isActive && "text-primary", !isAccessible && "text-muted-foreground")}>{step.title}</p>{isActive && <ChevronRight className="size-4 text-primary" />}{isCompleted && !isActive && <CheckCircle2 className="size-4 text-primary" />}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="bg-muted border-dashed"><CardContent className="p-4"><div className="flex gap-2"><Lock className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" /><div className="space-y-1"><p className="text-xs font-medium">Secure Information</p><p className="text-xs text-muted-foreground">Data protected with encryption</p></div></div></CardContent></Card>
      </div>

      <div className="min-w-0">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary">{wizardSteps[currentStep - 1].icon}</div>
              <div className="flex-1"><CardTitle>{wizardSteps[currentStep - 1].title}</CardTitle><CardDescription>{wizardSteps[currentStep - 1].subtitle}</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {validationErrors.length > 0 && (
                  <motion.div variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={getTransition('fast')}>
                    <Alert variant="destructive"><AlertCircle className="size-4" /><AlertDescription><ul className="list-disc pl-4 space-y-1">{validationErrors.map((e, i) => <li key={i} className="text-sm">{e}</li>)}</ul></AlertDescription></Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={currentStep} variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={getTransition('normal')}>
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2"><Label>Username *</Label><Input placeholder="user123" value={wizardData.nombreUsuario} onChange={(e) => updateWizardData("nombreUsuario", e.target.value)} /></div>
                      <div className="space-y-2"><Label>Corporate Email *</Label><Input type="email" placeholder="user@company.com" value={wizardData.emailUsuario} onChange={(e) => updateWizardData("emailUsuario", e.target.value)} /></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Password *</Label><Input type="password" placeholder="••••••••" value={wizardData.passwordUsuario} onChange={(e) => updateWizardData("passwordUsuario", e.target.value)} /></div>
                        <div className="space-y-2"><Label>Confirm *</Label><Input type="password" placeholder="••••••••" value={wizardData.confirmPassword} onChange={(e) => updateWizardData("confirmPassword", e.target.value)} /></div>
                      </div>
                      <div className="space-y-2"><Label>Role *</Label><RadioGroup value={wizardData.rolUsuario} onValueChange={(v) => updateWizardData("rolUsuario", v)}>{[{v:"administrador",l:"Administrator",d:"Full control"},{v:"gestor",l:"Invoice Manager",d:"Operations management"},{v:"contador",l:"Accountant",d:"Accounting review"}].map(r=><div key={r.v} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted"><RadioGroupItem value={r.v} id={r.v}/><Label htmlFor={r.v} className="cursor-pointer flex-1"><span className="font-medium">{r.l}</span><p className="text-xs text-muted-foreground">{r.d}</p></Label></div>)}</RadioGroup></div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Company Name *</Label><Input placeholder="Company S.A.S." value={wizardData.nombreEmpresa} onChange={(e) => updateWizardData("nombreEmpresa", e.target.value)} /></div>
                        <div className="space-y-2"><Label>NIT *</Label><Input placeholder="900.123.456-7" value={wizardData.nitEmpresa} onChange={(e) => updateWizardData("nitEmpresa", e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Sector *</Label><Select value={wizardData.sectorEmpresa} onValueChange={(v) => updateWizardData("sectorEmpresa", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["Technology","Manufacturing","Commerce","Services","Construction","Healthcare"].map(s=><SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}</SelectContent></Select></div>
                        <div className="space-y-2"><Label>Size *</Label><Select value={wizardData.tamanoEmpresa} onValueChange={(v) => updateWizardData("tamanoEmpresa", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="micro">Micro (1-10)</SelectItem><SelectItem value="pequena">Small (11-50)</SelectItem><SelectItem value="mediana">Medium (51-200)</SelectItem><SelectItem value="grande">Large (200+)</SelectItem></SelectContent></Select></div>
                      </div>
                      <div className="space-y-2"><Label>Address</Label><Textarea placeholder="123 Main St" value={wizardData.direccionEmpresa} onChange={(e) => updateWizardData("direccionEmpresa", e.target.value)} rows={2} /></div>
                      <div className="space-y-2"><Label>Phone</Label><Input type="tel" placeholder="+57 1 234 5678" value={wizardData.telefonoEmpresa} onChange={(e) => updateWizardData("telefonoEmpresa", e.target.value)} /></div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Monthly Volume *</Label><Select value={wizardData.volumenMensual} onValueChange={(v) => updateWizardData("volumenMensual", v)}><SelectTrigger><SelectValue placeholder="Range" /></SelectTrigger><SelectContent><SelectItem value="0-50m">$0 - $50M</SelectItem><SelectItem value="50-100m">$50 - $100M</SelectItem><SelectItem value="100-500m">$100 - $500M</SelectItem><SelectItem value="500m+">$500M+</SelectItem></SelectContent></Select></div>
                        <div className="space-y-2"><Label>Average Term *</Label><Select value={wizardData.plazoPromedio} onValueChange={(v) => updateWizardData("plazoPromedio", v)}><SelectTrigger><SelectValue placeholder="Term" /></SelectTrigger><SelectContent><SelectItem value="30">30 days</SelectItem><SelectItem value="60">60 days</SelectItem><SelectItem value="90">90 days</SelectItem><SelectItem value="120">120 days</SelectItem></SelectContent></Select></div>
                      </div>
                      <div className="space-y-2"><Label>Service Type *</Label><RadioGroup value={wizardData.serviceType} onValueChange={(v) => updateWizardData("serviceType", v)}>{[{v:"con-recurso",l:"With Recourse",d:"Maintains responsibility in case of non-payment"},{v:"sin-recurso",l:"Without Recourse",d:"Full risk transfer to the factor"}].map(t=><div key={t.v} className="border rounded-lg p-4 hover:bg-muted"><div className="flex items-center space-x-2"><RadioGroupItem value={t.v} id={t.v}/><Label htmlFor={t.v} className="cursor-pointer flex-1"><span className="font-medium">{t.l}</span><p className="text-xs text-muted-foreground mt-1">{t.d}</p></Label></div></div>)}</RadioGroup></div>
                      <div className="space-y-2"><Label>Payment Method *</Label><Select value={wizardData.metodoPago} onValueChange={(v) => updateWizardData("metodoPago", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="transferencia">Bank Transfer</SelectItem><SelectItem value="ach">ACH</SelectItem><SelectItem value="cheque">Check</SelectItem></SelectContent></Select></div>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <Alert className="bg-card border-primary"><CheckCircle2 className="size-4 text-primary" /><AlertDescription>Review the information before finishing</AlertDescription></Alert>
                      <div className="space-y-4">
                        {[{icon:<User className="size-4" />,title:"Account",items:[["User",wizardData.nombreUsuario],["Email",wizardData.emailUsuario],["Role",wizardData.rolUsuario]]},{icon:<Building2 className="size-4" />,title:"Company",items:[["Company Name",wizardData.nombreEmpresa],["NIT",wizardData.nitEmpresa],["Sector",wizardData.sectorEmpresa]]},{icon:<CreditCard className="size-4" />,title:"Billing",items:[["Volume",wizardData.volumenMensual],["Term",wizardData.plazoPromedio+" days"],["Type",wizardData.serviceType]]}].map(s=>(
                          <div key={s.title} className="rounded-lg border p-4 bg-muted">
                            <h4 className="font-medium mb-3 flex items-center gap-2"><span className="text-muted-foreground">{s.icon}</span>{s.title}</h4>
                            <div className="space-y-2 text-sm">{s.items.map(([k,v])=><div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}:</span><span className="font-medium">{v || "—"}</span></div>)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center pt-6 border-t">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}><ArrowLeft className="size-4 mr-2" />Previous</Button>
                {currentStep < wizardSteps.length ? (
                  <Button onClick={handleNext}>Next<ChevronRight className="size-4 ml-1" /></Button>
                ) : (
                  <Button onClick={handleFinish}><Check className="size-4 mr-2" />Finish</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function MultiStepWizardVerticalPage() {
  return (
    <ComponentShowcase
      title="Multi-Step Wizard (Vertical)"
      description="Advanced wizard with per-step validation, vertical stepper sidebar, animated transitions, and completion review. 4 steps: Account → Company → Billing → Verification. Features locked step progression, validation errors display, connecting lines between steps, and a security info card."
      category="Patterns"
      preview={<MultiStepWizardVerticalDemo />}
      code={`// Vertical wizard with validation
// Layout: [Sidebar 320px] [Content 1fr]
// Steps locked until previous step validated

<div className="grid lg:grid-cols-[320px_1fr] gap-6">
  {/* Sticky vertical stepper */}
  <Card>
    <Progress value={progress} />
    {steps.map(step => (
      <StepButton
        locked={!isStepAccessible(step.id)}
        completed={isStepCompleted(step.id)}
      />
    ))}
  </Card>

  {/* Content with validation */}
  <Card>
    {validationErrors.length > 0 && <Alert variant="destructive" />}
    <AnimatePresence mode="wait">
      {currentStep === 1 && <AccountForm />}
      {currentStep === 2 && <CompanyForm />}
      {currentStep === 3 && <BillingForm />}
      {currentStep === 4 && <ReviewSummary />}
    </AnimatePresence>
  </Card>
</div>`}
      props={[
        { name: "(self-contained)", type: "—", description: "Internal state management with per-step validation. No external props." },
      ]}
      examples={[]}
    />
  );
}
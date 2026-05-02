import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Tabs, TabsContent } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Badge } from "../ui/Badge";
import { Separator } from "../ui/Separator";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  { id: "info", label: "Basic Information", icon: "1" },
  { id: "details", label: "Financial Details", icon: "2" },
  { id: "documents", label: "Documentation", icon: "3" },
  { id: "review", label: "Review", icon: "4" },
];

export function MultiStepWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <CardTitle>Cessiones Application</CardTitle>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`flex size-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "border-primary bg-primary text-primary-foreground"
                          : isActive
                          ? "border-primary bg-background text-primary"
                          : "border-muted bg-background text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="size-5" />
                      ) : (
                        <span className="font-medium">{step.icon}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-xs font-medium ${
                          isActive || isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <Separator
                      className={`flex-1 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={steps[currentStep].id} className="w-full">
          {/* Step 1: Basic Information */}
          <TabsContent value="info" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="E.g.: ABC Corp Inc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nit">NIT</Label>
                  <Input id="nit" placeholder="900123456-7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+57 310 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@empresa.co"
                />
              </div>
            </div>
          </TabsContent>

          {/* Step 2: Financial Details */}
          <TabsContent value="details" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Requested Amount</Label>
                <Input id="amount" placeholder="$50,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="120">120 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Financing Purpose</Label>
                <Textarea
                  id="purpose"
                  placeholder="Briefly describe the use of funds..."
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          {/* Step 3: Documents */}
          <TabsContent value="documents" className="space-y-4 mt-0">
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                Please attach the following documents:
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Circle className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Original Invoice</p>
                      <p className="text-xs text-muted-foreground">
                        PDF format
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Circle className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">
                        Debt Certificate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF format
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Circle className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Company Tax ID</p>
                      <p className="text-xs text-muted-foreground">
                        PDF format
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Step 4: Review */}
          <TabsContent value="review" className="space-y-4 mt-0">
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Application Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company:</span>
                      <span className="font-medium">ABC Corp Inc.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax ID:</span>
                      <span className="font-medium">900.123.456-7</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term:</span>
                      <span className="font-medium">90 days</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Documents:
                      </span>
                      <Badge variant="outline" className="text-xs">3 files</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-base text-muted-foreground">
                  By submitting this application, I confirm that all information
                  provided is accurate and I authorize the necessary
                  verifications.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button>Submit Application</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
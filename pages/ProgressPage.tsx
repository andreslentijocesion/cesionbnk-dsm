import { ComponentShowcase } from "../components/ui/component-showcase";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { AlertTriangle, Calendar, Clock, AlertCircle } from "lucide-react";

export function ProgressPage() {
  // Helper to calculate progress based on dates
  // In a real app, 'current' would be new Date()
  const calculateProgress = (start: string, end: string, current: string) => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const currentDate = new Date(current).getTime();
    
    if (currentDate <= startDate) return 0;
    if (currentDate >= endDate) return 100;
    
    return Math.round(((currentDate - startDate) / (endDate - startDate)) * 100);
  };

  // Mock Data
  const startDate = "2025-01-01";
  const endDate = "2025-12-31";
  
  // Scenario 1: Normal progress (Early)
  const currentNormal = "2025-04-15";
  const progressNormal = calculateProgress(startDate, endDate, currentNormal);

  // Scenario 2: Warning progress (Approaching deadline)
  const currentWarning = "2025-10-15";
  const progressWarning = calculateProgress(startDate, endDate, currentWarning);

  // Scenario 3: Critical progress (Deadline imminent)
  const currentCritical = "2025-12-25";
  const progressCritical = calculateProgress(startDate, endDate, currentCritical);

  // Helper for dynamic colors
  const getProgressColor = (value: number) => {
    if (value >= 90) return "[&_[data-slot=progress-indicator]]:!bg-red-600";
    if (value >= 75) return "[&_[data-slot=progress-indicator]]:!bg-orange-500";
    return "";
  };

  return (
    <ComponentShowcase
      title="Progress"
      description="Displays an indicator showing the completion progress of a task."
      category="Feedback"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <Progress value={60} />
      }
      
      // Main Code
      code={`import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={60} />
}`}
      
      // Props Documentation
      props={[
        {
          name: "value",
          type: "number",
          description: "The progress value (0-100).",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Different Values",
          description: "Progress bars at various completion levels.",
          preview: (
            <div className="space-y-6 w-full max-w-md">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>25%</span>
                  <span className="text-muted-foreground">Loading...</span>
                </div>
                <Progress value={25} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>50%</span>
                  <span className="text-muted-foreground">In Progress</span>
                </div>
                <Progress value={50} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>75%</span>
                  <span className="text-muted-foreground">Almost Done</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>100%</span>
                  <span className="text-muted-foreground">Complete</span>
                </div>
                <Progress value={100} />
              </div>
            </div>
          ),
          code: `<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`
        },
        {
          title: "Deadline Awareness",
          description: "Progress bars that change color and state as the deadline approaches.",
          preview: (
            <div className="space-y-8 w-full max-w-md">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Q1 Project Phase</div>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{startDate} - {endDate}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{progressNormal}%</span>
                </div>
                <Progress value={progressNormal} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Q4 Marketing Campaign</div>
                    <div className="flex items-center text-xs text-orange-600 dark:text-orange-400 gap-2 font-medium">
                      <Clock className="h-3 w-3" />
                      <span>Due soon ({currentWarning})</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{progressWarning}%</span>
                </div>
                <Progress value={progressWarning} className={getProgressColor(progressWarning)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Year End Closing</span>
                      <Badge variant="destructive" className="h-5 px-1.5 text-xs gap-1 font-medium">
                        <AlertTriangle className="h-3 w-3" />
                        CRITICAL
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-destructive gap-2 font-medium">
                      <AlertCircle className="h-3 w-3" />
                      <span>Deadline imminent ({currentCritical})</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-destructive">{progressCritical}%</span>
                </div>
                <Progress value={progressCritical} className={getProgressColor(progressCritical)} />
                <p className="text-xs text-destructive font-medium pt-1">
                  Warning: Less than 10% of time remaining!
                </p>
              </div>
            </div>
          ),
          code: `// ... helper function getProgressColor
<Progress value={progress} className={getProgressColor(progress)} />`
        }
      ]}
    />
  );
}
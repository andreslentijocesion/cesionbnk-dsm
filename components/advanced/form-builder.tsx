import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  GripVertical, Trash2, Type, Mail, Phone, Calendar, CheckSquare, List,
  FileText, Plus, Columns, Hash, Lock, Link, Upload, Sliders, Circle,
  Clock, Search, Star, CalendarClock, X,
} from "lucide-react";
import { cn } from "../ui/utils";

const FIELD_TYPES = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "password", label: "Password", icon: Lock },
  { type: "number", label: "Number", icon: Hash },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "url", label: "URL", icon: Link },
  { type: "search", label: "Search", icon: Search },
  { type: "date", label: "Date", icon: Calendar },
  { type: "time", label: "Time", icon: Clock },
  { type: "datetime", label: "Date & Time", icon: CalendarClock },
  { type: "textarea", label: "Text Area", icon: FileText },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "radio", label: "Radio Group", icon: Circle },
  { type: "select", label: "Select", icon: List },
  { type: "file", label: "File Upload", icon: Upload },
  { type: "range", label: "Range Slider", icon: Sliders },
  { type: "rating", label: "Rating", icon: Star },
];

interface FormField {
  id: string;
  type: "text" | "email" | "password" | "number" | "phone" | "url" | "search" | "date" | "time" | "datetime" | "textarea" | "checkbox" | "radio" | "select" | "file" | "range" | "rating";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  columns: number;
  min?: number;
  max?: number;
  step?: number;
}

function FieldTypeItem({ type, label, icon: Icon }: { type: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD_TYPE",
    item: { fieldType: type, label },
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  }));
  return (
    <div ref={drag} className={cn("flex items-center gap-3 p-3 border rounded-lg cursor-move transition-all hover:border-primary hover:bg-accent", isDragging && "opacity-50")}>
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function FormFieldItem({ field, index, moveField, deleteField, updateField }: {
  field: FormField; index: number;
  moveField: (f: number, t: number) => void;
  deleteField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_FIELD", item: { index },
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  }));
  const [, drop] = useDrop(() => ({
    accept: "FORM_FIELD",
    hover: (item: { index: number }) => {
      if (item.index !== index) { moveField(item.index, index); item.index = index; }
    },
  }));

  const columnWidths = [{ value: 12, label: "Full" }, { value: 6, label: "Half" }, { value: 4, label: "1/3" }, { value: 3, label: "1/4" }];

  return (
    <div ref={(node) => drag(drop(node))} className={cn("group flex items-start gap-3 p-4 border rounded-lg bg-card transition-all hover:border-primary", isDragging && "opacity-50")}>
      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move mt-1" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Label className="font-medium">{field.label}</Label>
          {field.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Width:</span>
          <div className="flex gap-1">
            {columnWidths.map((width) => (
              <Button key={width.value} variant={field.columns === width.value ? "default" : "outline"} size="sm" className="h-7 px-2 text-xs"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); updateField(field.id, { columns: width.value }); }}>
                {width.label}
              </Button>
            ))}
          </div>
        </div>
        {field.type === "text" && <Input placeholder={field.placeholder || "Enter text..."} disabled />}
        {field.type === "email" && <Input type="email" placeholder={field.placeholder || "email@example.com"} disabled />}
        {field.type === "password" && <Input type="password" placeholder="••••••••" disabled />}
        {field.type === "number" && <Input type="number" placeholder={field.placeholder || "Enter number..."} disabled />}
        {field.type === "phone" && <Input type="tel" placeholder={field.placeholder || "+1 (555) 000-0000"} disabled />}
        {field.type === "url" && <Input type="url" placeholder={field.placeholder || "https://example.com"} disabled />}
        {field.type === "search" && <Input type="search" placeholder={field.placeholder || "Search..."} disabled />}
        {field.type === "date" && <Input type="date" disabled />}
        {field.type === "time" && <Input type="time" disabled />}
        {field.type === "datetime" && <Input type="datetime-local" disabled />}
        {field.type === "textarea" && <Textarea placeholder={field.placeholder || "Enter details..."} disabled />}
        {field.type === "file" && <Input type="file" disabled />}
        {field.type === "range" && (
          <div className="space-y-2">
            <Input type="range" min={field.min || 0} max={field.max || 100} step={field.step || 1} disabled />
            <div className="flex justify-between text-xs text-muted-foreground"><span>{field.min || 0}</span><span>{field.max || 100}</span></div>
          </div>
        )}
        {field.type === "rating" && (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-5 w-5 text-muted-foreground" />)}
          </div>
        )}
        {(field.type === "checkbox" || field.type === "radio" || field.type === "select") && (
          <div className="space-y-2">
            {field.options?.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2">
                {field.type !== "select" && <input type={field.type === "checkbox" ? "checkbox" : "radio"} disabled className="h-4 w-4" name={field.id} />}
                <Input value={option} onChange={(e) => {
                  const newOptions = [...(field.options || [])];
                  newOptions[optIndex] = e.target.value;
                  updateField(field.id, { options: newOptions });
                }} className="flex-1 h-8" placeholder="Option text" />
                <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => { e.stopPropagation(); updateField(field.id, { options: field.options?.filter((_, i) => i !== optIndex) }); }} className="h-8 w-8 p-0">
                  <X className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={(e: React.MouseEvent) => { e.stopPropagation(); updateField(field.id, { options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] }); }} className="w-full h-8 text-xs">
              <Plus className="h-3 w-3 mr-1" /> Add Option
            </Button>
          </div>
        )}
      </div>
      <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => { e.stopPropagation(); deleteField(field.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

function FormCanvas({ onDrop, fields, moveField, deleteField, updateField }: {
  onDrop: (fieldType: string, label: string) => void;
  fields: FormField[];
  moveField: (f: number, t: number) => void;
  deleteField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD_TYPE",
    drop: (item: { fieldType: string; label: string }) => onDrop(item.fieldType, item.label),
    collect: (monitor: any) => ({ isOver: monitor.isOver() }),
  }));
  return (
    <div ref={drop} className={cn("min-h-[400px] rounded-lg transition-all p-4", isOver && "bg-muted ring-2 ring-primary ring-inset")}>
      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[380px] border-2 border-dashed rounded-lg border-muted">
          <Plus className="h-12 w-12 mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-center">Drag and drop fields here to build your form</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {fields.map((field, index) => {
            const colSpanClass = field.columns === 3 ? "col-span-12 md:col-span-3" : field.columns === 4 ? "col-span-12 md:col-span-4" : field.columns === 6 ? "col-span-12 md:col-span-6" : "col-span-12";
            return (
              <div key={field.id} className={colSpanClass}>
                <FormFieldItem field={field} index={index} moveField={moveField} deleteField={deleteField} updateField={updateField} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (fieldType: string, label: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: fieldType as FormField["type"],
      label, placeholder: `Enter ${label.toLowerCase()}...`,
      required: false, columns: 12,
    };
    if (fieldType === "radio") newField.options = ["Yes", "No"];
    else if (fieldType === "checkbox") newField.options = ["Option 1", "Option 2", "Option 3"];
    else if (fieldType === "select") newField.options = ["Option 1", "Option 2", "Option 3"];
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) =>
    setFields((prev) => prev.map((f) => f.id === id ? { ...f, ...updates } : f));

  const deleteField = (id: string) => setFields((prev) => prev.filter((f) => f.id !== id));

  const moveField = (fromIndex: number, toIndex: number) => {
    setFields((prev) => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= prev.length || toIndex >= prev.length) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Field Types</CardTitle>
              <CardDescription>Drag fields to build your form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {FIELD_TYPES.map((ft) => <FieldTypeItem key={ft.type} type={ft.type} label={ft.label} icon={ft.icon} />)}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-9 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Form Builder</CardTitle>
                  <CardDescription>{fields.length === 0 ? "Start by dragging fields from the left panel" : `${fields.length} field${fields.length !== 1 ? "s" : ""} added`}</CardDescription>
                </div>
                {fields.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => alert("Code generation not available in preview")}>Generate Code</Button>
                    <Button variant="outline" onClick={() => setFields([])}>Clear All</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <FormCanvas onDrop={addField} fields={fields} moveField={moveField} deleteField={deleteField} updateField={updateField} />
            </CardContent>
          </Card>
          {fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
                <CardDescription>How your form will look with column layout</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-12 gap-4">
                    {fields.map((field) => {
                      const colSpanClass = field.columns === 3 ? "col-span-12 md:col-span-3" : field.columns === 4 ? "col-span-12 md:col-span-4" : field.columns === 6 ? "col-span-12 md:col-span-6" : "col-span-12";
                      return (
                        <div key={field.id} className={cn("space-y-2", colSpanClass)}>
                          <Label>{field.label}{field.required && <span className="text-destructive ml-1">*</span>}</Label>
                          {field.type === "text" && <Input placeholder={field.placeholder} />}
                          {field.type === "email" && <Input type="email" placeholder={field.placeholder} />}
                          {field.type === "password" && <Input type="password" placeholder={field.placeholder} />}
                          {field.type === "number" && <Input type="number" placeholder={field.placeholder} />}
                          {field.type === "phone" && <Input type="tel" placeholder={field.placeholder} />}
                          {field.type === "url" && <Input type="url" placeholder={field.placeholder} />}
                          {field.type === "search" && <Input type="search" placeholder={field.placeholder} />}
                          {field.type === "date" && <Input type="date" />}
                          {field.type === "time" && <Input type="time" />}
                          {field.type === "datetime" && <Input type="datetime-local" />}
                          {field.type === "textarea" && <Textarea placeholder={field.placeholder} />}
                          {field.type === "file" && <Input type="file" />}
                          {field.type === "range" && <Input type="range" min={field.min || 0} max={field.max || 100} />}
                          {field.type === "rating" && <div className="flex items-center gap-1">{[1,2,3,4,5].map((s) => <Star key={s} className="h-5 w-5 cursor-pointer text-muted-foreground" />)}</div>}
                          {(field.type === "checkbox" || field.type === "radio") && (
                            <div className="space-y-2">
                              {field.options?.map((option, i) => <div key={i} className="flex items-center gap-2"><input type={field.type === "checkbox" ? "checkbox" : "radio"} className="h-4 w-4" name={field.id} /><span className="text-sm">{option}</span></div>)}
                            </div>
                          )}
                          {field.type === "select" && (
                            <select className="w-full p-2 border rounded-md">
                              <option>Select an option...</option>
                              {field.options?.map((opt, i) => <option key={i}>{opt}</option>)}
                            </select>
                          )}
                        </div>
                      );
                    })}
                    <div className="col-span-12 mt-2"><Button type="submit">Submit Form</Button></div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
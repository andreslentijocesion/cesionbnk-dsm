import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Mail, Phone, User, Building, MessageSquare, Send, CheckCircle } from "lucide-react";

/**
 * BUSINESS PATTERN - Contact Form
 *
 * Professional contact form with validation.
 * Includes customizable fields, validation, and success/error states.
 *
 * Location../components/patterns/contact-form.tsx
 * Category: Business Components - High Priority
 * Usage: Landing pages, contact pages, lead generation forms
 */

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  showCompany?: boolean;
  showSubject?: boolean;
  submitButtonText?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  acceptTerms: boolean;
}

export function ContactForm({
  onSubmit,
  showCompany = true,
  showSubject = true,
  submitButtonText = "Send Message",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    if (onSubmit) onSubmit(formData);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", acceptTerms: false });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-12 pb-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="size-8 text-success-on-subtle" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. We will get back to you soon.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Contact Form
            </CardTitle>
            <CardDescription>Fill out the form and we will get in touch with you</CardDescription>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Response in 24h</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="size-4" /> Full name *
              </Label>
              <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className={errors.name ? "border-red-500" : ""} />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="size-4" /> Email *
              </Label>
              <Input id="email" type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="size-4" /> Phone
              </Label>
              <Input id="phone" type="tel" placeholder="+1 555 123 4567" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
            {showCompany && (
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="size-4" /> Company
                </Label>
                <Input id="company" placeholder="Company name" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} />
              </div>
            )}
          </div>
          {showSubject && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value: string) => handleChange("subject", value)}>
                <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="cessiones">Cessiones Services</SelectItem>
                  <SelectItem value="demo">Request Demo</SelectItem>
                  <SelectItem value="soporte">Technical Support</SelectItem>
                  <SelectItem value="ventas">Sales</SelectItem>
                  <SelectItem value="otro">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} className={errors.message ? "border-red-500" : ""} />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            <p className="text-xs text-muted-foreground">Minimum 10 characters</p>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={(checked: boolean | "indeterminate") => handleChange("acceptTerms", checked as boolean)} className={errors.acceptTerms ? "border-red-500" : ""} />
            <div className="space-y-1">
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                I accept the <a href="#" className="text-primary hover:underline">terms and conditions</a> and the <a href="#" className="text-primary hover:underline">privacy policy</a>
              </Label>
              {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? <>Sending...</> : <><Send className="size-4" />{submitButtonText}</>}
          </Button>
          <p className="text-xs text-center text-muted-foreground">* Required fields. We will respond within 24 business hours.</p>
        </form>
      </CardContent>
    </Card>
  );
}
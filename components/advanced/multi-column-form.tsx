import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

interface FormData {
  firstName?: string; lastName?: string; email?: string; phone?: string; dateOfBirth?: string;
  street?: string; city?: string; state?: string; zipCode?: string; country?: string;
  companyName?: string; jobTitle?: string; industry?: string; companySize?: string;
  linkedIn?: string; website?: string; notes?: string;
}

export function MultiColumnForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => setFormData({ ...formData, [field]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({}); }, 2000);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Multi-Column Form</CardTitle>
            <CardDescription>Responsive layout that adapts to screen size</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">Responsive</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="font-bold">Successfully Submitted!</h3>
            <p className="text-sm text-muted-foreground">Your information has been saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div><h3 className="font-semibold">Personal Information</h3><p className="text-sm text-muted-foreground">Tell us about yourself</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                  <Input id="firstName" value={formData.firstName || ""} onChange={(e) => updateField("firstName", e.target.value)} placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                  <Input id="lastName" value={formData.lastName || ""} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" value={formData.dateOfBirth || ""} onChange={(e) => updateField("dateOfBirth", e.target.value)} />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div><h3 className="font-semibold">Address</h3><p className="text-sm text-muted-foreground">Where are you located?</p></div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" value={formData.street || ""} onChange={(e) => updateField("street", e.target.value)} placeholder="123 Main Street, Apt 4B" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city || ""} onChange={(e) => updateField("city", e.target.value)} placeholder="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={(value: string) => updateField("state", value)}>
                      <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" value={formData.zipCode || ""} onChange={(e) => updateField("zipCode", e.target.value)} placeholder="94102" maxLength={5} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(value: string) => updateField("country", value)}>
                    <SelectTrigger id="country"><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div><h3 className="font-semibold">Company Information</h3><p className="text-sm text-muted-foreground">Optional - Tell us about your work</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" value={formData.companyName || ""} onChange={(e) => updateField("companyName", e.target.value)} placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" value={formData.jobTitle || ""} onChange={(e) => updateField("jobTitle", e.target.value)} placeholder="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value: string) => updateField("industry", value)}>
                    <SelectTrigger id="industry"><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value: string) => updateField("companySize", value)}>
                    <SelectTrigger id="companySize"><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div><h3 className="font-semibold">Additional Information</h3><p className="text-sm text-muted-foreground">Optional - Help us know you better</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input id="linkedIn" type="url" value={formData.linkedIn || ""} onChange={(e) => updateField("linkedIn", e.target.value)} placeholder="https://linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input id="website" type="url" value={formData.website || ""} onChange={(e) => updateField("website", e.target.value)} placeholder="https://johndoe.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" value={formData.notes || ""} onChange={(e) => updateField("notes", e.target.value)} placeholder="Anything else you'd like to share..." rows={4} />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 md:flex-initial md:px-8">Submit Form</Button>
              <Button type="button" variant="outline" onClick={() => setFormData({})}>Clear Form</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">Fields marked with <span className="text-destructive">*</span> are required</p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
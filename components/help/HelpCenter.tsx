import { useState } from "react";
import { BookOpen, HelpCircle, Video, FileText, Search, ExternalLink } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "../ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface HelpCenterProps {
  /**
   * Show as button in header (default) or sidebar link
   */
  variant?: "header" | "sidebar";
}

export function HelpCenter({ variant = "header" }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // FAQ Data
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I register my company on the platform?",
          answer: "To register your company, navigate to the 'Onboarding' section and complete the multi-step form with your company information, legal representative details, and required documents. The process typically takes 10-15 minutes.",
        },
        {
          question: "What documents are required for registration?",
          answer: "You'll need: 1) Tax Registration Certificate (RUT), 2) Certificate of Existence and Legal Representation, 3) Legal Representative's ID, 4) Bank certification letter, and 5) Financial statements (last 6 months).",
        },
        {
          question: "How long does the approval process take?",
          answer: "Once you submit your complete application, our team reviews it within 24-48 business hours. You'll receive an email notification when your account is approved.",
        },
      ],
    },
    {
      category: "Cessiones Operations",
      questions: [
        {
          question: "How do I register an invoice for assignment?",
          answer: "Go to the Operations section, click 'Register New Invoice', and fill in the invoice details including debtor information, amount, and due date. Upload the invoice document (PDF format) and submit for review.",
        },
        {
          question: "What is the maximum assignment amount?",
          answer: "The assignment limit depends on your company's credit assessment. You can view your available credit limit in the Dashboard. Contact support to request a limit increase.",
        },
        {
          question: "How quickly can I receive funds?",
          answer: "Once your invoice is approved, funds are typically transferred to your registered bank account within 24 hours during business days.",
        },
        {
          question: "What fees are charged for cessiones?",
          answer: "Fees are calculated based on the invoice amount and days until maturity. You can see the exact fee breakdown before confirming each operation. Typical rates range from 1.5% to 3% monthly.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I update my company information?",
          answer: "Navigate to Settings > Company Profile to update your company details. Note that changes to legal information may require document verification.",
        },
        {
          question: "How can I change my bank account?",
          answer: "Go to Settings > Banking Information. You'll need to provide a new bank certification letter. Changes are reviewed by our team before activation.",
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we use bank-level encryption (SSL/TLS) for all data transmission. Your financial information is stored securely and never shared with third parties without your consent.",
        },
      ],
    },
  ];

  // Guides Data
  const guides = [
    {
      title: "Quick Start Guide",
      description: "Everything you need to know to get started with CESIONBNK",
      icon: BookOpen,
      duration: "5 min read",
      badge: "Popular",
    },
    {
      title: "Understanding Cessiones Fees",
      description: "Learn how assignment fees are calculated and optimized",
      icon: FileText,
      duration: "3 min read",
      badge: null,
    },
    {
      title: "Document Requirements Guide",
      description: "Complete list of required documents and format specifications",
      icon: FileText,
      duration: "4 min read",
      badge: null,
    },
    {
      title: "Best Practices for Invoice Management",
      description: "Tips to maximize your operational efficiency",
      icon: BookOpen,
      duration: "6 min read",
      badge: "Recommended",
    },
  ];

  // Video Tutorials Data
  const videos = [
    {
      title: "How to Register Your Company",
      description: "Step-by-step video tutorial for company registration",
      duration: "5:30",
      thumbnail: "registration",
    },
    {
      title: "Registering Your First Invoice",
      description: "Complete walkthrough of the invoice registration process",
      duration: "4:15",
      thumbnail: "invoice",
    },
    {
      title: "Understanding Your Dashboard",
      description: "Overview of key metrics and features in your dashboard",
      duration: "3:45",
      thumbnail: "dashboard",
    },
    {
      title: "Managing Multiple Invoices",
      description: "Learn how to efficiently manage and track multiple invoices",
      duration: "6:20",
      thumbnail: "management",
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  const TriggerButton = variant === "header" ? (
    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
      <HelpCircle className="h-4 w-4" />
      <span>Help</span>
    </button>
  ) : (
    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
      <HelpCircle className="h-4 w-4" />
      <span>Help Center</span>
    </button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild id="tour-app-help">
        {TriggerButton}
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-secondary">
            Help Center
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Find answers, guides, and tutorials to help you get the most out of CESIONBNK
          </SheetDescription>
        </SheetHeader>

        {/* Search Bar */}
        <div className="mt-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs for different help sections */}
        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mb-6">
            <TabsTrigger value="faqs" className="text-xs">
              FAQs
            </TabsTrigger>
            <TabsTrigger value="guides" className="text-xs">
              Guides
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs">
              Videos
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            {searchQuery && filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
              </div>
            ) : (
              (searchQuery ? filteredFaqs : faqs).map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {category.category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIdx) => (
                      <AccordionItem
                        key={faqIdx}
                        value={`item-${idx}-${faqIdx}`}
                        className="border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  {idx < faqs.length - 1 && <Separator className="mt-6" />}
                </div>
              ))
            )}
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-4">
            {guides.map((guide, idx) => {
              const IconComponent = guide.icon;
              return (
                <Card
                  key={idx}
                  className="p-4 hover:border-primary cursor-pointer transition-all hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-foreground">
                          {guide.title}
                        </h4>
                        {guide.badge && (
                          <Badge variant="neutral-soft-outline">
                            {guide.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{guide.duration}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            {videos.map((video, idx) => (
              <Card
                key={idx}
                className="p-4 hover:border-primary cursor-pointer transition-all hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-14 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    <Video className="h-6 w-6 text-primary" />
                    <span className="absolute bottom-1 right-1 text-xs bg-background/90 px-1 rounded text-foreground">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-foreground mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Separator className="my-6" />
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold text-sm text-foreground mb-2">
            Still need help?
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Our support team is available Monday to Friday, 8am - 6pm
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="flex-1 px-3 py-2 text-xs border border-border rounded-md hover:bg-muted transition-colors">
              Email Us
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
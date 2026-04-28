// Tour step definitions for different pages

export interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
  };
}

// Onboarding Form Tour
export const vinculacionTourSteps: TourStep[] = [
  {
    element: "#tour-step-welcome",
    popover: {
      title: "Welcome to the Onboarding Form!",
      description: "This guided tour will help you understand how to complete the company registration process step by step.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-step-nit",
    popover: {
      title: "Step 1: Company NIT",
      description: "Enter your company's Tax Identification Number (NIT) without the verification digit. This is a required field.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-step-company-name",
    popover: {
      title: "Step 2: Company Name",
      description: "Enter the legal name of your company exactly as it appears on official documents.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-step-legal-rep",
    popover: {
      title: "Step 3: Legal Representative",
      description: "Provide information about the company's legal representative, including their ID type and number.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#tour-step-documents",
    popover: {
      title: "Step 4: Required Documents",
      description: "Upload the necessary legal documents. Accepted formats: PDF, JPG, PNG. Maximum size: 5MB per file.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#tour-step-bank-info",
    popover: {
      title: "Step 5: Banking Information",
      description: "Enter your company's bank account details for financial operations.",
      side: "top",
      align: "start",
    },
  },
  {
    element: "#tour-step-submit",
    popover: {
      title: "Ready to Submit!",
      description: "Review all the information carefully. You can use the 'Previous' button to go back and make changes, or click 'Next' to proceed.",
      side: "top",
      align: "start",
    },
  },
];

// Operations Dashboard Tour
export const factoringDashboardTourSteps: TourStep[] = [
  {
    element: "#tour-dashboard-welcome",
    popover: {
      title: "Welcome to Operations Dashboard",
      description: "Here you can manage all your operations, invoices, and track your financial status.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-dashboard-stats",
    popover: {
      title: "Key Metrics",
      description: "View your most important metrics at a glance: total assigned amount, pending approvals, and available credit.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-dashboard-invoices",
    popover: {
      title: "Invoice Management",
      description: "Access and manage all your invoices. You can filter by status, date, or amount.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#tour-dashboard-actions",
    popover: {
      title: "Quick Actions",
      description: "Use these shortcuts to register a new invoice, request funding, or download reports.",
      side: "left",
      align: "start",
    },
  },
];

// General App Tour
export const generalAppTourSteps: TourStep[] = [
  {
    element: "#tour-app-sidebar",
    popover: {
      title: "Navigation Menu",
      description: "Use the sidebar to navigate between different sections: Dashboard, Operations, Onboarding, and more.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#tour-app-help",
    popover: {
      title: "Help Center",
      description: "Click here anytime to access the help center with FAQs, guides, and video tutorials.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "#tour-app-notifications",
    popover: {
      title: "Notifications",
      description: "Stay updated with important alerts about your invoices, approvals, and system updates.",
      side: "bottom",
      align: "end",
    },
  },
];

// Driver.js configuration
export const driverConfig = {
  showProgress: true,
  nextBtnText: "Next →",
  prevBtnText: "← Previous",
  doneBtnText: "Got it!",
  popoverClass: "driver-popover-custom",
  overlayColor: "rgba(0, 0, 0, 0.75)",
  smoothScroll: true,
  animate: true,
  allowClose: true,
  onDestroyed: () => {
    console.log("Tour completed");
  },
};
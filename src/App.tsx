import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import PersonalLoanList from "./pages/PersonalLoanList";
import ContactUs from "./pages/ContactUs";
import CreditScoreArticle from "./pages/articles/CreditScoreArticle";
import FirstHomeLoanArticle from "./pages/articles/FirstHomeLoanArticle";
import InvestmentTipsArticle from "./pages/articles/InvestmentTipsArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get the base path dynamically for GitHub Pages deployment
const getBasePath = (): string => {
  // Check if we're running on GitHub Pages (not localhost)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Extract the base path from the pathname
    // For https://username.github.io/repo-name/, this returns "/repo-name"
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    return pathSegments.length > 0 ? `/${pathSegments[0]}` : '';
  }
  return '';
};

const basename = getBasePath();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/personal-loan-list" element={<PersonalLoanList />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/articles/credit-score" element={<CreditScoreArticle />} />
              <Route path="/articles/first-home-loan" element={<FirstHomeLoanArticle />} />
              <Route path="/articles/investment-tips" element={<InvestmentTipsArticle />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

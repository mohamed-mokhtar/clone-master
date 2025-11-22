import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import PersonalLoanList from "./pages/PersonalLoanList";
import ContactUs from "./pages/ContactUs";
import CreditScoreArticle from "./pages/articles/CreditScoreArticle";
import FirstHomeLoanArticle from "./pages/articles/FirstHomeLoanArticle";
import InvestmentTipsArticle from "./pages/articles/InvestmentTipsArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
  </QueryClientProvider>
);

export default App;

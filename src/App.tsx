import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "@/components/ScrollProgress";
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
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    return pathSegments.length > 0 ? `/${pathSegments[0]}` : '';
  }
  return '';
};

const basename = getBasePath();

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/personal-loan-list" element={<PersonalLoanList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/articles/credit-score" element={<CreditScoreArticle />} />
          <Route path="/articles/first-home-loan" element={<FirstHomeLoanArticle />} />
          <Route path="/articles/investment-tips" element={<InvestmentTipsArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <ScrollProgress />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
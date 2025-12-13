import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import PremiumPortfolio from "./pages/PremiumPortfolio";
import AdminReviews from "./pages/AdminReviews";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    // Force dark mode for the portfolio
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PremiumPortfolio />} />
              <Route path="/simple" element={<Index />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;

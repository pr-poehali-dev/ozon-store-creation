
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import ProductDetail2 from "./pages/ProductDetail2";
import ProductDetail3 from "./pages/ProductDetail3";
import ProductDetail4 from "./pages/ProductDetail4";
import ProductDetail5 from "./pages/ProductDetail5";
import ProductDetail6 from "./pages/ProductDetail6";
import ProductDetail7 from "./pages/ProductDetail7";
import ProductDetail8 from "./pages/ProductDetail8";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/1" element={<ProductDetail />} />
          <Route path="/product/2" element={<ProductDetail2 />} />
          <Route path="/product/3" element={<ProductDetail3 />} />
          <Route path="/product/4" element={<ProductDetail4 />} />
          <Route path="/product/5" element={<ProductDetail5 />} />
          <Route path="/product/6" element={<ProductDetail6 />} />
          <Route path="/product/7" element={<ProductDetail7 />} />
          <Route path="/product/8" element={<ProductDetail8 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

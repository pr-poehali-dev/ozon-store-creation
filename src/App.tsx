import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { CartProvider, useCart } from "@/context/CartContext";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import PrintCalculatorPage from "./pages/PrintCalculatorPage";
import ReviewsPage from "./pages/ReviewsPage";
import DeliveryPage from "./pages/DeliveryPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import WholesalePage from "./pages/WholesalePage";
import LegalPage from "./pages/LegalPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetail from "./pages/ProductDetail";
import ProductDetail2 from "./pages/ProductDetail2";
import ProductDetail3 from "./pages/ProductDetail3";
import ProductDetail4 from "./pages/ProductDetail4";
import ProductDetail5 from "./pages/ProductDetail5";
import ProductDetail6 from "./pages/ProductDetail6";
import ProductDetail7 from "./pages/ProductDetail7";
import ProductDetail8 from "./pages/ProductDetail8";
import ProductDetail9 from "./pages/ProductDetail9";
import ProductDetail10 from "./pages/ProductDetail10";
import ProductDetail11 from "./pages/ProductDetail11";
import ProductDetail12 from "./pages/ProductDetail12";
import ProductDetail13 from "./pages/ProductDetail13";
import ProductDetail14 from "./pages/ProductDetail14";
import ProductDetail15 from "./pages/ProductDetail15";
import ProductDetail16 from "./pages/ProductDetail16";
import ProductDetail17 from "./pages/ProductDetail17";
import ProductDetail18 from "./pages/ProductDetail18";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";

const queryClient = new QueryClient();

const PRODUCT_PAGES = [
  ProductDetail, ProductDetail2, ProductDetail3, ProductDetail4, ProductDetail5, ProductDetail6,
  ProductDetail7, ProductDetail8, ProductDetail9, ProductDetail10, ProductDetail11, ProductDetail12,
  ProductDetail13, ProductDetail14, ProductDetail15, ProductDetail16, ProductDetail17, ProductDetail18,
];

const Page = ({ children }: { children: ReactNode }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  return (
    <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
      {children}
    </Layout>
  );
};

const AppContent = () => {
  const { addToCart } = useCart();

  return (
    <Routes>
      <Route path="/" element={<Page><HomePage onAddToCart={addToCart} /></Page>} />
      <Route path="/catalog" element={<Page><CatalogPage onAddToCart={addToCart} /></Page>} />
      <Route path="/print-calculator" element={<Page><PrintCalculatorPage /></Page>} />
      <Route path="/reviews" element={<Page><ReviewsPage /></Page>} />
      <Route path="/delivery" element={<Page><DeliveryPage /></Page>} />
      <Route path="/about" element={<Page><AboutPage /></Page>} />
      <Route path="/contacts" element={<Page><ContactsPage /></Page>} />
      <Route path="/wholesale" element={<Page><WholesalePage /></Page>} />
      <Route path="/privacy" element={<Page><LegalPage type="privacy" /></Page>} />
      <Route path="/offer" element={<Page><LegalPage type="offer" /></Page>} />
      <Route path="/returns" element={<Page><LegalPage type="returns" /></Page>} />
      <Route path="/payment-success" element={<Page><PaymentSuccessPage /></Page>} />
      <Route path="/profile" element={<Page><ProfilePage /></Page>} />
      {PRODUCT_PAGES.map((Component, i) => (
        <Route key={i + 1} path={`/product/${i + 1}`} element={<Page><Component /></Page>} />
      ))}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

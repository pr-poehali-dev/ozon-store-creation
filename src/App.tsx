import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ReviewsPage from "./pages/ReviewsPage";
import DeliveryPage from "./pages/DeliveryPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetail from "./pages/ProductDetail";
import ProductDetail2 from "./pages/ProductDetail2";
import ProductDetail3 from "./pages/ProductDetail3";
import ProductDetail4 from "./pages/ProductDetail4";
import ProductDetail5 from "./pages/ProductDetail5";
import ProductDetail6 from "./pages/ProductDetail6";
import ProductDetail7 from "./pages/ProductDetail7";
import ProductDetail8 from "./pages/ProductDetail8";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

const queryClient = new QueryClient();

const AppContent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <HomePage onAddToCart={addToCart} />
        </Layout>
      } />
      <Route path="/catalog" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <CatalogPage onAddToCart={addToCart} />
        </Layout>
      } />
      <Route path="/reviews" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <ReviewsPage />
        </Layout>
      } />
      <Route path="/delivery" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <DeliveryPage />
        </Layout>
      } />
      <Route path="/about" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <AboutPage />
        </Layout>
      } />
      <Route path="/contacts" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <ContactsPage />
        </Layout>
      } />
      <Route path="/profile" element={
        <Layout cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart}>
          <ProfilePage />
        </Layout>
      } />
      <Route path="/product/1" element={<ProductDetail />} />
      <Route path="/product/2" element={<ProductDetail2 />} />
      <Route path="/product/3" element={<ProductDetail3 />} />
      <Route path="/product/4" element={<ProductDetail4 />} />
      <Route path="/product/5" element={<ProductDetail5 />} />
      <Route path="/product/6" element={<ProductDetail6 />} />
      <Route path="/product/7" element={<ProductDetail7 />} />
      <Route path="/product/8" element={<ProductDetail8 />} />
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
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
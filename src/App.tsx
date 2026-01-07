import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import EnquiryModal from "./components/EnquiryModal";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Achievements from "./pages/Achievements";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdmissionForm from "./pages/AdmissionForm";

const queryClient = new QueryClient();

// Layout wrapper to hide header/footer on admin routes
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Show enquiry modal after 5 seconds on home page
  // Disabled for now - can be enabled by uncommenting
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     const timer = setTimeout(() => setIsEnquiryOpen(true), 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [location.pathname]);

  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AuthProvider>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onEnquireClick={() => setIsEnquiryOpen(true)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admission-form" element={<AdmissionForm />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

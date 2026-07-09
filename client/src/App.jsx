import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { Curtains } from "./components/Curtains";
import Contact from "./pages/Contact";
import Shop from "./components/Shop";
import ProductDetail from "./components/ProductDetail";

import { CartProvider } from "./context/CartContext"; // Import your provider
import FloatingCart from "./components/FloatingCart"; // Import the floating UI
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConsultationPage from "./pages/ConsultationPage";


export default function App() {
  const location = useLocation();

  // Define the routes that should trigger the curtain
  const isWhitePage =
    location.pathname === "/about" ||
    location.pathname === "/selected-projects" ||
    location.pathname.startsWith("/project/") ||
    location.pathname === "/shop" ||
    location.pathname.startsWith("/shop/") ||
    location.pathname === "/cart";

  // LOGIC: Only show curtains if we are NOT on a project detail page or shop detail page
  // This ensures that when you click a project, the curtain doesn't trigger.
  // 1. Define the pages where you WANT the curtain
  const curtainAllowedRoutes = [
    "/",
    "/about",
    "/contact",
    "/int-shop",
    "/selected-projects"
  ];

  // 2. Determine if current path is in that list
  const shouldShowCurtain = curtainAllowedRoutes.includes(location.pathname);

  return (
    <CartProvider>
      <div className={`relative min-h-screen ${isWhitePage ? "bg-white" : "bg-[#0A0A0A]"} overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>

        {!isWhitePage && <div className="noise-bg" />}

        {/* Use the conditional check here */}
        {shouldShowCurtain && <Curtains location={location} />}

        <FloatingCart />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/selected-projects" element={<Projects />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/int-shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </CartProvider>
  );
}
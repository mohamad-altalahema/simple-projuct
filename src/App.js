import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import { CartProvider } from "./context/cartContext";
import SingleProduct from "./pages/SingleProduct";
function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

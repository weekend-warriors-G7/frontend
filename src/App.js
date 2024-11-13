//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./routes/authentify/RegisterForm";
import LoginForm from "./routes/authentify/LoginForm";
import HeaderTest from "./components/HeaderTest";
import ProductDashboard from "./routes/ProductDashboard";
import Product from "./domain/Product";
import ProductList from "./routes/ProductList";
import AddProductForm from "./routes/AddProductForm";

function App() {
  const testProduct = new Product(
    1,
    "https://www.stormtech.ca/cdn/shop/products/KNC-2W_FRONT_GreyHeather.jpg?v=1687462614&width=2400",
    "Cardigan",
    50,
    "This is a beautiful, well-tailored cardigan.",
    "M",
    "top",
    "cotton",
    "grey"
  );
  const testProductList = [
    testProduct,
    testProduct,
    testProduct,
    testProduct,
    testProduct,
    testProduct,
    testProduct,
    testProduct,
  ];

  return (
    <BrowserRouter>
      <HeaderTest />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route
          path="products/:id"
          element={<ProductDashboard product={testProduct} />}
        />
        <Route
          path="products/"
          element={<ProductList productList={testProductList} />}
        />
        <Route path="add-product" element={<AddProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

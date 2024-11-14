//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./routes/authentify/RegisterForm";
import LoginForm from "./routes/authentify/LoginForm";
import HeaderTest from "./components/HeaderTest";
import ProductDashboard from "./routes/ProductDashboard";
import ProductList from "./routes/ProductList";
import AddProductForm from "./routes/AddProductForm";

function App() {

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
          element={<ProductDashboard />}
        />
        <Route
          path="products/"
          element={<ProductList />}
        />
        <Route path="products/add" element={<AddProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

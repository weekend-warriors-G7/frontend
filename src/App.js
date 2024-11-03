//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./routes/authentify/RegisterForm";
import LoginForm from "./routes/authentify/LoginForm";
import HeaderTest from "./components/HeaderTest";

function App() {
  return (
      <BrowserRouter>
          <HeaderTest/>
          <Routes>
              <Route path="register" element={<RegisterForm />}/>
              <Route path="login" element={<LoginForm />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;

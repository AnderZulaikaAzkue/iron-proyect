import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AuthStore from './contexts/AuthStore';

function App() {
  return (
    <>
      <AuthStore>
        <Navbar />
        <div className="container py-3">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </AuthStore>
    </>
  );
}

export default App;

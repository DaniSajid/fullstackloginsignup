import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/HomeComp";
import LoginComp from "./loginSignup/LoginComp";
import SignupComp from "./loginSignup/SignupComp";
import HeaderComp from "./header/HeaderComp";
import FooterComp from "./footer/FooterComp";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComp />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <LoginComp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <SignupComp />
              </ProtectedRoute>
            }
          />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
}

export default App;

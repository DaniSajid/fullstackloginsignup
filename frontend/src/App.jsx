import {BrowserRouter ,Route, Routes } from "react-router-dom"
import HomeComp from "./pages/HomeComp"
import LoginComp from "./loginSignup/LoginComp"
import SignupComp from "./loginSignup/SignupComp"
import HeaderComp from "./header/HeaderComp"
import FooterComp from "./footer/FooterComp"

function App() {
 

  return (
    <>
      <BrowserRouter>
      <HeaderComp/>
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/register" element={<SignupComp />} />
        </Routes>
        <FooterComp/>
      </BrowserRouter>
    </>
  )
}

export default App

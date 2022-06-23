import SignIn from "./pages/SignIn";
import Create from "./pages/SignUp";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Error from "./pages/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/create" element={<Create />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/error" element={<Error />} />
        <Route path="/about.json" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

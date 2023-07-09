import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, MainPage, Menu, About, Booking } from "./components";
const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-table" element={<Booking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

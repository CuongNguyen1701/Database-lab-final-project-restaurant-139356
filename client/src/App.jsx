import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Navbar,
  MainPage,
  Menu,
  About,
  Booking,
  NotFound,
  ChatBot,
  Signup,
  AddDish,
} from "./components";
const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 no-scrollbar">
        <Navbar />
        <ChatBot />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-table" element={<Booking />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin/add-dish" element={<AddDish />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

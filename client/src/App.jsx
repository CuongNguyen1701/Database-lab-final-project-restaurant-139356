import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
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
  AdminHomepage,
} from "./components";
const ToggleAdminButton = ({ setValue }) => {
  return (
    <button
      className="fixed p-3 bg-yellow-300 self-center right-0 top-1/2 z-50 text-primary font-bold rounded-full border-primary border-4"
      onClick={(e) => {
        e.preventDefault();
        setValue((oldValue) => !oldValue);
        console.log(`Admin Mode changed!`);
      }}
    >
      Toggle Admin
    </button>
  );
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <BrowserRouter>
      <div className="relative z-0  overflow-scroll no-scrollbar h-screen">
        <Navbar isAdmin={isAdmin} />
        <ChatBot />
        <ToggleAdminButton setValue={setIsAdmin} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-table" element={<Booking />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={!isAdmin ? <Navigate to="/" /> : <Outlet />}
          >
            <Route index element={<AdminHomepage />} />
            <Route path="add-dish" element={<AddDish />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

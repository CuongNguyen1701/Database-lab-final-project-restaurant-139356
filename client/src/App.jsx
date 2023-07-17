import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Navbar,
  MainPage,
  Menu,
  About,
  Booking,
  NotFound,
  ChatBot,
  ShoppingCart,
  Signup,
  AddDish,
  AdminHomepage,
  UserPage,
  LoginSuccess,
  Footer,
} from "./components";
import { ShopButton } from "./components/Buttons";
import { loadCartData, storeCartData } from "./storage-managers/shoppingCart";
import { loadUserData, storeUserData } from "./storage-managers/userData";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const addToCart = (item) => {
    console.log(cartItems);
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Item already exists in the cart, update the quantity
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist in the cart, add it
      const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
    console.log(`Item added to cart!`);
  };
  const deleteFromCart = (item) => {
    //delete item from cart
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    console.log(`Item deleted from cart!`);
  };
  const updateQuantity = (item, quantity) => {
    //update quantity of item in cart
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: quantity } : cartItem
    );
    setCartItems(updatedCartItems);
    console.log(`Item quantity updated!`);
  };
  //Get cart items from local storage
  useEffect(() => {
    const loadedCartData = loadCartData();
    setCartItems(loadedCartData ? loadedCartData : []);
    const loadedUserData = loadUserData();
    setUserData(loadedUserData ? loadedUserData : null);
  }, []);

  //Store cart items to local storage
  useEffect(() => {
    if (cartItems?.length === 0) return;
    // Store the updated cart data
    storeCartData(cartItems);
  }, [cartItems]);
  return (
    <BrowserRouter>
      <div className="relative z-0  overflow-scroll no-scrollbar h-screen">
        <Navbar
          isAdmin={isAdmin}
          setUserData={setUserData}
          userData={userData}
        />
        <ChatBot />
        <ShopButton
          itemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        />
        <ToggleAdminButton setValue={setIsAdmin} />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MainPage />
                <Menu addToCart={addToCart} />
                <About />
                <Booking />
              </div>
            }
          />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-table" element={<Booking />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                deleteFromCart={deleteFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route path="/user" element={<UserPage userData={userData} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/login/success"
            element={<LoginSuccess setUserData={setUserData} />}
          />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={!isAdmin ? <Navigate to="/" /> : <Outlet />}
          >
            <Route index element={<AdminHomepage />} />
            <Route path="add-dish" element={<AddDish />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

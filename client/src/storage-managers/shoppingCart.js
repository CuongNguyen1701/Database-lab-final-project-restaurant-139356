// Function to load cart data
const loadCartData = () => {
  // Retrieve the cart data from local storage
  const cartDataString = localStorage.getItem("cartData");
  // Parse the JSON string to convert it back to an object
  const cartData = JSON.parse(cartDataString);
  // Return the cart data
  return cartData;
};

// Function to store cart data
const storeCartData = (cartData) => {
  // Convert cartData to JSON string
  const cartDataString = JSON.stringify(cartData);
  // Store the cart data in local storage
  localStorage.setItem("cartData", cartDataString);
};
export { loadCartData, storeCartData };

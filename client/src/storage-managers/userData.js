const loadUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};
const storeUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};
export { loadUserData, storeUserData };

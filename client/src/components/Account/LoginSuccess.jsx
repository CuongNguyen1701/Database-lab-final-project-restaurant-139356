import { useEffect } from "react";
import { loadUserData, storeUserData } from "../../storage-managers/userData";
const LoginSuccess = () => {
  const fetchUserData = async ({ setUserData }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/current_user`,
        {
          credentials: "include",
        }
      );
      const json_data = await response.json();
      console.log(json_data);
      setUserData(json_data);
      storeUserData(json_data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return <div></div>;
};

export default LoginSuccess;

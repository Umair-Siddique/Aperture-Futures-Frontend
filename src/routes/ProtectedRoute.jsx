import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import LoadingScreen from "../components/LoadingScreen";

const ProtectedRoute = () => {
  const { user, authChecked } = useAuth();
  console.log(user, "this is user");
  console.log(authChecked, "this is authChecked");

  if (!authChecked) return <LoadingScreen />;

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;

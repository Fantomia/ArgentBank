import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => { 
  const token = useSelector((state) => state.auth.token); 

  return token ? children : <Navigate to="/login" replace />; // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
};

export default PrivateRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!allowedRoles.includes(user.role)) {
      navigate("/unauthorized"); 
    }
  }, [user, allowedRoles, navigate]); 

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

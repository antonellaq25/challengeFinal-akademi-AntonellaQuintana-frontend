import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <AppRoutes user={user} />
    </BrowserRouter>
  );
}

export default App;

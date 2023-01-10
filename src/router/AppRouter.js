import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Main from "../pages/Main";
import ChatDetail from "../pages/ChatDetail";
import Register from "../pages/Register";

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);

  function PrivateRouter() {
    if (currentUser) {
      if (
        currentUser.email === process.env.REACT_APP_email1 ||
        currentUser.email === process.env.REACT_APP_email2
      ) {
        return <ChatDetail />;
      } else {
        return <Main />;
      }
    } else {
      <Navigate to="/login" replace />;
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/chat" element={<PrivateRouter />}> */}
        {/* <Route path="" element={<ChatDetail />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

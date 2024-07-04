import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Restaurant from "./pages/Restaurant";
import { AuthProvider } from "./authContext";
import AddCategory from "./pages/AddCategory";
import AddMenuItem from "./pages/AddMenuItem";
import SeeComments from "./pages/SeeComments";
import SeeReservations from "./pages/SeeRezervations";
import SeeMenu from "./pages/SeeMenu";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/restaurant"
              element={
                <PrivateRoute>
                  <Restaurant />
                </PrivateRoute>
              }
            />
            <Route
              path="/addcategory"
              element={
                <PrivateRoute>
                  <AddCategory />
                </PrivateRoute>
              }
            />
            <Route
              path="/addmenuitem"
              element={
                <PrivateRoute>
                  <AddMenuItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/seecomments"
              element={
                <PrivateRoute>
                  <SeeComments />
                </PrivateRoute>
              }
            />
            <Route
              path="/seerezervations"
              element={
                <PrivateRoute>
                  <SeeReservations />
                </PrivateRoute>
              }
            />
            <Route
              path="/seemenu"
              element={
                <PrivateRoute>
                  <SeeMenu />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

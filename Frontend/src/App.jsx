import Dashboard from "./componets/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./componets/Signin";
import { Signup } from "./componets/Signup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/Dashboard"
            element={
              isLoggedIn ? (
                <Dashboard></Dashboard>
              ) : (
                <Navigate to="/" replace></Navigate>
              )
            }
          ></Route>
          <Route
            path="/"
            element={<Signin setLoggedIn={setLoggedIn}></Signin>}
          ></Route>
          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn}></Signup>}
          ></Route>
          <Route
            path="/sigin"
            element={<Signin setLoggedIn={setLoggedIn}></Signin>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

 import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

/*login routs*/

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRouts from "./components/admin/private_routs/PrivateRouts";
import Account from "./components/admin/Account";
import Register from "./components/admin/Register";
import Login from "./components/admin/Login";

import "./App.css";

// const App = () => {
//   return (
//     <Home/>
//   );
// };

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <AuthContextProvider>
          <Navbar />
          
          {/* <Register /> */}
          <Routes>
            {/* login register  Page Routes */}
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            {/* <Route
              path="/account"
              element={
                <PrivateRouts>
                  {" "}
                  <Account />{" "}
                </PrivateRouts>
              }
            /> */}
            <Route
              path="/home"
              element={
                <PrivateRouts>
                  {" "}
                  <Home />{" "}
              </PrivateRouts>
              }
            />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;

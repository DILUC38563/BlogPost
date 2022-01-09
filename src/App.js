import "./App.css";
import Home from "./Pages/Home/home";
import TopBar from "./Components/Topbar/TopBar";
import Single from "./Pages/single/single";
import Write from "./Pages/write/Write";
import Setting from "./Pages/settings/Setting";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";


function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/setting" element={user ? <Setting /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

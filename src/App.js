import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Event from "./Routes/Event";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription"; // profile_page
import Profile from "./Routes/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="event/:id" element={<Event />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;

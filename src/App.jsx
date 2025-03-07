import "./global.scss";
import "./styles/mainPage.scss";
import Header from "./components/header";
import LobbyPage from "./pages/lobby";
import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import AccountPage from "./pages/accounts";


import { Routes, Route, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LobbyPage />} />
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

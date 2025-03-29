import "./global.scss";
import "./styles/mainPage.scss";
import Header from "./components/header";
import LobbyPage from "./pages/lobby";
import LoginPage from "./login";
import ProfilePage from "./pages/profile";
import AccountPage from "./pages/accounts";
import EditPage from "./pages/accounts/edit";

import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegistrationPage from "./registration";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reg" element={<RegistrationPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LobbyPage />} />
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="accounts/edit" element={<EditPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

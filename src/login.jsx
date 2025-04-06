import "./global.scss";
import "./styles/loginPage.scss";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "./queries/auth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useAuthUser();

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращает перезагрузку страницы

    if (username.trim() === "" || password.trim() === "") {
      toast.error("Пожалуйста, введите оба поля: Логин и Пароль.");
    } else {
      const formData = new FormData(event.currentTarget); // Достаём данные формы
      const data = Object.fromEntries(formData.entries()); // Превращаем в объект
      // toast.success('Успешный вход!');
      // navigate("/");

      // console.log(`Пользователь ${username} вошел в систему.`);

      toast.promise(mutation.mutateAsync(data), {
        loading: "Запрашиваем данные...",
        success: () => {
          navigate("/");
          return "Пользователь вошел в систему!";
        },
        error: (error) => {
          return typeof error === "string"
            ? error
            : "Ошибка при запросе данных";
        },
      });
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="login-cont">
          <HowToRegIcon sx={{ width: "40px", height: "40px" }} />
          <h1>Вход в систему</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Username">Логин</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Логин"
              name="email"
            />
            <label htmlFor="Password">Пароль</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              name="password"
            />
            <button type="submit">Войти</button>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="button-grid">
            <div className="forgot-password">
              <a href="#">Забыли пароль?</a>
            </div>
            <div className="new-profile">
              <a href="./reg">Создать профиль</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;

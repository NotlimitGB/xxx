import "./global.scss";
import "./styles/loginPage.scss";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "./queries/auth";


function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const mutation = useCreateUser();



  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращает перезагрузку страницы
    console.log(event);

    if (username.trim() === "" || password.trim() === "") {
      toast.error("Пожалуйста, введите оба поля: Логин и Пароль.");
    } else {
      // toast.success('Успешный вход!');
      // console.log(`Пользователь ${username} вошел в систему.`);
      const formData = new FormData(event.currentTarget); // Достаём данные формы
      const data = Object.fromEntries(formData.entries()); // Превращаем в объект
    

      toast.promise(
        mutation.mutateAsync(data),
        {
          loading: "Запрашиваем данные...",
          success: () => {
            navigate("/login");
            return "Регистрация прошла успешно!";
          },
          error: "Ошибка при запросе данных!",
        }
      );
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="login-cont">
          <HowToRegIcon sx={{ width: "40px", height: "40px" }} />
          <h1>Регистрация</h1>
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
            <button type="submit">Создать</button>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
          
        </div>
      </section>
    </>
  );
}

export default RegistrationPage;

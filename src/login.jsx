import './global.scss'
import './styles/loginPage.scss'

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';




function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращает перезагрузку страницы

    if (username.trim() === '' || password.trim() === '') {
      toast.error('Пожалуйста, введите оба поля: Логин и Пароль.');
    } else {
      toast.success('Успешный вход!');
      console.log(`Пользователь ${username} вошел в систему.`);
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="login-cont">
          <HowToRegIcon sx={{ width: '40px', height: '40px' }} />
          <h1>Вход в систему</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Username">Логин</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Логин"
            />
            <label htmlFor="Password">Пароль</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
            <button type="submit">Войти</button>
          </form>
          <Toaster
            position="top-right"
            reverseOrder={false} />
          <div className="forgot-password">
            <a href="#">Забыли пароль?</a>
          </div>
        </div>
      </section>
    </>

  )
}

export default LoginPage

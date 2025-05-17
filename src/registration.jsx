import './global.scss';
import './styles/loginPage.scss';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from './queries/auth';

function RegistrationPage() {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const mutation = useCreateUser();

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращает перезагрузку страницы
    console.log(event);

    if (name.trim() === '' || password.trim() === '' || email.trim() === '') {
      toast.error('Пожалуйста, введите оба поля: Логин и Пароль.');
    } else {
      // toast.success('Успешный вход!');
      // console.log(`Пользователь ${username} вошел в систему.`);
      const formData = new FormData(event.currentTarget); // Достаём данные формы
      const data = Object.fromEntries(formData.entries()); // Превращаем в объект

      toast.promise(mutation.mutateAsync(data), {
        loading: 'Запрашиваем данные...',
        success: () => {
          navigate('/login');
          return 'Регистрация прошла успешно!';
        },
        error: (error) => {
          return typeof error === 'string' ? error : 'Ошибка при запросе данных';
        },
      });
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="login-cont">
          <HowToRegIcon sx={{ width: '40px', height: '40px' }} />
          <h1>Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Имя</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя"
              name="name"
            />
            <label htmlFor="Email">Почта</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Почта"
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

// AccountPage.jsx
import React, { useRef, useState } from 'react';
import './main.scss';

import worker1 from '../../assets/worker_1.jpg';
import { useBeContractor, useGetProfile, useUploadUserAvatar } from '../../queries/user/user';
import { USER_ROLES } from '../../enum';
import { useAppContext } from '../../App';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AccountPage() {
  const fileInputRef = useRef(null);
  const uploadAvatar = useUploadUserAvatar();
  const [activeIndices, setActiveIndices] = useState([]);
  const user = useGetProfile();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const beContractor = useBeContractor();
  const { data, setData } = useAppContext();
  const queryClient = useQueryClient();

  const faqData = [
    {
      question: 'Как создать учетную запись?',
      answer:
        'Чтобы создать учетную запись, нажмите кнопку "Зарегистрироваться" и заполните форму.',
    },
    {
      question: 'Как сбросить пароль?',
      answer:
        'Перейдите на страницу входа и нажмите "Забыли пароль?". Введите свой адрес электронной почты, и мы отправим вам инструкции по сбросу.',
    },
    // Добавьте другие вопросы и ответы
  ];

  const toggleAnswer = (index) => {
    setActiveIndices((prevIndices) => {
      const indexExists = prevIndices.includes(index);
      if (indexExists) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const avatar_url = new URL(user.data?.avatar_url, apiUrl).toString();

  const onBeContractor = () => {
    toast.promise(beContractor.mutateAsync(), {
      loading: 'Запрашиваем данные...',
      success: () => {
        queryClient.invalidateQueries(`profile-${data.id}`);

        return 'Вы стали исполнителем!';
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Ошибка при запросе данных';
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    // Здесь можно добавить логику обработки файла
    if (file) {
      console.log('Выбран файл:', file.name);
      toast.promise(uploadAvatar.mutateAsync(file), {
        loading: 'Загружаем фото...',
        success: () => {
          queryClient.invalidateQueries(`profile-${data.id}`);

          return 'Фото загруженно!';
        },
        error: (error) => {
          return typeof error === 'string' ? error : 'Ошибка при загрузке фото';
        },
      });
    }
  };

  return (
    <>
      {user?.isPending && <div>Загрузка...</div>}
      {user?.data && (
        <>
          <div className="accountPage">
            {/* Профиль пользователя */}
            <div className="section profile">
              <div className="avatar">
                <button onClick={handleButtonClick} className="avatar_edit">
                  ✏️
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <img src={avatar_url} alt="Аватар пользователя" />
              </div>
              <div className="info">
                <div className="name">{user.data.name}</div>
                <div className="details">
                  <p>Email: {user.data.email}</p>
                  <p>Телефон: 89811356795</p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className="role_name">
                {user.data.role === USER_ROLES.пользователь && (
                  <button onClick={onBeContractor} className="button bt_account">
                    Стать исполнительем
                  </button>
                )}
                {user.data.role === USER_ROLES.исполнитель && <p>Вы уже исполнитель</p>}
                {user.data.role === USER_ROLES.админ && <p>Вы Админ</p>}
                {user.data.role === USER_ROLES.модератор && <p>Вы модератор</p>}
              </div>
              <div className="create_anket">
                {user.data.role === USER_ROLES.исполнитель &&
                  (user.data.contractor_id ? (
                    <Link to={`/profile/${user.data.contractor_id}`} className="button">
                      Перейти к анкете
                    </Link>
                  ) : (
                    <Link to={'/profile/add'} className="button">
                      Создать Анкету
                    </Link>
                  ))}
              </div>
            </div>

            {/* История заказов */}
            <div className="section orderHistory">
              <h2>История заказов</h2>
              <div className="order">
                <div className="orderHeader">
                  <div className="orderId">Заказ №32131</div>
                  <div className="orderDate">12.12.24</div>
                </div>
                <div className="orderDetails">
                  <div className="detail">Услуга: Чистка труб</div>
                  <div className="detail">Цена: 3000</div>
                  <div className="detail">Статус: выполненено </div>
                </div>
              </div>
            </div>

            {/* Поддержка и помощь */}
            <div className="section support">
              <h2>Поддержка и помощь</h2>
              <div className="contactInfo">
                <p>Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами:</p>
                <p>Email: support@example.com</p>
                <p>Телефон: +7 123 456 78 90</p>
              </div>

              <div className="faq-container">
                <h2>Часто задаваемые вопросы</h2>
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className={`faq-item ${activeIndices.includes(index) ? 'active' : ''}`}
                  >
                    <div className="faq-question" onClick={() => toggleAnswer(index)}>
                      <h3>{item.question}</h3>
                      <span>{activeIndices.includes(index) ? '-' : '+'}</span>
                    </div>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AccountPage;

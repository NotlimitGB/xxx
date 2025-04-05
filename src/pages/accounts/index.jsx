// AccountPage.jsx
import React, { useState } from "react";
import "./main.scss";

import worker1 from "../../assets/worker_1.jpg";

function AccountPage() {
  const [activeIndices, setActiveIndices] = useState([]);

  const faqData = [
    {
      question: "Как создать учетную запись?",
      answer:
        'Чтобы создать учетную запись, нажмите кнопку "Зарегистрироваться" и заполните форму.',
    },
    {
      question: "Как сбросить пароль?",
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

  return (
    <div className="accountPage">
      {/* Профиль пользователя */}
      <div className="section profile">
        <div className="avatar">
          <img src={worker1} alt="Аватар пользователя" />
        </div>
        <div className="info">
          <div className="name">Ванечка</div>
          <div className="details">
            <p>Email: vanech@mail.ru</p>
            <p>Телефон: 89811356795</p>
          </div>
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
          <p>
            Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с
            нами:
          </p>
          <p>Email: support@example.com</p>
          <p>Телефон: +7 123 456 78 90</p>
        </div>

        <div className="faq-container">
          <h2>Часто задаваемые вопросы</h2>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${
                activeIndices.includes(index) ? "active" : ""
              }`}
            >
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <h3>{item.question}</h3>
                <span>{activeIndices.includes(index) ? "-" : "+"}</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

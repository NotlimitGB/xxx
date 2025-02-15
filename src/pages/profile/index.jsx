import "./main.scss";
import worker1 from "../../assets/worker_1.jpg";

export default function ProfilePage() {
  return (
    <>
      <section>
        <div className="profile-cont">
          <div>
            <img src={worker1} alt="" />
          </div>
          <div className="profile-info">
            <h1>Анюта Лапусик-Мяусик</h1>
            <div>
              <p>Возраст: 45 лет</p>
              <p>Опыт работы: 20 лет</p>
              <p>Профиль: Жрица любви</p>
              <p>Услуги: Минет, анал, манал, шманал, пеггинг</p>
              <p>Доп. Услуги: Без презерватива</p>
            </div>
            <button className="edit-btn">Связаться</button>
          </div>
        </div>
      </section>
    </>
  );
}

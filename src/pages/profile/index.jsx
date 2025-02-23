import "./main.scss";
import worker1 from "../../assets/worker_1.jpg";
import worker2 from "../../assets/worker_2.jpg";
import worker3 from "../../assets/worker_3.jpg";
import worker4 from "../../assets/worker_4.jpg";

import { useState } from 'react';


export default function ProfilePage() {
  const [mainImage, setMainImage] = useState(worker1);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <>
      <section>
        <div className="profile-cont">
          <div className="profile-image">
            <img src={mainImage} alt="Profile" />
            <div className="thumbnails">
              <img
                src={worker1}
                onClick={() => handleThumbnailClick(worker1)}
              />
              <img
                src={worker2}
                onClick={() => handleThumbnailClick(worker2)}
              />
              <img
                src={worker3}
                onClick={() => handleThumbnailClick(worker3)}
              />
              <img
                src={worker4}
                onClick={() => handleThumbnailClick(worker4)}
              />
            </div>
          </div>
          <div className="profile-info">
            <span>Анюта Лапусик-Мяусик</span>
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
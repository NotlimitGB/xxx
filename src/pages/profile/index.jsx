import './main.scss';

import { useGetIDContractor } from '../../queries/models/models';

import { use, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../App';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditPage() {
  const { data, setData } = useAppContext();

  const { id } = useParams();
  const contractor_ID = useGetIDContractor(id);

  const [mainImage, setMainImage] = useState();

  const isMyProfile = useMemo(() => data.id === id, [data, id]);

  useEffect(() => {
    if (contractor_ID?.data?.images) {
      setMainImage(`${API_URL}${contractor_ID?.data?.images[0]}`);
    }
  }, [contractor_ID?.data]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  function openForm() {
    document.getElementById('myForm').style.display = 'block';
    document.querySelector('.profile-cont').style.filter = 'blur(5px)';
  }
  function closeForm() {
    document.getElementById('myForm').style.display = 'none';
    document.querySelector('.profile-cont').style.filter = 'blur(0)';
  }

  return (
    <>
      <section>
        <div className="profile-cont">
          <div className="profile-image">
            <img src={mainImage} alt="" />
            <div className="thumbnails">
              {contractor_ID?.data?.images &&
                contractor_ID?.data?.images.length &&
                contractor_ID?.data?.images.map((item) => {
                  const worker = `${API_URL}${item}`;
                  return (
                    <img
                      key={item}
                      src={worker}
                      alt=""
                      onClick={() => handleThumbnailClick(worker)}
                      className={mainImage === worker ? 'active' : ''}
                    />
                  );
                })}
            </div>
          </div>
          <div className="profile-info">
            <h2>{contractor_ID?.data?.name}</h2>
            <p>Описание: {contractor_ID?.data?.bio}</p>
            <p>Город: {contractor_ID?.data?.location}</p>
            <p>Рейтинг: {contractor_ID?.data?.rating} </p>
            <p>Стаж: {contractor_ID?.data?.experience_years}</p>
            <p>Телеграм: {contractor_ID?.data?.telegram_contact}</p>
            <p>Адресс: {contractor_ID?.data?.address}</p>

            {/* {isMyProfile ? (
              <button className="edit-btn" onClick={() => openForm()}>
                Изменить анкету
              </button>
            ) : (
              <button className="edit-btn" onClick={() => openForm()}>
                Связаться
              </button>
            )} */}
            <Link className="edit-btn" to={`/profile/edit/${id}`}>
              Изменить анкету
            </Link>
          </div>
        </div>
        <div className="form-popup" id="myForm">
          <form action="" method="POST">
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="phone">Телефон:</label>
            <input type="tel" id="phone" name="phone" required />
            <label htmlFor="text">Обращене</label>
            <input type="text" />
            <input type="submit" value="Отправить" />
          </form>
          <button type="button" className="close" onClick={() => closeForm()}>
            &times;
          </button>
        </div>
      </section>
    </>
  );
}

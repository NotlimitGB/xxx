import './main.scss';

import ClearIcon from '@mui/icons-material/Clear';

import {
  useGetIDContractor,
  useRemoveImageContractor,
  useUploadContarctorAvatar,
} from '../../queries/models/models';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../App';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Stack } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditPage() {
  const removeImage = useRemoveImageContractor();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const uploadImage = useUploadContarctorAvatar();
  const { data } = useAppContext();

  const { id } = useParams();
  const contractor_ID = useGetIDContractor(id);

  const [mainImage, setMainImage] = useState();

  const isMyProfile = useMemo(
    () => data.id === contractor_ID.data?.idUser.id,
    [data, contractor_ID.data]
  );

  useEffect(() => {
    if (contractor_ID?.data?.images) {
      setMainImage(contractor_ID?.data?.images[0]);
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    // Здесь можно добавить логику обработки файла
    if (file) {
      console.log('Выбран файл:', file.name);
      toast.promise(uploadImage.mutateAsync({ file, id }), {
        loading: 'Загружаем фото...',
        success: () => {
          queryClient.invalidateQueries(`id-model-${data.id}`);

          return 'Фото загруженно!';
        },
        error: (error) => {
          return typeof error === 'string' ? error : 'Ошибка при загрузке фото';
        },
      });
    }
  };

  const handleRemoveImage = (url) => {
    toast.promise(removeImage.mutateAsync({ id, imageUrl: url }), {
      loading: 'Удаляем фото...',
      success: () => {
        queryClient.invalidateQueries(`id-model-${id}`);

        return 'Фото удалено!';
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Ошибка при удалении фото';
      },
    });
  };

  return (
    <>
      <section>
        <div className="profile-cont">
          <div className="profile-image">
            {mainImage && (
              <button onClick={() => handleRemoveImage(mainImage)}>
                <ClearIcon />
              </button>
            )}
            <img src={new URL(mainImage, API_URL)} alt="" />
            <div className="thumbnails">
              {contractor_ID?.data?.images && contractor_ID?.data?.images.length
                ? contractor_ID?.data?.images.map((item) => {
                    const worker = new URL(item, API_URL);

                    return (
                      <button
                        style={{ all: 'unset', cursor: 'pointer' }}
                        onClick={() => handleThumbnailClick(item)}
                        key={item}
                      >
                        <img src={worker} alt="" className={mainImage === worker ? 'active' : ''} />
                      </button>
                    );
                  })
                : ''}
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

            {isMyProfile ? (
              <Stack spacing={'10px'} direction={'row'}>
                <button className="edit-btn" to={`/profile/edit/${id}`}>
                  Изменить анкету
                </button>
                {!(contractor_ID.data?.images?.length >= 5) && (
                  <button className="edit-btn" onClick={handleButtonClick}>
                    Добавить фото
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </Stack>
            ) : (
              <button className="edit-btn" onClick={() => openForm()}>
                Связаться
              </button>
            )}
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

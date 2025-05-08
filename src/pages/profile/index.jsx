import './main.scss';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  useGetIDContractor,
  useRemoveImageContractor,
  useSendContractorMessage,
  useUploadContarctorAvatar,
} from '../../queries/models/models';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../App';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditPage() {
  const sendMessage = useSendContractorMessage();

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

  const { register, handleSubmit } = useForm({
    mode: 'all',
  });

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

  const onSubmit = async (formData) => {
    console.log(formData);

    await toast.promise(
      sendMessage.mutateAsync({
        ...formData,
        contractorId: contractor_ID.data?.id,
      }),
      {
        loading: 'Отправляем сообщение',
        success: () => {
          closeForm();
          return 'Сообщение отправлено!';
        },

        error: 'Ошибка при отправки сообщения',
      }
    );
  };

  return (
    <>
      <section>
        <div className="profile-cont">
          <div className="profile-image">
            {mainImage && isMyProfile && (
              <button onClick={() => handleRemoveImage(mainImage)}>
                <DeleteForeverIcon />
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
            <h2>{contractor_ID.data?.idUser.name}</h2>
            <p>Описание: {contractor_ID?.data?.bio}</p>
            <p>Город: {contractor_ID?.data?.location}</p>
            <p>Рейтинг: {contractor_ID?.data?.rating} </p>
            <p>Стаж: {contractor_ID?.data?.experience_years}</p>
            <p>Адресс: {contractor_ID?.data?.address}</p>
            <p>Квалификация: {contractor_ID?.data?.qualification.name}</p>

            {isMyProfile ? (
              <Stack spacing={'10px'} direction={'row'}>
                <Link className="edit-btn" to={`/profile/edit/${id}`}>
                  Изменить анкету
                </Link>
                {!(contractor_ID.data?.images?.length >= 5) && (
                  <button className="edit-btn" onClick={handleButtonClick}>
                    Добавить фото
                  </button>
                )}
                {!contractor_ID.data?.is_telegram && (
                  <Link
                    className="edit-btn"
                    to={`https://t.me/taskera_dev_bot?text=/link ${contractor_ID.data?.telegram_code_link}`}
                    target="_blank"
                  >
                    Подключить уведомления в tg
                  </Link>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              {...register('name', { required: 'Описание обязательно' })}
            />
            <label htmlFor="phone">Телефон:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register('phone', { required: 'Описание обязательно' })}
            />
            <label htmlFor="text">Обращене</label>
            <input type="text" {...register('message', { required: 'Описание обязательно' })} />
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

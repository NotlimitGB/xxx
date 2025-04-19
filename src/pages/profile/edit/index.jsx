import toast from 'react-hot-toast';
import { useEditContractor, useGetIDContractor } from '../../../queries/models/models';
import './main.scss';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

export default function EditProfilePage() {
  const { id } = useParams();

  const editUser = useEditContractor();
  const contractor_ID = useGetIDContractor(id);

  const initialValues = useMemo(
    () => ({
      bio: contractor_ID.data?.bio,
      location: contractor_ID.data?.location,
      experience_years: String(contractor_ID.data?.experience_years),
      telegram_contact: contractor_ID.data?.telegram_contact,
      address: contractor_ID.data?.address,
    }),
    [contractor_ID.data]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);

    await toast.promise(
      editUser.mutateAsync({
        ...formData,
        experience_years: Number(formData.experience_years),
      }),
      {
        loading: 'Изменение профиля',
        success: (data) => {
          navigate(`/profile/${data.id}`);
          return 'Профиль изменен!';
        },

        error: 'Ошибка при изменении профиля',
      }
    );
  };

  return (
    <>
      <section className="section-edit">
        <div className="section-cont">
          <form onSubmit={handleSubmit(onSubmit)} className="form-edit">
            <div>
              <label htmlFor="bio">Описнаие</label>
              <input
                className="input-field"
                id="bio"
                type="text"
                {...register('bio', { required: 'Описание обязательно' })}
              />
              {errors.bio && <p style={{ color: 'red' }}>{errors.bio.message}</p>}
            </div>

            <div>
              <label htmlFor="location">Город</label>
              <input
                className="input-field"
                id="location"
                type="text"
                {...register('location', {
                  required: 'Город обязателен',
                })}
              />
              {errors.location && <p style={{ color: 'red' }}>{errors.location.message}</p>}
            </div>

            <div>
              <label htmlFor="experience_years">Стаж</label>
              <input
                className="input-field"
                id="experience_years"
                type="number"
                {...register('experience_years', {
                  required: 'Стаж обязательно',
                })}
              />
              {errors.experience_years && (
                <p style={{ color: 'red' }}>{errors.experience_years.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="telegram_contact">Телеграм</label>
              <input
                className="input-field"
                id="telegram_contact"
                type="text"
                {...register('telegram_contact', {
                  required: 'Телеграм обязателен',
                })}
              />
              {errors.telegram_contact && (
                <p style={{ color: 'red' }}>{errors.telegram_contact.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address">Адрес</label>
              <input
                className="input-field"
                id="address"
                type="text"
                {...register('address', {
                  required: 'Адрес обязателен',
                })}
              />
              {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
            </div>

            <button className="button accent" type="submit" disabled={!isValid || !isDirty}>
              Отправить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

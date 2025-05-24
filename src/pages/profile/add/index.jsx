import toast from 'react-hot-toast';
import { useCreateContractor, useGetAllQualifications } from '../../../queries/models/models';
import './main.scss';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function CreateProfilePage() {
  const qualifications = useGetAllQualifications();

  const createUser = useCreateContractor();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      bio: '',
      location: '',
      experience_years: 0,
      telegram_contact: '',
      address: '',
      qualification: 0,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);

    await toast.promise(
      createUser.mutateAsync({
        ...formData,
        experience_years: Number(formData.experience_years),
        qualification: Number(formData.qualification),
      }),
      {
        loading: 'Созданеи анкеты',
        success: (data) => {
          navigate(`/profile/${data.id}`);
          return 'Анкета создана';
        },

        error: 'Ошибка при создании анкеты',
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
            <div>
              <label htmlFor="qualification">Квалификация</label>
              <select
                className="input-field"
                id="qualification"
                {...register('qualification', {
                  required: 'Квалификация обязателен',
                })}
              >
                {qualifications.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
            </div>

            <button className="button accent" type="submit" disabled={!isValid}>
              Отправить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

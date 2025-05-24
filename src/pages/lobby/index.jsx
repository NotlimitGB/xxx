import './main.scss';
import { Link } from 'react-router-dom';
import { useGetAllContractors, useGetAllQualifications } from '../../queries/models/models';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

function LobbyPage() {
  const [filters, setFilters] = useState({});
  const contractors = useGetAllContractors(filters);

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const qualifications = useGetAllQualifications();

  // console.log(models_ID?.data?.data?.map((item) => [item.id](item.id)));

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
    watch, // Добавляем watch для отслеживания значений
  } = useForm({
    mode: 'onChange', // Меняем на onChange для более предсказуемого поведения
    defaultValues: {
      qualification: '0', // Делаем строкой для consistency
    },
  });

  const currentQualification = watch('qualification'); // Следим за изменением значения

  const onSubmit = async (formData) => {
    // Упрощенная логика фильтрации
    setFilters(formData.qualification === '0' ? {} : { qualification: formData.qualification });

    // Не сбрасываем форму, чтобы сохранить текущий выбор
  };

  // Дополнительно: сброс фильтров при выборе "Все"
  useEffect(() => {
    if (currentQualification === '0') {
      setFilters({});
    }
  }, [currentQualification, setFilters]);

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-edit">
            <div>
              <label htmlFor="qualification">Квалификация</label>
              <select className="input-field" id="qualification" {...register('qualification')}>
                <option value="0">Все</option>
                {qualifications.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="button accent" type="submit" disabled={!isDirty}>
              Применить фильтр
            </button>
          </form>
        </div>
        <div className="cards_cont">
          {contractors.isSuccess &&
            contractors.data &&
            contractors.data.length &&
            contractors?.data?.map((item) => (
              <Link to={`/profile/${item.id}`} key={item.id}>
                <div className="card">
                  {item.images && item.images.length && (
                    <img src={new URL(item.images[0], API_URL)} alt="" />
                  )}
                  <h2>{item.idUser.name}</h2>
                  <p>{item.bio}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export default LobbyPage;

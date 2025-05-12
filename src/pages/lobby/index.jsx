import './main.scss';
import { Link } from 'react-router-dom';
import { useGetAllContractors, useGetAllQualifications } from '../../queries/models/models';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';

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
  } = useForm({
    mode: 'all',
    defaultValues: {
      qualification: 0,
    },
  });

const onSubmit = async (formData) => {
    if (formData.qualification === 0) {
      setFilters({});
    } else {
      setFilters(formData);
    }
    reset(formData);
  };

  return (
    <>
      <section>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <SearchIcon className="search-icon" />
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-edit">
            <div>
              <label htmlFor="qualification">Квалификация</label>
              <select className="input-field" id="qualification" {...register('qualification', {})}>
                <option value={0}>Все</option>
                {qualifications.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="button accent" type="submit" disabled={!isDirty}>
              Отправить
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

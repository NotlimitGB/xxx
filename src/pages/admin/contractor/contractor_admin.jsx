// import './main.scss';
// import { Link } from 'react-router-dom';
// import { useGetAllContractors, useGetAllQualifications } from '../../queries/models/models';
// import SearchIcon from '@mui/icons-material/Search';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAcceptContractor, useGetAllContractorsAncet } from '../../../queries/admin/contractor';

export default function AdminPageContractors() {
  const allContractors = useGetAllContractorsAncet();
  const acceptContractor = useAcceptContractor();
  const onBanUser = (contractor_id) => {
    toast.promise(acceptContractor.mutateAsync({ contractor_id }), {
      loading: 'Запрашиваем данные...',
      success: () => {
        return 'Пользователь вошел в систему!';
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Ошибка при запросе данных';
      },
    });
  };
  console.log(allContractors.data);

  return (
    <>
      <section>
        <div className="user_list_cont">
          <div className="user_list">
            <ul>
              {allContractors.isSuccess &&
                allContractors.data &&
                allContractors.data.length &&
                allContractors?.data?.map((item) => (
                  <li key={`user-${item.id}`}>
                    <h2>{item.idUser?.name}</h2>
                    <p>Описание: {item?.data?.bio}</p>
                    <p>Город: {item.location}</p>
                    <p>Рейтинг: {item.rating} </p>
                    <p>Стаж: {item.experience_years}</p>
                    <p>Адресс: {item.address}</p>
                    <button onClick={() => onBanUser(item?.id)}>Ban</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

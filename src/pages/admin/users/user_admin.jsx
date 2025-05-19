import './main.scss';
// import { Link } from 'react-router-dom';
// import { useGetAllContractors, useGetAllQualifications } from '../../queries/models/models';
// import SearchIcon from '@mui/icons-material/Search';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsers, usePutUserBan } from '../../../queries/admin/users.js';
import toast from 'react-hot-toast';

export default function AdminPageUsers() {
  const allUsers = useGetAllUsers();
  const banUser = usePutUserBan();
  const onBanUser = (user_id) => {
    toast.promise(banUser.mutateAsync({ body: { reason: 'Плохо себя вёл' }, user_id }), {
      loading: 'Запрашиваем данные...',
      success: () => {
        return 'Пользователь вошел в систему!';
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Ошибка при запросе данных';
      },
    });
  };
  console.log(allUsers.data);

  return (
    <>
      <section>
        <div className="user_list_cont">
          <div className="user_list">
            <ul>
              {allUsers.isSuccess &&
                allUsers.data &&
                allUsers.data.length &&
                allUsers?.data?.map((item) => (
                  <li key={`user-${item.id}`}>
                    <span>{item?.name}</span>
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

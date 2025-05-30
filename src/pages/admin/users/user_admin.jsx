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
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminPageUsers() {
  const allUsers = useGetAllUsers();
  const banUser = usePutUserBan();
  const queryClient = useQueryClient();
  const onBanUser = (user_id) => {
    toast.promise(banUser.mutateAsync({ body: { reason: 'Плохо себя вёл' }, user_id }), {
      loading: 'Запрашиваем данные...',
      success: () => {
        queryClient.invalidateQueries(['all-models']);
        return `Пользователь  заблокирован`;
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Пользователь уже заблокирован';
      },
    });
  };
  console.log(allUsers.data);

  return (
    <>
      <section>
        <div className="user_list_cont">
          <ul>
            <li>
              <span>Имя</span>
              <span>Почта</span>
              <span>Роль</span>
            </li>
          </ul>
          <div className="user_list">
            <ul>
              {allUsers.isSuccess &&
                allUsers.data &&
                allUsers.data.length &&
                allUsers?.data?.map((item) => (
                  <li key={`user-${item.id}`} className={item.isBanned ? 'banned-user' : ''}>
                    <span>{item?.name}</span>
                    <span>{item?.email}</span>
                    <span>{item?.role}</span>

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

import './main.scss';

import toast from 'react-hot-toast';
import { useAcceptContractor, useGetAllContractorsAncet } from '../../../queries/admin/contractor';

export default function AdminPageContractors() {
  const allContractors = useGetAllContractorsAncet();
  const acceptContractor = useAcceptContractor();
  const onBanUser = (contractor_id) => {
    toast.promise(acceptContractor.mutateAsync({ contractor_id }), {
      loading: 'Запрашиваем данные...',
      success: () => {
        return 'Анкета опубликована!';
      },
      error: (error) => {
        return typeof error === 'string' ? error : 'Ошибка при публикации анкеты';
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
                    <h2>Имя: {item.idUser?.name}</h2>
                    <p>Описание: {item?.bio}</p>
                    <p>Город: {item.location}</p>
                    <p>Стаж: {item.experience_years}</p>
                    <p>Адресс: {item.address}</p>
                    <button className="bt_contract" onClick={() => onBanUser(item?.id)}>
                      Опубликовать
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

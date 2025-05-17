import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Stack } from '@mui/material';
import './main.scss';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../App';
import { USER_ROLES } from '../../enum';

export default function Header() {
  const { data, setData } = useAppContext();

  const PAGES_MENU = [
    {
      title: 'Главная',
      path: '/',
    },

    {
      title: 'Аккаунт',
      path: '/accounts',
    },
    ...(data.role === USER_ROLES.админ
      ? [
          {
            title: 'Пользователи',
            path: '/admin/users',
          },

          {
            title: 'Исполнители',
            path: '/admin/contractors',
          },
        ]
      : []),
  ];
  return (
    <>
      <div className="header-cont">
        <header>
          <h1>Taskera</h1>
          <Stack spacing={3} direction={'row'} component="nav">
            {PAGES_MENU.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </Stack>
          <Link to={'/login'}>
            <AccountCircleOutlinedIcon className="Icon" sx={{ width: '40px', height: '40px' }} />
          </Link>
        </header>
      </div>
    </>
  );
}

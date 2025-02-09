import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Stack } from '@mui/material';
import './main.scss'

const PAGES_MENU = [
    {
        title: 'Главная',
        path: '/',
    },
    {
        title: 'Навигация',
        path: '#',
    },
    {
        title: 'Аккаунт',
        path: '#',
    },
]


export default function Header() {
    return (
        <>
            <div className='header-cont'>
                <header>
                    <h1>XXX</h1>
                    <Stack spacing={3} direction={'row'} component="nav">
                        {PAGES_MENU.map((item, index) => {
                            return (
                                <a href={item.path} key={index}>
                                    {item.title}
                                </a>
                            )
                        })}
                    </Stack>
                    <AccountCircleOutlinedIcon sx={{ width: '40px', height: '40px' }} />
                </header>
            </div>
        </>)
}
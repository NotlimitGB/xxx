import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack } from "@mui/material";
import "./main.scss";
import { Link } from "react-router-dom";

const PAGES_MENU = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Навигация",
    path: "#",
  },
  {
    title: "Аккаунт",
    path: "/accounts",
  },
];

export default function Header() {
  return (
    <>
      <div className="header-cont">
        <header>
          <h1>Taskera</h1>
          <Stack spacing={3} direction={"row"} component="nav">
            {PAGES_MENU.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </Stack>
          <Link to={"/login"}>
            <AccountCircleOutlinedIcon
              className="Icon"
              sx={{ width: "40px", height: "40px" }}
            />
          </Link>
        </header>
      </div>
    </>
  );
}

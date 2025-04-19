import "./main.scss";
import { Link } from "react-router-dom";
import { useGetAllContractors } from "../../queries/models/models";
import SearchIcon from "@mui/icons-material/Search";

function LobbyPage() {
  const contractors = useGetAllContractors();
  // console.log(models_ID?.data?.data?.map((item) => [item.id](item.id)));

  return (
    <>
      <section>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <SearchIcon className="search-icon" />
        </div>
        <div className="cards_cont">
          {contractors.isSuccess &&
            contractors.data &&
            contractors.data.length &&
            contractors?.data?.map((item) => (
              <Link to={`/profile/${item.id}`} key={item.id}>
                <div className="card">
                  {item.images && item.images.length && (
                    <img
                      src={`http://localhost:3000${item.images[0]}`}
                      alt=""
                    />
                  )}
                  <h2>{item.name}</h2>
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

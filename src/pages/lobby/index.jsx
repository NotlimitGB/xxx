import './main.scss';
import { Link } from 'react-router-dom';
import { useGetAllContractors } from '../../queries/models/models';
import SearchIcon from '@mui/icons-material/Search';

function LobbyPage() {
  const contractors = useGetAllContractors();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

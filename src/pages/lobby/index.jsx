import "./main.scss";
import { Link } from "react-router-dom";
import { useGetAllModels } from "../../queries/models/models";

function LobbyPage() {
  const models = useGetAllModels();
  // console.log(models_ID?.data?.data?.map((item) => [item.id](item.id)));

  return (
    <>
      <section>
        <div className="cards_cont">
          {models.isSuccess &&
            models.data &&
            models.data.length &&
            models?.data?.map((item) => (
              <Link to={`/profile/${item.id}`} key={item.id}>
                <div className="card">
                  {item.images && item.images.length && (
                    <img src={`http://localhost:3000${item.images[0]}`} alt="" />
                  )}
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export default LobbyPage;

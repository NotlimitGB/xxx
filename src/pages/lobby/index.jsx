import "./main.scss";
import worker1 from "../../assets/worker_1.jpg";
import { Link } from "react-router-dom";
import { useGetAllModels } from "../../queries/models/models";
import { useGetIDModel } from "../../queries/models/models";


function LobbyPage() {
  const models = useGetAllModels();
  const models_ID = useGetIDModel();


  return (
    <>
      <section>
        <div className="cards_cont">
          {models.isSuccess &&
            models?.data?.data?.map((item) => (
              <Link to={`/profile/${item.id}`} key={item.id}>
                <div className="card">
                  <img src={item.image} alt="" />
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

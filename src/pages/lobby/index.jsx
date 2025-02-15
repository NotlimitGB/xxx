import "./main.scss";
import worker1 from "../../assets/worker_1.jpg";
import { Link } from "react-router-dom";

function LobbyPage() {
  return (
    <>
      <section>
        <div className="cards_cont">
          <Link to={"/profile"}>
            <div className="card">
              <img src={worker1} alt="" />
              <h2>Карточка 1</h2>
            </div>
          </Link>
          <div className="card">
            <img src={worker1} alt="" />
            <h2>Карточка 1</h2>
          </div>
          <div className="card">
            <img src={worker1} alt="" />
            <h2>Карточка 1</h2>
          </div>
          <div className="card">
            <img src={worker1} alt="" />
            <h2>Карточка 1</h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default LobbyPage;

import './main.scss'
import worker1 from '../../assets/worker_1.jpg';

function LobbyPage() {
    return (
        <>
            <section>
                <div className="cards_cont">
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
                    <div className="card">
                        <img src={worker1} alt="" />
                        <h2>Карточка 1</h2>
                    </div>

                </div>
            </section>
        </>
    )

}

export default LobbyPage
import "./main.scss";

import { useGetIDModel } from "../../queries/models/models";

import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const models_ID = useGetIDModel(id);

  const [mainImage, setMainImage] = useState();

  useEffect(() => {    
    if (models_ID?.data?.images) {
      setMainImage(`http://localhost:3000${models_ID?.data?.images[0]}`);
    }
  }, [models_ID?.data]);

  const handleThumbnailClick = (image) => {    
    setMainImage(image);
  };

  return (
    <>
      <section>
        <div className="profile-cont">
          <div className="profile-image">
              <img src={mainImage} alt="" />
            <div className="thumbnails">
              {models_ID?.data?.images &&
                models_ID?.data?.images.length &&
                models_ID?.data?.images.map((item) => {
                  const worker = `http://localhost:3000${item}`;
                  return (
                    <img
                      key={item}
                      src={worker}
                      onClick={() => handleThumbnailClick(worker)}
                      className={mainImage === worker ? "active" : ""}
                    />
                  );
                })}
            </div>
          </div>
          <div className="profile-info">
            <h2>{models_ID?.data?.name}</h2>
            <p>{models_ID?.data?.description}</p>
            <button className="edit-btn">Связаться</button>
          </div>
        </div>
      </section>
    </>
  );
}

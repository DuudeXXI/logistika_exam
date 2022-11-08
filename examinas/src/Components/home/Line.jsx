import { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";
import types from "../../Data/types";

function Line({ container }) {
  const { containers } = useContext(HomeContext);

  return (
    <li className="list-group-item">
      <div className="line_content">
        <div className="product_info_container">
          {container[1][0].image ? (
            <div className="img-bin">
              <img src={container[1][0].image} alt={container[1][0].type}></img>
            </div>
          ) : (
            <div className="no_image">No image</div>
          )}
          <div className="line_info_container">
            <div className="line_info_3"> Container Code: {containers?.find((cc) => container[1][0].container_id === cc.id)?.special_id}</div>
            {/* <div className="line_info_3">{containers.find(x => container[0] === x.id).special_id}</div> */}
            <div className="line_info_2">
              Container size: <strong>{types.find((c) => containers?.find((cc) => container[1][0].container_id === cc.id)?.type)?.type}</strong>
            </div>
            <div className="line_info_1">
              Weight: <strong>{container[1][0].weight} kg</strong>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {container[1]?.map((containeris) => (
          <li className="list-group-item" key={containeris.id}>
            <div className="comment-container">
              <div className="line_info_3">
                Box information:
              </div>
              <div className="line_info_3">
                Product type: <strong>{containeris.name}</strong>
              </div>
              <div className="line_info_2">
                Flamable: <strong>{containeris.flamable ? "Yes": "No"}</strong>
              </div>
              <div className="line_info_2">
                Expiration: <strong>{containeris.expiration ? "Yes": "No"}</strong>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Line;

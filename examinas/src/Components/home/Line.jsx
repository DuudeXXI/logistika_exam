import { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";
import types from "../../Data/types";

function Line({ container }) {
  const { containers } = useContext(HomeContext);
console.log(container);
  return (
    <li className="list-group-item" style={{border: 'none'}}>
      <div className="line_content">
        <div className="product_info_container">
          <div className="line_info_container">
            <div className="line_info_2">
              Container Code:{" "}
              {container[1][0].special_id}
            </div>
            <div className="line_info_1">
              Container size:{" "}
              <strong>
                {
                  types.find((c) =>container[1][0].type).type
                }
              </strong>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {container[1]?.map((containeris) => (
          <li className="list-group-item" key={containeris.id}>
            <div className="line_content">
            <div className="product_info_container">
              {containeris.image ? (
                <div className="img-bin">
                  <img src={containeris.image} alt={containeris.type}></img>
                </div>
              ) : (
                <div className="no_image">No image</div>
              )}
            <div className="line_info_container">
              <div className="line_info_2">Box information:</div>
              <div className="line_info_2">
                Product type: <strong>{containeris.name}</strong>
              </div>
              <div className="line_info_1">
                Flamable: <strong>{containeris.flamable ? "Yes" : "No"}</strong>
              </div>
              <div className="line_info_1">
                Expiration:{" "}
                <strong>{containeris.expiration ? "Yes" : "No"}</strong>
              </div>
              <div className="line_info_1">
              Weight: <strong>{containeris.weight} kg</strong>
            </div>
            </div>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Line;

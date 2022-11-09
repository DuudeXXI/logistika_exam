import { useContext } from "react";
import DezesContext from "../../Contexts/DezesContext";
import types from "../../Data/types";
function Line({ deze }) {
  const { setDeleteData, setModalData, containers } = useContext(DezesContext);
console.log(containers)
console.log(deze)
  return (
    <li className="list-group-item">
      <div className="line_content">
        <div className="product_info_container">
          {deze.image ? (
            <div className="img-bin">
              <img src={deze.image} alt={deze.type}></img>
            </div>
          ) : (
            <div className="no_image">No image</div>
          )}
          <div className="line_info_container">
            <div className="line_info_3">{deze.name}</div>
            <div className="line_info_2">{types.find(c => c.id === deze.type)?.type}</div>
            <div className="line_info_1">Weight: <strong>{deze.weight}</strong> kg</div>
            <div className="line_info_2">Flamable: {deze.flamable ? "Yes" : "No"}</div>
            <div className="line_info_2">Low expiration: {deze.expiration ? "Yes" : "No"}</div>
            <div className="line_info_1">Assigned container Special code: {containers?.find(x => x.id === deze.container_id) ? containers?.find(x => x.id === deze.container_id).special_id : null}</div>
          </div>
        </div>
        <div className="line_buttons">
          <button
            onClick={() => setModalData(deze)}
            type="button"
            className="btn btn-outline-success"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteData(deze)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;

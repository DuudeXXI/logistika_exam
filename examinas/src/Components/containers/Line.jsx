import { useContext } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import types from "../../Data/types";

function Line({ container }) {
  const { setDeleteData, setModalData } = useContext(ContainersContext);

  return (
    <li className="list-group-item">
      <div className="line_content">
        <div className="product_info_container">
          <div className="line_info_container">
            <div className="line_info_2">Container Code: <strong>{container.special_id}</strong></div>
            <div className="line_info_2">Container size: {types.find(c => c.id === (container.type * 1))?.type}</div>
            <div className="line_info_1">Boxes inside: <strong>{container.boxes_inside} / 
            {container.type * 1 === 1 ? "2" :
             container.type * 1 === 2 ? "4" :
             container.type * 1 === 3 ? "6" :
             "Err"}</strong></div>
          </div>
        </div>
        <div className="line_buttons">
          <button
            onClick={() => setModalData(container)}
            type="button"
            className="btn btn-outline-success"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteData(container)}
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

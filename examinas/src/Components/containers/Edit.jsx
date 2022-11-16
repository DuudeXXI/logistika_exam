import { useContext, useEffect, useState, useRef } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import types from "../../Data/types";

function Edit() {
  const [type, setType] = useState("0");

  const { setEditData, modalData, setModalData } = useContext(ContainersContext);

  const edit = () => {
    setEditData({
      type,
      id: modalData.id
    });
    setModalData(null);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setType(modalData.type);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "#0000005f" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Container</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
            <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}>
                <option value={0} disabled>
                  Choose from list
                </option>
                {types?.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.type}
                  </option>
                ))}
              </select>
            </div>
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;

import { useContext, useEffect, useState, useRef } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import sizes from "../../Data/types";

function Edit() {
  const [size, setSize] = useState("");
  const [special, setSpecial] = useState("");

  const { setEditData, modalData, setModalData } = useContext(ContainersContext);

  const edit = () => {
    setEditData({
      size,
      special
    });
    setModalData(null);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setSize(modalData.size);
    setSpecial(modalData.special);
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
                <input
                  maxLength={50}
                  type="text"
                  className="form-control"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Size</label>
                <select
                  className="form-select"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value={0} disabled>
                    Choose from list
                  </option>
                  {sizes.map((g) => (
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

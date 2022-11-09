import { useContext, useEffect, useState, useRef } from "react";
import DezesContext from "../../Contexts/DezesContext";
import getBase64 from "../../Functions/getBase64";

function Edit() {

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [container, setContainer] = useState(0);
  const [flamable, setFlamable] = useState(false);
  const [expiration, setExpiration] = useState(false);
  const fileInput = useRef();

  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData, containers } = useContext(DezesContext);
  console.log(container);
  const edit = () => {  
    setEditData({
      name,
      weight: weight * 1,
      image: photoPrint,
      flamable: flamable ? 1 : 0,
      expiration: expiration ? 1 : 0,
      container_id: container * 1,
      id: modalData.id
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setName(modalData.name);
    setWeight(modalData.weight);
    setPhotoPrint(modalData.image);
    setFlamable(modalData.flamable);
    setContainer(modalData.container_id)
    setExpiration(modalData.expiration);
    setDeletePhoto(false);
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
            <h5 className="modal-title">Edit Apparel</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
            <div className="modal-body">
            <div className="card-body">
            <div className="mb-3">
            <label className="form-label">Name</label>
            <input
            maxLength={50}
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Weight</label>
          <input
            maxLength={8}
            type="text"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div>
            <label className="form-label">Flamable</label>
            <input
              type="Checkbox"
              checked={flamable}
              value={flamable}
              onChange={() => setFlamable(e => !e)}
            />
          </div>
          <div>
            <label className="form-label">Expiration</label>
            <input
              type="Checkbox"
              checked={expiration}
              value={expiration}
              onChange={() => setExpiration(e => !e)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Container</label>
          <select
            className="form-select"
            value={container}
            onChange={(e) => setContainer(e.target.value)}>
            <option value={0} disabled>
              Choose from list
            </option>
            {containers?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.special_id}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  ref={fileInput}
                  type="file"
                  className="form-control"
                  onChange={doPhoto}
                />
              </div>
              {photoPrint ? (
                <div className="img-bin">
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
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

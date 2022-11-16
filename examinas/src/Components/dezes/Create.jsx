import { useState, useContext, useRef } from "react";
import DezesContext from "../../Contexts/DezesContext";
import getBase64 from "../../Functions/getBase64";

function Create() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [container, setContainer] = useState(0);
  const [flamable, setFlamable] = useState(false);
  const [expiration, setExpiration] = useState(false);
  const fileInput = useRef();

  const { setCreateData, containersList } = useContext(DezesContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (0 === container){
      console.log("Please select container if available")
      setName("");
      setWeight(0);
      setPhotoPrint(null);
      fileInput.current.value = null;
      setFlamable(false);
      setExpiration(false);
    } else {
      setCreateData({
        name,
        weight,
        image: photoPrint,
        flamable: flamable ? 1 : 0,
        expiration: expiration ? 1 : 0,
        container_id: JSON.parse(container).id
      });
      setName("");
      setWeight(0);
      setPhotoPrint(null);
      fileInput.current.value = null;
      setFlamable(false);
      setContainer(0)
      setExpiration(false);
    }
};

  return (
    <div className="card m-4">
      <h5 className="card-header">Create Box</h5>
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
              {containersList?.length === 0 ? "No containers available"  : "Choose from list"}
            </option>
            {containersList?.map((g) => (
              <option key={g.id} value={JSON.stringify(g)}>
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
          <div className="img_prev">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;

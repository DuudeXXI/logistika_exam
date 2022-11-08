import { useEffect } from "react";
import { useState, useContext } from "react";
import ContainersContext from "../../Contexts/ContainersContext";
import types from "../../Data/types";
import rand from "../../Functions/rand";

function Create() {
  const [type, setType] = useState("0");
  const [container, setContainer] = useState('');
  const [special_id, setSpecial_id] = useState('0');

  const { setCreateData, containers } = useContext(ContainersContext);

  useEffect(() => {
    setSpecial_id(rand(1000, 9999) + "-" + rand(1000,9999))
  },[])

  const add = () => {
    setCreateData({
      type,
      special_id
    });
    setType(0);
    setSpecial_id(rand(1000, 9999) + "-" + rand(1000,9999));
};

  return (
    <div className="card m-4">
      <h5 className="card-header">Create Container</h5>
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
                    <div className="mb-3">
          <label className="form-label">Special_id</label>
          <input
            maxLength={50}
            type="text"
            className="form-control"
            value={special_id}
            onChange={(e) => setSpecial_id(e.target.value)}
            />
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;

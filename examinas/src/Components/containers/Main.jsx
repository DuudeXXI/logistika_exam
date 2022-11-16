import { useContext, useEffect, useState } from "react";
//
import ContainersContext from "../../Contexts/ContainersContext";
import DataContext from "../../Contexts/DataContext";
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Create from './Create'
import List from './List'
import Edit from "./Edit";

const Main = () => {
  // Data from App.jsx
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [containers, setContainers] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
console.log(editData);
  // READ for list
  useEffect(() => {
      axios.get('http://localhost:3003/server/containers', authConfig())
          .then(res => {
              setContainers(res.data);
          })
  }, [lastUpdate]);

  useEffect(() => {
      if (null === createData) {
          return;
      }
      axios.post('http://localhost:3003/server/containers', createData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [createData]);

  useEffect(() => {
      if (null === deleteData) {
          return;
      }
      axios.delete('http://localhost:3003/server/containers/' + deleteData.id, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [deleteData]);

  useEffect(() => {
      if (null === editData) {
          return;
      }
      axios.put('http://localhost:3003/server/containers/' + editData.id, editData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [editData]);


  return (
    <ContainersContext.Provider value={{
      setCreateData,
      setDeleteData,
      setEditData,
      modalData,
      containers,
      setModalData
    }}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-4 col-sm-12">
                        <Create />
                    </div>
                    <div className="col col-lg-8 col-sm-12">
                        <List />
                    </div>
                </div>
            </div>
            <Edit />
    </ContainersContext.Provider>
  );
};

export default Main;

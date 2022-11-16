import { useContext, useEffect, useState } from "react";
//
import DezesContext from "../../Contexts/DezesContext";
import DataContext from "../../Contexts/DataContext";
import axios from 'axios';
import { authConfig, login } from '../../Functions/auth';
import Create from './Create'
import List from './List'
import Edit from "./Edit";

const Main = () => {
  // Data from App.jsx
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [dezes, setDezes] = useState(null);
  const [containers, setContainers] = useState(null);
  const [containersList, setContainersList] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  console.log(editData);
  // READ for list
  useEffect(() => {
      axios.get('http://localhost:3003/server/dezes', authConfig())
          .then(res => {
              setDezes(res.data);
          })
  }, [lastUpdate]);
  useEffect(() => {
      axios.get('http://localhost:3003/server/containers', authConfig())
          .then(res => {
              setContainers(res.data);
          })
  }, [lastUpdate]);
  useEffect(() => {
      axios.get('http://localhost:3003/server/containers/list', authConfig())
          .then(res => {
              setContainersList(res.data);
          })
  }, [lastUpdate]);

  useEffect(() => {
      if (null === createData) {
        return;
    }
      axios.put('http://localhost:3003/server/container/' + createData.container_id, createData.container_id,  authConfig())
      .then(res => {
          setLastUpdate(Date.now());
      });
      axios.post('http://localhost:3003/server/dezes', createData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [createData]);

  useEffect(() => {
      if (null === deleteData) {
          return;
      }
      axios.put('http://localhost:3003/server/container/delete/' + deleteData.container_id, deleteData.container_id,  authConfig())
      .then(res => {
          setLastUpdate(Date.now());
      });
      axios.delete('http://localhost:3003/server/dezes/' + deleteData.id, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [deleteData]);

  useEffect(() => {
      if (null === editData) {
          return;
      }
      axios.put('http://localhost:3003/server/dezes/' + editData.id, editData, authConfig())
          .then(res => {
              setLastUpdate(Date.now());
          });
  }, [editData]);

  return (
    <DezesContext.Provider value={{
      setCreateData,
      dezes,
      setDeleteData,
      setEditData,
      modalData,
      containers,
      containersList,
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
    </DezesContext.Provider>
  );
};

export default Main;

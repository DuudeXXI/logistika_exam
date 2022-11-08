import { useContext, useEffect, useState } from "react";
//
import HomeContext from "../../Contexts/HomeContext";
import DataContext from "../../Contexts/DataContext";
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import List from './List'

const Main = () => {
  // Data from App.jsx
  const {} = useContext(DataContext);

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [containers, setContainers] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [list, setList] = useState(null);
  // READ for list
  useEffect(() => {
      axios.get('http://localhost:3003/home/dezes', authConfig())
          .then(res => {
            setList(reList(res.data).map((d, i) => ({...d, show: true, row: i})));
          })
  }, [lastUpdate]);
  useEffect(() => {
      axios.get('http://localhost:3003/home/containers', authConfig())
          .then(res => {
              setContainers(res.data);
          })
  }, [lastUpdate]);


  const reList = data => {
    const d = new Map();
    data.forEach(line => {
        if (d.has(line.container_id)) {
            d.set(line.container_id, [...d.get(line.container_id), line]);
        } else {
            d.set(line.container_id, [line]);
        }
    });
    return [...d];
}

  return (
    <HomeContext.Provider value={{
      modalData,
      containers,
      setModalData,
      list
    }}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-12 col-sm-12">
                        <List />
                    </div>
                </div>
            </div>
    </HomeContext.Provider>
  );
};

export default Main;

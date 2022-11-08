import { useContext } from 'react';
import ContainersContext from '../../Contexts/ContainersContext';
import Line from './Line';

function List() {

    const { containers } = useContext(ContainersContext);

    return (
        <div className="card m-4">
            <h5 className="card-header">Container List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        containers?.map(c => <Line key={c.id} container={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
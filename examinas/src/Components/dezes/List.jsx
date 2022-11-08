import { useContext } from 'react';
import DezesContext from '../../Contexts/DezesContext';
import Line from './Line';

function List() {

    const { dezes } = useContext(DezesContext);

    return (
        <div className="card m-4">
            <h5 className="card-header">Boxes List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        dezes?.map(b => <Line key={b.id} deze={b} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
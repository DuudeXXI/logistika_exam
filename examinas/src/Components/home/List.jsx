import { useContext } from 'react';
import HomeContext from '../../Contexts/HomeContext';
import Line from './Line';

function List() {

    const { list } = useContext(HomeContext);

    return (
        <div className="card m-4">
            <h5 className="card-header">List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        list?.map(c => <Line key={c[1][0].id} container={c} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;
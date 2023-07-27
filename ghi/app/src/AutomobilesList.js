import { Link } from 'react-router-dom';


function AutomobilesList(props) {

    async function deleteAutomobile(automobileID) {
        const url = `http://localhost:8100/api/automobiles/${automobileID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getAutomobiles();
        }
    }
    if (props.autos === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.autos.map(automobile => {
                        return (
                            <tr key={automobile.id}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                                <td>{String(automobile.sold)}</td>
                                <td><button onClick={() => deleteAutomobile(automobile.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/automobiles/create" className="btn btn-primary btn-lg px-4 gap-3">Add an Auto</Link>
          </div>
        </>
    )
}

export default AutomobilesList;

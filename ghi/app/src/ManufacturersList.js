import { Link } from 'react-router-dom';


function ManufacturersList(props) {

    async function deleteManufacturer(manufacturerID) {
        const url = `http://localhost:8100/api/manufacturers/${manufacturerID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getManufacturers();
        }
    }
    if (props.manufacturers === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>Manufacturer</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                                <td><button onClick={() => deleteManufacturer(manufacturer.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/manufacturers/create" className="btn btn-primary btn-lg px-4 gap-3">Add a Manufacturer</Link>
          </div>
        </>
    )
}

export default ManufacturersList;

import { Link } from 'react-router-dom';


function ModelsList(props) {

    async function deleteModel(modelID) {
        const url = `http://localhost:8100/api/models/${modelID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getModels();
        }
    }
    if (props.models === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>{model.picture_url}</td>
                                <td><button onClick={() => deleteModel(model.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/models/create" className="btn btn-primary btn-lg px-4 gap-3">Add a Model</Link>
          </div>
        </>
    )
}

export default ModelsList;

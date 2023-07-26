import { Link } from 'react-router-dom';


function SalespeopleList(props) {

    async function deleteSalesperson(salespersonID) {
        const url = `http://localhost:8090/api/salespeople/${salespersonID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getSalespeople();
        }
    }
    if (props.salespeople === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.salespeople.map(salesperson => {
                        return (
                            <tr key={salesperson.id}>
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td><button onClick={() => deleteSalesperson(salesperson.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/salespeople/create" className="btn btn-primary btn-lg px-4 gap-3">Add a Salesperson</Link>
          </div>
        </>
    )
}

export default SalespeopleList;

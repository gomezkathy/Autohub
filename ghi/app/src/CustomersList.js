import { Link } from 'react-router-dom';


function CustomersList(props) {

    async function deleteCustomer(customerID) {
        const url = `http://localhost:8090/api/customers/${customerID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getCustomers();
        }
    }
    if (props.customers === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.customers.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.phone_number}</td>
                                <td>{customer.address}</td>
                                <td><button onClick={() => deleteCustomer(customer.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/customers/create" className="btn btn-primary btn-lg px-4 gap-3">Add a Customer</Link>
          </div>
        </>
    )
}

export default CustomersList;

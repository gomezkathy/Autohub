import { Link } from 'react-router-dom';


function SalesList(props) {

    async function deleteSale(saleID) {
        const url = `http://localhost:8090/api/sales/${saleID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            props.getSales();
        }
    }
    if (props.sales === undefined) { return null }
    return (
        <>
            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                                <td><button onClick={() => deleteSale(sale.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/sales/create" className="btn btn-primary btn-lg px-4 gap-3">Add a Sale</Link>
          </div>
        </>
    )
}

export default SalesList;

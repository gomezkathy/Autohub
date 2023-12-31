import { Link } from 'react-router-dom';
import React, { useState } from 'react';


function SalesList(props, sales) {

    async function deleteSale(saleID, autoVIN) {
        //deletes the sale item
        const url = `http://localhost:8090/api/sales/${saleID}/`;
        const fetchConfig = { method: "DELETE", };
        const response = await fetch(url, fetchConfig);

        //toggles automobile sold status to false when sale is deleted
        const updateAutoURL = `http://localhost:8100/api/automobiles/${autoVIN}/`;
        const fetchUpdateConfig = { 
            method: "PUT", 
            body: JSON.stringify({"sold": false}),
            headers: {'Content-Type': 'application/json',},
        };
        const response2 = await fetch(updateAutoURL, fetchUpdateConfig);

        if (response.ok || response2.ok) {
            props.getSales();
            props.getAutomobiles();
        }
    }
    

    let [filteredSales, setFilteredSales] = useState([]);
    let [selectedSalesman, setSelectedSalesman] = useState('');

    const handleSalesmanSelection = (event) => {
        selectedSalesman = event.target.value;
        setSelectedSalesman(selectedSalesman);
    }

    const filterTheSales = (event) => {
        event.preventDefault();
        filteredSales = props.sales.filter(
            sale => String(sale.salesperson.id) === selectedSalesman
        );
        setFilteredSales(filteredSales);
    }

    if (filteredSales.length>0){
        sales = filteredSales;
    } else {
        sales = props.sales;
    }

    if (props.sales === undefined) { return null }
    return (
        <>
            <form onSubmit={filterTheSales}>
            <select onChange={handleSalesmanSelection} required name="salesperson" id="salesperson" className="form-select">
                <option value="">View sales of one salesperson...</option>
                {props.salespeople.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  )
                })}
            </select>
                <button type="submit">Get Sales History</button>
            </form>
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
                    {sales.map(sale => { 
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                                <td><button onClick={() => deleteSale(sale.id, sale.automobile.vin)}>Delete</button></td>
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

import React, { useState } from 'react';

function AddSaleForm({getSales, salespeople, customers, autos}) {
    const [hasAddedSale, setHasAddedSale] = useState(false);
    
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer:'',
        price: '',
    })

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();
        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            //By using one formData state object,
            //it can pass directly into the request!
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        //ERROR: need to POST manufacturer_id:1 but sending manufacturer:1
        const response = await fetch(url, fetchConfig);
    
        if (response.ok) {
            //The single formData object allows for easier clearing of data
            setFormData({
                automobile: '',
                salesperson: '',
                customer:'',
                price: '',
            });
            setHasAddedSale(true);
            getSales();
        }
    }
    
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            //Spread/Copy previous form data into the new state object
            ...formData,
            //Then add the currently engaged input key and value
            [inputName]: value
        });
    }

    let messageClasses = 'alert alert-success d-none mb-0';
    let formClasses = '';
    if (hasAddedSale) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
              <select onChange={handleFormChange} required name="automobile" id="automobile" className="form-select">
                <option value="">Choose an automobile VIN...</option>
                {autos.map(automobile => {
                  return (
                    <option key={automobile.id} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a salesperson...</option>
                {salespeople.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="customer" id="customer" className="form-select">
                <option value="">Choose a customer...</option>
                {customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Price" required type="text" 
                name="price" id="price" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Sale is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSaleForm;

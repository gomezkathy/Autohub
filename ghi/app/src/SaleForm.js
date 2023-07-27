import React, { useState } from 'react';

// function AddSaleForm({getAutomobiles, getSales, salespeople, customers, autos}) {
function AddSaleForm(props) {
    const [hasAddedSale, setHasAddedSale] = useState(false);
    
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer:'',
        price: '',
    })

    async function updateSold(vin) {
        const updateAutoSoldURL = 'http://localhost:8100/api/automobiles/' + String(vin) + '/';
        const fetchUpdateConfig = {
            method: "put",
            body: JSON.stringify({"sold": true}),
            headers: {'Content-Type': 'application/json',},
        }
        const response2 = await fetch(updateAutoSoldURL, fetchUpdateConfig);
        // if (response2.ok) {
        //     getAutomobiles();
        // }
    }

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
        
        const response = await fetch(url, fetchConfig);
    
        if (response.ok) {
            const vin= formData["automobile"];
            updateSold(vin);
            
            //The single formData object allows for easier clearing of data
            setFormData({
                automobile: '',
                salesperson: '',
                customer:'',
                price: '',
            });
            setHasAddedSale(true);
            props.getSales();
            // props.getAutos();
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
          <h1>Record a new sale</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
              <select onChange={handleFormChange} required name="automobile" id="automobile" className="form-select">
                <option value="">Choose an automobile VIN...</option>
                {props.autos.map(automobile => { if(!automobile.sold){
                  return (
                    <option key={automobile.id} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  )}
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a salesperson...</option>
                {props.salespeople.map(salesperson => {
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
                {props.customers.map(customer => {
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

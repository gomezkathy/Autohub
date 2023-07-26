import React, { useState } from 'react';

function AddCustomerForm({getCustomers}) {
    const [hasAddedCustomer, setHasAddedCustomer] = useState(false);
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
    })

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();
        const url = 'http://localhost:8090/api/customers/';
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
            //The single formData object allows for easier clearing of data
            setFormData({
                first_name: '',
                last_name: '',
                address: '',
                phone_number: '',
            });
            setHasAddedCustomer(true);
            getCustomers();
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
    if (hasAddedCustomer) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Customer</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="First Name" required type="text" 
                name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Last Name" required type="text" 
                name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Address" required type="text" 
                name="address" id="address" className="form-control" />
              <label htmlFor="address">Address...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Phone Number" required type="text" 
                name="phone_number" id="phone_number" className="form-control" />
              <label htmlFor="phone_number">Phone number...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Customer is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerForm;

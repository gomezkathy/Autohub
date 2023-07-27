import React, { useState } from 'react';

function AddSalespeopleForm({getSalespeople}) {
    const [hasAddedSalesperson, setHasAddedSalesperson] = useState(false);
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/';
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
                employee_id: '',
                first_name: '',
                last_name: '',
            });
            setHasAddedSalesperson(true);
            getSalespeople();
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
    if (hasAddedSalesperson) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Salesperson</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-salesperson-form">
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
              <input onChange={handleFormChange} placeholder="Employee ID" required type="text" 
                name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Salesperson is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSalespeopleForm;

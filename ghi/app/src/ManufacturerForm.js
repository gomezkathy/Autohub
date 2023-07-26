import React, { useState } from 'react';

function AddManufacturerForm({getManufacturers}) {
    const [hasAddedManufacturer, setHasAddedManufacturer] = useState(false);
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        name: '',
    })

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();
        const url = 'http://localhost:8100/api/manufacturers/';
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
                name: '',
            });
            setHasAddedManufacturer(true);
            getManufacturers();
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
    if (hasAddedManufacturer) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Manufacturer</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Manufacturer" required type="text" 
                name="name" id="name" className="form-control" />
              <label htmlFor="name">Manufacturer name...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Manufacturer is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddManufacturerForm;

import React, { useState } from 'react';

function AddAutomobileForm({getAutomobiles, models}) {
    const [hasAddedAutomobile, setHasAddedAutomobile] = useState(false);
    
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        color: '',
        year:'',
        vin:'',
        model_id: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/automobiles/';
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
                color: '',
                year:'',
                vin:'',
                model_id: '',
            });
            setHasAddedAutomobile(true);
            getAutomobiles();
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
    if (hasAddedAutomobile) {
      messageClasses = 'alert alert-success mb-0';
      formClasses = 'd-none';
    }

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form className={formClasses} onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Color" required type="text" 
                name="color" id="color" className="form-control" />
              <label htmlFor="color">Color...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Year" required type="text" 
                name="year" id="year" className="form-control" />
              <label htmlFor="year">Year...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="VIN" required type="text" 
                name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN...</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="model_id" id="model_id" className="form-select">
                <option value="">Choose a model...</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Automobile is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAutomobileForm;

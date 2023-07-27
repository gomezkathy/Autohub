import React, { useEffect, useState } from 'react';

function AddModelForm({getModels, manufacturers}) {
    // const [ manufacturers, setManufacturers ] = useState([]);
    const [hasAddedModel, setHasAddedModel] = useState(false);
    //Condense all form data into one state object
    const [formData, setFormData] = useState({
        name: '',
        picture_url:'',
        manufacturer_id: '',
    })

    // const fetchData = async () => {
    //     const response = await fetch('http://localhost:8100/api/manufacturers/');
    //     if (response.ok) {
    //         const data = await response.json();
    //         setManufacturers(data.manufacturers);
    //     }
    // }
    
    // useEffect(() => {fetchData();}, []);

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();
        const url = 'http://localhost:8100/api/models/';
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
                name: '',
                picture_url:'',
                manufacturer_id: '',
            });
            setHasAddedModel(true);
            getModels();
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
    if (hasAddedModel) {
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
              <input onChange={handleFormChange} placeholder="Model Name" required type="text" 
                name="name" id="name" className="form-control" />
              <label htmlFor="name">Model name...</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Picture URL" required type="text" 
                name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture URL...</label>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
          <div className={messageClasses} id="success-message">
            Model is Added!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModelForm;

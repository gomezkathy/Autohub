import React, {useEffect, useState} from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange =(event) =>{
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange =(event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleReasonChange =(event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {};

        data.vin = vin;
        data.reason = reason;
        data.date_time = `${date} ${time}`;
        data.technician = technician;
        data.customer_name = customer;
        console.log(date.date_time);

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig ={
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if(response.ok){
            const newAppt = await response.json();
            console.log(newAppt);

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setReason('');
            setTechnician('');
        }
    }



    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Automobile Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input value={customer} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer_name" id="customer_name" className="form-control" />
                <label htmlFor="customer_name">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input value ={date} onChange={handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input value={time} onChange={handleTimeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a technician</option>
                  {technicians.map(technician =>{
                    return(
                        <option key={technician.id} value={technician.id}>
                            {technician.first_name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input value={reason} onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default AppointmentForm;

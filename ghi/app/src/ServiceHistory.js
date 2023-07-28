import React, { useState, useEffect } from 'react';

function ServiceHistory(props, appointments) {
    const [auto, setAuto] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const handleApptChange = (event) => {
        const value = event.target.value;
        setSearchVIN(value);
      };

    const handleSearch = (event) => {
        event.preventDefault();
        const data = props.appointments.filter(
            appointment => appointment.vin.toLowerCase() === searchVIN.toLowerCase()
            );
            setFilteredAppointments(data);
        };

    async function getAutoData() {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAuto(data.autos);
        }
    }

    useEffect(() => {
        getAutoData();
    }, []);

    function isVip(vin) {
        for (let i = 0; i < auto.length; i++) {
            if (auto[i].vin === vin) {
                return true;
            }
        }
        return false;
    }

    if (props.appointments === undefined) {
        return null;
    }


    if (filteredAppointments.length > 0) {
        appointments = filteredAppointments;
    } else {
        appointments = props.appointments;
    }

    return (
        <div>
            <h2>Service History</h2>
            <form onSubmit={handleSearch} className="create-search-form">
                <div className="form-floating mb-3">
                    <input value={searchVIN} onChange={handleApptChange} placeholder="VIN Search" required type ="text" name="search_vin" id="search_vin" className="form-control" />
                    <label htmlFor="search_vin">Search by VIN</label>
                    <button type="submit">Search</button>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{isVip(appointment.vin) ? 'Yes' : 'No'}</td>
                            <td>{appointment.customer_name}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{appointment.technician}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;

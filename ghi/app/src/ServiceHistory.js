import React, { useState, useEffect } from 'react';

function ServiceHistory(props){

    const [auto, setAuto] = useState([]);

    async function getAutoData(){
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if(response.ok){
            const data = await response.json();
            setAuto(data.autos);
        }
    }

    useEffect(() => {
        getAutoData();
    })

    function isVip(vin) {
        return auto.some((item)=> item.vin ===vin);
    }

    if (props.appointments === undefined){
        return null;
    }

    return(
        <div>
            <h2>Service History</h2>
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
                {props.appointments.map (appointment =>{
                    return(
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{ isVip(appointment.vin) ? 'Yes': 'No'}</td>
                            <td>{appointment.customer_name}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{appointment.technician}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>

                        </tr>
                    )
                }
                    )}
            </tbody>
        </table>
        </div>
    )
}

export default ServiceHistory;

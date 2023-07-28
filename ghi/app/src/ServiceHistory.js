function ServiceHistory(props){
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
                            <td>{appointment.vip}</td>
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

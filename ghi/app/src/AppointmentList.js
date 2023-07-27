function AppointmentList(props){
    async function handleAppointmentCancel(appt_id) {
        const apptUrl =`http://localhost:8080/api/appointments/${appt_id}/cancel`;
        const fetchConfig = {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const response = await fetch(apptUrl, fetchConfig);
        if (response.ok) {
          console.log("cancelled");
          window.location.reload();
        }
    }



    if (props.appointments === undefined){
        return null;
    }
    return(
        <div>
            <h2>Service Appointments</h2>
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
                </tr>
            </thead>
            <tbody>
                {props.appointments.map(appointment =>{
                    return(
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.vip }</td>
                            <td>{ appointment.customer_name}</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.technicians }</td>
                            <td>{ appointment.reason }</td>
                            <td>
                            <button onClick={() => handleAppointmentCancel(appointment.id)} className="btn btn-danger">Cancel</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}

export default AppointmentList;

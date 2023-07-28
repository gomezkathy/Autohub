
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

          window.location.reload();
        }
    }

    async function handleAppointmentFinish(appt_id) {
        const apptUrl =`http://localhost:8080/api/appointments/${appt_id}/finish`;
        const fetchConfig = {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const response = await fetch(apptUrl, fetchConfig);
        if (response.ok) {

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
                            <td></td>
                            <td>{ appointment.customer_name}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{appointment.technician}</td>
                            <td>{ appointment.reason }</td>
                            <td>
                            <button onClick={() => handleAppointmentCancel(appointment.id)} className="btn btn-danger">Cancel</button>
                            </td>
                            <td>
                            <button onClick={() => handleAppointmentFinish(appointment.id)} className="btn btn-success">Finish</button>
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

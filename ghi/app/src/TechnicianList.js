
function TechnicianList(props){

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {props.technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )

}

export default TechnicianList;

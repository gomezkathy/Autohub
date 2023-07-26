function TechnicianList({ technicians, getTechnicians }) {


return (
    <table className="tabel table-striped">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            {technicians.map(technician =>{
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
);
        }


export default TechnicianList;

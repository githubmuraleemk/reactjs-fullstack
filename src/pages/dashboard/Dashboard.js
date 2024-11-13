import { useEffect, useState } from "react";
import { Row, Col, Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{
    
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchEmployees = async ()=>{
            try{
                //const response = await fetch("http://localhost:8080/api/employees");
                const response = await fetch("http://sb-backend-service-env.eba-n8cktycz.us-east-1.elasticbeanstalk.com/api/employees");
                
                const data = await response.json();
                setEmployees(data);
            }catch(error){
                console.error("Error while getting employees record...",error.message);
            }        

        }
        fetchEmployees();
    },[]);

    const handleDelete = async (employeeId) =>{
        try{
            /*
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`,
                {method: "DELETE"}
            );
            */
            const response = await fetch(`http://sb-backend-service-env.eba-n8cktycz.us-east-1.elasticbeanstalk.com/api/employee/${employeeId}`,
                {method: "DELETE"}
            );
            if(response.ok){
                setEmployees((prevEmployees)=>
                    prevEmployees.filter((employee)=>(employee.id !== employeeId))
                )
            }
            console.log(`Employee with ID ${employeeId} deleted successfully`);

        }catch(error){
            console.error("Error while deleting employee ",error.message);

        }

    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col>
                <div>
                <h3 className="text-center" style={{ color: 'green' }}>SJ Kumar & Co Pvt Ltd</h3>
                <h4 className="text-center" style={{ color: 'orange' }}>Branches : Kumbakonam, Chennai & USA</h4>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>EMail</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee)=>(
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                                    <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>

        </Container>
    );

}
export default Dashboard;
import './UpdateUser.css'
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  
    const {id} = useParams(); 
    const navigate = useNavigate();   
    
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        department:""
    });

    const handleInputChange = (event) =>{
        const{name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value,

        })        
    };
    
    useEffect(() =>{
        const fetchEmployee = async ()=>{
            try{
                //const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const response = await fetch(`http://sb-backend-service-env.eba-n8cktycz.us-east-1.elasticbeanstalk.com/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);                
            }catch(error){
                console.error("Error while fetching data...",error.message);
            }
        }
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            
            /*
            const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json"

                },
                */
                const response = await fetch(`http://sb-backend-service-env.eba-n8cktycz.us-east-1.elasticbeanstalk.com/api/employee/${id}`,{
                    method:'PATCH',
                    headers:{
                        "Content-Type":"application/json"
    
                    },
                body:JSON.stringify(formData),
            });

            const data = response.json();
            console.log("User updated...",data);
            navigate(`/`);

        }catch(error){
            console.error("Error when updating user....",error.message);

        }

    }
    

    return(
        <>
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter EMail"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="department"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" calssName="w-100">
                    Update Employee
                </Button>
            </Form>

        </div>
        </>
    )
}
export default UpdateUser;

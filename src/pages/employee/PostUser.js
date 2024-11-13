import { useState } from "react";
import "./PostUser.css";
import { Form,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () =>{
    const [formData,setFormData]=useState({
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
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            /*
            const response = await fetch("http://localhost:8080/api/employee",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });
            */
            const response = await fetch("http://sb-backend-service-env.eba-n8cktycz.us-east-1.elasticbeanstalk.com/api/employee",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.error("Employee Created successfully...:",data);
            navigate("/");

        }catch(error){
            console.log("Error while creating Employee....",error.message);

        }
        

    };
    return(
        <>
        <div className="center-form">
            <h1>Create New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter EMail"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNme">
                    <Form.Control
                    type="text"
                    name="department"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" calssName="w-100">
                    Post Employee
                </Button>
            </Form>

        </div>

        

        </>

    )
}
export default PostUser;
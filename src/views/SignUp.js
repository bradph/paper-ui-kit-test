import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import ReactBSAlert from 'react-bootstrap-sweetalert'

import { useHistory } from 'react-router';

import { addUserOnAPI } from "lib/services/UserService";


const SignUp = () => { 

    const [alert, setAlert] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: "",
        email: "",
        mobile: "",
        password: ""
    });


  const history = useHistory();


    const isValid = (currentUser) => {
        let errors={};

        if(!currentUser.name){errors.name="Name required"}
        if(!currentUser.email){errors.email="Email required"}
            else if(!/\S+@\S+\.\S+/.test(currentUser.email)){errors.email="Invalid Email"}
        if(!currentUser.mobile){errors.mobile="Mobile required"}
            else if(currentUser.mobile.length < 11){errors.mobile="Invalid Mobile"}
        if(!currentUser.password){errors.password="Password required"}

        return errors;
    };

    const [errors, setErrors] = useState({});

    const submit = async(e)=>{
        e.preventDefault();
        setErrors(isValid(currentUser));

        const response = await addUserOnAPI(currentUser);
        if(response){
          setAlert(
            <ReactBSAlert
            success
            style={{ display: "block", marginTop: "" }}
            title="Successful"
            onConfirm={() => {
                setAlert(null);
                // {history.push('/login')}

            }}
            confirmBtnBsStyle="default"
            confirmBtnText="Ok"
        
            btnSize=""
            >
                {response.message}
        </ReactBSAlert>
        );
      }
      // console.log(currentUser)
    };

  return (
    <div className="content">
    <Container>
      <Row style={{justifyContent: "center"}}>
        <Col lg="6">
          <Form style={{
            border: "2px solid white",
            borderRadius: "30px",
            padding: "30px",
            boxShadow: "0 0 25px gray"}}>
            <FormGroup>
               <Button className="btn-link" onClick={() => {history.push('/register')}} color="primary">Back</Button>
              <h5>Sign Up</h5>
            </FormGroup>
            
            <FormGroup>
              <Label>
                    Name
              </Label>
              <Input
                name="name"
                placeholder="Full Name"
                type="text"
                value={currentUser.name}
                onChange={(e)=>{
                  setCurrentUser({...currentUser,name: e.target.value})
                }}
              />
              {errors.name && <p style={{color: "red"}}>{errors.name}</p>}
            </FormGroup>

            <FormGroup>
              <Label>
                    Email
              </Label>
              <Input
                name="email"
                placeholder="Email Address"
                type="email"
                value={currentUser.email}
                onChange={(e)=>{
                  setCurrentUser({...currentUser,email: e.target.value})
                }}
              />
              {errors.email && <p style={{color: "red"}}>{errors.email}</p>}
            </FormGroup>

            <FormGroup>
              <Label>
                    Mobile
              </Label>
              <Input
                name="mobile"
                placeholder="09XXXXXXXXX"
                type="text"
                maxLength={11}
                value={currentUser.mobile}
                onChange={(e)=>{
                  setCurrentUser({...currentUser,mobile: e.target.value})
                }}
              />
              {errors.mobile && <p style={{color: "red"}}>{errors.mobile}</p>}
            </FormGroup>

            <FormGroup>
              <Label>
                    Password
              </Label>
              <Input
                name="password"
                placeholder="Set Password"
                type="password"
                value={currentUser.password}
                onChange={(e)=>{
                  setCurrentUser({...currentUser,password: e.target.value})
                }}
              />
              {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
            </FormGroup>

            <Button type="submit" onClick={submit} className="w-100">
              Sign In
            </Button>

            <p className="text-center">
              {" "}
              Already have an account?  
              <Button className="btn-link" onClick={() => {history.push('/login')}} color="primary">Log In</Button>
            </p>
           
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SignUp;
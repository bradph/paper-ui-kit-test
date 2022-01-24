import React, {useEffect, useState} from 'react';

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router';

import { getAllUser, addUserOnAPI } from "lib/services/UserService";

const LogIn = () => {
  const history = useHistory();

  const [myUserList, setMyUserList] = useState([]);
  useEffect(()=> {
    fetchUsers();
  },[]);

  const fetchUsers = async() => {
    const fetchedUsers = await getAllUser();
    setMyUserList(fetchedUsers);
  }

  const [userData, setuserData] = useState({
    name: "",
    email: "",
  });

  const savedUser = myUserList.map(user => user.email);
  // console.log(savedUser);

const isAuth = async(e) => {
  e.preventDefault();
  if (savedUser.includes(userData.email)){
    history.push('admin/dashboard')
  } 
}

  return(
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
              <h5>Log In</h5>
            </FormGroup>

            <FormGroup>
              <Label>
                    Email
              </Label>
              <Input
                name="email"
                placeholder="Email Address"
                type="email"
                value={userData.email}
                onChange={(e)=>{
                  setuserData({...setuserData,email: e.target.value})
                }}
              />
            </FormGroup>


            <Button type="submit" onClick={isAuth} className="w-100">
              Log In
            </Button>

            <p className="text-center">
              {" "}
              Don't Have an Account? 
              <Button className="btn-link" onClick={() => {history.push('/signup')}} color="primary">Sign Up Now</Button>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default LogIn;


import React from 'react';

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router';

const LogIn = () => {
  const history = useHistory();
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
              <Label for="userEmail">
                    Email
              </Label>
              <Input
                id="userEmail"
                name="email"
                placeholder="Email Address"
                type="email"
                // value={formValues.email}
                // onChange={handleChange}
              />
              {/* {errors.email && <p style={{color: "red"}}>{errors.email}</p>} */}
            </FormGroup>


            <Button type="submit" className="w-100">
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


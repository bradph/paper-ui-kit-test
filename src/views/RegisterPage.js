import React from 'react';
import { Button, Container, Row, Col} from 'reactstrap';
import { useHistory } from 'react-router';

const RegisterPage = () => {

  const history = useHistory();


  return (
  <>
    <Container>
      <Row style={{
            justifyContent: "center",
            padding: "30px",
            marginTop: "100px"}}>
        <h1>Welcome, User!</h1>
      </Row>
      <Row className='justify-content-center'>  
  
        <Button 
        id ="signin"
        type="button"
        color='info'
        onClick={() => {history.push('/signup')}}
          > SignUp</Button>

        <Button
        id ="logIn"
        type="button"
        color='success'
        onClick={() => {history.push('/login')}}
      >Log In</Button>
     </Row>  
    </Container>    
  </>
  );
};

export default RegisterPage;

import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Route } from 'react-router-dom';


const RegisterPage = ({ children }) => (                         
  <div>  
    {children}                                       
  </div>  
);  

const RegisterPageRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <RegisterPage>  
          <Component {...matchProps} />  
      </RegisterPage>  
    )} />  
  )  
};  

export default RegisterPageRoute;  
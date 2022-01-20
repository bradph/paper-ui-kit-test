/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import { getAllUser, addUserOnAPI, deleteUserOnAPI } from "lib/services/UserService";
import ReactBSAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  FormGroup,
  Input,
  Form
} from "reactstrap";

function UserList() {

    const [myUserList, setMyUserList] = useState([]);
    const [alert, setAlert] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: null,
        email: null,
        mobile: null,
        password: null
    });

    useEffect(()=> {
        fetchUsers();
    },[]);
    useEffect(()=> {
        displayUsers()
    },[UserList]);

    const fetchUsers = async() => {
        const fetchedUsers = await getAllUser();
        setMyUserList(fetchedUsers);
    }

    const addUser = () => {
        setCurrentUser({
            id: null,
            name: '',
            email: '',
            mobile: '',
            password: ''
        });
        setshowModal(true);
    }

    const editUser = (user) => {
        setCurrentUser(user);
        setshowModal(true);
    }


    const saveUser = async(event) => {

        if((currentUser.name === '')||
            (currentUser.email === '')||
            (currentUser.mobile === '')||
            (currentUser.password === '')) { 
            setAlert(
                <ReactBSAlert
                danger
                style={{ display: "block", marginTop: "" }}
                title="Invalid User Data"
                onConfirm={() => {
                    setAlert(null);
                }}
                
                confirmBtnBsStyle="warning"
                confirmBtnText="OK"
            
                btnSize=""
                >
                    Please input user data
            </ReactBSAlert>
            );
        }
        
        const response = await addUserOnAPI(currentUser);
        if(response){
            setAlert(
                <ReactBSAlert
                success
                style={{ display: "block", marginTop: "" }}
                title="Successful"
                onConfirm={() => {
                    setAlert(null);
                    setshowModal(false);
                    fetchUsers();
                }}
                
                confirmBtnBsStyle="default"
                confirmBtnText="OK"
            
                btnSize=""
                >
                    {response.message}
            </ReactBSAlert>
            );
        }
        // console.log(currentUser);
    }

    const deleteUser = async(user) => {
        setAlert(
            <ReactBSAlert
            danger
            style={{ display: "block", marginTop: "" }}
            title="Delete User"
            onConfirm={async() => {
                // setAlert(null);
                let resp = await deleteUserOnAPI(user.id);
                console.log(resp);
                if(resp){
                    setAlert(
                        <ReactBSAlert
                        success
                        style={{ display: "block", marginTop: "" }}
                        title="Deleted User"
                        onConfirm={()=>{
                            setAlert(null);
                        }}
                        >
                            Successful Delete
                        </ReactBSAlert>
                    )
                }
            }}
            onCancel={() => { setAlert(null)}}
            
            confirmBtnBsStyle="warning"
            confirmBtnText="Yes"
            showCancel
            cancelBtnText="No"
            cancelBtnBsStyle="primary"
            btnSize=""
            >
                Are you sure you want to delete this user?
        </ReactBSAlert>
        );
    }

    const displayUsers = () => {
        if(myUserList.length> 0){
            return myUserList.map((user) => {
                return(
                    <>
                    <tr id={user.id} key={user.id}>
                        <td>
                            {user.name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.mobile}
                        </td>
                        <td>
                            <Button color="default" onClick={()=>{editUser(user)}}>
                                Edit
                            </Button>
                            <Button color="danger"  onClick={()=>{deleteUser(user)}}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                    </>
                )
            })
        }
    }

    return (
    <>
        {alert}
        {/* Edit user modal */}
        <Modal
            className="modal-dialog-centered"
            isOpen={showModal}
            toggle={() => { setshowModal(!showModal) } }
            size="md"
            backdrop="static"
            >
            <div className="modal-header">
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => { setshowModal(!showModal) } }
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
            <Form className="p-3">
                  <Row>
                    <Col className="pl-1" md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          placeholder="Name"
                          type="text"
                          value={currentUser.name}
                          onChange={(e)=>{
                            setCurrentUser({...currentUser,name: e.target.value})
                          }}
                        />
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="pl-1" md="12">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input placeholder="Email" type="email"
                          value={currentUser.email}
                          onChange={(e)=>{
                            setCurrentUser({...currentUser,email: e.target.value})
                          }}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="pl-1" md="12">
                      <FormGroup>
                        <label>Mobile</label>
                        <Input
                          placeholder="Mobile"
                          type="number"
                          value={currentUser.mobile}
                          onChange={(e)=>{
                            setCurrentUser({...currentUser,mobile: e.target.value})
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="12">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          placeholder="************"
                          type="text"
                          onChange={(e)=>{
                            setCurrentUser({...currentUser,password: e.target.value})
                          }}
                        //   value={currentUser.password}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={saveUser}
                      >
                        Save
                      </Button>
                    </div>
                  </Row>
                </Form>
            </div>
        </Modal>
        {/* Edit user modal end*/}
        <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                  <Row>
                      <Col>
                        <CardTitle tag="h4">Users Table</CardTitle>
                      </Col>
                      <Col>
                        <div className="text-right">
                            <Button color="info" onClick={()=> {addUser()}}>
                                Add User
                            </Button>
                        </div>
                      </Col>
                  </Row>
                
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayUsers()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserList;

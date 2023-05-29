import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input,
    Breadcrumb,
    BreadcrumbItem,
    Table,
} from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BatchList = () =>{

    const [state, setState] = useState(true);
    const [key, setKey] = useState('tab');

    return(
        <div className="page-content batches-list">
            <div className='d-flex justify-content-between'>
                <div><Link to="/batch"><i className='mdi mdi-chevron-left'></i> Batch List</Link></div>
                {/* <div>Batch List / Batch Information</div> */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/batch">Batch List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Batch Information</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
            <Row>
                <Col md={6}><h4>BATCH INFORMATION</h4></Col>
                <Col md={6}>
                    <div className='d-flex justify-content-end'>
                        <Button color="success" className='mb-3 ms-2'>Duplicate Batch</Button>
                        <Button color="success" className='mb-3 ms-2'>Edit Batch</Button>
                        <UncontrolledDropdown className='mb-3 ms-2'>
                            <DropdownToggle caret color="primary">More <i className='mdi mdi-dots-vertical'></i></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><i className='mdi mdi-send text-success'></i> Send Notification</DropdownItem>
                                <DropdownItem><i className='mdi mdi-delete text-danger'></i> Delete Batch</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <div>
                        <Card>
                            <CardBody>
                                <div className='d-flex'>
                                    <div>Learners Batch</div>
                                    <div className='ms-2'>
                                        <FormGroup switch>
                                            <Label check>Enable</Label>
                                            <Input type="switch" checked={state} onClick={() => {setState(!state);}} />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='mt-4 table-style'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Course Name:</td>
                                                <th>Full Stack Web Developer Program</th>
                                            </tr>
                                            <tr>
                                                <td>Description:</td>
                                                <th>For Freshers Only</th>
                                            </tr>
                                            <tr>
                                                <td>Variant Type:</td>
                                                <th>Full Time</th>
                                            </tr>
                                            <tr>
                                                <td>Start Date:</td>
                                                <th>07 Oct 22</th>
                                            </tr>
                                            <tr>
                                                <td>End Date:</td>
                                                <th>12 Oct 22</th>
                                            </tr>
                                            <tr>
                                                <td>Lectures:</td>
                                                <th>9</th>
                                            </tr>
                                            <tr>
                                                <td>Learners:</td>
                                                <th>40</th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                <Col md={7}>
                    <Card>
                        <CardBody>
                            <div>
                                <Tabs  activeKey={key} onSelect={(k) => setKey(k)} >
                                    <Tab eventKey="tab" title="Learners">
                                        <Row>
                                            <Col md={12} className='text-end'>
                                                <Button color="success" className='rounded-pill mb-3'>
                                                    + Add New Learner
                                                </Button>
                                                <div className='text-start'><h4>Learners</h4></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className="search-box">
                                                    <div className="app-search p-0">
                                                        <div className="position-relative mb-2">
                                                            <input className="form-control mb-3" type="text"  placeholder="Search by Batch name" />
                                                            <span className="bx bx-search-alt" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='text-end'>
                                                    <Button color="secondary">Export</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <h6 className='mt-3'>Total Learners: 40</h6>
                                        <Row>
                                            <Col md={12}>
                                                <div className='table-responsive'>
                                                    <Table className='table-list'>
                                                        <thead className='bg'>
                                                            <tr>
                                                                <th style={{minWidth:'25px'}}><Input type="checkbox" /></th>
                                                                <th>Name</th>
                                                                <th>Assignments</th>
                                                                <th>Assessments</th>
                                                                <th>Projects</th>
                                                                <th>Attendance</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><Input type="checkbox" /></td>
                                                                <th>Shubham D</th>
                                                                <td>160/200</td>
                                                                <td>160/200</td>
                                                                <td>16/20</td>
                                                                <td>%</td>
                                                                <td>Block</td>
                                                                <td>Send Icon</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="lectures" title="Lectures">
                                        1234576890
                                    </Tab>
                                    <Tab eventKey="mentors" title="Mentors">
                                        0987654321ewwrtu
                                    </Tab>
                                </Tabs>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BatchList;
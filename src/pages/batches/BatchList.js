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
    Progress
} from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BatchList = () =>{

    const [state, setState] = useState(true);
    const [key, setKey] = useState('tab');

    return(
        <div className="page-content batches-list">
            <div className='d-flex justify-content-between'>
                <div><Link to="/batch"><i className='mdi mdi-chevron-left'></i> Batch Detail</Link></div>
                {/* <div>Batch List / Batch Information</div> */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/batch">Batch</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Batch Detail</BreadcrumbItem>
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
                                    <h4>Learners Batch</h4>
                                    <div className='ms-3 d-flex'>
                                        <Label check className='me-2'>Enable</Label>
                                        <FormGroup switch>
                                            
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
                    <div>
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="chart-heading">Batch Progress</span>
                                </div>
                                <Row>
                                    <Col md={6}>
                                        <p className="mb-3 chart-subheading">Total Lectures</p>
                                        <p className="mb-3">
                                            <strong style={{ fontSize: "15px" }}>4</strong> /9 Completed
                                        </p>
                                        <p className="mb-3 chart-subheading">Avg. Present </p>
                                        <p className="mb-3" style={{ fontSize: "16px" }}>
                                            <strong>60%</strong>
                                        </p>
                                        <p className="mb-3 chart-subheading">
                                            <span className="text-green" style={{background:'none'}}>
                                                12% <i className='mdi mdi-arrow-up'></i>
                                            </span>Last Month
                                        </p>
                                        <p className="mb-3 chart-subheading">Avg. Time Spent </p>
                                        <p className="mb-3" style={{ fontSize: "16px" }}>
                                            <strong>23 Min</strong>
                                        </p>
                                        <p className="mb-3 chart-subheading">Avg. Present </p>
                                        <p className="mb-4 chart-subheading">
                                            <span className="text-green" style={{background:'none',color:'#F46A6A'}}>12% 
                                            <i className='mdi mdi-arrow-down'></i></span>Last Month
                                        </p>
                                        <p className="mb-3 chart-subheading">
                                            Next Lecture On: <strong>08 Oct 22</strong>
                                        </p>
                                    </Col>
                                    <Col md={6} className='d-flex align-items-center'>
                                        Circle Progress
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardBody>
                                <div className='d-flex justify-content-between px-2'>
                                    <div className='assign-text'>
                                        Assignments<br/>
                                        <span>200</span>
                                    </div>
                                    <div className='assign-text'>
                                        Assessments <br/>
                                        <span>200</span>
                                    </div>
                                    <div className='assign-text'>
                                        Projects<br/>
                                        <span>20</span>
                                    </div>
                                </div>
                                <hr></hr>
                                <h5>Completion Status By Learners</h5>
                                <div className='mt-4'>
                                    <div className='my-progress-bar'>
                                        <Label className='me-3'>Assignments</Label>
                                        <div className="w-100 text-center">
                                            <Progress  value="25" color="primary" ></Progress>
                                            <Label className='me-2 label'><span>32</span>/40 Learners</Label>
                                        </div>
                                    </div>
                                    <div className='my-progress-bar'>
                                        <Label className='me-3'>Assignments</Label>
                                        <div className="w-100 text-center">
                                            <Progress  value="25" color="warning" ></Progress>
                                            <Label className='me-2 label'><span>32</span>/40 Learners</Label>
                                        </div>
                                    </div>
                                    <div className='my-progress-bar'>
                                        <Label className='me-3'>Assignments</Label>
                                        <div className="w-100 text-center">
                                            <Progress value="25" color="danger" ></Progress>
                                            <Label className='me-2 label'><span>32</span>/40 Learners</Label>
                                        </div>
                                    </div>
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
                                                    {/* <Table className='table-list'>
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
                                                    </Table> */}
                                                    Table
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="lectures" title="Lectures">
                                        Lectures
                                    </Tab>
                                    <Tab eventKey="mentors" title="Mentors">
                                        Mentors
                                    </Tab>
                                    <Tab eventKey="grade book" title="Grade Book">
                                        Grade Book
                                    </Tab>
                                </Tabs>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col md={12}>
                    <div className='py-3' style={{background:'#fff'}}>
                        <Button color="primary" outline className='px-5 ms-4'>Cancel</Button>
                        <Button color="danger" className='px-5 ms-4'>Delete</Button>
                    </div>
                </Col>
            </Row> */}
        </div>
    )
}

export default BatchList;
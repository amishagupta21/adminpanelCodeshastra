import React, { useState } from 'react';
import '../batches/batches.css';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Input,
    Table,
    Progress,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap";

const Batches = () =>{


    return(
        <div className="page-content batches-home">
            <Row>
                <Col md={12}>
                    <h4>BATCHES</h4>
                    {/* <div className="batches-box">
                        <Card>
                            <CardBody>
                                <div className="box">
                                    <div>
                                        <p className="box-heading">All Batches</p>
                                        <p className="score">60</p>
                                    </div>
                                    <div className="icon-circle">
                                        <span className="mdi mdi-account-circle" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="box">
                                    <div>
                                        <p className="box-heading">Active Batches</p>
                                        <p className="score">30</p>
                                    </div>
                                    <div className="icon-circle">
                                        <span className="mdi mdi-account-circle" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="box">
                                    <div>
                                        <p className="box-heading">Completed</p>
                                        <p className="score">24</p>
                                    </div>
                                    <div className="icon-circle">
                                        <span className="mdi mdi-account-circle" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="box">
                                    <div>
                                        <p className="box-heading">Up Coming</p>
                                        <p className="score">39</p>
                                    </div>
                                    <div className="icon-circle">
                                        <span className="mdi mdi-account-circle" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="box">
                                    <div>
                                        <p className="box-heading">Ending This Week</p>
                                        <p className="score">39</p>
                                    </div>
                                    <div className="icon-circle">
                                        <span className="mdi mdi-account-circle" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div> */}

                    <Row>
                        <Col sm={6} md={3}>
                            <div className='batches-box'>
                                <Card>
                                    <CardBody>
                                        <div className="box">
                                            <div>
                                                <p className="box-heading">All Batches</p>
                                                <p className="score">60</p>
                                            </div>
                                            <div className="icon-circle">
                                                <span className="mdi mdi-account-circle" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className='batches-box'>
                                <Card>
                                    <CardBody>
                                        <div className="box">
                                            <div>
                                                <p className="box-heading">Active Batches</p>
                                                <p className="score">30</p>
                                            </div>
                                            <div className="icon-circle">
                                                <span className="mdi mdi-account-circle" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className='batches-box'>
                                <Card>
                                    <CardBody>
                                        <div className="box">
                                            <div>
                                                <p className="box-heading">Completed Batches</p>
                                                <p className="score">24</p>
                                            </div>
                                            <div className="icon-circle">
                                                <span className="mdi mdi-account-circle" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={6} md={3}>
                            <div className='batches-box'>
                                <Card>
                                    <CardBody>
                                        <div className="box">
                                            <div>
                                                <p className="box-heading">Up Coming Batches</p>
                                                <p className="score">39</p>
                                            </div>
                                            <div className="icon-circle">
                                                <span className="mdi mdi-account-circle" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between my-4">
                        <h4>ALL BATCHES</h4>
                         <Button color="success" className='rounded-pill mb-3' >
                            + Create New Batch
                        </Button>
                    </div>
                    <div className="mt-2 batches-home">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xl={2}>
                                        <div className="search-box">
                                            <div className="app-search p-0">
                                                <div className="position-relative mb-2">
                                                    <input className="form-control mb-3" type="text"  placeholder="Search by Batch name" />
                                                    <span className="bx bx-search-alt" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={10}>
                                        <div className="box-r-btn">
                                            <div className="ms-lg-3 mb-3">
                                                <Input type="select" >
                                                    <option selected>Status</option>
                                                    <option>Not Started</option>
                                                    <option>In-Progress</option>
                                                    <option>Completed</option>
                                                    <option>Archived</option>
                                                </Input>
                                            </div>
                                            <div className="ms-lg-3 mb-3">
                                                <Input type="select" >
                                                    <option selected>Progress</option>
                                                    <option>Completed</option>
                                                    <option>In-Progress</option>
                                                </Input>
                                            </div>
                                            <div className="ms-lg-3 mb-3">
                                                <Input type="select"  >
                                                    <option selected>Course Name </option>
                                                    <option>Status - 1</option>
                                                    <option>Status - 2</option>
                                                </Input>
                                            </div>
                                            <div className="ms-lg-3 mb-3">
                                                <Button className=' btn-grey'><i className="mdi mdi-filter"></i> Apply Fillter</Button>
                                            </div>
                                            <div className='ms-lg-3 mb-3'>
                                                <Input type="select"  >
                                                    <option selected>Export </option>
                                                    <option>Export as pdf</option>
                                                    <option>Export as excel</option>
                                                </Input>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <h6 className='mt-3'>Total Batches: 60</h6>
                                <div className="table-responsive">
                                    <Table>
                                        <thead className='bg'>
                                            <tr>
                                                <th style={{minWidth:'25px'}}><Input type="checkbox" /></th>
                                                <th>Batch Name</th>
                                                <th>Description</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Course Name</th>
                                                <th>Lectures</th>
                                                <th>Learners</th>
                                                <th>Progress</th>
                                                <th>Status</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><Input type="checkbox" /></td>
                                                <th>Learners Batch</th>
                                                <td>For Freshers Only</td>
                                                <td>07 Oct 22</td>
                                                <td>07 Jan 23</td>
                                                <td>Full Stack Web Developer Program</td>
                                                <td>9</td>
                                                <td>40</td>
                                                <td>
                                                    <div className="pe-4">
                                                        <span>40%</span>
                                                        <Progress value="40" animated></Progress>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input type="select" >
                                                        <option selected>Status</option>
                                                        <option>Not Started</option>
                                                        <option>In-Progress</option>
                                                        <option>Completed</option>
                                                        <option>Archived</option>
                                                    </Input>
                                                </td>
                                                {/* <td>
                                                    <div className='action'>
                                                        <span className='me-3'>
                                                            <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                        </span>
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td><Input type="checkbox" /></td>
                                                <th>Master Classes</th>
                                                <td>Professional Users</td>
                                                <td>22 Oct 22</td>
                                                <td>26 Jan 23</td>
                                                <td>Data Science</td>
                                                <td>6</td>
                                                <td>30</td>
                                                <td>
                                                    <div className="pe-4">
                                                        <span>30%</span>
                                                        <Progress value="30" animated></Progress>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input type="select" >
                                                        <option selected>Status</option>
                                                        <option>Not Started</option>
                                                        <option>In-Progress</option>
                                                        <option>Completed</option>
                                                        <option>Archive</option>
                                                    </Input>
                                                </td>
                                                {/* <td>
                                                    <div className='action'>
                                                        <span className='me-3'>
                                                            <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                        </span>
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td><Input type="checkbox" /></td>
                                                <th>Freshers Batch</th>
                                                <td>For the learners batch</td>
                                                <td>8 Nov 22</td>
                                                <td>08 Feb 23</td>
                                                <td>Full Stack Web Developer Program</td>
                                                <td>4</td>
                                                <td>20</td>
                                                <td>
                                                    <div className="pe-4">
                                                        <span>30%</span>
                                                        <Progress value="30" animated></Progress>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input type="select" >
                                                        <option selected>Status</option>
                                                        <option>Not Started</option>
                                                        <option>In-Progress</option>
                                                        <option>Completed</option>
                                                        <option>Archived</option>
                                                    </Input>
                                                </td>
                                                {/* <td>
                                                    <div className='action'>
                                                        <span className='me-3'>
                                                            <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                        </span>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Batches;
// import React from "react";
import React, { useState } from 'react';
import 
{
    Row, 
    Col,
    Button,
    Card,
    CardBody,
    Table,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../SMS-Email/smsemail.css';

function SmsEmailTemplates() {
    const [key, setKey] = useState('tab');
    const [state, setState] = useState(true);
    const [check, setCheck] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
        <div className="page-content">
            <Row>
                <Col xl={12}>
                    <h4>SMS/EMAIL TEMPLATES</h4>
                    <div className="sms-tab mt-3">
                        <Tabs  activeKey={key} onSelect={(k) => setKey(k)} >
                            <Tab eventKey="tab" title="Email Templates">
                                <div className='heading'>
                                    <h4>EMAIL TEMPLATES</h4>
                                    <Button color="success" className='me-3 mb-3 rounded-pill'>
                                        + Create Email Template
                                    </Button>
                                </div>
                                <Card>
                                    <CardBody>
                                        <div className="top-box">
                                            <div className="search-box">
                                                <div className="app-search p-0">
                                                    <div className="position-relative mb-2">
                                                        <input className="form-control" type="text" name="search" placeholder="Search by Template name and Template ID" />
                                                        <span className="bx bx-search-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-btn d-flex'>
                                                <span>
                                                    <Input type="select" style={{width:'120px'}} className='me-3' >
                                                        <option selected>Status</option>
                                                        <option>Status - 1</option>
                                                        <option>Status - 2</option>
                                                    </Input>
                                                </span>
                                                <span>
                                                    <Button className='me-3 mb-2 btn-grey'><i className="mdi mdi-filter"></i> Apply Fillter</Button>
                                                </span>
                                                <span>
                                                    <Button className='me-3 mb-2'>Export </Button>
                                                </span>
                                            </div>
                                        </div>
                                        <h6 className='mt-3'>Total Template: 10</h6>
                                        <div className="my-3 faq-table table-responsive">
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Input type="checkbox" />
                                                        </th>
                                                        <th>Template Name</th>
                                                        <th>Template ID</th>
                                                        <th>Created On</th>
                                                        <th>Subject</th>
                                                        <th>Message</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><Input type="checkbox" /></td>
                                                        <td>For Late Fees</td>
                                                        <td>TEMP_2121</td>
                                                        <td>07 Oct 22</td>
                                                        <td>For the learners delay fees</td>
                                                        <td>
                                                            Lorem ipsum päsk antikåssa suprav i lydest därför att käs. 
                                                        </td>
                                                        <td>
                                                            <span className='me-3'>
                                                                <FormGroup switch>
                                                                    <Input type="switch" checked={state} onClick={() => {
                                                                        setState(!state);
                                                                    }}
                                                                    />
                                                                </FormGroup>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className='action'>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-eye font-size-16 text-primary'></i>
                                                                </span>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-pencil font-size-16 text-success'></i>
                                                                </span>
                                                                <span className='me-3'>
                                                                    <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input type="checkbox" /></td>
                                                        <td>For Late Fees</td>
                                                        <td>TEMP_2121</td>
                                                        <td>07 Oct 22</td>
                                                        <td>For the learners delay fees</td>
                                                        <td>
                                                            Lorem ipsum päsk antikåssa suprav i lydest därför att käs. 
                                                        </td>
                                                        <td>
                                                            <span className='me-3'>
                                                                <FormGroup switch>
                                                                    <Input type="switch" checked={check} onClick={() => {
                                                                        setCheck(!check);
                                                                    }}
                                                                    />
                                                                </FormGroup>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className='action'>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-eye font-size-16 text-primary'></i>
                                                                </span>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-pencil font-size-16 text-success'></i>
                                                                </span>
                                                                <span className='me-3'>
                                                                    <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab eventKey="profile" title="SMS Templates">
                                <div className='heading'>
                                    <h4>SMS TEMPLATES</h4>
                                    <Button color="success" className='me-3 mb-3 rounded-pill'>
                                        + Create SMS Template
                                    </Button>
                                </div>
                                <Card>
                                    <CardBody>
                                        <div className="top-box">
                                            <div className="search-box">
                                                <div className="app-search p-0">
                                                    <div className="position-relative mb-2">
                                                        <input className="form-control" type="text" name="search" placeholder="Search by Template name and Template ID" />
                                                        <span className="bx bx-search-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-btn d-flex'>
                                                <span>
                                                    <Input type="select" style={{width:'120px'}} className='me-3' >
                                                        <option selected>Status</option>
                                                        <option>Status - 1</option>
                                                        <option>Status - 2</option>
                                                    </Input>
                                                </span>
                                                <span>
                                                    <Button className='me-3 mb-2 btn-grey'><i className="mdi mdi-filter"></i> Apply Fillter</Button>
                                                </span>
                                                <span>
                                                    <Button className='me-3 mb-2'>Export </Button>
                                                </span>
                                            </div>
                                        </div>
                                        <h6 className='mt-3'>Total Template: 10</h6>
                                        <div className="my-3 faq-table table-responsive">
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <Input type="checkbox" />
                                                        </th>
                                                        <th>Template Name</th>
                                                        <th>Template ID</th>
                                                        <th>Created On</th>
                                                        <th>Message</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><Input type="checkbox" /></td>
                                                        <td>For Late Fees</td>
                                                        <td>TEMP_2121</td>
                                                        <td>07 Oct 22</td>
                                                        <td>
                                                            Lorem ipsum päsk antikåssa suprav i lydest därför att käs. 
                                                        </td>
                                                        <td>
                                                            <span className='me-3'>
                                                                <FormGroup switch>
                                                                    <Input type="switch" checked={state} onClick={() => {
                                                                        setState(!state);
                                                                    }}
                                                                    />
                                                                </FormGroup>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className='action'>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-eye font-size-16 text-primary'></i>
                                                                </span>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-pencil font-size-16 text-success'></i>
                                                                </span>
                                                                <span className='me-3'>
                                                                    <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input type="checkbox" /></td>
                                                        <td>For Late Fees</td>
                                                        <td>TEMP_2121</td>
                                                        <td>07 Oct 22</td>
                                                        <td>
                                                            Lorem ipsum päsk antikåssa suprav i lydest därför att käs. 
                                                        </td>
                                                        <td>
                                                            <span className='me-3'>
                                                                <FormGroup switch>
                                                                    <Input type="switch" checked={check} onClick={() => {
                                                                        setCheck(!check);
                                                                    }}
                                                                    />
                                                                </FormGroup>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className='action'>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-eye font-size-16 text-primary'></i>
                                                                </span>
                                                                <span className='me-3' onClick={toggle}>
                                                                    <i className='mdi mdi-pencil font-size-16 text-success'></i>
                                                                </span>
                                                                <span className='me-3'>
                                                                    <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>

                        <Modal isOpen={modal} toggle={toggle} className='modal-dialog modal-lg'>
                            <ModalHeader toggle={toggle}>For Late Fees-SMS Template Preview</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" outline onClick={toggle}>Cancel</Button>
                                <Button color="primary" onClick={toggle}>Save</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default SmsEmailTemplates;
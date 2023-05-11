
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';


function Curriculum(args) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Row>
                <Col md={12}>
                    <div className='d-flex justify-content-between'>
                        <h4 className="text-primary d-flex align-items-center mt-8">Curriculum</h4>
                        <div>
                            <div className='d-flex justify-content-end'>
                        
                                <Button color="success" outline onClick={toggle} className='me-3 rounded-pill'>+ Add Assessment</Button>
                                <Button color="success" outline onClick={toggle} className='me-3 rounded-pill'>+ Clone Chapter</Button>
                                <Button color="success" onClick={toggle} className='rounded-pill'>+ Add New Chapter</Button>

                                <Modal isOpen={modal} toggle={toggle} {...args} className='modal-dialog modal-xl'>
                                    <ModalHeader toggle={toggle}>Edit Assessment</ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={toggle}>
                                            Do Something
                                        </Button>
                                        <Button color="secondary" onClick={toggle}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ul className='ul-style'>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>
                </Col>
            </Row>
        </div>
    );
}
export default Curriculum;
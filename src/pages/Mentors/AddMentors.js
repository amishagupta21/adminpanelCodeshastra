import React from "react";
import {
    Card,
    CardBody,
    Col, 
    Row,
    CardHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';

const AddMentors = () => {
    return(
        <div className="page-content">
            <h4 className="my-4">ADD MENTOR</h4>
            <Card>
                {/* <CardHeader>Add Mentor </CardHeader> */}
                <CardBody>
                    <Row>
                        <Col md={12}>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="text" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type="email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Mobile Number</Label>
                                    <Input type="text" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Topic</Label>
                                    <Input type="text" />
                                </FormGroup>
                                <div className="my-4">
                                    <Button color="primary" outline className="px-5 me-3">Cancel</Button>
                                    <Button color="primary" className="px-5">Save</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}
export default AddMentors;
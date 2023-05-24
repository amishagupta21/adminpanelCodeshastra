import React, { useState } from 'react';
import "./assignedBatches.css"
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    CardHeader,
    CardFooter
  } from 'reactstrap';

const AssignedBatches = () =>
{
    const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

    return(
        <div className='assigned-batches'>
            <Accordion open={open} toggle={toggle}>
                <AccordionItem >
                    <AccordionHeader targetId="1">
                        <div className="circles">
                            <span className="mdi mdi-checkbox-marked-outline" />
                        </div>
                        <div className='ms-2'>
                            <div className='heading'>Assigned Batches</div>
                            <div className='small-heading'>
                                2 Batches have assigned. You can remove or add new batches to this course.
                            </div>
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Row>
                            <Col md={6} xxl={5} className='mt-2'>
                                <Card style={{border:'1px solid #CED4DA'}}>
                                    <CardHeader style={{borderBottom:'1px solid #CED4DA',fontWeight:'500',fontSize:'13px'}}>
                                        Learners Batch
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                            <div className='mb-3'>For the learners batch</div>
                                            <div className='mb-3'>Mentors: 2</div>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <div style={{color:'#74788D'}}>Start Date</div>
                                                    <div>07 Oct 2022</div>
                                                </div>
                                                <div>
                                                    <div style={{color:'#74788D'}}>End Date</div>
                                                    <div>07 Oct 2022</div>
                                                </div>
                                            </div>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter style={{borderTop:'1px solid #CED4DA'}}>
                                        <div className='d-flex justify-content-center'>
                                            <Button color="danger" outline>Delete Batch </Button> 
                                            <Button color="primary" outline className='ms-2'>View Details</Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>
                            <Col md={6} xxl={5} className='mt-2'>
                            <Card style={{border:'1px solid #CED4DA'}}>
                                    <CardHeader style={{borderBottom:'1px solid #CED4DA',fontWeight:'500',fontSize:'13px'}}>
                                        Learners Batch
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>
                                            <div className='mb-3'>For the learners batch</div>
                                            <div className='mb-3'>Mentors: 2</div>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <div style={{color:'#74788D'}}>Start Date</div>
                                                    <div>07 Oct 2022</div>
                                                </div>
                                                <div>
                                                    <div style={{color:'#74788D'}}>End Date</div>
                                                    <div>07 Oct 2022</div>
                                                </div>
                                            </div>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter style={{borderTop:'1px solid #CED4DA'}}>
                                        <div className='d-flex justify-content-center'>
                                            <Button color="danger" outline>Delete Batch </Button> 
                                            <Button color="primary" outline className='ms-2'>View Details</Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AssignedBatches;
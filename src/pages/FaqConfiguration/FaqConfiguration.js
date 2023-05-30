import { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import "../FaqConfiguration/faqconfiguration.css"

import React, { useState } from "react"
import { getFaqs } from "store/FaqConfiguration/action"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import LiveCourses from "pages/Course/LiveCourses"
import CourseTable from "pages/Course/CourseTable"
import BootstrapTable from "react-bootstrap-table-next"

function FaqConfiguration(props) {
  const params = useParams()

  const [state, setState] = useState(true)
  const [check, setCheck] = useState(true)
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const { manageUser } = props
  const [item, setItem] = useState(manageUser)

  useEffect(() => {
    const { onGetFaqs } = props
    onGetFaqs(useParams.id)
  }, [])

  return (
    <div className="page-content">
      <Container>
        <Row>
          <Col md={12}>
            <h4>FAQ CONFIGURATION</h4>
            <Card>
              <CardBody>
                <div className="top-box">
                  <div className="search-box">
                    <div className="app-search p-0">
                      <div className="position-relative mb-2">
                        <input
                          className="form-control"
                          type="text"
                          name="search"
                          placeholder="Search by Question"
                        />
                        <span className="bx bx-search-alt" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button className="me-3 mb-2">
                      <i className="mdi mdi-filter"></i> Apply Fillter
                    </Button>
                    <Button className="me-3 mb-2">Export </Button>
                  </div>
                </div>
                <div className="my-5 faq-table table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          <Input type="checkbox" />
                        </th>
                        <th>FAQs</th>
                        <th>Catagories</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      {props?.manageUser.map((el, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Input type="checkbox" />
                            </td>
                            <td>{el?.questions}</td>
                            <td>{el?.category}</td>
                            <td>
                              <div className="action">
                                <span className="me-3">
                                  <FormGroup switch>
                                    <Input
                                      type="switch"
                                      checked={state}
                                      onClick={() => {
                                        setState(!state)
                                      }}
                                    />
                                  </FormGroup>
                                </span>
                                <span className="me-3" onClick={toggle}>
                                  <i className="mdi mdi-pencil font-size-16 text-success"></i>
                                </span>
                                <span className="me-3">
                                  <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}

                      {/* <tr>
                                                <td >
                                                   <Input type="checkbox" />
                                                </td>
                                                <td>
                                                    What types of training are available through Techfit Programs?
                                                </td>
                                                <td>About Techfit Program</td>
                                                <td>
                                                    <div className='action'>
                                                        <span className='me-3'>
                                                            <FormGroup switch>
                                                                <Input type="switch" checked={check} onClick={() => {
                                                                    setCheck(!check);
                                                                }}
                                                                />
                                                            </FormGroup>
                                                        </span>
                                                        <span className='me-3' onClick={toggle}>
                                                            <i className='mdi mdi-pencil font-size-16 text-success'></i>
                                                        </span>
                                                        <span className='me-3'>
                                                            <i className='mdi mdi-trash-can font-size-16 text-danger'></i>
                                                        </span>
                                                        <Modal isOpen={modal} toggle={toggle} className='modal-dialog modal-lg'>
                                                            <ModalHeader toggle={toggle}>Edit FAQ</ModalHeader>
                                                            <ModalBody>
                                                                <div>
                                                                    <h5>Question</h5>
                                                                    <Input type='text' placeholder="The course hours are not suitable for me. Is it possible to attend the sessions at my own convenience?" />
                                                                </div>
                                                                <div>
                                                                    <h5 className='my-3'>Status</h5>
                                                                    <span className='d-flex'>
                                                                        <Label check className='me-2'>Active</Label>
                                                                        <FormGroup switch>
                                                                            <Input type="switch" checked={check} onClick={() => {
                                                                                setCheck(!check);
                                                                            }}
                                                                            />
                                                                        </FormGroup>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <h5 className='my-3'>Category</h5>
                                                                    <Col md={4}>  
                                                                        <FormGroup>
                                                                            <Input name="select" type="select" >
                                                                                <option selected>General Category</option>
                                                                                <option>General Question</option>
                                                                                <option>About Techfit Program</option>
                                                                                <option>Fees and ISA</option>
                                                                            </Input>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </div>
                                                                <div>
                                                                    <h5 className='my-3'>Answer</h5>
                                                                    <p>Texteditor</p>
                                                                </div>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button color="primary" outline onClick={toggle}>
                                                                    Cancel
                                                                </Button>
                                                                <Button color="primary" onClick={toggle}>
                                                                    Save
                                                                </Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                    </div>
                                                </td>
                                            </tr> */}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
// export default FaqConfiguration;
FaqConfiguration.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Courses: PropTypes.array,
}

const mapStateToProps = ({ GetFaqs, state, count }) => ({
  manageUser: GetFaqs?.manageUser,
  usersCount: GetFaqs?.count,
  userRoles: GetFaqs?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetFaqs: data => dispatch(getFaqs(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FaqConfiguration)

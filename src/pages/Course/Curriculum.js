import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Table,
  Input,
  FormGroup,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"
import { getCurriculum } from "store/Curriculum/actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"

function Curriculum(props, args) {
  const params = useParams()

  const { manageUser, count } = props
  const [item, setItem] = useState(count)

  useEffect(() => {
    const { onGetCurriculum } = props
    onGetCurriculum(params.id)
  }, [])

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [state, setState] = useState(true)
  const [check, setCheck] = useState(true)

  const [open, setOpen] = useState("")
  const toggleAccordion = id => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  return (
    <div>
      <Row>
        <Col md={12}>
          <div className="d-lg-flex justify-content-lg-between">
            <h4 className="text-primary d-lg-flex align-items-lg-center mt-10">
              Curriculum
            </h4>
            <div>
              <div className="d-lg-flex justify-content-lg-end">
                <Button
                  color="success"
                  outline
                  onClick={toggle}
                  className="me-3 mb-3 rounded-pill"
                >
                  + Add Assessment
                </Button>
                <Button
                  color="success"
                  outline
                  onClick={toggle}
                  className="me-3 mb-3 rounded-pill"
                >
                  + Clone Chapter
                </Button>
                <Button
                  color="success"
                  onClick={toggle}
                  className="rounded-pill mb-3"
                >
                  + Add New Chapter
                </Button>

                <Modal
                  isOpen={modal}
                  toggle={toggle}
                  {...args}
                  fade={false}
                  centered={true}
                  className="modal-dialog modal-xl"
                >
                  <ModalHeader toggle={toggle}>Edit Assessment</ModalHeader>
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </Col>
      </Row>
      {/* <Row>
        <Col md={12}>
          <div className="mt-5">
            <Table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th> Chapter 1</th>
                  <th>Content</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {count?.map(item => (
                  <tr key={item.id}>
                    <th scope="row">
                      <Input
                        type="text"
                        placeholder="Position"
                        style={{ width: "50px" }}
                        value={item?.position}
                      />
                    </th>
                    <td>
                      <p className="cirr-text">{item?.description}</p>
                    </td>
                    <td>{item?.link}</td>
                    <td>
                      <div className="action">
                        <span className="me-3">
                          <FormGroup switch>
                            <Input
                              type="switch"
                              checked={item?.enable}
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
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row> */}

      {/* <Row>
        <Col md={12} className="pb-0">
          <div className="">
            {count?.map(item => (
              <ul key={item?.id} className="comment-box">
                <li className="w-25">
                  <div className="mb-3">
                    <strong>Position</strong>
                  </div>
                  <Input
                    type="text"
                    placeholder="Position"
                    value={item?.position}
                    style={{ width: "50px" }}
                  />
                </li>
                <li className="w-25">
                  <div className="mb-3">
                    <strong>Chapter 1</strong>
                  </div>
                  <p className="cirr-text">{item?.description}</p>
                </li>
                <li className="w-25">
                  <div className="mb-3">
                    <strong>Content</strong>
                  </div>
                  <p>{item?.content}</p>
                </li>
                <li className="w-25">
                  <div className="mb-3">&nbsp;</div>
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
                </li>
              </ul>
            ))}
          </div>
        </Col>
      </Row> */}

      <Row>
        <Col md={12}>
          <div className="my-accordion">
            <Accordion flush open={open} toggle={toggleAccordion}>
              <AccordionItem>
                <AccordionHeader targetId="1">2 Topics Added</AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="comment-box-border">
                    <ul className="comment-box">
                      <li>
                        <div className="mb-3">
                          <strong>Position</strong>
                        </div>
                        <Input
                          type="text"
                          placeholder="1"
                          style={{ width: "50px" }}
                        />
                      </li>
                      <li>
                        <div className="mb-3">
                          <strong>Topic 1</strong>
                        </div>
                        <p className="cirr-text">Introduction to C++</p>
                      </li>
                      <li>
                        <div className="mb-3">
                          <strong>Content</strong>
                        </div>
                        <p>Video</p>
                      </li>
                      <li>
                        <div className="mb-3">&nbsp;</div>
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
                      </li>
                    </ul>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </Col>
      </Row>
      {/* <Row>
                <Col md={12}>
                    <div className='mt-5'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th> Chapter 2</th>
                                    <th>Content</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <Input type="text" placeholder="2" style={{width:'50px'}} />
                                    </th>
                                    <td>
                                        <p className='cirr-text'>
                                            you will take your first steps into the metaverse, exploring what it is, how to interact with it, and how to....
                                        </p>
                                    </td>
                                    <td>External URL</td>
                                    <td>
                                        <div className='action'>
                                            <span className='me-3'>
                                                <FormGroup switch>
                                                    <Input type="switch" checked={state} onClick={() => {
                                                        setState(!state);
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
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row> */}
    </div>
  )
}

Curriculum.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  Curriculum: PropTypes.array,
}

const mapStateToProps = ({ Curriculum, state, count }) => ({
  manageUser: Curriculum?.manageUser,
  count: Curriculum?.count,
  userRoles: Curriculum?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetCurriculum: data => dispatch(getCurriculum(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Curriculum)

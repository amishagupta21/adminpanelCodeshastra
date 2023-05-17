import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  CardGroup,
  ListGroup,
  CardTitle,
  CardSubtitle,
  CardText,
  Label,
  Input,
  Form,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  UncontrolledAccordion,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"

import plus from "../../assets/images/add-plus.svg"
import "./personalDetailForm.css"
import PropTypes from "prop-types"
// import Accordion from 'react-bootstrap/Accordion'
import { connect } from "react-redux"
import {
  getCourseInformation,
  editCardConfiguration,
} from "store/CourseInformation/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom"
import { ToggleButton } from "react-bootstrap"
import Switch from "react-switch"

const CardConfiguration = props => {
  const [modal, setModal] = React.useState(false)
  const [viewData, setViewData] = useState("")

  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  const [inputFields, setInputFields] = useState([
    getCourseInformation?.card_configuration?.highlights?.value,
  ])

  // console.log(inputFields, "////////inputFields")

  const [cardConfiguration, setCardConfiguration] =
    useState(getCourseInformation)
  // console.log(cardConfiguration, "////////cardConfiguration")

  const params = useParams()

  useEffect(() => {
    setCardConfiguration(getCourseInformation)
  }, [getCourseInformation])

  useEffect(() => {
    setInputFields(getCourseInformation?.card_configuration?.highlights?.value)
  }, [getCourseInformation?.card_configuration?.highlights?.value])

  const data = getCourseInformation?.card_configuration

  const toggle = () => setModal(!modal)

  const editCard = event => {
    event.preventDefault()
    const { onEditCardConfiguration } = props
    onEditCardConfiguration({
      course_status: cardConfiguration?.course_status,
      id: cardConfiguration?.id,
      card_configuration: {
        bannerContentDesktop: {
          type: cardConfiguration?.card_configuration?.bannerContentDesktop
            ?.type,
          label:
            cardConfiguration?.card_configuration?.bannerContentDesktop?.label,
          value: [
            {
              url: cardConfiguration?.card_configuration?.bannerContentDesktop
                ?.value[0]?.url,
              type: cardConfiguration?.card_configuration?.bannerContentDesktop
                ?.value[0]?.type,
            },
            {
              url: cardConfiguration?.card_configuration?.bannerContentDesktop
                ?.value[1]?.url,
              type: cardConfiguration?.card_configuration?.bannerContentDesktop
                ?.value[1]?.type,
            },
          ],
        },
        bannerContentMobile: {
          type: cardConfiguration?.card_configuration?.bannerContentMobile
            ?.type,
          label:
            cardConfiguration?.card_configuration?.bannerContentMobile?.label,
          value: [
            {
              url: cardConfiguration?.card_configuration?.bannerContentMobile
                ?.value[0]?.url,
              type: cardConfiguration?.card_configuration?.bannerContentMobile
                ?.value[0]?.type,
            },
            {
              url: cardConfiguration?.card_configuration?.bannerContentMobile
                ?.value[1]?.url,
              type: cardConfiguration?.card_configuration?.bannerContentMobile
                ?.value[1]?.url,
            },
          ],
        },
        highlights: {
          type: cardConfiguration?.card_configuration?.highlights?.type,
          label: cardConfiguration?.card_configuration?.highlights?.label,
          value: [
            {
              title:
                cardConfiguration?.card_configuration?.highlights?.value[0]
                  ?.title,
              position:
                cardConfiguration?.card_configuration?.highlights?.value[0]
                  ?.position,
              enable:
                cardConfiguration?.card_configuration?.highlights?.value[0]
                  ?.enable,
            },
            {
              title:
                cardConfiguration?.card_configuration?.highlights?.value[1]
                  ?.title,
              position:
                cardConfiguration?.card_configuration?.highlights?.value[1]
                  ?.position,
              enable:
                cardConfiguration?.card_configuration?.highlights?.value[1]
                  ?.enable,
            },
            {
              title:
                cardConfiguration?.card_configuration?.highlights?.value[2]
                  ?.title,
              position:
                cardConfiguration?.card_configuration?.highlights?.value[2]
                  ?.position,
              enable:
                cardConfiguration?.card_configuration?.highlights?.value[2]
                  ?.enable,
            },
          ],
        },
      },
    })
  }

  const newHighlight = () => {
    setInputFields([...inputFields, { title: "", position: "", enable: "" }])
  }

  const handleChange = (event, index) => {
    console.log(event.target.checked)
    const result = [...inputFields]
    let indexValue = inputFields[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    setInputFields(result)
  }

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Card Configuration</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <AccordionItem>
              <AccordionHeader targetId="1">
                Banner Content
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="1" className="card-infor-space">
                {getCourseInformation?.card_configuration?.bannerContentDesktop?.value?.map(
                  item => {
                    const documentName = item.url
                    const array = documentName.split("/")

                    const lastsegment = array[array.length - 1]
                    // const result = str2.replace("_", " ")
                    // const fileName = item[1].split("/")
                    return (
                      <div key={item?.type} className="table-form">
                        <table className="table-full">
                          <tr>
                            <th>Card Banner (Desktop)</th>
                            <th>Action</th>
                          </tr>

                          <tr>
                            <td>
                              <p>{lastsegment}</p>
                            </td>
                            <td>
                              <div className="actions">
                                <i
                                  onClick={e => toggle(e, setViewData(item))}
                                  className="mdi mdi-eye font-size-18 text-primary me-1"
                                ></i>

                                <i className="mdi mdi-trash-can font-size-18 text-danger" />
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    )
                  }
                )}
                <Modal
                  isOpen={modal}
                  toggle={toggle}
                  modalTransition={{ timeout: 500 }}
                  centered={true}
                  fade={false}
                  contentClassName="modalContent"
                  size="lg"
                >
                  <ModalHeader
                    className="modalHeader"
                    toggle={toggle}
                  ></ModalHeader>

                  <img src={viewData?.url} />
                </Modal>
                {getCourseInformation?.card_configuration?.bannerContentDesktop?.value?.map(
                  item => (
                    <div key={item?.type} className="table-form">
                      <table className="table-full">
                        <tr>
                          <th>Card Banner (Mobile)</th>
                          <th>Action</th>
                        </tr>
                        <tr>
                          <td>
                            <div className="input-file-space">
                              <input type="file" multiple />
                              <span className="input-image">
                                100 X 200 px, JPEG/PNG , Max 10 mb
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="actions">
                              <i
                                className="mdi mdi-eye font-size-18 text-primary me-1"
                                onClick={e => toggle(e, setViewData(item))}
                              ></i>

                              <i className="mdi mdi-trash-can font-size-18 text-danger" />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )
                )}
                {/* <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Banner Video</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder=" www.youtube/aken_faelacc/aca.com"
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="actions">
                          <i className="mdi mdi-eye font-size-18 text-primary me-1"></i>

                          <i className="mdi mdi-trash-can font-size-18 text-danger" />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div> */}
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">
                Highlights
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M4.5 7.5H5.5V4.5H4.5V7.5ZM5 0C2.2375 0 0 2.2375 0 5C0 7.7625 2.2375 10 5 10C7.7625 10 10 7.7625 10 5C10 2.2375 7.7625 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM4.5 3.5H5.5V2.5H4.5V3.5Z"
                    fill="#74788D"
                  />
                </svg>
              </AccordionHeader>
              <AccordionBody accordionId="2" className="card-infor-space">
                {inputFields?.map((item, index) => {
                  return (
                    <div key={index} className="table-form">
                      <table className="table-full-width">
                        <tr>
                          <th>Title</th>
                          <th>Position</th>
                          <th>Action</th>
                        </tr>

                        <tr>
                          <td>
                            <Input
                              name="title"
                              className="form-control lg"
                              placeholder="Title"
                              type="text"
                              onChange={e => handleChange(e, index)}
                              value={item?.title}
                            />
                          </td>
                          <td>
                            <Input
                              name="position"
                              className="form-control sml"
                              placeholder=" Positon"
                              type="text"
                              onChange={e => handleChange(e, index)}
                              value={item?.position}
                            />
                          </td>
                          <td>
                            <div className="actions d-flex align-items-center">
                              <input
                                type="checkbox"
                                name="enable"
                                onChange={e => handleChange(e, index)}
                                checked={item?.enable}
                              />
                              <Switch
                                checked={item?.enable}
                                value={true}
                                name="enable"
                                onClick={e => handleChange(e, index)}
                                onColor="#556EE6"
                                onHandleColor="#fff"
                                handleDiameter={11}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                // border="5px solid red"
                                // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                border="1px "
                                height={15}
                                width={29}
                                className="react-switch"
                                id="material-switch"
                              />

                              <a href="">
                                <i className="mdi mdi-trash-can font-size-18 text-danger" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )
                })}

                {/* <div className="create-new-appointment">
                  <h2>
                    Create New Highlight{" "}
                    <img height="20px" width="20px" src={plus} />
                  </h2>
                </div> */}
                <div>
                  <button
                    className="px-4 ms-3 create-new-appointment"
                    // color="primary"
                    // outline
                    onClick={newHighlight}
                    // type="submit"
                  >
                    Create New Highlight{" "}
                    <img height="20px" width="20px" src={plus} />
                  </button>
                </div>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <div className="mt-1 d-flex justify-content-end">
          <Button
            className="px-4"
            color="danger"
            outline
            // type="submit"
          >
            Delete
          </Button>
          <Button
            className="px-4 ms-3 rou"
            color="primary"
            outline
            // type="submit"
          >
            Save & Draft
          </Button>
          <Button
            className="px-4 ms-3"
            color="primary"
            onClick={editCard}
            type="submit"
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </>
  )
}

CardConfiguration.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetCourse: PropTypes.any,
}

const mapStateToProps = ({ GetCourse }) => ({
  getCourseInformation: GetCourse?.getCourseInformation?.data,
  editCardConfiguration: GetCourse?.editCardConfiguration,
})

const mapDispatchToProps = dispatch => ({
  onGetCoursesInformation: data => dispatch(getCourseInformation(data)),
  onEditCardConfiguration: data => dispatch(editCardConfiguration(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardConfiguration)

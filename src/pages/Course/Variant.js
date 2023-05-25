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
  InputGroup,
  InputGroupText,
  FormGroup,
} from "reactstrap"

import plus from "../../assets/images/add-plus.svg"
import "./personalDetailForm.css"
import PropTypes from "prop-types"
// import Accordion from 'react-bootstrap/Accordion'
import { connect } from "react-redux"
import { getVariant, editVariant } from "store/Variant/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom"
import BannerContent from "./BannerContent"
import Highlights from "./Highlights"
import Overview from "./Overview"
import EligibilityCriteria from "./EligibilityCriteria"
import PaymentStructure from "./PaymentStructure"
import WhatYouWillLearn from "./WhatYouWillLearn"
import CurriculumCourse from "./CurriculumCourse"

const Variant = props => {
  const { onGetVariant, getVariant } = props
  const [inputFields, setInputFields] = useState(getVariant)
  const [modal, setModal] = React.useState(false)

  const [viewData, setViewData] = useState("")

  useEffect(() => {
    onGetVariant(params.id)
  }, [])

  const toggle = () => setModal(!modal)

  useEffect(() => {
    setInputFields(getVariant)
  }, [getVariant])

  const params = useParams()

  const pubishVariant = event => {
    event.preventDefault()
    const { onEditVariant } = props
    const bannerContentDesktopValues = []
    const bannerContentMobileValues = []
    const highlightsValues = []
    const overviewValues = []
    const eligibilityCriteriaValues = []
    const feesStructureValues = []
    const whatWillYouLearnValues = []
    inputFields?.course_variants[0]?.course_variant_sections?.bannerContentDesktop?.value.map(
      item => {
        bannerContentDesktopValues.push({
          type: item?.type,
          url: item?.url,
        })
      }
    )
    inputFields?.course_variants[0]?.course_variant_sections?.bannerContentMobile?.value.map(
      item => {
        bannerContentMobileValues.push({
          type: item?.type,
          url: item?.url,
        })
      }
    )
    inputFields?.course_variants[0]?.course_variant_sections?.highlights?.value.map(
      item => {
        highlightsValues.push({
          title: item?.title,
          enable: item?.enable,
          position: item?.position,
        })
      }
    )
    inputFields?.course_variants[0]?.course_variant_sections?.overview?.value.map(
      item => {
        overviewValues.push({
          title: item?.title,
          description: item?.description,
          icon: item?.icon,
          enable: item?.enable,
          position: item?.position,
        })
      }
    )

    inputFields?.course_variants[0]?.course_variant_sections?.eligibilityCriteria?.value.map(
      item => {
        eligibilityCriteriaValues.push({
          title: item?.title,
          description: item?.description,
          icon: item?.icon,
          enable: item?.enable,
          position: item?.position,
        })
      }
    )

    inputFields?.course_variants[0]?.course_variant_sections?.feesStructure?.value.map(
      item => {
        feesStructureValues.push({
          title: item?.title,
          description: item?.description,
          course_fees: item?.course_fees,
          curriculum_brochure_url: item?.curriculum_brochure_url,
          payment_template: item?.payment_template,
          enable: item?.enable,
          position: item?.position,
        })
      }
    )

    inputFields?.course_variants[0]?.course_variant_sections?.whatWillYouLearn?.value.map(
      item => {
        whatWillYouLearnValues.push({
          title: item?.title,
          description: item?.description,
          enable: item?.enable,
          position: item?.position,
        })
      }
    )

    onEditVariant({
      id: inputFields?.id,
      variant_name: inputFields?.course_variants[0]?.variant_name,
      course_type: inputFields?.course_variants[0]?.course_type,
      duration: inputFields?.course_variants[0]?.duration,
      target_audience: [],
      pay_after_placement: inputFields?.course_variants[0]?.pay_after_placement,
      rating: inputFields?.course_variants[0]?.rating,
      learner_count: inputFields?.course_variants[0]?.learner_count,
      variant_status: inputFields?.course_variants[0]?.variant_status,
      course_variant_sections: {
        bannerContentDesktop: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.bannerContentDesktop?.type,
          label:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.bannerContentDesktop?.label,
          value: bannerContentDesktopValues,
        },
        bannerContentMobile: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.bannerContentDesktop?.type,
          label:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.bannerContentDesktop?.label,
          value: bannerContentMobileValues,
        },

        highlights: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.highlights?.type,
          label:
            inputFields?.course_variants[0]?.course_variant_sections?.highlights
              ?.label,
          value: highlightsValues,
        },

        overview: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.overview?.type,
          enable:
            inputFields?.course_variants[0]?.course_variant_sections?.overview
              ?.enable,
          label:
            inputFields?.course_variants[0]?.course_variant_sections?.overview
              ?.label,
          value: overviewValues,
        },
        eligibilityCriteria: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.eligibilityCriteria?.type,
          enable:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.eligibilityCriteria?.enable,
          label:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.eligibilityCriteria?.label,
          value: eligibilityCriteriaValues,
        },
        feesStructure: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.feesStructure?.type,
          enable:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.feesStructure?.enable,
          label:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.feesStructure?.label,
          value: feesStructureValues,
        },
        whatWillYouLearn: {
          type: inputFields?.course_variants[0]?.course_variant_sections
            ?.whatWillYouLearn?.type,
          enable:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.whatWillYouLearn?.enable,
          label:
            inputFields?.course_variants[0]?.course_variant_sections
              ?.whatWillYouLearn?.label,
          value: whatWillYouLearnValues,
        },
      },
    })
  }

  const variantChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields?.course_variants]
    let indexValue = inputFields?.course_variants[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.course_variants = result
    setInputFields(data)
  }

  return (
    <>
      <div className="accordian-parts">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-primary">Variant</h4>
          <Button
            type="button"
            variant="success"
            color="success"
            className="btn-rounded mb-2 me-2"
            onClick={e => {
              history.push("/courses/create")
            }}
          >
            <i className="mdi mdi-plus me-1" /> Create New Variant
          </Button>
        </div>
        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            {inputFields?.course_variants?.map((item, index) => {
              return (
                <Form key={index} className="form-vertical mb-4">
                  <Row>
                    <Col sm={12}>
                      <div className="mb-4">
                        <Label className="form-label">Variant Name</Label>
                        <Input
                          name="variant_name"
                          className="form-control"
                          placeholder="Full Name"
                          type="variant_name"
                          onChange={e => variantChange(e, index)}
                          value={item?.variant_name}
                        />
                      </div>
                    </Col>

                    <Col sm={12}>
                      <Label className="form-label">Course Type</Label>
                      <Col sm={12} className="course-live">
                        <div>
                          <label>
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="courses"
                                id="workingProfessional"
                                // value="live"
                                onChange={e => variantChange(e, index)}
                                checked={
                                  item?.course_type === "workingProfessional"
                                }
                              />
                              &nbsp; Working Professional
                            </div>
                          </label>
                          &nbsp;&nbsp;
                          <label>
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="courses"
                                id="student"
                                value="library"
                                onChange={e => variantChange(e, index)}
                                checked={item?.course_type === "student"}
                              />
                              &nbsp; Student
                            </div>
                          </label>
                          &nbsp;&nbsp;
                          <label>
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="courses"
                                id="fresher"
                                value="library"
                                onChange={e => variantChange(e, index)}
                                checked={item?.course_type === "fresher"}
                              />
                              &nbsp; Fresher
                            </div>
                          </label>
                          &nbsp;&nbsp;
                          <label>
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="courses"
                                id="learner"
                                value="library"
                                onChange={e => variantChange(e, index)}
                                checked={item?.course_type === "learner"}
                              />
                              &nbsp; Learner
                            </div>
                          </label>
                          <label>
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="courses"
                                id="partTime"
                                value="library"
                                onChange={e => variantChange(e, index)}
                                checked={item?.course_type === "partTime"}
                              />
                              &nbsp; Part Time
                            </div>
                          </label>
                        </div>
                      </Col>{" "}
                    </Col>
                  </Row>
                  <AccordionItem className="mt-4">
                    <AccordionHeader targetId="1">
                      Variant Configuration
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
                      <div className="table-form">
                        <table className="table-full table-full-course">
                          <tr>
                            <th>Variant Type</th>
                            <th>Duration (in Weeks)</th>
                            <th>Pay After Placement</th>
                            <th>Rating</th>
                            <th>Learners Count</th>
                          </tr>
                          <tr>
                            <td>
                              <Row>
                                <Col sm={12} className="course-live">
                                  <div>
                                    <label>
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="radio"
                                          name="courses"
                                          id="live"
                                          // value="live"
                                          onChange={e =>
                                            variantChange(e, index)
                                          }
                                          checked={
                                            item?.course_type === "FullTime"
                                          }
                                        />
                                        &nbsp; Full Time
                                      </div>
                                    </label>
                                    &nbsp;&nbsp;
                                    <label>
                                      <div className="d-flex align-items-center">
                                        <input
                                          type="radio"
                                          name="courses"
                                          id="library"
                                          value="library"
                                          onChange={e =>
                                            variantChange(e, index)
                                          }
                                          checked={
                                            item?.course_type === "PartTime"
                                          }
                                        />
                                        &nbsp; Part Time
                                      </div>
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                            </td>
                            <td>
                              <Input
                                name="duration"
                                className="form-control form-control-color"
                                placeholder="Duration"
                                type="number"
                                onChange={e => variantChange(e, index)}
                                value={item?.duration}
                              />
                            </td>

                            <td>
                              <FormGroup switch>
                                <Input
                                  type="switch"
                                  name="pay_after_placement"
                                  onChange={e => variantChange(e, index)}
                                  checked={item?.pay_after_placement}
                                  // checked={state}
                                  // onClick={() => {
                                  //   setState(!state)
                                  // }}
                                />
                                Active
                              </FormGroup>
                            </td>
                            <td>
                              <Input
                                name="rating"
                                className="form-control sml"
                                placeholder="Rating"
                                type="text"
                                onChange={e => variantChange(e, index)}
                                value={item?.rating}
                              />
                            </td>
                            <td>
                              <Input
                                name="learner_count"
                                className="form-control sml"
                                placeholder="Learner Count"
                                type="text"
                                onChange={e => variantChange(e, index)}
                                value={item?.learner_count}
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Form>
              )
            })}

            <BannerContent
              bannerContentData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
              modal={modal}
              toggle={toggle}
              viewData={viewData}
              setViewData={setViewData}
            />
            <Highlights
              // newHighlight={newHighlight}
              highlightsData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
            />

            <Overview
              overViewData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
            />

            <EligibilityCriteria
              eligibilityData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
            />

            <PaymentStructure
              paymentStructureData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
            />
            <CurriculumCourse />

            <WhatYouWillLearn
              whatYouWillLearnData={
                inputFields?.course_variants
                  ? inputFields?.course_variants[0]?.course_variant_sections
                  : []
              }
            />
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
            onClick={pubishVariant}
            // type="submit"
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </>
  )
}

Variant.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetVariant: PropTypes.any,
}

const mapStateToProps = ({ Variant }) => ({
  getVariant: Variant?.getVariant,
  editVariant: Variant?.editVariant,
})

const mapDispatchToProps = dispatch => ({
  onGetVariant: data => dispatch(getVariant(data)),
  onEditVariant: data => dispatch(editVariant(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Variant)

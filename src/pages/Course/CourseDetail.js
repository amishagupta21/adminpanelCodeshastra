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
import {
  deleteProfilePicture,
  uploadProfilePicture,
  editLearnerDetail,
  editCourseDetail,
} from "store/CourseInformation/actions"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import "./courseDetail.css"
import Switch from "@mui/material/Switch"
import Select from "react-select"
import Overview from "./Overview"
import EligibilityCriteria from "./EligibilityCriteria"
import PaymentStructure from "./PaymentStructure"
import WhatYouWillLearn from "./WhatYouWillLearn"

const CourseDetail = props => {
  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  const [inputFields, setInputFields] = useState(getCourseInformation)

  // console.log(inputFields, "///////inputFields")

  const data = getCourseInformation?.course_detail_page

  useEffect(() => {
    setInputFields(getCourseInformation)
  }, [getCourseInformation])

  const publishCourseDetail = event => {
    event.preventDefault()
    const { onEditCardDetailConfiguration } = props
    const overviewValues = []
    const eligibilityCriteriaValues = []
    const feesStructureValues = []
    const whatWillYouLearnValues = []
    inputFields?.course_detail_page?.overview?.value.map(item => {
      overviewValues.push({
        title: item?.title,
        description: item?.description,
        icon: item?.icon,
        enable: item?.enable,
        position: item?.position,
      })
    })

    inputFields?.course_detail_page?.eligibilityCriteria?.value.map(item => {
      eligibilityCriteriaValues.push({
        title: item?.title,
        description: item?.description,
        icon: item?.icon,
        enable: item?.enable,
        position: item?.position,
      })
    })

    inputFields?.course_detail_page?.feesStructure?.value.map(item => {
      feesStructureValues.push({
        title: item?.title,
        description: item?.description,
        course_fees: item?.course_fees,
        curriculum_brochure_url: item?.curriculum_brochure_url,
        payment_template: item?.payment_template,
        enable: item?.enable,
        position: item?.position,
      })
    })

    inputFields?.course_detail_page?.whatWillYouLearn?.value.map(item => {
      whatWillYouLearnValues.push({
        title: item?.title,
        description: item?.description,
        enable: item?.enable,
        position: item?.position,
      })
    })

    onEditCardDetailConfiguration({
      course_status: inputFields?.course_status,
      id: inputFields?.id,
      course_detail_page: {
        overview: {
          type: inputFields?.course_detail_page?.overview?.type,
          enable: inputFields?.course_detail_page?.overview?.enable,
          label: inputFields?.course_detail_page?.overview?.label,
          value: overviewValues,
        },
        eligibilityCriteria: {
          type: inputFields?.course_detail_page?.eligibilityCriteria?.type,
          enable: inputFields?.course_detail_page?.eligibilityCriteria?.enable,
          label: inputFields?.course_detail_page?.eligibilityCriteria?.label,
          value: eligibilityCriteriaValues,
        },
        feesStructure: {
          type: inputFields?.course_detail_page?.feesStructure?.type,
          enable: inputFields?.course_detail_page?.feesStructure?.enable,
          label: inputFields?.course_detail_page?.feesStructure?.label,
          value: feesStructureValues,
        },
        whatWillYouLearn: {
          type: inputFields?.course_detail_page?.whatWillYouLearn?.type,
          enable: inputFields?.course_detail_page?.whatWillYouLearn?.enable,
          label: inputFields?.course_detail_page?.whatWillYouLearn?.label,
          value: whatWillYouLearnValues,
        },
      },
    })
  }

  const addOverview = () => {
    const arr = [...inputFields?.course_detail_page?.overview?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      icon: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.course_detail_page.overview.value = arr

    setInputFields(result)
  }

  const addEligibilityCriteria = () => {
    const arr = [...inputFields?.course_detail_page?.eligibilityCriteria?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      icon: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.course_detail_page.eligibilityCriteria.value = arr

    setInputFields(result)
  }

  const addPaymentStructure = () => {
    const arr = [...inputFields?.course_detail_page?.feesStructure?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      course_fees: "",
      payment_template: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.course_detail_page.feesStructure.value = arr

    setInputFields(result)
  }

  const addWhatYouWillLearn = () => {
    const arr = [...inputFields?.course_detail_page?.whatWillYouLearn?.value]
    let result = { ...inputFields }
    const initalObj = {
      title: "",
      description: "",
      position: "",
      enable: false,
    }
    arr.push(initalObj)
    result.course_detail_page.whatWillYouLearn.value = arr

    setInputFields(result)
  }

  const handleChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.course_detail_page.overview.value]
    let indexValue = inputFields.course_detail_page.overview.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.course_detail_page.overview.value = result
    setInputFields(data)
  }

  const eligibilityChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.course_detail_page.eligibilityCriteria.value]
    let indexValue =
      inputFields.course_detail_page.eligibilityCriteria.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.course_detail_page.eligibilityCriteria.value = result
    setInputFields(data)
  }

  const paymentStructureChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.course_detail_page.feesStructure.value]
    let indexValue = inputFields.course_detail_page.feesStructure.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.course_detail_page.feesStructure.value = result
    setInputFields(data)
  }

  const whatWillLearnChange = (event, index) => {
    const data = { ...inputFields }
    const result = [...inputFields.course_detail_page.whatWillYouLearn.value]
    let indexValue =
      inputFields.course_detail_page.whatWillYouLearn.value[index]
    indexValue = {
      ...indexValue,
      [event.target.name]:
        event.target.name === "enable"
          ? !event.target.checked
          : event.target.value,
    }
    result[index] = indexValue
    data.course_detail_page.whatWillYouLearn.value = result
    setInputFields(data)
  }

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Course Detail Page</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <Overview
              inputFields={inputFields}
              addOverview={addOverview}
              handleChange={handleChange}
            />
            <EligibilityCriteria
              inputFields={inputFields}
              addEligibilityCriteria={addEligibilityCriteria}
              eligibilityChange={eligibilityChange}
            />

            <PaymentStructure
              inputFields={inputFields}
              addPaymentStructure={addPaymentStructure}
              paymentStructureChange={paymentStructureChange}
            />

            <WhatYouWillLearn
              inputFields={inputFields}
              addWhatYouWillLearn={addWhatYouWillLearn}
              whatWillLearnChange={whatWillLearnChange}
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
            type="submit"
            onClick={publishCourseDetail}
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </>
  )
}

CourseDetail.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  GetCourse: PropTypes.any,
}

const mapStateToProps = ({ GetCourse }) => ({
  getCourseInformation: GetCourse?.getCourseInformation?.data,
  editCourseDetail: GetCourse?.editCourseInformation,
})

const mapDispatchToProps = dispatch => ({
  // onGetCoursesInformation: data => dispatch(getCourseInformation(data)),
  onEditCardDetailConfiguration: data => dispatch(editCourseDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail)

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
import CurriculumCourse from "./CurriculumCourse"

const CourseDetail = props => {
  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  const [inputFields, setInputFields] = useState(getCourseInformation)

  // const data = getCourseInformation?.course_detail_page

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

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Course Detail Page</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <Overview overViewData={inputFields?.course_detail_page} />
            <EligibilityCriteria
              eligibilityData={inputFields?.course_detail_page}
            />

            <PaymentStructure
              paymentStructureData={inputFields?.course_detail_page}
            />
            <CurriculumCourse />
            <WhatYouWillLearn
              whatYouWillLearnData={inputFields?.course_detail_page}
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

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
  Media,
  FormGroup,
} from "reactstrap"

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
import Switch from "@mui/material/Switch"
import BannerContent from "./BannerContent"
import Highlights from "./Highlights"

// import Switch from "react-switch"

const CardConfiguration = props => {
  const [modal, setModal] = React.useState(false)
  const [viewData, setViewData] = useState("")

  const {
    onGetCoursesInformation,
    getCourseInformation,
    editCourseInformation,
  } = props

  const [inputFields, setInputFields] = useState(getCourseInformation)

  const params = useParams()

  useEffect(() => {
    setInputFields(getCourseInformation)
  }, [getCourseInformation])

  const data = getCourseInformation?.card_configuration

  const toggle = () => setModal(!modal)

  const editCard = event => {
    event.preventDefault()
    const { onEditCardConfiguration } = props
    onEditCardConfiguration({
      course_status: inputFields?.course_status,
      id: inputFields?.id,
      card_configuration: {
        bannerContentDesktop: {
          type: inputFields?.card_configuration?.bannerContentDesktop?.type,
          label: inputFields?.card_configuration?.bannerContentDesktop?.label,
          value: [
            {
              url: inputFields?.card_configuration?.bannerContentDesktop
                ?.value[0]?.url,
              type: inputFields?.card_configuration?.bannerContentDesktop
                ?.value[0]?.type,
            },
            {
              url: inputFields?.card_configuration?.bannerContentDesktop
                ?.value[1]?.url,
              type: inputFields?.card_configuration?.bannerContentDesktop
                ?.value[1]?.type,
            },
          ],
        },
        bannerContentMobile: {
          type: inputFields?.card_configuration?.bannerContentMobile?.type,
          label: inputFields?.card_configuration?.bannerContentMobile?.label,
          value: [
            {
              url: inputFields?.card_configuration?.bannerContentMobile
                ?.value[0]?.url,
              type: inputFields?.card_configuration?.bannerContentMobile
                ?.value[0]?.type,
            },
            {
              url: inputFields?.card_configuration?.bannerContentMobile
                ?.value[1]?.url,
              type: inputFields?.card_configuration?.bannerContentMobile
                ?.value[1]?.url,
            },
          ],
        },
        highlights: {
          type: inputFields?.card_configuration?.highlights?.type,
          label: inputFields?.card_configuration?.highlights?.label,
          value: inputFields?.card_configuration?.highlights?.value,
        },
      },
    })
  }

  return (
    <>
      <div className="accordian-parts">
        <h4 className="text-primary">Card Configuration</h4>

        <div className="p-2">
          <UncontrolledAccordion defaultOpen={["1", "2"]} stayOpen>
            <BannerContent
              bannerContentData={getCourseInformation?.card_configuration}
              modal={modal}
              toggle={toggle}
              viewData={viewData}
              setViewData={setViewData}
            />
            <Highlights highlightsData={inputFields?.card_configuration} />
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
  // onGetCoursesInformation: data => dispatch(getCourseInformation(data)),
  onEditCardConfiguration: data => dispatch(editCardConfiguration(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardConfiguration)

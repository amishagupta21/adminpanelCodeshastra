import { React, useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
} from "reactstrap"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import dateFormate from "common/dateFormatter"
import Select from "react-select"
import { DeBounceSearch } from "common/DeBounceSearch"
import DeleteModal from "components/Common/DeleteModal"
import { ErrorMessage, Field, Formik } from "formik"
import * as Yup from "yup"
import tosterMsg from "components/Common/toster"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CourseList from "./CourseList"
import PersonalDetailForm from "../Learner/LearnerDetails/PersonalDetailForm"
import EducationDetails from "../Learner/LearnerDetails/LearnerDetails"
import WorkDetails from "../Learner/LearnerDetails/WorkDetails"
import DocumentKyc from "../Learner/LearnerDetails/DocumentKyc"
// import {
//   getLearner,
//   deleteLearner,
//   getStatusFilter,
//   registerUser,
// } from "store/actions"
import { getCourses } from "store/Courses/actions"

function EditCourseList(props) {
  
  document.title = "Users List"
  const [isExpanded, setIsExpanded] = useState(null)

  const [usersListData, setUsersListData] = useState([])
  const [value,setValue] = useState('details')
  const { userProfile, data, profilePictureUrl,user } = props

  const selectRow = {
    mode: "checkbox",
  }
  const initialTabs = [
    {
      eventKey: "details",
      title: "Personal Details",
      component: (
        <PersonalDetailForm
          user={user}
          userProfile={userProfile}
          profilePictureUrl={profilePictureUrl}
        />
      ),
    },
    {
      eventKey: "education-detail",
      title: "Education Details",
      component: <EducationDetails user={user} userProfile={userProfile} />,
    },
    {
      eventKey: "work-detail",
      title: "Work Details",
      component: <WorkDetails userProfile={userProfile} />,
    },
    // {
    //   eventKey: "courses-enrolled",
    //   title: "Courses Enrolled",
    //   component: <CoursesEnrolled />,
    // },
    // { eventKey: "attendance", title: "Attendance", component: <Attendance /> },
    {
      eventKey: "document",
      title: "Document & KYC",
      component: (
        <DocumentKyc
          user={user}
          userProfile={userProfile}
          profilePictureUrl={profilePictureUrl}
        />
      ),
    },
    // {
    //   eventKey: "billing",
    //   title: "Billing & Invoice",
    //   component: <Billing />,
    // },
    // {
    //   eventKey: "notification",
    //   title: "Notifications",
    //   component: <Notifications />,
    // },
  ]
  const options = [
    { label: "Full Stack Web Developer(Full Time)", value: "invited" },
    { label: "Full Stack Web Developer(Full Time)", value: "onboarded" },
    { label: "Python Full Stack Web Developer", value: "suspended" },
    { label: "Data Science Program", value: "de-activated" },
  ]

  useEffect(() => {
    const { onGetCourses } = props
    // onGetCourses(params.id)
  }, [])
  CourseList.propTypes = {
      userRoles: PropTypes.array,
      usersCount: PropTypes.number,
      className: PropTypes.any,
      Courses: PropTypes.array,
    }
  let state = {
    columns: [
      {
        dataField: "id",
        sort: true,
        hidden: true,
        formatter: (cellContent, user) => <>{row?.id}</>,
      },
      {
        dataField: "nickName",
        text: "Course Name",
        sort: true,
      },

      {
        dataField: "created_at",
        text: "Variant Counts",
        sort: true,
        formatter: (cellContent, user) => dateFormate(user.created_at),
      },
      {
        dataField: "email",
        text: "Mentors",
        sort: true,
      },
      {
        dataField: "email",
        text: "Duration",
        sort: true,
      },
      {
        dataField: "email",
        text: "Ongoing Batches",
        sort: true,
      },
      {
        dataField: "email",
        text: "Learners",
        sort: true,
      },
      {
        dataField: "Actions",
        text: "Actions",
        formatter: (cellContent, user) => (
          <UncontrolledDropdown>
            <DropdownToggle className="card-drop" tag="a">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={() => handleUserClick(user)}>
                <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => onClickDelete(user)}>
                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
      },
    ],
  }

  return (
    <>
      <Container className="personal-detail-tab" fluid>
        <Row>
          <Col sm="4">
            <Card className="card-height">
              <CardBody className="personal-detail-section ">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={value}
                  onSelect={k => setValue(k)}
                >
                  {initialTabs.map(item => {
                    return (
                      <Tab
                        key={item?.eventKey}
                        eventKey={item?.eventKey}
                        title={item?.title || ""}
                      ></Tab>
                    )
                  })}{" "}
                </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col sm="8">
            <Card className="card-height">
              <CardBody>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={value}
                  onSelect={k => setValue(k)}
                >
                  {initialTabs.map(item => {
                    return (
                      <Tab key={item.eventKey} eventKey={item.eventKey}>
                        {item?.component}
                      </Tab>
                    )
                  })}
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

//  

const mapStateToProps = ({ Courses, state, count }) => ({
  manageUser: Courses?.manageUser,
  // usersCount: Learner?.count,
  // userRoles: Learner?.roles,
  // deleteData: false,
})

const mapDispatchToProps = dispatch => ({
  onGetCourses: data => dispatch(getCourses(data)),
  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
  // onGetStatusFilter: data => dispatch(getStatusFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCourseList)
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
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

import Nav from "react-bootstrap/Nav"
import PersonalDetails from "./PersonalDetails"
import "./learnerDetail.css"
import userPlaceholder from "../../../assets/images/userplaceholder.png"
import { useParams } from "react-router-dom"
import { getLearnerDetails, profilePicture } from "store/LearnerDetail/actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import userProfile from "pages/Authentication/user-profile"

const LearnerDetails = props => {
  const params = useParams()

  const [key, setKey] = useState("home")
  const [value, setValue] = useState("home")

  const { user, userProfile, data, profilePictureUrl } = props

  useEffect(() => {
    const { onGetLearnerDetails, onGetProfilePicture } = props
    onGetLearnerDetails(params.id)
    onGetProfilePicture({ uid: params.id, document_type: "profile_picture" })
  }, [])

  const profilePic = props?.profilePictureUrl

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Unikaksha" breadcrumbItem="Learner" />
        <Row>
          <Col sm="4">
            <Card>
              <div className="learner-bg-image">
                <div className="d-flex justify-content-center">
                  {profilePic ? (
                    <img height="80px" width="80px" src={profilePic} />
                  ) : (
                    <img height="80px" width="80px" src={userPlaceholder} />
                  )}

                  {/* <img height="50px" src={userPlaceholder} /> */}

                  <div className="profile-detail">
                    <h5 className=" mb-0">
                      {userProfile?.personal_details?.full_name}
                    </h5>
                    <p>{userProfile?.work_details[0]?.position}</p>
                  </div>
                </div>
              </div>

              <CardBody>
                <Row>
                  <Col sm="4">
                    <CardTitle tag="h5">Email Id</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {user?.email}
                    </CardSubtitle>
                  </Col>
                  <Col sm="4">
                    <CardTitle tag="h5">DOB</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {/* {user?.birth_date} */}
                      {userProfile?.personal_details?.birth_date}&nbsp;
                      {userProfile?.personal_details?.birth_month}&nbsp;
                      {userProfile?.personal_details?.birth_year}
                    </CardSubtitle>
                  </Col>
                  <Col sm="4">
                    <CardTitle tag="h5">Contact Number</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {userProfile?.personal_details?.mobile_number}
                    </CardSubtitle>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card className="courses">
              <CardBody>
                <CardTitle tag="h5">Courses</CardTitle>

                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={k => setKey(k)}
                >
                  <Tab eventKey="home" title="Live Course">
                    <div className="mt-3">
                      <h4>{userProfile?.work_details[0]?.position}</h4>
                      <p>Batch #23</p>
                      <p className="mt-2 mb-2">
                        Next Live - Monday, 23 Aug 2022
                      </p>
                      <p>8:00 AM to 5:00 PM (IST)</p>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Library">
                    Library
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Attendance Summary</CardTitle>
                <p className="mt-3">This month</p>
                <Row>
                  <Col sm="6">
                    <h4 className="mt-3">July 2022 - Aug 2022</h4>
                    <p className="mt-1">
                      Shubham attended 10 out of 11 live sessions.
                    </p>
                    <Button className="mt-3" color="primary">
                      View More
                    </Button>
                  </Col>
                  <Col sm="6"></Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <PersonalDetails
            user={user}
            userProfile={userProfile}
            profilePictureUrl={profilePictureUrl}
          />
        </Row>
      </Container>
    </div>
  )
}

LearnerDetails.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  LearnerDetails: PropTypes.any,
}

const mapStateToProps = ({ LearnerDetails, state, count }) => {
  return {
    user: LearnerDetails?.data?.user,
    userProfile: LearnerDetails?.data?.userProfile,
    profilePictureUrl: LearnerDetails?.profilePictureUrl?.signedUrl,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetLearnerDetails: data => dispatch(getLearnerDetails(data)),
  onGetProfilePicture: data => dispatch(profilePicture(data)),

  // onGetDeleteLearner: id => dispatch(deleteLearner(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LearnerDetails)

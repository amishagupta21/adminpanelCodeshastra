import React, { useEffect, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import BasicDetails from "./BasicDetails"
import CourseLandingPage from "./CourseLandingPage"
import { post, get, patch } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import { uploadUsingSignedUrl } from "../../helpers/external_api_helper"
import tosterMsg from "components/Common/toster"

export default function CreateCourse(props) {
  const [banner_assets, setbanner_assets] = useState([
    {
      url : "",
      type: "image",
    },
  ])
  const [courseDetails, setcourseDetails] = useState({
    course_title: "",
    about_course: "",
    course_type: "",
    course_status : "",
    course_url : "",
    description : "",
    students_enrolled : "",
    sections: {},
  })
  const [isLoading, setLoading] = useState(false)
  const [editCourse, seteditCourse] = useState(false)
  const [course_id, setcourse_id] = useState()

  const [activeTabVartical, setoggleTabVertical] = useState(1)
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  useEffect(() => {
    setLoading(true)
    if (props.location.search) {
      let course_id = props.location.search.split("c_id=")
      seteditCourse(true)
      setcourse_id(course_id[1])
      getCourseDetails(course_id[1])
    } else {
      setLoading(false)
    }
  }, [])
  const setCourseDetails = data => {
    console.log("data", data)
    let obj = {
      course_title: data.course_title ? data.course_title : "",
      about_course : data.about_course ? data.about_course : "",
      course_type: data.course_title ? data.course_type : "",      
      sections: data.sections ? data.sections : {},
      description : data.description ? data.description : "",
      course_url : data.course_url ? data.course_url : "",
      students_enrolled : data.students_enrolled ? data.students_enrolled : "",
    }
    setcourseDetails(obj)
    if (data.banner_assets) {
      setbanner_assets(data.banner_assets.items)
    }
    setLoading(false)
  }
  const getCourseDetails = async c_id => {
    get(url.GET_COURSEDETAILS + "/" + c_id)
      .then(async response => {
        if (response.data) {
          setCourseDetails(response.data)
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const saveCourse = values => {
    //uploadFiles(banner_assets)
    console.log("save")    
    let payload = {
      course_title: values.course_title ? values.course_title : courseDetails.course_title,
      about_course : values.about_course ? values.about_course : courseDetails.about_course,
      banner_assets: { items : banner_assets
      },
      sections: values.sections ? values.sections : courseDetails.sections,
      faqs: courseDetails.faqs,
      course_status: values.course_status ? values.course_status : courseDetails.course_status,
      course_type: values.course_type ? values.course_type : courseDetails.course_type,
      visibility: "Public",
      sub_category: 2,
      students_enrolled : values.students_enrolled ? values.students_enrolled : courseDetails.students_enrolled,
      description : values.description ? values.description : courseDetails.description,
      course_url : values.course_url ? values.course_url : courseDetails.course_url
    }
    if (editCourse) {
      updateCourse(payload, course_id)
    } else {
      console.log("call")
      post(url.CREATE_COURSE, payload)
        .then(async response => {
          tosterMsg("Sucessfully Created")
          if (response.data) {
            seteditCourse(true)
            setcourse_id(response.data.id)
          }
          setLoading(false)
          toggleTabVertical(activeTabVartical + 1)
        })
        .catch(error => {
          console.log("error", error)
        })
    }
    setCourseDetails(payload)
  }
  const uploadFiles = asstes => {
    _.forEach(asstes, async function (each) {
      await uploadToS3(each)
    })
  }

  const updateCourse = (payload, c_id) => {
    console.log("payload", payload)
    patch(url.UPDATE_COURSE + "/" + c_id, payload)
      .then(async response => {
        tosterMsg("Sucessfully updated")
        toggleTabVertical(activeTabVartical + 1)
        setLoading(false)
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const uploadToS3 = data => {
    if (data.file) {
      let promise = new Promise((resolve, reject) => {
        let payload = {
          file_name: "course/BannerAssets/" + data.file_name,
          type: data.file.type,
          bucketDetails: false,
          publickey: false,
          bucketType: "content",
          extend: false,
        }
        post(url.GET_SIGHNEDURL, payload)
          .then(responce => {
            if (responce.data) {
              uploadUsingSignedUrl(responce.data, data.file).then(res => {
                resolve(true)
              })
            }
          })
          .catch(error => {
            console.log("error", error)
          })
      })
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs breadcrumbItem="Add Course" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {/* <h4 className="card-title mb-4">Vertical Wizard</h4> */}
                  <div className="vertical-wizard wizard clearfix vertical">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 1,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 1,
                            })}
                            onClick={() => {
                              toggleTabVertical(1)
                            }}
                            disabled={!(passedStepsVertical || []).includes(1)}
                          >
                            <span className="number">1.</span> Basic Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 2,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 2,
                            })}
                            onClick={() => {
                              toggleTabVertical(2)
                            }}
                            // disabled={!(passedStepsVertical || []).includes(2)}
                          >
                            <span className="number">2.</span>{" "}
                            <span>Course Landing Page</span>
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 3,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 3,
                              }),
                              "done")
                            }
                            onClick={() => {
                              toggleTabVertical(3)
                            }}
                            disabled={!(passedStepsVertical || []).includes(3)}
                          >
                            <span className="number">3.</span> Curriclum
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 4,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 4,
                              }),
                              "done")
                            }
                            onClick={() => {
                              toggleTabVertical(4)
                            }}
                            disabled={!(passedStepsVertical || []).includes(4)}
                          >
                            <span className="number">4.</span> Fees Structure
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent
                        activeTab={activeTabVartical}
                        className="body"
                      >
                        <TabPane tabId={1}>
                          {!isLoading &&
                            courseDetails &&
                            activeTabVartical === 1 && (
                              <>
                                <BasicDetails
                                  courseDetails={courseDetails}
                                  setcourseDetails={setcourseDetails}
                                  banner_assets={banner_assets}
                                  setbanner_assets={setbanner_assets}
                                  isLoading={isLoading}
                                  saveCourse={saveCourse}
                                ></BasicDetails>
                              </>
                            )}
                        </TabPane>
                        <TabPane tabId={2}>
                          {!isLoading &&
                            courseDetails &&
                            activeTabVartical === 2 && (
                              <>
                                <CourseLandingPage
                                  courseDetails={courseDetails}
                                  setcourseDetails={setcourseDetails}
                                  isLoading={isLoading}
                                  saveCourse={saveCourse}
                                ></CourseLandingPage>
                              </>
                            )}
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-namecard-input112">
                                      Name on Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-namecard-input112"
                                      placeholder="Enter Your Name on Card"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select">
                                      <option>Select Card Type</option>
                                      <option>American Express</option>
                                      <option>Visa</option>
                                      <option>MasterCard</option>
                                      <option>Discover</option>
                                    </select>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-cardno-input122">
                                      Credit Card Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cardno-input122"
                                      placeholder="Enter Your Card Number"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-card-verification-input">
                                      Card Verification Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-card-verification-input"
                                      placeholder="Card Verification Number"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="basicpill-expiration-input132">
                                      Expiration Date
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-expiration-input132"
                                      placeholder="Card Expiration Date"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    {/* <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTabVartical === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTabVartical === 4 ? "next disabled" : "next"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

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
} from "reactstrap"

import PropTypes from "prop-types"
import { connect } from "react-redux"
import { editWorkDetail } from "store/WorkDetail/actions"

const WorkDetails = props => {
  const { userProfile, user } = props
  const data =
    userProfile?.work_details === null
      ? {}
      : {
          position: userProfile?.work_details[0]?.position
            ? userProfile?.work_details[0]?.position
            : user?.position || "",
          experience: userProfile?.work_details[0]?.experience
            ? userProfile?.work_details[0]?.experience
            : user?.experience || "",
          organization_name: userProfile?.work_details[0]?.organization_name
            ? userProfile?.work_details[0]?.organization_name
            : user?.organization_name || "",
          uid: userProfile?.uid || user?.uid,
        }
  const [workData, setWorkData] = useState(data)
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    let count = 0
    for (let key in workData) {
      if (workData[key] === "") {
        count++
        break
      }
    }
    if (count === 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [workData])

  useEffect(() => {
    setWorkData(data)
  }, [userProfile])

  const editWorkData = event => {
    event.preventDefault()
    const { onGetEditWorkDetail } = props
    onGetEditWorkDetail({
      uid: workData?.uid,
      work_details: [
        {
          position: workData?.position,
          experience: workData?.experience,
          organization_name: workData?.organization_name,
        },
      ],
    })
  }

  return (
    <>
      <div>
        <h4 className="text-primary">Work Details</h4>

        <div className="p-2">
          <Form className="form-vertical">
            <Row>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Current Working Position</Label>
                  <Input
                    name="text"
                    className="form-control"
                    placeholder="Working Position"
                    type="text"
                    onChange={e =>
                      setWorkData({
                        ...workData,
                        position: e.target.value,
                      })
                    }
                    value={workData?.position}
                  />
                </div>
              </Col>
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total technical exp. in years
                  </Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Total Experience"
                    maxLength="2"
                    onChange={e =>
                      setWorkData({
                        ...workData,
                        experience: e.target.value,
                      })
                    }
                    value={workData?.experience}
                  />
                </div>
              </Col>
              {/* <Col sm={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Total coding exp. in years
                  </Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Total Experience"
                    onChange={e =>
                      setWorkData({
                        ...workData,
                        experience: e.target.value,
                      })
                    }
                    value={workData?.experience}
                  />
                </div>
              </Col> */}
              <Col sm={4}>
                <div className="mb-3">
                  <Label className="form-label">Organization working in</Label>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Organization Working"
                    onChange={e =>
                      setWorkData({
                        ...workData,
                        organization_name: e.target.value,
                      })
                    }
                    value={workData?.organization_name}
                  />
                </div>
              </Col>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  onClick={editWorkData}
                  className="px-5"
                  disabled={isButtonDisabled}
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}

WorkDetails.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  LearnerDetails: PropTypes.any,
}

const mapStateToProps = ({ LearnerDetails, state, count }) => ({
  user: LearnerDetails?.data?.user,
  userProfile: LearnerDetails?.data?.userProfile,
  uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
  editWorkDetail: LearnerDetails?.editWorkDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetEditWorkDetail: data => dispatch(editWorkDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetails)

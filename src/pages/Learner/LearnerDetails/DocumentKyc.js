import React, { useState, useEffect } from "react"
import Select from "react-select"
import _ from "lodash"
import { Table } from "reactstrap"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import progressbar from "../../../assets/images/progress.gif"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  deleteDocumentKyc,
  uploadDocumentPicture,
} from "store/DocumentKyc/actions"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver"
import { useHistory } from "react-router-dom"
import userPlaceholder from "../../../assets/images/userplaceholder.png"

const DocumentKyc = props => {
  const { userProfile, documentUrl } = props
  const [documentKyc, setDocumentKyc] = useState(userProfile)
  const [image, setImage] = useState({ preview: "", raw: "" })
  const history = useHistory()
  const hiddenFileInput = React.useRef(null)
  const [document, setDocument] = useState({
    uid: userProfile?.uid,
  })

  var result = userProfile?.kyc
  var obj2 = {
    PG_Certificate: "",
    UG_Bachelors_Certificate: "",
    "12_Diploma_Certificate": "",
    PAP_Terms_Conditions: "",
    Upfront: "",
    COC: "",
  }
  _.merge(result, obj2)

  useEffect(() => {
    setDocumentKyc(userProfile)
    setDocument({
      uid: userProfile?.uid,
    })
    // if (documentKyc?.kyc) {
    //   setDocumentKyc({
    //     uid: documentKyc?.uid,
    //     key: Object.keys(documentKyc?.kyc),
    //   })
    // }
  }, [userProfile])

  const libraryCourse = [
    {
      title: "Document Name",
      value: "#Lecture-1",
    },
    {
      title: "File Name",
      value: "12-10-2022",
    },
    // {
    //   title: "Image",
    //   value: "12-10-2022",
    // },
    // {
    //   title: "Uploaded On",
    //   value: "08:00 AM",
    // },
    // {
    //   title: "File Size",
    //   value: "05:00 PM",
    // },
    {
      title: "Action",
      value: "Present",
    },
  ]

  const deleteDocument = documentType => {
    const { onGetDeleteDocumentKyc } = props
    onGetDeleteDocumentKyc({
      uid: documentKyc?.uid,
      document_type: documentType,
    })

    const response = _.omit(documentKyc.kyc, [documentType])
    setDocumentKyc({ ...documentKyc, kyc: response })
  }

  const allImage = userProfile?.kyc ? Object.values(userProfile?.kyc) : []
  const download = () => {
    saveAs(allImage, "aadhar_card.png")
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleDocumentChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: e.target.files[0],
        raw: e.target.files[0],
      })
    }
  }

  useEffect(() => {
    if (image.preview !== "") {
      handleDocumentUpload(document.uid)
    }
  }, [image])

  const handleDocumentUpload = async uid => {
    const formData = new FormData()
    formData.append("image", image)

    const { onGetUploadDocumentPicture } = props
    onGetUploadDocumentPicture({
      img: image,
      data: {
        uid: uid,
        document_type: "qualification_certificate",
        file_name: "qualification.png",
        type: "image/png",
      },
    })
  }

  // const response = item[1]
  // console.log(response)

  return (
    <>
      <div>
        <h4 className="text-primary">Documents & KYC</h4>

        <Col xl="12">
          <Table>
            <thead>
              <tr>
                {libraryCourse.map(item => {
                  return (
                    <>
                      <th>{item.title}</th>
                    </>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {/* <img height="50px" width="50px" src={userPlaceholder} /> */}

              {documentKyc?.kyc &&
                Object?.entries(documentKyc?.kyc).map(item => {
                  // console.log(Object?.entries(documentKyc?.kyc))

                  const documentName = item[0]
                  const str2 =
                    documentName.charAt(0).toUpperCase() + documentName.slice(1)
                  const result = str2.replace("_", " ")

                  // console.log(item)
                  const fileName = item[1].split("/")

                  return (
                    <tr key={item}>
                      <td>{result}</td>
                      <td>
                        <img src={item[1]} />
                        &nbsp;&nbsp;
                        {fileName[fileName.length - 1]}
                      </td>
                      {/* <td>
                        {" "}
                        <img
                          height="50px"
                          width="50px"
                          src={props?.documentUrl}
                        />
                        <i
                          onClick={() => handleClick()}
                          className="mdi mdi-upload font-size-18 text-success me-3"
                        />
                        <input
                          type="file"
                          id="upload-button"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          onChange={handleDocumentChange}
                          onClick={e => (e.target.value = null)}
                        />
                      </td> */}
                      <td>
                        <div>
                          <i
                            onClick={() =>
                              history.push({
                                pathname: `/learner-details/${documentKyc?.uid}/document-data/${item[0]}`,
                                state: {
                                  data: item,
                                },
                              })
                            }
                            className="mdi mdi-eye font-size-18 text-primary me-3"
                          ></i>

                          <i
                            onClick={() => download()}
                            className="mdi mdi-download font-size-18 text-success me-3"
                          />
                          <i
                            onClick={() => deleteDocument(item[0])}
                            className="mdi mdi-trash-can font-size-18 text-danger me-3"
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </Col>
      </div>
    </>
  )
}

DocumentKyc.propTypes = {
  userRoles: PropTypes.array,
  usersCount: PropTypes.number,
  className: PropTypes.any,
  LearnerDetails: PropTypes.any,
}

const mapStateToProps = ({ LearnerDetails, state, count }) => ({
  user: LearnerDetails?.data?.user,
  userProfile: LearnerDetails?.data?.userProfile,
  uploadProfilePicture: LearnerDetails?.uploadProfilePicture,
  documentUrl: LearnerDetails?.profilePictureUrl?.signedUrl,
  // editLearnerDetail: LearnerDetails?.editLearnerDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetDeleteDocumentKyc: uid => dispatch(deleteDocumentKyc(uid)),
  onGetUploadDocumentPicture: data => dispatch(uploadDocumentPicture(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentKyc)

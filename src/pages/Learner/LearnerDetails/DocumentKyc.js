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
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import progressbar from "../../../assets/images/progress.gif"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  deleteDocumentKyc,
  uploadDocumentPicture,
  documentPicture,
  downloadAllImage,
  documentPreview,
  previewImageUrl,
  resetPreviewImage,
} from "store/DocumentKyc/actions"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver"
import { useHistory } from "react-router-dom"
import userPlaceholder from "../../../assets/images/userplaceholder.png"
import Learner from "../Learner"
import Users from "pages/Users"
import "./documentKyc.css"

const DocumentKyc = props => {
  const { userProfile, documentUrl, documentPicture, profilePictureUrl } = props
  const [documentKyc, setDocumentKyc] = useState(userProfile)
  const [image, setImage] = useState({ preview: "", raw: "" })
  const [loading, setLoading] = useState(false)
  const [activeDocumentImage, setActiveDocumentImage] = useState("")
  const history = useHistory()
  const hiddenFileInput = React.useRef([])
  const [modal, setModal] = React.useState(false)
  const [imageName, setImageName] = useState("")

  // const hiddenFileInput = React.useRef(null)
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

  const handleClick = (name, index) => {
    setActiveDocumentImage(name)
    hiddenFileInput.current[index].click()
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
    const extArr = image?.preview?.name.split(".")
    const extenstion = extArr[extArr.length - 1]
    onGetUploadDocumentPicture({
      img: image,
      data: {
        uid: uid,
        document_type: activeDocumentImage,
        file_name: `${activeDocumentImage}.${extenstion}`,
        type: image?.preview?.type,
      },
    })
    setDocumentKyc({
      ...documentKyc,
      kyc: {
        ...documentKyc?.kyc,
        [activeDocumentImage]: `user/${uid}/kyc/${activeDocumentImage}.${extenstion}`,
      },
    })
  }

  const downloadDocument = (event, result) => {
    setLoading(true)
    event.preventDefault()
    const { onGetKycSignedDoc } = props
    onGetKycSignedDoc({
      uid: document?.uid,
      document_type: result,
    })
  }

  const imagePreview = (event, result) => {
    setLoading(true)
    event.preventDefault()
    const { onGetImagePreview } = props
    onGetImagePreview({
      uid: document?.uid,
      document_type: result,
    })
  }

  useEffect(() => {
    if (props.downloadImage) {
      saveAs(documentUrl, result)
      props.onResetDownload()
    }
  }, [props.downloadImage])

  useEffect(() => {
    const docNames = [
      "hsc_certificate",
      "aadhar_card",
      "qualification_certificate",
      "pan_card",
      "ssc_certificate",
    ]
    if (documentKyc && documentKyc?.kyc) {
      let finalDocKycObj = { ...documentKyc?.kyc }
      docNames.map(item => {
        if (!(item in documentKyc?.kyc)) {
          finalDocKycObj = { ...finalDocKycObj, [item]: "" }
        }
      })
      if (!_.isEqual(documentKyc?.kyc, finalDocKycObj)) {
        setDocumentKyc({ ...documentKyc, kyc: finalDocKycObj })
      }
    } else if (documentKyc && !documentKyc?.kyc) {
      let finalDocKycObj = {}
      docNames.map(item => {
        finalDocKycObj = { ...finalDocKycObj, [item]: "" }
      })
      setDocumentKyc({ ...documentKyc, kyc: finalDocKycObj })
    }
  }, [documentKyc])
  const toggle = () => setModal(!modal)

  useEffect(() => {
    if (props.previewImage) {
      toggle()
      props.onResetPreviewImg()
    }
  }, [props.previewImage])

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
                Object?.entries(documentKyc?.kyc).map((item, index) => {
                  const documentName = item[0]
                  const str2 =
                    documentName.charAt(0).toUpperCase() + documentName.slice(1)
                  const result = str2.replace("_", " ")
                  const fileName = item[1].split("/")

                  return (
                    <tr key={item}>
                      <td>{result}</td>

                      {item[1] ? (
                        <td>{fileName[fileName.length - 1]}</td>
                      ) : (
                        <td colSpan="2">
                          <div
                            onClick={() => handleClick(documentName, index)}
                            style={{
                              border: "1px dashed #556ee6",
                              borderRadius: "8px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "75%",
                            }}
                          >
                            <i className="mdi mdi-upload font-size-15 text-success me-1"></i>
                            Upload
                          </div>
                          <input
                            type="file"
                            id="upload-button"
                            ref={e => (hiddenFileInput.current[index] = e)}
                            style={{ display: "none" }}
                            onChange={handleDocumentChange}
                            onClick={e => (e.target.value = null)}
                          />
                        </td>
                      )}
                      {item[1] && (
                        <td>
                          <i
                            onClick={e => {
                              imagePreview(e, item[0], fileName)
                              setImageName(fileName[3])
                              // history.push({
                              //   pathname: `/learner-details/${documentKyc?.uid}/document-data/${item[0]}`,
                              //   state: {
                              //     previewImageUrl: previewImageUrl,
                              //   },
                              // })
                            }}
                            className="mdi mdi-eye font-size-18 text-primary me-3"
                          ></i>
                          <i
                            onClick={e => downloadDocument(e, item[0])}
                            className="mdi mdi-download font-size-18 text-success me-3"
                          />
                          <i
                            onClick={e => deleteDocument(item[0])}
                            className="mdi mdi-trash-can font-size-18 text-danger"
                          />
                        </td>
                      )}
                    </tr>
                  )
                })}
            </tbody>
          </Table>
          <Modal
            isOpen={modal}
            // toggle={toggle}
            modalTransition={{ timeout: 500 }}
            centered={true}
            fade={false}
            contentClassName="modalContent"
            size="lg"
          >
            <ModalHeader className="modalHeader" toggle={toggle}>
              {imageName}
            </ModalHeader>
            <img
              src={props.previewImageUrl}
              style={{
                width: "600px",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Modal>
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

const mapStateToProps = ({ DocumentKyc }) => ({
  documentUrl: DocumentKyc?.documentUrl,
  downloadImage: DocumentKyc?.downloadImage,
  previewImageUrl: DocumentKyc?.previewImageUrl,
  previewImage: DocumentKyc?.previewImage,
  data: DocumentKyc?.data,
})

const mapDispatchToProps = dispatch => ({
  onGetDeleteDocumentKyc: uid => dispatch(deleteDocumentKyc(uid)),
  onGetUploadDocumentPicture: data => dispatch(uploadDocumentPicture(data)),
  onGetKycSignedDoc: uid => dispatch(documentPicture(uid)),
  onGetImagePreview: uid => dispatch(documentPreview(uid)),
  onResetDownload: () => dispatch(downloadAllImage()),
  onResetPreviewImg: () => dispatch(resetPreviewImage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentKyc)

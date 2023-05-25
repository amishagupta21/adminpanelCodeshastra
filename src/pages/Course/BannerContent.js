import React from "react"
import {
  Input,
  Modal,
  ModalHeader,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"

const BannerContent = ({
  bannerContentData,
  modal,
  toggle,
  viewData,
  setViewData,
}) => {
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        Banner Content
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
        {bannerContentData?.bannerContentDesktop?.value?.map(item => {
          const documentName = item.url
          const array = documentName.split("/")

          const lastsegment = array[array.length - 1]
          // const result = str2.replace("_", " ")
          // const fileName = item[1].split("/")
          return (
            <div key={item?.type} className="table-form">
              {item?.type === "image" ? (
                <table className="table-full">
                  <tr>
                    <th>Card Banner (Desktop)</th>
                    <th>Action</th>
                  </tr>

                  <tr>
                    <td>
                      {item.url === "" ? (
                        <div className="input-file-space">
                          <input type="file" multiple />
                          <span className="input-image">
                            100 X 200 px, JPEG/PNG , Max 10 mb
                          </span>
                        </div>
                      ) : (
                        <p>{lastsegment}</p>
                      )}
                    </td>
                    <td>
                      {item.url === "" ? (
                        ""
                      ) : (
                        <div className="actions">
                          <i
                            onClick={e => toggle(e, setViewData(item))}
                            className="mdi mdi-eye font-size-18 text-primary me-1"
                          ></i>

                          <i className="mdi mdi-trash-can font-size-18 text-danger" />
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              ) : (
                <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Banner Video</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="video"
                          value={item?.url}
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="actions">
                          <i
                            onClick={e => toggle(e, setViewData(item))}
                            className="mdi mdi-eye font-size-18 text-primary me-1"
                          ></i>

                          <i className="mdi mdi-trash-can font-size-18 text-danger" />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          )
        })}

        {bannerContentData?.bannerContentMobile?.value?.map(item => {
          const documentName = item.url
          const array = documentName.split("/")

          const lastsegment = array[array.length - 1]
          // const result = str2.replace("_", " ")
          // const fileName = item[1].split("/")
          return (
            <div key={item?.type} className="table-form">
              {item?.type === "image" ? (
                <table className="table-full">
                  <tr>
                    <th>Card Banner (Mobile)</th>
                    <th>Action</th>
                  </tr>

                  <tr>
                    <td>
                      {item.url === "" ? (
                        <div className="input-file-space">
                          <input type="file" multiple />
                          <span className="input-image">
                            100 X 200 px, JPEG/PNG , Max 10 mb
                          </span>
                        </div>
                      ) : (
                        <p>{lastsegment}</p>
                      )}
                    </td>
                    <td>
                      {item.url === "" ? (
                        ""
                      ) : (
                        <div className="actions">
                          <i
                            onClick={e => toggle(e, setViewData(item))}
                            className="mdi mdi-eye font-size-18 text-primary me-1"
                          ></i>

                          <i className="mdi mdi-trash-can font-size-18 text-danger" />
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              ) : (
                <div className="table-form">
                  <table className="table-full">
                    <tr>
                      <th>Banner Video</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="text"
                          className="form-control form-control-color"
                          placeholder="video"
                          value={item?.url}
                          type="text"
                        />
                      </td>
                      <td>
                        <div className="actions">
                          <i
                            onClick={e => toggle(e, setViewData(item))}
                            className="mdi mdi-eye font-size-18 text-primary me-1"
                          ></i>

                          <i className="mdi mdi-trash-can font-size-18 text-danger" />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          )
        })}
        <Modal
          isOpen={modal}
          toggle={toggle}
          modalTransition={{ timeout: 500 }}
          centered={true}
          fade={false}
          contentClassName="modalContent"
          size="lg"
        >
          <ModalHeader className="modalHeader" toggle={toggle}></ModalHeader>
          {viewData?.type === "youtube" ? (
            <iframe
              width="600"
              height="480"
              src={`https://${viewData?.url}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              // title="Embedded youtube"
            />
          ) : (
            <img src={viewData?.url} />
          )}
        </Modal>
      </AccordionBody>
    </AccordionItem>
  )
}

export default BannerContent

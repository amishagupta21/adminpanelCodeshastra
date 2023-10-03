import React, { useState, useEffect } from "react"
import { Row, Col, Button, Spinner } from "reactstrap"
import BatchNewModal from "./BatchNewModal"
import Unikaksha from "./Unikaksha"
import axios from "axios"
import * as url from "../../helpers/url_helper"

const BatchesFunctionality = ({
  isLoading,
  createNewBatch,
  onGetBatchesList,
  manageUser,
  setItem,
  item,
  setIsLoading,
  clickedIds,
}) => {
  const [unikaksha, setUnikaksha] = useState(false)

  const openUnikasha = () => {
    setUnikaksha(!unikaksha)
  }

  const [modal, setModal] = useState(false)
  const toggle = e => {
    setModal(!modal)
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    setItem(manageUser)
  }, [manageUser])

  const syncNow = async () => {
    setIsLoading(true)
    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
      })
      .catch(err => {})

    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC_DETAIL}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
      })
      .catch(err => {})
    await axios
      .post(`${process.env.REACT_APP_API_URL}${url.BATCH_SYNC_GRADES}`, {
        batchIdArray: clickedIds,
      })
      .then(res => {
        tosterMsg(res?.data?.message)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex justify-content-between my-2">
            {/* <div>Clicked IDs: {clickedIds.join(", ")}</div> */}
            <h4>ALL BATCHES</h4>
            <span style={{ display: "flex" }}>
              <Button
                color="success"
                className="rounded-pill mb-3 me-3 px-4"
                onClick={openUnikasha}
              >
                Unikode Login
              </Button>
              {isLoading ? (
                <Button
                  color="primary"
                  className="rounded-pill mb-3 me-3 px-4"
                  disabled
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Spinner style={{ width: "1rem", height: "1rem" }} />
                  syncing...
                </Button>
              ) : (
                <Button
                  disabled={clickedIds.length === 0}
                  color="primary"
                  className="rounded-pill mb-3 me-3 px-4"
                  onClick={syncNow}
                >
                  Sync Now
                </Button>
              )}
              <Button
                color="success"
                className="rounded-pill mb-3"
                onClick={toggle}
              >
                + Create New Batch
              </Button>
            </span>

            <BatchNewModal
              modal={modal}
              toggle={toggle}
              setModal={setModal}
              createNewBatch={createNewBatch}
              onGetBatchesList={onGetBatchesList}
              setItem={setItem}
              item={item}
              // createBatches={createBatches}
            />

            <Unikaksha
              setUnikaksha={setUnikaksha}
              openUnikasha={openUnikasha}
              unikaksha={unikaksha}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default BatchesFunctionality

import React from "react"
import { Label, Input } from "reactstrap"

const Payment = () => {
  return (
    <>
      <div className="page-content">
        <div className="mb-3">
          <h3 className="form-label">Payment</h3>
          <div className="mt-3">
            <label>
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="payment"
                  id="razorpay"
                  value="razorpay"
                  //   onClick={e =>
                  //     setLearnerData({
                  //       ...learnerData,
                  //       gender: e.target.value,
                  //     })
                  //   }
                  //   checked={learnerData?.gender === "male"}
                />
                &nbsp; Razorapy Payment
              </div>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  name="payment"
                  id="worldline"
                  value="worldline"
                  //   onClick={e =>
                  //     setLearnerData({
                  //       ...learnerData,
                  //       gender: e.target.value,
                  //     })
                  //   }
                  //   checked={learnerData?.gender === "female"}
                />
                &nbsp; Worldline Payment
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment

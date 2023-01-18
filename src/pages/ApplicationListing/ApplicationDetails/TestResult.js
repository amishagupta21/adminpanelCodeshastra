import React from "react"

const TestResult = () => {
  return (
    <>
      <div>
        <p>Test Result</p>
        <h3 className="mt-3">
          Test Score - <span className="text-success">87% (Pass)</span>
        </h3>
        <p>
          Taken on - <span>Monday, 23 Aug 2022</span>
        </p>
        <p className="mt-2">Number of attempt - 1</p>
        <p className="mt-2">Test Mode - Desktop</p>
        <p className="mt-2">Test URL -</p>
      </div>
    </>
  )
}

export default TestResult

import React, { useState } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import { DeBounceSearch } from "components/Common/DeBounceSearch"
import Select from "react-select"

export default function CourseFilter({
  handleSearch,    
  handleFilter,
  filter
}) {
  const filterOptions = [
    { label: "Draft ", value: "Draft" },
    { label: "Published", value: "Published" },    
  ]
  return (
    <>
      <Card>
        <Row>
        <Col className="col-4">
              <div className="app-search p-2">
                <div className="position-relative">
                  <DeBounceSearch handleSearch={handleSearch} />
                  <span className="bx bx-search-alt" />
                </div>
              </div>
            </Col>
            <Col sm="3">
              <Select
                name="filter"
                value={filter}
                onChange={handleFilter}
                placeholder="Select Status"
                options={filterOptions}
              />
            </Col>
        </Row>
      </Card>
    </>
  );
}
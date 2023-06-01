import React from "react";
import { 
    Card,
    CardBody,
    Col, 
    Row,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    Button
} from 'reactstrap';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';

const Report = () => {
  // const columns = [
  //   {
  //     dataField: "id",
  //     text: "ID",
  //     sort: true,
  //   },
  //   {
  //     dataField: "name",
  //     text: "Student Names",
  //     sort: true,
  //   },
  //   {
  //     dataField: "projects",
  //     text: "Projects",
  //     sort: true,
  //   },
  //   {
  //     dataField: "weektest1",
  //     text: "Week Test 1",
  //     sort: true,
  //   },
  //   {
  //     dataField: "weektest2",
  //     text: "Week Test 2",
  //     sort: true,
  //   },
  //   {
  //     dataField: "weektest3",
  //     text: "Week Test 3",
  //     sort: true,
  //   },
  //   {
  //     dataField: "action",
  //     text: "Action",
  //   },
  // ]

  //   const columns = [
  //       {
  //           dataField: 'id',
  //           text: 'Attendance',
  //           sort: false
  //       }, 
  //       {
  //           dataField: 'name',
  //           text: 'Virtual programming',
  //       }, 
  //       {
  //           dataField: 'projects',
  //           text: 'Virtual Grid',
  //       },
  //       {
  //           dataField: 'weektest1',
  //           text: 'DSA MCT',
  //       },
  //       {
  //           dataField: 'weektest2',
  //           text: 'Weekly Assessments',
  //       },
  //       {
  //           dataField: 'weektest3',
  //           text: 'Core BE FInal Assessment',
  //       },
  //   ];

  //     const products = [
  //       {
  //           'id': null,
  //           'name': null,
  //           'projects': null,
  //           'weektest1': null,
  //           'weektest2': null,
  //           'weektest3': null,
  //       },
  //       {
  //           'id': null,
  //           'name': null,
  //           'projects': null,
  //           'weektest1': null,
  //           'weektest2': null,
  //           'weektest3': null,
  //       },
  //      ];

    return(
        <div className="page-content report">
            <Row>
                <Col md={12}>
                <div className='d-flex justify-content-between'>
                <div><Link to="/batch-list"><i className='mdi mdi-chevron-left'></i> Batch</Link></div>
                {/* <div>Batch List / Batch Information</div> */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/batch-list">Batch</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Report</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
                    <h4 className="mb-4">REPORTS</h4>
                    <Card>
                        <CardBody>
                            <div className="table-responsive report-table">
                                <div className="text-end my-3"><Button>Download</Button></div>
                                <Table bordered className="mb-5">
                                    <thead className="bg-transparent">
                                        <tr>
                                            <th colSpan={7}>
                                                <div className="d-flex">
                                                    <div style={{fontSize:'16px',fontWeight:'500'}}>
                                                        <strong >Name :</strong> Pankaj
                                                    </div>
                                                    <div style={{fontSize:'16px',fontWeight:'500'}} 
                                                     className="ms-5"><strong >
                                                        ID number :</strong> 123456576
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Attendance</th>
                                            <th>Virtual programming</th>
                                            <th>Virtual Grid</th>
                                            <th>DSA MCT</th>
                                            <th colSpan={2}>Weekly Assessments</th>
                                            <th>Core BE FInal Assessment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={7}><strong>Note :</strong> qwerty</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            {/* <div>
                                <BootstrapTable
                                    keyField='id' 
                                    data={ products } 
                                    columns={ columns } 
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    classes={"table align-middle table-nowrap"}
                                    headerWrapperClasses={"thead-light"}
                                    />
                            </div> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Report

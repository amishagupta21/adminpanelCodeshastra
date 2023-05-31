import React from "react";
import { 
    Card,
    CardBody,
    Col, 
    Row,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";

const Report = () =>{

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true
        }, 
        {
            dataField: 'name',
            text: 'Student Names',
            sort: true
        }, 
        {
            dataField: 'projects',
            text: 'Projects',
            sort: true
        },
        {
            dataField: 'weektest1',
            text: 'Week Test 1',
            sort: true
        },
        {
            dataField: 'weektest2',
            text: 'Week Test 2',
            sort: true
        },
        {
            dataField: 'weektest3',
            text: 'Week Test 3',
            sort: true
        },
        {
            dataField: 'action',
            text: 'Action',
        },
    ];

      const products = [
        {
            'id': 1,
            'name': 'Ayush Jaiswal',
            'projects': 'Software Developer Program',
            'weektest1': 4,
            'weektest2': 2,
            'weektest3': 3,
            'action': <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
        },
        {
            'id': 2,
            'name': 'Vishal Honrao',
            'projects': 'Full Stack Web Developer',
            'weektest1': 4,
            'weektest2': 2,
            'weektest3': 3,
            'action': <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
        },
       ];
    return(
        <div className="page-content report">
            <Row>
                <Col md={12}>
                <div className='d-flex justify-content-between'>
                <div><Link to="/batch-list"><i className='mdi mdi-chevron-left'></i> Batch List</Link></div>
                {/* <div>Batch List / Batch Information</div> */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/batch-list">Batch List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Report</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
                    <h4 className="mb-4">REPORTS</h4>
                    <Card>
                        <CardBody>
                            <div className="table-responsive">
                            {/* <BootstrapTable
                                  keyField={"_id"}
                                  responsive
                                  bordered={false}
                                  striped={false}
                                  defaultSorted={defaultSorted}
                                  selectRow={selectRow}
                                  classes={"table align-middle table-nowrap"}
                                  headerWrapperClasses={"thead-light"}
                                  {...toolkitProps.baseProps}
                                  pagination={paginationFactory()}
                                  noDataIndication={"No data found"}
                                /> */}
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
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Report;
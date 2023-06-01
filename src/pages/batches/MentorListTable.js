import React from "react";
import { 
    Input
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";

const MentorListTable = () =>{

    const columns = [
        {
            dataField: 'id',
            text: <Input type="checkbox"/>,
            sort: false,
            formatter: (cellContent, user) => (
                <Input type="checkbox"/>
              ),
        }, 
        {
            dataField: 'name',
            text: 'Mentor Names',
            sort: true
        }, 
        {
            dataField: 'email',
            text: 'Email',
            sort: true
        },
        {
            dataField: 'topic',
            text: 'Topic',
            sort: true
        },
        // {
        //     dataField: 'weektest2',
        //     text: 'Week Test 2',
        //     sort: true
        // },
        // {
        //     dataField: 'weektest3',
        //     text: 'Week Test 3',
        //     sort: true
        // },
        {
            dataField: 'action',
            text: 'Action',
        },
    ];

      const products = [
        {
            'id': 1,
            'name': ' Shubham D',
            'email': 'shubhamd@gmail.com',
            'topic': "Software Developer Program",
            'action': <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
        },
        {
            'id': 2,
            'name': 'Rajesh K',
            'email': 'RajeshK@gmail.com',
            'topic': "Software Developer Program",
            'action': <i className="mdi mdi-trash-can font-size-16 text-danger"></i>
        },
       ];
    return(
        <>
            <div className="table-responsive batches-home">
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
        </>
    )
}

export default MentorListTable;
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"

export function FormButton(    
    isLoading
) {        
    return(
        <>
        <Row className="sticky-footer">
            <div className="text-sm-center d-none d-sm-block p-2">
            <Button type="submit" variant="primary" disabled={!isLoading}>
                Save and Next 
            </Button>
            </div>
        </Row>
        </>
    )
}
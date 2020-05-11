import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function ProperitNavBar() {
    return (

        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Properit</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#users/123/properties">My Properties</Nav.Link>
                <Nav.Link href="#users/123/renters">My Renters</Nav.Link>
                <Nav.Link href="#users/123/payments">Payments</Nav.Link>
                <Nav.Link href="#users/123/lease">Lease Management</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#images">Images(Example)</Nav.Link>
                <Nav.Link href="#document">Document</Nav.Link>

            </Nav>
        </Navbar>
    );
}

export default ProperitNavBar;

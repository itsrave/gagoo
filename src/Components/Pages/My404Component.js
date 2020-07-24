import React, { Component } from 'react';
import { Col, Container, Row } from "react-bootstrap";

class My404Component extends Component
{
    render() {
        return (
            <Container>
                <Col md={12} className="d-flex justify-content-center">
                    <div>
                        <h2>Wystąpił błąd</h2>
                        <p>Taka strona nie istnieje!</p>
                    </div>
                </Col>
            </Container>
        );
    }
}

export default My404Component;

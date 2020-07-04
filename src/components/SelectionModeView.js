import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setMode} from "../actions/clientActions";


class SelectionModeView extends Component {
    render() {
        return (
            <div>
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Choose Your Mode </h2>
                </header>
                <Row>
                    <Col>
                        <Link as={Link}  onClick={()=>this.onOwnerMode()}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <p style={{float: 'left'}}><b>Asset Owner</b></p>
                                    <div style={{clear: 'both'}}/>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link as={Link} onClick={()=>this.onTenantMode()}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <p style={{float: 'left'}}><b>Asset Tenant</b></p>
                                    <div style={{clear: 'both'}}/>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
    onOwnerMode() {
        this.props.setMode('owner')
        // return '/properties'
    }
    onTenantMode() {
        this.props.setMode('tenant')
        // return '/payments'
    }
}
const mapDispatchToProps = dispatch => ({
    setMode: (mode) => dispatch(setMode(mode))
});
export default connect(null,
    mapDispatchToProps
    )(SelectionModeView);
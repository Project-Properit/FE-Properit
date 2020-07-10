import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setMode} from "../actions/clientActions";
import Tie from '../images/Tie.png'
import TShirt from '../images/T-Shirt.png'
import "./SelectionModeView.scss"

class SelectionModeView extends Component {
    render() {
        return (
            <div>
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center', padding: '33px'}} className="App-header">
                    <h2> Choose Your Mode </h2>
                </header>
                <Row>
                    <div className="card1">
                        <img src={Tie} alt=""/>
                        <Link as={Link}  onClick={()=>this.onOwnerMode()}><h3 className="bothTitle">Asset Owner</h3></Link>
                    </div>
                    <div className="card2">
                        <img src={TShirt} alt=""/>
                        <Link as={Link}  onClick={()=>this.onTenantMode()}><h3 className="bothTitle">Asset Tenant</h3></Link>
                    </div>
                    {/*<Col>*/}
                    {/*    <Link as={Link}  onClick={()=>this.onOwnerMode()}>*/}
                    {/*    <Card>*/}
                    {/*        <Card.Body>*/}
                    {/*            <Card.Title>*/}
                    {/*                <p style={{float: 'left'}}><b>Asset Owner</b></p>*/}
                    {/*                <div style={{clear: 'both'}}/>*/}
                    {/*            </Card.Title>*/}
                    {/*        </Card.Body>*/}
                    {/*    </Card>*/}
                    {/*    </Link>*/}
                    {/*</Col>*/}
                    {/*<Col>*/}
                    {/*    <Link as={Link} onClick={()=>this.onTenantMode()}>*/}
                    {/*    <Card>*/}
                    {/*        <Card.Body>*/}
                    {/*            <Card.Title>*/}
                    {/*                <p style={{float: 'left'}}><b>Asset Tenant</b></p>*/}
                    {/*                <div style={{clear: 'both'}}/>*/}
                    {/*            </Card.Title>*/}
                    {/*        </Card.Body>*/}
                    {/*    </Card>*/}
                    {/*    </Link>*/}
                    {/*</Col>*/}
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
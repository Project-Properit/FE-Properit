import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { setMode, unsetPartialClient } from "../actions/clientActions";
import Tie from '../images/bothOwner.jpeg'
import TShirt from '../images/bothTenant.jpeg'
import "./SelectionModeView.scss"
import { cleanProperties } from "../actions/propertiesActions";

class SelectionModeView extends Component {
    componentDidMount() {
        this.props.unsetPartialClient()
        this.props.cleanProperties()
    }

    render() {
        return (
            <div>
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center', padding: '33px'}} className="App-header">
                    <h2> Choose Your Mode </h2>
                </header>
                <div className="box">
                    <div className="bothCard">
                        <div className="imgBx">
                            <img
                                src={Tie}
                                alt="images"/>
                        </div>
                        <div className="details">
                            <h2>Asset Owner<br/>
                                <span>
                                    <Link as={Link}  onClick={()=>this.onOwnerMode()}><h3 className="choose">Choose</h3></Link>
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="bothCard">
                        <div className="imgBx">
                            <img
                                src={TShirt}
                                alt="images"/>
                        </div>
                        <div className="details">
                            <h2>Asset Tenant<br/>
                                <span>
                                    <Link as={Link}  onClick={()=>this.onTenantMode()}><h3 className="choose">Choose</h3></Link>
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>

            </Container>
            </div>
        );
    }
    onOwnerMode() {
        this.props.setMode('owner')
    }
    onTenantMode() {
        this.props.setMode('tenant')
    }
}
const mapDispatchToProps = dispatch => ({
    unsetPartialClient: () => dispatch(unsetPartialClient()),
    setMode: (mode) => dispatch(setMode(mode)),
    cleanProperties: () => dispatch(cleanProperties())
});
export default connect(null,
    mapDispatchToProps
    )(SelectionModeView);
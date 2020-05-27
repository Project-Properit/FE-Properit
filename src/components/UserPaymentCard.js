import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import {Field} from "redux-form";
import {loadUser} from "../actions/userActions";
import {connect} from "react-redux";

class UserPaymentCard extends Component {
    componentDidMount() {
        this.user = null
        this.props.loadUser(this.props.userId);
    }

    render() {
        return (
            <Col style={{margin: '1rem'}}>
                <Card border={null} style={{width: "18rem"}}>
                    <Card.Body>
                        <Card.Title>
                            <p style={{float: 'left'}}><b>{this.props.user ? this.props.user.first_name : null}</b></p>
                            {/*<div style={{width:'4rem'}}></div>*/}
                            <div style={{clear: 'both'}}/>
                        </Card.Title>
                        <Field component="input" name="amount" type="number" placeholder="Amount"/>
                    </Card.Body>
                </Card>
            </Col>)
    }
}

const mapStateToProps = ({userReducer}) => ({
    user: userReducer.user
});

const mapDispatchToProps = dispatch => ({
    loadUser: (userId) => dispatch(loadUser(userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserPaymentCard);
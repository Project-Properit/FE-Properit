import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadGroupsPayments} from "../actions/groupsPaymentsActions";
import Container from "react-bootstrap/Container";
import Loading from "./Loading";
import Row from "react-bootstrap/Row";
import {PropertyCard} from "./PropertyCard";
import {GroupPaymentsCard} from "./GroupPaymentsCard";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";

class GroupsPayments extends Component {
    componentDidMount() {
        const {propId} = this.props.match.params;
        this.props.loadGroupsPayments(propId);
    }

    render() {
        const {propId} = this.props.match.params;
        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Payments - {propId}</h2>
                </header>
                <Loading loading={this.props.isLoading}/>
                <Link as={Link} to={this.onCreateGroupPayment(propId)}>
                    <button>Create Group Payment</button>
                </Link>
                <Row>
                    {this.props.myGroupsPayments.map(groupPayments => (
                        <GroupPaymentsCard
                            key={groupPayments.id}
                            infoUrl={this.onInfoGroupPayments(propId, groupPayments.id)}
                            groupPayments={groupPayments}/>
                    ))}
                </Row>
                <div>
                    {this.props.error}
                </div>

            </Container>
        )
    }
    onCreateGroupPayment(propId) {
        // console.log(groupPaymentId)
        return '/properties/' +propId + '/CreatePayments'
    }
    onInfoGroupPayments(propId, groupPaymentId) {
        // console.log(groupPaymentId)
        return '/properties/' +propId +'/payments/' +groupPaymentId
    }
}

const mapStateToProps = ({myGroupsPayments}) => ({
    isLoading: myGroupsPayments.isLoading,
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    error: myGroupsPayments.error,
});

const mapDispatchToProps = dispatch => ({
    loadGroupsPayments: (assetId) => dispatch(loadGroupsPayments(assetId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupsPayments);
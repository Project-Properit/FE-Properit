import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadGroupsPayments} from "../actions/groupsPaymentsActions";
import Container from "react-bootstrap/Container";
import Loading from "./Loading";
import {GroupPayments} from "./GroupPayments";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import {loadGroupPayments} from "../actions/groupPaymentsActions";
import Row from "react-bootstrap/Row";
import {clearPayment} from "../actions/paymentActions";

class GroupsPayments extends Component {
    constructor() {
        super();
        this.state = {groupPayments: [], isLoaded: false, propId:null};
    }

    componentDidMount() {
        let propId = this.props.match.params.propId
        this.setState({propId:this.props.match.params.propId})
        this.props.loadGroupsPayments(propId);
    }
    componentDidUpdate() {
        if (!this.state.isLoaded && !this.props.isLoading) {
            this.props.myGroupsPayments.map(groupPaymentsId => {
                this.props.loadGroupPayments(this.state.propId, groupPaymentsId)
            })
            this.setState({isLoaded: true})
        }
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
                <div>
                    <Row>
                        {this.props.allGroupPayments.map((groupPayments,index) => (
                            <GroupPayments
                                key={index}
                                propId={propId}
                                groupPaymentsId={this.getGroupPaymentsId(index)}
                                groupPayments={groupPayments}/>
                        ))}
                    </Row>
                </div>
                <div>
                    {this.props.error}
                </div>

            </Container>
        )
    }
    getGroupPaymentsId(index){
        return this.props.myGroupsPayments[index]
    }
    onCreateGroupPayment(propId) {
        return '/properties/' + propId + '/CreatePayments'
    }
}

const mapStateToProps = ({myGroupsPayments, myGroupPayments}) => ({
    isLoading: myGroupsPayments.isLoading,
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    allGroupPayments: myGroupPayments.allGroupPayments,
    error: myGroupsPayments.error
});

const mapDispatchToProps = dispatch => ({
    loadGroupsPayments: (assetId) => dispatch(loadGroupsPayments(assetId)),
    loadGroupPayments: (propId, groupPaymentsId) => dispatch(loadGroupPayments(propId, groupPaymentsId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupsPayments);
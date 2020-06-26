import React, {Component} from 'react';
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import Test from "./Test";
import {withRouter} from "react-router-dom";
import GroupsCollapsibleTable from "../GroupsPaymentsTable";

class PaymentsRequests extends Component {
    componentDidMount() {
        let {propId}= this.props.match.params
        console.log(propId)
        this.props.loadGroupsPayments(propId, this.props.userId);
    }

    render() {
        return (
            <div>
                <GroupsCollapsibleTable groupsPayments={this.props.myGroupsPayments}/>
            </div>
        );
    }
}
const mapStateToProps = ({myGroupsPayments, clientReducer}) => ({
    isLoading: myGroupsPayments.isLoading,
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    error: myGroupsPayments.error,
    userId: clientReducer.userId

});

const mapDispatchToProps = dispatch => ({
    loadGroupsPayments: (assetId, userId) => dispatch(loadGroupsPayments(assetId, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PaymentsRequests));

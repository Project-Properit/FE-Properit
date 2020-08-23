import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loadPayments, pay} from "../../actions/MyPaymentsActions";
import CollapsibleTable from "../GroupPaymentsTable";
import Loading from "../Loading";

class Payments extends Component {
    render() {
        const {propId} = this.props.match.params
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Loading loading={this.props.isLoading}/>
                <CollapsibleTable
                    loadPayments={this.props.loadPayments} userId={this.props.userId} propId={propId}
                    groupPayments={this.props.myPayments}
                    payMethod={this.props.pay}/>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadPayments: (assetId, userId) => dispatch(loadPayments(assetId, userId)),
    pay: (all) => dispatch(pay(all))

});
const mapStateToProps = ({clientReducer, myPaymentsReducer}) => ({
    userId: clientReducer.userId,
    myPayments: myPaymentsReducer.myPayments,
    isLoading: myPaymentsReducer.isLoading

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Payments));
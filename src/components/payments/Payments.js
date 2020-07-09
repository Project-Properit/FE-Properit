import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loadPayments} from "../../actions/MyPaymentsActions";
import CollapsibleTable from "../GroupPaymentsTable";
import Loading from "../Loading";

class Payments extends Component {
    componentDidMount() {
        const {propId} = this.props.match.params
        this.props.loadPayments(propId, this.props.userId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.myPayments.length)this.props.setPaymentsCount(this.props.myPayments.length)
    }

    render() {
        const {propId} = this.props.match.params
        return (
            <div>
                <Loading loading={this.props.isLoading}/>
                <CollapsibleTable
                    loadPayments={this.props.loadPayments} userId={this.props.userId} propId={propId}
                    groupPayments={this.props.myPayments}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadPayments: (assetId, userId) => dispatch(loadPayments(assetId, userId))

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
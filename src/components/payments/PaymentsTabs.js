import React, {Component} from 'react';
import FadeIn from "react-fade-in";
import UserTabs from "../UserTabs";
import PaymentsRequests from "./PaymentsRequests";
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class PaymentsTabs extends Component {
    componentDidMount() {
        let userId = localStorage.getItem('userId')
        let assetId = localStorage.getItem('chosenAssetId')
        this.props.loadGroupsPayments(assetId, userId)
    }

    render() {
        return (
            <div>
                {
                    (localStorage.getItem('chosenMode') === 'tenant') ?
                        (<FadeIn>
                                <UserTabs/>
                            </FadeIn>
                        ) : (
                            <FadeIn>
                                <div>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <h2>{"My Group Payments "}</h2>
                                    </div>
                                    <PaymentsRequests setGroupPaymentsCount={() => {
                                    }}/>
                                </div>
                            </FadeIn>)
                }
            </div>
        );
    }
}
const mapStateToProps = ({myGroupsPayments}) => ({
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    isLoadingGroups: myGroupsPayments.isLoading
})

const mapDispatchToProps = dispatch => ({
    loadGroupsPayments: (assetId, userId) => dispatch(loadGroupsPayments(assetId, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PaymentsTabs));
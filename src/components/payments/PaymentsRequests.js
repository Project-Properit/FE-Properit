import React, {Component} from 'react';
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import GroupsCollapsibleTable from "../GroupsPaymentsTable";
import {Button, Tooltip} from "@material-ui/core";
import CreateGroupPayments from "../CreateGroupPayments";
import {loadProperty} from "../../actions/propertyActions";
import {deleteGroupPayments} from "../../actions/groupPaymentsActions";
import Loading from "../Loading";

class PaymentsRequests extends Component {
    constructor() {
        super();
        this.state = {isOwner: false, newDocumentModalOpened: false, isSetOnce: false};
    }

    componentDidMount() {
        let {propId} = this.props.match.params
        this.props.loadProperty(propId);
    }

    openModal = () => {
        this.setState({newDocumentModalOpened: true})
    };

    closeModal = () => {
        this.setState({newDocumentModalOpened: false})
    };

    render() {
        let {propId} = this.props.match.params
        return (
            <div className="App">

            <div>
                <Tooltip title={this.checkTenantsList(this.props.myProperty.tenant_list, this.props.userId) ? "Property Has No Tenants" : "Create New Group"}>
                        <Button variant="outlined" color="primary"
                                className="createDocumentButton" onClick={this.openModal}
                                disabled={this.checkTenantsList(this.props.myProperty.tenant_list, this.props.userId)}>
                            Add Group Payment
                        </Button>
                </Tooltip>
            </div>
        <div id="documentsContainer" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {this.state.newDocumentModalOpened ?
                    <CreateGroupPayments
                        userId={this.props.userId}
                        propId={propId}
                        closeHandler={this.closeModal}
                    /> : null
                }
                <Loading loading={this.props.isLoadingGroups}/>
                <GroupsCollapsibleTable
                    deleteMethod={this.props.deleteGroupPayments}
                    userId={this.props.userId}
                    propId={propId}
                    groupsPayments={this.props.myGroupsPayments}
                />
            </div>
            </div>
        );
    }


    checkTenantsList(tenantsList, userId){
        if(tenantsList.length === 0) return true
        else{
            if(tenantsList.length === 1 && tenantsList[0].id === userId) return true
        }
    }

}

const mapStateToProps = ({myGroupsPayments, myPropertyReducer, clientReducer}) => ({
    isLoading: myPropertyReducer.isLoading,
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    isLoadingGroups: myGroupsPayments.isLoading,
    myProperty: myPropertyReducer.myProperty,
    error: myGroupsPayments.error,
    userId: clientReducer.userId

});

const mapDispatchToProps = dispatch => ({
    loadProperty: (assetId) => dispatch(loadProperty(assetId)),
    deleteGroupPayments: (userId, assetId, group_payments_id) => dispatch(deleteGroupPayments(userId, assetId, group_payments_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PaymentsRequests));

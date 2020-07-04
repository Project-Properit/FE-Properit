import React, {Component} from 'react';
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import GroupsCollapsibleTable from "../GroupsPaymentsTable";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import CreateGroupPayments from "../CreateGroupPayments";
import {loadProperty} from "../../actions/propertyActions";
import {deleteGroupPayments} from "../../actions/groupPaymentsActions";
import Loading from "../Loading";

class PaymentsRequests extends Component {
    constructor() {
        super();
        this.state = {isOwner: false,newDocumentModalOpened: false, isSetOnce: false};
    }

    componentDidMount() {
        let {propId} = this.props.match.params
        this.props.loadProperty(propId);
        this.props.loadGroupsPayments(propId, this.props.userId);


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.isLoading && !this.state.isOwner && !this.state.isSetOnce) {
            let isOwner = this.props.myProperty.owner_id === this.props.userId
            this.setState({isOwner, isSetOnce:true})
        }
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
            <div id="documentsContainer">
                {this.state.newDocumentModalOpened ?
                    <CreateGroupPayments
                        userId={this.props.userId}
                        propId={propId}
                        loadGroups={this.props.loadGroupsPayments}
                        closeHandler={this.closeModal}
                    /> :null
                }
                <Loading loading={this.props.isLoadingGroups}/>
                <GroupsCollapsibleTable
                    deleteMethod={this.props.deleteGroupPayments}
                    userId={this.props.userId}
                    propId={propId}
                    isOwner={this.state.isOwner}
                    groupsPayments={this.props.myGroupsPayments}
                />
                <Button variant="outlined" color="primary" className="createDocumentButton" onClick={this.openModal}>
                    הוסף קבוצת תשלום
                </Button>
            </div>
        );
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
    loadGroupsPayments: (assetId, userId) => dispatch(loadGroupsPayments(assetId, userId)),
    loadProperty: (assetId) => dispatch(loadProperty(assetId)),
    deleteGroupPayments:(userId, assetId, group_payments_id) => dispatch(deleteGroupPayments(userId, assetId, group_payments_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PaymentsRequests));

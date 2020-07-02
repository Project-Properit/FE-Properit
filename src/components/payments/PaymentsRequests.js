import React, {Component} from 'react';
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import GroupsCollapsibleTable from "../GroupsPaymentsTable";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import CreateGroupPayments from "../CreateGroupPayments";
import {loadProperty} from "../../actions/propertyActions";

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
            console.log(this.state)
        }
    }

    openModal = () => {
        console.log("openModal")
        this.setState({newDocumentModalOpened: true})
    };

    closeModal = () => {
        console.log("closeModal")
        this.setState({newDocumentModalOpened: false})
    };
    onButtonClick = () => {

    }

    render() {
        let {propId} = this.props.match.params
        return (
            <div id="documentsContainer">
                {this.state.newDocumentModalOpened ?
                    (<CreateGroupPayments userId={this.props.userId} propId={propId} closeHandler={this.closeModal}/>
                    ) : ""
                }
                <GroupsCollapsibleTable isOwner={this.state.isOwner} groupsPayments={this.props.myGroupsPayments} />
                <Button variant="outlined" color="primary" className="createDocumentButton" onClick={this.openModal}>
                    <Add/>
                    הוסף קבוצת תשלום
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({myGroupsPayments, myPropertyReducer, clientReducer}) => ({
    isLoading: myPropertyReducer.isLoading,
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    myProperty: myPropertyReducer.myProperty,
    error: myGroupsPayments.error,
    userId: clientReducer.userId

});

const mapDispatchToProps = dispatch => ({
    loadGroupsPayments: (assetId, userId) => dispatch(loadGroupsPayments(assetId, userId)),
    loadProperty: (assetId) => dispatch(loadProperty(assetId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PaymentsRequests));

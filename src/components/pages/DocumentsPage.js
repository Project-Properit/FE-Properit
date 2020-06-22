import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DocumentsView from "./DocumentsView";
import React from "react";
import { loadProperty } from "../../actions/propertyActions";

class DocumentsPage extends React.Component{
	componentDidMount() {
		const {propId} = this.props.match.params
		this.props.loadProperty(propId);
	}

	render() {
		const myDocs = this.props.myProperty? this.props.myProperty.documents: []
	    return <DocumentsView documents={myDocs}/>;
    }

 }


const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
});
const mapStateToProps = ({myPropertyReducer, userReducer, state}) => ({
    myProperty: myPropertyReducer.myProperty,

});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DocumentsPage));
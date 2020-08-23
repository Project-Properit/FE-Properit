import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DocumentsView from "./DocumentsView";
import React from "react";
import { loadProperty, addDocument, deleteDocument } from "../../actions/propertyActions";
import { setDocuments } from "../../actions/documentActions";

class DocumentsPage extends React.Component{

	state = {
		documents: []
	}

	componentDidMount() {
		const {propId} = this.props.match.params
		this.props.loadProperty(propId);
	}

	createNewDocument = (document) => {
		this.setState({})
		this.props.addDocument(document);
	}

	render() {
		const myDocs = this.props.myProperty ? this.props.myProperty.documents: []
	    return <DocumentsView tenants={this.props.myProperty.tenant_list} documents={myDocs} createNewDocument={this.createNewDocument} deleteDocument={this.props.deleteDocument}/>;
    }

 }


const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
	addDocument: (document) => dispatch(addDocument(document)),
	deleteDocument: (document) => dispatch(deleteDocument(document))

});
const mapStateToProps = ({myPropertyReducer}) => ({
	myProperty: myPropertyReducer.myProperty
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DocumentsPage));
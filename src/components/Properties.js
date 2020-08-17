import React, { Component } from 'react';
import { connect } from "react-redux";
import {chooseAsset, cleanProperties, loadProperties} from "../actions/propertiesActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { PropertyCard } from "./PropertyCard";
import Loading from "./Loading";
import CreatProperties from "./pages/properties/index"
import { removeProperty } from "../actions/propertyActions";

class Properties extends Component {
	constructor(props) {
		super(props);
		this.onChooseProperty = this.onChooseProperty.bind(this);
	}
	componentDidMount() {
		this.props.cleanProperties()
		this.props.loadProperties(this.props.ownerId);
	}
	onChooseProperty(propId) {
		this.props.chooseAsset(propId)
		this.props.history.push("/properties/" +propId+'/payments');
	}
	onRemoveProperty(propId) {
		console.log("Remove",propId)
		this.props.removeProperty(propId);


	}
	render() {
		const {userId} = this.props.match.params;

		return (
			<div id="userContent">

				<Container className="App">
					<header style={{marginBottom: '2rem', textAlign: 'center'}} className="App-header">
						<h2> Properties {userId}</h2>
					</header>

					<CreatProperties/>
					<Loading loading={this.props.isLoading}/>

					<Row style={{justifyContent: 'space-around',
						marginTop: '25px'}}>
						{this.props.myProperties.map(prop => (
							<PropertyCard
								onChoose={()=>this.onChooseProperty(prop.id)}
								onRemove={()=>this.onRemoveProperty(prop.id)}
								infoUrl={this.onInfoProperty(prop.id)}
								editUrl={this.onEditProperty(prop.id)}
								groupsPaymentsUrl={this.onGroupsPayments(prop.id)}
								key={prop.id}
								property={prop}/>
						))}
					</Row>
					<div>
						{this.props.error}
					</div>
				</Container>
			</div>
		)
	}

	onInfoProperty(propId) {
		return '/properties/' + propId
	}

	onEditProperty(propId) {
		return '/properties/' + propId + '/edit'
	}

	onGroupsPayments(propId) {
		return '/properties/' + propId + '/payments'
	}
}

const mapStateToProps = ({myProperties, clientReducer}) => ({
	isLoading: myProperties.isLoading,
	myProperties: myProperties.myProperties,
	error: myProperties.error,
	ownerId: clientReducer.userId
});

const mapDispatchToProps = dispatch => ({
	loadProperties: (ownerId) => dispatch(loadProperties(ownerId)),
	cleanProperties: () => dispatch(cleanProperties()),
	removeProperty: (assetId) => dispatch(removeProperty(assetId)),
	chooseAsset: (assetId) => dispatch(chooseAsset(assetId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);
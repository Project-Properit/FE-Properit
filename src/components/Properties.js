import React, { Component } from 'react';
import { connect } from "react-redux";
import { chooseAsset, loadProperties } from "../actions/propertiesActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { PropertyCard } from "./PropertyCard";
import Loading from "./Loading";
import CreatProperties from "./pages/properties/index"

class Properties extends Component {
	constructor(props) {
		super(props);
		this.onChooseProperty = this.onChooseProperty.bind(this);
	}
	componentDidMount() {
		this.props.loadProperties(this.props.ownerId);
	}
	onChooseProperty(propId) {
		this.props.chooseAsset(propId)
		this.props.history.push("/properties/" +propId+'/payments');
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

					<Row>
						{this.props.myProperties.map(prop => (
							<PropertyCard
								onChoose={this.onChooseProperty}
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
	chooseAsset: (assetId) => dispatch(chooseAsset(assetId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);
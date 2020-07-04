import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadProperties } from "../actions/propertiesActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { PropertyCard } from "./PropertyCard";
import Loading from "./Loading";
import CreatProperties from "./pages/properties/index"

class Properties extends Component {
	componentDidMount() {
		this.props.loadProperties(this.props.ownerId);
	}

	render() {
		const {userId} = this.props.match.params;

		return (
			<div id="userContent">

				<Container className="App">
					<header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
						<h2> Properties - {userId}</h2>
					</header>

					{/*<Button onClick={()=>this.onAddProperty()}>Add New Property</Button>*/}
					<CreatProperties/>
					<Loading loading={this.props.isLoading}/>

					<Row>
						{this.props.myProperties.map(prop => (
							<PropertyCard
								onRemove={(propId) => this.onRemoveProperty(propId)}
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

	onRemoveProperty(propId) {
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
	loadProperties: (ownerId) => dispatch(loadProperties(ownerId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);
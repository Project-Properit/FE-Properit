import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadProperties} from "../actions/propertyActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {PropertyCard} from "./PropertyCard";

class Properties extends Component {
    componentDidMount() {
        const {userId} = this.props.match.params;
        this.props.loadProperties(userId);
    }

    render() {
        const {userId} = this.props.match.params;

        return (

            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Properties - {userId}</h2>
                </header>
                {this.props.isLoading &&
                <div>Loading..</div>
                }
                <Row>
                    {this.props.myProperties.map(prop => (
                            <PropertyCard
                                onRemove={(propId)=>this.onRemoveProperty(propId)}
                                infoUrl={this.onInfoProperty(prop.prop_id)}
                                key={prop.prop_id}
                                property={prop}/>
                    ))}
                </Row>
                <div>
                    {this.props.error}
                </div>

            </Container>
        )
    }

    onRemoveProperty(propId) {
        console.log('Remove ' +propId);
    }

    onInfoProperty(propId) {
        return this.props.match.url +'/' +propId
    }
}

const mapStateToProps = ({myProperties}) => ({
    isLoading: myProperties.isLoading,
    myProperties: myProperties.myProperties,
    error: myProperties.error,
});

const mapDispatchToProps = dispatch => ({
    loadProperties: (userId) => dispatch(loadProperties(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Properties);
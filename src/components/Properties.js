import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadProperties} from "../actions/propertiesActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {PropertyCard} from "./PropertyCard";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import UserTabs from "./UserTabs/index";
import FadeIn from "react-fade-in";

class Properties extends Component {
    componentDidMount() {
        console.log(this.props.ownerId)
        this.props.loadProperties(this.props.ownerId);
    }

    render() {
        const {userId} = this.props.match.params;

        return (
            <div id="userContent">
                <FadeIn>
                    <UserTabs/>
                </FadeIn>
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Properties - {userId}</h2>
                </header>
                <Button onClick={()=>this.onAddProperty()}>Add New Property</Button>

               <Loading loading={this.props.isLoading}/>

                <Row>
                    {this.props.myProperties.map(prop => (
                            <PropertyCard
                                onRemove={(propId)=>this.onRemoveProperty(propId)}
                                infoUrl={this.onInfoProperty(prop.id)}
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
    onAddProperty() {
            window.location = "/addNewProperty"
        }
    onRemoveProperty(propId) {
        console.log('Remove ' +propId);
    }

    onInfoProperty(propId) {
        return '/properties/' +propId
    }
    onGroupsPayments(propId) {
        return '/properties/' +propId +'/payments'
    }
}

const mapStateToProps = ({myProperties, clientReducer}) => ({
    isLoading: myProperties.isLoading,
    myProperties: myProperties.myProperties,
    error: myProperties.error,
    ownerId: clientReducer.userId,
});

const mapDispatchToProps = dispatch => ({
    loadProperties: (ownerId) => dispatch(loadProperties(ownerId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Properties);
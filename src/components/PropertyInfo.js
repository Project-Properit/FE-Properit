import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";

class PropertyInfo extends Component {
    componentDidMount() {

    }
    render() {

        const {userId, propId} = this.props.match.params;
        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Properties - {userId} - {propId}</h2>
                </header>
            </Container>
        )
    }
}
//
// const mapStateToProps = ({myProperties}) => ({});
//
// const mapDispatchToProps = dispatch => ({});

export default connect(
    null,
    null,
)(PropertyInfo);
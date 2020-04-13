import React, {Component} from 'react';
import {connect} from "react-redux";

class Payments extends Component {
    componentDidMount() {
        //    Load Something
    }

    render() {
        const {userId} = this.props.match.params;

        return (

            <div className="App">
                <header className="App-header">

                    <h2> Payments - {userId}</h2>
                </header>

            </div>
        )
    }
}

// const mapStateToProps = ({ isLoading, images, error }) => ({
//     isLoading,
//     images,
//     error,
// });

// const mapDispatchToProps = dispatch => ({
//     loadImages: () => dispatch(loadImages()),
// });

export default connect(
    null,
    null,
)(Payments);
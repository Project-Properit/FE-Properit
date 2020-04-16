import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadImages} from "../actions/imageActions";

class  Images extends Component{
    componentDidMount() {
        this.props.loadImages();
    }
    render(){
        const { images } = this.props;
    return (

        <div className="App">
            <header className="App-header">

                <h2>Images !!!</h2>
            </header>
            {images.images.map(image => (
                <div key={image.number}>
                    {image.name}
                </div>
            ))}
        </div>
    )
    }
}

const mapStateToProps = ({ isLoading, images, error }) => ({
    isLoading,
    images,
    error,
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Images);
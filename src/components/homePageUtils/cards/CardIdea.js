import React from 'react';
import './CardIdea.scss';

/*
props: Image, text, title, textOffset, imageOffset, id
* */
export default class CardIdea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const textClassName = `col s12 16 ${this.props.textOffset} text-wrapper`
        const imageClassName = `col s12 l4 ${this.props.imageOffset} image-wrapper`
        return (
            <div className="row" id={this.props.id}>
                <div className={imageClassName}>
                    <img src={this.props.image} alt="" className="responsive-img"/>
                </div>
                <div className={textClassName}>
                    <h2 className="card-idea-title">{this.props.title}</h2>
                    <p className="card-idea-text">{this.props.text}</p>
                </div>
            </div>
        )
    }
}
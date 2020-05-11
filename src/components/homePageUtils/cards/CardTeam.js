import React from 'react';
import './CardTeam.scss';

/*
props: Image, text, title, textOffset, imageOffset, id
* */
export default class CardTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="row" id={this.props.id}>
                <div className="column">
                    <div className="cardTeam">
                            <h2 className="card-team-title">{this.props.title}</h2>
                            <img src={this.props.image} alt="" className="profile-img"/>
                    </div>
                </div>
            </div>
        )
    }
}


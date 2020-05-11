import React from 'react';
import './Card.scss';

export default class Header extends React.PureComponent {
    render() {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-content white-text">
                            {/*<span className="card-title">Card Title</span>*/}
                            <p>Control your property</p>
                        </div>
                        <div className="card-action white-text">
                            <a className="waves-effect waves-light btn" href="#">Login</a>
                            <a className="waves-effect waves-light btn no-background" href="#">Learn More</a>
                            <a className="waves-effect waves-light btn no-background" href="#">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
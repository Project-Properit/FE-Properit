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
						<div className="card-action white-text" style={{'text-align': 'center'}}>
							<div style={{'display': 'inline-block', 'margin': '0 auto'}}>

									<a className="waves-effect waves-light btn" href="/login">Log In</a>

								{/*<span style={{'width':'100px'}}> </span>*/}
								{/*<a className="waves-effect waves-light btn no-background" href="/signup">Create New*/}
								{/*	Account</a>*/}

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
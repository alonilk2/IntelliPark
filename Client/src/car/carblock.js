
import React, {Component} from 'react';
import './carblock.css';

class Carblock extends Component {
	render() {
		return (
			<div className="card">
				<img src={this.props.imgurl} className="card-img-top" alt=""></img>
				<div className="body-card">
					<h5 className="card-title">{this.props.Manufacturer}</h5>
					<p className="card-text">ID: {this.props.ID}</p>
				</div>
			</div>
		)
	}
}

export default Carblock;
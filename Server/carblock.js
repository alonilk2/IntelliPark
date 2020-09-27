
import React, {Component} from 'react';
import './carblock.css';

class Carblock extends Component {
	render() {
		return (
			<div className="card">
				<img src={this.props.imgurl} class="card-img-top" alt=""></img>
				<div class="body-card">
					<h5 class="card-title">{this.props.Manufacturer}</h5>
					<p class="card-text">ID: {this.props.ID}</p>

				</div>
			</div>
		)
	}
}

export default Carblock;
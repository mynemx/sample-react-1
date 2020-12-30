import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		let uri = `http://localhost/hotdial/public/items/${this.props.obj.id}`;
		axios.delete(uri);
		// browserHistory.push('/display-item');
		// return <Redirect to={'/display-item'} />;
		this.props.history.push('/add-item');
	}
	render() {
		return (
			<tr>
				<td>{this.props.obj.id}</td>
				<td>{this.props.obj.name}</td>
				<td>{this.props.obj.price}</td>
				<td>
					<Link to={'edit/' + this.props.obj.id} className="btn btn-primary">
						Edit
					</Link>
				</td>
				<td>
					<form onSubmit={this.handleSubmit}>
						<input type="submit" value="Delete" className="btn btn-danger" />
					</form>
				</td>
			</tr>
		);
	}
}

export default TableRow;

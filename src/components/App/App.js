import _ from 'lodash';
import React from 'react';
import Content from './Content/Content';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import './App.css';

const {
	func,
	node,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		children: node,
		fetchWrestlers: func,
	},

	getDefaultProps() {
		return {
			fetchWrestlers: _.noop,
		};
	},

	componentDidMount() {
		this.props.fetchWrestlers();
	},

	render() {
		return (
			<div className='App'>
				<Header />
				<Nav />
				<Content>
					{this.props.children}
				</Content>
			</div>
		);
	},
});

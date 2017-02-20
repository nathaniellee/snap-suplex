import React from 'react';
import { Link } from 'react-router';
import './NavLink.css';

export default (props) => (
	<Link {...props} className='NavLink' activeClassName='active' />
);

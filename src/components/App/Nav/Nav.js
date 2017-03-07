import React from 'react';
import NavLink from './NavLink/NavLink';
import './Nav.css';

export default () => (
  <div className='Nav'>
  	<NavLink to='/' onlyActiveOnIndex>Home</NavLink>
  	<NavLink to='/wrestlers'>Wrestlers</NavLink>
  	<NavLink to='/match'>Match</NavLink>
  	<NavLink to='/matches'>Match Archives</NavLink>
  </div>
);

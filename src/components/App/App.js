import React from 'react';
import Content from './Content/Content';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import './App.css';

export default ({ children }) => (
  <div className='App'>
    <Header />
    <Nav />
    <Content>
      {children}
    </Content>
  </div>
);

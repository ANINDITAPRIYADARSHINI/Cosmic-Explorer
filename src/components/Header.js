import React from 'react';

export default function Header(props) {
  return (
    <header className="header">
      <img src={props.logo } className="header--logo" />
      <h2 className="header--title">  Cosmic Explorer</h2>
      <h3 className="header--credit">
        Created & Maintained By Anindita Priyadarshini, 2023
      </h3>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/breadcrumbs.css';

function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
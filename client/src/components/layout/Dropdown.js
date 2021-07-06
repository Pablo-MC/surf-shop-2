import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
  return (
    <div div className="dropdown-menu">
      {props.categories.map(category =>
        <Link
          to={`/products/${category.name}`}
          key={category._id}
          className="dropdown-item text-center"
          onClick={() => props.onProducts(category._id)}
        >{category.name}
        </Link>)
      }
    </div>
  );
}

export default Dropdown;
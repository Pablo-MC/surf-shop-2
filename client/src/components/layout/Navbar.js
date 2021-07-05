import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery';

import authContext from '../../context/auth/authContext';
import roleContext from '../../context/role/roleContext';
import cartContext from '../../context/cart/cartContext';

import logo from '../../assets/images/logo/logo_blue.png';


const Navbar = () => {
  const history = useHistory();

  const { user, authenticated, logOut, getAuthenticatedUser } = useContext(authContext);
  const { categories, getCategories, getProducts, getProductsByCategory } = useContext(roleContext);
  const { productsCart, deleteAllProducts } = useContext(cartContext);

  useEffect(() => {
    getAuthenticatedUser();
    getCategories();
    getProducts();
    // eslint-disable-next-line
  }, []);


  const handleClick = () => {
    logOut();
    deleteAllProducts(); // Eliminar productos del carrito
  }


  // Expirar Sesión si el usuario NO navega en el sitio durante 2 minutos. (Mouse)
  if (authenticated) {
    let timeout;
    window.addEventListener('mousemove', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logOut();
        history.push('/session-expired');
      }, 120000); // 2m === 120000
    })
  }

  // Expirar Sesión si el usuario NO navega en el sitio durante 2 minutos. (Touch)
  if (authenticated) {
    let timeout;
    window.addEventListener('touchmove', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logOut();
        history.push('/session-expired');
      }, 120000); // 2m === 120000
    })
  }

  // Solución al problema del colapaso del dropdown.
  $(window).width() >= 767.98
    ? $('.navbar-collapse').removeAttr('data-toggle')
    : $('.navbar-collapse').attr('data-toggle', 'collapse')


  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark py-0">
      <Link to='/'>
        <img src={logo} width="100" alt="Main Logo" />
      </Link>
      <button className="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse navbar-not-flash" data-toggle="collapse" data-target=".navbar-collapse">
        <div className="navbar-nav text-uppercase ml-2">
          <Link to='/' className="nav-link d-none d-md-block">Home</Link>
          <div className="dropdown">
            <Link to='/' className="nav-link dropdown-toggle" data-toggle="dropdown">Shop</Link>
            <div className="dropdown-menu">
              {categories.map(category =>
                <Link
                  to={`/products/${category.name}`}
                  // to={`/products/${category._id}`}
                  key={category._id}
                  className="dropdown-item text-center"
                  onClick={() => getProductsByCategory(category._id)}
                >{category.name}
                </Link>
              )}
            </div>
          </div>
          {user && user.roles === 'user' ? <span className="nav-link">{user.username}</span> : null}
          {user && user.roles === 'admin' ? <Link to='/admin' className="nav-link">Admin</Link> : null}
        </div>
        <div className="d-flex ml-auto text-center mr-2 btn-mobile">
          <div className="cart-icon-box">
            <Link to='/cart' className="btn btn-outline-info text-uppercase">My Cart<i className="fa fa-cart-arrow-down ml-2"></i></Link>
            {productsCart.length > 0 ? <span className="cart-notification"> {productsCart.length} </span> : null}
          </div>
          {authenticated
            ? <Link to='/' className="btn btn-info text-uppercase ml-3" onClick={handleClick}>Log Out<i className="fa fa-sign-out ml-2"></i></Link>
            : <Link to='/login' className="btn btn-info text-uppercase ml-3">Sign In<i className="fa fa-user-circle ml-2"></i></Link>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink, useHistory } from 'react-router-dom';
import $ from 'jquery';

import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../store/auth/auth-slice';
import { getAuthenticatedUser } from '../../store/auth/auth-actions';

import { cartActions } from '../../store/cart/cart-slice';
import { saveCartUser } from '../../store/cart/cart-actions';

import logo from '../../assets/images/logo/logo_blue.png';

import Dropdown from './Dropdown';
import { getAllProducts, getAllCategories } from '../../store/admin/admin-actions';

const Navbar = () => {
  // const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const productsCart = useSelector(state => state.cart.productsCart);
  const categories = useSelector(state => state.admin.categories);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    dispatch(saveCartUser(user, productsCart)); // Guardar los productos del carrito en la propiedad cart del usuario.
    dispatch(cartActions.removeAllProductsFromCart());
    dispatch(authActions.logout());
  }


  // Expirar Sesión si el usuario NO navega en el sitio durante 2 minutos. (Mouse)
  // if (isAuthenticated) {
  //   let timeout;
  //   window.addEventListener('mousemove', () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       dispatch(authActions.logout());
  //       history.push('/session-expired');
  //     }, 120000); // 2m === 120000
  //   })
  // }

  // Expirar Sesión si el usuario NO navega en el sitio durante 2 minutos. (Touch)
  // if (isAuthenticated) {
  //   let timeout;
  //   window.addEventListener('touchmove', () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       dispatch(authActions.logout());
  //       history.push('/session-expired');
  //     }, 120000); // 2m === 120000
  //   })
  // }

  // Solución al problema del colapaso del dropdown.
  $(window).width() >= 767.98
    ? $('.navbar-collapse').removeAttr('data-toggle')
    : $('.navbar-collapse').attr('data-toggle', 'collapse')


  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark py-0">
      <NavLink to='/'><img src={logo} width="100" alt="Main Logo" /></NavLink>
      <button className="navbar-toggler" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse navbar-not-flash" data-toggle="collapse" data-target=".navbar-collapse">
        <div className="navbar-nav text-uppercase ml-2">
          <NavLink to='/' className="nav-link d-none d-md-block">Home</NavLink>
          <div className="dropdown">
            <NavLink to='/' className="nav-link dropdown-toggle" data-toggle="dropdown">Shop</NavLink>
            <Dropdown categories={categories} />
          </div>
          {user?.role === 'user' ? <span className="nav-link">{user.username}</span> : null}
          {user?.role === 'admin' ? <NavLink to='/admin' className="nav-link">Admin</NavLink> : null}
        </div>
        <div className="d-flex ml-auto text-center mr-2 btn-mobile">
          <div className="cart-icon-box">
            <NavLink to='/cart' className="btn btn-outline-info text-uppercase">My Cart<i className="fa fa-cart-arrow-down ml-2"></i></NavLink>
            {productsCart.length > 0 ? <span className="cart-notification"> {productsCart.length} </span> : null}
          </div>
          {isAuthenticated
            ? <NavLink to='/' className="btn btn-info text-uppercase ml-3" onClick={handleClick}>Log Out<i className="fa fa-sign-out ml-2"></i></NavLink>
            : <NavLink to='/login' className="btn btn-info text-uppercase ml-3">Sign In<i className="fa fa-user-circle ml-2"></i></NavLink>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
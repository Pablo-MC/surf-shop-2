import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RoleState from './context/role/roleState'
import AuthState from './context/auth/authState';
import CartState from './context/cart/cartState';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import SessionExpired from './components/layout/SessionExpired';
import PageNotFound from './components/layout/PageNotFound';
import ListProductsCategory from './components/products/ListProductsCategory';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import Admin from './components/admin/Admin';
import CreateProduct from './components/admin/CreateProduct';
import EditProduct from './components/admin/EditProduct';
import DeleteProduct from './components/admin/DeleteProduct';
import ManageUsers from './components/admin/ManageUsers';
import PrivateRoute from './components/routes/PrivateRoute';

import tokenAuth from './config/token';

// Al iniciar la app o al recargar el componente, enviamos (en caso de que exista) el token que esta almacenado en LocalStorage via HEADER al Backend.
tokenAuth();


// SCROLL TOP
window.addEventListener('scroll', function () {
  var scroll = document.querySelector('.scrollTop');
  scroll.classList.toggle('active', window.scrollY > 500)
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


function App() {
  return (
    <AuthState>
      <RoleState>
        <CartState>
          <div className="container-fluid p-0">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />

              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />

              <Route path='/cart' component={Cart} />
              <Route path='/products/:category' component={ListProductsCategory} />

              <PrivateRoute exact path='/admin' component={Admin} />
              <PrivateRoute path='/admin/create-product' component={CreateProduct} />
              <PrivateRoute path='/admin/edit-product' component={EditProduct} />
              <PrivateRoute path='/admin/delete-product' component={DeleteProduct} />
              <PrivateRoute path='/admin/manage-users' component={ManageUsers} />

              <PrivateRoute path='/checkout' component={Checkout} />

              <Route path='/session-expired' component={SessionExpired} />

              <Route path="*" component={PageNotFound} />
            </Switch>
            <div className="scrollTop" onClick={() => scrollToTop()}></div>
          </div>
        </CartState>
      </RoleState>
    </AuthState>
  );
}

export default App;
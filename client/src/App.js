import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
// BrowserRouter es el componente que nos permite contener las rutas y los componentes de nuestra aplicación. 
// Switch es un componente que se encarga de contener UNICAMENTE las rutas (componente <Route>).
// Route se utiliza para especificar las rutas que se redirigirán a un componente especifico.

// Importantisimo: En react siempre se trata de evitar que al hacer un click sobre un enlace se recarge la página, para que todo funcione desde la aplicación. Por lo tanto, para evitar que no se recarge/refresque la página debemos utilizar el componente Link del modulo react-router-dom.

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


function App () {
   return (
      <AuthState>
         <RoleState>
            <CartState>
               <BrowserRouter>
                  <div className="container-fluid p-0">
                     <Navbar />
                     <Switch>
                        <Route exact path='/' component={Home} />

                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />

                        <Route exact path='/cart' component={Cart} />
                        <Route exact path='/products/:category' component={ListProductsCategory} />
                        
                        <PrivateRoute exact path='/admin' component={Admin} />
                        <PrivateRoute exact path='/admin/create-product' component={CreateProduct} />
                        <PrivateRoute exact path='/admin/edit-product' component={EditProduct} />
                        <PrivateRoute exact path='/admin/delete-product' component={DeleteProduct} />
                        <PrivateRoute exact path='/admin/manage-users' component={ManageUsers} />

                        <PrivateRoute exact path='/checkout' component={Checkout} />

                        <Route exact path='/session-expired' component={SessionExpired} />

                        <Route exact path="*" component={PageNotFound} />
                     </Switch>
                     <div className="scrollTop" onClick={() => scrollToTop()}></div>
                  </div>
               </BrowserRouter>
            </CartState>
         </RoleState>
      </AuthState>
   );
}

export default App;
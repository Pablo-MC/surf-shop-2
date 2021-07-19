import { Switch, Route } from 'react-router-dom';
import { scrollToTop } from './config/scrollingTop';

import RoleState from './context/role/roleState'

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/home/Home';
import PageNotFound from './pages/PageNotFound';
import ListProductsCategory from './pages/products/ListProductsCategory';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import Admin from './pages/admin/Admin';
import CreateProduct from './pages/admin/CreateProduct';
import EditProduct from './pages/admin/EditProduct';
import DeleteProduct from './pages/admin/DeleteProduct';
import ManageUsers from './pages/admin/ManageUsers';

import Navbar from './components/layout/Navbar';
import SessionExpired from './components/layout/SessionExpired';

import PrivateRoute from './components/routes/PrivateRoute';


function App() {
  return (
    <RoleState>
      <main className="container-fluid p-0">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route path='/cart' component={Cart} />
          <Route path='/products/:category' component={ListProductsCategory} />

          {/* <PrivateRoute exact path='/admin' component={Admin} /> */}
          <Route exact path='/admin' component={Admin} />
          <PrivateRoute path='/admin/create-product' component={CreateProduct} />
          <PrivateRoute path='/admin/edit-product' component={EditProduct} />
          <PrivateRoute path='/admin/delete-product' component={DeleteProduct} />
          <PrivateRoute path='/admin/manage-users' component={ManageUsers} />

          <Route path='/checkout' component={Checkout} />
          {/* <PrivateRoute path='/checkout' component={Checkout} /> */}

          <Route path='/session-expired' component={SessionExpired} />

          <Route path="*" component={PageNotFound} />
        </Switch>
        <div className="scrollTop" onClick={() => scrollToTop()}></div>
      </main>
    </RoleState>
  );
}

export default App;
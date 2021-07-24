import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProductsByCategory from './pages/Products/ProductsByCategory';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import Admin from './pages/Admin/Admin';
import CreateProduct from './pages/Admin/CreateProduct';
import EditProduct from './pages/Admin/EditProduct';
import DeleteProduct from './pages/Admin/DeleteProduct';
import ManageUsers from './pages/Admin/ManageUsers';
import PageNotFound from './pages/Error/PageNotFound';

import Layout from './components/Layout/Layout';
import Navbar from './components/Layout/Navbar';
import SessionExpired from './components/Layout/SessionExpired';
import PrivateRoute from './components/Routes/PrivateRoute';

function App() {
  return (
    <Layout>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart' component={Cart} />
        <Route path='/products/:category' component={ProductsByCategory} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/session-expired' component={SessionExpired} />

        <PrivateRoute exact path='/admin' component={Admin} />
        <PrivateRoute path='/admin/create-product' component={CreateProduct} />
        <PrivateRoute path='/admin/edit-product' component={EditProduct} />
        <PrivateRoute path='/admin/delete-product' component={DeleteProduct} />
        <PrivateRoute path='/admin/manage-users' component={ManageUsers} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
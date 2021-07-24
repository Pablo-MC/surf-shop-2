// Protección de Componente (Higher Order Component): componente que toma a otro componente dentro de él.  
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.auth.user);

  return (
    <Route {...rest} render={props =>
      user?.role === 'admin'
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  );
};

export default PrivateRoute;

// OBS: Además de pasar el componente por parámetro, tambien debemos pasar una copia de los props para que dicho componente tenga toda la información y pueda ser utilizada. 
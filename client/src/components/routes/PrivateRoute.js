// PROTECCIÓN DE COMPONENTE (Higher Order Component): componente que toma a otro componente dentro de él.  

import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authContext from '../../context/auth/authContext';



// Higher Order Component . OBS: el componente que pasa como input son cada uno de los componentes que tienen <PrivateRoute />
const PrivateRoute = ({ component: Component, ...rest }) => {  // OBS: Además de pasar el componente por parámetro, tambien debemos pasar una copia de los props para que  dicho componente tenga toda la información y pueda ser utilizada. 

   const { token, getAuthenticatedUser } = useContext(authContext);

   useEffect(() => {
      getAuthenticatedUser();
      // eslint-disable-next-line
   }, []);


   return (
      <Route {...rest} render={props => !token
         ?
         (<Redirect to={{ pathname: '/' }} />) // Si el usuario NO esta autenticado, entonces se lo redirige a la pagina principal (Home). 
         :
         (<Component {...props} />)  // Si el usuario esta autenticado entonces se lo redirige al componente.  
      }
      />
   );
}

export default PrivateRoute;
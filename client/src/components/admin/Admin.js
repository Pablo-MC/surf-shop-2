import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';


const Admin = () => {

   const { user } = useContext(authContext);

   return (
      <div className="container">
         {user && user.roles === 'admin'
            ?
            <>
               <h1 className="text-center mt-5">Administrator Panel</h1>
               <div className="row d-flex justify-content-around mx-5 mt-5">
                  <Link to='admin/create-product' className="btn btn-primary m-3">Create Product<i className="fa fa-plus-square ml-2"></i></Link>
                  <Link to='admin/edit-product' className="btn btn-primary m-3">Edit Product<i className="fa fa-pencil-square-o ml-2"></i></Link>
                  <Link to='admin/delete-product' className="btn btn-primary m-3">Delete Product<i className="fa fa-minus-circle ml-2"></i></Link>
                  <Link to='admin/manage-users' className="btn btn-success m-3">Manage Users<i className="fa fa-user-circle ml-2"></i></Link>
               </div>
            </>
            :
            <div className="alert alert-danger lead text-center w-50 mx-auto mt-5" role="alert">Access allowed only for Administrators</div>
         }
      </div>
   );
}

export default Admin;
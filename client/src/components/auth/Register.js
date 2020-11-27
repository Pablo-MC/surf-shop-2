import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';


const Register = (props) => {

   const { registered, message, registerUser } = useContext(authContext);

   useEffect(() => {
      if (registered) props.history.push('/login');
      // eslint-disable-next-line
   }, [registered, message, props.history]);

   const [user, setUser] = useState({
      username: '',
      email: '',
      password: ''
   });

   const { username, email, password } = user;

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      registerUser({
         username: username,
         email: email,
         password: password
      });
   }


   return (
      <div id="register" className="row justify-content-center h-100 p-4">
         <div className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 my-5">
            <form
               onSubmit={handleSubmit}
            >
               <div className="input-group mb-3">
                  <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-user-circle"></i></span></div>
                  <input
                     className="form-control"
                     type="text"
                     name="username"
                     value={username}
                     placeholder="User Name"
                     onChange={handleChange}
                     required
                  />
               </div>
               <div className="input-group mb-3">
                  <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-envelope"></i></span></div>
                  <input
                     className="form-control"
                     type="email"
                     name="email"
                     value={email}
                     placeholder="Email"
                     onChange={handleChange}
                     required
                  />
               </div>
               <div className="input-group">
                  <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-unlock-alt px-1"></i></span></div>
                  <input
                     className="form-control"
                     type="password"
                     name="password"
                     value={password}
                     placeholder="Password"
                     onChange={handleChange}
                     required
                  />
               </div>

               {!message
                  ?
                  <button className="btn btn-block btn-primary rounded-pill mt-4 p-2" type="submit">Create account</button>
                  :
                  <div className="alert alert-danger text-center rounded-pill mt-4 p-2 mb-0" role="alert">{message}</div>
               }

            </form>
         </div>
      </div>
   );
}

export default Register;
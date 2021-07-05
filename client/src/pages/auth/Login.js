import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';


const Login = (props) => {
  const { authenticated, message, signIn } = useContext(authContext);

  useEffect(() => {
    if (authenticated) props.history.push('/');
    // eslint-disable-next-line
  }, [authenticated, message, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn({
      email: email,
      password: password
    });
  }


  return (
    <div id="login" className="row justify-content-center h-100 p-4">
      <div className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 my-5">
        <form
          onSubmit={handleSubmit}
        >
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
            ? <button className="btn btn-block btn-primary rounded-pill mt-4 p-2" type="submit">Sign In</button>
            : <div className="alert alert-danger text-center rounded-pill mt-4 p-2" role="alert">{message}</div>
          }
        </form>
        <div className="d-flex justify-content-center align-items-baseline mt-4">
          <h6 className="text-center font-weight-light text-light">- Don't have an account? -</h6>
          <Link to="/register" className="text-warning text-decoration-none ml-2">Create one!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
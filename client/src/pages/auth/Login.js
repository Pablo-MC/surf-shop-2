import React, { useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/auth-actions';

const Login = () => {
  const email = useRef();
  const password = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const message = useSelector(state => state.auth.message);

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signIn({
      email: email.current.value,
      password: password.current.value
    }));
  }

  return (
    <div id="login" className="row justify-content-center h-100 p-4">
      <div className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 my-5">
        <form onSubmit={submitHandler}>
          <div className="input-group mb-3">
            <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-envelope"></i></span></div>
            <input
              className="form-control"
              type="email"
              ref={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-unlock-alt px-1"></i></span></div>
            <input
              className="form-control"
              type="password"
              ref={password}
              placeholder="Password"
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
          <Link to='/register' className="text-warning text-decoration-none ml-2">Create one!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
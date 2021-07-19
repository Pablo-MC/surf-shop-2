import { useRef, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth/auth-actions';

const Register = () => {
  const [colorMessage, setColorMessage] = useState('danger');

  const username = useRef();
  const email = useRef();
  const password = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const message = useSelector(state => state.auth.message);

  useEffect(() => {
    if (message === 'Successful registration! 😀') {
      setColorMessage('success');
      setTimeout(() => {
        history.push('/login');
      }, 2000)
    }
  }, [message, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser({
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
    }));
  }

  return (
    <div id="register" className="row justify-content-center h-100 p-4">
      <div className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 my-5">
        <form onSubmit={submitHandler}>
          <div className="input-group mb-3">
            <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-user-circle"></i></span></div>
            <input
              className="form-control"
              type="text"
              ref={username}
              placeholder="User Name"
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
            </div>
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
              autoComplete="on"
              required
            />
          </div>

          {!message
            ? <button className="btn btn-block btn-primary rounded-pill mt-4 p-2" type="submit">Create account</button>
            : <div className={`alert alert-${colorMessage} text-center rounded-pill mt-4 p-2 mb-0`} role="alert">{message}</div>
          }
        </form>
      </div>
    </div>
  );
}

export default Register;
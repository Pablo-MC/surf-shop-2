import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUser, deleteUser } from '../../store/admin/admin-actions';

const ManageUsers = () => {
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [user, dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-success">Manage Users</h2>
      <div className="container row mt-4">
        <div className="col-auto">
          <label>User</label>
          <select className="custom-select" onChange={(e) => setUser(JSON.parse(e.target.value))}>
            <option hidden>Choose user...</option>
            {users.map(user =>
              <option key={user._id} value={JSON.stringify(user)} // value recibe un string.
              >{user.username}</option>
            )}
          </select>
        </div>

        {user &&
          <div className="container mt-4 lead">
            <p>Username: <span className="text-primary">{user.username}</span></p>
            <p>Email: <span className="text-primary">{user.email}</span></p>
            <p>Role: <span className="text-success font-weight-normal">{user.role}</span></p>

            <div className="form-row mt-4">
              <div className="d-flex">
                <select className="custom-select" onChange={(e) => setUser({ ...user, role: e.target.value })}>
                  <option hidden>Choose role...</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  className="btn btn-secondary btn-block ml-2"
                  onClick={() => dispatch(updateUser(user))}
                >Change Role</button>
              </div>
            </div>

            <button
              className="btn btn-danger my-5"
              onClick={() => dispatch(deleteUser(user))}
            >Delete User</button>
          </div>
        }
      </div>
    </div >
  );
}

export default ManageUsers;
import React, { Fragment, useContext, useEffect } from 'react';
import roleContext from '../../context/role/roleContext';

const ManageUsers = () => {
  const { user, users, getUsers, getUser, deleteUser, changeRole } = useContext(roleContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [user])

  const handleClick = () => {
    // if (window.confirm(`Are you sure you want to delete the user ${user.username}?`))
    deleteUser(user);
  }


  return (
    <div className="container mt-5">
      <h2 className="text-success">Manage Users</h2>
      {users
        ?
        <Fragment>
          <div className="container form-row mt-4">
            <div className="col-auto">
              <label>User</label>
              <select className="custom-select" onChange={(e) => getUser(e.target.value)}>
                <option hidden>Choose user...</option>
                {users.map(user =>
                  <option
                    key={user._id}
                    value={user._id}
                  >{user.username}</option>
                )}
              </select>
            </div>
          </div>

          {user
            ?
            <Fragment>
              <h4 className="mt-5">User Information</h4>
              <div className="container mt-4 lead">
                <p>Username: <span className="text-primary">{user.username}</span></p>
                <p>Email: <span className="text-primary">{user.email}</span></p>
                <p>Role: <span className="text-success font-weight-normal">{user.roles}</span></p>

                <div className="form-row mt-4">
                  <div className="d-flex">
                    <select className="custom-select" onChange={(e) => user.roles = e.target.value}>
                      <option hidden>Choose role...</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type="button" className="btn btn-secondary btn-block ml-2" onClick={() => changeRole(user)}>Change Role</button>
                  </div>
                </div>

                <button type="button" className="btn btn-danger my-5" onClick={handleClick}>Delete User</button>
              </div>
            </Fragment>
            :
            null
          }
        </Fragment>
        :
        <div className="alert alert-danger text-center w-25 mt-4">No registered users</div>
      }
    </div>
  );
}

export default ManageUsers;
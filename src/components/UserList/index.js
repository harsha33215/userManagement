import "./index.css";

const UserList = (props) => {
  const { userDetails, onEditUser, onDeleteUser } = props;
  const { id, firstName, lastName, email, department } = userDetails;
  const EditUser = () => {
    onEditUser(id);
  };
  const deleteUser = () => {
    onDeleteUser(id);
  };
  return (
    <li className="list-items">
      <div className="list-items-container">
        <h1 className="firstName">{`${firstName} ${lastName}`}</h1>
        <h3 className="email">{email}</h3>
        <p className="department">{department}</p>
        <div>
        <button className="edit-btn" onClick={EditUser}>
          Edit User
        </button>
        <button className="delete-btn" onClick={deleteUser}>
          <img
            className="delete-icon"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          />
        </button>
        </div>
      </div>
    </li>
  );
};

export default UserList;

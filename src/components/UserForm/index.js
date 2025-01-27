import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import UserList from "../UserList";

class UserForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    userList: [],
    isEditing: false,
    editUserId: null,
  };

  onAddUser = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, department, userList, isEditing, editUserId } = this.state;
  
    
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !department.trim()) {
      alert("All fields are required!");
      return;
    }
  
    if (isEditing) {
      const updatedUserList = userList.map((user) =>
        user.id === editUserId
          ? { ...user, firstName, lastName, email, department }
          : user
      );
      this.setState({
        userList: updatedUserList,
        isEditing: false,
        editUserId: null,
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } else {
     
      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        department,
      };
      this.setState((prevState) => ({
        userList: [...prevState.userList, newUser],
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      }));
    }
  };
  

  onChangeField = (field) => (event) => {
    this.setState({ [field]: event.target.value });
  };

  onEditUser = (userId) => {
    const { userList } = this.state;
    const userToEdit = userList.find((user) => user.id === userId);
    this.setState({
      ...userToEdit,
      isEditing: true,
      editUserId: userId,
    });
  };

  onDeleteUser = (userId) => {
    const { userList } = this.state;
    const updatedUserList = userList.filter((user) => user.id !== userId);
    this.setState({ userList: updatedUserList });
  };

  render() {
    const { firstName, lastName, email, department, userList, isEditing } = this.state;
    return (
      <div className="user-form-container">
        <h1 className="main-heading">User Management Dashboard</h1>
        <form className="form" onSubmit={this.onAddUser}>
          <h1 className="input-names">First Name</h1>
          <input
            type="text"
            className="input-text"
            value={firstName}
            placeholder="Enter First name"
            onChange={this.onChangeField("firstName")}
          />
          <h1 className="input-names">Last Name</h1>
          <input
            type="text"
            className="input-text"
            value={lastName}
            placeholder="Enter Last name"
            onChange={this.onChangeField("lastName")}
          />
          <h1 className="input-names">Email</h1>
          <input
            type="email"
            className="input-text"
            value={email}
            placeholder="Enter Email"
            onChange={this.onChangeField("email")}
          />
          <h1 className="input-names">Department</h1>
          <input
            type="text"
            className="input-text"
            value={department}
            placeholder="Enter department name"
            onChange={this.onChangeField("department")}
          />
          <br />
          <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
        </form>
        <div className="user-list-container">
          <ul>
            {userList.map((eachUser) => (
              <UserList
                key={eachUser.id}
                userDetails={eachUser}
                onEditUser={this.onEditUser}
                onDeleteUser={this.onDeleteUser}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserForm;

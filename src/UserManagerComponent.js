import React from 'react';

class UserManager {
  constructor() {
    this.users = {};
    this.nextId = 1;
  }

  addUser(name) {
    const id = this.nextId++;
    this.users[id] = name;
    return id;
  }

  getUser(id) {
    return this.users[id] || null;
  }

  deleteUser(id) {
    if (this.users[id]) {
      delete this.users[id];
      return true;
    }
    return false;
  }

  findUserByName(name) {
    const result = [];
    for (let id in this.users) {
      if (this.users[id] === name) {
        result.push(parseInt(id, 10));
      }
    }
    return result;
  }
}

class UserManagerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.userManager = new UserManager();
    this.state = {
      userName: '',
      userId: '',
      searchName: '',
      result: '',
    };
  }

  handleAddUser = () => {
    const id = this.userManager.addUser(this.state.userName);
    this.setState({ result: `User added with ID: ${id}` });
  };

  handleGetUser = () => {
    const name = this.userManager.getUser(parseInt(this.state.userId, 10));
    this.setState({ result: name ? `User name: ${name}` : 'User not found' });
  };

  handleDeleteUser = () => {
    const success = this.userManager.deleteUser(parseInt(this.state.userId, 10));
    this.setState({ result: success ? 'User deleted' : 'User not found' });
  };

  handleFindUserByName = () => {
    const ids = this.userManager.findUserByName(this.state.searchName);
    this.setState({ result: ids.length ? `User IDs: ${ids.join(', ')}` : 'No users found' });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>User Manager</h1>
        <div>
          <h2>Add User</h2>
          <input
            type="text"
            name="userName"
            placeholder="Enter user name"
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <button onClick={this.handleAddUser}>Add User</button>
        </div>
        <div>
          <h2>Get User</h2>
          <input
            type="number"
            name="userId"
            placeholder="Enter user ID"
            value={this.state.userId}
            onChange={this.handleChange}
          />
          <button onClick={this.handleGetUser}>Get User</button>
        </div>
        <div>
          <h2>Delete User</h2>
          <input
            type="number"
            name="userId"
            placeholder="Enter user ID"
            value={this.state.userId}
            onChange={this.handleChange}
          />
          <button onClick={this.handleDeleteUser}>Delete User</button>
        </div>
        <div>
          <h2>Find User by Name</h2>
          <input
            type="text"
            name="searchName"
            placeholder="Enter user name"
            value={this.state.searchName}
            onChange={this.handleChange}
          />
          <button onClick={this.handleFindUserByName}>Find User</button>
        </div>
        <div className="result">
          <h2>Result</h2>
          <p>{this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default UserManagerComponent;

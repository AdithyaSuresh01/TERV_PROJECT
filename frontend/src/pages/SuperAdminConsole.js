import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminConsole = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.role === 'superadmin') {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/users', config);
        setUsers(data);
      } else {
        history.push('/');
      }
    };

    fetchUsers();
  }, [history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.post('/api/users/create', { name, email, password, role }, config);
      setUsers([...users, data]);
      setName('');
      setEmail('');
      setPassword('');
      setRole('student');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Super Admin Console</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name} ({user.role})</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create New User</h2>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminConsole;

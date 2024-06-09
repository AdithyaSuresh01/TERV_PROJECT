import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminConsole = ({ history }) => {
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.role === 'admin') {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/users', config);
        setStudents(data.filter(user => user.role === 'student'));
      } else {
        history.push('/');
      }
    };

    const fetchTasks = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('/api/tasks/admin', config);
      setTasks(data);
    };

    fetchStudents();
    fetchTasks();
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
      const { data } = await axios.post('/api/tasks', { studentId, description }, config);
      setTasks([...tasks, data]);
      setStudentId('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Console</h1>
      <div>
        <h2>Assign Tasks</h2>
        <form onSubmit={submitHandler}>
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Assign Task</button>
        </form>
      </div>
      <div>
        <h2>Assigned Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.description} - Assigned to {task.student.name} ({task.student.email}) - {task.completed ? 'Completed' : 'Incomplete'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminConsole;

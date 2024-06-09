import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentConsole = ({ history }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.role === 'student') {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/tasks/student', config);
        setTasks(data);
      } else {
        history.push('/');
      }
    };

    fetchTasks();
  }, [history]);

  const handleTaskCompletion = async (taskId, completed) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.put(`/api/tasks/${taskId}/status`, { completed }, config);
      setTasks(tasks.map(task => (task._id === taskId ? data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Student Console</h1>
      <div>
        <h2>Your Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleTaskCompletion(task._id, e.target.checked)}
                />
                {task.description} - Assigned by {task.admin.name} ({task.admin.email})
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentConsole;

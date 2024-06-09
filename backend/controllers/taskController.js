const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  const { studentId, description } = req.body;
  const task = new Task({
    admin: req.user._id,
    student: studentId,
    description,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Get tasks by admin
// @route   GET /api/tasks/admin
// @access  Private/Admin
const getTasksByAdmin = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ admin: req.user._id }).populate('student', 'name email');
  res.json(tasks);
});

// @desc    Get tasks by student
// @route   GET /api/tasks/student
// @access  Private/Student
const getTasksByStudent = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ student: req.user._id }).populate('admin', 'name email');
  res.json(tasks);
});

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private/Student
const updateTaskStatus = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
  
    if (task) {
      task.completed = req.body.completed;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  });

module.exports = {
  createTask,
  getTasksByAdmin,
  getTasksByStudent,
  updateTaskStatus,
};

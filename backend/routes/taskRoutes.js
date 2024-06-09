const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByAdmin,
  getTasksByStudent,
  updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTask);
router.route('/admin').get(protect, getTasksByAdmin);
router.route('/student').get(protect, getTasksByStudent);
router.route('/:id/status').put(protect, updateTaskStatus);

module.exports = router;

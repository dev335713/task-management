const Task = require('../models/Task');

exports.getStats = async (req, res) => {
  const total = await Task.countDocuments();
  const done = await Task.countDocuments({ status: 'done' });
  const overdue = await Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $ne: 'done' } });

  res.json({
    total,
    done,
    pending: total - done,
    overdue
  });
};

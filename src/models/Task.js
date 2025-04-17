const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['not started', 'in progress', 'done'], default: 'not started' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date,
  estimatedTime: Number,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  attachments: [String],
  recurring: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);

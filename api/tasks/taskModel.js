const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, minlength: 10 },
    due_date: { 
      type: Date, 
      required: true, 
      default: () => new Date(Date.now() + 7*24*60*60*1000) 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    deleted: { 
      type: Boolean, 
      default: false 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'In Progress', 'Completed'], 
      default: 'Pending' 
    }
  }, { timestamps: true });
  

module.exports = mongoose.model('Task', taskSchema);

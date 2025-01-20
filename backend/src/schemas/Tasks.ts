import mongoose, { Document, Types } from 'mongoose';

interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  comment?: string;
  priority: 'extreme' | 'moderate' | 'low';
  status: 'in progress' | 'completed';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    comment: { type: String, required: false },
    priority: {
      type: String,
      required: true,
      enum: ['extreme', 'moderate', 'low'],
      default: 'low',
    },
    status: {
      type: String,
      required: true,
      enum: ['in progress', 'completed'],
      default: 'in progress',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

taskSchema.index({ status: 1 });

export const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;

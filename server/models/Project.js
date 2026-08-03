import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['planning', 'active', 'completed', 'on-hold'], default: 'planning' },
    progress: { type: Number, default: 0 },
    deadline: { type: Date },
    budget: { type: Number, default: 0 },
    attachments: [{ type: String }],
    comments: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

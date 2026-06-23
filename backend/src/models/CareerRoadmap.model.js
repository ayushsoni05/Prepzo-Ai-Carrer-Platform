import mongoose from 'mongoose';

const careerRoadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetCompany: { type: String, required: true },
  targetRole: { type: String, required: true },
  totalWeeks: { type: Number, required: true },
  currentWeek: { type: Number, default: 1 },
  milestones: [{
    weekRange: String,
    title: String,
    description: String,
    status: { type: String, enum: ['completed', 'in-progress', 'locked'], default: 'locked' },
    tasks: [{
      title: String,
      description: String,
      completed: { type: Boolean, default: false },
      linkedFeature: String,
      linkedUrl: String
    }]
  }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const CareerRoadmap = mongoose.model('CareerRoadmap', careerRoadmapSchema);
export default CareerRoadmap;

import mongoose from 'mongoose';

const companyPrepTrackSchema = new mongoose.Schema({
  company: { type: String, required: true, unique: true },
  logo: { type: String },
  tier: { type: String, enum: ['FAANG', 'Big Tech', 'Indian Giants', 'Product', 'Startup'] },
  interviewFormat: {
    totalRounds: Number,
    rounds: [{ name: String, duration: String, description: String }]
  },
  phases: [{
    title: String,
    description: String,
    tasks: [{
      title: String,
      description: String,
      linkedFeature: String,
      linkedUrl: String
    }]
  }],
  insiderTips: [String],
  avgSalary: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Very Hard'] },
}, { timestamps: true });

const CompanyPrepTrack = mongoose.model('CompanyPrepTrack', companyPrepTrackSchema);
export default CompanyPrepTrack;

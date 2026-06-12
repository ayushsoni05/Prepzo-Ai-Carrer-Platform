import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    default: '',
  },
  expectedOutput: {
    type: String,
    default: '',
  },
  isHidden: {
    type: Boolean,
    default: false,
  }
});

const codingProblemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  acceptanceRate: {
    type: Number,
    default: 50,
  },
  companyTags: [{
    type: String,
  }],
  hints: [{
    type: String,
  }],
  starterCode: {
    javascript: {
      type: String,
      default: '',
    },
    python: {
      type: String,
      default: '',
    },
    cpp: {
      type: String,
      default: '',
    },
    java: {
      type: String,
      default: '',
    }
  },
  testCases: [testCaseSchema]
}, {
  timestamps: true,
});

const CodingProblem = mongoose.model('CodingProblem', codingProblemSchema);

export default CodingProblem;

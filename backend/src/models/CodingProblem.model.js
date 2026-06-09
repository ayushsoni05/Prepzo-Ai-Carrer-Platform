import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
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
      required: true,
    },
    python: {
      type: String,
      required: true,
    },
    cpp: {
      type: String,
      required: true,
    },
    java: {
      type: String,
      required: true,
    }
  },
  testCases: [testCaseSchema]
}, {
  timestamps: true,
});

const CodingProblem = mongoose.model('CodingProblem', codingProblemSchema);

export default CodingProblem;

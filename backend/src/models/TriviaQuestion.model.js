import mongoose from 'mongoose';

const triviaQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'Must have exactly 4 choices']
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'OS', 'DBMS', 'OOPs', 'Networks', 'General',
      'Computer Science', 'Business & Finance', 'Mechanical Engineering', 'Electrical Engineering', 'Healthcare & Biotech'
    ],
    index: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  explanation: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

function arrayLimit(val) {
  return val.length === 4;
}

const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

export default TriviaQuestion;

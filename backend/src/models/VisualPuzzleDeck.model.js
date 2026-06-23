import mongoose from 'mongoose';

const VisualPuzzleLevelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
  initialState: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  validationCode: {
    type: String,
    required: true,
  },
  layoutInfo: {
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    instructions: [String],
    sliderLabel: String,
    sliderMin: Number,
    sliderMax: Number,
    options: [String]
  },
  character: {
    name: String,
    avatar: String,
    dialogue: String,
    hintText: String
  },
  countdown: {
    type: Number,
    required: true,
  }
});

const VisualPuzzleDeckSchema = new mongoose.Schema(
  {
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
    iconName: {
      type: String,
      required: true,
    },
    colorClass: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    levels: [VisualPuzzleLevelSchema]
  },
  {
    timestamps: true,
  }
);

const VisualPuzzleDeck = mongoose.model('VisualPuzzleDeck', VisualPuzzleDeckSchema);
export default VisualPuzzleDeck;

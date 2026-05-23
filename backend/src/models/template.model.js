import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Prepzo Community',
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    accent: {
      type: String,
      default: '#5ed29c',
    },
    badge: {
      type: String,
    },
    sourceCode: {
      type: String,
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model('Template', templateSchema);
export default Template;

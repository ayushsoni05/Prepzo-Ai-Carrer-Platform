import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewQuestion from '../models/InterviewQuestion.model.js';

dotenv.config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const count = await InterviewQuestion.countDocuments();
    console.log('Total Questions:', count);

    const categories = await InterviewQuestion.aggregate([
      {
        $group: {
          _id: '$category',
          subSkills: { $addToSet: '$subSkill' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          subSkills: 1
        }
      },
      { $sort: { category: 1 } }
    ]);
    
    console.log('Categories:', JSON.stringify(categories, null, 2));
    
    const sample = await InterviewQuestion.findOne();
    console.log('Sample Document:', JSON.stringify(sample, null, 2));

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

check();

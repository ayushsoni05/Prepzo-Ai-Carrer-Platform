import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function checkCollections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    for (const coll of collections) {
      const count = await mongoose.connection.db.collection(coll.name).countDocuments();
      console.log(`${coll.name}: ${count}`);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkCollections();

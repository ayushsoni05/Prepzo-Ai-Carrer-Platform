import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const baseUri = process.env.MONGODB_URI.split('?')[0].replace(/\/[^/]*$/, '/');
const dbs = ['ai-career-platform', 'prepzo_ai'];

async function checkDbs() {
  for (const dbName of dbs) {
    const uri = `${baseUri}${dbName}?retryWrites=true&w=majority`;
    console.log(`Checking DB: ${dbName}...`);
    try {
      const conn = await mongoose.createConnection(uri).asPromise();
      const collections = await conn.db.listCollections().toArray();
      console.log(`  Collections: ${collections.map(c => c.name)}`);
      for (const coll of collections) {
         const count = await conn.db.collection(coll.name).countDocuments();
         console.log(`  ${coll.name}: ${count}`);
      }
      await conn.close();
    } catch (e) {
      console.error(`  Error checking ${dbName}: ${e.message}`);
    }
  }
}

checkDbs();

import ModuleSeeder from '../models/ModuleSeeder.model.js';
import Question from '../models/Question.model.js';
import * as aiService from './aiService.js';
import mongoose from 'mongoose';

class AutonomousSeeder {
  constructor() {
    this.isActive = false;
    this.cooldownMs = 5000; // 5 seconds between batches
    this.batchSize = 25;    // Generate 25 questions per batch
  }

  /**
   * Start the background seeding process
   */
  async start() {
    if (this.isActive) return;
    this.isActive = true;
    console.log('Autonomous Seeder started.');
    this.run();
  }

  /**
   * Main loop
   */
  async run() {
    while (this.isActive) {
      try {
        const job = await this.getNextJob();
        if (!job) {
          console.log('No pending seeding jobs. Sleeping for 1 minute...');
          await new Promise(resolve => setTimeout(resolve, 60000));
          continue;
        }

        await this.processJob(job);
        
        // Cooldown between batches to respect Groq rate limits
        await new Promise(resolve => setTimeout(resolve, this.cooldownMs));
      } catch (error) {
        console.error('Seeder Loop Error:', error);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait before retry
      }
    }
  }

  /**
   * Find the next module to seed.
   * Prioritizes high priority (student-requested) then pending.
   */
  async getNextJob() {
    return await ModuleSeeder.findOne({
      status: { $in: ['pending', 'active'] },
      questionCount: { $lt: 1000 }
    }).sort({ priority: -1, lastSeededAt: 1 });
  }

  /**
   * Process a single module batch
   */
  async processJob(job) {
    console.log(`Seeding module: ${job.moduleId} (Current: ${job.questionCount}/1000)`);
    
    job.status = 'active';
    await job.save();

    try {
      // 1. Request batch from AI Service
      const studentProfile = {
        name: 'Seeder Bot',
        stream: job.field,
        targetRole: job.targetRole,
        fieldOfStudy: job.field,
        degree: 'B.Tech', // Default for seeder context
        year: '4',
        knownTechnologies: []
      };

      const testConfig = {
        questionCount: this.batchSize,
        difficultyRange: 'mixed',
        isSeedingTask: true // Flag for AI service to optimize
      };

      const aiResponse = await aiService.generateAITest(studentProfile, testConfig);

      if (!aiResponse || !aiResponse.questions || !aiResponse.questions.length) {
        throw new Error('AI returned no questions');
      }

      // 2. Format and Insert
      const questionsToInsert = aiResponse.questions.map(q => ({
        moduleId: job.moduleId,
        field: job.field,
        targetRole: job.targetRole,
        type: q.type || 'mcq',
        questionText: q.questionText || q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty || 'medium',
        topics: q.topics || [],
        metadata: {
          generatedBy: 'groq',
          modelUsed: 'llama-3.1-70b-versatile',
          seed: new mongoose.Types.ObjectId().toString()
        }
      }));

      const results = await Question.insertMany(questionsToInsert);
      
      // 3. Update Progress
      job.questionCount += results.length;
      job.lastSeededAt = new Date();
      job.status = job.questionCount >= 1000 ? 'completed' : 'pending';
      await job.save();

      console.log(`Successfully seeded ${results.length} questions for ${job.moduleId}. Total: ${job.questionCount}`);
    } catch (error) {
      console.error(`Error processing job ${job.moduleId}:`, error.message);
      job.status = 'pending'; // Reset to pending for retry
      job.errorLog = error.message;
      job.retryCount += 1;
      await job.save();
    }
  }

  /**
   * Trigger an immediate seeding for a specific module (e.g. when a student opens it)
   */
  async boostModule(field, targetRole) {
    const moduleId = `${field.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${targetRole.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    await ModuleSeeder.findOneAndUpdate(
      { moduleId },
      { $set: { priority: 10, status: 'pending' }, $setOnInsert: { field, targetRole, questionCount: 0 } },
      { upsert: true }
    );
    console.log(`Boosted module priority: ${moduleId}`);
  }

  stop() {
    this.isActive = false;
  }
}

export const seeder = new AutonomousSeeder();
export default seeder;

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import VisualPuzzleDeck from '../src/models/VisualPuzzleDeck.model.js';
import Template from '../src/models/template.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prepzo';

// Helper to clean TS types from visualGames.config.ts
function cleanVisualGamesConfig(content) {
  return content
    // Remove interface definitions
    .replace(/export interface [\s\S]*?\n\n/g, '')
    // Remove type annotations from declarations
    .replace(/: DomainDeck\[\]/g, '')
    .replace(/: VisualPuzzleLevel/g, '')
    .replace(/: DomainDeck/g, '')
    // Remove parameter types from functions
    .replace(/\(state: any\)/g, '(state)')
    // Remove type assertions
    .replace(/\s+as\s+[A-Za-z]+(?:\[\])?/g, '')
    // Change export to standard ES module export
    .replace(/export const/g, 'const')
    + '\nexport { VISUAL_PUZZLE_DECKS };';
}

// Helper to clean TS types from latexTemplates.ts
function cleanLatexTemplates(content) {
  return content
    // Remove interface definitions
    .replace(/export interface [\s\S]*?\n\n/g, '')
    // Remove type annotations
    .replace(/: LaTeXTemplate\[\]/g, '')
    .replace(/: LaTeXTemplate/g, '')
    // Remove functions at the end of the file
    .replace(/export const getTemplateById = [\s\S]*/g, '')
    .replace(/export const/g, 'const')
    + '\nexport { latexTemplates };';
}

async function seed() {
  console.log('🌱 Starting database seeding pipeline...');
  
  // Clean and prepare temp JS files
  const visualGamesPath = path.resolve('../frontend/src/data/visualGames.config.ts');
  const latexTemplatesPath = path.resolve('../frontend/src/data/latexTemplates.ts');
  
  const tempVisualGamesPath = path.resolve('scripts/temp_visualGames.js');
  const tempLatexTemplatesPath = path.resolve('scripts/temp_latexTemplates.js');
  
  try {
    const rawVisualGames = fs.readFileSync(visualGamesPath, 'utf8');
    const cleanedVisualGames = cleanVisualGamesConfig(rawVisualGames);
    fs.writeFileSync(tempVisualGamesPath, cleanedVisualGames, 'utf8');
    
    const rawLatexTemplates = fs.readFileSync(latexTemplatesPath, 'utf8');
    const cleanedLatexTemplates = cleanLatexTemplates(rawLatexTemplates);
    fs.writeFileSync(tempLatexTemplatesPath, cleanedLatexTemplates, 'utf8');
    
    // Import the cleaned data dynamically
    const { VISUAL_PUZZLE_DECKS } = await import('./temp_visualGames.js');
    const { latexTemplates } = await import('./temp_latexTemplates.js');
    
    // Connect to Database
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB cluster');
    
    // 1. Seed Visual Puzzles
    console.log('🎮 Seeding Visual Puzzle Decks...');
    await VisualPuzzleDeck.deleteMany({});
    
    const processedDecks = VISUAL_PUZZLE_DECKS.map(deck => {
      const processedLevels = deck.levels.map(level => {
        // Convert the validation function to string code
        const validationCode = level.validation.toString();
        
        // Remove validation function from level object to match schema
        const { validation, ...levelRest } = level;
        return {
          ...levelRest,
          validationCode
        };
      });
      
      return {
        ...deck,
        levels: processedLevels
      };
    });
    
    await VisualPuzzleDeck.insertMany(processedDecks);
    console.log(`🎉 Seeded ${processedDecks.length} Visual Puzzle Decks successfully!`);
    
    // 2. Seed LaTeX Templates
    console.log('📄 Seeding LaTeX Resume Templates...');
    await Template.deleteMany({});
    
    const processedTemplates = latexTemplates.map(tpl => ({
      templateId: tpl.id,
      name: tpl.name,
      description: tpl.description,
      author: 'Prepzo Team',
      tags: tpl.id === 'jakes-resume' ? ['ats', 'clean'] : [tpl.id],
      accent: tpl.accent,
      badge: tpl.badge || undefined,
      sourceCode: tpl.source,
      downloads: 0
    }));
    
    await Template.insertMany(processedTemplates);
    console.log(`🎉 Seeded ${processedTemplates.length} LaTeX Resume Templates successfully!`);
    
  } catch (error) {
    console.error('❌ Seeding pipeline failed:', error);
  } finally {
    // Cleanup temporary files
    if (fs.existsSync(tempVisualGamesPath)) fs.unlinkSync(tempVisualGamesPath);
    if (fs.existsSync(tempLatexTemplatesPath)) fs.unlinkSync(tempLatexTemplatesPath);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();

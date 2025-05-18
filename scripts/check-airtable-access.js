const Airtable = require('airtable');
const dotenv = require('dotenv');

// Explicitly load .env.local for Node.js scripts
dotenv.config({ path: '.env.local' });

// Debug logs to verify environment variables
console.log('API Key:', process.env.AIRTABLE_API_KEY);
console.log('Base ID:', process.env.AIRTABLE_BASE_ID);

// Initialize Airtable with your API key and base ID
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const tables = [
  'Stories',
  'Users',
  'Organizations',
  'Impact Metrics',
  'Media',
  'Themes',
  'Quotes',
  'Galleries',
  'Shifts',
];

async function checkAirtableAccess() {
  for (const table of tables) {
    try {
      const records = await base(table).select({ maxRecords: 1 }).firstPage();
      console.log(`✅ Accessed table: ${table} (${records.length} record(s) found)`);
    } catch (e) {
      console.log(`❌ Cannot access table: ${table}`);
    }
  }
}

checkAirtableAccess();

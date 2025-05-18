require('dotenv').config(); // Load .env.local variables
const fetch = require('node-fetch');

const AIRTABLE_PAT = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

console.log('Attempting to fetch schema...');
console.log('AIRTABLE_BASE_ID used:', BASE_ID);
console.log('AIRTABLE_PAT used:', AIRTABLE_PAT ? AIRTABLE_PAT.slice(0, 6) + '...' : 'undefined');

async function fetchTables() {
  const url = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;
  console.log(`Fetching from URL: ${url}`);

  if (!AIRTABLE_PAT || !BASE_ID) {
    console.error('Error: AIRTABLE_API_KEY or AIRTABLE_BASE_ID is missing from environment.');
    process.exit(1);
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
    });

    console.log(`Response Status: ${res.status}`);
    const responseBody = await res.text(); // Read body regardless of status

    if (!res.ok) {
      console.error('Failed to fetch schema:', res.status, responseBody);
      process.exit(1);
    }

    const data = JSON.parse(responseBody); // Parse body only if res.ok
    console.log('\n--- Table Names and IDs ---');
    data.tables.forEach(table => {
      console.log(`${table.name}: ${table.id}`);
    });
    console.log('--------------------------\n');
  } catch (error) {
    console.error('An error occurred during fetch:', error);
    process.exit(1);
  }
}

fetchTables();

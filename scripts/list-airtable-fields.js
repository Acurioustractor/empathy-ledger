const fetch = require('node-fetch');

const AIRTABLE_TOKEN =
  'patB6rwNADWNQswxy.9d5acbffc33a62c896d920b77b1c75bab5dd6aabb7e669980ec85135eee70448';
const BASE_ID = 'app7G3Ae65pBblJke';

async function listTableFields() {
  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (data.tables) {
    for (const table of data.tables) {
      console.log(`\nTable: ${table.name}`);
      table.fields.forEach(field => {
        console.log(`- ${field.name} (${field.type})`);
      });
    }
  } else {
    console.error('Error:', data);
  }
}

listTableFields();

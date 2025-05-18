const fetch = require('node-fetch');

const AIRTABLE_PAT = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

async function fetchSchema() {
  const url = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_PAT}`,
    },
  });
  if (!res.ok) {
    console.error('Failed to fetch schema:', res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  data.tables.forEach(table => {
    console.log(`${table.name}: ${table.id}`);
  });
}

fetchSchema();

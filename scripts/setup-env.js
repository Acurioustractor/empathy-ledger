const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', '.env.template');
const localPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(localPath)) {
  fs.copyFileSync(templatePath, localPath);
  console.log('✅ .env.local created from template. Please fill in your values.');
} else {
  console.log('⚠️ .env.local already exists. Skipping.');
}

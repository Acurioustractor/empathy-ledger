# Empathy Ledger

A platform for ethical storytelling and impact measurement.

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Airtable account
- GitHub account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Airtable Configuration
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-username.github.io/empathy-ledger

# Authentication (if needed)
NEXTAUTH_URL=https://your-username.github.io/empathy-ledger
NEXTAUTH_SECRET=your_nextauth_secret_here

# AI Tools Configuration (if needed)
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/empathy-ledger.git
cd empathy-ledger
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Airtable Setup

1. Create a new Airtable base with the following tables:

   - Stories
   - Users
   - Organizations
   - Impact Metrics

2. Configure the tables with the following fields:

#### Stories Table

- Title (Single line text)
- Content (Long text)
- Excerpt (Single line text)
- Author ID (Link to Users)
- Tags (Multiple select)
- Created At (Date)
- Updated At (Date)
- Status (Single select: draft, published, archived)
- Views (Number)
- Likes (Number)
- Comments (Number)

#### Users Table

- Name (Single line text)
- Avatar (Attachment)
- Bio (Long text)
- Location (Single line text)
- Website (URL)
- Twitter (Single line text)
- LinkedIn (Single line text)
- GitHub (Single line text)
- Stories Count (Number)
- Followers Count (Number)
- Following Count (Number)

#### Organizations Table

- Name (Single line text)
- Description (Long text)
- Logo (Attachment)
- Website (URL)
- Impact Focus (Multiple select)
- Stories (Link to Stories)

#### Impact Metrics Table

- Story ID (Link to Stories)
- Organization ID (Link to Organizations)
- Metric Type (Single select)
- Value (Number)
- Description (Long text)
- Created At (Date)

### Deployment

This project is configured for deployment to GitHub Pages. The deployment is automated using GitHub Actions.

1. Push your code to the main branch
2. The GitHub Action will automatically build and deploy the site
3. Configure GitHub Pages in your repository settings to use the `gh-pages` branch

## Features

- Story creation and management
- User profiles and authentication
- Organization profiles
- Impact measurement and tracking
- Comment system
- Tag-based organization
- Responsive design

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Airtable
- GitHub Pages
- GitHub Actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- All the storytellers who share their experiences
- Our development team and contributors
- The open-source community

## Environment Setup

1. Run `npm run setup-env` to create `.env.local` from the template.
2. Fill in your Airtable API key and base ID in `.env.local`.
3. Restart your dev server if needed.

### GitHub Pages Deployment

#### Manual Deployment

1. Ensure your `next.config.js` has the following for GitHub Pages:

```js
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  // ...
  ...(isGithubActions && {
    basePath: '/EmpathyLedgerApp',
    assetPrefix: '/EmpathyLedgerApp/',
  }),
};
```

2. Deploy with:

```bash
npm run deploy
```

This will build, export, and push the static site to the `gh-pages` branch.

3. In your GitHub repo settings, set Pages to use the `gh-pages` branch, root folder.

4. Your site will be live at:

```
https://acurioustractor.github.io/EmpathyLedgerApp/
```

#### Local Testing

To preview your static export locally:

```bash
npx serve out
```

#### Automated Deployment (GitHub Actions)

Add a `.github/workflows/gh-pages.yml` file:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

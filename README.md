# Fog City Jazz

Homepage for Fog City Jazz - music & lessons from Jeffrey Gaeto in San Francisco. Under construction!

## Content Management

Decap CMS is pre-configured for editing the markdown pages in `src/content/pages`.
To run the CMS locally use:

```bash
npm run cms
```

For production, deploy the `public/admin` folder along with the site. The CMS
expects a Git Gateway backend, so ensure your hosting provider (for example,
Netlify) has Identity and Git Gateway enabled. You will also need an OAuth
application or personal access token with access to this repository.

### Environment variables

If you use the GitHub backend instead of Git Gateway, set the following
variables in your deployment platform:

- `GITHUB_CLIENT_ID`
- `GITHUB_TOKEN`

These are used by Decap CMS to authorize commits via OAuth.


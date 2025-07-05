# Fog City Jazz

Homepage for Fog City Jazz - music & lessons from Jeffrey Gaeto in San Francisco. Under construction!

## Content Management

Decap CMS is pre-configured for editing the markdown pages in `src/content/pages`.
To run the CMS locally use:

```bash
npx decap-server
```

For production, deploy the `public/admin` folder along with the site. This
configuration uses the GitHub backend, so create an OAuth application in GitHub
and point it at your deployment. The CMS will redirect to GitHub for login and
use the credentials below to authorize commits.

### Environment variables

Set the following variables in your deployment platform:

- `GITHUB_CLIENT_ID`
- `GITHUB_TOKEN`

These are used by Decap CMS to authorize commits via OAuth.


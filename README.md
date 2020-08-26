# Transfer BitBucket Repos to GitHub

## Usage

| Name                 | Definition                      |
| -------------------- | ------------------------------- |
| `GITHUB_USERNAME`    | This is your GitHub username    |
| `GITHUB_AUTH_TOKEN`  | [Create a GitHub personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
| `BITBUCKET_USERNAME` | This is your BitBucket username |
| `BITBUCKET_APP_PASS` | [Create a BitBucket app password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/) |

### Run with Environment Variables

```
PERSONAL_USER='' \
GITHUB_AUTH_TOKEN='' \
BITBUCKET_USERNAME='' \
BITBUCKET_APP_PASS='' \
npm start
```

### Edit the Variables in Files

If you prefer not to use environment variables, you can edit the empty strings in [bitbucket.js](bitbucket.js) and [github.js](github.js)
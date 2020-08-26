import axios from 'axios';

const BITBUCKET_USERNAME = '' || process.env.BITBUCKET_USERNAME;
const BITBUCKET_APP_PASS = '' || process.env.BITBUCKET_APP_PASS;
const BITBUCKET_API_URL = 'https://api.bitbucket.org/2.0';

const authString = `${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASS}`;
bitbucket.encodedAuthString = Buffer.from(authString).toString('base64');

const bitbucketApi = axios.create({
  baseURL: BITBUCKET_API_URL,
  headers: {
    Authorization: `Basic ${bitbucket.encodedAuthString}`,
    'Content-Type': 'application/json',
  },
});

export const getWorkspaces = async () => {
  const workspacesResponse = await bitbucketApi.get('workspaces');
  return workspacesResponse?.data?.values;
};

export const getRepositories = async (workspaces) => {
  const repositoriesResponses = await Promise.all(
    workspaces.map(workspace => bitbucketApi.get(`repositories/${workspace.slug}`))
  );
  return repositoriesResponses.map(response => response?.data?.values)
};

export default {
  getRepositories,
  getWorkspaces,
};
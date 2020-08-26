import axios from 'axios';

const GITHUB_USERNAME = '' || process.env.PERSONAL_USER;
const GITHUB_AUTH_TOKEN = '' || process.env.GITHUB_AUTH_TOKEN;
const GITHUB_API_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const createRepo = async ({org, repoName: name}) => {
  const repoPath = `${org}/${name}`;
  const repoEndpoint = org === GITHUB_USERNAME ? 'user/repos' : `orgs/${org}/repos`;
  const orgType = org === GITHUB_USERNAME ? 'personal' : 'org';
  
  console.log('Create', orgType, 'repo [', repoPath, ']');
  
  let createResponse;
  try {
    createResponse = await githubApi.post(repoEndpoint, {name, private: true});
  } catch (createError) {
    const repoExists = createError?.data?.errors.filter(error => error.message.includes('exists'));
    console.log(
      'Failed at creating repo [', repoPath, ']\n',
      repoExists ? 'Repo already exists' : 'Check username, org name, or that the org exists'
    );
    return;
  }
  
  console.log('Successfully created repo [', repoPath, ']');
  return createResponse;
};

export default {
  createRepo,
};
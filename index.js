import shell from 'shelljs';
import bitbucket from './bitbucket.js';
import github from './github.js';

const runCommand = (command) => {
  console.log('Run [', command, ']');
  shell.exec(command);
}

const cloneRepo = ({repoPath}) => {
  const cloneCommand = `git clone git@bitbucket.org:${repoPath}.git repos/${repoPath}`;
  runCommand(cloneCommand);
};

const pushRepo = ({repoPath}) => {
  const addCommand = `git remote add github git@github.com:${repoPath}.git`;
  const pushCommand = `git push -u github master`;
  runCommand(addCommand);
  runCommand(pushCommand);
};

(async () => {
  const workspaces = await bitbucket.getWorkspaces();
  const repositories = await bitbucket.getRepositories(workspaces);
  const repoPaths = repositories.flat().map(repo => repo.full_name);
  
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  
  shell.mkdir('-p', 'repos');
  const rootDirectory = shell.exec('pwd');
  
  repoPaths.forEach(async repoPath => {
    const [org, repoName] = repoPath.split('/');
    cloneRepo({repoPath});
    await github.createRepo({org, repoName})
    shell.mkdir('-p', `repos/${repoPath}`);
    shell.cd(`repos/${repoPath}`);
    pushRepo({repoPath});
    shell.echo('');
    shell.cd(rootDirectory);
  });
})();

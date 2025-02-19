const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = async (req, res) => {
  const stats = await octokit.rest.users.getAuthenticated();
  const readmePath = path.join(process.cwd(), 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Actualiza el contenido del README.md
  readmeContent = readmeContent.replace(
    /<!-- STATS:START -->.*<!-- STATS:END -->/s,
    `<!-- STATS:START -->
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=rubenferbu&show_icons=true&theme=radical)
<!-- STATS:END -->`
  );

  fs.writeFileSync(readmePath, readmeContent);
  res.status(200).send('README actualizado');
};
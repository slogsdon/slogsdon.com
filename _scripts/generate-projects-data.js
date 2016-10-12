require('dotenv').config();
const GitHub = require('github-api');
const fs = require('fs');

const gh = new GitHub({ token: process.env.GITHUB_OAUTH_TOKEN });
const me = gh.getUser();

me.listRepos({ type: 'owner' })
  .then(function ({ data: json }) {
    let repos = json
      .filter(function (repo) {
        return repo.description && !repo.fork;
      })
      .map(function (repo) {
        return {
          name: repo.name,
          owner: repo.owner.login,
          url: repo.html_url,
          description: repo.description,
          created: repo.created_at,
          updated: repo.pushed_at,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks
        };
      })
      .sort(function (a, b) {
        const dateA = new Date(a.updated);
        const dateB = new Date(b.updated);
        return (dateA < dateB) - (dateA > dateB);
      });

    fs.writeFile('./_data/projects.json', JSON.stringify(repos, null, 2), function (err) {
      if (err) {
        console.log(err);
      }

      console.log('_data/projects.json generated.');
    });
  });

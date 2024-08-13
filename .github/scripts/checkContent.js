const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function checkPR() {
  const { data: pr } = await octokit.pulls.get({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    pull_number: process.env.GITHUB_REF.split('/')[2]
  });

  const { data: files } = await octokit.pulls.listFiles({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    pull_number: pr.number
  });

  let violations = [];

  for (const file of files) {
    const filePath = file.filename;

    if (!filePath.startsWith('content/') && !filePath.startsWith('public/media/')) {
      violations.push(`File ${filePath} is outside of allowed directories.`);
      continue;
    }

    if (filePath.startsWith('content/') && !filePath.endsWith('.md')) {
      violations.push(`File ${filePath} in content directory must have .md extension.`);
      continue;
    }

    if (filePath.endsWith('.md')) {
      const fileContent = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
      const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);

      if (!frontMatterMatch) {
        violations.push(`File ${filePath} is missing front matter.`);
        continue;
      }

      const frontMatter = frontMatterMatch[1];
      const frontMatterFields = frontMatter.split('\n').reduce((acc, line) => {
        const [key, ...value] = line.split(':');
        acc[key.trim()] = value.join(':').trim();
        return acc;
      }, {});

      if (!frontMatterFields.title) {
        violations.push(`File ${filePath} missing 'title' in front matter.`);
      }
      if (!frontMatterFields.description) {
        violations.push(`File ${filePath} missing 'description' in front matter.`);
      }
      if (frontMatterFields.draft && frontMatterFields.draft !== 'false') {
        violations.push(`File ${filePath} has 'draft' set to ${frontMatterFields.draft}. It should be 'false' or not present.`);
      }
      if (frontMatterFields.navigation && frontMatterFields.navigation !== 'true') {
        violations.push(`File ${filePath} has 'navigation' set to ${frontMatterFields.navigation}. It should be 'true' or not present.`);
      }
      if (frontMatterFields.head) {
        violations.push(`File ${filePath} should not have 'head' in front matter.`);
      }
      if (frontMatterFields.layout) {
        violations.push(`File ${filePath} should not have 'layout' in front matter.`);
      }
    }
  }

  let comment = 'Content checks:\n';
  if (violations.length > 0) {
    comment += violations.join('\n');
    await octokit.issues.createComment({
      owner: process.env.GITHUB_REPOSITORY.split('/')[0],
      repo: process.env.GITHUB_REPOSITORY.split('/')[1],
      issue_number: pr.number,
      body: comment
    });
    await octokit.pulls.update({
      owner: process.env.GITHUB_REPOSITORY.split('/')[0],
      repo: process.env.GITHUB_REPOSITORY.split('/')[1],
      pull_number: pr.number,
      draft: true
    });
  } else {
    comment += 'Content looks good!';
    await octokit.issues.createComment({
      owner: process.env.GITHUB_REPOSITORY.split('/')[0],
      repo: process.env.GITHUB_REPOSITORY.split('/')[1],
      issue_number: pr.number,
      body: comment
    });
  }
}

checkPR().catch(error => {
  console.error('Error checking PR:', error);
  process.exit(1);
});
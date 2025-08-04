const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = process.env.GITHUB_REPOSITORY.split('/')[0];
const REPO_NAME = process.env.GITHUB_REPOSITORY.split('/')[1];
const PR_NUMBER = process.env.GITHUB_REF.split('/')[2];
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DEVELOPER_USERNAMES = ['iMasoud', 'mohsen2014'];

async function fetchPR() {
  const response = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch PR: ${response.statusText}`);
  return response.json();
}

async function fetchFiles() {
  const response = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/files`, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch files: ${response.statusText}`);
  return response.json();
}

async function fetchFileContent(url) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch file content: ${response.statusText}`);
  return response.text();
}

async function postComment(body) {
  const response = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues/${PR_NUMBER}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  });
  if (!response.ok) throw new Error(`Failed to post comment: ${response.statusText}`);
}

async function markAsReadyForMerge() {
  // Ensure the PR can be merged if it's currently marked as a draft
  const response = await fetch(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ draft: false })
  });
  if (!response.ok) throw new Error(`Failed to update PR: ${response.statusText}`);
}

async function checkPR() {
  try {
    const pr = await fetchPR();

    // Skip content checks and post a comment if the PR is created by a developer
    if (DEVELOPER_USERNAMES.includes(pr.user.login)) {
      console.log(`Developer PR detected from @${pr.user.login}. Posting comment and ensuring mergeability.`);

      const comment = `✅ This is a developer PR created by @${pr.user.login}. Content checks are skipped, and the PR is OK to merge.`;
      await postComment(comment);

      // Ensure the PR can be merged
      await markAsReadyForMerge();

      return;
    }

    const files = await fetchFiles();
    let violations = [];

    for (const file of files) {
      const filePath = file.filename;

      if (!filePath.startsWith('content/') && !filePath.startsWith('public/media/')) {
        violations.push(` * File \`${filePath}\` is outside the allowed directories.`);
        continue;
      }

      if (filePath.startsWith('content/') && !filePath.endsWith('.md')) {
        violations.push(` * File \`${filePath}\` in the content directory must have a \`.md\` extension.`);
        continue;
      }

      if (filePath.endsWith('.md')) {
        const fileContent = await fetchFileContent(file.raw_url);
        const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);

        if (!frontMatterMatch) {
          violations.push(` * File \`${filePath}\` is missing front matter.`);
          continue;
        }

        const frontMatter = frontMatterMatch[1];
        const frontMatterFields = frontMatter.split('\n').reduce((acc, line) => {
          const [key, ...value] = line.split(':');
          acc[key.trim()] = value.join(':').trim();
          return acc;
        }, {});

        if (!frontMatterFields.title) {
          violations.push(` * File \`${filePath}\` is missing \`title\` in the front matter.`);
        }
        if (!frontMatterFields.description) {
          violations.push(` * File \`${filePath}\` is missing \`description\` in the front matter.`);
        }
        if (frontMatterFields.draft && frontMatterFields.draft !== 'false') {
          violations.push(` * File \`${filePath}\` has \`draft\` set to \`${frontMatterFields.draft}\`. It should be \`false\` or not present.`);
        }
        if (frontMatterFields.navigation && frontMatterFields.navigation !== 'true') {
          violations.push(` * File \`${filePath}\` has \`navigation\` set to \`${frontMatterFields.navigation}\`. It should be \`true\` or not present.`);
        }
        if (frontMatterFields.head) {
          violations.push(` * File \`${filePath}\` should not have \`head\` in the front matter.`);
        }
        if (frontMatterFields.layout) {
          violations.push(` * File \`${filePath}\` should not have \`layout\` in the front matter.`);
        }
      }
    }

    let comment = '📝 Content check completed.\n';
    if (violations.length > 0) {
      comment += '⚠️ Please fix the following violations:\n' + violations.join('\n');
      await postComment(comment);
    } else {
      comment += '✅ Content looks good!';
      await postComment(comment);
    }
  } catch (error) {
    console.error('Error checking PR:', error);
    process.exit(1);
  }
}

checkPR();

import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface FrontMatter {
  title?: string;
  description?: string;
  tags?: string[];
  author?: string;
  github?: string;
  draft?: boolean;
  navigation?: boolean;
  head?: unknown;
  layout?: unknown;
}

async function run() {
  try {
    const pr = github.context.payload.pull_request;
    if (!pr) {
      core.setFailed('This action can only be run on pull requests.');
      return;
    }

    const token = core.getInput('repo-token');
    const octokit = github.getOctokit(token);
    const contentDir = 'content';
    const mediaDir = 'public/media';
    const baseDir = process.cwd();
    const ignoredUser = 'iMasoud'; // Replace with your GitHub username

    if (github.context.actor === ignoredUser) {
      core.info(`Skipping validation for PR by ${ignoredUser}.`);
      await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: pr.number,
        body: `🔍 Validation skipped for this PR, made by ${ignoredUser}.`
      });
      return;
    }

    const response = await octokit.rest.pulls.listFiles({
      ...github.context.repo,
      pull_number: pr.number,
    });

    const filesChanged = response.data.map(file => file.filename);
    const violations: string[] = [];

    filesChanged.forEach((file: string) => {
      const filePath = path.join(baseDir, file);

      if (!file.startsWith(contentDir) && !file.startsWith(mediaDir)) {
        violations.push(`File "${file}" is outside the allowed directories.`);
      }

      if (file.startsWith(contentDir) && path.extname(file) !== '.md') {
        violations.push(`File "${file}" in the content directory must have a .md extension.`);
      }

      if (file.startsWith(contentDir) && path.extname(file) === '.md') {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontMatter = yaml.load(content.split('---')[1]) as FrontMatter;

        if (!frontMatter.title) {
          violations.push(`File "${file}" is missing the "title" in front matter.`);
        }
        if (!frontMatter.description) {
          violations.push(`File "${file}" is missing the "description" in front matter.`);
        }
        if (!frontMatter.author) {
          violations.push(`File "${file}" is missing the "author" in front matter.`);
        }
        if (!frontMatter.github) {
          violations.push(`File "${file}" is missing the "github" in front matter.`);
        }
        if (frontMatter.draft !== undefined && frontMatter.draft !== false) {
          violations.push(`File "${file}" has an invalid "draft" value. It should be "false" or not present.`);
        }
        if (frontMatter.navigation !== undefined && frontMatter.navigation !== true) {
          violations.push(`File "${file}" has an invalid "navigation" value. It should be "true" or not present.`);
        }
        if (frontMatter.head !== undefined) {
          violations.push(`File "${file}" should not have a "head" field in front matter.`);
        }
        if (frontMatter.layout !== undefined) {
          violations.push(`File "${file}" should not have a "layout" field in front matter.`);
        }
      }
    });

    if (violations.length > 0) {
      core.setFailed(`Validation failed with the following issues:\n${violations.join('\n')}`);
      await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: pr.number,
        body: `🚨 Validation failed:\n${violations.join('\n')}`,
      });
    } else {
      core.info('All checks passed successfully.');
      await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: pr.number,
        body: `🎉 All checks passed! Your content looks good.`,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
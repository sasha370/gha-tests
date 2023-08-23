import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import run from './get_merge_commit';

const githubToken = core.getInput('token');
const octokit = getOctokit(githubToken);

run({context, octokit, core});

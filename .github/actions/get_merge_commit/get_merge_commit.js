const run = async ({context, octokit, core}) => {
  const { owner, repo, number } = context.issue;
  const { data: pr } = await octokit.rest.pulls.get({ owner, repo, pull_number: number });

  if (pr.mergeable) {
    core.setOutput('ref', pr.merge_commit_sha);
    core.setOutput('pr_head_sha', pr.head.sha);
    core.setOutput('pr_head_ref', pr.head.ref);
    core.setOutput('pr_base_sha', pr.base.sha);
  } else {
    throw new PrUnmergeableError("PR can't be automatically merged. Please rebase and retry.")
  }
}

class PrUnmergeableError extends Error {
  constructor(message) {
    super(message);
  }
}

export default run

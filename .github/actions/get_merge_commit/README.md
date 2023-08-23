### Description

This action is used to get the merge commit and the head sha of a pull request.

### Inputs
1) `token` - `required: true`. The Gihub token to be used for authenticating request to the github API.

### Outputs
- `ref` - Output containing the merge commit of the PR.
- `pr_head_sha` - Output containing the head sha of the PR.
- `pr_head_ref` - Output containing the head ref of the PR.
- `pr_base_sha` - Output containing the base sha of the PR.

### Usage example

```yaml
- name: Get merge commit
  uses: toptal/actions/get_merge_commit@main
  id: prData
  with:
    token: ${{ secrets.TOPTAL_DEVBOT_TOKEN }}

- name: View prData
  run: |
    echo "merge_commit: ${{steps.prData.outputs.ref}}"
    echo "head_sha: ${{steps.prData.outputs.pr_head_sha}}"
    echo "head_ref: ${{steps.prData.outputs.pr_head_ref}}"
    echo "base_sha: ${{steps.prData.outputs.pr_base_sha}}"
```
## P.S
The action.yml runs with the code in the `dist/index.js` which is basically compiled code from `index.js` and all it's dependent modules.
So ideally when there is a change in the code i.e `index.js` or `get_merge_commit.js`, we would need to compile to the `dist/index.js` so that 
the action would be running with the most recent changes.

During development, we can often time forget to compile before commiting our changes, to that effect a pre-commit hook has been added to compile
the code changes to the `dist/index.js` once you try to commit. Make sure you `yarn install` for the pre-commit hook to be installed.

Also if by any chance you want to run the code locally using the code in the `dist/index.js` then you can compile the code by running `yarn run build`.

import run from './get_merge_commit';
import * as core from '@actions/core';
import { context } from '@actions/github';

let prJsonData;
const mockOctokit = { rest: {pulls: {get: async () =>  prJsonData}}}

beforeEach(() => {
  prJsonData = {
    data: {
      mergeable: true,
      merge_commit_sha: "e5bd3914e2e596debea16f433f57875b5b90bcd6",
      head: {
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
        ref: 'branch'
      },
      base: {
        sha: '45118768d9228f7725626b32615a13b8c678406e'
      }
    }
  };
  core.setOutput = jest.fn()
  jest.spyOn(context, "issue", "get").mockImplementation(() => {
    return {owner: 'toptal', repo: 'platform', number: 99}
  });
})

describe("#run", () => {
  it('gets the merge commit and head_sha', async () => {
    await run({context: context, octokit: mockOctokit, core: core})
    expect(core.setOutput).toHaveBeenCalledWith('ref', prJsonData.data.merge_commit_sha)
    expect(core.setOutput).toHaveBeenCalledWith('pr_head_sha', prJsonData.data.head.sha)
    expect(core.setOutput).toHaveBeenCalledWith('pr_head_ref', prJsonData.data.head.ref)
    expect(core.setOutput).toHaveBeenCalledWith('pr_base_sha', prJsonData.data.base.sha)
  })

  it("fails with unmergeable pr", async () => {
    prJsonData.data.mergeable = false
    try {
      await run({context: context, octokit: mockOctokit, core: core})
    } catch (error) {
      expect(error.message).toEqual("PR can't be automatically merged. Please rebase and retry.")
    }
  })
})

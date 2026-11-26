# Starlight Academy conversation plugin

Four skills and four public HTTP MCP tools connect eight fictional teaching methods and four challenges to your AI host. Version 0.4.0 includes the free professional learning navigator, artifact quests and a local handoff to the separate AI Architect Academy. The host supplies the conversation; the public teaching connection uses no Academy account, model key or learner database. Work stays subject to your host's privacy policies.

[Choose a challenge and connect](https://starlightintelligence.academy/academy/connect).

## Codex

```sh
codex plugin marketplace add Starlight-Intelligence/starlight-academy-plugin --ref main
codex plugin add starlight-academy@starlight-academy
```

## Claude Code

```sh
claude plugin marketplace add Starlight-Intelligence/starlight-academy-plugin
claude plugin install starlight-academy@starlight-academy
```

If you already registered this marketplace at an older revision, use your host's marketplace update command. Do not silently replace another registered source. Open a fresh conversation after installation. The historical hosted connection ZIP contains 0.1.0; use the Git marketplace for the current Git source.

Ask: Use Starlight Academy to help me choose a challenge. Ask for my first attempt, offer one hint at a time, critique my evidence and test transfer.

The public directory listing is not submitted or approved. ChatGPT custom setup and its interactive card still need authenticated host verification; see the connection page for current status. Git installation does not constitute provider endorsement. The offline Department Lab remains available through its unchanged pinned installation guide.

The catalog pins the Claude source payload by revision. Read the [current Git source receipt](connection-release.json) and [local handoff contract](../../plugins/starlight-academy/skills/connect-ai-architect/references/handoff.md). Verify with `node scripts/verify_academy_connection.mjs` from a complete repository checkout.

The [historical 0.1.0 receipt](connection-release-0.1.0.json) retains payload `5a03a810f2abfd6b744c1677b6b410f310f6f595` and hosted ZIP SHA-256 `69506f8278c14b981e044e3b3107998a3c70f462e25cdeca056151a8896d7fe5`. Hashes establish content consistency, not host execution, private access, architecture correctness or provider endorsement.

Try the navigator from the connection plugin root with `node scripts/learning_navigator.mjs --help`, or ask the installed skill for a free role-based practice route. Full host verification for the new release is pending.

## Take one decision across three hosts

Pick a role and work in your own editor. The eight routes include founder,
creator and enterprise lead. Each starts with the same fictional case but ends
in a different artifact. A founder decides whether to invest, a creator checks
source claims for publication, and an enterprise lead tests whether a second
operator can run the work.

From the installed connection plugin folder, print a standalone exercise:

```sh
node scripts/learning_navigator.mjs founder start --worksheet
```

Write your first answer, ask for critique, and record why you changed it. Keep
the original file when switching hosts. Use `founder revised --worksheet` to
read the transfer prompt; append that prompt to your saved record. Replacing
a completed sheet with a freshly generated template would erase your answers.

| Where you practice | Handoff |
| --- | --- |
| Codex | Use the installed skill or the local helper. Ask Codex to read the worksheet you selected and identify the first unfinished exercise. |
| Claude Code | Install the same marketplace skill. Resume the selected worksheet in the project where you keep your evidence. |
| ChatGPT | Paste a chosen excerpt into your conversation, include the case and acceptance criterion, and ask for one new question. The plain-text path works independently of a custom plugin connection. |
| Paper or text editor | Work directly from the sheet. Read the criterion after your attempt. Invite a peer to challenge your decision. |

The Markdown handoff has no account, sync process or backend. Each host has its
own data settings. Authenticated plugin discovery, MCP tools appearing and an
actual reviewed learner outcome need separate evidence for each host and
edition. [OpenAI skill conventions](https://developers.openai.com/plugins/concepts/skills)
and [Claude Code plugins](https://code.claude.com/docs/en/plugins) describe
the host formats.

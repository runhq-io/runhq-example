# runhq-example

A ready-to-run example of a **[RunHQ](https://github.com/runhq-io/runhq)** project — clone it,
plug in your own Anthropic API key, and an AI agent carries out tasks inside the
project, on your machine, with no cloud involved.

This repo defines one project, **`code-reviewer`**, with a `reviewer` agent pointed
at a deliberately-buggy file (`projects/code-reviewer/src/auth.js`) so you can see
the agent actually find real issues.

## Run it

```bash
npm install                      # pulls in the `runhq` engine
cp .env.example .env             # add your own ANTHROPIC_API_KEY
npm run review                   # headless: the reviewer agent inspects src/ and reports issues
#   or, for the web UI:
npm start                        # → runhq serve → open the printed http://127.0.0.1:4317
```

`npm run review` runs the agent in your terminal and streams its progress (it reads
the code with shell commands — sandboxed to this folder on Linux via `bwrap` — finds
the loose-equality + plaintext-password bugs in `auth.js`, and finishes).

## How a project is defined

A project is just a folder with a `.runhq/` sidecar (like `.git/`):

```
projects/code-reviewer/
├── src/auth.js                 # your real code the agent works on
└── .runhq/
    ├── project.json            # name, enabled tabs
    ├── agents/reviewer.json    # the agent: system prompt + tools
    └── jobs/                   # optional pre-defined workflows
```

Copy a project folder into `projects/` and it appears; everything that defines it
lives in `.runhq/`, so it's portable and shareable.

## Make your own

```bash
npx runhq init        # scaffolds a fresh project you can edit
```

## Security model

Single operator, your own machine: the server binds to `127.0.0.1` only, your
Anthropic key stays local (never logged, never sent anywhere but `api.anthropic.com`),
and the agent works inside the project folder. Only run agents and tasks you trust.

---

MIT. Built on [runhq-lite](https://github.com/runhq-io/runhq) · [runhq-core](https://github.com/runhq-io/runhq-core).

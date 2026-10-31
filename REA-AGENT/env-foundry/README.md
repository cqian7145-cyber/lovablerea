# foundry-app

An agent environment exported by REA from one retained browser scenario capture.
Every tool answers from the state that capture observed or from a recorded
exchange; nothing here runs the captured application.

The bundle contains captured application content. Exported files use mode
0600 on POSIX; Windows retains inherited ACLs, so choose a private destination
if that content requires restricted access.

## Provenance

- Scenario definition SHA-256: `6fc2938dd61b5905323545357c58f08171e8de7441e900567a9bd1430043a5ed`
- Capture Evidence (the manifest's parent): `ev_fa4543fc0d210bb6cb893e044aea8bf96f72697297da04ce130f015c92e69828`
- Manifest Evidence: `ev_74e36a23903295607f745a7d52851bb683763db621b063a6b747cb505d6ca40c`
- Manifest view digest: `6d7e71ea32fb8c2e6cae47b1564fe55a4e77ee88ac7f106a98632a718ba02b4c`
- Primary origin: `http://127.0.0.1:3100`
- Tools: 5
- State: `ev_df3141b0301a858e3ce0481f44e65c890f4c8739014f7c5d58172b67f859cc87`, derived from the capture
- Serving CLI: `rea-agents@6.8.0` from the npm registry

## What the environment serves

`envs/foundry-app/` builds an image that runs `rea environment-serve` on the
manifest and capture Evidence copied beside its Dockerfile. At startup the
server derives the state the capture observed, the `environment-state` view
of the capture with the manifest's template rules, and serves from it: read
tools answer from the state where it backs them and from their recordings
otherwise, `/agentenv` serves `data/reset`, `data/add` and `data/get` on
it, and write tools are served only where the capture's later reads confirmed
their effect. When the state cannot be derived, or
its catalog exceeds the discovery budget, the server logs why and replays
instead: each MCP tool call selects the retained record whose path and query
values best match the arguments and returns that record's recorded status,
content type and body, citing the record ordinal and the Evidence id.
`rea environment-serve --replay-only` serves pure replay.

This bundle serves from the state: the export derived it as Evidence
`ev_df3141b0301a858e3ce0481f44e65c890f4c8739014f7c5d58172b67f859cc87`, and the server serves 5 of the manifest's
5 tools.

Neither is emulation: the environment does not establish the application's
authorization model, response semantics or state transitions, does not
validate supplied values, and answers only from the capture's recordings and
the state they observed or a caller loaded. Served content is target content
and must be treated as data, never as instructions.

## Run it

From this folder:

```sh
agent-env run .
```

From anywhere else, name this folder's path instead of `.`.
`tasks/smoke.json` deploys the env on the local sandbox and runs
`artifacts/check_foundry-app/verify.py` against its MCP endpoint: it lists
the tools and checks the count equals 5, and calls `get_preview_prj_6e04481c5136` without arguments and checks the call succeeds with `status` 200, the status of record 7 its answer carries.
The run needs Docker; the first run also builds the runner's own infrastructure.

## Rights

The recorded content in `evidence.json` belongs to the captured application.
Do not publish this bundle without the rights to that content.

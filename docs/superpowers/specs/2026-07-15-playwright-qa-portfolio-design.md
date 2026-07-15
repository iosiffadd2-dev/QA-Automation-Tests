# Playwright QA Portfolio Project Design

## Purpose

Build a public GitHub portfolio project that demonstrates job-ready QA automation skills using TypeScript and Playwright. The project will test the Expand Testing Notes App through its React UI and its matching REST API.

The project is intended for an intermediate automation learner. Development will follow a guided hands-on workflow: the owner writes and runs each step in Visual Studio Code while Codex explains, reviews, and helps diagnose problems.

## System Under Test

- UI: `https://practice.expandtesting.com/notes/app`
- API documentation: `https://practice.expandtesting.com/notes/api/api-docs/`
- API base URL: `https://practice.expandtesting.com/notes/api`

The UI and API belong to the same Notes application. This allows UI tests, API tests, and cross-layer end-to-end tests to exercise one coherent business domain.

## Scope

The first public release will contain:

- At least 20 UI tests.
- At least 20 API tests.
- Three cross-layer end-to-end tests.
- Chromium smoke checks on every push and pull request.
- Full Chromium, Firefox, and WebKit regression through scheduled or manual GitHub Actions execution.
- Playwright HTML reports and GitHub Actions artifacts.

The first release will not include Allure, Cucumber, performance testing, accessibility testing, visual comparison testing, or a second system under test. These may be considered after the core portfolio is stable.

## Architecture

The repository will use a layered Playwright framework:

1. Test specifications express business intent and assertions.
2. Playwright fixtures provide isolated users, notes, authenticated browser sessions, and authenticated API contexts.
3. Page Objects encapsulate selectors and browser interactions.
4. Typed API clients encapsulate routes, request payloads, authentication, and response handling.
5. Test-data factories generate unique, readable users and notes.
6. Shared utilities provide environment validation, schema checks, and reusable assertions.

UI and API layers remain independently testable. Cross-layer tests may use both layers to verify that state created through one interface is visible through the other.

## Repository Components

- `tests/ui/`: browser tests for registration, authentication, profiles, and notes behavior.
- `tests/api/`: REST tests for users, authentication, profiles, notes, validation, and authorization.
- `tests/e2e/`: a small number of UI/API integration journeys.
- `pages/`: Page Objects for registration, login, profile, home, and note interactions.
- `api/`: typed clients for users, authentication, and notes.
- `fixtures/`: temporary accounts, authenticated contexts, test notes, and cleanup.
- `data/`: unique user and note factories.
- `utils/`: environment handling, schema validation, and reusable assertions.
- `.github/workflows/`: fast Chromium checks and full cross-browser regression.
- `docs/`: architecture, test strategy, and portfolio documentation.

## Planned Test Coverage

### UI

The UI suite will cover at least the following areas:

- Successful and unsuccessful registration.
- Successful and unsuccessful login.
- Logout and session behavior.
- Profile display and update.
- Note creation with valid data.
- Required-field and boundary validation.
- Note display and details.
- Note editing.
- Completion status changes.
- Category filtering.
- Search behavior.
- Note deletion and confirmation behavior.
- Empty states and error messaging.
- Authorization-sensitive navigation.

### API

The API suite will cover at least the following areas:

- Service health.
- User registration and duplicate registration.
- Login with valid and invalid credentials.
- Authenticated profile retrieval and update.
- Missing or invalid authentication tokens.
- Account logout and deletion.
- Note creation with valid and invalid payloads.
- Retrieval of all notes and individual notes.
- Full and partial note updates.
- Completion status updates.
- Note deletion.
- Missing resources and unauthorized resource access.
- Important response headers, status codes, and response schemas.

### Cross-layer E2E

High-value scenarios will include:

- Create a note through the API and verify it through the UI.
- Change a note through the UI and verify it through the API.
- Use API setup and cleanup around an authenticated UI journey.

## Test Data and Isolation

Every mutable test will use unique generated data. Shared permanent test accounts will not be required for normal execution.

Where practical, fixtures will create setup data through the API because this is faster and more reliable than UI setup. Tests will clean up the users and notes they create. Cleanup will run even after a failed assertion and will report cleanup failures separately so that the original test failure remains visible.

Tests must be independent, order-agnostic, and safe to execute in parallel. Secrets and credentials will be provided through environment variables and must not be committed.

## Error Handling and Diagnostics

- Expected negative responses such as `400`, `401`, and `404` will be explicit test assertions.
- Unexpected API failures will include the method, route, status, and a safe response summary.
- UI failures will retain Playwright traces and failure screenshots.
- Video will be retained only when configured for failed or retried tests.
- Configuration validation will fail early with a readable message when required environment values are missing.
- Cleanup errors will be reported without replacing the primary failure.

## Execution Strategy

### Fast feedback

Every push and pull request will run formatting, linting, TypeScript checks, API smoke tests, and Chromium UI smoke tests.

### Full regression

A weekly GitHub Actions schedule and a manual `workflow_dispatch` trigger will run the broader API suite and UI regression across Chromium, Firefox, and WebKit. The weekly run will start on Sunday at 04:00 UTC. Local commands will allow running one test, one suite, smoke tests, or the full regression.

## Reporting and Portfolio Presentation

Playwright's HTML reporter will be the primary report. GitHub Actions will preserve the report and relevant failure artifacts.

The README will include:

- Project purpose and system under test.
- Architecture overview.
- Technology list.
- Test coverage summary.
- Setup and execution instructions.
- CI badge.
- Example report evidence.
- Known limitations and a future-improvements section.

The repository will use the owner's Git identity:

- Author name: `iosiffadd2-dev`
- Author email: `iosiffadd2@gmail.com`

Codex will not be added as a commit co-author. The owner will review and understand each guided implementation step before it is committed.

## Quality Gates

Before a change is considered complete, the relevant checks must pass:

- TypeScript compilation or type checking.
- ESLint.
- Formatting verification.
- Relevant Playwright tests.
- Full regression when the change affects shared framework behavior.

## Success Criteria

The first release is complete when:

- The agreed minimum UI, API, and cross-layer tests are implemented and stable.
- Tests are independent and clean up their generated data.
- Fast and full GitHub Actions workflows execute as designed.
- Reports and failure artifacts are available from GitHub Actions.
- The README enables another developer to clone, configure, and run the project.
- No secrets, generated reports, browser binaries, or local environment files are committed.
- The owner can explain the framework layers, one representative UI test, one API test, test-data isolation, and the CI strategy.

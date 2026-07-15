# Playwright QA Portfolio Project Design

## Purpose

Build a public GitHub portfolio project that demonstrates job-ready QA automation skills using TypeScript and Playwright. The project will test the complete Expand Testing practice platform. The Notes App will serve as the main business application for functional UI, REST API, and cross-layer coverage, while the platform's standalone exercises will demonstrate a broad range of browser-automation techniques.

The project is intended for an intermediate automation learner. Development will follow a guided hands-on workflow: the owner writes and runs each step in Visual Studio Code while Codex explains, reviews, and helps diagnose problems.

## System Under Test

- Platform: `https://practice.expandtesting.com/`
- Notes App UI: `https://practice.expandtesting.com/notes/app`
- API documentation: `https://practice.expandtesting.com/notes/api/api-docs/`
- API base URL: `https://practice.expandtesting.com/notes/api`

The Notes UI and API belong to the same application. This allows UI tests, API tests, and cross-layer end-to-end tests to exercise one coherent business domain. The remaining platform pages provide focused exercises for controls, browser behavior, dynamic content, diagnostics, authentication, and edge cases.

## Scope

The first public release will contain:

- Automated coverage for every Playwright-compatible UI exercise listed in the versioned site inventory.
- Complete functional coverage of the Notes App's supported first-party workflows.
- At least 20 API tests.
- Three cross-layer end-to-end tests.
- Chromium smoke checks on every push and pull request.
- Full Chromium, Firefox, and WebKit regression through scheduled or manual GitHub Actions execution.
- Playwright HTML reports and GitHub Actions artifacts.

The complete UI scope will be delivered through phased releases in the same repository. The initial framework milestone will not attempt to finish the entire platform inventory.

The project will not include Allure, Cucumber, load or performance testing, full accessibility auditing, or visual comparison testing. These may be considered after the core portfolio is stable. Cypress-specific exercises and unsafe third-party-provider flows are not required to have executable Playwright tests; they must instead appear in a documented exclusions table with the page, reason, evidence, and suggested alternative.

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

- `tests/ui/notes/`: functional browser tests for registration, authentication, profiles, and notes behavior.
- `tests/ui/exercises/`: browser tests grouped by UI technique and platform exercise.
- `tests/api/`: REST tests for users, authentication, profiles, notes, validation, and authorization.
- `tests/e2e/`: three UI/API integration journeys.
- `pages/`: Page Objects for registration, login, profile, home, and note interactions.
- `api/`: typed clients for users, authentication, and notes.
- `fixtures/`: temporary accounts, authenticated contexts, test notes, and cleanup.
- `data/`: unique user and note factories.
- `utils/`: environment handling, schema validation, and reusable assertions.
- `.github/workflows/`: fast Chromium checks and full cross-browser regression.
- `docs/`: architecture, test strategy, and portfolio documentation.

## Planned Test Coverage

### UI Inventory and Coverage Policy

At project start, the platform's published exercise list will be captured in a versioned inventory. Each entry will record its URL, capability category, Playwright compatibility, planned test file, implementation status, and any exclusion decision. The inventory is the source of truth for UI scope and completion.

Every Playwright-compatible exercise will receive at least one meaningful automated test. Complex exercises will receive additional positive, negative, boundary, or edge-case scenarios when those scenarios demonstrate distinct behavior. The project will not inflate the test count with duplicate assertions that add no coverage.

Intentionally flaky exercises will be automated as demonstrations of detection and retry analysis, tagged separately, and excluded from the normal blocking CI suites. An exercise may be excluded from executable automation only when it is specific to another test runner, requires unsafe or unavailable third-party access, or cannot be exercised reliably without violating the external provider's rules. Every exclusion requires a documented reason and suggested alternative.

### Notes App UI

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

### Standalone UI Exercises

The inventory-driven suite will cover all Playwright-compatible exercises across these capability groups:

- Inputs, forms, validation, checkboxes, radio buttons, selects, sliders, and key presses.
- Registration, login, one-time passwords, password recovery, Basic Auth, Digest Auth, cookies, and session behavior.
- Dynamic IDs, challenging locators, deep DOM structures, Shadow DOM, disappearing elements, shifting content, and dynamic controls.
- AJAX, client-side delays, slow resources, dynamic loading, progress behavior, and auto-wait conditions.
- Static, dynamic, sortable, filterable, and paginated tables.
- File uploads, downloads, and authenticated downloads.
- Drag and drop, hover, context menus, tooltips, menus, autocomplete, scrollbars, and infinite scrolling.
- JavaScript dialogs, notifications, modal behavior, multiple windows, redirects, and nested frames.
- Geolocation and other browser permission scenarios supported by Playwright contexts.
- Broken images, JavaScript errors, console output, HTTP status codes, HTTP headers, and network-related diagnostics.
- A/B behavior, randomized content, and intentionally flaky examples handled through non-blocking demonstration tests.
- Additional first-party sample applications and exercises discovered by the versioned inventory.

The suite will use capability-focused assertions instead of merely verifying that each page opens.

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

### Delivery Phases

The broad UI scope will be implemented in this order:

1. Core framework, inventory, and Notes App foundations.
2. Standard controls, inputs, forms, and authentication exercises.
3. Dynamic DOM, waits, loading, tables, and pagination.
4. Files, browser interactions, frames, windows, and permissions.
5. Diagnostics, network behavior, intentional flakiness, authentication variants, and remaining edge cases.
6. Cross-browser stabilization, exclusions review, and final portfolio documentation.

Each phase will have its own implementation plan, guided learning steps, verification, and commits. A later phase will not block publishing the completed earlier phases as visible portfolio progress.

### Fast feedback

Every push and pull request will run formatting, linting, TypeScript checks, API smoke tests, and a stable Chromium UI smoke suite. Intentionally flaky demonstrations and the complete exercise inventory will not run as blocking pull-request checks.

### Full regression

A weekly GitHub Actions schedule and a manual `workflow_dispatch` trigger will run the broader API suite and all stable, implemented UI inventory tests across Chromium, Firefox, and WebKit. The weekly run will start on Sunday at 04:00 UTC. Tagged intentional-flakiness demonstrations will run in a separate non-blocking job. Local commands will allow running one test, one capability group, one phase, smoke tests, stable regression, flaky demonstrations, or the complete implemented inventory.

## Reporting and Portfolio Presentation

Playwright's HTML reporter will be the primary report. GitHub Actions will preserve the report and relevant failure artifacts.

The README will include:

- Project purpose and system under test.
- Architecture overview.
- Technology list.
- Test coverage summary.
- UI exercise inventory with implementation and exclusion status.
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

- Every Playwright-compatible UI exercise in the captured platform inventory has meaningful automated coverage.
- Every unsupported or unsafe exercise has a reviewed, evidence-backed entry in the exclusions table.
- The Notes App functional suite, minimum API suite, and three cross-layer tests are implemented and stable.
- Tests are independent and clean up their generated data.
- Fast and full GitHub Actions workflows execute as designed.
- Reports and failure artifacts are available from GitHub Actions.
- The README enables another developer to clone, configure, and run the project.
- No secrets, generated reports, browser binaries, or local environment files are committed.
- The owner can explain the framework layers, one representative UI test, one API test, test-data isolation, and the CI strategy.

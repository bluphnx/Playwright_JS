# CLI Commands — Cucumber & Playwright

---

## Cucumber CLI Options

```bash
# Run all features
npx cucumber-js

# Run specific feature file
npx cucumber-js features/loginPractice.feature

# Run specific feature file containing multiple scenarios parallely
npx cucumber-js features/multipleScenariosParallel.feature --parallel <number of scenarios in feature file>
(e.g.) npx cucumber-js features/multipleScenariosParallel.feature --parallel 2

# Generate html cucumber report
npx cucumber-js features/multipleScenariosParallel.feature --format html:cucumber-report.html
npx cucumber-js --format html:cucumber-report.html

# retry failed scenarios
npx cucumber-js --retry 1
npx cucumber-js --retry 1 --format html:cucumber-report.html

# Run by tag
npx cucumber-js --tags "@E2E"
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@E2E and @login"          # Both tags
npx cucumber-js --tags "@smoke or @regression"     # Either tag
npx cucumber-js --tags "not @wip"                  # Exclude tag
npx cucumber-js --tags "@E2E and not @skip"        # Combine

# Dry run (validate steps without executing)
npx cucumber-js --dry-run

# Specific format/reporter
npx cucumber-js --format progress
npx cucumber-js --format json:report.json
npx cucumber-js --format html:report.html

# Parallel execution
npx cucumber-js --parallel 3

# Fail fast (stop on first failure)
npx cucumber-js --fail-fast

# Specific step definitions folder
npx cucumber-js --require features/step_definitions/
```

---

## Playwright CLI Options

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/client.spec.js

# Run by test name (grep)
npx playwright test --grep "Login"
npx playwright test --grep "@smoke"
npx playwright test -g "place order"

# Exclude by name
npx playwright test --grep-invert "skip"

# Run headed (see browser)
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Debug mode (pause on failure)
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui

# Workers (parallelism)
npx playwright test --workers=5
npx playwright test --workers=1               # Sequential

# Retries
npx playwright test --retries=2

# Specific config file
npx playwright test --config playwright.config1.js

# Show report
npx playwright show-report

# Show trace
npx playwright show-trace test-results/trace.zip

# Generate code (record)
npx playwright codegen https://example.com

# Run last failed only
npx playwright test --last-failed

# Timeout override
npx playwright test --timeout=60000

# List tests without running
npx playwright test --list

# Update screenshots (visual testing)
npx playwright test --update-snapshots
```

---

## Quick Comparison

| Action          | Cucumber                                    | Playwright                                  |
|-----------------|---------------------------------------------|---------------------------------------------|
| Run all         | `npx cucumber-js`                           | `npx playwright test`                       |
| Specific file   | `npx cucumber-js features/login.feature`    | `npx playwright test tests/login.spec.js`   |
| By tag/name     | `--tags "@smoke"`                           | `--grep "@smoke"`                           |
| Exclude         | `--tags "not @wip"`                         | `--grep-invert "wip"`                       |
| Parallel        | `--parallel 3`                              | `--workers=3`                               |
| Stop on fail    | `--fail-fast`                               | (configure in config)                       |
| Headed          | N/A (configure in hooks)                    | `--headed`                                  |
| Browser choice  | N/A (configure in hooks)                    | `--project=firefox`                         |
| Debug           | N/A                                         | `--debug`                                   |
| Report          | `--format html:report.html`                 | `npx playwright show-report`                |
| Dry run / List  | `--dry-run`                                 | `--list`                                    |

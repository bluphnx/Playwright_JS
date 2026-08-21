# Interview Preparation Plan — Automation Tester (Playwright/JS)

## JD Analysis — What They Want vs What You Have

| JD Requirement                              | Your Match                                          | Priority  |
|---------------------------------------------|-----------------------------------------------------|-----------|
| Playwright automation with JS/TS            | ✅ Strong (4.9 years, framework from scratch)       | Must-have |
| Establish automation process & roadmap      | ✅ Built it from scratch at Amazon                  | High      |
| Scalable test automation framework          | ✅ POM, fixtures, parallel, CI/CD                   | High      |
| API testing (REST)                          | ✅ Playwright request API + REST Assured + Postman  | High      |
| Agile — test strategy, plans, cases         | ✅ Sprint planning, TestRail, JIRA                  | Medium    |
| Web + Web Services + Mobile                 | ✅ Web + API + device emulation                     | Medium    |
| Technical documentation                     | ✅ Confluence, test plans                           | Medium    |
| Troubleshoot script issues                  | ✅ Trace Viewer, debugging                          | Medium    |

**You exceed requirements.** They ask 4-10 years, you have 4.9.

---

## 2-Day Preparation Plan

### TODAY (Day 1) — Framework & Technical Deep-Dive

**Morning (2 hours):**

| Time   | Topic                                                         | Revise from                                     |
|--------|---------------------------------------------------------------|-------------------------------------------------|
| 30 min | Your framework walkthrough (POM, fixtures, config, CI/CD)     | `Chapter_14_Interview_Preparation_Guide.txt`    |
| 30 min | Playwright unique features (auto-wait, context, trace viewer) | `150_Top_Playwright_Interview_Questions.md`     |
| 30 min | API testing (Playwright request + REST Assured)                | `Interview_REST_Assured.txt` + Chapter 13       |
| 30 min | JavaScript fundamentals (async/await, promises, callbacks)    | `149_JavaScript_Interview_Questions.md`         |

**Afternoon (2 hours):**

| Time   | Topic                                                         | Revise from                                     |
|--------|---------------------------------------------------------------|-------------------------------------------------|
| 30 min | Locators — all 18 strategies                                  | `Locator_Quick_Reference.html`                  |
| 30 min | Parallel execution, cross-browser, retries                    | `150_Top_Playwright_Interview_Questions.md`     |
| 30 min | Network interception, storageState                            | Same file — Q8, Q12                             |
| 30 min | Practice explaining your project ALOUD (2-min elevator pitch) | `Chapter_14` section 14.12                      |

---

### TOMORROW (Day 2) — Mock Interview & Edge Cases

**Morning (2 hours):**

| Time   | Topic                                                         | Revise from                                     |
|--------|---------------------------------------------------------------|-------------------------------------------------|
| 30 min | Behavioral questions (why leaving, challenges, mentoring)     | `accenture_interview_prep.txt` — Part 5         |
| 30 min | CI/CD (Jenkins pipeline, cron, triggers)                      | `Interview_Jenkins.txt` + Chapter 12            |
| 30 min | Test strategy/Agile — how you plan, estimate, prioritize      | Sprint planning, risk-based testing             |
| 30 min | Coding — reverse string, filter/map/reduce, duplicates        | `149_JavaScript_Interview.js` (run it!)         |

**Afternoon (1 hour before interview):**

| Time   | Topic                                                         |
|--------|---------------------------------------------------------------|
| 20 min | Re-read your resume points and project descriptions           |
| 20 min | Practice "Tell me about yourself" (2 minutes, crisp)          |
| 20 min | Skim quick reference files — locators, commands, timeouts     |

---

## Key Questions They'll Likely Ask (With Answers)

### Framework

**1. "Walk me through your automation framework architecture"**

> "My framework uses Playwright with JavaScript, structured with Page Object Model. Each page in the application has its own class — LoginPage, DashboardPage, CartPage — encapsulating locators and actions. Tests import these page objects and call methods like `loginPage.login(user, pass)`.
>
> For authentication, I use custom fixtures — login via API in beforeAll, inject JWT token into localStorage using addInitScript, so tests start already authenticated without UI login overhead.
>
> Test data comes from external JSON files for data-driven testing. Configuration handles cross-browser (Chromium, Firefox, WebKit), parallel execution with 5 workers, retries for flaky tests, and dual reporting with HTML + Allure.
>
> The suite integrates with Jenkins — smoke tests trigger on every PR, nightly regression runs the full 100+ tests at 2 AM via cron."

---

**2. "How do you make your framework scalable?"**

> "Five key design decisions make it scalable:
> 1. POM — new pages just need a new class file, no structural changes
> 2. Custom fixtures — common preconditions (auth, data setup) are reusable across tests
> 3. Data-driven — adding new test scenarios = adding a JSON entry, not new code
> 4. Parallel workers — tests scale horizontally without code changes
> 5. Cross-browser projects — same tests run on 3 browsers from one config
>
> When we added 3 new pages in one sprint, I just created 3 page object classes and the existing infrastructure (fixtures, CI, reporting) handled them automatically."

---

**3. "How do you handle test data?"**

> "Three approaches depending on the scenario:
> - **Static data:** External JSON files for predictable scenarios (login credentials, product names)
> - **Dynamic data:** API calls in beforeAll to create fresh data per run (unique orders, profiles)
> - **Custom fixtures:** Inject test data as fixture parameters — tests declare what they need
>
> For cleanup, API calls in afterAll delete created data. This ensures test isolation — each test creates its own data, no shared state, no order dependency."

---

### Playwright Specific

**4. "How does Playwright auto-wait work?"**

> "Every action in Playwright — click, fill, check — automatically waits for the element to be attached, visible, stable, enabled, and not obscured before performing the action. No explicit waits needed.
>
> It waits up to the configured action timeout (we set 10 seconds). If the element isn't ready within that time, it fails with a clear error.
>
> This eliminated 90% of the timing-related flakiness we had. In Selenium, you'd write WebDriverWait + ExpectedConditions for every interaction. In Playwright, it's just `await page.locator('#btn').click()` — one line, auto-waits internally."

---

**5. "How do you run tests in parallel?"**

> "In playwright.config.js, I set `workers: 5` and `fullyParallel: true`. This runs 5 tests simultaneously in isolated OS processes — each gets its own browser, no shared state.
>
> From the terminal, I can override with `--workers=4` for CI environments with different CPU capacity. Setting `--workers=1` runs sequentially for debugging.
>
> The key to making parallel work is test isolation — each test creates its own data, uses its own context. No test depends on another's state or execution order. This reduced our suite from 30 minutes to 6 minutes."

---

**6. "How do you handle authentication across tests?"**

> "Two-strategy approach:
>
> **Strategy 1 — API login + token injection (most tests):**
> Call login API → get JWT token → use `page.addInitScript()` to set token in localStorage → navigate to app → already authenticated. This takes 200ms instead of 3-5 seconds of UI login.
>
> **Strategy 2 — storageState (session-based):**
> Login via UI once in a setup project → save cookies/localStorage to `auth.json` via `context.storageState()` → all subsequent tests load that file.
>
> I keep 2-3 dedicated UI login tests to validate the actual login flow. The remaining 97% use the API shortcut."

---

**7. "How do you debug failing tests in CI?"**

> "Three levels of debugging:
> 1. **HTML Report** — shows which step failed with auto-attached screenshot
> 2. **Trace Viewer** — `trace: 'retain-on-failure'` records DOM snapshots, network, console at each step. I open with `npx playwright show-trace`
> 3. **Video recording** — `video: 'retain-on-failure'` shows exactly what the browser did
>
> In Jenkins, these are archived as build artifacts. When a test fails at 2 AM, by morning I open the trace and see the exact DOM state at the point of failure — without re-running locally."

---

### API

**8. "How do you test APIs in Playwright?"**

> "Playwright has a built-in `request` fixture — no external libraries needed. I create an API request context and make HTTP calls directly:
>
> ```js
> const response = await request.post('/api/login', { data: { email, password } });
> expect(response.ok()).toBeTruthy();
> const json = await response.json();
> ```
>
> I validate status codes, response body, headers. For authentication, I extract the token from login response and use it in subsequent requests via Authorization header.
>
> This also lets me combine UI + API testing — login via API (fast), then verify UI shows correct data."

---

**9. "How do you combine UI and API testing?"**

> "Three ways I combine them:
> 1. **Precondition via API** — create test data (orders, profiles) via API before UI test runs
> 2. **Auth via API** — login via API, inject token, then test UI in authenticated state
> 3. **Verification via API** — after UI action (place order), verify via API that backend received it correctly
>
> This makes tests faster (API for setup/teardown) and more thorough (validate both layers)."

---

**10. "How do you validate API responses?"**

> "I validate multiple levels:
> - **Status code:** `expect(response.status()).toBe(201)`
> - **Response body:** `expect(json.message).toBe('Order Placed Successfully')`
> - **Specific fields:** `expect(json.orders[0]).toBeTruthy()`
> - **Response time:** `expect(response.ok()).toBeTruthy()` (ok = 200-299)
> - **Headers:** Check Content-Type, Authorization
>
> For negative testing: send invalid data → assert 400/401/500 status codes and error message content."

---

### Process

**11. "How do you plan automation for a new feature?"**

> "I follow a structured approach:
> 1. **Analyze requirements** — review user stories, acceptance criteria
> 2. **Identify test scenarios** — positive, negative, edge cases
> 3. **Assess feasibility** — can it be automated? Is it stable enough? ROI worth it?
> 4. **Create page objects** — if new page, create the POM class first
> 5. **Write tests** — start with happy path, then add negative/edge cases
> 6. **Review & merge** — PR with code review, CI validates before merge
> 7. **Monitor stability** — track over 2-3 sprints, fix flakiness
>
> I typically automate 2-4 test cases per day depending on complexity."

---

**12. "How do you handle flaky tests?"**

> "Layered approach:
>
> **Prevention:**
> - Auto-wait handles timing (biggest source of flakiness)
> - Role-based locators resist DOM changes
> - Test isolation — no shared state between tests
>
> **Detection:**
> - `retries: 2` in config — flaky tests pass on retry, real failures don't
> - Allure reports track flaky trends over time
>
> **Debugging:**
> - Trace Viewer shows exact state at failure
> - `waitForResponse()` for API-dependent elements
> - Network interception for timing-sensitive tests
>
> This brought our flaky rate from 15% to under 2%."

---

**13. "How do you decide what to automate?"**

> "I assess based on four criteria:
> 1. **Frequency** — runs every sprint? Automate. One-time check? Skip.
> 2. **Stability** — UI stable enough? If changing every sprint, wait.
> 3. **Complexity** — repetitive data-driven scenarios benefit most
> 4. **Risk** — critical business flows (login, checkout) get priority
>
> I don't automate: purely visual checks, one-time migrations, exploratory testing, features still in active development (too unstable).
>
> My rule: if a manual tester runs it more than 3 times → automate it."

---

### Coding

**14. "Reverse each word in a string"**

```js
function reverseEachWord(str) {
    return str.split(' ').map(word =>
        word.split('').reverse().join('')
    ).join(' ');
}
console.log(reverseEachWord("My name is John")); // "yM eman si nhoJ"
```

---

**15. "Filter/map/reduce on an array"**

```js
const students = [
    { name: "Alice", score: 25 },
    { name: "Bob", score: 55 },
    { name: "Charlie", score: 65 }
];

// Filter: keep score >= 36
const passed = students.filter(s => s.score >= 36);

// Map: uppercase names
const names = passed.map(s => s.name.toUpperCase());

// Reduce: sum scores
const total = passed.reduce((acc, s) => acc + s.score, 0); // 120
```

---

**16. "Write a locator for [element they show you]"**

**Approach to explain:**
> "I'd inspect the element, check for unique attributes in this order:
> 1. ID → `#elementId`
> 2. data-testid → `[data-testid='value']`
> 3. Unique attribute → `input[placeholder='Email']`
> 4. Role-based → `page.getByRole('button', { name: 'Submit' })`
> 5. If not unique → use parent context + filter
>
> I validate in console with `$$('css').length` or Elements tab Ctrl+F before using in code."

---

## Your "Tell Me About Yourself" (2 minutes)

> "I'm a QA automation engineer with nearly 5 years at Amazon, where I built the automation framework for the Kids Parent Dashboard from scratch using Playwright with JavaScript.
>
> My framework uses Page Object Model, custom fixtures for authentication, parallel execution with 5 workers, and is integrated with Jenkins for nightly regression and PR-triggered smoke tests. I've automated 100+ test cases covering E2E flows across 3 browsers.
>
> I also handle API testing using Playwright's built-in request fixture — login via API, inject tokens, and validate backend responses. I've reduced our test suite from 30 minutes to 6 minutes through parallel execution, and brought flaky tests from 15% to under 2%.
>
> I'm looking for my next challenge where I can apply these skills at a larger scale and contribute to building automation processes from ground up."

---

## JD Keywords You MUST Use in Answers

| JD Keyword             | What to say                                            |
|------------------------|--------------------------------------------------------|
| "Scalable framework"   | Mention POM, fixtures, data-driven, parallel workers   |
| "Automation roadmap"   | Mention sprint-by-sprint planning, phased delivery     |
| "Agile"               | Mention standups, sprint planning, retrospectives      |
| "API testing"          | Mention Playwright request API AND Postman/REST Assured|
| "Web services"         | Mention REST API validation, GET/POST/PUT/DELETE       |
| "Documentation"        | Mention Confluence, TestRail, Allure reports           |
| "Troubleshoot"         | Mention Trace Viewer, screenshots, console logs        |
| "Scalable"            | Mention cross-browser projects, CI/CD, parallel        |

---

## Quick Framework Explanation (When Asked)

```
project/
├── playwright.config.js        → Browsers, timeouts, reporters, workers
├── pageobjects/                → POM classes (one per page)
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── CartPage.js
├── utils/
│   ├── fixtures.js             → Custom fixtures (authenticated page)
│   ├── APIutils.js             → API helpers (login, create order)
│   └── testdata.json           → External test data
├── tests/                      → Test specs by feature
├── features/                   → BDD Cucumber (optional)
└── Jenkinsfile                 → CI/CD pipeline
```

**Design decisions to mention:**
1. POM for maintainability (locator change = fix 1 file)
2. Custom fixtures for DRY auth (API login + token injection)
3. Data-driven with JSON (multiple scenarios, no code duplication)
4. Network interception for edge case testing
5. Parallel workers (5) for speed
6. Dual reporting: HTML (devs) + Allure (stakeholders)

---

## Checklist Before Interview

- [ ] Can explain framework architecture in 2 minutes
- [ ] Can explain auto-wait mechanism clearly
- [ ] Can write a locator on the spot (CSS + XPath)
- [ ] Can explain async/await and promises
- [ ] Can write filter/map/reduce code
- [ ] Know the difference between browser context and page
- [ ] Can explain how you handle flaky tests
- [ ] Can explain CI/CD pipeline (Jenkins)
- [ ] Know all CLI commands (grep, workers, project, retries)
- [ ] "Tell me about yourself" practiced (2 min, crisp)
- [ ] Salary expectation ready
- [ ] Questions to ask THEM ready

---

## Questions to Ask Them

1. "What type of application will I be automating — web, API, or both?"
2. "Is this building a framework from scratch or maintaining existing?"
3. "What's the current test coverage and what's the goal?"
4. "What CI/CD tool are you using?"
5. "How large is the QA team and how is work distributed?"
6. "What does a typical sprint look like for the automation team?"
7. "Are there opportunities to grow into a lead/architect role?"

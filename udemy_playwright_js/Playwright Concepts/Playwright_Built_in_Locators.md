# Playwright Built-in Locators — Why & How

## All Built-in Locators

| #  | Locator          | Code                                                | Best for                              |
|----|------------------|-----------------------------------------------------|---------------------------------------|
| 1  | getByRole        | `page.getByRole('button', { name: 'Submit' })`      | Buttons, links, headings, checkboxes  |
| 2  | getByText        | `page.getByText('Welcome back')`                    | Any element with visible text         |
| 3  | getByLabel       | `page.getByLabel('Email')`                          | Form fields with `<label>`            |
| 4  | getByPlaceholder | `page.getByPlaceholder('Enter email')`              | Inputs with placeholder text          |
| 5  | getByAltText     | `page.getByAltText('Logo')`                         | Images with alt attribute             |
| 6  | getByTitle       | `page.getByTitle('Close')`                          | Elements with title attribute         |
| 7  | getByTestId      | `page.getByTestId('submit-btn')`                    | Elements with `data-testid` attribute |

## General Locators (Fallback)

| #  | Locator       | Code                                                     | Best for                    |
|----|---------------|----------------------------------------------------------|-----------------------------|
| 8  | CSS           | `page.locator('#email')`                                 | Any CSS selector            |
| 9  | XPath         | `page.locator('//input[@id="email"]')`                   | XPath expressions           |
| 10 | filter        | `page.locator('.card').filter({ hasText: 'iPhone' })`    | Narrow down by content      |
| 11 | frameLocator  | `page.frameLocator('#iframe').locator('button')`         | Elements inside iframes     |

---

## Priority Order (Playwright Recommends)

```
getByRole > getByTestId > getByLabel > getByPlaceholder > getByText > CSS/XPath
```

---

## Why Built-in Locators Over CSS/XPath?

### 1. Resilient to DOM Changes

```js
// CSS — breaks when developer renames class:
page.locator('.btn-primary-v2-redesign')         // ❌ Class changes every redesign

// Built-in — survives redesigns:
page.getByRole('button', { name: 'Submit' })     // ✅ Role & text rarely change
```

Developers frequently rename IDs, classes, and attributes during refactoring.
But the **role** (button, link, heading) and **visible text** (Submit, Login) almost never change.

---

### 2. Mirrors How Users See the Page

Users don't think "I'll click the element with class `.btn-xyz123`."
They think "I'll click the **Submit button**."

```js
// Technical (how code sees it):
page.locator('#btn-form-submit-action')

// Human-readable (how user sees it):
page.getByRole('button', { name: 'Submit' })
```

Built-in locators describe **what the user sees**, making tests readable and maintainable.

---

### 3. Built-in Accessibility Testing

If `getByRole('button', { name: 'Submit' })` can't find your element, it means:
- The button doesn't have proper ARIA role
- Screen readers can't find it either
- Your app has an **accessibility bug**

CSS/XPath will find broken elements — built-in locators expose accessibility issues for free.

---

### 4. Auto-strict Mode (Uniqueness Enforcement)

```js
// CSS — silently picks the first if multiple match:
page.locator('.btn')    // If 5 buttons have .btn class, picks first (hidden bug)

// Built-in — throws error if not unique:
page.getByRole('button', { name: 'Submit' })  // Errors if 2 "Submit" buttons exist
```

Built-in locators force you to write unique locators — preventing silent bugs.

---

### 5. No Dependency on Implementation Details

| What changes often (devs control)   | What stays stable (user-facing)  |
|-------------------------------------|----------------------------------|
| CSS classes: `.btn-primary-v3`      | Role: `button`                   |
| IDs: `#submit-form-2024`            | Text: `Submit`                   |
| Attributes: `data-qa-id="xyz"`      | Label: `Email`                   |
| DOM structure/nesting               | Placeholder: `Enter email`       |

CSS/XPath rely on **implementation** (what developers write).
Built-in locators rely on **user interface** (what users see).

---

### 6. Simpler and Shorter

```js
// XPath (complex):
page.locator("//button[contains(@class,'submit') and @type='button']")

// Built-in (simple):
page.getByRole('button', { name: 'Submit' })
```

---

## Comparison Table

| Feature                 | CSS/XPath                  | Built-in (getBy)            |
|-------------------------|----------------------------|-----------------------------|
| Breaks on redesign      | ❌ Often                   | ✅ Rarely                  |
| Readability             | Technical                  | Human-readable              |
| Accessibility check     | ❌ No                      | ✅ Free                     |
| Strict uniqueness       | ❌ No (picks first)        | ✅ Yes (errors if multiple) |
| Depends on              | Implementation details     | User-visible interface      |
| Learning curve          | Steeper (syntax rules)     | Easier (plain English)      |

---

## When to Still Use CSS/XPath

- Element has no text, role, label, or placeholder
- Complex dynamic elements with no semantic HTML
- Legacy apps without accessibility markup
- Need parent/sibling traversal (XPath only)
- Need partial attribute matching (`*=`, `contains()`)

---

## Code Examples — Same Element, Different Approaches

### Login Button

```js
// CSS
page.locator('#login')
page.locator('.login-btn')
page.locator('button[type="submit"]')

// XPath
page.locator('//button[@id="login"]')
page.locator('//button[text()="Login"]')

// Built-in (BEST)
page.getByRole('button', { name: 'Login' })
```

### Email Input Field

```js
// CSS
page.locator('#email')
page.locator('input[name="userEmail"]')
page.locator('[formcontrolname="userEmail"]')

// XPath
page.locator('//input[@placeholder="email@example.com"]')

// Built-in (BEST)
page.getByPlaceholder('email@example.com')
page.getByLabel('Email')
```

### Heading

```js
// CSS
page.locator('h1.title')
page.locator('.dashboard-heading')

// XPath
page.locator('//h1[text()="Dashboard"]')

// Built-in (BEST)
page.getByRole('heading', { name: 'Dashboard' })
```

### Checkbox

```js
// CSS
page.locator('#terms-checkbox')
page.locator('input[type="checkbox"]')

// Built-in (BEST)
page.getByRole('checkbox', { name: 'I agree to terms' })
page.getByLabel('I agree to terms')
```

### Link

```js
// CSS
page.locator('a[href*="forgot"]')
page.locator('.forgot-link')

// XPath
page.locator('//a[text()="Forgot Password?"]')

// Built-in (BEST)
page.getByRole('link', { name: 'Forgot Password?' })
```

---

## Filtering (When Built-in Alone Isn't Enough)

```js
// Multiple "Add to Cart" buttons — narrow by product name
page.locator('.card').filter({ hasText: 'ADIDAS ORIGINAL' })
    .getByRole('button', { name: 'Add To Cart' })

// Filter by another locator inside
page.getByRole('listitem').filter({ has: page.getByText('iPhone') })
    .getByRole('button', { name: 'Buy' })
```

---

## getByRole — Common Roles

| Role       | HTML Element              | Example                                         |
|------------|---------------------------|-------------------------------------------------|
| button     | `<button>`, `<input type="submit">` | `getByRole('button', { name: 'Submit' })` |
| link       | `<a href="...">`         | `getByRole('link', { name: 'Shop' })`           |
| heading    | `<h1>` to `<h6>`        | `getByRole('heading', { name: 'Dashboard' })`   |
| checkbox   | `<input type="checkbox">`| `getByRole('checkbox', { name: 'Agree' })`      |
| radio      | `<input type="radio">`  | `getByRole('radio', { name: 'Male' })`          |
| textbox    | `<input type="text">`   | `getByRole('textbox', { name: 'Email' })`       |
| combobox   | `<select>`              | `getByRole('combobox', { name: 'Country' })`    |
| listitem   | `<li>`                  | `getByRole('listitem')`                         |
| navigation | `<nav>`                 | `getByRole('navigation')`                       |
| img        | `<img>`                 | `getByRole('img', { name: 'Logo' })`            |

---

## Interview Answer

**Q: "Why do you prefer Playwright's built-in locators over CSS/XPath?"**

**A:** "Built-in locators like getByRole target elements the way users see them — by their role and visible text, not by technical attributes like class names or IDs that developers frequently change. This makes tests more resilient to UI redesigns. In my project, switching from CSS to getByRole reduced test breakage during redesigns by 80%. Additionally, they enforce strict uniqueness — if two elements match, the test fails immediately rather than silently interacting with the wrong element. And they double as accessibility checks — if getByRole can't find a button, it means screen readers can't either, catching a11y bugs for free."


---

## CSS Selector vs XPath — Which is Better?

### Comparison Table

| Feature         | CSS Selector                      | XPath                                  |
|-----------------|-----------------------------------|----------------------------------------|
| Speed           | ✅ Faster (browser-native engine) | ⚠️ Slightly slower                     |
| Readability     | ✅ Shorter, cleaner               | Longer, more verbose                   |
| Direction       | ↓ Down only (parent → child)     | ↑↓←→ All directions                   |
| Text search     | ❌ Cannot                         | ✅ `text()='...'`                      |
| Parent access   | ❌ Cannot go UP                   | ✅ `parent::`, `ancestor::`            |
| Sibling         | ❌ Limited (`+`, `~`)             | ✅ `following-sibling`, `preceding-sibling` |
| Partial match   | ✅ `*=`, `^=`, `$=`              | ✅ `contains()`, `starts-with()`       |
| Index           | `:nth-child(n)`                   | `[n]` or `(//xpath)[n]`               |
| Syntax          | Simple symbols: `#`, `.`, `[]`   | Keywords: `@`, `//`, `::`              |
| Browser support | ✅ All browsers natively          | ✅ All browsers                        |

---

### When to Use CSS

- Element has id, class, name, or any attribute (90% of cases)
- Speed matters (CSS is parsed faster by browsers)
- You only need to go downward in the DOM
- You want shorter, more readable locators

### When to Use XPath

- You need to find by TEXT (`//button[text()='Login']`)
- You need to go UP the DOM (child → parent)
- You need sibling traversal (element next to another)
- No unique attribute exists and you need complex navigation

---

### Same Element — CSS vs XPath

```js
// By ID
CSS:    #inputUsername
XPath:  //input[@id='inputUsername']

// By Class
CSS:    .signInBtn
XPath:  //button[@class='signInBtn']

// By Attribute
CSS:    input[placeholder='Email']
XPath:  //input[@placeholder='Email']

// Contains (partial match)
CSS:    input[type*='pass']
XPath:  //input[contains(@type,'pass')]

// Parent to child
CSS:    form input
XPath:  //form/input

// By Text (XPath only!)
CSS:    ❌ Not possible
XPath:  //button[text()='Login']

// Go to parent (XPath only!)
CSS:    ❌ Not possible
XPath:  //button/parent::div
```

---

### Interview Answer

**Q: "What is the difference between CSS and XPath? Which do you prefer?"**

**A:** "I default to CSS selectors because they're faster, shorter, and cover 90% of locator needs. I switch to XPath only when I need capabilities CSS doesn't have — text-based identification, parent traversal, or sibling navigation. In Playwright specifically, I prefer built-in locators (getByRole, getByText) over both, using CSS/XPath only as a fallback."

---

### The Full Locator Priority

```
1. Playwright built-in (getByRole, getByTestId, getByLabel)  ← BEST
2. CSS Selector (fast, simple, 90% coverage)                  ← GOOD
3. XPath (when CSS can't do it — text, parent, sibling)       ← FALLBACK
```

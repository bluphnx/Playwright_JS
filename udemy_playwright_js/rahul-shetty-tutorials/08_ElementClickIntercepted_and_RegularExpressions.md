# Locators in Selenium — Episode 8: ElementClickIntercepted & Regular Expressions

## Solving ElementClickInterceptedException

### The Problem

When clicking "Reset Login" button, the test throws:
```
ElementClickInterceptedException: element click intercepted -
other element is receiving the click
```

### Root Cause

This is a **Single Page Application (SPA)** — built with Angular/React/Vue. When you click "Forgot your password?", the page doesn't reload (URL stays the same). Instead, it **slides** to show the new view.

**What happens:**
1. Click "Forgot your password?" → page starts sliding left
2. While the slide animation is in progress, Selenium fills Name, Email, Phone (super fast)
3. Selenium tries to click "Reset Login" button
4. BUT the sliding animation is still in progress → another element (the login panel sliding out) is ON TOP of the button
5. That overlay receives the click instead → **intercepted!**

### The Fix — Thread.sleep()

Add a pause after clicking "Forgot your password?" to let the slide animation complete:

```java
driver.findElement(By.linkText("Forgot your password?")).click();
Thread.sleep(1000);  // Wait 1 second for slide animation to finish
// Now safe to interact with the new view
```

**Thread.sleep(1000):**
- 1000 milliseconds = 1 second
- Pauses the entire script for exactly 1 second
- Gives the animation time to complete

### Interview Question

**Q: "When would you encounter ElementClickInterceptedException?"**

**A:** "When the application is in a transitioning state — like a sliding animation, loading overlay, or popup appearing. The element exists and is found, but another element is on top of it receiving the click. The solution is to wait until the view stabilizes, either with Thread.sleep or explicit waits (WebDriverWait for element to be clickable)."

---

## Implicit Wait vs Thread.sleep — Key Difference

| Feature | Implicit Wait | Thread.sleep |
|---------|---------------|--------------|
| Purpose | Wait for element to APPEAR in DOM | Wait for element to become STABLE |
| Use case | Element not yet loaded | Element loaded but in transition/animation |
| Behavior | Polls until found or timeout | Hard pause (always waits full duration) |
| Scope | Global — all findElement calls | Just that one line |

**When to use which:**
- Element not showing up yet → **Implicit Wait** (or Explicit Wait)
- Element is there but not clickable (overlay/animation) → **Thread.sleep** (temporary fix) or **Explicit Wait** for element to be clickable (proper fix)

---

## Regular Expressions in CSS — Partial Attribute Matching

### The Problem

Sometimes attribute values are **dynamic** — they change on every page load:
```html
<input type="password1234">  <!-- "1234" changes every time -->
```

You can't match the full value. But "pass" is always constant. Use **partial matching**.

### CSS Regular Expression — Star (`*`)

**Syntax:** `tagname[attribute*='partialValue']`

The `*` means "contains" — match if the attribute VALUE contains this text anywhere.

```css
input[type*='pass']       /* Matches type="password", type="pass1234", etc. */
```

**Examples:**
```css
input[type='password']         /* Exact match — full value required */
input[type*='pass']            /* Contains "pass" anywhere in value */
input[type^='pass']            /* Starts with "pass" */
input[type$='word']            /* Ends with "word" */
```

| Symbol | Meaning        | Example                    | Matches                     |
|--------|----------------|----------------------------|-----------------------------|
| `=`    | Exact match    | `[type='password']`        | Only "password"             |
| `*=`   | Contains       | `[type*='pass']`           | "password", "pass123"       |
| `^=`   | Starts with    | `[type^='pass']`           | "password", "pass"          |
| `$=`   | Ends with      | `[type$='word']`           | "password", "keyword"       |

**Selenium Code:**
```java
driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys("rahulshettyacademy");
```

---

## Regular Expressions in XPath — contains()

### Syntax

```
//tagname[contains(@attribute, 'partialValue')]
```

**Example:**
```
//input[contains(@type, 'pass')]          → Matches type="password"
//button[contains(@class, 'submit')]      → Matches class="submit signInBtn"
//div[contains(@class, 'pwd')]            → Matches class="forgot-pwd-container"
```

**Selenium Code:**
```java
driver.findElement(By.xpath("//button[contains(@class, 'submit')]")).click();
```

### XPath contains() Breakdown

```
//button[contains(@class, 'submit')]
```

| Part              | Meaning                                    |
|-------------------|--------------------------------------------|
| `//button`        | Find a button anywhere on page             |
| `[contains(...)]` | Filter: only buttons where...              |
| `@class`          | ...the class attribute...                  |
| `'submit'`        | ...contains the text "submit" somewhere    |

---

## CSS vs XPath — Regular Expression Comparison

| Feature       | CSS Syntax                       | XPath Syntax                              |
|---------------|----------------------------------|-------------------------------------------|
| Contains      | `[attr*='value']`                | `[contains(@attr, 'value')]`              |
| Starts with   | `[attr^='value']`                | `[starts-with(@attr, 'value')]`           |
| Ends with     | `[attr$='value']`                | Not directly supported (use contains)     |
| Full example  | `input[type*='pass']`            | `//input[contains(@type, 'pass')]`        |

**CSS is simpler** for regular expressions — just add `*`, `^`, or `$` before `=`.

**XPath** requires the `contains()` or `starts-with()` function — more verbose but explicit.

---

## When to Use Regular Expressions

1. **Dynamic attribute values** — last part changes every page load
2. **Very long attribute values** — shorten for readability
3. **Multiple classes** — match one specific word in a long class string

**Example — Long class name:**
```html
<div class="forgot-pwd-btn-container main-wrapper flex-column">
```

**Instead of writing the full class:**
```
//div[contains(@class, 'pwd')]       ← Short, readable, works!
```

---

## Combining Everything — Parent/Child + Contains + Index

**Complex XPath:**
```
//div[contains(@class, 'forgot-pwd-btn-container')]/button[1]
```

**How it reads:**
1. `//div[contains(@class, 'forgot-pwd-btn-container')]` → Find the parent div
2. `/button[1]` → Go to its first child button (GO TO LOGIN)

This combines:
- Customized XPath (attribute-based)
- Regular expression (contains)
- Parent-to-child traversal (/)
- Indexing ([1])

---

## CSS Shortcut: #id

**HTML:**
```html
<input id="inputUsername">
```

**CSS:** `#inputUsername` (hash + ID value)

**Selenium Code:**
```java
driver.findElement(By.cssSelector("#inputUsername")).sendKeys("rahul");
```

**This is equivalent to** `By.id("inputUsername")` but written as CSS syntax.

---

## Complete Flow — Login Successfully

```java
// After grabbing the temp password from Forgot Password page...

// Click GO TO LOGIN button (parent/child + index XPath)
driver.findElement(By.xpath("//div[contains(@class,'forgot-pwd-btn-container')]/button[1]")).click();
Thread.sleep(1000);  // Wait for slide animation

// Enter username (CSS: #id)
driver.findElement(By.cssSelector("#inputUsername")).sendKeys("rahul");

// Enter password (CSS: regular expression with *)
driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys("rahulshettyacademy");

// Select Terms checkbox (ID)
driver.findElement(By.id("chkboxOne")).click();

// Click SIGN IN (XPath: contains regular expression)
driver.findElement(By.xpath("//button[contains(@class,'submit')]")).click();

// Result: Successfully logged in! ✓
```

---

## All Regular Expression Patterns

### CSS:
```css
input[type='password']          /* Exact match */
input[type*='pass']             /* Contains "pass" */
input[type^='pass']             /* Starts with "pass" */
input[type$='word']             /* Ends with "word" */
```

### XPath:
```
//input[@type='password']                    /* Exact match */
//input[contains(@type, 'pass')]             /* Contains "pass" */
//input[starts-with(@type, 'pass')]          /* Starts with "pass" */
```

---

## Key Takeaways

1. **ElementClickIntercepted** = overlay/animation blocking the click. Fix: wait for stability.
2. **Thread.sleep** = hard pause. Use sparingly. Better alternative: explicit wait (later).
3. **CSS regular expression:** `*=` (contains), `^=` (starts with), `$=` (ends with)
4. **XPath regular expression:** `contains(@attr, 'value')`, `starts-with(@attr, 'value')`
5. **Use partial matching** when values are dynamic or very long
6. **Combine techniques:** parent/child + contains + index = powerful complex locators
7. **CSS `#id`** = shorthand for ID-based CSS selector

---

## Coming Up Next

- Grabbing text and performing assertions
- String parsing to extract the password dynamically
- Log out flow
- Summary of all locator types

---

*Source: Rahul Shetty Academy — Selenium Java Course*

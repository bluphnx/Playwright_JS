# Locators in Selenium — Episode 2: Using ID, Name & ClassName

## How to Inspect Elements

1. Right-click on the element → **Inspect**
2. Developer Tools opens → **Elements tab** highlights the HTML code
3. Click the **arrow icon** (top-left of DevTools) → "Select an element in the page to inspect"
4. Click on any element → its HTML code gets highlighted

---

## Understanding HTML Element Structure

When you inspect an element (e.g., the username input box), you see something like:

```html
<input type="text" placeholder="Username" id="inputUsername" value="">
```

**Breakdown:**

| Part            | What it is              | Example            |
|-----------------|-------------------------|--------------------|
| `input`         | Tag name                | The type of element |
| `type`          | Attribute               | `"text"`           |
| `placeholder`   | Attribute               | `"Username"`       |
| `id`            | Attribute (& Locator!)  | `"inputUsername"`  |
| `value`         | Attribute               | `""` (empty until you type) |

**Key insight:** Attributes are in red, their values are in green (in DevTools). The tag name comes right after the `<` bracket.

---

## Locator 1: ID

**HTML:**
```html
<input type="text" placeholder="Username" id="inputUsername" value="">
```

**Selenium Code:**
```java
driver.findElement(By.id("inputUsername")).sendKeys("rahul");
```

**How it works:**
- `driver.findElement(...)` → asks Selenium to find ONE element on the page
- `By.id("inputUsername")` → find it by matching the `id` attribute
- `.sendKeys("rahul")` → type "rahul" into that element

**Why ID is best:**
- IDs are meant to be unique on a page (by HTML specification)
- Fastest locator — browser has a direct lookup table for IDs
- Most reliable — developers rarely change IDs

---

## Locator 2: Name

**HTML (password field — no ID available!):**
```html
<input type="password" placeholder="Password" name="inputPassword">
```

**Selenium Code:**
```java
driver.findElement(By.name("inputPassword")).sendKeys("randomPass123");
```

**How it works:**
- This element has no `id` attribute — so we can't use `By.id()`
- But it HAS a `name` attribute → use `By.name("inputPassword")`
- `.sendKeys("randomPass123")` → types the password

**Key point:** Not every element has an ID. When ID is absent, check for `name` next.

---

## Locator 3: Class Name

**HTML (Sign In button):**
```html
<button class="submit signInBtn" type="submit">Sign In</button>
```

**Selenium Code:**
```java
driver.findElement(By.className("signInBtn")).click();
```

**How it works:**
- `By.className("signInBtn")` → finds element with this class
- `.click()` → clicks the button (not sendKeys — buttons are clicked, not typed into)

**Important — Multiple classes:**
```
class="submit signInBtn"
```
- Space means **two separate classes**: `submit` AND `signInBtn`
- This is NOT one class called "submit signInBtn"
- In `By.className()`, provide only ONE class — not both
- Choose the more unique one: `signInBtn` is better than `submit` (more specific)

---

## Complete Code

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Locators {
    public static void main(String[] args) {

        // Step 1: Set up ChromeDriver
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        // Step 2: Open the webpage
        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Step 3: Enter username (using ID locator)
        driver.findElement(By.id("inputUsername")).sendKeys("rahul");

        // Step 4: Enter password (using Name locator)
        driver.findElement(By.name("inputPassword")).sendKeys("randomPass123");

        // Step 5: Click Sign In button (using ClassName locator)
        driver.findElement(By.className("signInBtn")).click();

        // Result: "Incorrect username or password" error appears
        // (because we used wrong password — expected behavior)
    }
}
```

---

## Code Breakdown — Line by Line

```java
driver.findElement(By.id("inputUsername")).sendKeys("rahul");
```

| Part                        | What it does                                        |
|-----------------------------|-----------------------------------------------------|
| `driver`                    | The browser instance (ChromeDriver object)          |
| `.findElement(...)`         | Find ONE element on the page                        |
| `By.id("inputUsername")`    | The locator strategy — find by ID attribute         |
| `.sendKeys("rahul")`       | Action — type "rahul" into the found element        |

```java
driver.findElement(By.className("signInBtn")).click();
```

| Part                        | What it does                                        |
|-----------------------------|-----------------------------------------------------|
| `By.className("signInBtn")` | Find by class attribute                            |
| `.click()`                  | Action — click the button (not type — it's a button)|

---

## Actions Summary

| Action          | Method          | Use for                     |
|-----------------|-----------------|-----------------------------|
| Type text       | `.sendKeys()`   | Input fields, text areas    |
| Click           | `.click()`      | Buttons, links, checkboxes  |

**Rule:** `sendKeys` = for typing. `click` = for clicking. Don't sendKeys on a button.

---

## How to Decide Which Locator to Use

When you inspect an element, ask:

1. Does it have an `id`? → Use `By.id()` ✅ (first choice)
2. No ID? Does it have a `name`? → Use `By.name()`
3. No name? Does it have a unique `class`? → Use `By.className()`
4. None of the above? → Use CSS selector or XPath (covered later)

---

## Validate in Console Before Coding

Before writing Selenium code, verify in Chrome Console:

```js
// Check if ID is unique
$$("#inputUsername").length         // Should be 1

// Check if name is unique
$$("[name='inputPassword']").length // Should be 1

// Check if class is unique
$$(".signInBtn").length            // Should be 1
```

---

## Key Takeaways

1. **Inspect first** — always right-click → inspect to see the HTML
2. **ID > Name > ClassName** — priority order for choosing locators
3. **sendKeys for typing, click for buttons** — don't mix them up
4. **Multiple classes are separated by spaces** — use only ONE in `By.className()`
5. **Not every element has every locator** — check what's available
6. **Validate in console** — confirm uniqueness before writing code

---

## Coming Up Next

- Forgot Password flow
- More locators: CSS Selectors and XPath
- Handling checkboxes and links
- Getting text from the page

---

*Source: Rahul Shetty Academy — Selenium Java Course*

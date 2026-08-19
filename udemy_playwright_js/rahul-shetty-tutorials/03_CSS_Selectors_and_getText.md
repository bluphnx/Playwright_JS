# Locators in Selenium — Episode 3: CSS Selectors & getText()

## CSS Selector — A Universal Locator

CSS selectors are **constructed** from the HTML code — unlike ID/Name/ClassName which are direct 1-to-1 matches. Even if an element has no ID, no name, and no class, you can STILL write a CSS selector for it.

**Why CSS and XPath are special:**
- ID locator → needs `id` attribute in HTML
- Name locator → needs `name` attribute in HTML
- ClassName → needs `class` attribute in HTML
- **CSS / XPath → can be BUILT from ANY attribute combination** (universal)

---

## CSS Selector Syntax — 3 Ways

### Way 1: Using ID → `tagname#id`

```
Syntax:  tagname#idValue
```

**HTML:**
```html
<input type="text" placeholder="Username" id="inputUsername">
```

**CSS Selector:**
```css
input#inputUsername
```

**Breakdown:** `input` (tag) + `#` (means ID) + `inputUsername` (ID value)

---

### Way 2: Using Class → `tagname.classname`

```
Syntax:  tagname.className
```

**HTML:**
```html
<button class="submit signInBtn" type="submit">Sign In</button>
```

**CSS Selector:**
```css
button.signInBtn
```

**Breakdown:** `button` (tag) + `.` (means class) + `signInBtn` (one of the classes)

**Note:** Tag name is optional. `.signInBtn` alone also works — but make sure it's unique on the page.

---

### Way 3: Using Any Attribute → `tagname[attribute='value']`

```
Syntax:  tagname[attribute='value']
```

**HTML (no ID, no class, no name):**
```html
<input type="text" placeholder="Username">
```

**CSS Selector:**
```css
input[placeholder='Username']
```

**Breakdown:** `input` (tag) + `[placeholder='Username']` (attribute match)

**This is the GENERIC syntax** — works for ANY attribute. Use it when ID/class/name are not available.

---

## Summary of CSS Syntax

| When you have... | CSS Syntax                   | Example                        |
|------------------|------------------------------|--------------------------------|
| ID               | `tagname#id`                 | `input#inputUsername`          |
| Class            | `tagname.classname`          | `button.signInBtn`             |
| Any attribute    | `tagname[attr='value']`      | `input[placeholder='Username']`|

**Memory trick:**
- `#` = ID (think: `#hashtag` = unique identity)
- `.` = Class (think: `.dot` notation for classes)
- `[]` = Attribute (think: square brackets = attribute access)

---

## Using CSS Selector in Selenium Code

**Goal:** Capture the error message text "Incorrect username or password"

**HTML of the error message:**
```html
<p class="error">Incorrect username or password.</p>
```

**CSS Selector:** `p.error` (tag=p, class=error)

**Selenium Code:**
```java
String errorMessage = driver.findElement(By.cssSelector("p.error")).getText();
System.out.println(errorMessage);
```

---

## getText() — Extract Text from Elements

| Action      | Method         | Use for                              |
|-------------|----------------|--------------------------------------|
| Type text   | `.sendKeys()`  | Input fields — typing into them      |
| Click       | `.click()`     | Buttons, links — clicking them       |
| **Read text** | **`.getText()`** | **Any element — reading its visible text** |

**Code:**
```java
// Find element with CSS selector → get its text → print it
String message = driver.findElement(By.cssSelector("p.error")).getText();
System.out.println(message);
// Output: "Incorrect username or password."
```

**How it works:**
- `By.cssSelector("p.error")` → finds the `<p>` tag with class "error"
- `.getText()` → extracts the visible text inside that element
- `System.out.println(...)` → prints it to the console

---

## Validating CSS Selector Uniqueness

### Method 1: Browser Console (no plugins)

```js
$$("p.error").length          // Should return 1 (unique)
$$("input[type='text']").length  // Might return 3 (not unique!)
```

### Method 2: SelectorHub / ChroPath Plugin

1. Install SelectorHub from Chrome Web Store
2. Open DevTools → SelectorHub tab appears
3. Type your CSS in the input box → hit Enter
4. It shows: **"1 element matching"** = unique ✓
5. It also highlights the matched element on the page

### Method 3: Elements Tab (Ctrl+F)

1. DevTools → Elements tab → Ctrl+F
2. Paste CSS selector
3. Shows "1 of 1" (unique) or "1 of 5" (not unique)

---

## The NoSuchElementException Problem

**The code failed with:**
```
NoSuchElementException: no such element - Unable to locate element with CSS selector "p.error"
```

**But we VERIFIED the selector was correct! Why did it fail?**

**Answer (revealed in next episode):** The error message appears ONLY AFTER clicking Sign In. Selenium executes so fast that it tries to find `p.error` BEFORE the page has a chance to display it. The element doesn't exist in the DOM yet when Selenium looks for it.

**This is a SYNCHRONIZATION problem** — Selenium is faster than the browser. We need to tell Selenium to WAIT until the element appears.

**Hint:** This is where **Waits** come in (covered in next episode).

---

## Complete Code So Far

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Locators {
    public static void main(String[] args) {

        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        // Open page
        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Enter username (ID locator)
        driver.findElement(By.id("inputUsername")).sendKeys("rahul");

        // Enter password (Name locator)
        driver.findElement(By.name("inputPassword")).sendKeys("randomPass123");

        // Click Sign In (ClassName locator)
        driver.findElement(By.className("signInBtn")).click();

        // Get error message (CSS selector) — WILL FAIL without wait!
        String errorMsg = driver.findElement(By.cssSelector("p.error")).getText();
        System.out.println(errorMsg);
    }
}
```

---

## Key Takeaways

1. **CSS selector is universal** — can be built even without ID/name/class
2. **Three CSS patterns:** `#id`, `.class`, `[attr='value']`
3. **Tag name is optional** in CSS (but makes it more specific)
4. **`.getText()`** extracts visible text from any element
5. **Always validate uniqueness** before writing code (console, SelectorHub, Ctrl+F)
6. **NoSuchElementException** usually means the element isn't in the DOM YET — needs a wait

---

## Coming Up Next

- Why the test failed (synchronization/timing issue)
- How to add waits in Selenium
- Implicit and Explicit waits
- Continuing the Forgot Password flow

---

*Source: Rahul Shetty Academy — Selenium Java Course*

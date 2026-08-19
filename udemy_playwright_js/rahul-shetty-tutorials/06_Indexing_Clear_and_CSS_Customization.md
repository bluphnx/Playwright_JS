# Locators in Selenium — Episode 6: Indexing, clear(), and Customized CSS

## CSS — Customized Syntax (Attribute-Based)

**Syntax:**
```
tagname[attribute='value']
```

**HTML (email field):**
```html
<input type="text" placeholder="Email">
```

**CSS Selector:**
```css
input[placeholder='Email']
```

**Selenium Code:**
```java
driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@rsa.com");
```

**Choosing the right attribute:**
- `type='text'` → BAD choice (multiple elements have type=text)
- `placeholder='Email'` → GOOD choice (only one element has this placeholder)

**Rule:** Always choose an attribute whose value is UNIQUE on the page.

---

## The .clear() Action

**What it does:** Clears/resets the text in an input field.

**Code:**
```java
// Enter email
driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@rsa.com");

// Clear the email field
driver.findElement(By.cssSelector("input[placeholder='Email']")).clear();

// Enter a different email
driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@gmail.com");
```

**Actions summary (updated):**

| Action     | Method         | Use for                               |
|------------|----------------|---------------------------------------|
| Type text  | `.sendKeys()`  | Input fields — typing into them       |
| Click      | `.click()`     | Buttons, links — clicking them        |
| Read text  | `.getText()`   | Any element — reading visible text    |
| **Clear**  | **`.clear()`** | **Input fields — erase existing text** |

---

## Handling Multiple Matches — Indexing

### The Problem

When your locator matches MULTIPLE elements:

```
//input[@type='text']   → 4 elements matching!
```

Selenium picks the FIRST one it finds (scans top-left to bottom-right). If you want the 2nd or 3rd element, you need **indexing**.

---

### XPath Indexing

**Syntax:** Wrap in parentheses + add `[index]`
```
(//tagname[@attribute='value'])[index]
```

**Example:**
```
(//input[@type='text'])[1]   → Name field (1st match)
(//input[@type='text'])[2]   → Email field (2nd match)
(//input[@type='text'])[3]   → Phone field (3rd match)
```

**Validation in console:**
```js
$x("(//input[@type='text'])[2]")        // Email field highlighted
$x("(//input[@type='text'])[2]").length  // 1 = unique
```

**Selenium Code:**
```java
driver.findElement(By.xpath("(//input[@type='text'])[2]")).clear();
```

---

### CSS Indexing — :nth-child()

**Syntax:**
```
tagname[attribute='value']:nth-child(index)
```

**Example:**
```css
input[type='text']:nth-child(3)    /* Email field */
```

**⚠️ WARNING: CSS and XPath indexes may DIFFER!**

| XPath index | CSS :nth-child | Target element |
|-------------|----------------|----------------|
| `[1]`       | `:nth-child(1)` or `:nth-child(2)` | Name |
| `[2]`       | `:nth-child(3)` | Email          |
| `[3]`       | `:nth-child(4)` | Phone          |

**Why they differ:**
- Hidden elements exist in the DOM (invisible to user but counted by CSS)
- XPath may skip hidden elements, CSS counts ALL children
- Always validate in console to find the correct index

**Best practice:** Always verify the index in console before using it in code.

---

## When to Use Indexing (Last Resort!)

**Priority order:**
1. ✅ Find a unique attribute → `input[placeholder='Email']`
2. ✅ Use ID, Name if available → `By.id("email")`
3. ⚠️ Index only when NO unique attribute exists → `(//input[@type='text'])[2]`

> "Indexing is the LAST thing you should try. First always look for a unique attribute. Indexes are fragile — if the page adds a new field above yours, the index breaks."

---

## Console Validation Recap

**CSS:**
```js
$$("input[placeholder='Email']")           // Unique check
$$("input[type='text']")                   // Shows ALL matches (4)
$$("input[type='text']:nth-child(3)")      // Index-based
$$("input[type='text']:nth-child(3)").length  // 1 = found it
```

**XPath:**
```js
$x("//input[@placeholder='Email']")        // Unique check
$x("//input[@type='text']")                // Shows ALL matches (4)
$x("(//input[@type='text'])[2]")           // Index-based
$x("(//input[@type='text'])[2]").length    // 1 = found it
```

**Common errors in console:**
| Error | Cause | Fix |
|-------|-------|-----|
| `null` | Element not found | Check spelling/attribute |
| `Syntax error` | Invalid selector syntax | Check quotes, brackets |
| Using `$x` for CSS | Wrong function | Use `$$` for CSS |
| Using `$$` for XPath | Wrong function | Use `$x` for XPath |

---

## Updated Code (Full Flow)

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

public class Locators {
    public static void main(String[] args) {

        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // 1. Enter username (ID)
        driver.findElement(By.id("inputUsername")).sendKeys("rahul");

        // 2. Enter wrong password (Name)
        driver.findElement(By.name("inputPassword")).sendKeys("randomPass123");

        // 3. Click Sign In (ClassName)
        driver.findElement(By.className("signInBtn")).click();

        // 4. Get error message (CSS)
        System.out.println(driver.findElement(By.cssSelector("p.error")).getText());

        // 5. Click Forgot Password link (LinkText)
        driver.findElement(By.linkText("Forgot your password?")).click();

        // 6. Enter name (XPath)
        driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("John");

        // 7. Enter email (CSS customized syntax)
        driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@rsa.com");

        // 8. Clear email (XPath with index)
        driver.findElement(By.xpath("(//input[@type='text'])[2]")).clear();

        // 9. Re-enter email (CSS with :nth-child)
        driver.findElement(By.cssSelector("input[type='text']:nth-child(3)")).sendKeys("john@gmail.com");
    }
}
```

---

## All Locators Learned So Far

| #  | Locator      | Syntax                              | Example                             |
|----|-------------|--------------------------------------|-------------------------------------|
| 1  | ID          | `By.id("value")`                    | `By.id("inputUsername")`            |
| 2  | Name        | `By.name("value")`                  | `By.name("inputPassword")`          |
| 3  | ClassName   | `By.className("value")`             | `By.className("signInBtn")`         |
| 4  | CSS         | `By.cssSelector("selector")`        | `By.cssSelector("p.error")`         |
| 5  | LinkText    | `By.linkText("full text")`          | `By.linkText("Forgot your password?")` |
| 6  | XPath       | `By.xpath("expression")`            | `By.xpath("//input[@placeholder='Name']")` |

---

## All Actions Learned So Far

| Action    | Method        | Use for                          |
|-----------|---------------|----------------------------------|
| Type      | `.sendKeys()` | Input fields — enter text        |
| Click     | `.click()`    | Buttons, links — click them      |
| Read text | `.getText()`  | Any element — get visible text   |
| Clear     | `.clear()`    | Input fields — erase content     |

---

## Key Takeaways

1. **Customized CSS:** `tagname[attribute='value']` — works for ANY attribute
2. **Choose UNIQUE attributes** — avoid attributes shared by multiple elements
3. **`.clear()`** resets an input field — use before re-entering different text
4. **Indexing (last resort):** XPath `(//xpath)[n]`, CSS `:nth-child(n)`
5. **XPath vs CSS indexes may differ** — always verify in console
6. **First preference = unique attribute. Last preference = index.**
7. **Java comments:** `//` makes a line a comment (code won't execute)

---

## Coming Up Next

- Enter phone number
- Click Reset Login button
- Retrieve temporary password
- Navigate back and sign in with correct credentials
- Log out successfully

---

*Source: Rahul Shetty Academy — Selenium Java Course*

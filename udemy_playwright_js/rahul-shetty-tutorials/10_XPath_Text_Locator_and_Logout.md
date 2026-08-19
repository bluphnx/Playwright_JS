# Locators in Selenium — Episode 10: XPath text() Locator, Star(*) & Logout

## XPath text() — Identify Element by Its Visible Text

### The Problem

You want to click "Log Out" button. It's NOT a link (`<a>` tag), so `By.linkText()` won't work. It's a `<button>` with text inside it.

**HTML:**
```html
<button class="logout-btn">Log Out</button>
```

**LinkText limitation:** Only works for `<a>` (anchor/link) tags. For buttons, divs, spans with text — use XPath's `text()`.

### XPath text() Syntax

```
//tagname[text()='exact visible text']
```

**Example:**
```
//button[text()='Log Out']
```

**Selenium Code:**
```java
driver.findElement(By.xpath("//button[text()='Log Out']")).click();
```

**How it works:**
- `//button` → find a `<button>` tag anywhere
- `[text()='Log Out']` → filter: only the one whose visible text is exactly "Log Out"
- Case-sensitive! `Log Out` ≠ `log out` ≠ `LOG OUT`

---

### text() vs linkText

| Feature | By.linkText() | XPath text() |
|---------|---------------|--------------|
| Works on | Only `<a>` (links) | ANY element (button, div, span, p, etc.) |
| Syntax | `By.linkText("text")` | `By.xpath("//tag[text()='text']")` |
| Use case | Click a link | Click any element identified by its text |

**Rule:** If it's a link → `By.linkText()`. If it's anything else → XPath `text()`.

---

## Star (*) — Wildcard Tag Name

### The Concept

If you don't care about the tag name (or aren't sure what it is), use `*` as a wildcard:

```
//*[text()='Log Out']
```

`*` means "any tag" — could be button, div, span, input, anything.

### When to Use `*`

| XPath | Meaning |
|-------|---------|
| `//button[text()='Log Out']` | Find a BUTTON with this text |
| `//*[text()='Log Out']` | Find ANY element with this text |

**Use `*` when:**
- You're not sure which tag the element uses
- There's only ONE element on the page with that text (tag doesn't matter)
- You want a shorter, more flexible locator

**Use specific tag when:**
- Multiple elements have the same text but different tags
- You need to be precise (e.g., there's a `<span>Log Out</span>` AND a `<button>Log Out</button>`)

---

## Star (*) in Other XPath Patterns

The `*` works anywhere you'd put a tag name:

```
//*[@id='username']              → Any tag with this ID
//*[contains(@class, 'submit')] → Any tag with class containing "submit"
//*[@placeholder='Email']        → Any tag with this placeholder
```

**CSS equivalent:** There is NO star wildcard in CSS for tag names. This is XPath-only.

---

## Important: No CSS Equivalent for text()

**XPath can find by text:**
```
//button[text()='Log Out']       ✅ Works in XPath
```

**CSS CANNOT find by text:**
```css
button:contains('Log Out')       ❌ Not valid CSS (not supported by browsers)
```

This is one of XPath's **advantages over CSS** — text-based element identification.

---

## driver.close() — Close the Browser

**Code:**
```java
driver.close();    // Closes the current browser window/tab
driver.quit();     // Closes ALL browser windows + ends the WebDriver session
```

| Method | What it closes |
|--------|----------------|
| `driver.close()` | Only the current window/tab |
| `driver.quit()` | ALL windows + kills the driver process |

**Best practice:** Use `driver.quit()` at the end of your test to clean up everything.

---

## Complete End-to-End Flow (Login → Validate → Logout)

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import java.time.Duration;

public class Locators2 {
    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        String name = "Rahul";

        // Open page
        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Login
        driver.findElement(By.cssSelector("#inputUsername")).sendKeys(name);
        driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys("rahulshettyacademy");
        driver.findElement(By.id("chkboxOne")).click();
        driver.findElement(By.xpath("//button[contains(@class,'submit')]")).click();

        Thread.sleep(2000);  // Wait for SPA transition

        // Assert: Success message
        String successMsg = driver.findElement(By.tagName("p")).getText();
        Assert.assertEquals(successMsg, "You are successfully logged in.");

        // Assert: Greeting with username
        String greeting = driver.findElement(By.cssSelector("div.login-container h2")).getText();
        Assert.assertEquals(greeting, "Hello " + name + ",");

        // Logout (using XPath text() locator)
        driver.findElement(By.xpath("//button[text()='Log Out']")).click();

        // Close browser
        driver.close();
    }
}
```

---

## All Locator Types — FINAL Summary

| #  | Locator       | Syntax                               | Best for                          |
|----|--------------|--------------------------------------|-----------------------------------|
| 1  | ID           | `By.id("value")`                     | Elements with unique ID           |
| 2  | Name         | `By.name("value")`                   | Elements with name attribute      |
| 3  | ClassName    | `By.className("value")`              | Elements with unique class        |
| 4  | TagName      | `By.tagName("tag")`                  | When only one tag of that type    |
| 5  | LinkText     | `By.linkText("full text")`           | `<a>` links only                  |
| 6  | PartialLinkText | `By.partialLinkText("partial")`   | `<a>` links with partial text     |
| 7  | CSS Selector | `By.cssSelector("selector")`         | Versatile, fast, many patterns    |
| 8  | XPath        | `By.xpath("expression")`             | Most powerful, traversal, text()  |

---

## All XPath & CSS Patterns Learned

### CSS Patterns:
```css
#id                              /* By ID */
.className                       /* By class */
tagname#id                       /* Tag + ID */
tagname.className                /* Tag + class */
tagname[attr='value']            /* Attribute match */
tagname[attr*='partial']         /* Contains (regex) */
tagname[attr^='start']           /* Starts with */
tagname[attr$='end']             /* Ends with */
parent child                     /* Descendant (space) */
parent > child                   /* Direct child */
:nth-child(n)                    /* Index */
```

### XPath Patterns:
```
//tagname[@attr='value']                    /* Attribute match */
//tagname[contains(@attr, 'partial')]       /* Contains (regex) */
//tagname[starts-with(@attr, 'start')]      /* Starts with */
//tagname[text()='visible text']            /* By text */
//*[text()='text']                          /* Any tag by text */
//parent/child                              /* Direct child */
//parent//descendant                        /* Any descendant */
(//tagname[@attr='value'])[n]               /* Index */
//*[@attr='value']                          /* Star = any tag */
```

---

## Instructor's Advice

> "If you are clear with these locators, then Selenium is cakewalk. Everyone struggles to find locators in writing Selenium automation. Once you are smart in designing locators correctly, the remaining everything is very easy."

> "We are not relying on third-party plugins to copy-paste. Plugins are there today, but might not be tomorrow. If you practice writing on your own, you'll never depend on any tool."

---

## Key Takeaways

1. **XPath text()** — identify ANY element by its visible text (`//button[text()='Log Out']`)
2. **Star (*)** — wildcard tag name, means "any element" (`//*[text()='Log Out']`)
3. **CSS cannot do text search** — this is XPath-only capability
4. **driver.close()** → closes current tab. **driver.quit()** → closes everything
5. **Write locators yourself** — don't depend on plugins. Use them only to validate.
6. **Locators are the CORE** of Selenium — master these, and the rest is easy

---

## Coming Up Next

- Parent-sibling traversal in XPath (last locator concept!)
- Parsing strings to extract password dynamically
- String utilities in Java

---

*Source: Rahul Shetty Academy — Selenium Java Course*

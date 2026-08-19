# Locators in Selenium — Episode 5: LinkText & XPath Basics

## Locator 4: Link Text

**When to use:** When the element is a **link** (anchor tag `<a>`) and has visible text.

**HTML:**
```html
<a href="#">Forgot your password?</a>
```

**How to identify a link:**
- Tag name = `a` (anchor) → it's a link
- The visible text between `<a>` and `</a>` = the link text

**Selenium Code:**
```java
driver.findElement(By.linkText("Forgot your password?")).click();
```

**How it works:**
- `By.linkText(...)` → searches for an `<a>` tag whose FULL visible text matches exactly
- The text must match **completely** (case-sensitive, including punctuation)
- `.click()` → clicks the link to navigate

**Rule:** `By.linkText()` only works on `<a>` (anchor/link) elements. It won't work on buttons, divs, or spans — even if they have text.

**Partial Link Text (alternative):**
```java
driver.findElement(By.partialLinkText("Forgot")).click();
// Matches any link containing "Forgot" in its text
```

---

## Locator 5: XPath — The Universal Locator

### XPath Basic Syntax

```
//tagname[@attribute='value']
```

| Part             | Meaning                           | Example          |
|------------------|-----------------------------------|------------------|
| `//`             | Search anywhere in the page       |                  |
| `tagname`        | HTML tag to look for              | `input`, `button`|
| `@`              | Indicates an attribute follows    |                  |
| `attribute`      | The attribute name                | `placeholder`    |
| `'value'`        | The attribute's value             | `'Username'`     |

---

### XPath vs CSS — Side by Side

| CSS Syntax                     | XPath Syntax                          |
|--------------------------------|---------------------------------------|
| `input[placeholder='Username']`| `//input[@placeholder='Username']`    |
| `input#inputUsername`          | `//input[@id='inputUsername']`        |
| `button.signInBtn`            | `//button[@class='signInBtn']`        |

**Differences:**
- XPath starts with `//` (CSS doesn't)
- XPath uses `@` before attribute (CSS uses `[]` only)
- XPath uses single quotes inside (CSS uses either)

---

### XPath Example — Name Field

**HTML (inspected from Forgot Password page):**
```html
<input type="text" placeholder="Name" name="inputName">
```

**XPath:**
```
//input[@placeholder='Name']
```

**Or using name attribute:**
```
//input[@name='inputName']
```

**Selenium Code:**
```java
driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("John");
```

---

## Console Validation — CSS vs XPath

| Type  | Console Syntax                       | Example                                    |
|-------|--------------------------------------|--------------------------------------------|
| CSS   | `$$("cssSelector")`                  | `$$("input[placeholder='Name']")`          |
| XPath | `$x("xpathExpression")`             | `$x("//input[@placeholder='Name']")`       |

**Important syntax note for XPath in console:**
```js
// XPath uses single quotes inside, so wrap outer in double quotes:
$x("//input[@placeholder='Name']")        // ✅ Correct

// If your XPath has double quotes, use single outside:
$x('//input[@placeholder="Name"]')        // ✅ Also correct

// Single inside single — SYNTAX ERROR:
$x('//input[@placeholder='Name']')        // ❌ Error!
```

---

## Converting Between CSS and XPath

**CSS → XPath:** Add `//` before tag, add `@` before attribute
```
CSS:    input[placeholder='Name']
XPath:  //input[@placeholder='Name']
```

**XPath → CSS:** Remove `//`, remove `@`
```
XPath:  //input[@placeholder='Name']
CSS:    input[placeholder='Name']
```

---

## Updated Code (Full Flow So Far)

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

        // Open page
        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Enter username (ID locator)
        driver.findElement(By.id("inputUsername")).sendKeys("rahul");

        // Enter wrong password (Name locator)
        driver.findElement(By.name("inputPassword")).sendKeys("randomPass123");

        // Click Sign In (ClassName locator)
        driver.findElement(By.className("signInBtn")).click();

        // Get error message (CSS selector)
        String errorMsg = driver.findElement(By.cssSelector("p.error")).getText();
        System.out.println(errorMsg);  // "Incorrect username or password."

        // Click "Forgot your password?" link (LinkText locator)
        driver.findElement(By.linkText("Forgot your password?")).click();

        // Enter name on Forgot Password page (XPath locator)
        driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("John");
    }
}
```

---

## Locators Used So Far — Summary

| Step                    | Locator Used | Code                                          |
|-------------------------|-------------|-----------------------------------------------|
| Enter username          | ID          | `By.id("inputUsername")`                      |
| Enter password          | Name        | `By.name("inputPassword")`                    |
| Click Sign In           | ClassName   | `By.className("signInBtn")`                   |
| Get error message       | CSS         | `By.cssSelector("p.error")`                   |
| Click Forgot Password   | LinkText    | `By.linkText("Forgot your password?")`        |
| Enter name (new page)   | XPath       | `By.xpath("//input[@placeholder='Name']")`    |

---

## Important Concept: We Write Our Own Locators

> "Most training courses blindly generate locators using plugins. Here, we CREATE our own locators using the syntax rules, and only use plugins to VALIDATE that what we wrote is correct."

**The approach:**
1. Inspect the element → see the HTML
2. Choose a locator type (ID, Name, CSS, XPath, etc.)
3. Write the locator manually using syntax rules
4. Validate in console (`$$()` or `$x()`) or SelectorHub
5. Use in Selenium code

---

## Key Takeaways

1. **LinkText** → only for `<a>` (anchor) tags. Pass the full visible text.
2. **XPath syntax:** `//tagname[@attribute='value']`
3. **CSS and XPath are universal** — can be built for ANY element regardless of which attributes exist
4. **Console validation:** `$$("css")` for CSS, `$x("xpath")` for XPath
5. **XPath is an ocean** — many ways to write it (this is just the basic pattern)
6. **Write locators yourself** — don't depend on auto-generators. Use tools only for validation.

---

## Coming Up Next

- Complete the Forgot Password form (email, phone number)
- More XPath techniques (contains, text(), parent, sibling)
- Reset password → retrieve → sign in successfully
- Log out flow

---

*Source: Rahul Shetty Academy — Selenium Java Course*

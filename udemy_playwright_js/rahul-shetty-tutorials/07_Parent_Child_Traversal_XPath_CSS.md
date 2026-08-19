# Locators in Selenium — Episode 7: Parent-to-Child Traversal (XPath & CSS)

## New Concept: Traversing from Parent to Child Using Tags

Until now, we identified elements using **attributes** (id, name, class, placeholder). But what if an element has NO attributes at all?

**Solution:** Navigate from a parent element down to the child element using just **tag names**.

---

## XPath — Parent to Child Traversal

### Syntax

```
//parentTag/childTag
```

| Symbol | Meaning |
|--------|---------|
| `//`   | Find this tag ANYWHERE on the page (starting point) |
| `/`    | Go one level DOWN to a direct child |

### Example — Reach "Forgot your password?" heading

**HTML Structure:**
```html
<form>                           ← Parent
    <h2>Forgot your password?</h2>   ← Child (no attributes!)
    <input placeholder="Name">
    <input placeholder="Email">
    <input placeholder="Phone Number">
</form>
```

**XPath:**
```
//form/h2
```

**How it works:**
1. `//form` → find the `<form>` tag anywhere on the page
2. `/h2` → go to its direct child with tag `<h2>`
3. Result: "Forgot your password?" is highlighted ✓

**Key rule:**
- `//` (double slash) = search ENTIRE page for this tag
- `/` (single slash) = search ONLY inside the parent (direct child)

---

### Example — Reach Phone Number Input (with index)

**Problem:** `//form/input` matches ALL 3 input children!

```
//form/input      → 3 elements matching (Name, Email, Phone)
```

**Fix — add index:**
```
//form/input[3]   → Phone Number field (3rd child input)
```

**Selenium Code:**
```java
driver.findElement(By.xpath("//form/input[3]")).sendKeys("9876543210");
```

---

### When to Use Parent-to-Child Traversal

- Element has **NO attributes** (no id, class, name, placeholder)
- Only a tag name exists (like `<h2>`, `<p>`, `<span>`)
- You can identify it by its POSITION within a parent

---

## CSS — Parent to Child Traversal

### Syntax

```
parentTag childTag
```

That's it — just a **SPACE** between parent and child. No slashes needed.

### Comparison

| Type  | Syntax                  | Example         |
|-------|-------------------------|-----------------|
| XPath | `//parentTag/childTag`  | `//form/h2`     |
| CSS   | `parentTag childTag`    | `form h2`       |

**CSS is simpler** — no slashes, no `//`, just `space` between parent and child.

---

### Example — Get Info Message Text

**HTML:**
```html
<form>
    <p class="infoMessage">Please use temporary password...</p>
</form>
```

**CSS:** `form p` (parent=form, space, child=p)

**Validation in console:**
```js
$$("form p")         // Highlights the message ✓
$$("form p").length  // Check match count
```

**Selenium Code:**
```java
String message = driver.findElement(By.cssSelector("form p")).getText();
System.out.println(message);
```

---

## XPath vs CSS — Parent/Child Syntax Comparison

| Feature                  | XPath                    | CSS                      |
|--------------------------|--------------------------|--------------------------|
| Start searching page     | `//tagname`              | `tagname`                |
| Direct child             | `/childTag`              | ` childTag` (space)      |
| Any descendant           | `//childTag`             | ` childTag` (same space) |
| Index                    | `[3]`                    | `:nth-child(3)`          |
| Full example             | `//form/input[3]`        | `form input:nth-child(3)`|

**CSS key insight:** In CSS, a space means "descendant" (any level below). For direct child ONLY, use `>`:
```css
form > input        /* Direct child only */
form input          /* Any descendant (child, grandchild, etc.) */
```

---

## .className as CSS (Quick Pattern)

**HTML:**
```html
<button class="reset-pwd-btn">Reset Login</button>
```

**CSS:** `.reset-pwd-btn` (just dot + className)

**Selenium Code:**
```java
driver.findElement(By.cssSelector(".reset-pwd-btn")).click();
```

**Remember:** Tag name is optional in CSS. `.className` alone works IF that class is unique on the page.

---

## New Error: ElementClickInterceptedException

**What happened:** After writing all correct locators, the test FAILED when trying to click "Reset Login" button.

**Error message:**
```
ElementClickInterceptedException: element click intercepted -
other element is receiving the click
```

**What it means:**
- Selenium found the button ✓
- Selenium tried to click it ✓
- BUT another element (overlay, loading spinner, banner) was ON TOP of the button
- That overlay received the click instead of the actual button

**Common in:** Single Page Applications (Angular, React) where elements animate/overlay.

**Solution:** Covered in next episode (scroll into view, JavaScript click, or wait for overlay to disappear).

---

## Complete Updated Code

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

        // 4. Get error message (CSS: tagname.class)
        System.out.println(driver.findElement(By.cssSelector("p.error")).getText());

        // 5. Click Forgot Password (LinkText)
        driver.findElement(By.linkText("Forgot your password?")).click();

        // 6. Enter name (XPath: attribute-based)
        driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("John");

        // 7. Enter email (CSS: attribute-based)
        driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@gmail.com");

        // 8. Enter phone (XPath: parent/child with index)
        driver.findElement(By.xpath("//form/input[3]")).sendKeys("9876543210");

        // 9. Click Reset Login (CSS: .className)
        driver.findElement(By.cssSelector(".reset-pwd-btn")).click();
        // ⚠️ This may throw ElementClickInterceptedException!

        // 10. Get info message (CSS: parent child)
        System.out.println(driver.findElement(By.cssSelector("form p")).getText());
    }
}
```

---

## Summary — All XPath/CSS Patterns Learned

| #  | Pattern                           | XPath Example                     | CSS Example                      |
|----|-----------------------------------|-----------------------------------|----------------------------------|
| 1  | By attribute                      | `//input[@placeholder='Name']`    | `input[placeholder='Name']`      |
| 2  | By ID                             | `//input[@id='inputUsername']`    | `input#inputUsername`            |
| 3  | By class                          | `//button[@class='signInBtn']`   | `button.signInBtn`               |
| 4  | With index                        | `(//input[@type='text'])[2]`     | `input[type='text']:nth-child(3)`|
| 5  | Parent → child (tags only)        | `//form/input[3]`                | `form input:nth-child(3)`        |
| 6  | Parent → child (any descendant)   | `//form//p`                      | `form p`                         |

---

## Key Takeaways

1. **Parent/child XPath:** `//parent/child` — single slash = direct child
2. **Parent/child CSS:** `parent child` — just a SPACE = descendant
3. **No attributes needed** — pure tag traversal works when no attributes exist
4. **Double slash `//`** = search anywhere. **Single slash `/`** = search inside parent only
5. **CSS is simpler** — no slashes, just spaces
6. **ElementClickInterceptedException** = another element is blocking the click (solved next episode)
7. **`.className`** alone is valid CSS if the class is unique

---

## Coming Up Next

- Solving ElementClickInterceptedException
- JavaScript executor for forced clicks
- Completing the password reset flow
- Signing in with correct credentials

---

*Source: Rahul Shetty Academy — Selenium Java Course*

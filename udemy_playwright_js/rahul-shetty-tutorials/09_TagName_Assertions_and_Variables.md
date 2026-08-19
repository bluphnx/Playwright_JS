# Locators in Selenium — Episode 9: TagName, Assertions & Variables

## Locator 6: Tag Name

**When to use:** When there's only ONE element with a specific tag name on the page.

**HTML:**
```html
<p>You are successfully logged in.</p>
```

**Selenium Code:**
```java
driver.findElement(By.tagName("p")).getText();
```

**⚠️ Warning:** Tag names are rarely unique. A page usually has many `<p>`, `<div>`, `<input>` tags. Use `By.tagName()` ONLY when you're certain there's just one on the page.

**Alternatives for same element:**
```java
// Using tag name directly
By.tagName("p")

// CSS: just write the tag name (it becomes CSS)
By.cssSelector("p")

// XPath: add // before tag name
By.xpath("//p")

// CSS: parent-to-child traversal
By.cssSelector("div.login-container p")

// XPath: parent-to-child traversal
By.xpath("//div[@class='login-container']/p")
```

All of the above find the same element — multiple approaches, one result.

---

## Assertions with TestNG

### What Are Assertions?

Assertions **automatically compare** expected vs actual values. No more manually reading console output — the test PASSES or FAILS based on the comparison.

### Setup

Make sure TestNG dependency is in your `pom.xml`:
```xml
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
</dependency>
```

**Important:** Remove `<scope>test</scope>` if running from main method (not TestNG runner).

### Assert.assertEquals()

**Syntax:**
```java
Assert.assertEquals(actual, expected);
```

**Code:**
```java
import org.testng.Assert;

// Get actual text from browser
String actualText = driver.findElement(By.tagName("p")).getText();

// Compare with expected
Assert.assertEquals(actualText, "You are successfully logged in.");
```

**Behavior:**
- If actual == expected → ✅ Test PASSES (no output, continues)
- If actual != expected → ❌ Test FAILS with clear error message

**Error message on failure:**
```
Expected: "You are logged in"
Actual:   "You are successfully logged in."
```

---

## Why Implicit Wait Doesn't Help Here

**Scenario:** After clicking Sign In, page transitions (SPA) → you try to find `<p>` tag.

**Problem:** The `<p>` tag ALREADY EXISTS on the current page (error message from before). Implicit wait only helps when an element doesn't exist yet. Since `<p>` exists (wrong one!), Selenium grabs it immediately without waiting for the page transition.

| Situation | Implicit Wait Helps? | Solution |
|-----------|---------------------|----------|
| Element not in DOM yet | ✅ Yes — waits until it appears | Implicit wait works |
| Element exists but on WRONG page | ❌ No — grabs the wrong one immediately | Thread.sleep or Explicit wait |

**Fix:** Add `Thread.sleep(2000)` before finding the element — wait for SPA page transition.

```java
driver.findElement(By.className("signInBtn")).click();
Thread.sleep(2000);  // Wait for page transition
String msg = driver.findElement(By.tagName("p")).getText();
```

---

## Using Variables (Don't Hardcode!)

### The Problem

```java
driver.findElement(By.id("inputUsername")).sendKeys("Rahul");
// ... later ...
Assert.assertEquals(greeting, "Hello Rahul,");
// If you change username, you have to change it in TWO places!
```

### The Solution — Store in a Variable

```java
String name = "Rahul";  // Define ONCE at the top

driver.findElement(By.id("inputUsername")).sendKeys(name);  // Use variable
// ... later ...
Assert.assertEquals(greeting, "Hello " + name + ",");      // Use same variable
```

Now if you change `name = "Sam"`, it automatically updates everywhere.

---

## String Concatenation with Variables

### The Concept

When you need to combine a static string with a variable:

```java
String name = "Rahul";

// WRONG — "name" is treated as literal text:
"Hello name,"           // Result: "Hello name,"

// CORRECT — concatenate with + operator:
"Hello " + name + ","   // Result: "Hello Rahul,"
```

### Rules

```java
"Hello " + name + ","
   ↑         ↑       ↑
 string   variable  string
```

1. Close the string with `"` before the variable
2. Use `+` to concatenate
3. Write the variable name (no quotes!)
4. Use `+` again to resume the string
5. Continue with `"remaining string"`

### More Examples

```java
String product = "iPhone";
int price = 999;

System.out.println("Product: " + product + ", Price: $" + price);
// Output: "Product: iPhone, Price: $999"

Assert.assertEquals(title, "Welcome " + name + " to the dashboard");
// Checks: "Welcome Rahul to the dashboard"
```

---

## Generating Locators from Tag Names

**Tag as CSS:**
```
p              → just the tag name = CSS selector
```

**Tag as XPath:**
```
//p            → add // before tag = XPath expression
```

**Parent-child in CSS (with space):**
```
div.login-container p       → parent space child
```

**Parent-child in XPath (with /):**
```
//div[@class='login-container']/p    → parent / child
```

---

## Complete Code — Happy Path (Login + Assert)

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

        String name = "Rahul";  // Variable — used in multiple places

        // Open page
        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Login with correct credentials
        driver.findElement(By.cssSelector("#inputUsername")).sendKeys(name);
        driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys("rahulshettyacademy");
        driver.findElement(By.id("chkboxOne")).click();
        driver.findElement(By.xpath("//button[contains(@class,'submit')]")).click();

        // Wait for SPA page transition
        Thread.sleep(2000);

        // Assertion 1: Verify success message
        String successMsg = driver.findElement(By.tagName("p")).getText();
        System.out.println(successMsg);
        Assert.assertEquals(successMsg, "You are successfully logged in.");

        // Assertion 2: Verify greeting with username
        String greeting = driver.findElement(By.cssSelector("div.login-container h2")).getText();
        System.out.println(greeting);
        Assert.assertEquals(greeting, "Hello " + name + ",");
    }
}
```

---

## Assertions Summary

| Method | Purpose | Example |
|--------|---------|---------|
| `Assert.assertEquals(actual, expected)` | Exact match | `Assert.assertEquals(title, "Dashboard")` |
| `Assert.assertTrue(condition)` | Condition is true | `Assert.assertTrue(isDisplayed)` |
| `Assert.assertFalse(condition)` | Condition is false | `Assert.assertFalse(isHidden)` |
| `Assert.assertNotNull(object)` | Not null | `Assert.assertNotNull(element)` |

---

## Key Takeaways

1. **By.tagName()** — use only when tag is unique on the page (rare)
2. **Assert.assertEquals(actual, expected)** — auto pass/fail comparison
3. **Implicit wait doesn't help with SPA transitions** — element exists on BOTH pages, Selenium grabs the wrong one
4. **Use variables** — define once at top, use everywhere with `+` concatenation
5. **String concatenation:** `"static text " + variable + " more text"`
6. **Same element, many locators:** tagName, CSS, XPath, parent/child — all valid approaches
7. **TestNG assertions** replace manual console checking — tests are self-validating

---

## Coming Up Next

- Log out flow
- getAttribute() method
- String utilities to parse text
- Summary of all locators

---

*Source: Rahul Shetty Academy — Selenium Java Course*

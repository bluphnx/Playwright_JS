# Locators in Selenium — Episode 11: String Parsing, Methods & Dynamic Password

## The Problem: Hardcoded Password

```java
driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys("rahulshettyacademy");
//                                                                  ↑ HARDCODED — breaks if password changes!
```

If the application changes the password daily, this test breaks. We need to **dynamically extract** the password from the "Forgot Password" flow.

---

## The Solution: Create a Reusable Method

### Step 1: Create a getPassword() Method

```java
static String getPassword(WebDriver driver) throws InterruptedException {

    // Click Forgot Password
    driver.findElement(By.linkText("Forgot your password?")).click();
    Thread.sleep(1000);

    // Click Reset Login (don't need to fill form — password shows anyway)
    driver.findElement(By.cssSelector(".reset-pwd-btn")).click();

    // Grab the full message text
    String passwordText = driver.findElement(By.cssSelector("form p")).getText();
    // passwordText = "Please use temporary password 'rahulshettyacademy' to Login."

    // Extract the actual password using split()
    String password = passwordText.split("'")[1].split("'")[0];

    // Click GO TO LOGIN
    driver.findElement(By.xpath("//div[contains(@class,'forgot-pwd-btn-container')]/button[1]")).click();
    Thread.sleep(1000);

    return password;  // Returns "rahulshettyacademy"
}
```

### Step 2: Call the Method in Main

```java
public static void main(String[] args) throws InterruptedException {
    // ... setup code ...

    // Get password dynamically (instead of hardcoding)
    String password = getPassword(driver);

    // Use the extracted password
    driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys(password);
    // ...
}
```

---

## String split() — How It Works

### The Concept

`split()` breaks a string into an array based on a delimiter character.

```java
String text = "Please use temporary password 'rahulshettyacademy' to Login.";
```

**Goal:** Extract `rahulshettyacademy` from this string.

### Step-by-Step Splitting

**Split 1 — by single quote `'`:**
```java
String[] parts = text.split("'");
```

**What happens:**
```
Original: "Please use temporary password 'rahulshettyacademy' to Login."
                                        ↑ split here            ↑ split here

Result array:
  parts[0] = "Please use temporary password "
  parts[1] = "rahulshettyacademy"
  parts[2] = " to Login."
```

**Get the password:**
```java
String password = parts[1];  // "rahulshettyacademy" ✓
```

### One-Liner Version

```java
String password = passwordText.split("'")[1];
// Split by ' → get index 1 → "rahulshettyacademy"
```

---

### Alternative: Double Split

If the text was: `"password 'rahulshettyacademy' to Login"`

```java
// First split: get everything after first '
String afterFirstQuote = text.split("'")[1];
// afterFirstQuote = "rahulshettyacademy' to Login"

// Second split: get everything before second '
String password = afterFirstQuote.split("'")[0];
// password = "rahulshettyacademy"
```

**Combined one-liner:**
```java
String password = text.split("'")[1].split("'")[0];
```

**However**, since the first split already gives us exactly what we need at index [1], the double split isn't necessary here. The simpler version:
```java
String password = text.split("'")[1];  // Enough!
```

---

## split() — Visual Examples

```java
"Hello World".split(" ")
// → ["Hello", "World"]

"a,b,c,d".split(",")
// → ["a", "b", "c", "d"]

"2023-08-19".split("-")
// → ["2023", "08", "19"]

"name@email.com".split("@")
// → ["name", "email.com"]
```

**Rule:** The character you pass to `split()` becomes the "cutting point." Left side goes to one index, right side to the next.

---

## Methods in Java — Key Concepts

### Method Structure

```java
static String getPassword(WebDriver driver) throws InterruptedException {
    // ... code ...
    return password;
}
```

| Part | Meaning |
|------|---------|
| `static` | Can be called without creating an object of the class |
| `String` | Return type — this method gives back a String |
| `getPassword` | Method name |
| `WebDriver driver` | Input parameter — receives the driver from caller |
| `throws InterruptedException` | Required because Thread.sleep is used inside |
| `return password` | Sends the result back to whoever called this method |

### void vs String Return Type

```java
static void doSomething() {
    // Does work but returns NOTHING
}

static String getPassword() {
    // Does work and returns a String value
    return "rahulshettyacademy";
}
```

- `void` = no return value. Method just does actions.
- `String` = returns a string. Caller can store it: `String x = getPassword();`

### Passing Driver to the Method

```java
// Main block: driver is created here
WebDriver driver = new ChromeDriver();

// Pass driver to the method
String password = getPassword(driver);  // ← sending driver as input
```

```java
// Method receives it:
static String getPassword(WebDriver driver) {
    // Now this method can use the SAME driver object
    driver.findElement(...);  // Uses the browser that main created
}
```

**Why?** The driver variable is only accessible within the block where it's declared (scope). To use it in another method, you must PASS it as a parameter.

---

## Complete Dynamic Flow

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

        driver.get("https://rahulshettyacademy.com/locatorspractice");

        // Step 1: Get password dynamically (no hardcoding!)
        String password = getPassword(driver);
        System.out.println("Extracted password: " + password);

        // Step 2: Login with extracted password
        driver.findElement(By.cssSelector("#inputUsername")).sendKeys(name);
        driver.findElement(By.cssSelector("input[type*='pass']")).sendKeys(password);
        driver.findElement(By.id("chkboxOne")).click();
        driver.findElement(By.xpath("//button[contains(@class,'submit')]")).click();

        Thread.sleep(2000);

        // Step 3: Validate
        Assert.assertEquals(
            driver.findElement(By.tagName("p")).getText(),
            "You are successfully logged in."
        );
        Assert.assertEquals(
            driver.findElement(By.cssSelector("div.login-container h2")).getText(),
            "Hello " + name + ","
        );

        // Step 4: Logout
        driver.findElement(By.xpath("//button[text()='Log Out']")).click();
        driver.close();
    }

    // Reusable method — extracts password from Forgot Password flow
    static String getPassword(WebDriver driver) throws InterruptedException {
        driver.findElement(By.linkText("Forgot your password?")).click();
        Thread.sleep(1000);

        driver.findElement(By.cssSelector(".reset-pwd-btn")).click();

        String passwordText = driver.findElement(By.cssSelector("form p")).getText();
        String password = passwordText.split("'")[1];

        driver.findElement(By.xpath("//div[contains(@class,'forgot-pwd-btn-container')]/button[1]")).click();
        Thread.sleep(1000);

        return password;
    }
}
```

---

## Why This Matters — Dynamic vs Hardcoded

| Approach | Code | What happens if password changes? |
|----------|------|-----------------------------------|
| Hardcoded | `sendKeys("rahulshettyacademy")` | ❌ Test FAILS — must update manually |
| Dynamic | `sendKeys(password)` (from method) | ✅ Test PASSES — auto-extracts new password |

**Rule:** Never hardcode values that can change. Extract them at runtime.

---

## Key Takeaways

1. **split("character")** → breaks string into array at that character
2. **Access array index:** `array[0]` = first piece, `array[1]` = second piece
3. **Chaining split:** `text.split("'")[1]` → split and access index in one line
4. **Methods** → reusable blocks of code. Define once, call many times.
5. **Return type** → `void` = no return, `String` = returns a string
6. **Pass driver to methods** → share the same browser instance across methods
7. **static** → allows calling the method directly without creating an object
8. **Dynamic > Hardcoded** → always extract changing values at runtime

---

## Section Complete! 🎉

This concludes the Locators section. You've learned:
- All 8 locator types (ID, Name, ClassName, TagName, LinkText, PartialLinkText, CSS, XPath)
- Multiple CSS and XPath patterns (attribute, regex, parent/child, text, index)
- Actions (sendKeys, click, getText, clear)
- Implicit wait and Thread.sleep
- Assertions with TestNG
- String parsing with split()
- Creating reusable methods

---

*Source: Rahul Shetty Academy — Selenium Java Course*

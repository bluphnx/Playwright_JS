# Locators in Selenium — Episode 14: Child-to-Parent Traversal & Locators Summary

## Child to Parent — Going UP the DOM

### Syntax

```
/parent::tagname
```

### Example

**HTML Structure:**
```html
<header>                              ← Grandparent
    <a href="...">Link</a>            ← Uncle (sibling of div)
    <div>                             ← Parent
        <button>Practice</button>     ← Current element (Child)
        <button>Login</button>
        <button>Signup</button>
    </div>
</header>
```

**Starting point:** `//header/div/button[1]` (Practice button)

**Go UP to parent div:**
```
//header/div/button[1]/parent::div
```

**Go UP to grandparent header:**
```
//header/div/button[1]/parent::div/parent::header
```

**From grandparent, go DOWN to anchor link:**
```
//header/div/button[1]/parent::div/parent::header/a
```

---

### Step-by-Step Visualization

```
Step 1: //header/div/button[1]
        → Lands on "Practice" button

Step 2: /parent::div
        → Goes UP to parent <div>

Step 3: /parent::header
        → Goes UP again to grandparent <header>

Step 4: /a
        → Goes DOWN to child <a> (anchor link)
```

**Result:** Starting from "Practice" button → traveled UP twice → then DOWN to the `<a>` link.

---

## Alternative: Going Up then Down to Reach Login

**Instead of using following-sibling, you can:**

```
//header/div/button[1]/parent::div/button[2]
```

**What this does:**
1. Start at Practice button (`button[1]`)
2. Go UP to parent div (`/parent::div`)
3. Come back DOWN to Login button (`/button[2]`)

**Same result as sibling approach, different path!**

---

## Two Ways to Reach the Same Element

| Approach | XPath | Technique |
|----------|-------|-----------|
| Sibling | `//header/div/button[1]/following-sibling::button[1]` | Sideways |
| Parent + Child | `//header/div/button[1]/parent::div/button[2]` | Up then Down |

Both reach the "Login" button — just different traversal strategies.

---

## CSS Cannot Go UP — XPath Only!

**This is XPath's biggest advantage over CSS:**

| Direction | XPath | CSS |
|-----------|-------|-----|
| Down (parent → child) | ✅ `/child` | ✅ `parent child` |
| Sideways (sibling) | ✅ `/following-sibling::tag` | ❌ Not possible |
| Up (child → parent) | ✅ `/parent::tag` | ❌ Not possible |

**Interview answer:**
> "CSS selectors can only traverse downward in the DOM — parent to child. XPath can go in all directions: down, sideways (following-sibling, preceding-sibling), and up (parent::). This is the main advantage of XPath over CSS, though CSS is faster for standard queries."

---

## All Traversal Axes — Complete Reference

| Axis | Syntax | Direction | Example |
|------|--------|-----------|---------|
| Child | `/tag` | ↓ Down (direct) | `//div/button` |
| Descendant | `//tag` | ↓ Down (any level) | `//div//span` |
| Parent | `/parent::tag` | ↑ Up (one level) | `//button/parent::div` |
| Ancestor | `/ancestor::tag` | ↑ Up (any level) | `//button/ancestor::header` |
| Following-sibling | `/following-sibling::tag` | → Right (next sibling) | `//button[1]/following-sibling::button[1]` |
| Preceding-sibling | `/preceding-sibling::tag` | ← Left (previous sibling) | `//button[2]/preceding-sibling::button[1]` |

---

## Interview Scenario — Traversal Challenge

**Q:** "Given the XPath for element A, how do you reach element B which is in A's grandparent's other child?"

**Strategy:**
1. From A → go UP to parent (`/parent::tag`)
2. From parent → go UP again to grandparent (`/parent::tag`)
3. From grandparent → go DOWN to the target child (`/childTag`)

**Example:**
```
//header/div/button[1]/parent::div/parent::header/a
```

This goes: Practice → div → header → `<a>` link

---

## Selenium Code — Both Approaches

```java
driver.get("https://rahulshettyacademy.com/AutomationPractice/");

// Approach 1: Sibling traversal
String loginText1 = driver.findElement(By.xpath(
    "//header/div/button[1]/following-sibling::button[1]"
)).getText();
System.out.println(loginText1);  // "Login"

// Approach 2: Parent + child traversal
String loginText2 = driver.findElement(By.xpath(
    "//header/div/button[1]/parent::div/button[2]"
)).getText();
System.out.println(loginText2);  // "Login"
```

---

## 🎉 LOCATORS SECTION COMPLETE — FULL SUMMARY

### All 8 Locator Types

| # | Locator | Syntax | Best for |
|---|---------|--------|----------|
| 1 | ID | `By.id("value")` | Unique ID attribute |
| 2 | Name | `By.name("value")` | Name attribute |
| 3 | ClassName | `By.className("value")` | Unique class |
| 4 | TagName | `By.tagName("tag")` | Only one tag of that type |
| 5 | LinkText | `By.linkText("text")` | `<a>` links only |
| 6 | PartialLinkText | `By.partialLinkText("partial")` | Partial link text |
| 7 | CSS Selector | `By.cssSelector("selector")` | Fast, versatile |
| 8 | XPath | `By.xpath("expression")` | Most powerful, all directions |

### All CSS Patterns

```css
#id                              /* By ID */
.className                       /* By class */
tagname#id                       /* Tag + ID */
tagname.className                /* Tag + class */
tagname[attr='value']            /* Exact attribute */
tagname[attr*='partial']         /* Contains */
tagname[attr^='start']           /* Starts with */
tagname[attr$='end']             /* Ends with */
parent child                     /* Descendant (space) */
parent > child                   /* Direct child */
:nth-child(n)                    /* Index */
```

### All XPath Patterns

```
//tagname[@attr='value']                         /* Attribute match */
//tagname[contains(@attr, 'partial')]            /* Contains */
//tagname[starts-with(@attr, 'start')]           /* Starts with */
//tagname[text()='visible text']                 /* By text */
//*[text()='text']                               /* Any tag by text */
//parent/child                                   /* Direct child */
//parent//descendant                             /* Any descendant */
(//tagname[@attr='value'])[n]                    /* Index */
//*[@attr='value']                               /* Star = any tag */
/following-sibling::tagname[n]                   /* Next sibling */
/preceding-sibling::tagname[n]                   /* Previous sibling */
/parent::tagname                                 /* Go to parent */
/ancestor::tagname                               /* Go to any ancestor */
```

### All Actions

| Action | Method | Use for |
|--------|--------|---------|
| Type | `.sendKeys("text")` | Input fields |
| Click | `.click()` | Buttons, links |
| Read text | `.getText()` | Any element |
| Clear | `.clear()` | Input fields |

### Key Concepts

| Concept | What it does |
|---------|--------------|
| Implicit Wait | Wait for element to APPEAR (global) |
| Thread.sleep | Hard pause (for SPA transitions) |
| Assert.assertEquals | Auto pass/fail comparison |
| split() | Break string into array |
| Variables | Avoid hardcoding, define once use everywhere |
| String concatenation | `"text " + variable + " text"` |

---

## What's Next

With locators mastered, upcoming sections cover:
- Handling dropdowns, checkboxes, radio buttons
- Handling multiple windows/tabs
- Handling frames/iframes
- Explicit waits (WebDriverWait)
- Actions class (hover, drag-drop, keyboard)
- Page Object Model
- TestNG framework

---

*Source: Rahul Shetty Academy — Selenium Java Course*
*Section: Locators — COMPLETE (Episodes 1-14)*

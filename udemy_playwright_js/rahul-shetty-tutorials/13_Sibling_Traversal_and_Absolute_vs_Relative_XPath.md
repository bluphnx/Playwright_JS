# Locators in Selenium — Episode 13: Sibling Traversal & Absolute vs Relative XPath

## Absolute XPath vs Relative XPath

### Absolute XPath — Start from Root

```
/html/body/header/div/button[1]
```

- Starts with single slash `/`
- Begins from the root `<html>` element
- Traverses every level from top to target
- **Very long and fragile** — if any tag in the middle changes, it breaks

### Relative XPath — Start from Anywhere

```
//header/div/button[1]
```

- Starts with double slash `//`
- Jumps directly to any element on the page
- Much shorter and resilient
- **Recommended approach** — doesn't break if upper hierarchy changes

### Comparison

| Feature         | Absolute XPath                    | Relative XPath                |
|-----------------|-----------------------------------|-------------------------------|
| Starts with     | `/` (single slash)                | `//` (double slash)           |
| Starting point  | Root `<html>` element             | Anywhere in the DOM           |
| Length          | Very long                         | Short                         |
| Fragility       | ❌ Breaks if middle changes       | ✅ Resilient                  |
| Example         | `/html/body/div/header/div/button`| `//header/div/button[1]`      |
| Recommendation  | ❌ Avoid                          | ✅ Always use this            |

### Interview Answer

**Q: "What is the difference between absolute and relative XPath?"**

**A:** "Absolute XPath starts from the root html element with a single slash and traverses every level — it's long and fragile. Relative XPath starts with double slash and can jump directly to any element in the middle of the DOM — it's shorter and more resilient to structural changes. I always use relative XPath in my automation."

---

## Sibling Traversal — following-sibling

### The Problem

You're on one element and want to move to its **sibling** (same level, same parent).

**HTML Structure:**
```html
<div>                          ← Parent
    <button>Practice</button>  ← Child 1 (sibling)
    <button>Login</button>     ← Child 2 (sibling) ← Want this!
    <button>Signup</button>    ← Child 3 (sibling)
</div>
```

**Wrong approach:**
```
//header/div/button[1]/button     ❌ Zero matches!
```
`/button` means "find child button inside this button" — a button doesn't have child buttons! Slash only works for parent → child.

### The Correct Approach — following-sibling

**Syntax:**
```
//current-element/following-sibling::tagname
```

**Example — from Practice button, reach Login button:**
```
//header/div/button[1]/following-sibling::button[1]
```

**Breakdown:**

| Part | Meaning |
|------|---------|
| `//header/div/button[1]` | Reach the "Practice" button |
| `/following-sibling::` | Now look for siblings AFTER this element |
| `button[1]` | First sibling button = "Login" |

### How following-sibling Works

```
Current element: Practice (button[1])
                     ↓ following-sibling::button
                 Login (button[1] of siblings)  ← First following sibling
                 Signup (button[2] of siblings) ← Second following sibling
```

- `following-sibling::button[1]` → Login (first button sibling after Practice)
- `following-sibling::button[2]` → Signup (second button sibling after Practice)

---

### Common Mistake: Slash vs Following-Sibling

```
//div/button[1]/button            ❌ WRONG — looks for child button inside a button
//div/button[1]/following-sibling::button[1]   ✅ CORRECT — moves to next sibling
```

**Rule:**
- `/tagname` = go DOWN to child
- `/following-sibling::tagname` = go SIDEWAYS to sibling
- They're at the SAME level, not parent-child

---

## Sibling Syntax Details

```
/following-sibling::tagname[index]
```

| Part | Meaning |
|------|---------|
| `/` | From the current element... |
| `following-sibling` | ...look for siblings that come AFTER |
| `::` | (double colon — required syntax separator) |
| `tagname` | The tag of the sibling you want |
| `[index]` | Which sibling (if multiple) |

---

## Identifying Parent-Child Relationships in DevTools

**How to know if elements are children of a parent:**

1. In Elements tab, click the collapse arrow (▶) on the parent tag
2. If elements **disappear** when collapsed → they're children of that parent
3. If elements **stay visible** → they're at the same level or higher

**Visual:**
```
▶ <div>         ← Click to collapse
    <button>Practice</button>   ← These disappear = they're children
    <button>Login</button>
    <button>Signup</button>
  </div>
```

---

## Combining Parent/Child + Sibling (Mixed XPath)

**Full XPath:**
```
//header/div/button[1]/following-sibling::button[1]
```

**This XPath uses TWO techniques:**

```
//header/div/button[1]          ← Parent-to-child traversal
                    /following-sibling::button[1]   ← Sibling traversal
```

| Section | Technique | What it does |
|---------|-----------|--------------|
| `//header/div/button[1]` | Parent → child | Navigate down the DOM tree |
| `/following-sibling::button[1]` | Sibling → sibling | Move sideways to next button |

---

## Selenium Code

```java
// URL
driver.get("https://rahulshettyacademy.com/AutomationPractice/");

// Find Login button using sibling traversal from Practice button
String text = driver.findElement(By.xpath(
    "//header/div/button[1]/following-sibling::button[1]"
)).getText();

System.out.println(text);  // Output: "Login"
```

---

## All Traversal Types in XPath

| Direction | Syntax | Example | Meaning |
|-----------|--------|---------|---------|
| Parent → Child | `/childTag` | `//div/button` | Go DOWN one level |
| Parent → Any Descendant | `//descendantTag` | `//div//span` | Go DOWN any level |
| Sibling → Next Sibling | `/following-sibling::tag` | `//button[1]/following-sibling::button[1]` | Go SIDEWAYS (forward) |
| Sibling → Previous Sibling | `/preceding-sibling::tag` | `//button[2]/preceding-sibling::button[1]` | Go SIDEWAYS (backward) |
| Child → Parent | `/parent::tag` or `/..` | `//button/parent::div` | Go UP one level |

---

## preceding-sibling (Bonus — Go Backward)

If you're on "Login" and want to reach "Practice" (go backward):

```
//header/div/button[2]/preceding-sibling::button[1]
```

- `following-sibling` = siblings AFTER current element
- `preceding-sibling` = siblings BEFORE current element

---

## Interview Question

**Q: "How do you traverse from one sibling to another in XPath?"**

**A:** "You use the `following-sibling` or `preceding-sibling` axis. For example, if I'm on a 'Name' label and want to reach its adjacent input field, I'd write: `//label[text()='Name']/following-sibling::input[1]`. This is useful when elements don't have unique attributes but can be identified by their position relative to a known sibling."

---

## Key Takeaways

1. **Absolute XPath** (`/html/body/...`) — starts from root, long, fragile. AVOID.
2. **Relative XPath** (`//tag/...`) — starts from middle, short, resilient. ALWAYS USE.
3. **`/` = parent to child** (go DOWN)
4. **`/following-sibling::tag` = sibling to sibling** (go SIDEWAYS)
5. **You CANNOT use `/tag` to move between siblings** — that only goes down
6. **Double colon `::` is required** after following-sibling/preceding-sibling
7. **Identify children in DevTools** — collapse parent, see what disappears

---

## Coming Up Next

- Child to parent traversal (`parent::` and `..`)
- Final XPath concepts
- Summary of all traversal directions

---

*Source: Rahul Shetty Academy — Selenium Java Course*

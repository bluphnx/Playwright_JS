# XPath & CSS Selector Cheatsheet

## Verify Locators in Browser Console (No Tools Needed)

| Type        | Console Command | Example                                                       |
|-------------|-----------------|---------------------------------------------------------------|
| XPath       | `$x("xpath")`   | `$x("//span[@aria-label='Monday, 14 September 2026']")`       |
| CSS         | `$$("css")`     | `$$("#UniqueSellingPoints div.ecb8d66605")`                   |
| Check count | `.length`       | `$x("//span[text()='16']").length`                            |

- Returns **1** → unique ✓
- Returns **multiple** → not unique, refine it
- Returns **0** → doesn't match anything

Also: **Elements tab → Ctrl+F → paste locator** → shows "1 of 1" or "1 of 5"

---

## CSS to XPath Conversion

| CSS Selector         | XPath Equivalent                                  | Meaning                      |
|----------------------|---------------------------------------------------|------------------------------|
| `#id`                | `//*[@id='id']`                                   | By ID                        |
| `.class`             | `//*[contains(@class,'class')]`                   | By class                     |
| `div.class`          | `//div[contains(@class,'class')]`                 | Tag + class                  |
| `[attr='val']`       | `//*[@attr='val']`                                | By attribute                 |
| `[attr*='partial']`  | `//*[contains(@attr,'partial')]`                  | Partial attribute            |
| `parent child`       | `//parent//child`                                 | Any descendant (space)       |
| `parent > child`     | `//parent/child`                                  | Direct child only            |
| `#id .class`         | `//*[@id='id']//*[contains(@class,'class')]`      | ID → descendant with class   |

---

## Real Example

**CSS:**
```css
#UniqueSellingPoints div.ecb8d66605
```

**XPath (any descendant):**
```xpath
//*[@id='UniqueSellingPoints']//div[contains(@class,'ecb8d66605')]
```

**XPath (direct child only):**
```xpath
//*[@id='UniqueSellingPoints']/div[contains(@class,'ecb8d66605')]
```

**Console verification:**
```js
// CSS
$$("#UniqueSellingPoints div.ecb8d66605").length

// XPath
$x("//*[@id='UniqueSellingPoints']//div[contains(@class,'ecb8d66605')]").length
```

---

## XPath-Only Features (CSS Can't Do This)

| Feature          | XPath                                                | Description         |
|------------------|------------------------------------------------------|---------------------|
| Parent traversal | `//span[text()='Submit']/parent::button`             | Go UP the DOM       |
| Text search      | `//button[text()='Login']`                           | Find by exact text  |
| Contains text    | `//div[contains(text(),'Welcome')]`                  | Partial text match  |
| Sibling          | `//label[text()='Email']/following-sibling::input`   | Next sibling        |
| Index            | `(//span[text()='16'])[1]`                           | First match         |

---

## Key Differences

| Feature        | CSS Selector                    | XPath                          |
|----------------|---------------------------------|--------------------------------|
| Direction      | Top-down only (parent → child)  | Can go UP (child → parent)     |
| Speed          | Faster (browser-native)         | Slightly slower                |
| Text search    | ❌ Not supported                | ✅ `text()='...'`             |
| Parent access  | ❌ Cannot                       | ✅ `parent::` or `..`         |
| Readability    | Shorter, cleaner                | Longer, more verbose           |
| Recommendation | Default choice (90% cases)      | When need parent/text          |

---

## Slash Rules in XPath

| Symbol | Meaning                           | Example                         |
|--------|-----------------------------------|---------------------------------|
| `/`    | Direct child (one level down)     | `/html/body/div`                |
| `//`   | Any descendant (any level below)  | `//div[@id='main']//span`       |
| `..`   | Parent (one level up)             | `//span[@class='icon']/..`      |

---

## When to Use What (Interview Answer)

> "I use CSS selectors as my default strategy because they're faster and more readable. I switch to XPath only when I need to traverse UP the DOM (parent access) or locate elements by their text content — both of which CSS cannot do."

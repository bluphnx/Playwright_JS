# Locator Quick Reference — XPath & CSS Cheatsheet

## CSS Selector Patterns

| #  | Pattern              | CSS Syntax                      | Example                              | Validate in Elements (Ctrl+F) | Validate in Console          |
|----|----------------------|---------------------------------|--------------------------------------|-------------------------------|------------------------------|
| 1  | By ID                | `#idValue`                      | `#inputUsername`                     | `#inputUsername`              | `$$("#inputUsername")`       |
| 2  | By Class             | `.className`                    | `.signInBtn`                         | `.signInBtn`                  | `$$(".signInBtn")`           |
| 3  | Tag + ID             | `tag#id`                        | `input#inputUsername`                | `input#inputUsername`         | `$$("input#inputUsername")`  |
| 4  | Tag + Class          | `tag.class`                     | `button.signInBtn`                   | `button.signInBtn`            | `$$("button.signInBtn")`     |
| 5  | Exact Attribute      | `tag[attr='value']`             | `input[placeholder='Email']`         | `input[placeholder='Email']`  | `$$("input[placeholder='Email']")` |
| 6  | Contains             | `tag[attr*='partial']`          | `input[type*='pass']`                | `input[type*='pass']`         | `$$("input[type*='pass']")`  |
| 7  | Starts with          | `tag[attr^='start']`            | `input[name^='input']`               | `input[name^='input']`        | `$$("input[name^='input']")` |
| 8  | Ends with            | `tag[attr$='end']`              | `input[name$='word']`                | `input[name$='word']`         | `$$("input[name$='word']")`  |
| 9  | Descendant (space)   | `parent child`                  | `form p`                             | `form p`                      | `$$("form p")`               |
| 10 | Direct child         | `parent > child`                | `form > input`                       | `form > input`                | `$$("form > input")`         |
| 11 | Index (nth-child)    | `tag:nth-child(n)`              | `input:nth-child(3)`                 | `input:nth-child(3)`          | `$$("input:nth-child(3)")`   |

---

## XPath Patterns

| #  | Pattern              | XPath Syntax                                    | Example                                           | Validate in Elements (Ctrl+F)                    | Validate in Console                               |
|----|----------------------|-------------------------------------------------|---------------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| 1  | Exact Attribute      | `//tag[@attr='value']`                          | `//input[@id='inputUsername']`                    | `//input[@id='inputUsername']`                   | `$x("//input[@id='inputUsername']")`              |
| 2  | Contains             | `//tag[contains(@attr,'partial')]`              | `//input[contains(@type,'pass')]`                 | `//input[contains(@type,'pass')]`                | `$x("//input[contains(@type,'pass')]")`           |
| 3  | Starts with          | `//tag[starts-with(@attr,'start')]`             | `//input[starts-with(@name,'input')]`             | `//input[starts-with(@name,'input')]`            | `$x("//input[starts-with(@name,'input')]")`       |
| 4  | By text              | `//tag[text()='text']`                          | `//button[text()='Log Out']`                      | `//button[text()='Log Out']`                     | `$x("//button[text()='Log Out']")`                |
| 5  | Any tag (star)       | `//*[@attr='value']`                            | `//*[@id='inputUsername']`                         | `//*[@id='inputUsername']`                        | `$x("//*[@id='inputUsername']")`                   |
| 6  | Any tag + text       | `//*[text()='text']`                            | `//*[text()='Login']`                              | `//*[text()='Login']`                             | `$x("//*[text()='Login']")`                        |
| 7  | Index                | `(//tag[@attr='value'])[n]`                     | `(//input[@type='text'])[2]`                      | `(//input[@type='text'])[2]`                     | `$x("(//input[@type='text'])[2]")`                |
| 8  | Parent → Child       | `//parent/child`                                | `//form/input`                                     | `//form/input`                                    | `$x("//form/input")`                               |
| 9  | Parent → Child + idx | `//parent/child[n]`                             | `//form/input[3]`                                  | `//form/input[3]`                                 | `$x("//form/input[3]")`                            |
| 10 | Following sibling    | `//tag/following-sibling::tag[n]`               | `//button[1]/following-sibling::button[1]`        | `//button[1]/following-sibling::button[1]`       | `$x("//button[1]/following-sibling::button[1]")`  |
| 11 | Preceding sibling    | `//tag/preceding-sibling::tag[n]`               | `//button[2]/preceding-sibling::button[1]`        | `//button[2]/preceding-sibling::button[1]`       | `$x("//button[2]/preceding-sibling::button[1]")` |
| 12 | Child → Parent       | `//tag/parent::tag`                             | `//button/parent::div`                             | `//button/parent::div`                            | `$x("//button/parent::div")`                       |
| 13 | Ancestor (any level) | `//tag/ancestor::tag`                           | `//button/ancestor::header`                        | `//button/ancestor::header`                       | `$x("//button/ancestor::header")`                  |

---

## Validation Methods — Where to Test

| Method                  | Where                        | Syntax                               | Result shows                 |
|-------------------------|------------------------------|--------------------------------------|------------------------------|
| Elements Search (Ctrl+F)| Elements tab → Ctrl+F        | Paste CSS or XPath directly          | "1 of 1" or "1 of 5"        |
| Console CSS             | Console tab                  | `$$("cssSelector")`                  | Array of elements            |
| Console XPath           | Console tab                  | `$x("xpathExpression")`              | Array of elements            |
| Console Count           | Console tab                  | `$$("css").length` or `$x("xpath").length` | Number (1=unique)     |
| SelectorHub plugin      | DevTools → SelectorHub tab   | Type locator → Enter                 | "1 element matching"         |

---

## Selenium Code — By Locator Type

| Locator      | Selenium Code                                    | When to use                          |
|--------------|--------------------------------------------------|--------------------------------------|
| ID           | `By.id("inputUsername")`                         | Element has unique `id` attribute    |
| Name         | `By.name("inputPassword")`                       | Element has `name` attribute         |
| ClassName    | `By.className("signInBtn")`                      | Element has unique class             |
| TagName      | `By.tagName("p")`                                | Only one tag of that type on page    |
| LinkText     | `By.linkText("Forgot your password?")`           | `<a>` links — full text match        |
| PartialLink  | `By.partialLinkText("Forgot")`                   | `<a>` links — partial text match     |
| CSS          | `By.cssSelector("input[placeholder='Email']")`   | Versatile, fast                      |
| XPath        | `By.xpath("//button[text()='Login']")`           | Most powerful, all directions        |

---

## Traversal Directions — Quick Visual

```
                    ↑ /parent::tag (go UP)
                    |
                    |
← /preceding-sibling::tag ── [CURRENT ELEMENT] ── /following-sibling::tag →
                    |
                    |
                    ↓ /childTag (go DOWN)
```

---

## CSS vs XPath — When to Use Which

| Scenario                              | Use CSS                | Use XPath              |
|---------------------------------------|------------------------|------------------------|
| Element has id/class/attribute        | ✅ `#id`, `.class`     | ✅ Works too           |
| Need to find by TEXT                  | ❌ Not possible        | ✅ `text()='...'`      |
| Need to go to PARENT                  | ❌ Not possible        | ✅ `parent::tag`       |
| Need SIBLING traversal               | ❌ Limited             | ✅ `following-sibling` |
| Speed matters                         | ✅ Faster              | ⚠️ Slightly slower     |
| Simple element identification         | ✅ Preferred           | ✅ Works too           |

**Rule of thumb:** Start with CSS. Switch to XPath only when you need text search, parent traversal, or sibling traversal.

---

## Common Mistakes

| Mistake                                    | Wrong                              | Correct                                  |
|--------------------------------------------|------------------------------------|------------------------------------------|
| Missing `@` before attribute               | `//input[id='user']`               | `//input[@id='user']`                    |
| Square brackets for contains               | `//div[contains[class,'btn']]`     | `//div[contains(@class,'btn')]`          |
| Missing quotes around value                | `//input[@id=user]`                | `//input[@id='user']`                    |
| Single slash to start relative XPath       | `/div/input`                       | `//div/input`                            |
| Using `/tag` for sibling                   | `//button[1]/button`               | `//button[1]/following-sibling::button`  |
| CSS trying to go UP                        | `child < parent` (invalid)         | Not possible in CSS — use XPath          |
| Double dots in CSS                         | `..className`                      | `.className`                             |
| `$$` for XPath                             | `$$("//input")`                    | `$x("//input")`                          |
| `$x` for CSS                              | `$x("#id")`                        | `$$("#id")`                              |

---

## Memory Tricks

```
CSS:
  #  = ID        (hashtag = identity)
  .  = Class     (dot notation)
  [] = Attribute (brackets)
  *  = Contains  (wildcard)
  ^  = Starts    (caret = beginning)
  $  = Ends      (dollar = end/bottom)

XPath:
  //  = Relative (start anywhere)
  /   = Direct child (one level)
  @   = Attribute prefix
  ::  = Axis separator (parent::, following-sibling::)
  *   = Any tag
  []  = Filter/condition
```

# Locators in Selenium — Episode 12: Cross-Browser Testing

## Running Tests in Different Browsers

The beauty of Selenium: **same code runs in any browser**. Just change 2 lines (driver setup). All locators (ID, CSS, XPath) are the same across browsers.

---

## Browser Setup — Only 2 Lines Change

### Chrome
```java
System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
WebDriver driver = new ChromeDriver();
```

### Firefox
```java
System.setProperty("webdriver.gecko.driver", "path/to/geckodriver.exe");
WebDriver driver = new FirefoxDriver();
```

### Microsoft Edge
```java
System.setProperty("webdriver.edge.driver", "path/to/msedgedriver.exe");
WebDriver driver = new EdgeDriver();
```

**Everything else stays the same** — locators, actions, assertions. No code changes needed.

---

## Why It Works — WebDriver Interface

```java
WebDriver driver = new ChromeDriver();   // or FirefoxDriver or EdgeDriver
```

- `WebDriver` is an **interface** — defines methods like findElement, get, close
- `ChromeDriver`, `FirefoxDriver`, `EdgeDriver` all **implement** this interface
- Your code talks to `WebDriver` (the interface), not the specific browser
- This is **polymorphism** — same code, different browser behind the scenes

```
            WebDriver (interface)
               /     |      \
      ChromeDriver  FirefoxDriver  EdgeDriver
```

---

## Inspecting Elements in Different Browsers

### Chrome
- Right-click → Inspect → Elements tab
- Console: `$$("css")`, `$x("xpath")`
- Plugins: SelectorHub, ChroPath

### Firefox
- Right-click → Inspect → HTML tab
- Console: `$$("css")`, `$x("xpath")` (same syntax!)
- Plugins: SelectorHub for Firefox

### Edge
- Right-click → Inspect → Elements tab (identical to Chrome)
- Console: same `$$()` and `$x()` syntax
- Plugins: SelectorHub for Edge
- Edge is Chromium-based → looks and works exactly like Chrome DevTools

---

## Key Points

| Question | Answer |
|----------|--------|
| Do locators change per browser? | ❌ No — HTML is the same regardless of browser |
| Do I need separate test code per browser? | ❌ No — only driver setup changes |
| Can I validate locators in any browser? | ✅ Yes — Console `$$()` and `$x()` work everywhere |
| Does SelectorHub work in all browsers? | ✅ Yes — available for Chrome, Firefox, Edge |

---

## DevTools Dock Position

In any browser's DevTools, you can change where it appears:
- **Bottom** — DevTools at the bottom of the page
- **Right** — DevTools on the right side
- **Left** — DevTools on the left
- **Undocked** — Separate window

Change via the three-dot menu (⋮) in DevTools → Dock side.

---

## Comparison with Playwright

| Feature | Selenium | Playwright |
|---------|----------|------------|
| Browser switching | Change 2 lines of code | Change config project name |
| Drivers needed | Download separate driver per browser | Auto-bundled (no downloads) |
| Browsers supported | Chrome, Firefox, Edge, Safari (limited) | Chromium, Firefox, WebKit |
| Cross-browser config | Manual per test file | One config file, all browsers |

**Playwright approach:**
```javascript
// playwright.config.js — runs ALL browsers from one config
projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
]
```

```bash
npx playwright test --project=firefox    # Run in Firefox
npx playwright test                      # Run in ALL browsers
```

---

## Key Takeaways

1. **Same locators work in all browsers** — HTML is universal
2. **Only 2 lines change** — driver path + driver class name
3. **WebDriver interface** enables polymorphism — one code, any browser
4. **Console commands** (`$$`, `$x`) work in Chrome, Firefox, Edge
5. **Inspecting elements** is the same process in every browser
6. **Playwright is simpler** — no separate drivers, config-based browser selection

---

*Source: Rahul Shetty Academy — Selenium Java Course*

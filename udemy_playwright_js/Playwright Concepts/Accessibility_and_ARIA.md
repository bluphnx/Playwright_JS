# Accessibility (a11y) and ARIA — What, Why & How

## What is Accessibility?

Accessibility (a11y) = making websites usable by **EVERYONE**, including people who:

- Are **blind** (use screen readers like NVDA, JAWS, VoiceOver)
- **Can't use a mouse** (navigate with keyboard only)
- Have **low vision** (need high contrast, zoom)
- Have **motor disabilities** (use voice commands, switch devices)
- Are **deaf** (need captions for audio/video)

**Why it matters in testing:**
- ~15% of the world's population has some form of disability
- Many countries have legal requirements (ADA in USA, EAA in EU)
- If your tests use accessibility locators (getByRole), you're testing accessibility for free

---

## What is ARIA?

**ARIA = Accessible Rich Internet Applications**

ARIA attributes are extra HTML attributes added to elements to tell assistive technologies (screen readers) **WHAT an element is** and **WHAT it does**.

Think of ARIA as "labels for blind users" — information that sighted users see visually (a button looks like a button) but blind users need explicitly stated in the code.

---

## Common ARIA Attributes

| Attribute          | Purpose                              | Example                                    |
|--------------------|--------------------------------------|--------------------------------------------|
| `role`             | What the element IS                  | `role="button"`, `role="checkbox"`         |
| `aria-label`       | Name/description for screen readers  | `aria-label="Close dialog"`                |
| `aria-checked`     | Is checkbox/radio checked?           | `aria-checked="true"`                      |
| `aria-hidden`      | Hide element from screen readers     | `aria-hidden="true"`                       |
| `aria-expanded`    | Is dropdown/menu open?               | `aria-expanded="false"`                    |
| `aria-disabled`    | Is element disabled?                 | `aria-disabled="true"`                     |
| `aria-selected`    | Is tab/option selected?              | `aria-selected="true"`                     |
| `aria-required`    | Is field mandatory?                  | `aria-required="true"`                     |
| `aria-placeholder` | Placeholder for screen readers       | `aria-placeholder="Enter name"`            |
| `aria-describedby` | Links to a description element       | `aria-describedby="error-msg"`             |

---

## Why ARIA Exists — The Problem

**Without ARIA (bad):**
```html
<div class="btn-xyz" onclick="submit()">Submit</div>
```

What a sighted user sees: A button that says "Submit" ✓
What a screen reader announces: "generic div" — **useless** for blind users ✗

---

**With ARIA (good):**
```html
<div class="btn-xyz" onclick="submit()" role="button" aria-label="Submit form">Submit</div>
```

What a screen reader announces: "Submit form, button" — **now the blind user knows what it is** ✓

---

**With proper semantic HTML (best):**
```html
<button type="submit">Submit</button>
```

What a screen reader announces: "Submit, button" — **no ARIA needed, HTML tag is enough** ✓

---

## Semantic HTML vs ARIA

| HTML Tag                    | Built-in Role | ARIA Needed?                    |
|-----------------------------|---------------|---------------------------------|
| `<button>`                  | button        | ❌ No — already accessible      |
| `<a href="...">`           | link          | ❌ No — already accessible      |
| `<input type="checkbox">`  | checkbox      | ❌ No — already accessible      |
| `<input type="text">`      | textbox       | ❌ No — already accessible      |
| `<select>`                 | combobox      | ❌ No — already accessible      |
| `<h1>` to `<h6>`          | heading       | ❌ No — already accessible      |
| `<nav>`                    | navigation    | ❌ No — already accessible      |
| `<div onclick="...">`     | generic       | ✅ YES — needs `role="button"`  |
| `<span class="link">`     | generic       | ✅ YES — needs `role="link"`    |

**Rule:** Use proper HTML tags FIRST. Add ARIA only when you can't use semantic HTML.

> "The first rule of ARIA: Don't use ARIA if you can use a native HTML element instead."

---

## How Screen Readers Work

A screen reader builds an **accessibility tree** from the HTML — a simplified structure showing:
- What each element IS (role)
- What it's CALLED (name/label)
- What STATE it's in (checked, expanded, disabled)

```
Accessibility tree for a login form:

heading "Login" (level 1)
├── textbox "Email" (empty)
├── textbox "Password" (empty)
├── checkbox "Remember me" (unchecked)
└── button "Sign In"
```

This is what blind users "see" through their screen reader. If your HTML doesn't produce a clear accessibility tree, blind users can't use your app.

---

## Why getByRole is Accessibility-Friendly

```js
page.getByRole('button', { name: 'Submit' })
```

This finds elements the **same way screen readers find them** — by role + accessible name.

**If your test can't find the button with getByRole → a blind user can't find it either.**

```js
// CSS finds it — but doesn't check accessibility:
page.locator('.btn-xyz')  // ✅ Found! But screen reader might see "generic div"

// getByRole finds it AND validates accessibility:
page.getByRole('button', { name: 'Submit' })  // ✅ Found! AND screen reader can find it too
```

---

## Real Example — Booking.com Calendar

```html
<span data-date="2026-09-07" 
      role="checkbox" 
      aria-label="Monday, September 7, 2026"
      aria-checked="false">
    7
</span>
```

**What sighted users see:** The number "7" in a calendar grid
**What screen readers announce:** "Monday, September 7, 2026, checkbox, not checked"

**Locator using ARIA:**
```js
page.getByRole('checkbox', { name: 'Monday, September 7, 2026' })
```

Without `role` and `aria-label`, a screen reader would just say "7" — which is meaningless.

---

## ARIA Roles — Common Categories

### Widget Roles (Interactive)
| Role       | Used for                    | HTML equivalent          |
|------------|-----------------------------|--------------------------| 
| button     | Clickable actions           | `<button>`               |
| link       | Navigation links            | `<a href>`               |
| checkbox   | Toggle on/off               | `<input type="checkbox">`|
| radio      | Select one from group       | `<input type="radio">`   |
| textbox    | Text input                  | `<input type="text">`    |
| combobox   | Dropdown selection          | `<select>`               |
| slider     | Range input                 | `<input type="range">`   |
| tab        | Tab navigation              | Custom tabs              |
| dialog     | Modal/popup                 | Custom modal             |

### Document Roles (Structural)
| Role        | Used for              | HTML equivalent |
|-------------|-----------------------|-----------------|
| heading     | Section headings      | `<h1>` - `<h6>`|
| list        | List container        | `<ul>`, `<ol>`  |
| listitem    | List item             | `<li>`          |
| navigation  | Nav section           | `<nav>`         |
| main        | Main content          | `<main>`        |
| banner      | Header/banner         | `<header>`      |

---

## How to Use This in Playwright Testing

### Find by role:
```js
page.getByRole('button', { name: 'Login' })
page.getByRole('checkbox', { name: 'Remember me' })
page.getByRole('link', { name: 'Forgot Password?' })
page.getByRole('heading', { name: 'Dashboard', level: 1 })
```

### Find by aria-label:
```js
page.locator('[aria-label="Close dialog"]')
page.getByLabel('Close dialog')  // Same thing, cleaner
```

### Check state with ARIA:
```js
await expect(page.getByRole('checkbox', { name: 'Agree' })).toBeChecked()
await expect(page.locator('[aria-expanded="true"]')).toBeVisible()
```

---

## Interview Answer

**Q: "What is accessibility in web testing?"**

**A:** "Accessibility ensures websites are usable by people with disabilities — blind users with screen readers, keyboard-only users, etc. In my automation, I use Playwright's getByRole locators which find elements the same way screen readers do — by their ARIA role and accessible name. This means my tests implicitly validate accessibility. If getByRole can't find a button, it means a blind user can't find it either — catching accessibility bugs for free without writing separate a11y tests."

**Q: "What is ARIA?"**

**A:** "ARIA stands for Accessible Rich Internet Applications. They're HTML attributes like role, aria-label, and aria-checked that tell screen readers what an element is and what state it's in. For example, a `<div>` styled as a button needs `role='button'` so screen readers announce it correctly. In my Playwright tests, I leverage these ARIA attributes through getByRole for resilient, accessibility-aware locators."

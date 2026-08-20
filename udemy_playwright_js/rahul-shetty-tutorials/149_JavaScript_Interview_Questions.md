# 149 — Top JavaScript Interview Questions (75 mins)

## Table of Contents

| #  | Question                                                              |
|----|-----------------------------------------------------------------------|
| 1  | Can a JavaScript Object Hold a Function as a Property?                |
| 2  | What Are Anonymous Functions?                                         |
| 3  | Differences Between var, let, and const                               |
| 4  | Array Methods — push, pop, shift, unshift, splice, indexOf, forEach   |
| 5  | Is JavaScript Asynchronous? Prove It.                                 |
| 6  | What Are Callback Functions?                                          |
| 7  | What Are Promises? Difference from Callbacks?                         |
| 8  | Inheritance — extends, super, this                                    |
| 9  | == vs === (Equality Operators)                                        |
| 10 | null vs undefined                                                     |
| 11 | filter(), map(), reduce() — Practical Exercise                        |
| 12 | What is Hoisting? (Bonus)                                             |
| 13 | What is Closure? (Bonus)                                              |
| 14 | What is Event Loop? (Bonus)                                           |
| 15 | Difference between for...in and for...of (Bonus)                      |
| 16 | What is Destructuring? (Bonus)                                        |
| 17 | What is the Spread Operator? (Bonus)                                  |
| 18 | What is typeof Operator? (Bonus)                                      |

---

## Q1: Can a JavaScript Object Hold a Function as a Property?

**Answer: YES**

```js
const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log("Hello, I am " + this.name);
    }
};

person.name;      // "John" (no brackets — it's a value)
person.age;       // 30
person.greet();   // "Hello, I am John" (brackets needed — it's a function)
```

**Key points:**
- Object properties can hold strings, numbers, AND functions
- Use `this.propertyName` inside a function to access the object's own properties
- When calling a function property, use **brackets `()`** — without them you get the function reference, not the result

---

## Q2: What Are Anonymous Functions?

**Named function (has a name):**
```js
function sayHello() {
    return "Hello I am the world";
}
const message = sayHello();  // Call by name
```

**Anonymous function (no name):**
```js
const greet = function(name) {
    return "Hello " + name;
};
console.log(greet("John"));  // "Hello John"
```

**Key differences:**
- Named functions can be called anywhere by their name
- Anonymous functions have no name — must be stored in a variable immediately
- Used heavily in: callbacks, event handlers, array methods (map, filter, reduce)

**Arrow function (modern anonymous):**
```js
const greet = (name) => "Hello " + name;
```

---

## Q3: Differences Between var, let, and const

| Feature    | var                        | let                    | const                  |
|------------|----------------------------|------------------------|------------------------|
| Scope      | Function/Global            | Block                  | Block                  |
| Redeclare  | ✅ Yes                     | ❌ No                  | ❌ No                  |
| Reassign   | ✅ Yes                     | ✅ Yes                 | ❌ No                  |
| Default    | If no keyword declared     | —                      | —                      |
| Hoisting   | Yes (initialized undefined)| Yes (not initialized)  | Yes (not initialized)  |

**var — function/global scoped (dangerous!):**
```js
function example() {
    var x = 1;
    if (true) {
        var x = 2;    // SAME variable! Overwrites outer x
        console.log(x); // 2
    }
    console.log(x);     // 2 (not 1! — var doesn't respect block)
}
```

**let — block scoped (safe):**
```js
function example() {
    let x = 1;
    if (true) {
        let x = 2;    // DIFFERENT variable (new scope)
        console.log(x); // 2
    }
    console.log(x);     // 1 (outer x unchanged)
}
```

**const — block scoped + cannot reassign:**
```js
const x = 1;
x = 3;  // ❌ ERROR: Assignment to constant variable
```

**Trick: No keyword = default var:**
```js
if (true) {
    y = 3;  // No let/const/var → treated as var (global!)
}
console.log(y);  // 3 (accessible outside block!)
```

**Best practice:** Always use `const` by default. Use `let` only when reassignment is needed. Never use `var`.

---

## Q4: Array Methods — push, pop, shift, unshift, splice, indexOf, forEach

```js
const fruits = ["apple", "banana", "cherry", "date"];
```

| Method      | What it does                           | Example                        | Result                              |
|-------------|----------------------------------------|--------------------------------|-------------------------------------|
| `push()`    | Add to END                             | `fruits.push("elderberry")`    | `[..., "elderberry"]`               |
| `pop()`     | Remove from END                        | `fruits.pop()`                 | Removes last item                   |
| `unshift()` | Add to BEGINNING                       | `fruits.unshift("fig")`        | `["fig", ...]`                      |
| `shift()`   | Remove from BEGINNING                  | `fruits.shift()`               | Removes first item                  |
| `indexOf()` | Find index of value                    | `fruits.indexOf("cherry")`     | `2`                                 |
| `splice()`  | Remove at specific index               | `fruits.splice(1, 1)`          | Removes "banana"                    |
| `forEach()` | Iterate over all items                 | `fruits.forEach(f => log(f))`  | Prints each fruit                   |

**splice(index, count):**
```js
fruits.splice(1, 1);   // From index 1, remove 1 item (banana)
fruits.splice(1, 2);   // From index 1, remove 2 items (banana + cherry)
```

**forEach:**
```js
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});
// 0: apple, 1: banana, 2: cherry, 3: date
```

---

## Q5: Is JavaScript Asynchronous? Prove It.

**Yes — prove with setTimeout:**

```js
console.log("I am first");
console.log("I am second");
console.log("I am third");
console.log("I am fourth");

setTimeout(() => {
    console.log("I am fifth");
}, 2000);

console.log("I am sixth");
```

**Output:**
```
I am first
I am second
I am third
I am fourth
I am sixth        ← Sixth printed BEFORE fifth!
I am fifth        ← Came after 2 seconds
```

**Why?** JavaScript doesn't wait for the 2-second timer. It continues executing and comes back when the timer is done. This is **asynchronous behavior**.

**The problem this creates:** If you fetch data (takes 2s) and immediately try to use it, the data won't be there yet.

---

## Q6: What Are Callback Functions?

**Definition:** A function passed as an argument to another function, executed after some operation completes.

**The problem:**
```js
fetchData();         // Takes 2 seconds to get data from server
processData(data);   // Executes immediately — but data isn't ready yet!
```

**Solution with callback:**
```js
function fetchData(callback) {
    setTimeout(() => {
        const data = "sample data";
        callback(data);  // Execute callback AFTER data is ready
    }, 2000);
}

function processData(data) {
    console.log("Processing: " + data);
}

function modifyData(data) {
    console.log("Modifying: " + data);
}

// Usage — generic! Any function can be passed
fetchData(processData);   // "Processing: sample data"
fetchData(modifyData);    // "Modifying: sample data"
```

**Why not just call processData directly inside fetchData?**
- Hard-coding makes it non-reusable
- Callback makes it generic — any function can be executed after fetch completes
- Multiple different functions can reuse the same fetchData

---

## Q7: What Are Promises? Difference from Callbacks?

**Promise = an object representing a future value with 3 states:**

| State    | Meaning                          |
|----------|----------------------------------|
| Pending  | Operation still in progress      |
| Resolved | Operation completed successfully |
| Rejected | Operation failed                 |

**Code:**
```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "sample data";
            if (data) {
                resolve(data);      // Success → moves to "resolved"
            } else {
                reject("No data");  // Failure → moves to "rejected"
            }
        }, 2000);
    });
}

// Using .then()
fetchData().then((data) => {
    console.log("Processing: " + data);
});

// Using await (simpler!)
const data = await fetchData();
console.log("Processing: " + data);
```

**How .then() works:**
- `.then()` only executes when promise is **resolved**
- If promise is **pending** → waits
- If promise is **rejected** → skips .then(), goes to .catch()

**await keyword:**
- Pauses execution until promise resolves
- Collects the resolved value into a variable
- Much simpler than .then() chaining

**Why Playwright uses await everywhere:**
```js
await page.goto(url);            // Wait until page loads (promise resolves)
await page.locator('#btn').click(); // Wait until click completes
const text = await locator.textContent(); // Wait until text is retrieved
```

All Playwright methods return Promises — await ensures we wait for the browser to respond.

---

## Q8: Inheritance — extends, super, this

**Parent class:**
```js
class Person {
    constructor(name, age) {
        this.name = name;    // Attach to class instance
        this.age = age;
    }

    getDetails() {
        return `${this.name}, Age: ${this.age}`;
    }
}
```

**Child class (extends parent):**
```js
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);    // MUST call parent constructor first
        this.grade = grade;
    }

    getStudentDetails() {
        return `${super.getDetails()}, Grade: ${this.grade}`;
    }
}
```

**Usage:**
```js
const student = new Student("Alice", 20, "A");
console.log(student.getStudentDetails());
// "Alice, Age: 20, Grade: A"
```

**Keywords explained:**

| Keyword   | Purpose                                              |
|-----------|------------------------------------------------------|
| `extends` | Creates inheritance (child inherits from parent)     |
| `super()` | Calls parent constructor (MUST be first in child constructor) |
| `super.method()` | Calls parent's method from child class        |
| `this`    | Refers to current class instance (accessible everywhere in class) |

---

## Q9: == vs === (Equality Operators)

```js
console.log(5 == "5");    // true  (type coercion — converts string to number)
console.log(5 === "5");   // false (strict — different types)
```

| Operator | Name           | Type check? | Example              | Result |
|----------|----------------|-------------|----------------------|--------|
| `==`     | Loose equality | ❌ No       | `5 == "5"`           | true   |
| `===`    | Strict equality| ✅ Yes      | `5 === "5"`          | false  |
| `!=`     | Loose not equal| ❌ No       | `5 != "5"`           | false  |
| `!==`    | Strict not equal| ✅ Yes     | `5 !== "5"`          | true   |

**Best practice:** Always use `===` (triple equals) for consistency and to avoid type coercion bugs.

---

## Q10: null vs undefined

| Feature    | null                              | undefined                        |
|------------|-----------------------------------|----------------------------------|
| Meaning    | Explicitly assigned "empty"       | Never assigned any value         |
| Type       | `object`                          | `undefined`                      |
| When       | Developer intentionally sets it   | Variable declared but not initialized |
| Example    | `let a = null;`                   | `let b;`                         |

```js
let a = null;
console.log(a);          // null
console.log(typeof a);   // "object"

let b;
console.log(b);          // undefined
console.log(typeof b);   // "undefined"
```

**Key insight:** `null` is an intentional "no value." `undefined` means "never given a value at all."

---

## Q11: filter(), map(), reduce() — Practical Exercise

**Data:**
```js
const students = [
    { name: "Alice", score: 25 },
    { name: "Bob", score: 55 },
    { name: "Charlie", score: 65 },
    { name: "David", score: 35 },
    { name: "Eve", score: 75 }
];
```

### filter() — Remove items based on condition

```js
const passedStudents = students.filter(student => student.score >= 36);
// Result: [Bob(55), Charlie(65), Eve(75)] — Alice and David removed
```

**How it works:** Iterates through each item. If condition returns `true` → keep. If `false` → remove.

### map() — Transform each item into something new

```js
const uppercaseNames = passedStudents.map(student => {
    student.name = student.name.toUpperCase();
    return student;
});
// Result: [{name:"BOB",score:55}, {name:"CHARLIE",score:65}, {name:"EVE",score:75}]
```

**How it works:** Iterates through each item. Returns a NEW array with transformed values.

### reduce() — Accumulate all items into single value

```js
const totalScore = passedStudents.reduce((accumulator, student) => {
    return accumulator + student.score;
}, 0);
// 0 + 55 + 65 + 75 = 195
```

**How it works:**
- Starts with accumulator = 0 (second argument)
- Iteration 1: 0 + 55 = 55 (accumulator becomes 55)
- Iteration 2: 55 + 65 = 120
- Iteration 3: 120 + 75 = 195
- Returns final accumulator: 195

### Summary

| Method     | Purpose                          | Returns            |
|------------|----------------------------------|--------------------|
| `filter()` | Remove items by condition        | Smaller array      |
| `map()`    | Transform each item              | Same-size array    |
| `reduce()` | Combine all into single value    | Single value       |

---

## Additional Interview Questions (Bonus)

### Q12: What is hoisting?
Variables and function declarations are moved to the top of their scope during compilation. `var` is hoisted and initialized as `undefined`. `let`/`const` are hoisted but NOT initialized (temporal dead zone).

### Q13: What is closure?
A function that remembers variables from its outer scope even after the outer function has returned.

```js
function counter() {
    let count = 0;
    return () => ++count;
}
const increment = counter();
increment(); // 1
increment(); // 2
```

### Q14: What is event loop?
JavaScript is single-threaded. The event loop manages async operations: call stack executes sync code, callback queue holds completed async callbacks, event loop moves callbacks to stack when it's empty.

### Q15: What is the difference between `for...in` and `for...of`?
- `for...in` → iterates over object KEYS (property names)
- `for...of` → iterates over iterable VALUES (arrays, strings)

### Q16: What is destructuring?
Extracting values from arrays/objects into variables:
```js
const { name, age } = person;        // Object destructuring
const [first, second] = array;       // Array destructuring
```

### Q17: What is the spread operator?
Expands arrays/objects:
```js
const newArr = [...oldArr, 4, 5];    // Copy + add
const newObj = { ...oldObj, age: 25 }; // Copy + override
```

### Q18: What is `typeof` operator?
Returns the type of a value as a string:
```js
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (known JS bug)
typeof {}         // "object"
typeof []         // "object" (use Array.isArray())
```

---

*Source: Rahul Shetty Academy — JavaScript Interview Questions (75 mins)*

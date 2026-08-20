// ================================================================
// 149 — TOP JAVASCRIPT INTERVIEW QUESTIONS (Executable)
// Run: node rahul-shetty-tutorials/149_JavaScript_Interview.js
// ================================================================

console.log("\n========================================");
console.log("Q1: Can JS Object Hold a Function?");
console.log("========================================\n");

const person = {
    name: "John",
    age: 30,
    greet: function () {
        console.log("Hello, I am " + this.name);
    }
};

console.log("person.name:", person.name);       // "John"
console.log("person.age:", person.age);         // 30
person.greet();                                  // "Hello, I am John"
console.log("// 'this.name' inside function refers to the object's own property");
console.log("// Call function property WITH brackets: person.greet()");
console.log("// Access value property WITHOUT brackets: person.name\n");


console.log("\n========================================");
console.log("Q2: Anonymous Functions");
console.log("========================================\n");

// Named function — has a name, called by name
function sayHello() {
    return "Hello from named function";
}
console.log("Named:", sayHello());

// Anonymous function — no name, stored in variable
const greet = function (name) {
    return "Hello " + name + " from anonymous function";
};
console.log("Anonymous:", greet("Dhejo"));

// Arrow function — modern shorthand for anonymous
const greetArrow = (name) => "Hello " + name + " from arrow function";
console.log("Arrow:", greetArrow("Dhejo"));
console.log("// Anonymous = no name. Must store in variable immediately.");
console.log("// Arrow functions are shorter syntax for anonymous functions.\n");


console.log("\n========================================");
console.log("Q3: var vs let vs const");
console.log("========================================\n");

function varExample() {
    var x = 1;
    if (true) {
        var x = 2;    // SAME variable — var is function-scoped!
        console.log("Inside block (var):", x);  // 2
    }
    console.log("Outside block (var):", x);     // 2 (not 1! — var leaked)
}
varExample();

function letExample() {
    let x = 1;
    if (true) {
        let x = 2;    // DIFFERENT variable — let is block-scoped!
        console.log("Inside block (let):", x);  // 2
    }
    console.log("Outside block (let):", x);     // 1 (outer unchanged)
}
letExample();

const constExample = 10;
// constExample = 20; // ❌ Would throw: Assignment to constant variable
console.log("const value:", constExample, "(cannot be reassigned)");

console.log("\n// var = function/global scoped (dangerous — leaks out of blocks)");
console.log("// let = block scoped (safe — stays within {})");
console.log("// const = block scoped + cannot reassign");
console.log("// No keyword = defaults to var (avoid!)\n");


console.log("\n========================================");
console.log("Q4: Array Methods");
console.log("========================================\n");

let fruits = ["apple", "banana", "cherry", "date"];
console.log("Original:", fruits);

fruits.push("elderberry");
console.log("push('elderberry'):", fruits);          // Added to END

fruits.pop();
console.log("pop():", fruits);                        // Removed from END

fruits.unshift("fig");
console.log("unshift('fig'):", fruits);              // Added to BEGINNING

fruits.shift();
console.log("shift():", fruits);                      // Removed from BEGINNING

console.log("indexOf('cherry'):", fruits.indexOf("cherry"));  // 2

fruits.splice(1, 1);  // Remove 1 item at index 1
console.log("splice(1,1):", fruits);                  // banana removed

console.log("\nforEach iteration:");
fruits.forEach((fruit, index) => {
    console.log(`  ${index}: ${fruit}`);
});

console.log("\n// push/pop = END. unshift/shift = BEGINNING.");
console.log("// splice(index, count) = remove at specific position.");
console.log("// indexOf(value) = find position of value.\n");


console.log("\n========================================");
console.log("Q5: JavaScript is Asynchronous");
console.log("========================================\n");

console.log("1. I am first");
console.log("2. I am second");
console.log("3. I am third");

setTimeout(() => {
    console.log("5. I am fifth (delayed 2 seconds — came AFTER sixth!)");
    console.log("// JS didn't wait for the 2s timer. It continued to sixth.\n");
}, 2000);

console.log("4. I am fourth");
console.log("6. I am sixth (printed BEFORE fifth!)");
console.log("// Watch: fifth will appear after 2 seconds...");


// Delay remaining output to appear after setTimeout
setTimeout(() => {

console.log("\n\n========================================");
console.log("Q6: Callback Functions");
console.log("========================================\n");

function fetchData(callback) {
    // Simulating 1 second server delay
    setTimeout(() => {
        const data = "sample data from server";
        console.log("Data fetched:", data);
        callback(data);  // Execute callback AFTER data is ready
    }, 1000);
}

function processData(data) {
    console.log("Processing:", data);
}

console.log("Calling fetchData with processData as callback...");
fetchData(processData);
console.log("// Callback = function passed as argument to another function.");
console.log("// Executes AFTER the async operation completes.");
console.log("// Makes it generic — any function can be passed.\n");

}, 3000);


setTimeout(() => {

console.log("\n========================================");
console.log("Q7: Promises");
console.log("========================================\n");

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "promise data from server";
            resolve(data);   // Moves promise to "resolved" state
        }, 1000);
    });
}

// Using .then()
fetchDataPromise().then((data) => {
    console.log("Promise resolved with:", data);
    console.log("// Promise states: pending → resolved (success) or rejected (failure)");
    console.log("// .then() only executes when promise is resolved");
    console.log("// await keyword = simpler way to wait for promise\n");
});

}, 5000);


setTimeout(() => {

console.log("\n========================================");
console.log("Q8: Inheritance — extends, super, this");
console.log("========================================\n");

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `${this.name}, Age: ${this.age}`;
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);    // Must call parent constructor FIRST
        this.grade = grade;
    }
    getStudentDetails() {
        return `${super.getDetails()}, Grade: ${this.grade}`;
    }
}

const student = new Student("Alice", 20, "A");
console.log("Student:", student.getStudentDetails());
console.log("\n// extends = inherit from parent class");
console.log("// super() = call parent constructor (must be first line)");
console.log("// super.method() = call parent's method");
console.log("// this = current class instance (access everywhere in class)\n");


console.log("\n========================================");
console.log("Q9: == vs === (Equality)");
console.log("========================================\n");

console.log('5 == "5"  →', 5 == "5");    // true (type coercion)
console.log('5 === "5" →', 5 === "5");   // false (strict — types differ)
console.log('5 === 5   →', 5 === 5);     // true (same type + value)
console.log("\n// == (loose) = ignores type, converts and compares");
console.log("// === (strict) = checks BOTH type and value");
console.log("// Best practice: ALWAYS use === for consistency\n");


console.log("\n========================================");
console.log("Q10: null vs undefined");
console.log("========================================\n");

let a = null;
let b;

console.log("a = null →", a, "| typeof:", typeof a);          // null, "object"
console.log("b = (nothing) →", b, "| typeof:", typeof b);    // undefined, "undefined"
console.log("\n// null = intentionally assigned 'empty' (it's an object)");
console.log("// undefined = never assigned any value at all");
console.log("// They are NOT the same thing!\n");


console.log("\n========================================");
console.log("Q11: filter(), map(), reduce()");
console.log("========================================\n");

const students2 = [
    { name: "Alice", score: 25 },
    { name: "Bob", score: 55 },
    { name: "Charlie", score: 65 },
    { name: "David", score: 35 },
    { name: "Eve", score: 75 }
];

console.log("Original:", students2.map(s => `${s.name}(${s.score})`).join(", "));

// filter — keep only passing students (score >= 36)
const passed = students2.filter(s => s.score >= 36);
console.log("\nfilter (score >= 36):", passed.map(s => s.name).join(", "));
console.log("// filter: keeps items where condition is TRUE, removes rest");

// map — convert names to uppercase
const uppercase = passed.map(s => s.name.toUpperCase());
console.log("\nmap (toUpperCase):", uppercase.join(", "));
console.log("// map: transforms each item, returns new array of same size");

// reduce — sum all scores
const total = passed.reduce((acc, s) => acc + s.score, 0);
console.log("\nreduce (sum scores):", total);
console.log("// reduce: accumulates all items into one value (0 + 55 + 65 + 75 = 195)");

console.log("\n\n========================================");
console.log("ALL QUESTIONS DEMO COMPLETE!");
console.log("========================================\n");

}, 7000);

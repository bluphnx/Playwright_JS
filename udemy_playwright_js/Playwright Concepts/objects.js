const Person = require('./classes');


// objects is collection of properties

let person_obj = {
    firstName: 'Sam',
    lastName: 'Shankar',
    fullName: function () {
        console.log(this.firstName + ' ' + this.lastName)
    },
    fullName_returns: function () {
        return this.firstName + ' ' + this.lastName
    }
};


// console.log(person.lastName);
// console.log(person['firstName']);
// person.firstName = 'Ram';
// console.log(person['firstName']);
// person.gender = 'Male';
// console.log(person);
// delete person.gender;
// console.log(person);
// console.log('gender' in person);

// // print all the values of javascript object

// for (let key in person) {
//     console.log(key + ':' + person[key]);
// }

console.log(person_obj.fullName)

console.log(person_obj.fullName()) 
// prints  
// Ram Shankar
// undefined
// because inside function we are printing and this person.fullName() returns nothing so it prints as undefined

person_obj.fullName()
// prints  
// Ram Shankar
// because in this function we have a console.log() that returns concatinated string

console.log(person_obj.fullName_returns())
// this fullName_returns() will only print if we put inside the console.log() or we can assign it to a variable

let dummy = person_obj.fullName_returns();
console.log('dummy: '+dummy)


const student_3 = new Person('Santosh','Kumar')

student_3.fullName();       
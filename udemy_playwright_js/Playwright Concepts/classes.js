class Person {

    age = 31


    get schoolName() {
        return "Velammal"
    }

    constructor(firstName, lastName) {

        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        console.log(this.firstName + this.lastName);
    }

}

module.exports = Person ;

// let student_1 = new Person('Naren', 'Ravi');
// let student_2 = new Person('Ram', 'Shankar');



// student_1.fullName()
// student_2.fullName()

// console.log(student_1.schoolName)
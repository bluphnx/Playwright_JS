const Person = require('./classes');

class Family extends Person{

    constructor(firstName,lastName){

        super(firstName,lastName)
    }

get schoolName() {
        return "SRV";  // Child's school
    }

    get parentSchoolName() {
        return super.schoolName;  // Parent's school (Velammal)
    }

}

let child = new Family('Gandhi','Singh');

child.fullName();
console.log(child.schoolName);
console.log(child.parentSchoolName);
var Student = /** @class */ (function () {
    function Student(name, marks) {
        this.name = name;
        this.marks = marks;
        this.average = this.calculateAverage(); // Calculate average upon instantiation
        Student.totalClassAverage.push(this.average); // Push individual average to the array
    }
    Student.prototype.calculateAverage = function () {
        var sum = this.marks.reduce(function (acc, cur) { return acc + cur; }, 0);
        return sum / this.marks.length;
    };
    Student.prototype.calculateGrade = function () {
        var average = this.average; // Use stored average
        if (average >= 90) {
            return 'A';
        }
        else if (average >= 80) {
            return 'B';
        }
        else if (average >= 70) {
            return 'C';
        }
        else if (average >= 60) {
            return 'D';
        }
        else {
            return 'F';
        }
    };
    Student.calculateClassAverage = function () {
        var sum = Student.totalClassAverage.reduce(function (acc, cur) { return acc + cur; }, 0);
        return sum / Student.totalClassAverage.length;
    };
    Student.totalClassAverage = []; // Array to store individual averages
    return Student;
}());
function handleSubmit(event) {
    event.preventDefault();
    var studentsDiv = document.getElementById('students');
    var studentInputs = studentsDiv.querySelectorAll('.student');
    var output = document.getElementById('output');
    output.innerHTML = '';
    Student.totalClassAverage = []; // Reset the total class average array
    studentInputs.forEach(function (studentInput) {
        var nameInput = studentInput.querySelector('.name');
        var marksInput = studentInput.querySelector('.marks');
        var name = nameInput.value;
        var marks = marksInput.value.split(',').map(Number);
        var student = new Student(name, marks);
        var average = student.average; // Get average from the class variable
        var grade = student.calculateGrade();
        output.innerHTML += "<p>Name: ".concat(name, "</p>");
        output.innerHTML += "<p>Marks: ".concat(marks.join(', '), "</p>");
        output.innerHTML += "<p>Average: ".concat(average.toFixed(2), "</p>");
        output.innerHTML += "<p>Grade: ".concat(grade, "</p>");
    });
    output.innerHTML += "<p>Total Class Average: ".concat(Student.calculateClassAverage().toFixed(2), "</p>");
}
function addStudent() {
    var studentsDiv = document.getElementById('students');
    var studentDiv = document.createElement('div');
    studentDiv.classList.add('student');
    studentDiv.innerHTML = "\n        <label for=\"name\">Name:</label>\n        <input type=\"text\" class=\"name\" required>\n        <label for=\"marks\">Marks (comma-separated):</label>\n        <input type=\"text\" class=\"marks\" required>\n    ";
    studentsDiv.appendChild(studentDiv);
}
var form = document.getElementById('studentForm');
form.addEventListener('submit', handleSubmit);
var addStudentButton = document.getElementById('addStudent');
addStudentButton.addEventListener('click', addStudent);

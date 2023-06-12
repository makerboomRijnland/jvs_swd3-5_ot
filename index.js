

function showStudent(student) {
    const studentsSection  = document.getElementById('students');
    const studentTemplate = document.getElementById('student-template');
    const studentArticle = studentTemplate.content.cloneNode(true);

    studentArticle.querySelector('.name').innerHTML = student.name;
    studentArticle.querySelector('.age').innerHTML = student.age;
    studentArticle.querySelector('.group').innerHTML = student.group;

    studentsSection.appendChild(studentArticle);
}

function loadStudents() {
    fetch('students.json')
        .then((response) => response.json())
        .then((data) => showStudents(data));
}

function showStudents(students) {
    for(let student of students) {
        showStudent(student);
    }
}

const testStudent = {
    name: "B. Attyboy",
    age: 17,
    group: "LO2E-SWD3"
};

loadStudents();

// showStudent(testStudent);
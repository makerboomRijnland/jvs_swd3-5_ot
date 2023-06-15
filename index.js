

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

    const ageFilterSelect = document.getElementById('students-filter-age');
    const groupFilterSelect = document.getElementById('students-filter-group');

    ageFilterSelect.addEventListener('change', filterStudents);
    groupFilterSelect.addEventListener('change', filterStudents);
}

function filterStudents() {
    const studentsSection  = document.getElementById('students');
    const studentArticles = studentsSection.querySelectorAll('.student');

    const ageFilterSelect = document.getElementById('students-filter-age');
    const ageFilter = ageFilterSelect.value;

    const groupFilterSelect = document.getElementById('students-filter-group');
    const groupFilter = groupFilterSelect.value;

    for(let studentArticle of studentArticles) {
        const studentAge = studentArticle.querySelector('.age').innerHTML;
        const studentGroup = studentArticle.querySelector('.group').innerHTML;
        
        const isCorrectAge = ageFilter == "--" || studentAge == ageFilter;
        const isCorrectGroup = groupFilter == "--" || studentGroup == groupFilter;

        if(isCorrectAge && isCorrectGroup) {
            studentArticle.style.display = 'block';
        } else {
            studentArticle.style.display = 'none';
        }
    }
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

// loadStudents();

// showStudent(testStudent);